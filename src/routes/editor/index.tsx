import {
  component$,
  useStore,
  $,
  mutable,
  useClientEffect$,
} from "@builder.io/qwik";
import axios from "axios";
import { getAuthToken } from "~/auth/auth";
import { BASE_URL } from "~/common/api";
import { ArticleTagsList } from "~/components/article-tags-list/article-tags-list";
import "~/global.css";
import "./index.css";

export const onTagsKeyDown = $(
  (evt: KeyboardEvent, state: { tags: string[] }) => {
    if (evt.key !== "Enter") {
      return;
    }
    const input = evt.target as HTMLInputElement;
    const { value } = input;
    if (!value || state.tags.includes(value)) {
      return;
    }
    state.tags = [...state.tags, value];
    input.value = "";
    evt.preventDefault();
  }
);

export const deleteTag = (tag: string, state: { tags: string[] }) => {
  state.tags = [...state.tags.filter((t) => t !== tag)];
};

export const submitArticleData = (
  evt: any,
  state: { errors: { [key: string]: string }; tags: string[] }
) => {
  const form = evt.target;
  state.errors = {};
  evt.preventDefault();
  const article = {
    title: form.querySelector('[name="title"]')!.value,
    description: form.querySelector('[name="description')!.value,
    body: form.querySelector('[name="body"]')!.value,
    tagList: state.tags,
  };

  if (!article.title) {
    state.errors.title = "cannot be blank";
  }
  if (!article.description) {
    state.errors.description = "cannot be blank";
  }
  if (!article.body) {
    state.errors.body = "cannot be blank";
  }

  if (Object.keys(state.errors).length) {
    return;
  }

  axios
    .post(
      `${BASE_URL}articles`,
      { article },
      {
        headers: { authorization: getAuthToken() },
      }
    )
    .then(() => {
      window.location.href = "/";
    })
    .catch((err: any) => {
      const { errors } = err.response.data;
      state.errors = errors;
    });

  return false;
};

interface State {
  tags: string[];
  errors: { [key: string]: string };
}

export default component$(() => {
  const state: State = useStore({ tags: [], errors: {} });
  useClientEffect$(() => {
    document
      .querySelector("form")
      ?.addEventListener("submit", (evt) => submitArticleData(evt, state));
  });
  return (
    <div class="container">
      <div class="errors">
        {Object.entries(state.errors).map((err) => (
          <div>
            {err[0]} {err[1]}
          </div>
        ))}
      </div>
      <form>
        <input placeholder="Article title" name="title"></input>
        <input
          placeholder="What is this article about?"
          name="description"
        ></input>
        <textarea
          rows={8}
          name="body"
          placeholder="Write your article (in markdown)"
        ></textarea>
        <input
          name="tagsList"
          placeholder="enter tags"
          onKeyDown$={(evt) => onTagsKeyDown(evt, state)}
        ></input>
        <button>Publish Article</button>
      </form>
      <ArticleTagsList
        tagsList={mutable(state.tags)}
        onDelete$={(tag) => deleteTag(tag, state)}
      ></ArticleTagsList>
    </div>
  );
});
