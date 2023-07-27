<script lang="ts" setup>
import { useAsyncState } from '@vueuse/core'
import api from '@/api'
import { useUserStore } from '@/stores/useUserStore'

const props = defineProps<{ following: boolean; username: string }>()
const emit = defineEmits(['change'])
const router = useRouter()
const store = useUserStore()
const { isLoading, execute: onFollow } = useAsyncState(
  async () => {
    const method = props.following ? 'delete' : 'post'

    if (store.isLoggedIn) {
      return await api.follow({ method, username: props.username }).then(({ profile }) => {
        emit('change', profile.following)
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
    :class="[following ? 'btn-secondary' : 'btn-outline-secondary']"
    @click="() => onFollow()"
  >
    <i class="ion-plus-round" />
    &nbsp; {{ following ? 'Unfollow' : 'Follow' }} {{ username }}
  </button>
</template>
