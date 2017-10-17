require('./index.scss')

// IE11?
// require('babel-polyfill');

import {Slim} from "slim-js/Slim";
import Slix, {bind as autobind} from "slix";
import {tag, template, useShadow, attribute} from "slim-js/Decorators";

const appModel = Slix.model('appModel', {
    user: {
        first: '',
        last: ''
    }
});

@tag('awesome-app')
@template(`
<h1 bind>[[myGreeting]]</h1>
<h2 bind>Welcome to web components [[model.user.first]] [[model.user.last]]!</h2>
<div>I am a native web component.<br/>Open the developer tools and try modifying my attributes, properties and see how the magic happens</div>
<hr/>
<input type="text" placeholder="First name" change="firstNameChangeHandler" />
<input type="text" placeholder="Last name" change="lastNameChangeHandler" />
`)
@useShadow(true)
class AwesomeApp extends Slim {

    @attribute
    myGreeting;

    onBeforeCreated() {
        this.model = appModel;
    }

    @autobind(appModel, 'user.first')
    modelFirstNameChanged() {
        console.log(this.model.user.first);
        this.update();
    }

    @autobind(appModel, 'user.last')
    modelLastNameChanged() {
        console.log(this.model.user.last);
        this.update();
    }

    firstNameChangeHandler(e) {
        this.model.user.first = e.target.value;
    }

    lastNameChangeHandler(e) {
        this.model.user.last = e.target.value;
    }

}