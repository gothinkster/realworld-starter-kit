import { component$ } from "@builder.io/qwik";
import "./tags.css";

export const Tags = component$((props: { tags: string[] }) => {
  return (
    <div className="tags-container">
      <p>Popular tags</p>
      <div>
        {props.tags.map((tag) => (
          <a className="tag-chip">{tag}</a>
        ))}
      </div>
    </div>
  );
});
