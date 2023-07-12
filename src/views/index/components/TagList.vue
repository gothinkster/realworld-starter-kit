<script lang="ts" setup>
import api from '@/api'

const { tags } = await api.getTags()
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
