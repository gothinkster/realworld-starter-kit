<script lang="ts" setup>
defineProps<{ options: string[]; isClick?: boolean }>()
defineEmits<{ (e: 'change', tag: string): void }>()
</script>

<template>
  <template v-if="isClick">
    <div class="tag-list">
      <router-link v-for="tag in options" :key="tag" to="" class="tag-default tag-pill" @click="$emit('change', tag)">
        {{ tag }}
      </router-link>
    </div>
  </template>
  <template v-else>
    <ul class="tag-list">
      <li v-for="tag in options" :key="tag" class="tag-default tag-pill tag-outline">
        {{ tag }}
      </li>
    </ul>
  </template>
</template>
