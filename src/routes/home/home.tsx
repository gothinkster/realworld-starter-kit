import {
  useStore,
  component$,
  mutable,
  useResource$,
  Resource,
} from "@builder.io/qwik";
import axios from "axios";
import { Tags } from "../../components/tags/tags";
import { FeedNavigation } from "../../components/feed-navigation/feed-navigation";
import { NavItem } from "../../components/feed-navigation/nav-item";
import ArticlesList from "../../components/articles-list/articles-list";

import "./home.css";

export const getTags: () => Promise<string[]> = async () => {
  try {
    const response = await axios.get("https://api.realworld.io/api/tags");
    return response.data.tags;
  } catch (err) {
    console.error("error getting tags", err);
    return [];
  }
};

export const getGeneralArticles = async (tagName: string = "") => {
  const articleUrl = `https://api.realworld.io/api/articles?limit=10&offset=0`;
  const response = await axios.get<{ articles: any }>(
    tagName ? `${articleUrl}&tag=${tagName}` : articleUrl
  );
  return response.data.articles.map((item: any) => ({
    ...item,
    author: { ...item.author, imageUrl: item.author.image },
  }));
};

export const onFeedNavigationChange = async (
  feed: string,
  state: {
    tabs: NavItem[];
    activeTab: NavItem | undefined;
    selectedTag: string;
  }
) => {
  const tagCandidate = feed.startsWith("#") ? feed.substring(1) : "";
  state.activeTab = state.tabs.find((tab) => tab.label === feed);
  state.selectedTag = tagCandidate;
};

export const onSelectedTagChange = async (tagName: string, state: any) => {
  state.selectedTag = tagName;
  state.tabs[2].label = `#${tagName}`;
  state.activeTab = state.tabs[2];
};

export const getStateData = async (state: any) => {
  const tags = await getTags();
  state.tags = tags;
};

export const Home = component$(() => {
  const tabs = [
    { label: "Your Feed" },
    { label: "Global Feed" },
    { label: "" },
  ];

  const state = useStore({
    count: 0,
    tags: [],
    articles: [],
    selectedTag: "",
    tabs,
    activeTab: undefined,
  });
  const tagsResource = useResource$<string[]>(({ track, cleanup }) => {
    track(state, "tags");

    const controller = new AbortController();
    cleanup(() => controller.abort());
    return getTags();
  });

  const articlesResource = useResource$(({ track, cleanup }) => {
    const controller = new AbortController();
    track(state, "selectedTag");
    cleanup(() => controller.abort());
    return getGeneralArticles(state.selectedTag);
  });

  // await getStateData(state);

  return (
    <div class="my-app p-20">
      <div class="banner">
        <h1>Qwik</h1>
        <p>A place to share your knowledge about Qwik</p>
      </div>

      <div class="content-container">
        <div class="feed">
          <div>
            <FeedNavigation
              tabs={mutable(state.tabs.map((tab) => tab.label))}
              navigationChange$={(tab) => onFeedNavigationChange(tab, state)}
              activeTab={mutable(state.activeTab)}
            ></FeedNavigation>
          </div>
          <Resource
            value={articlesResource}
            onResolved={(articles: any[]) => (
              <ArticlesList articles={mutable(articles)}></ArticlesList>
            )}
          ></Resource>
        </div>
        <Resource
          value={tagsResource}
          onPending={() => <>Loading Tags</>}
          onRejected={(error) => <>Error: {error.message}</>}
          onResolved={(tags: string[]) => (
            <Tags
              tags={tags}
              tagSelected$={(tag) => onSelectedTagChange(tag, state)}
            ></Tags>
          )}
        ></Resource>
      </div>
    </div>
  );
});
