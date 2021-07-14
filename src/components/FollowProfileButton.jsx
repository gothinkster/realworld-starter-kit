import React from 'react'
import { useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useAuth, useFollowAuthorMutation, useProfileQuery } from '../hooks'
import FollowButton from './FollowButton'

function FollowProfileButton() {
  const { data } = useProfileQuery()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { isAuth } = useAuth()
  const { following, username } = data.profile
  const queryKey = `/profiles/${username}`

  const { mutate, isLoading } = useFollowAuthorMutation({
    onMutate: async () => {
      const previousProfile = queryClient.getQueryData(queryKey)

      if (isAuth) {
        await queryClient.cancelQueries(queryKey)

        queryClient.setQueryData(queryKey, ({ profile: currentProfile }) => ({
          profile: {
            ...currentProfile,
            following: !currentProfile.following,
          },
        }))
      } else {
        navigate('/login')
      }

      return { previousProfile }
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(queryKey, context.previousProfile)
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey)
    },
  })

  return (
    <FollowButton
      disabled={isLoading}
      following={following}
      onClick={() => mutate({ following, username })}
      username={username}
    />
  )
}

export default FollowProfileButton
