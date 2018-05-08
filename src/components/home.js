import {Slim} from 'slim-js'
import {tag, template} from 'slim-js/Decorators'
import API from '../api'
import bindable from '../decorators/bindable'
import FeedTypes from '../enums/feed-type'
import {dispatch, Events} from '../event-bus'

import {articlesPerPage, articlesByTagPerPage} from '../../config'

const globalTab = {
  name: 'Global Feed',
  type: FeedTypes.GLOBAL_FEED,
}

@tag('home-page')
@template(/*html*/ `
<div class="home-page">

  <div class="container page">
    <div s:if="!userProfile" class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

  </div>

  <div class="container page">
    <div class="row">
      <div class="col-md-9">
        <article-list
          bind:tabs="tabs"
          bind:max-articles-to-display="maxArticlesToDisplay">
        </article-list>
        <!-- <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            <li s:if="isLoggedIn" class="nav-item">
              <a s:id="defaultTab" click="handleTabSelect" class="nav-link" href="#/" bind>Your Feed</a>
            </li>
            <li class="nav-item">
              <a s:id="globalTab" click="handleTabSelect" class="nav-link" href="#/">Global Feed</a>
            </li>
            <li s:if="selectedTag" class="nav-item active" >
              <a s:id="taggedTab" click="handleTabSelect" class="nav-link" href="#/" bind>{{selectedTag}}</a>
            </li>
          </ul>
        </div> -->
        <!-- <article-preview s:repeat="articles"></article-preview> -->
      </div>
      <div class="col-md-3">
        <div class="sidebar">
          <tag-list on-tag-select="handleTagSelected"></tag-list>
        </div>
      </div>

    </div>
  </div>

</div>
`)
export default class HomePage extends Slim {
  @bindable('user') userProfile
  tabs
  offset
  maxArticlesToDisplay
  selectedTab

  onCreated() {
    Slim.bindOwn(this, 'userProfile', () => {
      this.maxArticlesToDisplay = articlesPerPage
      this.offset = 0
      if (this.userProfile) {
        this.tabs = [
          {
            name: 'Your Feed',
            type: FeedTypes.PRIVATE_FEED,
            profileId: this.userProfile.username,
          },
          globalTab,
        ]
      } else {
        this.tabs = [globalTab]
      }
    })
  }
  handleTagSelected(tag) {
    this.tabs = [
      ...this.tabs,
      {
        name: tag,
        type: FeedTypes.TAGGED_FEED,
      },
    ]
  }
}
