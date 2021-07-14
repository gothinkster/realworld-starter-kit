import React from 'react'
import { Link } from 'react-router-dom'
import { useArticleQuery, useAuth } from '../hooks'
import DeleteArticleButton from './DeleteArticleButton'
import FavoriteArticleButton from './FavoriteArticleButton'
import FollowAuthorButton from './FollowAuthorButton'

function ArticleMeta() {
  const { data } = useArticleQuery()
  const { authUser } = useAuth()
  const { author, createdAt, favorited, favoritesCount, slug } = data.article
  const canUpdate = authUser?.username === author?.username

  return (
    <div className="article-meta">
      <Link to={`/profile/${author?.username}`}>
        <img src={author?.image} />
      </Link>
      <div className="info">
        <Link to={`/profile/${author?.username}`} className="author">
          {author?.username}
        </Link>
        <span className="date">{new Date(createdAt).toDateString()}</span>
      </div>
      {canUpdate ? (
        <span>
          <Link className="btn btn-outline-secondary btn-sm" to={`/editor/${slug}`}>
            <i className="ion-edit" /> Edit Article
          </Link>
          &nbsp;&nbsp;
          <DeleteArticleButton />
        </span>
      ) : (
        <>
          <FollowAuthorButton />
          &nbsp;&nbsp;
          <FavoriteArticleButton slug={slug} favorited={favorited}>
            &nbsp; {favorited ? 'Unfavorite' : 'Favorite'} Article <span className="counter">({favoritesCount})</span>
          </FavoriteArticleButton>
        </>
      )}
    </div>
  )
}

export default ArticleMeta
