---
title: "Well explained: Javascript in operator"
slug: javascript-in-operator
description: "This article is going to uncover the usage of Javascript in operator. in operator is one of the keywords in Javascript. We use it very often in loops or if conditions"
date: 2020-07-01
taxonomies:
  authors: 
    - Yanze Dai
  categories:
    - Javascript
extra:
  keywords: javascript in operator,javascript in,js in operator
  image: ./images/cover_image.png
---

This article is going to uncover the usage of Javascript `in` operator. `in` operator is one of the keywords in Javascript. We use it very often in loops or if conditions.

> `in` operator can check if something exists in the Object. It returns `true` when the first operand is in the Object as a property or exists in the prototype chain.

## 1. Simple basic usage

### Object property check

The follow example returns `true` because variable `obj` has all of them.

```javascript
let obj = {
  javascript: 1,
  html: 2,
  css: 3
}

'javascript' in obj // true
'html' in obj // true
'css' in obj // true
```

### Prorotype chain

It is `false` because `python` does not exist in `obj` but if we could add it to the prototype chain the result will turn to `true`

```javascript
'python' in obj // false

obj.prototype.python = 4

'python' in obj // true
```

### Deleted/Undefined Property

When a property is deleted from `obj`, it returns `false` because we remove the property completely.

```javascript
delete obj.javascript

'javascript' in obj // false
```

But if we sett the property `undefined`, the `in` operator returns true because the property exists it just doesn't have any value.

```javascript
obj.javascript = undefined

'javascript' in obj // true
```

## 2. Other usages

Other than using `in` operator in an hashmap Object, we could also apply it to other situations like `String` `Array` and some other supported behaviors in Javascript.

### If String is in another String

```javascript
let str = 'string'

'string' in str // true

'str' in str // true

'ing' in str // true

'something else' in str // false
```

### If an index is in an Array

There are only 3 elements in `arr`, so the fourth element witn index `3` is out of range.

```javascript
let arr = ['javascript', 'in', 'operator']

0 in arr // true
1 in arr // true
2 in arr // true

3 in arr // false
```

### Non-inherited property is in Object

`obj` is inheriting `Object`. But the native function of `toString` is an inherited property. To Check if non-inherited property is in Object we need to use [Object.property.hasOwnProperty()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty) method.

```javascript
let obj = {}

'toString' in obj // true

obj.hasOwnProperty('toString') // false
```


## References:
- [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
- [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in)
- [https://dmitripavlutin.com/own-and-inherited-properties-in-javascript/](https://dmitripavlutin.com/own-and-inherited-properties-in-javascript/)


