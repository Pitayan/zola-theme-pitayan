---
title: "I Have Very Good Feelings about ES2020 features"
slug: es2020-features
description: "ES2020 has been out for a while. I guess a lot of Node developers have already adopted these features. Some even started using them when these features were still under proposal stages."
date: 2020-07-28
taxonomies:
  authors: 
    - Yanze Dai
  categories:
    - Javascript
extra:
  keywords: javascript 2020,es2020 features,nullish coalescing
  image: ./images/cover_image.png
---

ES2020 has been out for a while. I guess a lot of `Node` developers have already adopted these features. Some even started using them when these features were still under proposal stages. Yep. My team started using some stage 3 features for quite a while.

In this article, I'm going to talk about my feelings of using these ES2020 features. As a result, I think those features are great and essential.


## 1. Operator: Nullish Coalescing
At the beginning, my idea of "providing exlicit explanation of your code" denies such improvement. I think since a value of `nullish` or `falsy` should be given a thorough "explanation" under an `if condition` or some other strategic `function`. In this way, I could also add some extra logics without refactoring the shorthand expression later.

```js
let website = {}

let url = 'https://pitayan.com'
if (website.url !== undefined && typeof website.url === String) {
  url = website.url
}
```

But I made compromise quickly after trying "nullish coalescing" everywhere in the project. My concern was proved unnecessary. Because what I want is to make sure the target variable has concrete value in most of the scenarios.

In Typescript, operating a `nullish` value will probably be given errors or warnings. This means my code can be optimized easily by following the expostulation.

```ts
let url: string = website.url ?? 'https://pitayan.com'
```

In brief, my feeling toward `nullish coalescing` is quite supportive. It' going to be very helpful while assigning non-nullable value to a variable.

## 2. Asychronous Modules: Dynamic import
I've been using this feature since stage 2. You know, our apps needs that ability of "Just in Time".

It helps me import Javascript / JSON files as modules in my application. And now it can just show up anywhere in my project (mostly for front end. Haven't experience it on server side). Have to say this feature is indispensible.

```js
let answer = await import('./myanswer.json')

import('./component.js')
  .then(module => {
    module.default.mount(answer)
  })
```

## 3. Promise.allSettled
`Promise.all` has brought us a useful solution to the famous "callback hell". Nesting functions is truly nasty.

```js
// Before
getUp().then(() => {
  washFace().then(() => {
    brushTeeth().then(() => {
      eatBreakfast()
    })
  })
})
```

```js
// After
Promise.all([
  getUp,
  watchFace,
  brushTeeth
]).then(() => {
  eatBreakfast()
})

```

As you know, `Promise.all` will throw errors once one of the tasks encounters exceptions. I never hope that I can't eat breakfast without washing my face.

Of course, I can add `finally` to the `Promise` chain to make sure eating breakfast. But `finally` doesn't provide the correct context I wanted. Don't even have to mention using `catch` to eat breakfast, that's a bad practice.

Finally, `allSettled` permits us to set a callback whenever I wash my face or brush my teeth. I just want that breakfast! It feels like you grew up and move out of parents' home. So mom's scolding about washing face and brushing teeth are gone.

```js
// Bad
Promise.all([
  getUp,
  watchFace,
  brushTeeth
]).then(() => {
  eatBreakfast()
}).catch(() => {
  eatBreakfast()
})
```

```js
// Good
Promise.allSettled([
  getUp,
  watchFace,
  brushTeeth
]).then(results => {
  eatBreakfast()
})
```


## 4. Very Large Number: BigInt
The Javascript `Number` type used to range from **-(2<sup>53</sup>-1)** to **2<sup>53</sup>-1** (Number.MIN_SAFE_INTEGER ~ Number.MAX_SAFE_INTEGER).

With this new API, any large number can be process properly in browser without losing any precision.

```js
let bitInteger = BitInt(9007199254740995)

// Or

let bitInteger = 9007199254740995n
```

In my case, big integers are converted into `String` to avoid precision issues before they are carried out to the front. It is indeed a rare case to use `BitInt` at the moment in my project. I believe there are other general demands around this features in other projects.

A simple example I can come up with is: If a database's model ID is numberic and fairly long (like a shopping order ID), then when it is passed onto the frontend the `BigInt` can come into help.


## 5. Regex: String.prototype.matchAll
Actually `matchAll` has been proposed for a long time. It returns an `Array` containing all matched characters. Compared to `match`, the return type `RegExpStringIterator` gives us a consistant result whenever the string matches or not. By using tools like `Array.from` I could finally pull all results from the `iterator`.

This after all is a good improvement in my humble opinion. Because the returned data type is always the same.

```js
let url = 'https://pitayan.com'
let blank = ''
let reg = /pitayan.com/g

// match
url.match(reg) // ["pitayan.com"]
blank.match(reg) // null

// matchAll
Array.from(url.matchAll(reg)) // [["pitayan.com", index: 8, input: "https://pitayan.com", groups: undefined]]
Array.from(blank.match(reg)) // []
```


## 6. A Standardized Global Object: GlobalThis
Sometimes the JS code needs to cross platform, but Node.js uses `global` which is different to browser's `window` (web worker uses `self`). So before starting everything, I need to handle the environment compatibility first.

```js
const globalThis = ((global, window, self) => {
  if (global) return global
  if (window) return window
  if (self) return self
  throw new Error('...')
})(global, window, self)
```

I personally think that identifying the environment is the duty of the lanuague system. So the `globalThis` is something that filled the nasty gap. Really really appreciated this feature's release.


## 7. Chain with Elegance: Optional Chaining
I've used this feature since stage 2. It helps reduce a lot of `if conditions` or `ternary operators` which made my code look much simpler.

```js
let food = restuarant && restuarant.cooking && restuarant.cooking.food

// after
let food = restuarant?.cooking?.food
```

Other than accessing the properties, I can also use it on methods.

```js
let food = restuarant?.cooking?().food
```

Isn't this looking good?


## 8. Module Namespace Exports: export * as
This an amazing API for Javascript. I used to export some modules in this way.

```js
import A from './A.js'
import B from './B.js'
import C from './C.js'

export default { A, B, C }
```

Now I can do this instead.

```js
export * as A from './A.js'
export * as B from './B.js'
export * as C from './C.js'
```

And the usage of import these modules stays the same.

```js
import { A, B, C } from './index.js'
```

Fancy but very practical!

## 9. Other features
There are some other features I haven't experienced well enough to make conclusions. Their definition is clear enough to speculate the changes. I believe they are quite useful otherwise it's impossible to introduce them into the new standard.

#### for ... in loop order
The `for in` loop order wasn't specified by ECMAScript at the beginning. Each browsers has different behiviors but now they are unified aligning with the ECMA standard.

#### import meta
Now you can access the information from an imported module.

```html
<script src="script.js"></script>
```

```js
console.oog(import.meta) // { url: "https://pitayan.com/script.js" }
```


## Conclusion
Javascript has brought us many convenient and powerful APIs these years. Our development has been improved ever since the new standards coming out continuously. And they are proved to be the life saver for us engineers. I wish there will be more powerful features in the future so that maybe one day I don't have to type any code to build a wonderful application.

Alright, that's all about some humble opitions toward the ES2020 features. I hope you also have the same feelings.

If you think this article is great, then please share it to the social network to let more people get involved.

Thank you for reading!


## References
- [https://www.freecodecamp.org/news/javascript-new-features-es2020/](https://www.freecodecamp.org/news/javascript-new-features-es2020/)
- [https://www.jianshu.com/p/416a0931e96c](https://www.jianshu.com/p/416a0931e96c)

