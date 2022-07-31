/**
 * Shared onGet endpoint / Component for following two routes
 * - [username]
 * - [username]/favorites
 *
 * would it be nicer if we can mark `favorites` as optional
 * then define them in one route. not sure how to do this for now
 */

import { component$, Resource, useContext, useStore } from "@builder.io/qwik"
import {
  DocumentHead,
  EndpointHandler,
  useEndpoint,
  useLocation,
} from "@builder.io/qwik-city"
import * as api from "~/libs/api"
import { components } from "~/libs/api-schema"
import { getSession } from "~/libs/getSession"
import { Pagination } from "~/components/pagination"
import ArticleList from "~/components/article/list"
import Tabs, { TabsProps } from "~/components/tabs"
import { fetchArticles } from "~/routes/api/_fetchArticles"
import { SessionContext } from "~/libs/context"
import { toggleProfileFollow } from "~/components/article/service"

export interface EndpointData {
  profile: components["schemas"]["Profile"]
  user?: components["schemas"]["User"]
  isFavoritesTab: boolean
  articles: components["schemas"]["Article"][]
  pages: number
}

export const onProfileGet: EndpointHandler<EndpointData> = async ({
  request,
  params,
}) => {
  const url = new URL(request.url)
  const isFavoritesTab = /\/favorites$/.test(request.url)
  const username = params.username.replace(/^@/, "")
  const { user } = getSession(request.headers.get("cookie"))

  const searchParams = new URLSearchParams(url.search)
  if (isFavoritesTab) {
    searchParams.set('favorited', encodeURIComponent(username))
  } else {
    searchParams.set('author', encodeURIComponent(username))
  }

  const [
    { profile },
    { articles, pages }
  ] = await Promise.all([
    api.get(`profiles/${username}`, user?.token),
    fetchArticles(searchParams.toString(), user.token),
  ])
  return {
    pages,
    articles,
    profile,
    user,
    isFavoritesTab,
  }
}

export default component$(() => {
  const resource = useEndpoint<typeof onProfileGet>()
  const location = useLocation()
  const profile = useStore({} as components["schemas"]["Profile"])
  const session = useContext(SessionContext)

  const currentPage = +location.query.page || 1
  return (
    <Resource
      resource={resource}
      onResolved={({ profile: profileResource, user, isFavoritesTab, articles, pages }) => {
        Object.assign(profile, profileResource)
        const isCurrent = profile.username === user?.username
        const tabList: TabsProps["tabList"] = [
          {
            title: "Articles",
            href: `/profile/@${profile.username}`,
            active: !isFavoritesTab,
          },
          {
            title: "Favorites",
            href: `/profile/@${profile.username}/favorites`,
            active: isFavoritesTab,
          },
        ]
        const linkBase = isFavoritesTab ? tabList[1].href : tabList[0].href
        return (
          <div class="profile-page">
            <div class="user-info">
              <div class="container">
                <div class="row">
                  <div class="col-xs-12 col-md-10 offset-md-1">
                    <img src={profile.image} class="user-img" />
                    <h4>{profile.username}</h4>
                    <p>{profile.bio}</p>
                    {isCurrent && (
                      <a
                        href="/settings"
                        class="btn btn-sm btn-outline-secondary action-btn"
                      >
                        <i class="ion-gear-a" />
                        Edit Profile Settings
                      </a>
                    )}
                    {!isCurrent && user && (
                      <button
                        class={`btn btn-sm ${
                          profile.following ? "btn-secondary" : "btn-outline-secondary"
                        } action-btn`}
                        onClick$={() => {
                          // FIXME: optimistic update not working, not sure why... fix later
                          toggleProfileFollow.apply(null, [profile, session.user?.token])
                        }}
                      >
                        <i class="ion-plus-round"></i>
                        &nbsp; {profile.following ? 'Unfollow' : 'Follow'} {profile.username}
                      </button>
                    )}
                    {!user && <a href="/login">Sign in to follow</a>}
                  </div>
                </div>
              </div>
            </div>

            <div class="container">
              <div class="row">
                <div class="col-xs-12 col-md-10 offset-md-1">
                  <Tabs tabList={tabList} class="articles-toggle" />
                  <ArticleList articles={articles} />
                  <Pagination
                    pages={pages}
                    currentPage={currentPage}
                    base={`${linkBase}/?`}
                  />
                </div>
              </div>
            </div>
          </div>
        )
      }}
    />
  )
})

export const profileHead: DocumentHead = ({ params }) => ({
  title: params.username,
})
