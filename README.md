# qs-client-boilerplate
Boilerplate for QS client-side projects. 

## Features
* React and Redux
* ES6 support
* Webpack with React/Redux hot reloading
* Modular CSS/Sass (now with namespaces!)
* flex-box centric design
* Mocha/Chai test support
* .eslint preconfigured

## Setup and Installation
As this is boilerplate, you probably want to fork the project.
Given that these projects will be in the same organization, it has few additional steps.
```
git clone https://github.com/QuantifiedSelfless/qs-client-boilerplate.git
mv qs-personalized-news 
cd qs-personalized-news
```
Create a new project with your desired name on Github, qs-personalized-news for example.
```
git remote set-url origin https://github.com/QuantifiedSelfless/qs-personalized-news
git push origin master
```
## Usage
go ahead and look at the package.json "scripts" section. These commands are defined there.

* `npm run dev` - starts the webpack-dev-server (supports hot-module reloading) at localhost:8080  
* `npm run prod` - builds the app in dist/  
* `npm run clean` - deletes dist and dev_build  
* `npm run tests` - doesn't do anything at moment, but theoretically runs your Mocha/Chai scripts in the test directory


## Sources and Motivation
1. [Fullstack React/Redux Tutorial](http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html) - this tutorial will take 10+ hours, but is one of the best I've found.
2. [A Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
3. [React Webpack Cookbook](https://christianalfoni.github.io/react-webpack-cookbook/)
4. [The End of Global CSS](https://medium.com/seek-ui-engineering/the-end-of-global-css-90d2a4a06284#.taaczapdi)

If you read through these 4 (the first one being by far the most time-intensive), you should have a good understanding of this projects structure.  
Feel free to edit/branch/do whatever with this repo. Don't feel like the current version is the end-all-be-all, there are countless improvemetns to make.
