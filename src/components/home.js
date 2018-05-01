import {template} from 'slim-js/Decorators'
import {Slim} from 'slim-js'
import Model from '../model'
import {onEvent, Events} from '../event-bus'
import API from '../api'
import UserStatus from '../user-status'
import ArticleList from './article-list'

@template(/*html*/ `
<div class="home-page">

  <div class="container page">

    <!-- header -->
    <div s:if="!isLoggedIn" class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <!-- content -->
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
export default class HomePage extends ArticleList {
  isLoggedIn = false
  userStatus = 0
  prevUserStatus = 0
  articlesOffset = 0
  selectedTag
  taggedTab
  globalTab
  defaultTab
  currentTab

  onRender() {
    onEvent(Events.MODEL_CHANGE, ({prop}) => {
      if (prop === 'userStatus') {
        this.checkUserStatus()
      }
    })
    Slim.bindOwn(this, 'userStatus', () => {
      if (this.userStatus === this.prevUserStatus) return
      this.prevUserStatus = this.userStatus
    })
    this.checkUserStatus()
  }

  handleTagSelected(tag) {
    this.selectedTag = tag
    this.taggedTab.dispatchEvent(new MouseEvent('click'))
  }

  handleTabSelect(event) {
    event.preventDefault()
    this.currentTab = event.currentTarget
    ;[this.defaultTab, this.globalTab, this.taggedTab].forEach(tab => {
      if (tab === this.currentTab) {
        tab.classList.add('active')
      } else {
        tab.classList.remove('active')
      }
    })
    switch (event.currentTarget) {
      case this.taggedTab:
        return this.loadTaggedArticles(this.selectedTag, this.articlesOffset)
      case this.defaultTab:
        return this.loadUserArticles()
      case this.globalTab:
        return this.loadDefaultArticles()
    }
  }

  checkUserStatus() {
    const {userStatus} = Model
    const isLoggedIn = !!Model.user

    this.userStatus = userStatus
    this.isLoggedIn = isLoggedIn

    // if (this.isLoggedIn) {
    //   this.defaultTab.click()
    // } else {
    //   this.globalTab.click()
    // }
  }

  loadUserArticles() {
    API.getArticlesFeed(undefined, this.articlesOffset).then(({articles}) => {
      this.articles = articles
    })
  }

  loadTaggedArticles() {
    API.getArticlesByTag(this.selectedTag, this.articlesOffset).then(
      ({articles}) => {
        this.articles = articles
      }
    )
  }

  loadDefaultArticles() {
    API.getArticles().then(({articles}) => {
      this.articles = articles
    })
  }
}
