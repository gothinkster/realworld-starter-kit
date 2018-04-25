import {template} from 'slim-js/Decorators';
import {Slim} from 'slim-js';
import ReactiveElement from '../common/ReactiveElement';
import {dispatch, onEvent, offEvent, Events} from '../event-bus';
import API from '../api';
import Model from '../model';

import CONFIG from '../../config';
const {articlesPerPage: maxArticlesToDisplay, defaultProfileImage} = CONFIG;

@template(/*html*/ `
<div class="profile-page">
  <div s:if="!profileData">Loading profile...</div>
  <div s:if="profileData" class="user-info">
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <img bind:src="profileData.image" class="user-img" />
          <h4 bind>{{profileData.username}}</h4>
          <p bind>{{profileData.bio}}</p>
          <button class="btn btn-sm btn-outline-secondary action-btn">
            <i class="ion-plus-round"></i>
            <span bind>&nbsp;Follow {{profileData.username}}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  <article-list
    bind:profile-id="profileData.username"
    bind:max-articles-to-display="maxArticlesToDisplay"
    ></article-list>
    <hr/>
</div>
`)
export default class Profile extends ReactiveElement {
  profileData;

  constructor() {
    super();
    this.maxArticlesToDisplay = maxArticlesToDisplay;
  }

  static get observedAttributes() {
    return ['profile-id'];
  }

  onCreated() {
    Slim.bindOwn(this, 'currentPage', () => {
      this.profileData && this.profileIdChanged(this.profileData.username);
    });
  }

  getProfile(id) {
    if (this.profileData && this.profileData.username === id) {
      return Promise.resolve({profile: this.profileData});
    } else {
      return API.getProfile(id);
    }
  }

  async profileIdChanged(profileId) {
    if (profileId) {
      const offset = this.currentPage * maxArticlesToDisplay;
      const {profile: profileData} = await API.getProfile(profileId);
      profileData.image = profileData.image || defaultProfileImage;
      this.profileData = profileData;
      console.log(this.profileData);
    }
  }
}
