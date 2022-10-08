import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
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
                  <Link class="nav-link disabled" href="">
                    Your Feed
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link active" href="">
                    Global Feed
                  </Link>
                </li>
              </ul>
            </div>

            <div class="article-preview">
              <div class="article-meta">
                <Link href="profile.html">
                  <img src="http://i.imgur.com/Qr71crq.jpg" />
                </Link>
                <div class="info">
                  <Link href="" class="author">
                    Eric Simons
                  </Link>
                  <span class="date">January 20th</span>
                </div>
                <button class="btn btn-outline-primary btn-sm pull-xs-right">
                  <i class="ion-heart"></i> 29
                </button>
              </div>
              <Link href="" class="preview-link">
                <h1>How to build webapps that scale</h1>
                <p>This is the description for the post.</p>
                <span>Read more...</span>
              </Link>
            </div>

            <div class="article-preview">
              <div class="article-meta">
                <Link href="profile.html">
                  <img src="http://i.imgur.com/N4VcUeJ.jpg" />
                </Link>
                <div class="info">
                  <Link href="" class="author">
                    Albert Pai
                  </Link>
                  <span class="date">January 20th</span>
                </div>
                <button class="btn btn-outline-primary btn-sm pull-xs-right">
                  <i class="ion-heart"></i> 32
                </button>
              </div>
              <Link href="" class="preview-link">
                <h1>
                  The song you won't ever stop singing. No matter how hard you
                  try.
                </h1>
                <p>This is the description for the post.</p>
                <span>Read more...</span>
              </Link>
            </div>
          </div>

          <div class="col-md-3">
            <div class="sidebar">
              <p>Popular Tags</p>

              <div class="tag-list">
                <Link href="" class="tag-pill tag-default">
                  programming
                </Link>
                <Link href="" class="tag-pill tag-default">
                  javascript
                </Link>
                <Link href="" class="tag-pill tag-default">
                  emberjs
                </Link>
                <Link href="" class="tag-pill tag-default">
                  angularjs
                </Link>
                <Link href="" class="tag-pill tag-default">
                  react
                </Link>
                <Link href="" class="tag-pill tag-default">
                  mean
                </Link>
                <Link href="" class="tag-pill tag-default">
                  node
                </Link>
                <Link href="" class="tag-pill tag-default">
                  rails
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
};
