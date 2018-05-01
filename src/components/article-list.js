import {Slim} from 'slim-js'
import {template} from 'slim-js/Decorators'
import config from '../../config'
import API from '../api'

@template(/*html*/ `
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-md-10 offset-md-1">
      <div class="articles-toggle">
        <ul class="nav nav-pills outline-active">
          <li class="nav-item" s:repeat="tabs as tab">
            <a bind:tab="tab" click="handleTabChange" class="nav-link" bind><span bind:tab="tab" bind>{{tab.name}}</span><span class="article-count" bind>{{tab.count}}</span></a>
          </li>
        </ul>
      </div>
      <div s:if="noArticlesMessage(articles)" bind>{{noArticlesMessage(articles)}}</div>
      <article-preview s:repeat="articles"></article-preview>
        <ul s:if="isReady" class="pagination">
          <li s:repeat="pagination"
            class="page-item"
            role="pagination"
            click="changePage">
            <a class="page-link" bind>{{data}}</a>
          </li>
        </ul>
        &nbsp;
    </nav>
    </div>
  </div>
</div>
`)
export default class ArticleList extends Slim {
  articles
  tabs = []
  selectedTab
  pagination = []
  currentPage = 0
  maxArticlesToDisplay = 5

  noArticlesMessage(list) {
    if (list && list.length === 0) return 'No Articles...'
    return undefined
  }

  onCreated() {
    Slim.bindOwn(this, 'tabs', () => {
      this.selectedTab = this.tabs[0]
      this.createPagination()
    })
    Slim.bindOwn(this, 'articles', () => {
      this.createPagination()
      this.changePage(0)
    })
  }

  changeTab(tab) {
    this.currentTab = tab
    this.callAttribute('on-tab-select', this.currentTab)
    this.changePage(0)
  }

  handleTabChange({currentTarget}) {
    this.changeTab(currentTarget.tab)
  }

  changePage({currentTarget}) {
    console.log('Page: ', currentTarget.data)
  }

  createPagination() {
    if (!this.articles) return
    const length = Math.ceil(this.articles.total / this.maxArticlesToDisplay)
    this.pagination =
      length > 1
        ? Array(length)
            .fill()
            .map((_, i) => i + 1)
        : []
  }

  syncPagination(page = this.currentPage) {
    Slim.qSelectAll(this, 'li[role="pagination"]').forEach(el => {
      if (el.data === page + 1) {
        el.classList.add('active')
      } else {
        el.classList.remove('active')
      }
    })
  }

  changePage(page = 0) {
    if (this.currentPage === page) {
      return
    }
    this.callAttribute('on-change-page', page)
    this.currentPage = page
    this.syncPagination(page)
  }
}
