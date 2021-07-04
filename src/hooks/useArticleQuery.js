import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

function useArticleQuery(article) {
  const { slug } = useParams()

  return useQuery(`/articles/${slug}`, {
    placeholderData: { article: {} },
    initialData: article ? { article } : undefined,
  })
}

export default useArticleQuery
