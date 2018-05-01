import {template} from 'slim-js/Decorators'
import ReactiveElement from '../common/ReactiveElement'

import CONFIG from '../../config'
import API from '../api'
const {articlesPerPage: maxArticlesToDisplay, defaultProfileImage} = CONFIG

@template(/*html*/ `
<div bind:class="getWrapperClass(variant)">
  <wrapper s:id="topContainer"></wrapper>
  <article-list
    bind:tabs="tabs"
    on-tab-select="handleTabSelected"
    on-change-page="handlePageChanged"
    bind:articles="articles"
    bind:max-articles-to-display="maxArticlesToDisplay"></article-list>
</div>
`)
export default class ArticlesView extends ReactiveElement {
  tabs
  variant
  selectedTab
  currentPage
  articles

  constructor() {
    super()
    this.maxArticlesToDisplay = maxArticlesToDisplay
  }

  handleTabSelected(tab) {
    this.selectedTab = tab
    this.handlePageChanged(0)
  }

  handlePageChanged(page) {
    this.currentPage = page
    this.loadArticles(this.selectedTab.type)
  }

  async loadArticles(type = 'global', profileId) {
    const offset = this.currentPage * this.maxArticlesToDisplay
    let articles, articlesCount, data
    switch (type) {
      case 'global':
        data = await API.getArticles(undefined, offset)
        break
      case 'own':
      case 'profile':
        data = await API.getArticles(profileId, offset)
        break
      case 'tagged':
        const tag = this.selectedTab.title
        data = await API.getArticlesByTag(tag, offset)
        break
    }
    this.articles = data.articles
  }
}
