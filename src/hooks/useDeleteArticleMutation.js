import { useMutation, useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { http } from '../utils'

function useDeleteArticleMutation() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { slug } = useParams()

  return useMutation(() => http.delete(`/articles/${slug}`), {
    onSuccess: () => {
      queryClient.invalidateQueries('/articles')

      navigate('/')
    },
  })
}

export default useDeleteArticleMutation
