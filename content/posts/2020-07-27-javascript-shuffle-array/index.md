---
title: "The optimal solution to shuffle an Array in Javascript"
slug: javascript-shuffle-array
description: "I recently met a small issue on creating a new randomly ordered array based on an old one. To speak shortly, the final goal is to get a shuffled array."
date: 2020-07-27
taxonomies:
  authors: 
    - Yanze Dai
  categories:
    - Javascript
    - Algorithm
extra:
  keywords: javascript random,javascript shuffle array,js array random
  image: ./images/cover_image.png
---

I recently met a small issue on creating a new randomly ordered array based on an old one. To speak shortly, the final goal is to get a shuffled array.

The following is my solution after a few moment's experiment before I search the web. (I thought I could do it myself :p)

```javascript
var arr = [1, 2, 3, 4, 5, 6, 7]

function shuffle (arr) {
  let i = 0,
      res = [],
      index

  while (i <= arr.length - 1) {
    index = Math.floor(Math.random() * arr.length)

    if (!res.includes(arr[index])) {
      res.push(arr[index])
      i++
    }
  }

  return res
}

// expected
arr = shuffle(arr)
// [6, 3, 4, 1, 7, 2, 5]
```

As you can see that this is not a good way handle shuffling, so I decide to do some researches over it.

After looking for some answers on google and stackoverflow, I found a most satisfying [solution](https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array) to shuffle an array. (The answer has been there since 2010... But, very qualified indeed.)

First things first, let's take a look at the answer. It's quite simple but fast enough.

```js
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
```


## Why My Solution is Bad
At the beginning, I was just thinking about creating new random indexes within a `while` loop and push the old array element to a new array as return.

```js
while (i <= arr.length - 1) {
  // create random index
  index = Math.floor(Math.random() * arr.length)

  // insert the element to new array
  if (!res.includes(arr[index])) {
    res.push(arr[index])
    i++
  }
}
```

It works well with very satisfying returnings. But the time complexity was pretty bad. In the `while` loop, it checks if the element to be inserted exists in the new array for each of the loop round. This results in ***O(n<sup>2</sup>)***.

If an array isn't that big, then my function was just fine. But the truth is, my project needs to generate a list with more than **1000** elements. So it's better to optimize the algorithm. (I think it's always better to do such optimization. Don't be afraid to mean to computers :D)


## The Fisher–Yates Shuffle
The stackoverflow's answer seems quite simple, however in fact it uses an algorithm invented by [Ronald Fisher](https://en.wikipedia.org/wiki/Ronald_Fisher) and [Frank Yates](https://en.wikipedia.org/wiki/Frank_Yates).

> The Fisher–Yates shuffle is an algorithm for generating a random permutation of a finite sequence—in plain terms, the algorithm shuffles the sequence.
>
> ...and is also known as the Knuth shuffle after [Donald Knuth](https://en.wikipedia.org/wiki/Donald_Knuth).
>
> -- <cite>**From [Wikipedia](https://en.wikipedia.org/wiki/Fisher–Yates_shuffle)**</cite>

There's an old blog article that visualizes the shuffle algorithm. https://bost.ocks.org/mike/shuffle/

The `shuffle` function is a description of the algorithm.

```js
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Create a random index to pick from the original array
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // Cache the value, and swap it with the current element
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
```

The solution is very good, but it still has some improving potentials. I believe making a pure function here makes more sense. So I'd rather return a new array than modifying the original argument as a side effect.

To avoid modifying the original data, I can also create a clone while passing the arugment.

```js
shuffle(arr.slice(0))
```


## Other Variations
There are some honorable alternatives to the solution I found on [stackoverflow](https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array) which I think is properly optimized.

#### The Durstenfeld Shuffle
This solution appears on the [stackoverflow](https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array) page. I found a gist memo in the end.

https://gist.github.com/webbower/8d19b714ded3ec53d1d7ed32b79fdbac

```js
// Pre-ES6
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

// ES6+
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
```

#### Array extension method
Actually, I'd prefer this one due to its simplicity and a small trick of round numbers. The trick here is to use `>>>` ([unsigned right shift operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unsigned_right_shift)) instead of `Math.floor`.

```js
Array.prototype.shuffle = function() {
  let m = this.length, i;
  while (m) {
    i = (Math.random() * m--) >>> 0;
    [this[m], this[i]] = [this[i], this[m]]
  }
  return this;
}
```

Okay, that's all for the research. Hope you also get a good understanding of the `shuffle` algorithm from this article.
If you think this article is great, please share it on social networks.

Thank you reading!


## References
- [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unsigned_right_shift](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unsigned_right_shift)
- [https://en.wikipedia.org/wiki/Fisher–Yates_shuffle](https://en.wikipedia.org/wiki/Fisher‚ÄìYates_shuffle)
- [https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array](https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)
- [https://gist.github.com/webbower/8d19b714ded3ec53d1d7ed32b79fdbac](https://gist.github.com/webbower/8d19b714ded3ec53d1d7ed32b79fdbac)
