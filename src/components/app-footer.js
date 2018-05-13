import {template, tag} from 'slim-js/Decorators';
import {Slim} from 'slim-js';

@tag('app-footer')
@template(`
<footer>
    <div class="container">
    <a href="/" class="logo-font">conduit</a>
    <span class="attribution">
        An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
    </span>
    </div>
</footer>
`)
export default class AppFooter extends Slim {}
