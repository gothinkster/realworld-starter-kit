import { component$, Resource } from "@builder.io/qwik";
import {
  DocumentHead,
  RequestHandler,
  useEndpoint,
} from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";
import { getToken, isAuthenticated } from "~/auth/auth";
import { articles, feed, tags } from "~/services";
import { Article } from "~/types";

export const onGet: RequestHandler = async ({ request }) => {
  const token = getToken(request.headers.get("cookie"));

  const [tagsData, articlesData, feedData] = await Promise.all([
    tags(),
    articles(token)(),
    isAuthenticated() && feed(token)(),
  ]);

  return {
    ...tagsData,
    ...articlesData,
    feeds: feedData,
  };
};

export default component$(() => {
  const data = useEndpoint();

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

            <Resource
              value={data}
              onPending={() => <div>Loading...</div>}
              onRejected={() => <div>Error</div>}
              onResolved={(data: any) =>
                data && (
                  <>
                  {data.articles.map((article: Article)  => (
                    <div class="article-preview">
                    <div class="article-meta">
                      <Link href="profile.html">
                        <img src={article.author.image} />
                      </Link>
                      <div class="info">
                        <Link href="" class="author">
                          {article.author.username}
                        </Link>
                        <span class="date">{article.createdAt}</span>
                      </div>
                      <button class="btn btn-outline-primary btn-sm pull-xs-right">
                        <i class="ion-heart"></i> {article.favoritesCount}
                      </button>
                    </div>
                    <Link href={`/article/${article.slug}`} class="preview-link">
                      <h1>{article.title}</h1>
                      <p>{article.description}</p>
                      <span>Read more...</span>
                    </Link>
                  </div>
                  ))}
                  </>
                )
              }
            />
          </div>

          <div class="col-md-3">
            <div class="sidebar">
              <p>Popular Tags</p>

              <div class="tag-list">
                <Resource
                  value={data}
                  onPending={() => <div>Loading...</div>}
                  onRejected={() => <div>Error</div>}
                  onResolved={(data: any) =>
                    data && (
                      <>
                        {data.tags.map((tagName: string) => (
                          <Link href="" class="tag-pill tag-default">
                            {tagName}
                          </Link>
                        ))}
                      </>
                    )
                  }
                />
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
