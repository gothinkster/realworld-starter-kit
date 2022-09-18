import {
  useStore,
  component$,
  useWatch$,
  useClientEffect$,
} from "@builder.io/qwik";
import { Header } from "../../components/header/header";
import axios from "axios";
import { Tags } from "../../components/tags/tags";
import "./home.css";
import { FeedNavigation } from "../../components/feed-navigation/feed-navigation";
import { NavItem } from "../../components/feed-navigation/nav-item";
import { Article } from "../../components/article/article";

export const getTags = async () => {
  try {
    const response = await axios.get("https://api.realworld.io/api/tags");
    return response.data.tags;
  } catch (err) {
    console.error("error getting tags", err);
    return [];
  }
};

export const getGeneralArticles = async () => {
  const response = await axios.get<{ articles: any }>(
    "https://api.realworld.io/api/articles?limit=10&offset=0"
  );
  return response.data.articles.map((item: any) => ({
    ...item,
    author: { ...item.author, imageUrl: item.author.image },
  }));
};

export const onFeedNavigationChange = async (feed: NavItem) => {
  const data = await getGeneralArticles();
  console.log("articles", data);
};

export const Home = component$(async () => {
  const state = useStore({ tags: ["tag"], articles: [] });

  useClientEffect$(async () => {
    if (!state.tags.length) {
      state.tags = await getTags();
    }
  });
  const tags = await getTags();
  state.tags = tags;

  state.articles = await getGeneralArticles();
  return (
    <div class="my-app p-20">
      <div className="banner">
        <h1>Qwik</h1>
        <p>A place to share your knowledge about Qwik</p>
      </div>

      <div className="content-container">
        <div className="feed">
          <div>
            <FeedNavigation
              tabs={[{ label: "Your Feed" }, { label: "Global Feed" }]}
              navigationChange$={(tab) => onFeedNavigationChange(tab)}
            ></FeedNavigation>
          </div>
          <div class="articles-list">
            {state.articles.map((article) => (
              <Article article={article}></Article>
            ))}
          </div>
        </div>
        <div className="side-bar">
          <Tags tags={state.tags}></Tags>
        </div>
      </div>
    </div>
  );
});
