import {template, tag} from 'slim-js/Decorators'
import {Slim} from 'slim-js'
import ReactiveElement from '../common/ReactiveElement'
import {dispatch, onEvent, offEvent, Events} from '../event-bus'
import API from '../api'
import Model from '../model'

import CONFIG from '../../config'
import bindable from '../decorators/bindable';
import feedType from '../enums/feed-type';
const {articlesPerPage: maxArticlesToDisplay} = CONFIG

@tag('profile-page')
@template(/*html*/ `
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
    bind:max-articles-to-display="maxArticlesToDisplay">
  </article-list>
</div>`)
export default class Profile extends Slim {
  @bindable('profile', ['profileChanged']) profileData
  routeParams
  profileId
  tabs

  onAdded () {
    const {/* @type string */ profileId} = this.routeParams
    if (profileId.startsWith('@')) {
      this.profileId = profileId.slice(1)
    } else {
      this.profileId = profileId
    }
    dispatch(Events.GET_PROFILE, this.profileId)
    dispatch(Events.GET_ARTICLES, {
      profileId: this.profileId,
      offset: 0,
      type: feedType.PROFILE_FEED
    })
  }

  profileChanged() {
    this.tabs = [
      {
        name: 'My Articles',
        type: feedType.PROFILE_FEED,
        profileId: this.profileId
      },
      {
        name: 'Favourited Articles',
        type: feedType.FAV_FEED,
        profileId: this.profileId
      }
    ]
  }

}


