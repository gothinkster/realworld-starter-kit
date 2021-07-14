import classNames from 'classnames'
import React from 'react'
import { Link } from 'react-router-dom'
import { ArticleList, FollowProfileButton } from '../components'
import { useAuth, useProfileQuery } from '../hooks'

/**
 * @type {object} Filters
 * @property {string} Filter.author
 * @property {string} Filter.favorited
 */
const initialFilters = { author: '', favorited: '' }

function Profile() {
  const { data } = useProfileQuery()
  const { authUser } = useAuth()
  const [filters, setFilters] = React.useState(initialFilters)
  const { username, image, bio } = data.profile
  const canUpdateProfile = authUser?.username === username

  const setAuthorFilter = React.useCallback(() => {
      setFilters((prevFilters) => ({ ...prevFilters, author: username, favorited: '' }))
  }, [username]);

  React.useEffect(() => {
    setAuthorFilter()
  }, [username, setAuthorFilter])

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src={image} className="user-img" />
              <h4>{username}</h4>
              <p>{bio}</p>
              {canUpdateProfile ? (
                <Link className="btn btn-sm btn-outline-secondary action-btn" to="/settings">
                  <i className="ion-gear-a" /> Edit Profile Settings
                </Link>
              ) : (
                <FollowProfileButton />
              )}
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
