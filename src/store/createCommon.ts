import { createEffect, createResource } from "solid-js";

export default function createCommon(agent, actions, state, setState) {
  const [tags] = createResource(
    "tags",
    () => agent.Tags.getAll(), //.then((receivedTags) => receivedTags.map((tag) => tag.toLowerCase())),
    { initialValue: [] }
  );
  createEffect(() => {
    state.token
      ? localStorage.setItem("jwt", state.token)
      : localStorage.removeItem("jwt");
  });
  actions.setToken = (token: string) => setState({ token });
  return tags;
}
