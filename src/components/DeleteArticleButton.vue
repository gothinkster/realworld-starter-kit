<script lang="ts" setup>
import { useAsyncState } from '@vueuse/core'
import api from '@/api'

const props = defineProps<{ slug: string }>()
const router = useRouter()
const { isLoading, execute: onDeleteArticle } = useAsyncState(
  async () => {
    await api.deleteArticle(props.slug)
    router.push('/')
  },
  null,
  {
    immediate: false,
  },
)
</script>

<template>
  <button
    :disabled="isLoading"
    class="btn btn-outline-danger btn-sm"
    @click="() => onDeleteArticle()"
  >
    <i class="ion-trash-a" /> Delete Article
  </button>
</template>
