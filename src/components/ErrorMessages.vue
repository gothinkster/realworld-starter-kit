<script lang="ts" setup>
import { formatError } from '@/utils'

const props = defineProps<{ errors: Record<string, string[]> }>()
const isErrors = computed(() => Object.keys(props.errors).length > 0)
</script>

<template>
  <ul v-if="isErrors" class="error-messages">
    <li v-for="error in formatError(errors)" :key="error">
      {{ error }}
    </li>
  </ul>
</template>
