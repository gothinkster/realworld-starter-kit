import {Slim} from 'slim-js';
import {template, tag} from 'slim-js/Decorators';
import config from '../../config';
import API from '../api';
import bindable from '../decorators/bindable';
import feedType from '../enums/feed-type';
import {dispatch, Events} from '../event-bus';

@tag ('article-list')
@template (/*html*/ `
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-md-10 offset-md-1">
      <div class="articles-toggle">
        <ul class="nav nav-pills outline-active">
          <li class="nav-item" s:repeat="tabs as tab">
            <a role="tab" bind:tab="tab" class="nav-link">
              <span bind:tab="tab" click="handleTabClick" bind>{{tab.name}}</span>
              <span s:if="tab.removable" click="handleTabCloseClick">&nbsp;&nbsp;<i class="ion-close-round"></i></span>
            </a>
          </li>
        </ul>
      </div>
      <span bind>{{message}}</span>
      <article-preview s:repeat="articles"></article-preview>
      <ul class="pagination">
        <li s:repeat="pagination"
          class="page-item"
          click="handlePaginationClick"
          role="pagination">
          <span class="page-link" bind>{{data}}</span>
        </li>
      </ul>
      &nbsp;
    </nav>
    </div>
  </div>
</div>
`)
export default class ArticleList extends Slim {
  @bindable ('articles', ['articlesChanged']) articles
  @bindable ('articlesCount', ['createPagination']) articlesCount
  tabs
  selectedTab
  pagination
  currentPage
  zeroArticles
  maxArticlesToDisplay = 5

  onBeforeCreated () {
    this.message = 'Loading articles...'
  }

  onCreated () {
    Slim.bindOwn (this, 'tabs', () => {
      if (!this.tabs) {
        return;
      }
      Promise.resolve ()
        .then (() => {
          let targetTab = this.tabs[0]
          for (let tab of this.tabs) {
            if (tab.type === feedType.TAGGED_FEED) {
              targetTab = tab
            }
          }
          return targetTab;
        })
        .then (tab => {
          this.changeTab (tab);
        });
    });
  }

  articlesChanged () {
    Slim.asap(() => {
      if (this.articles && this.articlesCount === 0) {
        this.message = 'No articles are here... yet.'
      } else if (!this.articles) {
        this.message = 'Loading articles...'
      } else {
        this.message = ''
      }
    })
  }

  changeTab (tab) {
    if (this.currentTab === tab) {
      return;
    }
    this.currentTab = tab;
    Slim.asap(() => {
      this.applyTabEffects()
    })
    this.currentPage = null
    this.changePage (0);
  }

  callForArticles() {
    dispatch (Events.GET_ARTICLES, {
      offset: this.maxArticlesToDisplay * this.currentPage,
      type: this.currentTab.type,
      tag: this.currentTab.tag,
      profileId: this.currentTab.profileId,
    });
  }

  handleTabCloseClick(event) {
    event.preventDefault()
    const {currentTarget} = event
    const {tab} = currentTarget
    const currentTabRemoved = tab === this.currentTab
    const idx = this.tabs.indexOf(tab)
    this.tabs.splice(idx, 1)
    this.tabs = this.tabs
    if (currentTabRemoved) {
      this.changeTab(this.tabs[0])
    }
    this.applyTabEffects()
  }

  handleTabClick({currentTarget}) {
    this.changeTab (currentTarget.tab);
  }

  handlePaginationClick({currentTarget}) {
    this.changePage(currentTarget.data - 1);
  }

  createPagination () {
    let length = Math.ceil (this.articlesCount / this.maxArticlesToDisplay);
    if (isNaN (length)) {
      length = 0;
    }
    this.pagination = length > 1
      ? Array (length).fill ().map ((_, i) => i + 1)
      : [];
    this.applyPaginationEffects()
  }

  changePage (page = 0) {
    if (this.currentPage === page) {
      return;
    }
    this.currentPage = page;
    this.callForArticles()
  }

  applyTabEffects() {
    this.findAll ('a[role="tab"]').forEach (tabElement => {
      if (tabElement.tab === this.currentTab) {
        tabElement.classList.add ('active');
      } else {
        tabElement.classList.remove ('active');
      }
    });
  }

  applyPaginationEffects () {
    Slim.qSelectAll (this, 'li[role="pagination"]').forEach (el => {
      if (el.data === this.currentPage + 1) {
        el.classList.add ('active');
      } else {
        el.classList.remove ('active');
      }
    });
  }
}
