import {Slim} from 'slim-js'
import {tag, template} from 'slim-js/Decorators'
import API from '../api'
import bindable from '../decorators/bindable'
import FeedTypes from '../enums/feed-type'
import {dispatch, Events} from '../event-bus'

import {articlesPerPage, articlesByTagPerPage} from '../../config'
import feedType from '../enums/feed-type';

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
    for (let tab of this.tabs) {
      if (tab.name === '#' + tag) {
        return
      }
    }
    const newTab = {
      name: '#' + tag,
      type: feedType.TAGGED_FEED,
      tag: tag,
      removable: true
    }
    this.tabs = [
      ...this.tabs,
      newTab,
    ]
  }
}
