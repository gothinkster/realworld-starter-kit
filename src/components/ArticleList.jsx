import React from 'react'
import qs from 'qs'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'

const limit = 10

function ArticleList({ activeTag }) {
  const [offset, setOffset] = React.useState(0)

  const queryParams = {
    limit,
    offset,
    tag: activeTag,
  }

  const { data, isFetching, isSuccess } = useQuery(`/articles?${qs.stringify(queryParams)}`, {
    placeholderData: {
      articles: [],
      articlesCount: null,
    },
  })

  return (
    <>
      {isFetching && (
        <div className="article-preview">
          <span>Loading...</span>
        </div>
      )}
      {isSuccess &&
        data.articles.map((article = {}) => (
          <div className="article-preview" key={article.slug}>
            <div className="article-meta">
              <Link to={`/profile/${article.author.username}`}>
                <img src={article.author.image} alt="Author avatar" />
              </Link>
              <div className="info">
                <Link to={`/profile/${article.author.username}`} className="author">
                  {article.author.username}
                </Link>
                <span className="date">{article.createdAt}</span>
              </div>
              <button type="button" className="btn btn-outline-primary btn-sm pull-xs-right">
                <i className="ion-heart" /> {article.favoritesCount}
              </button>
            </div>
            <Link to={`/article/${article.slug}`} className="preview-link">
              <h1>{article.title}</h1>
              <p>{article.body}</p>
              <span>Read more...</span>
              <ul className="tag-list">
                {article.tagList.map((tag) => (
                  <li key={tag} className="tag-default tag-pill tag-outline">
                    {tag}
                  </li>
                ))}
              </ul>
            </Link>
          </div>
        ))}
      <nav>
        <ul className="pagination">
          {Array.from({ length: data.articlesCount / limit }, (_, i) => (
            <li className={offset === i ? 'page-item active' : 'page-item'} key={i}>
              <button type="button" className="page-link" onClick={() => setOffset(i)}>
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}

export default ArticleList
