import { component$, Host, useContext, $ } from "@builder.io/qwik"
import { components } from "~/libs/api-schema"
import { toggleFavorite, toggleFollow } from "~/components/article/service"
import { SessionContext } from "~/libs/context"
import { del } from "~/libs/ajax"

export interface BtnGroupProps {
  article: components["schemas"]["Article"]
}

export const BtnGroup = component$(
  (props: BtnGroupProps) => {
    const session = useContext(SessionContext)
    if (!session.user) {
      return null
    }
    const slug = props.article.slug
    const canModify = props.article.author.username === session.user?.username
    const deletePost = $(() => {
      del(`/article/${slug}/index.json`).then(() => {
        location.href = "/"
      })
    })

    return (
      <Host>
        {canModify ? (
          <span>
            <a
              href={`/editor/${props.article.slug}`}
              class="btn btn-outline-secondary btn-sm"
            >
              <i class="ion-edit" /> Edit Article
            </a>
            <span>{' '}</span>
            <button
              class="btn btn-outline-danger btn-sm"
              onClick$={deletePost}
            >
              <i class="ion-trash-a" /> Delete Article
            </button>
          </span>
        ) : (
          <>
            <button
              class={`btn btn-sm ${
                props.article.author.following ? "btn-secondary" : "btn-outline-secondary"
              }`}
              onClick$={() =>
                toggleFollow.apply(null, [props.article, session.user?.token])
              }>
              <i class="ion-plus-round"></i>
              &nbsp; {props.article.author.following ? 'Unfollow' : 'Follow'} {props.article.author.username}
            </button>
            <span>{' '}</span>
            <button
              class={`btn btn-sm ${
                props.article.favorited ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick$={() =>
                toggleFavorite.apply(null, [props.article, session.user?.token])
              }
            >
              <i class="ion-heart"></i>
              &nbsp; {props.article.favorited ? 'Unfavorite' : 'Favorite'} Article{" "}
              <span class="counter">({props.article.favoritesCount})</span>
            </button>
          </>
        )}
      </Host>
    )
  },
  {
    tagName: "span",
  }
)
