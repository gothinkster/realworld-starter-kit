import { isEmpty } from 'lodash-es'
import React from 'react'
import { useArticlesQuery } from '../hooks'
import ArticlePreview from './ArticlePreview'

const limit = 10

function ArticleList({ filters = {}, isFeed = false }) {
  const [offset, setOffset] = React.useState(0)
  const { data, isFetching, isError, isSuccess } = useArticlesQuery({ isFeed, filters: { offset, ...filters } })

  if (isFetching) return <p className="article-preview">Loading articles...</p>
  if (isError) return <p className="article-preview">Loading articles failed :(</p>
  if (isSuccess && isEmpty(data?.articles)) return <p className="article-preview">No articles are here... yet.</p>

  return (
    <>
      {data.articles.map((article) => (
        <ArticlePreview key={article.slug} article={article} />
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
