import { For, Show, Suspense } from "solid-js";
import { useStore } from "../../store";
import ArticlePreview from "./ArticlePreview";

export default (props) => {
  const [{ token }, { unmakeFavorite, makeFavorite }] = useStore(),
    handleClickFavorite = (article, e) => {
      e.preventDefault();
      article.favorited
        ? unmakeFavorite(article.slug)
        : makeFavorite(article.slug);
    },
    handlePage = (v, e) => {
      e.preventDefault();
      props.onSetPage(v);
      setTimeout(() => window.scrollTo(0, 0), 200);
    };
  return (
    <Suspense fallback={<div class="article-preview">Loading articles...</div>}>
      <section class="article-list">
        <For
          each={props.articles}
          fallback={
            <div class="article-preview">No articles are here... yet.</div>
          }
        >
          {(article) => (
            <ArticlePreview
              article={article}
              token={token}
              onClickFavorite={handleClickFavorite}
            />
          )}
        </For>
        <Show when={props.totalPagesCount > 1}>
          <nav>
            <ul class="pagination">
              <For each={[...Array(props.totalPagesCount).keys()]}>
                {(v) => (
                  <li
                    class="page-item"
                    classList={{ active: props.currentPage === v }}
                    onClick={[handlePage, v]}
                  >
                    <a class="page-link" href="" textContent={v + 1} />
                  </li>
                )}
              </For>
            </ul>
          </nav>
        </Show>
      </section>
    </Suspense>
  );
};
