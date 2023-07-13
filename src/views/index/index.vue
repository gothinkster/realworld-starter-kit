<script lang="ts" setup>
import TagList from './components/TagList.vue'
import { useUserStore } from '@/stores/useUserStore'
import FeedToggle from './components/FeedToggle.vue'
import ArticleList from './components/ArticleList.vue'
import type { FeedToggleOptions, ArticleListProps } from '@/types'

const store = useUserStore()
const activeName = ref('Global Feed')
const articleListProps = ref<ArticleListProps>({})
const feedToggleOptions = ref<FeedToggleOptions[]>([
  {
    label: 'Global Feed',
    show: true
  },
  {
    label: 'Your Feed',
    show: store.isLoggedIn
  }
])
const handleTabClick = () => {
  if (['Your Feed', 'Global Feed'].includes(activeName.value)) {
    if (feedToggleOptions.value.length === 3) {
      feedToggleOptions.value.pop()
    }
    if (activeName.value === 'Global Feed') {
      articleListProps.value = {}
    } else {
      articleListProps.value = { author: store.userInfo?.username }
    }
  }
}
const handleTagClick = (tag: string) => {
  activeName.value = tag
  articleListProps.value = { tag }
  if (feedToggleOptions.value.length === 2) {
    feedToggleOptions.value.push({
      label: tag,
      show: true,
      icon: true
    })
  } else {
    feedToggleOptions.value[2].label = tag
  }
}
</script>

<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <feed-toggle v-model="activeName" @change="handleTabClick" :options="feedToggleOptions" />
          <article-list :remote-params="articleListProps" />
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <tag-list @change="handleTagClick" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
