import React from 'react'
import { useDeleteArticleMutation } from '../hooks'

function DeleteArticleButton() {
  const { mutate, isLoading } = useDeleteArticleMutation()

  return (
    <button disabled={isLoading} onClick={() => mutate()} type="button" className="btn btn-outline-danger btn-sm">
      <i className="ion-trash-a" /> Delete Article
    </button>
  )
}

export default DeleteArticleButton
