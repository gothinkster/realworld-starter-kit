import {Slim} from 'slim-js'
import {template, tag} from 'slim-js/Decorators'
import {Events, dispatch} from '../event-bus'
import Config from '../../config'

const parseDateOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

@tag('article-preview')
@template(/*html*/ `
<div s:if="data" class="article-preview">
  <div class="article-meta" click="navigateToProfile">
    <a><img bind:src="getProfileImage(data)" /></a>
    <div class="info">
      <a class="author" bind>{{data.author.username}}</a>
      <span class="date" bind>{{parseDate(data.createdAt)}}</span>
    </div>
    <button class="btn btn-outline-primary btn-sm pull-xs-right">
      <i class="ion-heart"></i><span bind>{{data.favoritesCount}}</span>
    </button>
  </div>
  <a click="navigateToArticle" class="preview-link">
    <h1 bind>{{data.title}}</h1>
    <p bind>{{data.description}}</p>
    <span>Read more...</span>
  </a>
</div>
`)
export default class ArticlePreview extends Slim {
  data

  parseDate(dateString) {
    const d = new Date()
    return d.toLocaleDateString('en-US', parseDateOptions)
  }

  navigateToProfile() {
    dispatch(Events.NAVIGATE_PROFILE, this.data.author.username)
  }

  navigateToArticle() {
    dispatch(Events.NAVIGATE_ARTICLE, this.data.slug)
  }

  getProfileImage() {
    if (this.data && this.data.image) {
      return this.data.image
    } else {
      return Config.defaultProfileImage
    }
  }
}

//

const stub = {
  articles: [
    {
      title: 'my test',
      slug: 'my-test-v3ohuo',
      body: 'this is a test',
      createdAt: '2018-04-23T20:28:43.525Z',
      updatedAt: '2018-04-23T20:28:43.525Z',
      tagList: ['test'],
      description: 'testing',
      author: {
        username: 'subiboi',
        bio: null,
        image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
        following: false,
      },
      favorited: false,
      favoritesCount: 0,
    },
  ],
  articlesCount: 1,
}
