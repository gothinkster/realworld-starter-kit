import home from './home';
import { combineReducers } from 'redux';

export default combineReducers({
  app: (state = { page: 'home' }) => state,
  home,
});
