import { useMutation } from 'react-query'
import { http } from '../utils'

function useFollowAuthorMutation({ following, username }, config) {
  return useMutation(() => http[following ? 'delete' : 'post'](`/profiles/${username}/follow`), config)
}

export default useFollowAuthorMutation
