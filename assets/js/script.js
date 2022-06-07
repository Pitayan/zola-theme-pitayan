(function() {
  function noop() {}

  var count = 0
  // refers to https://github.com/webmodules/jsonp/blob/master/index.js
  function jsonp(url, opts, fn){
    if ('function' == typeof opts) {
      fn = opts;
      opts = {};
    }
    if (!opts) opts = {};

    var prefix = opts.prefix || '__jp';

    // use the callback name that was passed if one was provided.
    // otherwise generate a unique name by incrementing our counter.
    var id = opts.name || (prefix + (count++));

    var param = opts.param || 'callback';
    var timeout = null != opts.timeout ? opts.timeout : 60000;
    var enc = encodeURIComponent;
    var target = document.getElementsByTagName('script')[0] || document.head;
    var script;
    var timer;


    if (timeout) {
      timer = setTimeout(function(){
        cleanup();
        if (fn) fn(new Error('Timeout'));
      }, timeout);
    }

    function cleanup(){
      if (script.parentNode) script.parentNode.removeChild(script);
      window[id] = noop;
      if (timer) clearTimeout(timer);
    }

    function cancel(){
      if (window[id]) {
        cleanup();
      }
    }

    window[id] = function(data){
      cleanup();
      if (fn) fn(null, data);
    };

    // add qs component
    url += (~url.indexOf('?') ? '&' : '?') + param + '=' + enc(id);
    url = url.replace('?&', '?');

    // create script
    script = document.createElement('script');
    script.src = url;
    target.parentNode.insertBefore(script, target);

    return cancel;
  }

  var _tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
  function validateEmail(input) {
    if (!input)
      return false
    var emailParts = input.split("@")
    if (emailParts.length !== 2)
      return false
    var account = emailParts[0]
    var address = emailParts[1]
    if (account.length > 64) {
      return false
    }
    else if (address.length > 255) {
      return false
    }
    var domainParts = address.split(".")
    if (domainParts.some(function (part) {
      return part.length > 63
    })) {
      return false
    }
    if (!_tester.test(input)) {
      return false
    }
    return true
  }

  function jsonpPromise (url, timeout = 300) {
    return new Promise(function(resolve, reject) {
      return jsonp(url, { param: "c", timeout }, function(err, data) {
        if (err)
          reject(err)
        if (data)
          resolve(data)
      })
    })
  }

  // Refers to
  // https://github.com/benjaminhoffman/gatsby-plugin-mailchimp/blob/master/src/index.js
  function subscribeMailChimp(email, endpoint, timeout) {
    var isEmailValid = validateEmail(email)
    var emailEncoded = encodeURIComponent(email)
    if (!isEmailValid) {
      return Promise.resolve({
        result: "error",
        msg: "The email you entered is not valid.",
      })
    }
    // Generates MC endpoint for our jsonp request. We have to
    // change `/post` to `/post-json` otherwise, MC returns an error
    endpoint = endpoint.replace(/\/post/g, "/post-json")
    var queryParams = `&EMAIL=${emailEncoded}`
    var url = `${endpoint}${queryParams}`
    return jsonpPromise(url, timeout)
  }

  window.__subscribeMailChimp = subscribeMailChimp
})()
