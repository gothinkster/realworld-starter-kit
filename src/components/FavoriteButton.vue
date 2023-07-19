<script lang="ts" setup>
import type { Article } from '@/types'
import { useFavorited } from '@/composables/useFavorited'

const props = defineProps<{ article: Article }>()
const { isLoading, favoritesCount, onFavorited } = useFavorited(props.article)
</script>

<template>
  <button
    :disabled="isLoading"
    @click="onFavorited(0, article.slug)"
    class="btn btn-sm btn-outline-primary"
  >
    <i class="ion-heart"></i>
    &nbsp; Favorite Article <span class="counter">({{ favoritesCount }})</span>
  </button>
</template>
