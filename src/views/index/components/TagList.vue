<script lang="ts" setup>
import api from '@/api'
import { useAsyncState } from '@vueuse/core'

const { isLoading, state, error } = useAsyncState(
  api.getTags().then((res) => res.tags),
  []
)
</script>
<template>
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
