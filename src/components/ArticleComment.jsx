import React from 'react'
import { Link } from 'react-router-dom'
import { useArticleCommentQuery, useAuth, useDeleteCommentMutation } from '../hooks'

function ArticleComment({ comment }) {
  const { data } = useArticleCommentQuery({ comment })
  const { authUser } = useAuth()
  const { author, body, createdAt, id } = data.comment
  const { mutate } = useDeleteCommentMutation()
  const canDelete = author?.username === authUser?.username

  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{body}</p>
      </div>
      {id && (
        <div className="card-footer">
          <Link to={`/profile/${author?.username}`} className="comment-author">
            <img src={author?.image} className="comment-author-img" />
          </Link>
          &nbsp;
          <Link to={`/profile/${author?.username}`} className="comment-author">
            {author?.username}
          </Link>
          <span className="date-posted">{new Date(createdAt).toDateString()}</span>
          {canDelete && (
            <span className="mod-options">
              <i className="ion-trash-a" onClick={() => mutate({ commentId: id })} />
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export default ArticleComment
