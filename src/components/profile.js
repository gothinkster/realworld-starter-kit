import {template} from 'slim-js/Decorators'
import {Slim} from 'slim-js'
import ArticlesView from './articles-view'
import ReactiveElement from '../common/ReactiveElement'
import {dispatch, onEvent, offEvent, Events} from '../event-bus'
import API from '../api'
import Model from '../model'

import CONFIG from '../../config'
const {articlesPerPage: maxArticlesToDisplay, defaultProfileImage} = CONFIG

@template(/*html*/ `
<h2>Profile</h2>
<div class="profile-page">
  <div s:if="profileData" class="user-info">
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <img bind:src="profileData.image" class="user-img" />
          <h4 bind>{{profileData.username}}</h4>
          <p bind>{{profileData.bio}}</p>
          <button class="btn btn-sm btn-outline-secondary action-btn">
            <i class="ion-plus-round"></i>
            <span bind>&nbsp; Follow {{profileData.username}}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  <article-list
        bind:tabs="tabs"
        bind:articles="articles"
        on-tab-select="handleTabSelected"
        on-change-page="handlePageChanged"></article-list>
</div>`)
export default class Profile extends ArticlesView {
  profileData

  constructor() {
    super()
    onEvent(Events.MODEL_CHANGE, ({prop, value}) => {
      if (prop === 'user' && value) {
        this.profileData = value
      }
    })
  }

  static get observedAttributes() {
    return ['profile-id']
  }

  static get template() {
    return Object.getPrototypeOf(this).template
  }

  async profileIdChanged(profileId) {
    try {
      if (profileId === this.profileData.username) return
    } catch (err) {}
    let profile
    if (String(profileId) === 'null' || String(profileId) === 'undefined')
      return
    if (Model.user && profileId === Model.user.username) {
      profile = Model.user
      this.tabs = [
        {name: 'Your Feed', count: 0, type: 'own'},
        {name: 'Global Feed', count: 0, type: 'global'},
      ]
    } else {
      const data = await API.getUser(profileId)
      profile = data.profile
      this.tabs = [
        {name: `${profileId}'s Feed`, count: 0, type: 'profile', profileId},
      ]
    }
    profile.image = profile.image || defaultProfileImage
    this.profileData = profile
    this.handleTabSelected(this.tabs[0])
  }
}
