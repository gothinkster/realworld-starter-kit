import {onEvent, Events} from '../event-bus';
import feedType from '../enums/feed-type';
import API from '../api';
import Model from '../model';

const setArticles = ({articles, articlesCount}) => {
  Model.articlesCount = articlesCount
  Model.articles = articles
}

const formatDate = date => 
  new Date(date).toLocaleString('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric'
  });

const getComments = async (slug) => {
  const {comments} = await API.getComments(slug)
  const {user} = Model
  const username = user ? user.username : undefined
  for (let comment of comments) {
    comment.isOwner = comment.author.username === username
    comment.createdAt = formatDate(comment.createdAt)
    comment.articleId = slug
  }
  Model.comments = undefined
  Model.comments = [...comments]
}

onEvent(Events.POST_COMMENT, async ({slug, comment}) => {
  await API.postComment(slug, comment)
  getComments(slug)
})

onEvent(Events.TRASH_COMMENT, async (comment) => {
  const {id, articleId} = comment
  await API.trashComment(articleId, id)
  getComments(articleId)
})

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
  Model.comments = undefined
  getComments(slug)
  API
    .getArticle(slug)
    .then(article => {
      article.createdAt = formatDate(article.createdAt)
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
