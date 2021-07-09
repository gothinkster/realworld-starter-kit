import { useMutation, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import { http } from '../utils'

function useDeleteCommentMutation({ commentId } = { commentId: null }) {
  const { slug } = useParams()

  const queryClient = useQueryClient()

  return useMutation(() => http.delete(`/articles/${slug}/comments/${commentId}`), {
    onSuccess: () => {
      queryClient.invalidateQueries([`/articles/${slug}/comments`])
    },
  })
}

export default useDeleteCommentMutation
