---
title: "16 CSS Pseudo Selectors Worth Bookmarking"
slug: css-pseudo-selectors
description: "This article suggests using more CSS and less JS to construct the web UI. To realize this target, it's preferrable to get farmiliar with as many as possible of CSS features."
date: 2020-07-23
taxonomies:
  authors: 
    - Yanze Dai
  categories:
    - CSS
extra:
  keywords: CSS pseudo selector
  image: ./images/cover_image.png
---

<link rel="stylesheet" href="PseudoStyle.css" />

This article suggests using more CSS and less JS to construct the web UI. To realize this target, it's preferrable to get farmiliar with as many as possible of CSS features. But it's quite difficult to know all them. Another solution instead is to follow the best pratices and reduce the code quantity.

## 1. :first-line
It represents the first line of text as its name implies.

Browser Compatibility: https://caniuse.com/#search=%3Afirst-line

```css
pre:first-line {
  font-size: 24px;
  color: green;
}
```

<p class="demo first-line">
::first-line
selector
</p>
<br />
<br />

## 2. :first-letter
Like `first-line`, it represents the first letter of the text.

Browser Compatibility: https://caniuse.com/#search=%3Afirst-line

```css
p:first-letter {
  font-size: 36px;
  color: green;
}
```

<p class="demo first-letter">
::first-letter selector
</p>

## 3. ::selection
The `selection` selector means those text you selected and highlighted. The color is <b class="bg-blue-300">blue</b> by default for most of the browsers.

Browser Compatibility: https://caniuse.com/#search=%3Aselection

```css
p::selection {
  background: orange;
}
```

<p class="demo selection">
::selection selector
</p>

## 4. :root
The `root` selector represents the root element of a document. In `HTML`, the root element is `<html>` element. In `RSS`, the root element is `<rss>` element.

In most of the modern browsers, it's used for storing custom style properties. Use `var()` as a getter for the stored values.

Browser Compatibility: https://caniuse.com/#search=%3Aroot

```css
:root {
  --bg-color: lightgray;
  --text-color: green;
}

p {
  background: var(--bg-color);
  color: var(--text-color);
}
```

<p class="demo root">
::root selector
</p>

## 5. :empty
The `empty` represents an empy element. An element without `space` `visible content` or `children nodes` is an `empty` element.

Browser Compatibility: https://caniuse.com/#search=%3Aempty

```css
p:empty {
  border: 1px solid black;
  height: 16px;
}
```

```html
<p></p>

<p> </p>

<p><div style="display:hidden;"></div></p>
```

<p class="demo empty"></p>


## 6. :only-child
The `only-child` represents the child node which the parent has only one child node.

Browser Compatibility: https://caniuse.com/#search=%3Aonly-child

```css
div:only-child {
  background: lightgray;
}
```

```html
<div>
  <p>only child</p>
</div>
```

<div>
  <p class="demo only-child">only child</p>
</div>


## 7. :first-of-type
The `first-of-type` represents the node that is the first sibling of its type in the list of children of its parent element.

Browser Compatibility: https://caniuse.com/#search=%3Afirst-of-type

```css
p:first-of-type {
  background: lightgray;
}
```

```html
<div>
  <div>1</div>
  <p>2</p>
  <p>3</p>
</div>
```

<div class="mark-w-md">
  <div>1</div>
  <p class="demo first-of-type">2</p>
  <p>3</p>
</div>


## 8. :last-of-type
But of `first-of-type`, `last-of-type` represents the last.

Browser Compatibility: https://caniuse.com/#search=%3Alast-of-type

```css
p:last-of-type {
  background: lightgray;
}
```

```html
<div>
  <div>1</div>
  <p>2</p>
  <p>3</p>
</div>
```

<div class="mark-w-md">
  <div>1</div>
  <p>2</p>
  <p class="demo last-of-type">3</p>
</div>


## 9. :nth-of-type()
`first-of-type` and `last-of-type` only represents the first or last element. With `nth-of-type`, you can select the node using its index. Remember CSS indexes start from **1**.

Browser Compatibility: https://caniuse.com/#search=%3Anth-of-type

```css
P:nth-of-type(2) {
  background: lightgray;
}
```

```html
<div>
  <div>1</div>
  <p>2</p>
  <p>3</p><!-- this one -->
</div>
```

<div class="mark-w-md">
  <div>1</div>
  <p>2</p>
  <p class="demo nth-of-type">3</p>
</div>

## 10. :nth-last-of-type()
Different form `nth-of-type`, `nth-last-of-type` counts from last one in the children list.

Browser Compatibility: https://caniuse.com/#search=%3Alast-nth-of-type

```css
P:nth-last-of-type(2) {
  background: lightgray;
}
```

```html
<div>
  <div>1</div>
  <p>2</p><!-- this one -->
  <p>3</p>
</div>
```

<div class="mark-w-md">
  <div>1</div>
  <p class="demo nth-last-of-type">2</p>
  <p>3</p>
</div>


## 11. :link
The `link` represents the unvisited `<a>` tag with href.

Browser Compatibility: https://caniuse.com/#search=%3Alink

```css
a:link {
  color: green;
}
```

<p>
  <a class="demo unvisited-link" href="#11-link">:link</a>
</p>


## 12. :valid
It's used in a form with validations. The `valid` represents the node that passed the validation.

Browser Compatibility: https://caniuse.com/#search=%3Avalid

```css
input:valid {
  border: 1px solid green;
}
```

<div class="mark-w-md">
  <input class="demo valid mark-w-md" valid type="text" value=":valid" />
</div>

<br />
<br />
<br />


## 13. :invalid
So to `valid`, `invalid` represents the node that didn't pass the validation.

Browser Compatibility: https://caniuse.com/#search=%3Ainvalid

```css
input:invalid {
  border: 1px solid red;
}
```

<div class="mark-w-md">
  <input class="demo invalid mark-w-md" type="email" value=":invalid" />
</div>

<br />
<br />
<br />


## 14. :lang()
The `lang` represents the node with specified language.

Browser Compatibility: https://caniuse.com/#search=%3Alang

```css
p:lang(ja) {
  color: green;
}

/* or */

p[lang|="ja"] {
  color: green;
}
```

<p class="demo lang" lang="ja">こんにちは</p>


## 15. :not()
The `not` takes a simple selector as an argument. It represents an element that is not represented by its argument.

Browser Compatibility: https://caniuse.com/#search=%3Anot

```css
div :not(p) {
  background: lightgray;
}
```

```html
<div>
  <div>1</div>
  <p>2</p><!-- p tag is not taking effect -->
  <div>3</div>
</div>
```

<div class="demo not mark-w-md">
  <div>1</div>
  <p>2</p>
  <div>3</div>
</div>


These are the 16 pseudo selectors. Hope you've already got farmiliar with these selectors. Actually, there are a lot more pseudo selectors that are non-standards. So I neglected them. If you think this article is great, please share it on other social networks.

Thank you reading!


## References
- [https://www.w3schools.com/cssref/css_selectors.asp](https://www.w3schools.com/cssref/css_selectors.asp)
- [https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)
