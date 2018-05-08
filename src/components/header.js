import {Slim} from 'slim-js'
import {template, tag} from 'slim-js/Decorators'
import model from '../model'
import {Events, dispatch, onEvent} from '../event-bus'
import bindable from '../decorators/bindable'

@tag('app-header')
@template(/*html*/ `
<nav class="navbar navbar-light">
    <div class="container">
    <a class="navbar-brand" href="/#">conduit</a>
    <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
        <!-- Add "active" class when you're on that page" -->
        <a class="nav-link active" href="#/">Home</a>
        </li>
        <li s:if="userProfile" class="nav-item">
            <a class="nav-link" href="#/">
                <i class="ion-compose"></i>&nbsp;New Post
            </a>
        </li>
        <li s:if="user" class="nav-item">
            <a class="nav-link" href="#/settings">
                <i class="ion-gear-a"></i>&nbsp;Settings
            </a>
        </li>
        <li s:if="!userProfile" class="nav-item">
            <a class="nav-link" href="#/login">Sign In</a>
        </li>
        <li s:if="!userProfile" class="nav-item">
            <a class="nav-link" href="#/register">Sign up</a>
        </li>
        <li s:if="userProfile" class="nav-item">
            <a class="nav-link" click="onOwnProfileClick" bind>{{userProfile.username}}</a>
        </li>
    </ul>
    </div>
</nav>`)
class AppHeader extends Slim {
  @bindable('user') userProfile

  constructor() {
    super()
  }

  onOwnProfileClick() {
    dispatch(Events.NAVIGATE_PROFILE, this.userProfile.username)
  }
}
