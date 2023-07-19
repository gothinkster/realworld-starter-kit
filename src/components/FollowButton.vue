<script lang="ts" setup>
import type { Article } from '@/types'
import { useFollow } from '@/composables/useFollow'

const emit = defineEmits(['change'])
const { isLoading, handleFollow } = useFollow()
const props = defineProps<{ article: Article }>()
const onFollow = async () => {
  const res = await handleFollow(0, props.article)

  emit('change', res?.profile.following)
}
</script>

<template>
  <button
    @click="onFollow"
    class="btn btn-sm"
    :disabled="isLoading"
    :class="[article.author.following ? 'btn-secondary' : 'btn-outline-secondary']"
  >
    <i class="ion-plus-round"></i>
    &nbsp; {{ article.author.following ? 'Unfollow' : 'Follow' }} {{ article.author.username }}
  </button>
</template>
