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
            <a role="tab" bind:tab="tab" click="handleTabClick" class="nav-link"><span bind:tab="tab" bind>{{tab.name}}</span></a>
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
          for (let tab of this.tabs) {
            if (tab.type === feedType.TAGGED_FEED) {
              return tab;
            }
          }
          return this.tabs[0];
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
      this.findAll ('a[role="tab"]').forEach (tabElement => {
        if (tabElement.tab === this.currentTab) {
          tabElement.classList.add ('active');
        } else {
          tabElement.classList.remove ('active');
        }
      });
    })
    this.currentPage = null
    this.changePage (0);
  }

  callForArticles() {
    dispatch (Events.GET_ARTICLES, {
      offset: this.maxArticlesToDisplay * this.currentPage,
      type: this.currentTab.type,
      profileId: this.currentTab.profileId,
    });
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
