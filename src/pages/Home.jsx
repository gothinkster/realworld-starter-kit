import classNames from 'classnames'
import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArticleList, PopularTags } from '../components'
import { useAuth } from '../hooks'

function Home() {
  const { isAuth } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const tagFilter = searchParams.has('tag')
  const feedFilter = searchParams.has('feed')

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
                      onClick={() => setSearchParams({ feed: 'true' })}
                      type="button"
                      className={classNames('nav-link', {
                        active: feedFilter,
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
                      active: !tagFilter && !feedFilter,
                    })}
                    onClick={() => navigate('/')}
                  >
                    Global Feed
                  </button>
                </li>
                {tagFilter && (
                  <li className="nav-item">
                    <a className="nav-link active"># {searchParams.get('tag')}</a>
                  </li>
                )}
              </ul>
            </div>
            <ArticleList />
          </div>
          <div className="col-md-3">
            <PopularTags />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
