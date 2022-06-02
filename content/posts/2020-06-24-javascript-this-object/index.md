---
title: "Javascript this Object: still confused with this helpful keyword?"
slug: javascript-this-object-still-confused-with-this-helpful-keyword
description: "This article will help you fully understand the javascript this object. With some \"pain-in-the-ass\" examples, I'll show you how to turn this from a \"headache\" into a real helper."
date: 2020-06-24
taxonomies:
  authors: 
    - Yanze Dai
  categories:
    - Javascript
extra:
  keywords: javascript this object,javascript this keyword,javascript this
  image: ./images/cover_image.jpg
---


This article will help you fully understand the keyword `this` in javascript. With some "pain-in-the-ass" examples, I'll show you how to turn `this` from a "headache" into a real helper.

## "this" is a changeful object

Maybe you misunderstood `this` keyword with a `class` `this`. But javascript `this` keyword behaves a bit different than some other programming languages like Python or Java. The way to use it is pretty similar and even behaves the same in some scenarios.

But in javascript, `this` keyword's action scope can actually change. Right, no joking, it changes. And this is probably the reason why it brings us a lot of headaches while using it in our project.

According to [w3schools](https://www.w3schools.com/Js/js_this.asp) and [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this),

> "this" is a property of an execution context. It refers to the object it belongs to.

It sounds a little ambiguous.

Yet, they can be interperted as:

> `this` is a camera-monitor. Put it in your house, you can monitor everything via `this`. If you put it elsewhere, the picture certainly changes.

I guess now you can see the good adaptiveness from the keyword `this`.

Okay, let's take a look at how `this` varies in our real world programs.


## Some Confusing Examples

Open your browser console, and input some of the following examples. You'll personally understand the confusing part about `this` keyword in different scenarios.

#### 1. "this" is window

```javascript
// 1. global console
console.log(this) // window

// 2. arrow function
var thisIsWindow = () => {
  console.log(this) // window
}

// 3. normal function
function thisIsWindow () {
  console.log(this) // window
}

// 4. immediate function
(function () {
	console.log(this) // window
})()

~function () {
  'use strict'
  console.log(this)  //window
}()

// 5. function call inside another function
function another () {
  thisIsWindow() // window
}

// 6. arrow function call inside an object
var obj = {
  func: () => {
    console.log(this) // window
  }
}

// 7. normal function call inside an object function
var obj = {
  func: function () {
    thisIsWindow() // window
  }
}
```

#### 2. "this" is **NOT** window

```javascript
// 1. normal object function
var obj = {
  func: function () {
    console.log(this) // obj
  }
}

// 2. immediate function under strict mode
(function () {
  'use strict'
  console.log(this) // undefined
})()

~function () {
  'use strict'
  console.log(this)  // undefined
}() // undefined

// 3. bind DOM event to a function
document.body.onclick = function () {
  console.log(this) // document.body
}

document.body.addEventListener("click", function () {
  console.log(this) // document.body
})
```

There are more complex examples that will lead to an unexpected context of `this` keyword. I won't be listing all of them out here. I think you've already felt the painful part of it and start to perceive `this` keyword's as a significant knowledge point since it may confuse you anytime at the beginning.

Don't worry, let me explain you the key points that needs special attentions so that you won't make mistakes with `this` during the development.

## Matter of "this" fact

#### 1. As for functions, if a function is chained by another object. `this` refers to the owner object. If function is not chained, `this` refers to window object

```javascript
function func () {
  console.log("this: ", this)
}

var obj = {
  func: func
}

obj.func() // this: {func: function}
```

#### 2. `this` within an immediate function always refers to window object

```javascript
(function(){
	console.log("this: ", this) // this: Window {...}
})()

~function(){
  console.log("this: ", this) // this: Window {...}
}()
```

#### 3. While binding an event to a DOM element, `this` refers to the current element

```javascript
document.body.onclick = function () {
  console.log("this: ", this) // this: <body>...</body>
}
```

#### 4. In a constructor function, `this` refers to the function/class instance

```javascript
// Function
function Website (name, url) {
  this.name = name
  this.url = url

  this.print = function () {
    console.log(this.name + ' -- ' + this.url)
  }
}

// Class
class Website {
  constructor (name, url) {
    this.name = name
    this.url = url
  }

  print () {
    console.log(this.name + ' -- ' + this.url)
  }
}

var pitayanBlog = new Website('Pitayan Blog', 'https://pitayan.com')

pitayanBlog.print() // PitayanBlog -- https://pitayan.com
```

**Note:** The `console` output will change its value in terms with the caller's context.

```javascript
var test = pitayanBlog.print

test() // undefined -- undefined
```

#### 5. Change `this` context scope with `bind`

`bind` will help return a new function containing the specified context. Execute the returned new function will output the result.

```javascript
var website = {
  url: 'https://pitayan.com'
}

function func () {
  console.log(this.url)
}

var newFunc = func.bind(website)

newFunc() // https://pitayan.com
```

#### 6. Change `this` context scope with `apply` and `call`

In the following example, if you execute `print` function directly it will output `undefined`. But if you utilize [`apply`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call) and [`call`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call) to change the context scope of `print` function, it will output "https://pitayan.com".

```javascript
var website = {
  url: 'https://pitayan.com'
}

function print () {
  console.log(this.url)
}

print() // undefined

print.apply(website)
// or
print.call(website)
```

#### 7. The "strict mode" `apply` /`call` behave differently than "none strict mode"

```javascript
function func () {
  console.log("this: ", this)
}

// none strict mode
func.call() // this: Window {...}
func.call(null) // this: Window {...}
func.call(undefined) // this: window {...}

// strict mode
func.call() // this: undefined
func.call(null) // this: null
func.call(undefined) // this: undefined
```

**Note:** `apply ` behaves the same to `call` in the above situation.

#### 8. `this` used within an arrow function always refers to the object where it's defined

```javascript
var obj = {
  func: function () {
    document.body.onclick = () => {
      console.log("this: ", this) // this: {func: Function}
    }
  }
}
```

Here is something intersting about arrow function. Arrow function has no action scope for `this` keyword, so if you use `this` keyword within the arrow function `this` refers to some object way up to the top layer.

```javascript
var obj = {
  func: function () {
    return () => {
      return () => {
        console.log("this: ", this)
      }
    }
  }
}

obj.func()()() // this: {func: Function}
```

**Note:** arrow function cannot use `this` context, so it will ignore the first argument while invoking with `apply` or `call`.

```javascript
var obj = {
  name: 'obj',
  func: function () {
    var fn = () => {
      console.log(this.name)
    }

    fn.call({ name: "something else" })
  }
}

obj.func() // obj
```

Well, this is pretty much all of what you need to pay attention to while using javascript this object. Hope you've understood its usage and felt no longer confused using it.

Thanks for reading!

Here are some reference links:
- [https://medium.com/better-programming/understanding-the-this-keyword-in-javascript-cb76d4c7c5e8](https://medium.com/better-programming/understanding-the-this-keyword-in-javascript-cb76d4c7c5e8)
- [https://github.com/ljianshu/Blog/issues/7](https://github.com/ljianshu/Blog/issues/7)
- [https://dmitripavlutin.com/gentle-explanation-of-this-in-javascript/](https://dmitripavlutin.com/gentle-explanation-of-this-in-javascript/)
