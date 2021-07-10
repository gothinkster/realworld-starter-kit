import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { http } from '../utils'

function useDeleteArticleMutation({ slug }) {
  const navigate = useNavigate()

  return useMutation(() => http.delete(`/articles/${slug}`), {
    onSuccess: () => {
      navigate('/')
    },
  })
}

export default useDeleteArticleMutation
