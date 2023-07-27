<script lang="ts" setup>
import type { ArticleToggleOptions } from '@/types'

defineProps({
  modelValue: String,
  options: {
    required: true,
    type: Array as PropType<ArticleToggleOptions[]>,
  },
})

const emit = defineEmits(['update:modelValue', 'change'])
function handleClick(label: string) {
  emit('update:modelValue', label)
  emit('change')
}
</script>

<template>
  <div class="articles-toggle">
    <ul class="nav nav-pills outline-active">
      <template v-for="{ label, show = true, icon } in options" :key="label">
        <li v-if="show" class="nav-item">
          <router-link
            to=""
            class="nav-link" :class="[{ active: label === modelValue }]"
            @click="handleClick(label)"
          >
            <i v-if="icon" class="ion-pound" />
            {{ label }}
          </router-link>
        </li>
      </template>
    </ul>
  </div>
</template>
