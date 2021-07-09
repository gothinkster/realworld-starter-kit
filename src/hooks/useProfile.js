import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

function useProfile() {
  const { username } = useParams()

  return useQuery(`/profiles/${username}`, { placeholderData: { profile: {} } })
}

export default useProfile
