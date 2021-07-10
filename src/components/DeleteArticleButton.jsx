import React from 'react'
import { useParams } from 'react-router-dom'
import { useDeleteArticleMutation } from '../hooks'

function DeleteArticleButton() {
  const { slug } = useParams()
  const { mutate, isLoading } = useDeleteArticleMutation({ slug })

  return (
    <button disabled={isLoading} onClick={() => mutate()} type="button" className="btn btn-outline-danger btn-sm">
      <i className="ion-trash-a" /> Delete Article
    </button>
  )
}

export default DeleteArticleButton
