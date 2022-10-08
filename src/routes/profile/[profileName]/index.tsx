import {
  component$,
  mutable,
  Resource,
  ResourceReturn,
  useResource$,
  useStore,
} from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import axios from "axios";
import { getAuthToken } from "~/auth/auth";
import { BASE_URL } from "~/common/api";
import ArticlesList from "~/components/articles-list/articles-list";
import { FeedNavigation } from "~/components/feed-navigation/feed-navigation";
import { FollowUser } from "~/components/follow-user/follow-user";
import { $ } from "@builder.io/qwik";
import { ArticleData } from "~/model/article-data";

type TabType = "Authored" | "Favorited";
type Tab = { label: string; type: TabType };
export const getArticles = async (queryType: TabType, profileName: string) => {
  const query = queryType === "Authored" ? "author" : "favorited";
  const url = `${BASE_URL}articles?${query}=${profileName}`;
  const response = await axios.get<ArticleData[]>(url, {
    headers: { authorization: getAuthToken() },
  });
  return response.data.articles;
};

export const onFeedNavigationChange = (tab: Tab, state: any) => {
  state.activeTab = tab;
};

export const getProfile = async (profileName: string) => {
  const url = `${BASE_URL}profiles/${profileName}`;
  const response = await axios.get(url, {
    headers: { authorization: getAuthToken() },
  });
  return response.data.profile;
};

export default component$(() => {
  const location = useLocation();

  const tabs: Tab[] = [
    { label: "Your Posts", type: "Authored" },
    { label: "Favorited posts", type: "Favorited" },
  ];

  const state = useStore({
    count: 0,
    tags: [],
    articles: [],
    personalFeed: [],
    selectedTag: "",
    tabs,
    activeTab: tabs[0],
    followingMainUser: false,
    profileName: location.params.profileName,
  });

  //   const profile = await getProfile(state.profileName);

  const articlesResource: ResourceReturn<ArticleData[]> = useResource$(
    ({ track, cleanup }) => {
      const controller = new AbortController();
      track(state);
      cleanup(() => controller.abort());
      return getArticles(state.activeTab.type, state.profileName);
    }
  );

  const profileResource = useResource$(() => {
    return getProfile(state.profileName);
  });

  const authenticated = !!getAuthToken();

  const followingChanged = $((newValue: boolean) => {
    console.log("naewValue", newValue);
    state.followingMainUser = newValue;
  });

  return (
    <div class="my-app p-20">
      <div class="banner">
        <Resource
          value={profileResource}
          onPending={() => <>Wait...</>}
          onResolved={(profile) => {
            return (
              <>
                <h1>
                  <img src={profile.image}></img>
                </h1>
                <p>{profile.username}</p>
                <FollowUser
                  user={profile}
                  followingChanged={followingChanged}
                  following={mutable(profile.following)}
                ></FollowUser>
              </>
            );
          }}
        ></Resource>
      </div>
      <div class="container">
        <div>
          <FeedNavigation
            tabs={mutable(state.tabs.map((tab: Tab) => tab.label))}
            navigationChange$={(label) =>
              onFeedNavigationChange(
                tabs.find((t) => t.label === label),
                state
              )
            }
            activeTab={mutable(state.activeTab)}
          ></FeedNavigation>
        </div>

        <Resource
          value={articlesResource}
          onResolved={(articles: any[]) => {
            console.log("articles", articles);

            return (
              <ArticlesList
                articles={mutable(articles)}
                authenticated={mutable(authenticated)}
              ></ArticlesList>
            );
          }}
        ></Resource>
      </div>
    </div>
  );
});
