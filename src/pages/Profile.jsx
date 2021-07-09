import classNames from 'classnames'
import React from 'react'
import { ArticleList, FollowProfileButton } from '../components'
import { useProfile } from '../hooks'

/**
 * @type {object} Filters
 * @property {string} Filter.author
 * @property {string} Filter.favorited
 */
const initialFilters = { author: '', favorited: '' }

function Profile() {
  const { data } = useProfile()
  const [filters, setFilters] = React.useState(initialFilters)
  const { username, image, bio } = data.profile

  function setAuthorFilter() {
    setFilters((prevFilters) => ({ ...prevFilters, author: username, favorited: '' }))
  }

  React.useEffect(() => {
    setAuthorFilter()
  }, [username])

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src={image} className="user-img" />
              <h4>{username}</h4>
              <p>{bio}</p>
              <FollowProfileButton />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <button
                    onClick={setAuthorFilter}
                    type="button"
                    className={classNames('nav-link', {
                      active: filters?.author,
                    })}
                  >
                    My Articles
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    onClick={() => setFilters((prevFilters) => ({ ...prevFilters, author: '', favorited: username }))}
                    type="button"
                    className={classNames('nav-link', {
                      active: filters?.favorited,
                    })}
                  >
                    Favorited Articles
                  </button>
                </li>
              </ul>
            </div>
            <ArticleList filters={filters} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
