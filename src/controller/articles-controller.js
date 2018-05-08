import {onEvent, Events} from '../event-bus';
import feedType from '../enums/feed-type';
import API from '../api';
import Model from '../model';

const setArticles = ({articles, articlesCount}) => {
  Model.articlesCount = articlesCount
  Model.articles = articles
}

onEvent (Events.GET_ARTICLES, options => {
  const {offset, type, profileId} = options;
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
  }
  apiCall && apiCall
    .then(setArticles)
    .catch(err => console.log(err))
});
