<script lang="ts" setup>
import { useAsyncState } from '@vueuse/core'
import api from '@/api'
import type { Article } from '@/types'
import { formatDate } from '@/utils'
import { useUserStore } from '@/stores/useUserStore'

defineProps({ article: { type: Object as PropType<Article>, required: true } })

const router = useRouter()
const store = useUserStore()
const { isLoading, execute: onFavorited } = useAsyncState(
  async (args: Article) => {
    if (store.isLoggedIn) {
      const { slug, favorited } = args
      const method = favorited ? 'delete' : 'post'
      return await api.favorites({ method, slug }).then((res) => {
        args.favorited = res.article.favorited
        args.favoritesCount = res.article.favoritesCount
      })
    }
    else { router.push('/register') }
  },
  null,
  { immediate: false },
)
</script>

<template>
  <div class="article-preview">
    <div class="article-meta">
      <router-link :to="`/profile/${article.author.username}`">
        <img :src="article.author.image">
      </router-link>
      <div class="info">
        <router-link class="author" :to="`/profile/${article.author.username}`">
          {{ article.author.username }}
        </router-link>
        <span class="date">{{ formatDate(article.createdAt) }}</span>
      </div>
      <button
        :disabled="isLoading"
        class="btn btn-sm pull-xs-right"
        :class="[article.favorited ? 'btn-primary' : 'btn-outline-primary']"
        @click="onFavorited(0, article)"
      >
        <i class="ion-heart" />
        {{ article.favoritesCount }}
      </button>
    </div>
    <router-link class="preview-link" :to="`/article/${article.slug}`">
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span>Read more...</span>
      <tag-list :options="article.tagList" />
    </router-link>
  </div>
</template>
