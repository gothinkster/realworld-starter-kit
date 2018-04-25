import {Slim} from 'slim-js';
import {template} from 'slim-js/Decorators';
import config from '../../config';
import API from '../api';

@template(/*html*/ `
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-md-10 offset-md-1">
      <div s:if="!isReady">Loading articles...</div>
      <div s:if="isReady" class="articles-toggle">
        <ul class="nav nav-pills outline-active">
          <li class="nav-item">
            <a s:id="articleTabAuthor" click="filterAuthorArticles" class="nav-link active">My Articles<span class="article-count" bind>{{ownArticles.total}}</span></a>
          </li>
          <li class="nav-item">
            <a s:id="articleTabFavorites" click="filterFavoritesArticles" class="nav-link">Favorited Articles<span class="article-count" bind>({{favArticles.total}})</span></a>
          </li>
        </ul>
      </div>
      <article-preview s:repeat="articles"></article-preview>
        <ul s:if="isReady" class="pagination">
          <li s:repeat="pagination"
            class="page-item"
            role="pagination"
            click="changePage">
            <a class="page-link" bind>{{data}}</a>
          </li>
        </ul>&nbsp;
    </nav>
    </div>
  </div>
</div>
`)
export default class ArticleList extends Slim {
  articles = [];
  favArticles;
  ownArticles;
  selectedArticles;
  isReady = false;
  pagination = [];
  currentPage = 0;
  maxArticlesToDisplay;

  onAdded() {
    Slim.bindOwn(this, 'profileId', this.getArticles.bind(this));
    Slim.bindOwn(this, 'currentPage', this.getArticles.bind(this));
  }

  async getArticles() {
    if (this.profileId) {
      const offset = this.currentPage * this.maxArticlesToDisplay;
      const [
        {articles: ownArticles, articlesCount: ownArticlesCount},
        {articles: favArticles, articlesCount: favArticlesCount},
      ] = await Promise.all([
        API.getArticles(this.profileId, offset),
        API.getFavArticles(this.profileId, offset),
      ]);

      ownArticles.total = ownArticlesCount;
      favArticles.total = favArticlesCount;
      this.ownArticles = ownArticles;
      this.favArticles = favArticles;
      this.isReady = true;
      this.applyFilter();
    }
  }

  filterAuthorArticles() {
    console.log('ownArticles');
    this.selectedArticles = 'own';
    this.articles = this.ownArticles;
    this.changePage(0);
    this.applyFilter();
  }

  filterFavoritesArticles() {
    this.articles = this.favArticles;
    this.selectedArticles = 'fav';
    this.changePage(0);
    this.applyFilter();
  }

  applyFilter() {
    switch (this.selectedArticles) {
      case 'own':
        this.articles = this.ownArticles;
        this.articlesCount = this.ownArticlesCount;
        this.articleTabAuthor.classList.add('active');
        this.articleTabFavorites.classList.remove('active');
        break;
      default:
        this.articles = this.favArticles;
        this.articlesCount = this.favArticlesCount;
        this.articleTabAuthor.classList.remove('active');
        this.articleTabFavorites.classList.add('active');
        break;
    }
    this.createPagination();
    this.syncPagination();
  }

  createPagination() {
    const length = Math.ceil(this.articles.total / this.maxArticlesToDisplay);
    console.log(length);
    this.pagination =
      length > 1
        ? Array(length)
            .fill()
            .map((_, i) => i + 1)
        : [];
  }

  syncPagination(page = this.currentPage) {
    Slim.qSelectAll(this, 'li[role="pagination"]').forEach(el => {
      if (el.data === page + 1) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
  }

  changePage(e) {
    const trigger = e.currentTarget;
    console.log(trigger.data);
    const page = typeof e === 'number' ? e : trigger.data - 1;
    if (this.currentPage === page) {
      return;
    }
    this.syncPagination(page);
    this.currentPage = page;
  }
}
