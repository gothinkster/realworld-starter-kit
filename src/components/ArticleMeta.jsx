import classNames from 'classnames'
import { get } from 'lodash-es'
import React from 'react'
import { Link } from 'react-router-dom'
import useArticleQuery from '../hooks/useArticleQuery'
import useFavoriteArticleMutation from '../hooks/useFavoriteArticleMutation'

function ArticleMeta() {
  const { data } = useArticleQuery()
  const { mutate, isLoading } = useFavoriteArticleMutation()
  const { author, createdAt, favorited, favoritesCount } = data.article

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
      <button className="btn btn-sm btn-outline-secondary">
        <i className="ion-plus-round" />
        &nbsp; Follow {get(data, 'article.author.username', '')}
      </button>
      &nbsp;&nbsp;
      <button
        className={classNames('btn btn-sm', {
          'btn-outline-primary': !favorited,
          'btn-primary': favorited,
        })}
        onClick={() => mutate()}
        disabled={isLoading}
      >
        <i className="ion-heart" />
        &nbsp; {favorited ? 'Unfavorite' : 'Favorite'} Article <span className="counter">({favoritesCount})</span>
      </button>
    </div>
  )
}

export default ArticleMeta
