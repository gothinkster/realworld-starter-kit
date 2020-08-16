import { render, html } from 'hybrids';
import { connect } from './core/store';

export default {
  app: connect(({ app }) => app),
  render: render(
    ({ app: { user, loading } }) => html`
      <nav class="navbar navbar-light">
        <div class="container">
          <a class="navbar-brand" href="index.html">conduit</a>
          <ul class="nav navbar-nav pull-xs-right">
            <li class="nav-item">
              <!-- Add "active" class when you're on that page" -->
              <a class="nav-link active" href="#/">Home</a>
            </li>

            ${loading
              ? html``
              : user !== null
              ? html`
                  <li class="nav-item">
                    <a class="nav-link" href=""> <i class="ion-compose"></i>&nbsp;New Post </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#/settings">
                      <i class="ion-gear-a"></i>&nbsp;Settings
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#/profile/${user.username}">${user.username}</a>
                  </li>
                `
              : html`
                  <li class="nav-item">
                    <a class="nav-link" href="#/login">Sign in</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="">Sign up</a>
                  </li>
                `}
          </ul>
        </div>
      </nav>
    `,
    { shadowRoot: false },
  ),
};
