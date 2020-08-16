import home from './home';
import app from './app';
import signIn from './signIn';
import settings from './settings';
import profile from './profile';
import { combineReducers } from 'redux';

export default combineReducers({
  app,
  home,
  signIn,
  settings,
  profile,
});
