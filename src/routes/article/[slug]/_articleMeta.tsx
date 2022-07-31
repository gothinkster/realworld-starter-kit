import { component$, Host, $ } from "@builder.io/qwik";
import { components } from "~/libs/api-schema";
import { BtnGroup } from "./_btnGroup"

export interface ArticleMetaProps {
  article: components['schemas']['Article']
  user?: components['schemas']['User']
}

export const ArticleMeta = component$((props: ArticleMetaProps) => {

  return (
    <Host>
      <a href={`/profile/@${props.article.author.username}`}>
        <img
          src={props.article.author.image}
          alt={props.article.author.username}
        />
      </a>
      <div class="info">
        <a
          href={`/profile/@${props.article.author.username}`}
          class="author"
        >
          {props.article.author.username}
        </a>
        <span class="date">
          {new Date(props.article.createdAt).toDateString()}
        </span>
      </div>
      <BtnGroup article={props.article} />
    </Host>
  );
});