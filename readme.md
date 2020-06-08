# ![RealWorld Example App](logo.png)

> ### Event Driven Architecture Vanilla JS Web Components codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.


### [Demo](https://weedshaker.github.io/event-driven-web-components-realworld-example-app)&nbsp;&nbsp;&nbsp;&nbsp;[RealWorld](https://github.com/gothinkster/realworld)
```diff
- Work in progress...
```


This codebase was created to demonstrate a fully fledged fullstack application built with Event Driven Vanilla JS Web Components including CRUD operations, authentication, routing, pagination, and more.

We've gone to great lengths to adhere to the **Document Object Model (DOM)** community styleguides & best practices.

For more information on how to this works with other frontends/backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.


# How it works

> Frontend Event Driven Architecture works basically like the DOM itself. There are loosely coupled components (nodes), which emmit events and those get captured by controllers called stores, routers, etc. 

# Getting started

> Simply open the index.html on a local or remote web server like, node, apache, nginx, etc.

# Explanation

* On a Web Component ```javascript mode=false```, means that this component does not have a shadow DOM attached. Shadow DOM's mostly shine when encapsulating CSS. But the Conduit example has one global CSS Stylesheet and for that reason, it is more efficient to not have shadow DOM's, which all would have to import that CSS separately.

# TODO

1. Router (c-router)
2. Article Store (c-article-store)
3. Article Page (p-articles)
4. Components regarding Article page
5. further to be defined...
