import Head from "next/head";
import type { NextPage } from "next";
import Header from "components/Header";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import dayjs from "dayjs";

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
type Author = {
  username: string;
  bio: string;
  image: string;
  following: boolean;
};

type Article = {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Author;
};

type ArticleResponse = {
  articles: Article[];
  articlesCount: number;
};

const fetcher = (url: string, method: string) =>
  fetch(url, { method }).then((res) => res.json());

const URL_GET_ARTICLES = "/articles.json";

type Pagination = {
  offset: number;
  currentPage: number;
  limit: number;
};

const Home: NextPage = () => {
  const router = useRouter();
  const { global } = router.query;
  const [pagination, setPagination] = useState<Pagination>({
    offset: 0,
    currentPage: 1,
    limit: 10,
  });

  const { data, error, isLoading } = useSWR<ArticleResponse>(
    URL_GET_ARTICLES,
    fetcher
  );

  useEffect(() => {
    mutate(URL_GET_ARTICLES);
  }, [global]);

  console.log(data?.articlesCount);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Home - Conduit</title>
      </Head>

      <Header />

      <main className="home-page">
        <Banner />

        <div className="container page border-solid border border-red-400">
          <div className="row">
            <div className="col-md-9">
              <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${global ? "" : "active"}`}
                      href=""
                      shallow
                    >
                      Your Feed
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${!global ? "" : "active"}`}
                      href="?global=true"
                      shallow
                    >
                      Global Feed
                    </Link>
                  </li>
                </ul>
              </div>

              {isLoading && <div>Loading</div>}
              {data?.articles.map((article) => (
                <div className="article-preview" key={article.slug}>
                  <div className="article-meta">
                    <Link href={`/profile/${article.slug}`}>
                      <img src={article.author?.image} />
                    </Link>
                    <div className="info">
                      <Link href="" className="author">
                        {article.author?.username}
                      </Link>
                      <span className="date">
                        {dayjs(article.createdAt).format("MMMM D, YYYY")}
                      </span>
                    </div>
                    <button className="btn btn-outline-primary btn-sm pull-xs-right">
                      <i className="ion-heart"></i> {article.favoritesCount}
                    </button>
                  </div>
                  <Link href="" className="preview-link">
                    <h1>{article.title}</h1>
                    <p>{article.description}</p>
                    <span>Read more...</span>
                    <ul className="tag-list">
                      {article.tagList.map((tag) => (
                        <li
                          className="tag-default tag-pill tag-outline"
                          key={tag}
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </Link>
                </div>
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
