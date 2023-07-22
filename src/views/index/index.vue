<script lang="ts" setup>
import { useUserStore } from '@/stores/useUserStore'
import type { ArticleToggleOptions, ArticleListProps } from '@/types'

const store = useUserStore()
const articleListProps = ref<ArticleListProps>({})
const activeLabel = ref(store.isLoggedIn ? 'Your Feed' : 'Global Feed')
const articleToggleOptions = ref<ArticleToggleOptions[]>([
  {
    label: 'Your Feed',
    show: store.isLoggedIn
  },
  { label: 'Global Feed' }
])
const handleTabClick = () => {
  if (['Your Feed', 'Global Feed'].includes(activeLabel.value)) {
    if (articleToggleOptions.value.length === 3) {
      articleToggleOptions.value.pop()
    }
    if (activeLabel.value === 'Global Feed') {
      articleListProps.value = {}
    } else {
      articleListProps.value = { author: store.userInfo?.username }
    }
  }
}
const handleTagClick = (tag: string) => {
  activeLabel.value = tag
  articleListProps.value = { tag }
  if (articleToggleOptions.value.length === 2) {
    articleToggleOptions.value.push({
      label: tag,
      icon: true
    })
  } else {
    articleToggleOptions.value[2].label = tag
  }
}
</script>

<template>
  <div class="home-page">
    <div class="banner" v-if="!store.isLoggedIn">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <article-toggle
            v-model="activeLabel"
            @change="handleTabClick"
            :options="articleToggleOptions"
          />
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
