import React from 'react'
import { Link } from 'react-router-dom'
import { useArticleCommentsQuery, useAuth } from '../hooks'
import ArticleComment from './ArticleComment'
import ArticleCommentForm from './ArticleCommentForm'

function ArticleComments() {
  const { isAuth } = useAuth()
  const { data } = useArticleCommentsQuery()

  if (!isAuth) {
    return (
      <p>
        <Link to="/login">Sign in</Link> or <Link to="/register">sign up</Link> to add comments on this article.
      </p>
    )
  }

  return (
    <>
      <ArticleCommentForm />
      {data.comments.map((comment) => (
        <ArticleComment key={comment?.id} comment={comment} />
      ))}
    </>
  )
}

export default ArticleComments
