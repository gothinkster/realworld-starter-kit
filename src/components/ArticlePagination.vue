<script lang="ts" setup>
const props = defineProps({
  count: { type: Number, required: true },
  current: { type: Number, required: true, default: 1 },
})
defineEmits(['currentChange'])
const pageCount = computed(() => Math.ceil(props.count / 10))
</script>

<template>
  <ul v-if="pageCount > 1" class="pagination">
    <li
      v-for="item in pageCount"
      :key="item"
      class="page-item" :class="[{ active: item === props.current }]"
    >
      <router-link to="" class="page-link" @click="$emit('currentChange', item)">
        {{ item }}
      </router-link>
    </li>
  </ul>
</template>
