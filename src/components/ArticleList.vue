<script lang="ts" setup>
import { useAsyncState } from '@vueuse/core'
import api from '@/api'
import type { ArticleListProps } from '@/types'

const props = defineProps<{ remoteParams: ArticleListProps }>()
const articlesCurrent = ref(1)
const {
  state,
  error,
  isLoading,
  execute: getArticles,
} = useAsyncState(
  async () => {
    const params = { ...props.remoteParams, limit: 10, offset: (articlesCurrent.value - 1) * 10 }

    return await api.getArticles(params)
  },
  { articles: [], articlesCount: 0 },
)
function handleCurrentChang(value: number) {
  articlesCurrent.value = value
  getArticles()
}

watch(
  () => props.remoteParams,
  () => {
    getArticles()
  },
)
</script>

<template>
  <div v-if="error" class="article-preview">
    Articles is error
  </div>
  <div v-else-if="isLoading" class="article-preview">
    Loading articles...
  </div>
  <div v-else-if="state.articles.length === 0" class="article-preview">
    No articles are here... yet.
  </div>
  <div v-else class="article-list">
    <article-preview v-for="(article, index) in state.articles" :key="index" :article="article" />
    <article-pagination
      :current="articlesCurrent"
      :count="state.articlesCount"
      @current-change="handleCurrentChang"
    />
  </div>
</template>
