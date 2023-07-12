<script lang="ts" setup>
import api from '@/api'

const isError = ref(false)
const tags = ref<string[]>([])
const getTags = async (): Promise<void> => {
  try {
    const res = await api.getTags()

    tags.value = res.tags
  } catch {
    isError.value = true
  }
}

await getTags()
</script>

<template>
  <div v-if="isError">tags is error</div>
  <div v-else class="tag-list">
    <router-link
      to=""
      :key="tag"
      v-for="tag in tags"
      class="tag-pill tag-default"
      @click="$emit('change', tag)"
    >
      {{ tag }}
    </router-link>
  </div>
</template>
