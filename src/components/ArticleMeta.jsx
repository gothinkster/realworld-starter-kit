import classNames from 'classnames'
import { get } from 'lodash-es'
import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import { http } from '../utils'

function ArticleMeta() {
  const { slug } = useParams()

  const queryKey = `/articles/${slug}`

  const { data } = useQuery(queryKey, { placeholderData: { article: {} } })

  const queryClient = useQueryClient()

  const favoriteArticleMutation = useMutation(
    () => http[data.article.favorited ? 'delete' : 'post'](`/articles/${data.article.slug}/favorite`),
    {
      onMutate: async () => {
        await queryClient.cancelQueries(queryKey)

        const previousArticle = queryClient.getQueryData(queryKey)

        queryClient.setQueryData(queryKey, ({ article: currentArticle }) => {
          const count = currentArticle.favoritesCount

          return {
            article: {
              ...data.article,
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
    }
  )

  const createdAt = React.useMemo(
    () =>
      new Date(data.article.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    [data.article.createdAt]
  )

  return (
    <div className="article-meta">
      <Link to={`/profile/${get(data, 'article.author.username', '')}`}>
        <img src={get(data, 'article.author.image', '')} />
      </Link>
      <div className="info">
        <Link to={`/profile/${get(data, 'article.author.username', '')}`} className="author">
          {get(data, 'article.author.username', '')}
        </Link>
        <span className="date">{createdAt}</span>
      </div>
      <button className="btn btn-sm btn-outline-secondary">
        <i className="ion-plus-round" />
        &nbsp; Follow {get(data, 'article.author.username', '')}
      </button>
      &nbsp;&nbsp;
      <button
        className={classNames('btn btn-sm', {
          'btn-outline-primary': !data.article.favorited,
          'btn-primary': data.article.favorited,
        })}
        onClick={() => favoriteArticleMutation.mutate()}
        disabled={favoriteArticleMutation.isLoading}
      >
        <i className="ion-heart" />
        &nbsp; {data.article.favorited ? 'Unfavorite' : 'Favorite'} Article{' '}
        <span className="counter">({data.article.favoritesCount})</span>
      </button>
    </div>
  )
}

export default ArticleMeta
