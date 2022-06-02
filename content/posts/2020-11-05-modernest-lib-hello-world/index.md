---
title: 'Making a modern JS library in 2020'
slug: modernest-lib-hello-world
date: 2020-11-05
description: "Recently, I was assigned a task of creating a new JS library to replace the obsolete one that's been released for almost 8 years. This is a quite intruiging task because I'm also permitted to try everything new to make this project much more robust."
taxonomies:
  authors: 
    - Yanze Dai
  categories:
    - Javascript
extra:
  keywords: github repo,JS library,javascript library
  image: ./images/cover_image.jpg
---

Recently, I was assigned a task of creating a new JS library to replace the obsolete one that's been released for almost 8 years. This is a quite intruiging task because I'm also permitted to try everything new to make this project much more robust. The first thing came to my mind was to have myself a complex but great "development environment" which explains exactly properly vividly why I'm a DX first developer :D. In this article, I'll demonstrate how I made it with a little "hello-world" repo.

Why the fuss? Is it worth?

Suppose you are in a war, the battalion chief only gives you the bayonet to battle with the enemies. Do you think you dare to charge forward while your enemies are using machine guns? I bet 99% of us are not brave enough to do so (Please don't tell me you'd like to die for glory).

So what if the battalion cheif gives you the most lethal weapon that can defeat your enemies with only one click just like Thanos' snap of fingers? I guess now you got the courage to fight against the enemies :P.

Anyway, I'd like to become that battalion chief providing lethal weapons to my teammates in order to remove the painful part from our development. When our development has become into a joyful experience, I believe the fuss of moving things back and forth is definitely worth of it.

Okay, here is the link to my demo repo:

[https://github.com/daiyanze/modern-hello-world](https://github.com/daiyanze/modern-hello-world)

## The Inspiration

For making our great new library a real modern one, I've been doing some research on varieties of modern JS repos.

- Angular
- Vue-next
- Graphql-js
- popper-js
- next.js
- redux
- and some other interesting libraries

I found that all of these libraries have one thing in common:

> They all happen to conincide having either Jest or Mocha/Chai as their testing suites.

Actually Jest and Mocha/Chai have been in the market for years, they are pretty solid. Even there are some new comers like Ava.js, but they still cannot replace the ones with larger community at the momment.

It's already quite a common sense to choose the libraies with larger communities. Because their code is being tested by many other people, and have more bug fixes. In one word: Almost no one is brave enough to use those librarie that are not being tested thoroughly.

> How to know if a library has a large community?

Simple, just check if they have many Github stars or issues. "Stars" usually means the library is pretty qualified and accepted by developers. "Issues" in some degree refects the community interactivity and library activeness. Those 2 indicators should be very reliable for our technology selection.

Therefore, I will choose those tools as our devDependencies from Github that have lots of stars and issues.

## Dependency Features

Here are some of the mayjor ("must") features for our new project. In my opinion, these features have somewhat been the technology selection standard for a new JS library to start up with in 2020.

### 1. Typescript

Writing code without types was actually a pain in the ass, "TypeError" will surely appear if we don't think of our data type in advance. So nowadays, since Typescript has become into quite a standard or convention of almost all of the new born JS libraries. Without a doubt, this feature is a "must" to our project.

### 2. Jest

Test is another thing that a JS project cannot live without. I believe not a team leader will choose a technology that's not even being tested by itself. So Jest is certainly the utility that we need for tests, as you know they got a big community.

### 3. Prettier

Unifying the team's coding style is time-saving. It matters the most when you are visiting your teammates pull request.

The first time when I saw this tool was 2017. Back then, there was almost no JS code formatters in the open market. Well, Prettier made it available. You can format the code the way you hope it should look like.

And what's more, with the help of ESlinter or TSlinter the editor could become into a really cool stuff for JS developers.

The reason to adopt such tools is simple because:

> They give you hints!

Just take a look at the [Airbnb's javascript style guide](https://github.com/airbnb/javascript) which was created 7 years ago, you'll know how important the code style is.

### 4. Husky & Conventional-changelog

I think everyone has the following insatiable wishes.

> I wish my project can spit out the changelog automatically.
> I wish the commit format can be united.
> I wish ...

These tools may sound stange to you. But they are actually a great combination to generate stable changelogs automatically based on the git commit messages. Angular project is using this approach to create better changelogs.

Take a look at the Angular's beatiful changelog:

```txt
11.0.0-next.3 (2020-09-23)

Bug Fixes

common: add params and reportProgress options to HttpClient.put() overload (#37873) (dd8d8c8), closes #23600
compiler-cli: generate let statements in ES2015+ mode (#38775) (123bff7)
core: ensure TestBed is not instantiated before override provider (#38717) (c8f056b)
forms: type NG_VALUE_ACCESSOR injection token as array (#29723) (2b1b718), closes #29351
Features

common: Add ISO week-numbering year formats support to formatDate (#38828) (984ed39)
compiler: Parse and recover on incomplete opening HTML tags (#38681) (6ae3b68), closes #38596
router: add migration to update calls to navigateByUrl and createUrlTree with invalid parameters (#38825) (7849fdd), closes #38227
service-worker: add the option to prefer network for navigation requests (#38565) (a206852), closes #38194
BREAKING CHANGES

core: If you call TestBed.overrideProvider after TestBed initialization, provider overrides are not applied. This behavior is consistent with other override methods (such as TestBed.overrideDirective, etc) but they throw an error to indicate that, when the check was missing in the TestBed.overrideProvider function. Now calling TestBed.overrideProvider after TestBed initialization also triggers an error, thus there is a chance that some tests (where TestBed.overrideProvider is called after TestBed initialization) will start to fail and require updates to move TestBed.overrideProvider calls before TestBed initialization is completed.

```

> Just don't write the changelog yourself. Let the machines handle them.

Okay, these 4 tools are basically the features I'm really really eager for as a "DX-first" developer. There are of course some other nice features to have, but I think it's already enough to start with at the moment. After all, new more tools will increase the learning time for each of our members.

## The "Rollup"

While I was prototyping my repository, I never thought that Rollup would be the biggest challenge to me. Rollup has a great document which you would understand what it hopes you to do immediately just by looking at the examples. But the true problems locate at how I should handle my output files.

Since my output is a library, I need to rollup all my sources into one JS file that can be used within a browser (or maybe Node.js). This can be easily done by Gulp or Grunt with some plugins. I'm pretty new to this magical tool that has enpowered the most famous frameworks like Vue and React.

Frankly speaking, I don't know much about how I should move next.

In order to save those steps of moving back and forth, I gave up on exploring the Rollup configurations. As you could imagine, there's no way for a "noob" to create something "great" from completely zero.

Alright, then. Let me try another approach.

> If I don't know how to do it, then somebody else should know.

Vue and React have already done the homework, the rest is me copying them :D.
(Very proud of being a copycat~)

I chose [Vue 3.0](https://github.com/vuejs/vue-next) to be my targeted repo because it's quite a new project. And Vue currently has a very high popularity.

Its configuration is a bit complex, but still very easy to understand.

```js
// Part of rollup.config.js in Vue-next repo

import path from 'path'
import ts from 'rollup-plugin-typescript2'
import replace from '@rollup/plugin-replace'
import json from '@rollup/plugin-json'

if (!process.env.TARGET) {
  throw new Error('TARGET package must be specified via --environment flag.')
}

const masterVersion = require('./package.json').version
const packagesDir = path.resolve(__dirname, 'packages')
const packageDir = path.resolve(packagesDir, process.env.TARGET)
const name = path.basename(packageDir)
const resolve = p => path.resolve(packageDir, p)
const pkg = require(resolve(`package.json`))
const packageOptions = pkg.buildOptions || {}

// ensure TS checks only once for each build
let hasTSChecked = false

const outputConfigs = {
  'esm-bundler': {
    file: resolve(`dist/${name}.esm-bundler.js`),
    format: `es`
  },
  ...
}
...

```

After exploring the [Vue 3.0](https://github.com/vuejs/vue-next) configuration file `rollup.config.js`, I found that it only does 3 things:

- receive the command line parameters via another script
- generate list of configs for different types of builds
- export that configs list

Just by doing a bit of copy & pasting, I managed to create a custom Rollup configuration file that has the above features. But I replaced one of the Rollup plugins because I personally favor the official packages.

- Changed `rollup-plugin-typescript` to the official `@rollup/plugin-typescript`

Vue provides various types of builds which I think is a smart move, because the users will have different development purposes and environment.

For now, we could see that Vue offers the following types of build outputs based on the output format of JS code (`es` & `cjs` & `iife`). The ones with a `prod` in the file name is used for production purposes:

```bash
# Vue dist

vue.cjs.js
vue.cjs.prod.js
vue.d.ts
vue.esm-browser.js
vue.esm-browser.prod.js
vue.esm-bundler.js
vue.global.js
vue.global.prod.js
vue.runtime.esm-browser.js
vue.runtime.esm-browser.prod.js
vue.runtime.esm-bundler.js
vue.runtime.global.js
vue.runtime.global.prod.js
```

I hope that this approach can be applied in our project. Similarly but differently, the build outputs with a `dev` in the file name is the ones for development.

And what's more, we don't really separate the builds like Vue by judging if it's the `runtime` or not. So the following outputs are the final targets.

```bash
# hellowrold dist

helloworld.cjs.js # for using our library via `require` method
helloworld.cjs.dev.js
helloworld.d.ts
helloworld.esm.js # for using our library via `import` keyword
helloworld.esm.dev.js
helloworld.js # for browser
helloworld.dev.js
helloworld.modern.js # for modern browser like latest Chrome or latest Firefox
helloworld.modern.dev.js
```

Here is the link to the `rollup.config.js`: [modern-hello-wrold rollup config](https://github.com/daiyanze/modern-hello-world/blob/master/rollup.config.js).

`TLDR;`... but be patient :P.

### some issues of my rollup configuration

#### 1. Type checking issue

It seems that even if I hope to build only one package at a time, the Typescript is checking all of the packages within the monorepo no matter they are dependencies to the build target or not.

Besides, the type checking is likely to happen many times while building multiple packages. I could hear my fan is pretty busy during builds. (This is pretty unnecessary)

[Vue 3.0](https://github.com/vuejs/vue-next) repo used a flag to disable the duplicated type checking while I didn't. I'm not very sure if this is a good approach or not. But it will surely affect our development or even production builds.

#### 2. Declaration exports issue

My helloworld is using the same tool (API-Extractor) and configurations of Vue for extracting the type declarations from the source code. I'm using a different Typescript plugin. Regrading building declaration outputs, I need to pass the `tsconfig.json` parameter `declaration` to that plugin.

Apparently, I didn't do it. Because I opinionatedly thought building without `declaration` would be slightly faster. And this could be a wrong idea. Anyhow, I should optimize this part later.

## The "Build" scripts

I think Vue project is quite smart in the "build" process. They use commands directly together with [execa](https://github.com/sindresorhus/execa) to avoid using the programmable APIs.

```js
execa(
  'rollup',
  [
    '-wc',
    '--environment',
    [
      `NODE_ENV:development`,
      ...
    ]
      .filter(Boolean)
      .join(','),
  ],
  {
    stdio: 'inherit',
  }
);
```

[execa](https://github.com/sindresorhus/execa) gives us the direct experience of using those farmiliar commands just by regroup the fragments together. This made things a lot simpler IMHO.

I was once thinking about using the Rollup APIs to handle the builds. But after taking a look at the official document, I realised that it is a stupid idea. It made me feel like enforcing a newbie guitar player who can only play 3 chords to beat the rythm in a big concert.

In a brief conclusion: sometimes it's maybe a good idea to comprimise to ones making things simpler.

## The "packages"

As I hope to make it a "Monorepo", the `packages/` folder contains all of the necessary builtin modules.

```bash
# In the demo repo, we have 2 modules in total
packages/
  helloworld/
    src/
      index.ts
    index.js
    package.json
  shared/
    src/
      print.ts
    index.js
    package.json
```

The `shared` module is like a **helper** or **util** in a normal repo, but it's used as a package so that I could import it as if I'm using a third party lib.

```js
import { print } from '@helloworld/shared'

function helloWorld() {
  if (__DEV__) {
    print("It's under development")
  }
  print('hello world')
}
```

I personally favor the naming convention of prefixing an `@<global_module_name>` to the package. This made all of my modules look very united.

```json
{
  "name": "@helloworld/shared"
  ...
}
```

I found out that [Vue 3.0](https://github.com/vuejs/vue-next) repo uses `NODE_ENV` to define the target commonjs module (because the `require` context usually ignores the Node environment). It will help the users to include the correct script accordingly.

Inside the root dir of each module, I copied & pasted how [Vue 3.0](https://github.com/vuejs/vue-next) handles its commonjs modules by adding a new entry file.

```js
// packages/helloworld/index.js
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/helloworld.cjs.js')
} else {
  module.exports = require('./dist/helloworld.cjs.dev.js')
}
```

The difference between `helloworld.cjs.js` and `helloworld.cjs.dev.js` in my example is whether it contains the following code block which only serves the script for development. (Have to say that Rollup "treeshaking" is quite an eye opener to me)

```js
...
// "if (__DEV__)" is treeshaked by Rollup

{
  print('It\'s under development')
}
...
```

## The "summary"

During these several weeks of investigation over the [Vue 3.0](https://github.com/vuejs/vue-next) repository, I think I've found enough fresh new stuffs to learn about. My recent task won't get kicked-off easily without those smart ideas from them.

Now my project was succesfully released. When I saw my teammates having fun with the "well-thought repository", I feel my effort is really worth it.
