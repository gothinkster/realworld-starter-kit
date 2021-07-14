import { useMutation } from 'react-query'
import { http } from '../utils'

function useFollowAuthorMutation(config) {
  return useMutation(
    (/** @type {{following: boolean, username: string}} */ { following, username }) =>
      http[following ? 'delete' : 'post'](`/profiles/${username}/follow`),
    config
  )
}

export default useFollowAuthorMutation
