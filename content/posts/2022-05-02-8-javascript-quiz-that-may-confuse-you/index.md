---
title: 8 Javascript quiz that may confuse you
slug: 8-javascript-quiz-that-may-confuse-you
description: A small tech workshop of testing your Javascript knowledge.
date: 2022-05-02
taxonomies:
  authors: 
    - Yanze Dai
  categories:
    - Javascript
extra:
  keywords: Javascript fundamentals, console.log, learn Javascript
  image: ./images/cover_image.jpg
---

These days, I was preparing a small game for our team's tech workshop. Thought it'd be a good opportunity of introducing the some fundamental and tricky stuffs around JavaScript.
So I made 8 quiz to our team members. And hope they could solve them within 15 min. Eventually, it took all of them over 20 minutes to complete and most of them could solve 4-5 questions correctly.

You can take it as just a small test, each quiz has answer attached to the end of the code. Try to answer them first and then look at the answers. Good luck.

## What do these console.log print out?

### No. 1 -- Doctor Pavlov has a dog

```js
function Animal(){ 
  this.type = "animal"
}
   
function Dog(){ 
  this.name = "dog"
}
 
Dog.prototype = new Animal()
 
var PavlovPet = new Dog(); 
 
console.log(PavlovPet.__proto__ === Dog.prototype)
console.log(Dog.prototype.__proto__ === Animal.prototype)
```

<p>
  <details>
    <summary>Answer for No. 1</summary>

Very basic stuff about the prototype chain.

```js
// Output
true
true
```

  </details>
</p>

### No. 2 -- Be careful with the "sort"

```js
var arr = [5, 22, 14, 9];

console.log(arr.sort());
```

<p>
  <details>
    <summary>Answer for No. 2</summary>

Sorry, not [5, 9, 14, 22]. Each element is converted into string and then comparing the sequence of UTF-16 value.

Check this out: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

```js
// Output
[14, 22, 5, 9]
```

  </details>
</p>

### No. 3 -- Closure and event loop

```js
for (var i = 0; i < 3; i++) {
  const log = () => {
    console.log(i)
  }
  setTimeout(log, 100)
}
```

<p>
  <details>
    <summary>Answer for No. 3</summary>

It prints out 3 thrice since setTimout puts that `log` function to the next macro task queue

```js
// Output
3
3
3
```

  </details>
</p>


### No. 4 -- There's indentation

```js
function createNewArray(item) {
  return
    [item]
}
 
console.log(createNewArray(0))
```

<p>
  <details>
    <summary>Answer for No. 4</summary>

This returns `js•undefined`. The break-line after the `return` is ignored.
Thus, the argument passed into the function is also ignored.

```js
undefined
```

  </details>
</p>

### No. 5 -- What's inside the "numbers"

```js
const length = 4
const numbers = []
for (var i = 0; i < length; i++);{
  numbers.push(i + 1)
}
 
console.log(numbers)
```

<p>
  <details>
    <summary>Answer for No. 5</summary>

This needs a pair of sharp eyes. See that semicolon between the parentheses and curly bracket?

```js
// Output
[5]
```

  </details>
</p>

### No. 6 -- No length

```js
const clothes = ['shirt', 'socks', 'jacket', 'pants', 'hat']
clothes.length = 0
 
console.log(clothes[3])
```

<p>
  <details>
    <summary>Answer for No. 6</summary>

This is equivalant to removing all elements from the array

```js
// Output
undefined
```

  </details>
</p>

### No. 7 -- Variable went crazy

```js
var a = 1
function output () {
    console.log(a)
    var a = 2
    console.log(a)
}
console.log(a)
output()
console.log(a)
```

<p>
  <details>
    <summary>Answer for No. 7</summary>

First output: using the global `js•var a`

Second output: the first one in the `js•function output()` using before declaration should be undefined

Third output: print out after the declaration. Nothing special.

Forth output: `js•var a` never got changed by `js•function output()`

```js
// Output
1
undefined
2
1
```

  </details>
</p>

### No. 8 -- There's an accidental declaration

```js
function foo() {
    let a = b = 0
    a++
    return a
}
 
foo()
console.log(typeof a)
console.log(typeof b)
```

<p>
  <details>
    <summary>Answer for No. 8</summary>

`js•let a` is a local variable. `js•typeof a` is checking undeclared variable.

`js•b` is a global variable which value is assign in `js•function foo()`.

```js
// Output
undefined
number
```

  </details>
</p>

## In the end

Thanks so much for reading! Have you got them all correct?

