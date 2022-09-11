import {
  useStore,
  component$,
  useWatch$,
  useClientEffect$,
} from "@builder.io/qwik";
import { Header } from "../header/header";
import axios from "axios";
import { Tags } from "../tags/tags";
import "./app.css";
import { FeedNavigation } from "../feed-navigation/feed-navigation";

export const getTags = async () => {
  try {
    const response = await axios.get("https://api.realworld.io/api/tags");
    return response.data.tags;
  } catch (err) {
    console.error("error getting tags", err);
    return [];
  }
};

export const App = component$(async () => {
  const state = useStore({ tags: ["tag"] });

  useClientEffect$(async () => {
    if (!state.tags.length) {
      state.tags = await getTags();
    }
  });
  const tags = await getTags();
  state.tags = tags;
  return (
    <div class="my-app p-20">
      <Header></Header>
      {/* <Logo /> */}

      <div className="content-container">
        <div className="feed">
          <FeedNavigation
            tabs={[{ label: "Your Feed" }, { label: "Global Feed" }]}
            navigationChange$={(tab) => console.log("tab", tab)}
          ></FeedNavigation>
        </div>
        <div className="side-bar">
          <Tags tags={state.tags}></Tags>
        </div>
      </div>
    </div>
  );
});
