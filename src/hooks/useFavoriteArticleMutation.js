import { useParams } from 'react-router-dom'
import { useQueryClient, useMutation } from 'react-query'
import { http } from '../utils'
import useArticleQuery from './useArticleQuery'

function useFavoriteArticleMutation() {
  const { slug } = useParams()
  const queryClient = useQueryClient()
  const { data } = useArticleQuery()
  const { favorited } = data.article
  const queryKey = `/articles/${slug}`

  return useMutation(() => http[favorited ? 'delete' : 'post'](`/articles/${slug}/favorite`), {
    onMutate: async () => {
      await queryClient.cancelQueries(queryKey)

      const previousArticle = queryClient.getQueryData(queryKey)

      queryClient.setQueryData(queryKey, ({ article: currentArticle }) => {
        const count = currentArticle.favoritesCount

        return {
          article: {
            ...currentArticle,
            favorited: !currentArticle.favorited,
            favoritesCount: currentArticle.favorited ? count - 1 : count + 1,
          },
        }
      })

      return { previousArticle }
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(queryKey, context.previousArticle)
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey)
    },
  })
}

export default useFavoriteArticleMutation
