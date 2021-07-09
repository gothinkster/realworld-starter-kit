import { useMutation, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import { http } from '../utils'

function useAddCommentMutation() {
  const { slug } = useParams()
  const queryClient = useQueryClient()

  return useMutation(
    (/** @type {{comment: { body: string }}} */ payload) => http.post(`/articles/${slug}/comments`, payload),
    {
      onSuccess: () => queryClient.invalidateQueries([`/articles/${slug}/comments`]),
    }
  )
}

export default useAddCommentMutation
