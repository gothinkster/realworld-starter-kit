<script lang="ts" setup>
import api from '@/api'
import type { Article } from '@/types'
import { useUserStore } from '@/stores/useUserStore'

defineProps({ article: { type: Object as PropType<Article>, required: true } })

const router = useRouter()
const isLoading = ref(false)
const store = useUserStore()
const onFavorites = async (item: Article) => {
  if (store.isLoggedIn) {
    try {
      isLoading.value = true
      const { slug, favorited } = item
      const method = favorited ? 'delete' : 'post'
      const { article } = await api.favorites({ method, slug })
      item.favorited = article.favorited
      item.favoritesCount = article.favoritesCount
    } finally {
      isLoading.value = false
    }
  } else {
    router.push('/register')
  }
}
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
        @click="onFavorites(article)"
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
