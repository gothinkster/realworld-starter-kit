# ![RealWorld Example App](logo.png)

> ### Event Driven Architecture Vanilla JS Web Components codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.


### [Demo](https://weedshaker.github.io/event-driven-web-components-realworld-example-app)&nbsp;&nbsp;&nbsp;&nbsp;[Test](https://weedshaker.github.io/event-driven-web-components-realworld-example-app/test)&nbsp;&nbsp;&nbsp;&nbsp;[RealWorld](https://github.com/gothinkster/realworld)
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

# Explanations

* **ShadowDOM**'s mostly shine when encapsulating CSS. But the Conduit example has one global CSS Stylesheet and for that reason, it is more efficient to not have shadowDOM's, which all would have to import that global CSS separately. Note: The biggest strength of Web Components is their shadowDOM, means in a real life examples you would share general CSS styles through CSS variables and have specific styles on each component in their respective shadowDOM. This will improve performance, since the DOM renderer only needs to respect certain CSS for certain nodes/shadowDOM's. There is a good helper Class, which you can use to simply add CSS with the lines: ```this.css = '...' ``` and to avoid resetting nodes with innerHTML, it includes a function: ```this.html = '' ```. Overall, this prototype Class helps you to easily and comfortably deal with the ShadowDOM. Have a look at: [Weedshaker's web components *(work in progress)*](https://github.com/Weedshaker/web-components/blob/master/prototypes/MasterShadow.js)

# TODO

0. Tests (controllers/Favorite.js + molecules/ArticlePreview.js + organisms/ListArticlePreviews.js)
1. home (pages + tags + Tests)
2. login
3. register
4. settings
5. editor
6. article
7. profile
