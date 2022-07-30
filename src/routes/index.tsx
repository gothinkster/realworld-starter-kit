import { component$, Host } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <Host>
      <div class="home-page">
        <div class="banner">
          <div class="container">
            <h1 class="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>

        <div class="container page">
          <div class="row">
            <div class="col-md-9">
              <div class="feed-toggle">
                <ul class="nav nav-pills outline-active">
                  <li class="nav-item">
                    <a class="nav-link disabled" href="">
                      Your Feed
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link active" href="">
                      Global Feed
                    </a>
                  </li>
                </ul>
              </div>

              <div class="article-preview">
                <div class="article-meta">
                  <a href="/profile/author">
                    <img src="http://i.imgur.com/Qr71crq.jpg" />
                  </a>
                  <div class="info">
                    <a href="/profile/author" class="author">
                      Eric Simons
                    </a>
                    <span class="date">January 20th</span>
                  </div>
                  <button class="btn btn-outline-primary btn-sm pull-xs-right">
                    <i class="ion-heart"></i> 29
                  </button>
                </div>
                <a href="/article/how-to" class="preview-link">
                  <h1>How to build webapps that scale</h1>
                  <p>This is the description for the post.</p>
                  <span>Read more...</span>
                </a>
              </div>

              <div class="article-preview">
                <div class="article-meta">
                  <a href="/profile/author">
                    <img src="http://i.imgur.com/N4VcUeJ.jpg" />
                  </a>
                  <div class="info">
                    <a href="/profile/author" class="author">
                      Albert Pai
                    </a>
                    <span class="date">January 20th</span>
                  </div>
                  <button class="btn btn-outline-primary btn-sm pull-xs-right">
                    <i class="ion-heart"></i> 32
                  </button>
                </div>
                <a href="/article/the-song" class="preview-link">
                  <h1>
                    The song you won't ever stop singing. No matter how hard you
                    try.
                  </h1>
                  <p>This is the description for the post.</p>
                  <span>Read more...</span>
                </a>
              </div>
            </div>

            <div class="col-md-3">
              <div class="sidebar">
                <p>Popular Tags</p>

                <div class="tag-list">
                  <a href="" class="tag-pill tag-default">
                    programming
                  </a>
                  <a href="" class="tag-pill tag-default">
                    javascript
                  </a>
                  <a href="" class="tag-pill tag-default">
                    emberjs
                  </a>
                  <a href="" class="tag-pill tag-default">
                    angularjs
                  </a>
                  <a href="" class="tag-pill tag-default">
                    react
                  </a>
                  <a href="" class="tag-pill tag-default">
                    mean
                  </a>
                  <a href="" class="tag-pill tag-default">
                    node
                  </a>
                  <a href="" class="tag-pill tag-default">
                    rails
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Host>
  );
});

export const head: DocumentHead = {
  title: "Home -- Conduit",
};
