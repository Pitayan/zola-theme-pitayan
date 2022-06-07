---
title: "JSON.stringify accepts 2 other parameters"
slug: json-stringify-params
description: "Do you know that JSON.stringify can actually take 2 other parameters? I didn't know this before I laid my eyes on my colleage's pull request.(I'm such a noob) But it's nothing difficult. Those 2 parameters will help optimize the result in a good format."
date: 2020-07-30
taxonomies:
  authors: 
    - Yanze Dai
  categories:
    - Javascript
extra:
  keywords: javascript json,json stringify,json.stringify params
  image: ./images/cover_image.png
---

Do you know that `JSON.stringify` can actually take 2 other parameters? I didn't know this before I laid my eyes on my colleage's pull request.(I'm such a noob) But it's nothing difficult. Those 2 parameters will help optimize the result in a good format.

In my opinion, the usage of `JSON.stringify` parameters is never a rare case. Well, let's take a look at those "I-didn't-know" features that "educated" me.

## 1. Replacer: Filtering your properties
This parameter is of course `optional` by default. By assigning `Array` of `Number` or `String`, the output JSON will return the stringified properties given in the `Array`.

```js
const obj = {
  "site": "Pitayan",
  "url": "https://pitayan.com",
  100: 100
}

JSON.stringify(obj, ['site', 100])
// "{\"site\":\"Pitayan\",\"100\":100}"
```

This is extremely helpful when I only some of the properties inside the `Object`.

But it comes to negations, the 2nd parameter will not provide any help. Well, I suppose this is how this API is designed initially. In such case, it's better to handle the `Object` properties before `JSON.stringify`.

## 2. Space: Formatting the string JSON
`JSON.stringify` offers another useful parameter which allows use to format the string output with whitespaces.

Frankly speaking, I don't quite need it, since I could print out the Object in the browser console directly.
But it is truely helpful when the JSON data is big enough, and I'm printing out data in the terminal.

```js
// Without formatter
JSON.stringify(obj)
// "{\"site\":\"Pitayan\","url\":\"https://pitayan.com\",\"100\":100}"
```

This looks prettier, isn't it?

```js
// With formatter
JSON.stringify(obj, null, 2)
// "{
//   \"100\": 100,
//   \"site\": \"Pitayan\",
//   \"url\": \"https://pitayan.com\"
// }"
```

## 3. toJSON
After I realised that there are 2 parameters for `JSON.stringify`, I decided to take a look at the official document. Then I found that an `Object` can define a method to control the behavior of `JSON.stringify`.

It's intercepting the `stringify` process and a proper `String` value must be returned from `toJSON` method. Otherwise, the output is `undefined`.

`toJSON` receives an argument which is the key of the target `Object` if it's nested within another one.

```js
const objToJSON = {
  "site": "pitayan",
  "url": "https://pitayan.com",
  toJSON: function (key) {
    if (key) {
      return `[${key}]: ${this.site} -- ${this.url}`
    } else {
      return `${this.site} -- ${this.url}`
    }
  }
}


JSON.stringify(objToJSON)
// "\"pitayan -- https://pitayan.com\""

JSON.stringify({ objToJSON })
// "{\"objToJSON\":\"[objToJSON]: pitayan -- https://pitayan.com\"}"
```

Okay, this is all for `JSON.stringify`. Hope this article will help everyone gain some knowledge about this usefull API.

If you think this article is great, please do share it on the social network. Thanks for reading!

## References
- [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)
