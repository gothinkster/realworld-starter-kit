import React from 'react'
import { useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { useArticleQuery, useAuth, useFollowAuthorMutation } from '../hooks'
import FollowButton from './FollowButton'

function FollowAuthorButton() {
  const { slug } = useParams()
  const queryClient = useQueryClient()
  const { isAuth } = useAuth()
  const navigate = useNavigate()
  const { data } = useArticleQuery()
  const { author } = data.article
  const queryKey = `/articles/${slug}`

  const { mutate, isLoading } = useFollowAuthorMutation({
    onMutate: async () => {
      const previousArticle = queryClient.getQueryData(queryKey)

      if (isAuth) {
        await queryClient.cancelQueries(queryKey)

        queryClient.setQueryData(queryKey, ({ article: currentArticle }) => ({
          article: {
            ...currentArticle,
            author: {
              ...currentArticle?.author,
              following: !currentArticle?.author?.following,
            },
          },
        }))
      } else {
        navigate('/login')
      }

      return { previousArticle }
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(queryKey, context.previousArticle)
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey)
    },
  })

  return (
    <FollowButton
      disabled={isLoading}
      following={author?.following}
      onClick={() => mutate({ following: author?.following, username: author?.username })}
      username={author?.username}
    />
  )
}

export default FollowAuthorButton
