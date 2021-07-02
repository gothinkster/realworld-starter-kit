import React from 'react'
import qs from 'qs'
import { useQuery } from 'react-query'
import ArticlePreview from './ArticlePreview'

const limit = 10

function ArticleList({ activeTag }) {
  const [offset, setOffset] = React.useState(0)

  const queryParams = {
    limit,
    offset,
    tag: activeTag,
  }

  const { data, isFetching, isSuccess, isError } = useQuery(`/articles?${qs.stringify(queryParams)}`, {
    placeholderData: {
      articles: [],
      articlesCount: null,
    },
  })

  return (
    <>
      {isFetching && <p className="article-preview">Loading articles...</p>}
      {isError && <p className="article-preview">Loading articles failed :(</p>}
      {isSuccess && (
        <>
          {data.articles.map((article) => (
            <ArticlePreview article={article} />
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
      )}
    </>
  )
}

export default ArticleList
