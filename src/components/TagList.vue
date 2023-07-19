<script lang="ts" setup>
import api from '@/api'
import { useAsyncState } from '@vueuse/core'

defineProps<{ options?: string[] }>()

const attrs = useAttrs()
const {
  state,
  error,
  isLoading,
  execute: getTags
} = useAsyncState(async () => await api.getTags().then((res) => res.tags), [], { immediate: false })

onMounted(() => {
  if (attrs.onChange) {
    getTags()
  }
})
</script>
<template>
  <template v-if="$attrs.onChange">
    <div v-if="error">Tags is error</div>
    <div v-else-if="isLoading">Loading tags...</div>
    <div v-else class="tag-list">
      <router-link
        to=""
        :key="tag"
        v-for="tag in state"
        class="tag-pill tag-default"
        @click="$emit('change', tag)"
      >
        {{ tag }}
      </router-link>
    </div>
  </template>
  <template v-else>
    <ul class="tag-list">
      <li :key="tag" v-for="tag in options" class="tag-default tag-pill tag-outline">
        {{ tag }}
      </li>
    </ul>
  </template>
</template>
