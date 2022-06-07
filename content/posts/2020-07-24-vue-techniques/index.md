---
title: "Have You Mastered These 9 Vue Techniques?"
slug: vue-techniques
description: "Now Vue.js has become a hot framework for front end development. There are a lot of engineers utilizing the convenience and powerful features of Vue.js. Yet, some of the solutions we've done might not follow the best practice. Well, let's take a look at those must-know Vue techniques."
date: 2020-07-24
taxonomies:
  authors: 
    - Yanze Dai
  categories:
    - Javascript
    - Vue
extra:
  keywords: vue techniques,vue API,vue usage
  image: ./images/cover_image.png
---

Now [Vue.js](https://vuejs.org) has become a hot framework for front end development. There are a lot of engineers utilizing the convenience and powerful features of [Vue.js](https://vuejs.org). Yet, some of the solutions we've done might not follow the best practice. Well, let's take a look at those must-know [Vue](https://vuejs.org) techniques.


## 1. Functional Component
A [functional component](https://vuejs.org/v2/guide/render-function.html#Functional-Components) is **stateless** and has not `lifecycle` or `methods`. So it cannot be instantiated

It's very easy to create a functional component, all you need to do is to add a `functional: true` property to the SFC or adding `functional` to the template. Since it's as light as a function and has no instance reference, the rendering performance is quite improved.

Functional component relys on the `context` and mutates along with the given data within it.

```html
<template functional>
  <div class="book">
    {{book.name}} {{book.price}}
  </div>
</template>
```

```html
<script>
Vue.component('book', {
  functional: true,
  props: {
    books: {
      type: () => ({}),
      required: true
    }
  },
  render: function (createElement, context) {
    return createElement(
      'div',
      {
        attrs: {
          class: 'book'
        }
      },
      [context.props.book]
    )
  }
})
</script>
```


## 2. Deep Selectors
Sometimes you even need to cha the third party components CSS which are `scoped` styles. It' impossbile to remove the `sc ope` or open a new style.

Now the [deep selectors](https://vue-loader.vuejs.org/guide/scoped-css.html#child-component-root-elements)&nbsp;`>>>` `/deep/` `::v-deep` come into the right place for help.

```html
<style scoped>
>>> .scoped-third-party-class {
  color: gray;
}
</style>
```

```html
<style scoped>
/deep/ .scoped-third-party-class {
  color: gray;
}
</style>
```

```html
<style scoped>
::v-deep .scoped-third-party-class {
  color: gray;
}
</style>
```


## 3. Advanced "watcher"

#### execute immedately
`watch` handler triggers when the monitered prop mutates. But sometimes, it's expected right after the component icreated.

Yea, there's a simple solution: invoke the handler in the `created` hook. But that doesn't look elegant and meanwhile levels up the complexity.

Or you could add an `immediate` property to watcher:

```js
watch: {
    value: {
        handler: 'printValue',
        immediate: true
    }
},
methods : {
  printValue () {
    console.log(this.value)
  }
}
```

#### deep listening
Sometimes the watcher prop is an `Object`. But its properties mutation cannot trigger the watcher handler. In this case, adding `deep: true` to watcher can make its properties' mutation detectable.

**Note** that `deep` may cause some serious performance issues when your `Object` has many layers. It's better to think about using a rather flatten data structure instead.

```js
data () {
  return {
    value: {
      one: {
        two: {
          three: 3
        }
      }
    }
  }
},
watch: {
  value: {
    handler: 'printValue',
    deep: true
  }
},
methods : {
  printValue () {
    console.log(this.value)
  }
}
```

#### multiple handlers
Actually watcher can be set as an `Array`. Supported types are `String` | `Function` | `Object`. The registered watcher handlers will be invoked one by one when triggered.

```js
watch: {
  value: [
    'printValue',
    function (val, oldVal) {
      console.log(val)
    },
    {
      handler: 'printValue',
      deep: true
    }
  ]
},
methods : {
  printValue () {
    console.log(this.value)
  }
}
```

#### subscribe to multiple variables mutation
`watcher` cannot listen to multiple variables , but we could combine the targets together as a new `computed` and watch this new "variable".

```js
computed: {
  multipleValues () {
    return {
      value1: this.value1,
      value2: this.value2,
    }
  }
},
watch: {
  multipleValues (val, oldVal) {
    console.log(val)
  }
}
```

## 4. Event argument: $event
`$event` is a special variable of Event Object. It provides more optional arugment in some scenarios for the complex functionalities.

#### native events
In native events, the value is the same to the default event (DOM event or window event).

```html
<template>
  <input type="text" @input="handleInput('hello', $event)" />
</template>

<script>
export default {
  methods: {
    handleInput (val, e) {
      console.log(e.target.value) // hello
    }
  }
}
</script>
```

#### custom events
In custom events, the value is what's captured from its child component.

```html
<!-- Child -->
<template>
  <input type="text" @input="$emit('custom-event', 'hello')" />
</template>
```

```html
<!-- Parent -->
<template>
  <Child @custom-event="handleCustomevent" />
</template>

<script>
export default {
  methods: {
    handleCustomevent (value) {
      console.log(value) // hello
    }
  }
}
</script>
```

## 5. Router Parameter Decoupling
I believe this is how most people handle the router parameters in a component:

```js
export default {
  methods: {
    getRouteParamsId() {
      return this.$route.params.id
    }
  }
}
```

Using `$route` inside a component will generate a strong coupling for the certain URL. This limited the flexibility of a component.

The correct solution is to add `props` to the `Router`.

```js
const router = new VueRouter({
  routes: [{
    path: '/:id',
    component: Component,
    props: true
  }]
})
```

In this way, component can get `params` directly from props.

```js
export default {
  props: ['id'],
  methods: {
    getParamsId() {
      return this.id
    }
  }
}
```

In addition, you can also pass in a function to return the `props` for customization purposes.

```js
const router = new VueRouter({
  routes: [{
    path: '/:id',
    component: Component,
    props: router => ({ id: route.query.id })
  }]
})
```

## 6. Two-way Binding for Custom Components
>Allows a custom component to customize the prop and event used when it’s used with v-model. By default, v-model on a component uses value as the prop and input as the event, but some input types such as checkboxes and radio buttons may want to use the value prop for a different purpose. Using the model option can avoid the conflict in such cases.

`v-model` is well-known for two-way binding. `input` is the default update event. The value can be updated via `$emit`. The only limitation is that the component needs an `<input>` tag to bind with the `value` prop.

```html
<my-checkbox v-model="val"></my-checkbox>
```

```html
<template>
  <input type="checkbox" :value="value" @input="handleInputChange(value)" />
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleInputChange (val) {
      console.log(val)
    }
  }
}
</script>
```

There's another solution to two-way binding which is `sync` modifier. Different to `v-model`, it doesn't require your component to have an `<input>` tag and bind the value to it. It only triggers `update:<your_prop>` to mutate the prop via event system.

```html
<custom-component :value.sync="value" />
```

## 7. Component Lifecycle Hook
Normally, you can listen to child component lifecycle (e.g `mounted`) like this

```html
<!-- Child -->
<script>
export default {
  mounted () {
    this.$emit('onMounted')
  }
}
</script>
```

```html
<!-- Parent -->
<template>
  <Child @onMounted="handleOnMounted" />
</template>
```

There's another simple solution to this. You can use the `@hook:mounted` instead. It's used within the Vue internal system.

```html
<!-- Parent -->
<template>
  <Child @hook:mounted="handleOnMounted" />
</template>
```


## 8. Event Listener APIs
For instance, adding a timer when the page mounted but the timer needs to be cleared when destroyed. This looks good.

Frankly speaking, `this.timer` only makes sense whenused within `beforeDestroy` to get the timer id. Not being mean, but fewer reative variables you have the better performance you'll have.

```js
export default {
  data () {
    return {
      timer: null
    }
  },
  mounted () {
    this.timer = setInterval(() => {
      console.log(Date.now())
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
```

Make it accessable only within the lifecycle hook. Using `$once` to let go of the unnecessary stuffs.

```js
export default {
  mounted () {
    let timer = null

    timer = setInterval(() => {
      console.log(Date.now())
    }, 1000)

    this.$once('hook:beforeDestroy', () => {
      clearInterval(timer)
    })
  }
}
```


## 9. Mount Components Programmatically
In some scenarios, it's much more elegant to load a component programmatically. For instance, a popup window or modal can be open up via a global context `$popup()` or `$modal.open()`.

```js
import Vue from 'vue'
import Popup from './popup'

const PopupCtor = Vue.extend(Popup)

const PopupIns = new PopupCtr()

PopupIns.$mount()

document.body.append(PopupIns.$el)

Vue.prototype.$popup = Vue.$popup = function () {
  PopupIns.open()
}
```

[Element UI](https://github.com/ElemeFE/element/blob/dev/packages/message-box/src/main.js) implemented a well structured modal component which allows to use custom APIs to control the lifecycle of the instance. The theory is pretty much the same to what I demo above.

These are the 9 techniques about Vue 2.x. Hope throughout this artcile you can have a better vision of utilizing the framework.
If you think this article is great, please share it on other social networks.

Thank you reading!


## References
- https://vuejs.org
- https://www.digitalocean.com/community/tutorials/vuejs-add-v-model-support
- https://vue-loader.vuejs.org/guide/scoped-css.html#child-component-root-elements
