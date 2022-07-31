import { component$, useStore, Host, $, useContext } from "@builder.io/qwik"
import { components } from "~/libs/api-schema"
import { SessionContext } from "~/libs/context"
import { toggleFavorite } from "./service"

export interface PreviewProps {
  article: components["schemas"]["Article"]
}

export const Preview = component$((props: PreviewProps) => {
  const session = useContext(SessionContext)
  const article = useStore({
    ...props.article,
  })

  return (
    <Host>
      <div class="article-meta">
        <a href={`/profile/@${article.author.username}`}>
          <img src={article.author.image} alt={article.author.username} />
        </a>
        <div class="info">
          <a href={`/profile/@${article.author.username}`} class="author">
            {article.author.username}
          </a>
          <span class="date">{new Date(article.createdAt).toDateString()}</span>
        </div>
        {session.user && (
          <button
            onClick$={() => toggleFavorite.apply(null, [article, session.user?.token])}
            class={`btn btn-sm pull-xs-right ${
              article.favorited ? "btn-primary" : "btn-outline-primary"
            }`}
          >
            <i class="ion-heart"></i> {article.favoritesCount}
          </button>
        )}
      </div>
      <a href={`/article/${article.slug}`} class="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul class="tag-list">
          {article.tagList.map((tag: any) => (
            <li class="tag-default tag-pill tag-outline">
              <a href={`/?tag=${tag}`}>{tag}</a>
            </li>
          ))}
        </ul>
      </a>
    </Host>
  )
})
