import {Slim} from 'slim-js';
import {template} from 'slim-js/Decorators';
import model from '../model';
import Bus from '../event-bus';

@template(`
<nav class="navbar navbar-light">
    <div class="container">
    <a class="navbar-brand" href="/#">conduit</a>
    <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
        <!-- Add "active" class when you're on that page" -->
        <a class="nav-link active" href="#/">Home</a>
        </li>
        <li s:if="user" class="nav-item">
            <a class="nav-link" href="#/">
                <i class="ion-compose"></i>&nbsp;New Post
            </a>
        </li>
        <li s:if="user" class="nav-item">
            <a class="nav-link" href="#/settings">
                <i class="ion-gear-a"></i>&nbsp;Settings
            </a>
        </li>
        <li s:if="!user" class="nav-item">
            <a class="nav-link" href="#/login">Sign In</a>
        </li>
        <li s:if="!user" class="nav-item">
            <a class="nav-link" href="#/register">Sign up</a>
        </li>
        <li s:if="user" class="nav-item">
            <a class="nav-link" href="#/profile" bind>{{user.username}}</a>
        </li>
    </ul>
    </div>
</nav>`)
export default class AppHeader extends Slim {
  user = model.user;

  onAdded() {
    Bus.on('model-changed', e => {
      const {prop} = e.target;
      this.user = model.user;
      this.commit(prop);
    });
  }
}
