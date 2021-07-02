import classNames from 'classnames'
import React from 'react'
import { ArticleList, PopularTags } from '../components'

function Home() {
  const [activeTag, setActiveTag] = React.useState()

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
                <li className="nav-item">
                  <a className="nav-link disabled">Your Feed</a>
                </li>
                <li className="nav-item">
                  <button
                    type="button"
                    className={classNames('nav-link', { active: !activeTag })}
                    onClick={() => setActiveTag(undefined)}
                  >
                    Global Feed
                  </button>
                </li>
                {activeTag && (
                  <li className="nav-item">
                    <a className="nav-link active"># {activeTag}</a>
                  </li>
                )}
              </ul>
            </div>
            <ArticleList activeTag={activeTag} />
          </div>
          <div className="col-md-3">
            <PopularTags onTagClick={setActiveTag} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
