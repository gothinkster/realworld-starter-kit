import { component$, Host, Resource } from "@builder.io/qwik"
import {
  useEndpoint,
  DocumentHead,
  EndpointHandler,
  useLocation,
} from "@builder.io/qwik-city"
import ArticleList from "~/components/article/list"
import { Pagination } from "~/components/pagination"
import Tabs, { TabsProps } from "~/components/tabs"
import { components } from "~/libs/api-schema"
import { getSession } from "~/libs/getSession"
import { fetchArticles } from "./api/_fetchArticles"

export interface EndpointData {
  articles: components["schemas"]["Article"][]
  pages: number
  tags: string[]
  user?: components["schemas"]["User"]
}

export const onGet: EndpointHandler<EndpointData> = async ({ request }) => {
  const url = new URL(request.url)
  const { user } = getSession(request.headers.get("cookie"))

  const [{ articles, pages }, { tags }] = await Promise.all([
    fetchArticles(url.search, user?.token),
    fetch(`${url.origin}/api/tags.json`).then((r) => r.json()),
  ])

  return {
    user,
    articles,
    pages,
    tags,
  }
}

export default component$(() => {
  const resource = useEndpoint<typeof onGet>()
  const location = useLocation()

  const currentPage = +location.query.page || 1
  const currentTag = location.query.tag
  const currentTab = location.query.tab || "all"
  const linkBase = currentTag ? `/?tag=${currentTag}` : "/?"
  return (
    <Host>
      <div class="home-page">
        <div class="banner">
          <div class="container">
            <h1 class="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>

        <div class="container page">
          <div class="row">
            <Resource
              resource={resource}
              onResolved={(data) => {
                const tabList: TabsProps['tabList'] = [
                  !!data.user ? {
                    title: 'Your Feed',
                    href: '/?tab=feed',
                    active: currentTab === 'feed'
                  } : {
                    title: 'Your Feed',
                    href: '/login',
                    active: false
                  },
                  {
                    title: 'Global Feed',
                    active: currentTab === 'all',
                    href: '/?tab=all'
                  },
                ]
                if (currentTag) {
                  tabList.push({
                    title: currentTag,
                    href: `/?tag=${currentTag}`,
                    active: true
                  })
                }
                return (
                  <>
                    <div class="col-md-9">
                      <Tabs
                        tabList={tabList}
                        class="feed-toggle"
                      />
                      <ArticleList articles={data.articles || []} />
                      <Pagination
                        pages={data.pages}
                        currentPage={currentPage}
                        base={linkBase}
                      />
                    </div>

                    <div class="col-md-3">
                      <div class="sidebar">
                        <p>Popular Tags</p>

                        <div class="tag-list">
                          {(data.tags || []).map((tag: string) => (
                            <a
                              href={`/?tag=${tag}`}
                              class="tag-pill tag-default"
                            >
                              {tag}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )
              }}
            />
          </div>
        </div>
      </div>
    </Host>
  )
})

export const head: DocumentHead = {
  title: "Home -- Conduit",
}
