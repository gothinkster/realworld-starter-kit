/* eslint functional/no-expression-statement: 0 */

import { define } from 'hybrids';
import AppComponent from './app';
import AppNav from './app/nav';
import AppFooter from './app/footer';

define('app-component', AppComponent);
define('app-nav', AppNav);
define('app-footer', AppFooter);
