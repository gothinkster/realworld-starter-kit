import React from 'react'
import { Link } from 'react-router-dom'
import { useArticleQuery } from '../hooks'
import FavoriteArticleButton from './FavoriteArticleButton'

function ArticlePreview({ article }) {
  const { data } = useArticleQuery({ article })
  const { slug, author, createdAt, favoritesCount, favorited, title, body, tagList } = data?.article

  return (
    <div className="article-preview" key={slug}>
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
        <FavoriteArticleButton className="pull-xs-right" favorited={favorited} slug={slug}>
          &nbsp;{favoritesCount}
        </FavoriteArticleButton>
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
