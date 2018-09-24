import { combineReducers } from 'redux';
import user from '../services/user';
import articles from '../services/articles';
import articleReducer from '../services/article';
import profile from '../services/profile';
import hydrated from '../services/hydrated';

export default combineReducers({
  user,
  articles,
  article: articleReducer,
  profile,
  hydrated,
});
