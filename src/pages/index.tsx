import Head from "next/head";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";

import { FeedToggle, ArticlePreview } from "components";
import { Article } from "types";

const Banner = (): JSX.Element => (
  <div className="banner">
    <div className="container">
      <h1 className="logo-font">conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>
);

const PopularTags = () => (
  <>
    <p>Popular Tags</p>
    <div className="tag-list">
      <Link href="" className="tag-pill tag-default">
        programming
      </Link>
      <Link href="" className="tag-pill tag-default">
        javascript
      </Link>
      <Link href="" className="tag-pill tag-default">
        emberjs
      </Link>
      <Link href="" className="tag-pill tag-default">
        angularjs
      </Link>
      <Link href="" className="tag-pill tag-default">
        react
      </Link>
      <Link href="" className="tag-pill tag-default">
        mean
      </Link>
      <Link href="" className="tag-pill tag-default">
        node
      </Link>
      <Link href="" className="tag-pill tag-default">
        rails
      </Link>
    </div>
  </>
);

type ArticleResponse = {
  articles: Article[];
  articlesCount: number;
};

const fetcher = (url: string, method: string) =>
  fetch(url, { method }).then((res) => res.json());

const URL_GET_ARTICLES = "/articles.json?";

type Pagination = {
  offset: number;
  currentPage: number;
  limit: number;
};

const Home: NextPage = () => {
  const router = useRouter();
  const global = router.query?.global === "true";
  const [pagination, setPagination] = useState<Pagination>({
    offset: 0,
    currentPage: 1,
    limit: 10,
  });

  const { data, error, isLoading } = useSWR<ArticleResponse>(
    URL_GET_ARTICLES + (global ? "global=true" : ""),
    fetcher
  );

  useEffect(() => {
    mutate(URL_GET_ARTICLES + (global ? "global=true" : ""));
  }, [global]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Home - Conduit</title>
      </Head>

      <main className="home-page">
        <Banner />

        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <FeedToggle globalFeed={global} />

              {isLoading && <div>Loading</div>}
              {data?.articles.map((article) => (
                <ArticlePreview article={article} />
              ))}

              <div>
                <nav>
                  <ul className="pagination">
                    {data?.articlesCount &&
                      new Array(
                        parseInt(
                          (data?.articlesCount / pagination.limit).toString()
                        ) + 1
                      )
                        .fill(0)
                        .map((_, n) => (
                          <li
                            className={`page-item ${
                              pagination.currentPage == n + 1 ? "active" : ""
                            }`}
                            key={`page${n}`}
                          >
                            <Link
                              className={`page-link `}
                              href=""
                              shallow
                              onClick={() => {
                                setPagination((prev) => ({
                                  ...prev,
                                  currentPage: n + 1,
                                }));
                              }}
                            >
                              {n + 1}
                            </Link>
                          </li>
                        ))}
                  </ul>
                </nav>
              </div>
            </div>

            <div className="col-md-3">
              <div className="sidebar">
                <PopularTags />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
