import classNames from 'classnames'
import React from 'react'
import { useFavoriteArticleMutation } from '../hooks'

function FavoriteArticleButton({ slug, favorited, children, className = '' }) {
  const { mutate, isLoading } = useFavoriteArticleMutation({ slug, favorited })

  return (
    <button
      type="button"
      className={classNames(
        'btn btn-sm',
        {
          'btn-outline-primary': !favorited,
          'btn-primary': favorited,
        },
        className
      )}
      onClick={() => mutate()}
      disabled={isLoading}
    >
      <i className="ion-heart" />
      {children}
    </button>
  )
}

export default FavoriteArticleButton
