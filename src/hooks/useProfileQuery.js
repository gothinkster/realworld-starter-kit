import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

function useProfileQuery() {
  const { username } = useParams()

  return useQuery(`/profiles/${username}`, { placeholderData: { profile: {} } })
}

export default useProfileQuery
