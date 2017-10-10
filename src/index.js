require('./index.scss')

// IE11?
// require('babel-polyfill');

import {Slim} from "slim-js/Slim";
import {tag, template, useShadow, attribute} from "slim-js/Decorators";

@tag('awesome-app')
@template(`
<h1 bind>[[myGreeting]]</h1>
<div>Welcome to web components!</div>
`)
@useShadow(true)
class AwesomeApp extends Slim {

    @attribute
    myGreeting;

}