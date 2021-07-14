import { useMutation, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import { http } from '../utils'

function useDeleteCommentMutation() {
  const { slug } = useParams()
  const queryClient = useQueryClient()
  const queryKey = `/articles/${slug}/comments`

  return useMutation(
    (/** @type {{commentId: number}} */ { commentId }) => http.delete(`/articles/${slug}/comments/${commentId}`),
    {
      onMutate: async ({ commentId }) => {
        const previousComments = queryClient.getQueryData(queryKey)

        await queryClient.cancelQueries(queryKey)

        queryClient.setQueryData(queryKey, ({ comments }) => ({
          comments: comments.filter((comment) => comment.id !== commentId),
        }))

        return { previousComments }
      },
      onError: (err, _, context) => {
        // @ts-ignore
        queryClient.setQueryData(queryKey, context.previousComments)
      },
      onSettled: () => {
        queryClient.invalidateQueries(queryKey)
      },
    }
  )
}

export default useDeleteCommentMutation
