import { isEmpty } from 'lodash-es'
import React from 'react'
import { useQuery } from 'react-query'
import { useSearchParams } from 'react-router-dom'
import ArticlePreview from './ArticlePreview'

const limit = 10

function ArticleList() {
  const [offset, setOffset] = React.useState(0)
  const [searchParams] = useSearchParams()
  const isFeed = searchParams.has('feed')

  const filters = {
    limit,
    offset,
    tag: searchParams.get('tag'),
  }

  const { data, isFetching, isSuccess, isError } = useQuery([`/articles${isFeed ? '/feed' : ''}`, filters], {
    placeholderData: {
      articles: [],
      articlesCount: null,
    },
    keepPreviousData: true,
  })

  return (
    <>
      {isFetching && isEmpty(data.articles) && <p className="article-preview">Loading articles...</p>}
      {isError && <p className="article-preview">Loading articles failed :(</p>}
      {isSuccess && !isFetching && isEmpty(data.articles) && (
        <p className="article-preview">No articles are here... yet.</p>
      )}
      {isSuccess && !isEmpty(data.articles) && (
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
      )}
    </>
  )
}

export default ArticleList
