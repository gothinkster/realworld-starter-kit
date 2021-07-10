import { useMutation, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import { http } from '../utils'

function useAddCommentMutation() {
  const { slug } = useParams()
  const queryClient = useQueryClient()
  const queryKey = `/articles/${slug}/comments`

  return useMutation(
    (/** @type {{comment: { body: string }}} */ payload) => http.post(`/articles/${slug}/comments`, payload),
    {
      onMutate: async ({ comment }) => {
        const previousComments = queryClient.getQueryData(queryKey)

        await queryClient.cancelQueries(queryKey)

        queryClient.setQueryData(queryKey, ({ comments }) => ({
          comments: [...comments, comment],
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

export default useAddCommentMutation
