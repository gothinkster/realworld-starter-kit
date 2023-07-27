<script lang="ts" setup>
import { useAsyncState } from '@vueuse/core'
import api from '@/api'

defineEmits<{ (e: 'change', tag: string): void }>()

const {
  error,
  isLoading,
  state: tags,
} = useAsyncState(async () => await api.getTags().then(res => res.tags), [])
</script>

<template>
  <div class="sidebar">
    <p>Popular Tags</p>
    <p v-if="error">
      Tags is error
    </p>
    <div v-else-if="isLoading">
      Loading tags...
    </div>
    <tag-list v-else is-click :options="tags" @change="(tag) => $emit('change', tag)" />
  </div>
</template>
