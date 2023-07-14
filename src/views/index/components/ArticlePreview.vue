<script lang="ts" setup>
import api from '@/api'
import type { Article } from '@/types'
import { useAsyncState } from '@vueuse/core'
import { useUserStore } from '@/stores/useUserStore'

defineProps({ article: { type: Object as PropType<Article>, required: true } })

const router = useRouter()
const store = useUserStore()
const { isLoading, execute } = useAsyncState(
  async (args: Article) => {
    if (store.isLoggedIn) {
      const { slug, favorited } = args
      const method = favorited ? 'delete' : 'post'
      return await api.favorites({ method, slug }).then((res) => {
        args.favorited = res.article.favorited
        args.favoritesCount = res.article.favoritesCount
      })
    } else {
      router.push('/register')
    }
  },
  null,
  { immediate: false }
)
</script>

<template>
  <div class="article-preview">
    <div class="article-meta">
      <router-link :to="`/profile/${article.author.username}`">
        <img :src="article.author.image" />
      </router-link>
      <div class="info">
        <router-link class="author" :to="`/profile/${article.author.username}`">
          {{ article.author.username }}
        </router-link>
        <span class="date">{{ new Date(article.createdAt).toDateString() }}</span>
      </div>
      <button
        :disabled="isLoading"
        @click="execute(0, article)"
        class="btn btn-sm pull-xs-right"
        :class="[article.favorited ? 'btn-primary' : 'btn-outline-primary']"
      >
        <i class="ion-heart"></i>
        {{ article.favoritesCount }}
      </button>
    </div>
    <router-link class="preview-link" :to="`/article/${article.title}`">
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span>Read more...</span>
      <ul class="tag-list">
        <li :key="tag" v-for="tag in article.tagList" class="tag-default tag-pill tag-outline">
          {{ tag }}
        </li>
      </ul>
    </router-link>
  </div>
</template>
