import {tag, template} from 'slim-js/Decorators'
import {Slim} from 'slim-js'
import Router from './router'

@template(/*html*/ `
  <div s:switch="currentRoute">
    <!-- <home-page s:case="home"></home-page> -->
    <conduit-login s:case="login"></conduit-login>
    <profile-page s:id="profilePage" s:case="profile"></profile-page>
    <home-page s:id="homePage" s:case="home"></home-page>
    <conduit-register s:case="register"></conduit-register>
    <conduit-settings s:case="settings"></conduit-settings>
  </div>
`)
export default class RouterOutlet extends Slim {
  currentRoute = ''

  constructor() {
    super()
    Router.on('/', () => (this.currentRoute = 'home'))

    Router.on('/:page', ({page}) => (this.currentRoute = page))
    Router.on('/profile/@:id', ({id}) => {
      this.currentRoute = 'profile'
      this.profilePage.setAttribute('profile-id', id)
    })
    Router.on('/article/:id', params => {
      this.currentRoute = 'article'
      this.articlePage.articleId = params
    })
  }

  onCreated() {
    Slim.bindOwn(this, 'currentRoute', () => {
      console.log('Route detected', this.currentRoute)
    })
    Slim.asap(() => {
      Router.resolve()
    })
  }
}
