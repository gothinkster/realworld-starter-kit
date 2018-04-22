import {tag, template} from 'slim-js/Decorators';
import {Slim} from 'slim-js';
import Router from './router';

@template(`
  <div s:switch="currentRoute">
    <home-page s:case="home"></home-page>
    <conduit-login s:case="login"></conduit-login>
    <conduit-register s:case="register"></conduit-register>
  </div>
`)
export default class RouterOutlet extends Slim {
  currentRoute = '';

  constructor() {
    super();
    Router.on('/profile/:id', (params, query) => {
      this.currentRoute = 'profile';
    });

    Router.on('/', () => (this.currentRoute = 'home'));

    ['login', 'register'].forEach(route => {
      Router.on(`/${route}`, () => {
        this.currentRoute = route;
      });
    });

    Router.resolve();
  }
}
