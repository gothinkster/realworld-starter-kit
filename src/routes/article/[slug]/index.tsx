import { component$, Resource, useStore } from "@builder.io/qwik"
import {
  DocumentHead,
  EndpointHandler,
  useEndpoint,
} from "@builder.io/qwik-city"
import { marked } from "marked"
import { components } from "~/libs/api-schema"
import * as api from "~/libs/api"
import { getSession } from "~/libs/getSession"
import { ArticleMeta } from "./_articleMeta"
import { Actions } from "./_actions"
import { CommentContainer } from "./_commentContainer"

export interface EndpointData {
  article: components["schemas"]["Article"]
  comments: components["schemas"]["Comment"][]
  user?: components["schemas"]["User"]
}

export const onGet: EndpointHandler<EndpointData> = async ({
  request,
  params,
}) => {
  const { user } = getSession(request.headers.get("cookie"))
  const { article } = await api.get(`articles/${params.slug}`, user?.token)
  const { comments } = await api.get(`articles/${params.slug}/comments`, user?.token)
  return {
    user,
    article,
    comments,
  }
}

export default component$(() => {
  const resource = useEndpoint<typeof onGet>()

  // Need article to be store so that we can mutate it (follow / favorite)
  const article = useStore({} as components["schemas"]["Article"], {
    recursive: true,
  })
  return (
    <Resource
      resource={resource}
      onResolved={({ article: articleResource, user, comments }) => {
        // Guess it is not proper way to assign every props
        // it will causing all state being serialized, then losing tree-shake ability ?
        Object.assign(article, articleResource)
        const markup = marked(article.body)

        return (
          <div class="article-page">
            <div class="banner">
              <div class="container">
                <h1>{article.title}</h1>
                <ArticleMeta class="article-meta" article={article} user={user} />
              </div>
            </div>

            <div class="container page">
              <div class="row article-content">
                <div class="col-md-12">
                  <div innerHTML={markup}></div>
                  <ul class="tag-list">
                    {article.tagList.map((tag) => (
                      <li class="tag-default tag-pill tag-outline">{tag}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <hr />

              <Actions article={article} class="article-actions" />

              <div class="row">
                <CommentContainer class="col-xs-12 col-md-8 offset-md-2" comments={comments} slug={article.slug} user={user} />
              </div>
            </div>
          </div>
        )
      }}
    />
  )
})

export const head: DocumentHead = {
  title: "Article -- Conduit",
}
