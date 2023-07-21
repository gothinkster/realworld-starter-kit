<script lang="ts" setup>
import { useFollow } from '@/composables/useFollow'

const emit = defineEmits(['change'])
const { isLoading, handleFollow } = useFollow()
const props = defineProps<{ following: boolean; username: string }>()
const onFollow = async () => {
  const res = await handleFollow(0, { following: props.following, username: props.username })

  emit('change', res?.profile.following)
}
</script>

<template>
  <button
    @click="onFollow"
    class="btn btn-sm"
    :disabled="isLoading"
    :class="[following ? 'btn-secondary' : 'btn-outline-secondary']"
  >
    <i class="ion-plus-round"></i>
    &nbsp; {{ following ? 'Unfollow' : 'Follow' }} {{ username }}
  </button>
</template>
