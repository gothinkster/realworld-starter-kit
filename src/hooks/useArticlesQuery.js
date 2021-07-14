import { useQuery } from 'react-query'

function useArticlesQuery({ isFeed, filters }) {
  return useQuery([`/articles${isFeed ? '/feed' : ''}`, { limit: 10, ...filters }], {
    placeholderData: {
      articles: [],
      articlesCount: null,
    },
    keepPreviousData: true,
  })
}

export default useArticlesQuery
