<script lang="ts" setup>
import PopularTags from './components/PopularTags.vue'
import { useUserStore } from '@/stores/useUserStore'
import type { ArticleListProps, ArticleToggleOptions } from '@/types'

const store = useUserStore()
const getOptionsForLabel: Record<string, { author?: string; tag?: string }> = {
  'Global Feed': {},
  'Your Feed': { author: store.userInfo?.username }
}
const activeLabel = ref(store.isLoggedIn ? 'Your Feed' : 'Global Feed')
const articleListProps = ref<ArticleListProps>(getOptionsForLabel[activeLabel.value])
const articleToggleOptions = ref<ArticleToggleOptions[]>([
  {
    label: 'Your Feed',
    show: store.isLoggedIn,
  },
  { label: 'Global Feed' },
])
function handleTabClick() {
  if (['Your Feed', 'Global Feed'].includes(activeLabel.value)) {
    if (articleToggleOptions.value.length === 3) {
      articleToggleOptions.value.pop()
    }

    articleListProps.value = getOptionsForLabel[activeLabel.value]
  }
}
function handleTagClick(tag: string) {
  activeLabel.value = tag
  articleListProps.value = { tag }
  if (articleToggleOptions.value.length === 2) {
    articleToggleOptions.value.push({
      label: tag,
      icon: true,
    })
  } else {
    articleToggleOptions.value[2].label = tag
  }
}
</script>

<template>
  <div class="home-page">
    <div v-if="!store.isLoggedIn" class="banner">
      <div class="container">
        <h1 class="logo-font">
          conduit
        </h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <article-toggle v-model="activeLabel" :options="articleToggleOptions" @change="handleTabClick" />
          <article-list :remote-params="articleListProps" />
        </div>

        <div class="col-md-3">
          <PopularTags @change="handleTagClick" />
        </div>
      </div>
    </div>
  </div>
</template>
