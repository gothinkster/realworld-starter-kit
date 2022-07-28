import { useParams } from "solid-app-router";
import { createStore } from "solid-js/store";
import {
  createComputed,
  createEffect,
  For,
  onMount,
  Show,
  Suspense,
} from "solid-js";

import { useStore } from "~/store";
import type { Article } from "~/types";
import Form from "~/components/Form/Form";
import TextArea from "~/components/Form/TextArea";
import TextInput from "~/components/Form/TextInput";

type EditorState = {
  body: string;
  title: string;
  tagInput: string;
  tagList: string[];
  description: string;
  inProgress?: boolean;
  errors?: string[];
};

export default () => {
  const { slug } = useParams();
  const [store, { loadArticle, updateArticle }] = useStore();

  const [state, setState] = createStore<EditorState>({
    body: "",
    title: "",
    tagInput: "",
    description: "",
    tagList: [],
  });

  const updateState =
    (field: keyof EditorState) =>
    (ev: { target: HTMLInputElement | HTMLTextAreaElement }) =>
      setState(field, ev.target.value);

  const handleAddTag = () => {
    if (state.tagInput) {
      setState({ tagList: [...state.tagList, state.tagInput], tagInput: "" });
    }
  };

  const handleRemoveTag = (tag: string) => {
    !state.inProgress &&
      setState("tagList", (tags) => tags.filter((t) => t !== tag));
  };

  const handleTagInputKeyDown = (ev: {
    keyCode: number;
    preventDefault: () => void;
  }) => {
    switch (ev.keyCode) {
      case 13: // Enter
      case 9: // Tab
      case 188: // ,
        if (ev.keyCode !== 9) ev.preventDefault();
        handleAddTag();
        break;
      default:
        break;
    }
  };

  const submitForm = (_ev: Event) => {
    setState({ inProgress: true });
    const { inProgress, tagInput, ...articleFields } = state;
    return updateArticle(articleFields as Article);
  };

  const postSubmit = () => setState({ inProgress: false });

  createComputed(() => {
    createEffect(() => {
      loadArticle(slug);
      if (!slug) return;
      const article = store.articles[slug] ?? null;

      if (!article) return;
      setState({ ...article, tagList: article.tagList });
    });
  });
  onMount(() => {});

  return (
    <div class="editor-page">
      <div class="container page">
        <div class="row">
          <Show when={!!state.title} fallback={<div>Loading...</div>}>
            <div class="col-md-10 offset-md-1 col-xs-12">
              <Form
                submitFn={submitForm}
                postSubmitFn={postSubmit}
                redirect="/article"
                buttonText="Update Article"
              >
                <TextInput
                  placeholder="Article Title"
                  disabled={state.inProgress}
                  value={state.title}
                  onChange={updateState("title")}
                />
                <TextInput
                  placeholder="What's this article about?"
                  disabled={state.inProgress}
                  value={state.description}
                  onChange={updateState("description")}
                />
                <TextArea
                  value={state.body}
                  placeholder="Write your article (in markdown)"
                  onChange={updateState("body")}
                  disabled={state.inProgress}
                />
                <TextInput
                  placeholder="Enter Tags"
                  value={state.tagInput}
                  disabled={state.inProgress}
                  onChange={updateState("tagInput")}
                  onBlur={handleAddTag}
                  onKeyUp={handleTagInputKeyDown}
                >
                  <div class="tag-list">
                    <For each={state.tagList}>
                      {(tag) => (
                        <span class="tag-default tag-pill">
                          <i
                            class="ion-close-round"
                            onClick={[handleRemoveTag, tag]}
                          />
                          {tag}
                        </span>
                      )}
                    </For>
                  </div>
                </TextInput>
              </Form>
            </div>
          </Show>
        </div>
      </div>
    </div>
  );
};
