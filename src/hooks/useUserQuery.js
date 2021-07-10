import { useQuery } from 'react-query'

function useUserQuery() {
  return useQuery('/user', { placeholderData: { user: {} } })
}

export default useUserQuery
