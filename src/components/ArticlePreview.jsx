import classNames from 'classnames'
import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import { http } from '../utils'

function ArticlePreview({ article }) {
  const queryClient = useQueryClient()

  const queryKey = `articles/${article.slug}`

  const { data, isFetching } = useQuery(queryKey, { initialData: { article } })

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
              ...article,
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
    <div className="article-preview" key={data.article.slug}>
      <div className="article-meta">
        <Link to={`/profile/${data.article.author.username}`}>
          <img src={data.article.author.image} alt="Author avatar" />
        </Link>
        <div className="info">
          <Link to={`/profile/${data.article.author.username}`} className="author">
            {data.article.author.username}
          </Link>
          <span className="date">{createdAt}</span>
        </div>
        <button
          disabled={favoriteArticleMutation.isLoading || isFetching}
          onClick={() => favoriteArticleMutation.mutate()}
          type="button"
          className={classNames('btn btn-sm pull-xs-right', {
            'btn-outline-primary': !data.article.favorited,
            'btn-primary': data.article.favorited,
          })}
        >
          <i className="ion-heart" /> {data.article.favoritesCount}
        </button>
      </div>
      <Link to={`/article/${data.article.slug}`} className="preview-link">
        <h1>{data.article.title}</h1>
        <p>{data.article.body}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {data.article.tagList.map((tag) => (
            <li key={tag} className="tag-default tag-pill tag-outline">
              {tag}
            </li>
          ))}
        </ul>
      </Link>
    </div>
  )
}

export default ArticlePreview
