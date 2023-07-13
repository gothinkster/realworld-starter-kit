<script lang="ts" setup>
import type { FeedToggleOptions } from '@/types'
const emit = defineEmits(['update:modelValue', 'change'])
defineProps({
  modelValue: String,
  options: {
    required: true,
    type: Array as PropType<FeedToggleOptions[]>
  }
})
const handleClick = (label: string) => {
  emit('update:modelValue', label)
  emit('change')
}
</script>

<template>
  <div class="feed-toggle">
    <ul class="nav nav-pills outline-active">
      <template :key="label" v-for="{ label, show, icon } in options">
        <li class="nav-item" v-if="show">
          <router-link
            to=""
            @click="handleClick(label)"
            :class="['nav-link', { active: label === modelValue }]"
          >
            <i class="ion-pound" v-if="icon" />
            {{ label }}
          </router-link>
        </li>
      </template>
    </ul>
  </div>
</template>
