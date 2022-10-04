import { component$ } from "@builder.io/qwik";
import "./article-tags-list.css";

export const ArticleTagsList = component$(
  (props: { tagsList: string[]; onDelete$?: (tag: string) => void }) => {
    return (
      <ul class="tag-list">
        {props.tagsList.map((tag) => (
          <li class="tag-list-item">
            {props.onDelete$ ? (
              <i
                class="ion-close-round tag-delete-icon"
                onClick$={() => props!.onDelete$(tag)}
              ></i>
            ) : null}
            {tag}
          </li>
        ))}
      </ul>
    );
  }
);
