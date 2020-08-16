/* eslint functional/no-expression-statement: 0 */

import { define } from 'hybrids';
import AppComponent from './app';
import AppNav from './app/nav';
import AppFooter from './app/footer';
import AppRouter from './app/router';
import RouteHome from './app/routes/home';
import HomeArticle from './app/routes/home/article';
import HomeSidebar from './app/routes/home/sidebar';
import RouteSignIn from './app/routes/signIn';
import RouteSettings from './app/routes/settings';
import RouteProfile from './app/routes/profile';
import './app/components';

define('app-component', AppComponent);
define('app-nav', AppNav);
define('app-footer', AppFooter);
define('app-router', AppRouter);
define('route-home', RouteHome);
define('home-article', HomeArticle);
define('home-sidebar', HomeSidebar);
define('route-sign-in', RouteSignIn);
define('route-settings', RouteSettings);
define('route-profile', RouteProfile);
