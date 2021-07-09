import React from 'react'
import { Link } from 'react-router-dom'
import { useArticleQuery } from '../hooks'
import FavoriteArticleButton from './FavoriteArticleButton'
import FollowAuthorButton from './FollowAuthorButton'

function ArticleMeta() {
  const { data } = useArticleQuery()
  const { author, createdAt, favorited, favoritesCount, slug } = data.article

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
      <FollowAuthorButton />
      &nbsp;&nbsp;
      <FavoriteArticleButton slug={slug} favorited={favorited}>
        &nbsp; {favorited ? 'Unfavorite' : 'Favorite'} Article <span className="counter">({favoritesCount})</span>
      </FavoriteArticleButton>
    </div>
  )
}

export default ArticleMeta
