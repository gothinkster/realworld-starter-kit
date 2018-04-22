import {tag, template, useShadow} from 'slim-js/Decorators';
import {Slim} from 'slim-js';
import CONFIG from '../config';

import AppFooter from './components/footer';
import AppHeader from './components/header';
import HomePage from './components/home';
import RouterOutlet from './router/router-outlet';
import Login from './components/login';
import Register from './components/register';
import API from './api';
import Bus, {dispatch} from './event-bus';

// initialize components
Slim.tag('app-footer', AppFooter);
Slim.tag('app-header', AppHeader);
Slim.tag('home-page', HomePage);
Slim.tag('router-outlet', RouterOutlet);
Slim.tag('conduit-login', Login);
Slim.tag('conduit-register', Register);

import './controller';

import Model from './model';

@tag('conduit-app')
@template(`
    <link href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" rel="stylesheet" type="text/css">
    <link href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic" rel="stylesheet" type="text/css">
    <!-- Import the custom Bootstrap 4 theme from our hosted CDN -->
    <link rel="stylesheet" href="//demo.productionready.io/main.css">
    <div s:if="!appInitialized">Loading...</div>
    <div s:if="appInitialized">
    <app-header></app-header>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
    </div>
`)
@useShadow(false)
class ConduitApp extends Slim {
  appInitialized = false;

  constructor() {
    super();
    API.autoLogin()
      .then(data => dispatch('login-success', data))
      .then(this.onAppInitialized.bind(this))
      .catch(this.onAppInitialized.bind(this));
  }

  onAppInitialized() {
    Model.appInitialized = this.appInitialized = true;
  }
}
