import './components/header'
import './conduit-app'
import './components/newton-spinner'
import './components/loading-modal'
import './controller/index'

// import {tag, template} from 'slim-js/Decorators'
// import {Slim} from 'slim-js'
// import CONFIG from '../config'
// import Bus, {
//   onEvent,
//   onModelChanged,
//   Events,
//   offEvent,
//   dispatch,
// } from './event-bus'
// import Model from './model'

// // start controllers
// import './controller'

// // initialize components

// import AppFooter from './components/footer'
// import AppHeader from './components/header'
// import HomePage from './components/home'
// import RouterOutlet from './router/router-outlet'
// import Login from './components/login'
// import Register from './components/register'
// import Settings from './components/settings'
// import Profile from './components/profile'
// import ArticlePreview from './components/article-preview'
// import ArticleList from './components/article-list'
// import TagList from './components/tag-list'
// import ArticlePage from './components/article-page'

// Slim.tag('app-footer', AppFooter)
// Slim.tag('app-header', AppHeader)
// Slim.tag('home-page', HomePage)
// Slim.tag('router-outlet', RouterOutlet)
// Slim.tag('conduit-login', Login)
// Slim.tag('conduit-register', Register)
// Slim.tag('conduit-settings', Settings)
// Slim.tag('profile-page', Profile)
// Slim.tag('article-preview', ArticlePreview)
// Slim.tag('article-list', ArticleList)
// Slim.tag('tag-list', TagList)
// Slim.tag('article-page', ArticlePage)

// @tag('conduit-app')
// @template(/*html*/ `
//     <link href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" rel="stylesheet" type="text/css">
//     <link href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic" rel="stylesheet" type="text/css">
//     <link rel="stylesheet" href="./assets/ball-newtor-cradle.css" />
//     <!-- Import the custom Bootstrap 4 theme from our hosted CDN -->
//     <link rel="stylesheet" href="//demo.productionready.io/main.css">
//     <dialog s:id="modal" s:if="modalCount" open>
//       <div>Loading data...</div><hr/><div class="la-ball-newton-cradle la-2x"><div></div><div></div><div></div><div></div></div>
//     </dialog>
//     <app-header></app-header>
//     <router-outlet></router-outlet>
//     <div s:if="!appInitialized">Loading...</div>
//     <app-footer></app-footer>
// `)
// class ConduitApp extends Slim {
//   appInitialized = false
//   modal
//   modalCount = 0

//   constructor() {
//     super()
//     onEvent(Events.APP_READY, () => {
//       this.appInitialized = true
//     })
//   }

//   onRender() {
//     onEvent(Events.OPEN_MODAL, () => {
//       this.modalCount++
//     })
//     onEvent(Events.CLOSE_MODAL, () => {
//       this.modalCount--
//       if (this.modalCount < 0) {
//         this.modalCount = 0
//       }
//     })

//     // Automatic login on startup
//     dispatch(Events.INIT_APP)
//   }

//   onRemoved() {}
// }
