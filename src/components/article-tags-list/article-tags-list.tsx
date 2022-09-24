import { component$ } from "@builder.io/qwik";
import "./article-tags-list.css";

export const ArticleTagsList = component$((props: { tagsList: string[] }) => {
  return (
    <ul class="tag-list">
      {props.tagsList.map((tag) => (
        <li class="tag-list-item">{tag}</li>
      ))}
    </ul>
  );
});
