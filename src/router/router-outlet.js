import {tag, template} from 'slim-js/Decorators';
import {Slim} from 'slim-js';
import Router from './router';

const PAGES = ['login', 'register', 'settings'];
const PAGES_ID = ['profile'];

@template(/*html*/ `
  <div s:switch="currentRoute">
    <home-page s:case="home"></home-page>
    <conduit-login s:case="login"></conduit-login>
    <conduit-register s:case="register"></conduit-register>
    <conduit-settings s:case="settings"></conduit-settings>
    <conduit-profile s:case="profile" bind:profile-id="routeParams"></conduit-profile>
  </div>
`)
export default class RouterOutlet extends Slim {
  currentRoute = '';
  routeParams;

  constructor() {
    super();

    Router.on('/', () => (this.currentRoute = 'home'));

    for (let route of PAGES) {
      Router.on(`/${route}`, () => {
        this.currentRoute = route;
      });
    }

    for (let route of PAGES_ID) {
      Router.on(`/${route}/@:id`, params => {
        this.routeParams = params.id ? params.id : this.routeParams;
        this.currentRoute = route;
      });
    }

    Router.resolve();
  }
}
