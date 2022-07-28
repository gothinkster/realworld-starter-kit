import { For } from "solid-js";
import NavLink from "../NavBar/NavLink";

const FAVORITED_CLASS = "btn btn-sm btn-primary";
const NOT_FAVORITED_CLASS = "btn btn-sm btn-outline-primary";

export default (props) => {
  const {
    title,
    description,
    slug,
    createdAt,
    tagList,
    author: { username, image },
  } = props.article;

  return (
    <div class="article-preview">
      <div class="article-meta">
        <NavLink href={`/@${username}`} route="/profile">
          <img src={image} alt="" />
        </NavLink>

        <div class="info">
          <NavLink class="author" href={`/@${username}`} route="/profile">
            {username}
          </NavLink>
          <span
            class="date"
            textContent={/*@once*/ new Date(createdAt).toDateString()}
          />
        </div>

        {props.token && (
          <div class="pull-xs-right">
            <button
              class={
                props.article.favorited ? FAVORITED_CLASS : NOT_FAVORITED_CLASS
              }
              onClick={[props.onClickFavorite, props.article]}
            >
              <i class="ion-heart" /> {props.article.favoritesCount}
            </button>
          </div>
        )}
      </div>

      <NavLink href={`article/${slug}`} route="/article" class="preview-link">
        <h1>{title}</h1>
        <p>{description}</p>
        <span>Read more...</span>
        <ul class="tag-list">
          <For each={tagList}>
            {(tag) => (
              <li class="tag-default tag-pill tag-outline" textContent={tag} />
            )}
          </For>
        </ul>
      </NavLink>
    </div>
  );
};
