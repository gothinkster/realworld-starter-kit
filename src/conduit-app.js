import {tag, template} from 'slim-js/Decorators'
import {dispatch, Events} from './event-bus'
import injectable from './decorators/injectable'
import {Slim} from 'slim-js'
import bindable from './decorators/bindable'

@tag('conduit-app')
@template(/*html*/ `
    <link href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" rel="stylesheet" type="text/css">
    <link href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="./assets/ball-newtor-cradle.css" />
    <link rel="stylesheet" href="//demo.productionready.io/main.css">
    <!-- <loading-modal></loading-modal> -->
    <app-header></app-header>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
`)
@injectable({
  dispatch,
})
class ConduitApp extends Slim {
  @bindable('user') myUser
  onRender() {
    this.dispatch(Events.INIT_APP, 'Starting up')
  }
}
