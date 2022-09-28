import { component$, mutable } from "@builder.io/qwik";
import { Article } from "../article/article";

export default component$(
  (props: { articles: any[]; authenticated: boolean }) => {
    return (
      <div class="articles-list">
        {!props.articles.length
          ? "No articles here... yet"
          : props.articles.map((article) => (
              <Article
                article={mutable(article)}
                authenticated={props.authenticated}
              ></Article>
            ))}
      </div>
    );
  }
);
