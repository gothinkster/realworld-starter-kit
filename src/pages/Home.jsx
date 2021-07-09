import classNames from 'classnames'
import React from 'react'
import { ArticleList, PopularTags } from '../components'
import { useAuth } from '../hooks'

/**
 * @type {object} Filters
 * @property {string} Filter.tag
 */
const initialFilters = { tag: '' }

function Home() {
  const { isAuth } = useAuth()
  const [filters, setFilters] = React.useState(initialFilters)
  const [isFeed, setIsFeed] = React.useState(false)

  React.useEffect(() => {
    setIsFeed(isAuth)
  }, [isAuth])

  function onTagClick(tag) {
    setFilters((prevFilters) => ({ ...prevFilters, tag }))
    setIsFeed(false)
  }

  function onGlobalFeedClick() {
    setFilters(initialFilters)
    setIsFeed(false)
  }

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                {isAuth && (
                  <li className="nav-item">
                    <button
                      onClick={() => setIsFeed(true)}
                      type="button"
                      className={classNames('nav-link', {
                        active: isFeed,
                      })}
                    >
                      Your Feed
                    </button>
                  </li>
                )}
                <li className="nav-item">
                  <button
                    type="button"
                    className={classNames('nav-link', {
                      active: !filters?.tag && !isFeed,
                    })}
                    onClick={onGlobalFeedClick}
                  >
                    Global Feed
                  </button>
                </li>
                {filters?.tag && (
                  <li className="nav-item">
                    <a className="nav-link active"># {filters?.tag}</a>
                  </li>
                )}
              </ul>
            </div>
            <ArticleList isFeed={isFeed} filters={filters} />
          </div>
          <div className="col-md-3">
            <PopularTags onTagClick={onTagClick} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
