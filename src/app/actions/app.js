import store from '../store';
import { loadHome, loadPage } from './home';

export default async function changePage(page) {
  if (page === '') {
    await loadHome();
    await loadPage();
  }

  store.dispatch({
    type: 'CHANGE_PAGE',
    page,
  });
}

export function loadApp() {
  store.dispatch({
    type: 'LOAD',
  });
}

export function logout() {
  localStorage.removeItem('token');
  store.dispatch({ type: 'LOG_OUT' });
  location.hash = `#/`; /* eslint-disable-line */
}
