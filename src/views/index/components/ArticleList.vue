<script lang="ts" setup>
import api from '@/api'
import { useAsyncState } from '@vueuse/core'
import type { ArticleListProps } from '@/types'
import ArticlePreview from './ArticlePreview.vue'
import ArticlePagination from './ArticlePagination.vue'

const articlesCurrent = ref(1)
const props = defineProps<{ remoteParams: ArticleListProps }>()
const { state, isLoading, error, execute } = useAsyncState(
  async (args?: ArticleListProps) => {
    const params = { ...args, limit: 10, offset: (articlesCurrent.value - 1) * 10 }
    return await api.getArticles(params)
  },
  { articles: [], articlesCount: 0 }
)
const handleCurrentChang = (value: number) => {
  articlesCurrent.value = value
  execute()
}

watch(
  () => props.remoteParams,
  (value) => {
    execute(0, value)
  }
)
</script>

<template>
  <div v-if="error" class="article-preview">Articles is error</div>
  <div v-else-if="isLoading" class="article-preview">Loading articles...</div>
  <div v-else class="article-list">
    <article-preview :key="index" :article="article" v-for="(article, index) in state.articles" />
    <article-pagination
      :current="articlesCurrent"
      :count="state.articlesCount"
      @current-change="handleCurrentChang"
    />
  </div>
</template>
