<script lang="ts" setup>
import api from '@/api'
import { useAsyncState } from '@vueuse/core'

const router = useRouter()
const props = defineProps<{ slug: string }>()
const { isLoading, execute: onDeleteArticle } = useAsyncState(
  async () => {
    await api.deleteArticle(props.slug)
    router.push('/')
  },
  null,
  {
    immediate: false
  }
)
</script>

<template>
  <button
    :disabled="isLoading"
    @click="() => onDeleteArticle()"
    class="btn btn-outline-danger btn-sm"
  >
    <i class="ion-trash-a" /> Delete Article
  </button>
</template>
