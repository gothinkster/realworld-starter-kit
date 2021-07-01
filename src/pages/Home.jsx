import classNames from 'classnames'
import React from 'react'
import { useQuery } from 'react-query'
import ArticleList from '../components/ArticleList'

function Home() {
  const [activeTag, setActiveTag] = React.useState()
  const { data } = useQuery('/tags', { placeholderData: { tags: [] } })

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
                  <a
                    href=""
                    className={classNames('nav-link', { active: !activeTag })}
                    onClick={(e) => {
                      e.preventDefault()
                      setActiveTag(undefined)
                    }}
                  >
                    Global Feed
                  </a>
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
            <div className="sidebar">
              <p>Popular Tags</p>
              <div className="tag-list">
                {data.tags.map((tag) => (
                  <a
                    key={tag}
                    href=""
                    className="tag-pill tag-default"
                    onClick={(e) => {
                      e.preventDefault()
                      setActiveTag(tag)
                    }}
                  >
                    {tag}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
