<script lang="ts" setup>
import { useAsyncState } from '@vueuse/core'
import api from '@/api'
import type { Article } from '@/types'
import { useUserStore } from '@/stores/useUserStore'

const props = defineProps<{ article: Article }>()
const emit = defineEmits(['change'])
const router = useRouter()
const store = useUserStore()
const { isLoading, execute: onFavorited } = useAsyncState(
  async () => {
    const { favorited, slug } = props.article
    const method = favorited ? 'delete' : 'post'

    if (store.isLoggedIn) {
      return await api.favorites({ method, slug }).then(({ article }) => {
        emit('change', article)
      })
    }

    else { router.push('/login') }
  },
  null,
  { immediate: false },
)
</script>

<template>
  <button
    class="btn btn-sm"
    :disabled="isLoading"
    :class="[article.favorited ? 'btn-primary' : 'btn-outline-primary']"
    @click="() => onFavorited()"
  >
    <i class="ion-heart" />
    &nbsp; {{ article.favorited ? 'Unfavorite' : 'Favorite' }} Article
    <span class="counter">({{ article.favoritesCount }})</span>
  </button>
</template>
