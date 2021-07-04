import classNames from 'classnames'
import React from 'react'
import { Link } from 'react-router-dom'
import useArticleQuery from '../hooks/useArticleQuery'
import useFavoriteArticleMutation from '../hooks/useFavoriteArticleMutation'

function ArticlePreview({ article }) {
  const { data, isFetching } = useArticleQuery(article)
  const favoriteArticleMutation = useFavoriteArticleMutation()
  const { slug, author, createdAt, favorited, favoritesCount, title, body, tagList } = data.article

  return (
    <div className="article-preview" key={slug}>
      <div className="article-meta">
        <Link to={`/profile/${author?.username}`}>
          <img src={author?.image} alt="Author avatar" />
        </Link>
        <div className="info">
          <Link to={`/profile/${author?.username}`} className="author">
            {author?.username}
          </Link>
          <span className="date">{new Date(createdAt).toDateString()}</span>
        </div>
        <button
          disabled={favoriteArticleMutation.isLoading || isFetching}
          onClick={() => favoriteArticleMutation.mutate()}
          type="button"
          className={classNames('btn btn-sm pull-xs-right', {
            'btn-outline-primary': !favorited,
            'btn-primary': favorited,
          })}
        >
          <i className="ion-heart" /> {favoritesCount}
        </button>
      </div>
      <Link to={`/article/${slug}`} className="preview-link">
        <h1>{title}</h1>
        <p>{body}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {tagList.map((tag) => (
            <li key={tag} className="tag-default tag-pill tag-outline">
              {tag}
            </li>
          ))}
        </ul>
      </Link>
    </div>
  )
}

export default ArticlePreview
