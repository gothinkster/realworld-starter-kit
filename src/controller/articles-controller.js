import {onEvent, Events} from '../event-bus';
import feedType from '../enums/feed-type';
import API from '../api';
import Model from '../model';

const setArticles = ({articles, articlesCount}) => {
  Model.articlesCount = articlesCount
  Model.articles = articles
}

onEvent(Events.FAVOR_ARTICLE, () => {
  const { article } = Model
  const count = parseInt(article.favoritesCount) + 1
  API.favArticle(article.slug)
  Model.article = Object.assign({}, Model.article, {
    favoritesCount: count.toString(),
    favorited: true
  })

})

onEvent(Events.UNFAVOR_ARTICLE, () => {
  const { article } = Model
  const count = parseInt(article.favoritesCount) - 1
  API.unfavArticle(article.slug)
  Model.article = Object.assign({}, Model.article, {
    favoritesCount: count.toString(),
    favorited: false
  })
})

onEvent(Events.GET_TAGS, () => {
  API
    .getAllTags()
    .then(({tags}) => {
      Model.tags = tags
    })
})

onEvent(Events.GET_ARTICLE, slug => {
  Model.article = undefined
  API
    .getArticle(slug)
    .then(article => {
      const d = new Date(article.createdAt)
      article.createdAt = d.toLocaleString('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric'
      });
      article.favoritesCount = article.favoritesCount.toString()
      return article
    })
    .then(article => Model.article = article)
})

onEvent (Events.GET_ARTICLES, options => {
  const {offset, type, profileId, tag} = options;
  let apiCall
  Model.articlesCount = 0
  Model.articles = undefined
  switch (type) {
    case feedType.FAV_FEED:
      apiCall = API.getFavArticles(profileId, offset || 0)
    break;
    case feedType.GLOBAL_FEED:
      apiCall = API.getArticles (undefined, offset || 0)
    break;
    case feedType.PRIVATE_FEED:
        apiCall = API.getArticlesFeed(undefined, offset || 0)
    break;
    case feedType.PROFILE_FEED:
      apiCall = API.getArticles (profileId, offset || 0)
    break;
    case feedType.TAGGED_FEED:
      apiCall = API.getArticlesByTag(tag, offset || 0)
    break;
  }
  apiCall && apiCall
    .then(setArticles)
    .catch(err => console.log(err))
});
