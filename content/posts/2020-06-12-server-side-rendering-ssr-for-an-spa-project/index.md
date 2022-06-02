---
title: "Server-side rendering (SSR) for an SPA project"
slug: server-side-rendering-ssr-for-an-spa-project
date: 2020-06-12
description: "You may heard of SSR (server-side rendering) or have already been using it in your project. I believe that there are still many questions about when we need it and how we are going to implement it in our project."
taxonomies:
  authors: 
    - Yanze Dai
  categories:
    - Javascript
extra:
  keywords: server-side rendering,ssr,vuejs
  image: ./images/cover_image.jpg
---

> SSR stands for Server-Side Rendering. It is a technique used to improve the perceived page load times.

You may heard of SSR (server-side rendering) or have already been using it in your project. I believe that there are still many questions about when we need it and how we are going to implement it in our project. In this article, we are going to have a peak over this interesting topic.

## 1. What can SSR do for us
First, let's have a look-back on our history. Many years ago when there was no "SPA" at all. All of the web pages were rendered by servers and sent to our browsers for presentation. Technically, this is an SSR behavior and quite common among that period of time. But this "behavior" takes quite a lot of resouces from our server and may frequently cause server-side issues. Later when "SPA" came out to provide solutions to release servers from such burdens and became into the standard of how a web app should look like, we started worrying about some new questions as below.

- **SEO for SPA**
- **Optimization of "above the fold"**

As we know, most of our SPA frameworks have only one root entrance which means our app DOM tree needs to be mounted in one root HTML element to be activated.

```tsx
// Template
<div id="app"></div>

// Vue
new Vue({
  el: "#app",
  data: {
    message: "Hello, world!"
  }
})

// React
ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById("app")
)
```

With the above SPA solution, our app HTML document may look like this.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hello World App</title>
</head>
<body>
  <div id="app"></div>
</body>
</html>
```

It looks a lot simpler right? It does, but the issues when mentioned above came right out. It's not friendly to our searching engines. When the crawler came to our site, there's nothing to crawl about. So when we want to search some content on Google, nothing useful or related to our site will appear.

Besides the searching engine, when our app gets big enough and takes a long time to get to the first paint of the page, this may result in a performance issue. Well, how long will your users give up on opening up your web after loading? **3 seconds**. In the 90s, we didn't quite have a good network condition for websites. We actually waited longer than that. (But we were quite patient :D.)

We want our SPA to be SEO-friendly enough and fast enough. Here comes with the solution to all our annoyances: **SSR**.

With SSR, we can let server compute the page HTML content and return us the complete structure of our SPA (HTML JS CSS). After receiving these resouces, the page will be activated and function as an SPA. This is how SSR works. Pretty simple, isn't it? Same to Springboot Cakephp Ruby-on-rails and other MVC frameworks.


## 2. Downsides for SSR
Before including SSR into our project, we should try to evaluate those figures that could cause a lot of troubles during development and maintenance.

Here are some of the demerits of SSR.

- **Higher Architecture Complexity**
- **Higher Maintenance Complexity**
- **Extra Cost for SSR Clusters**
- **Performance Issues on Rendering Pages**
- **Third-party Library Compatibility and Support**

Adopting SSR means that we are adding a new service layer into front end clusters. The position could be right after the proxy server and in front of our REST API servers. This made the architecture a bit more complex and the maintenance a bit time-consuming.

Usually, SSR use Node.js as their server app which lacks of computing performance for some complicated scenarios. The different pages performance may vary a lot in terms with their business logics. So SSR may increase some extra cost to add more SSR nodes for the project if we want to ensure a fair user experience.

Even if we accept these shortcomings, there is still a technical question left for us: handling 3rd party libraries. This could be the devil sometimes during development. Any mistake we made can deal a big damage to UX or even our traffics. A firm 3rd party library and rapid support are very essential. (You know how "good" JS 3rd party libraries are, right :P?)

In all, SSR mainly helps us with the SEO and firt paint performance, we actually don't have to implement it if our purposes are none of the above. However, there are some best scenarios for SSR to take place.


## 3. Other Solution Alternatives to mitigate SSR downsides
Actually, there are some of the cases that we don't really need SSR. But we could instead do a pitching-in towards the issue directly. The following solutions may have already fit our scenarios.

For first paint optimization
- **Staticize**: We could use SSR libraries to turn those pages that don't require much of the interactions into static files and host them on NFS. In this way, we can avoid maintenance cost on the SSR clusters.

For SEO solutions
- **Pre-render**: Utilize some crawlers or headless browsers like [puppeteer](https://github.com/puppeteer/puppeteer) to crawl the whole site and generate pre-rendered content and cache them somewhere like NFS. This is similar to "Staticize".


## 4. SSR Frameworks
We can utilize the official libraries (vue-ssr-renderer & react-dom/server) provided by **Vue** and **React** to implement SSR functions. However we could also directly introduce the "wheels" into our system to avoid extra development cost.

Now, let's take a look at the **Vue** and **React** community libraries for SSR purposes.

For **Vue**, you have
- [Nuxt.js](https://nuxtjs.org): Quite a famous full stack framework. Similar to React Next.js. Provides isomorphic architecture for client-side and server-side. Recommended for using in production.
- [Vapper.js](https://vapperjs.org): Focusing on Server-side Rendering
- [Ream](https://ream.dev): Could be an alternative to Nuxt.js but with more customizability.
- [Vueniverse](https://github.com/rlindskog/vueniverse): Yet another fullstack framework.
- [Ves](https://www.yuque.com/easy-team/ves/introduction): A fullstack framework. The server-side is based on [egg.js](https://eggjs.org).

For **React**, you have
- [Next.js](https://nextjs.org): Backed by [Vercel](https://vercel.com). Might be the most powerful isomorphic framework in React community.
- [react-server](https://react-server.io): Just another framework to handle React SSR. (Development seems stopped)
- [Razzle](https://github.com/jaredpalmer/razzle): Robust abstracted SSR framework that supports many SPA frameworks.

**Plus:** In my personal opinion. If you start a new project with SSR function, go with Nuxt.js or Next.js coz they have large community and have been developed for a long time. Documentations are fairly well, this saves you a lot of pains at the beginning.

In the end, SSR brings us the solutions to handle the SPA shortcomings. Before you adopt SSR into your project, take a thorough consideration over it. Whether adopt or not, let's give our appreciations to those who worked and are working on making SPA a better tool.
