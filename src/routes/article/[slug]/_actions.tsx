import { component$, Host } from "@builder.io/qwik";
import { components } from "~/libs/api-schema";
import { BtnGroup } from "./_btnGroup";

export interface ActionsProps {
  article: components['schemas']['Article']
}

export const Actions = component$((props: ActionsProps) => {
  const article = props.article
  return (
    <Host>
      <div class="article-meta">
        <a href={`/profile/@${article.author.username}`}>
          <img
            src={article.author.image}
            alt={article.author.username}
          />
        </a>
        <div class="info">
          <a href={`/profile/@${article.author.username}`}>
            {article.author.username}
          </a>
          <span class="date">
            {new Date(article.createdAt).toDateString()}
          </span>
        </div>
        <BtnGroup article={article} />
      </div>
    </Host>
  );
});