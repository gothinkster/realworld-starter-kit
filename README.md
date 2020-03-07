# ![RealWorld Example App](logo.png)

[![Travis (.org)](https://img.shields.io/travis/jihchi/reason-react-realworld-example-app)](https://travis-ci.org/jihchi/reason-react-realworld-example-app)

> ### ReasonReact (ReasonML) codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.

### [Demo](https://reason-react-realworld-example-app.surge.sh/)&nbsp;&nbsp;&nbsp;&nbsp;[RealWorld](https://github.com/gothinkster/realworld)

This codebase was created to demonstrate a fully fledged fullstack application built with **ReasonReact (ReasonML)** including CRUD operations, authentication, routing, pagination, and more.

We've gone to great lengths to adhere to the **ReasonReact (ReasonML)** community styleguides & best practices.

For more information on how to this works with other frontends/backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.

# How it works

Basically its just like React single-page-application but written in ReasonML with ReasonReact.

- App bootstraped with [Create React App](https://github.com/facebook/create-react-app)
- Along with [BuckleScript](https://bucklescript.github.io/)
- Routing - ReasonReact's [Router](https://reasonml.github.io/reason-react/docs/en/router.html)
- Unit test - jest with [`@glennsl/bs-jest`](https://github.com/glennsl/bs-jest) plus [react-testing-library](https://github.com/kentcdodds/react-testing-library)

# Getting started

You can view a live demo over at https://reason-react-realworld-example-app.surge.sh/

To get the frontend running locally:

```bash
git clone https://github.com/jihchi/reason-react-realworld-example-app.git
cd reason-react-realworld-example-app
npm install
npm start
```

Then open http://localhost:3000 to see your app.

When you’re ready to deploy to production, create a minified bundle with `npm run build` and you will find result in folder `/build`
