<script lang="ts" setup>
import type { Article } from '@/types'
import { useFollow } from '@/composables/useFollow'

const props = defineProps<{ article: Article }>()
const { isLoading, isFollow, onFollow } = useFollow(props.article)
</script>

<template>
  <button
    class="btn btn-sm"
    :disabled="isLoading"
    @click="() => onFollow()"
    :class="[isFollow ? 'btn-secondary' : 'btn-outline-secondary']"
  >
    <i class="ion-plus-round"></i>
    &nbsp; {{ isFollow ? 'Unfollow' : 'Follow' }} {{ article.author.username }}
  </button>
</template>
