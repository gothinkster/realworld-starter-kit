<script lang="ts" setup>
import type { Article } from '@/types'
import { useFavorited } from '@/composables/useFavorited'

const emit = defineEmits(['change'])
const props = defineProps<{ article: Article }>()
const { isLoading, handleFavorited } = useFavorited()
const onFavorited = async () => {
  const res = await handleFavorited(0, props.article)

  emit('change', res?.article)
}
</script>

<template>
  <button
    class="btn btn-sm"
    @click="onFavorited"
    :disabled="isLoading"
    :class="[article.favorited ? 'btn-primary' : 'btn-outline-primary']"
  >
    <i class="ion-heart"></i>
    &nbsp; {{ article.favorited ? 'Unfavorite' : 'Favorite' }} Article
    <span class="counter">({{ article.favoritesCount }})</span>
  </button>
</template>
