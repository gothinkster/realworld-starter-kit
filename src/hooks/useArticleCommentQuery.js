import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

function useArticleCommentQuery({ comment } = { comment: null }) {
  const { slug } = useParams()

  return useQuery(`articles/${slug}/comments/${comment?.id}`, { initialData: { comment }, placeholderData: {} })
}

export default useArticleCommentQuery
