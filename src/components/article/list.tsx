import { component$ } from "@builder.io/qwik"
import { components } from "~/libs/api-schema"
import { Preview } from "./preview"


interface IArticleListProps {
  articles: components['schemas']['Article'][]
}
export default component$((props: IArticleListProps) => {
  if (props.articles.length < 1) {
    return <div class="article-preview">No articles are here... yet.</div>
  }

  return (
    <>
      {props.articles.map((article) => (
        <Preview class="article-preview" article={article} />
      ))}
    </>
  )
})
