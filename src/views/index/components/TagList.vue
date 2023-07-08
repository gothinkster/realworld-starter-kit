<script lang="ts" setup>
import { GetTags } from '@/api'

const tags = ref<string[]>([])
const getTags = async (): Promise<void> => {
  const res = await GetTags()
  tags.value = res.tags
}

onMounted(() => {
  getTags()
})
</script>

<template>
  <div class="tag-list">
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
