import { useNavigate } from 'react-router-dom'
import { useQueryClient, useMutation } from 'react-query'
import { http } from '../utils'
import useAuth from './useAuth'

function useFavoriteArticleMutation({ slug, favorited } = { slug: null, favorited: false }) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { isAuth } = useAuth()
  const queryKey = `/articles/${slug}`

  return useMutation(() => http[favorited ? 'delete' : 'post'](`/articles/${slug}/favorite`), {
    onMutate: async () => {
      const previousArticle = queryClient.getQueryData(queryKey)

      if (isAuth) {
        await queryClient.cancelQueries(queryKey)

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
      } else {
        navigate('/login')
      }

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
