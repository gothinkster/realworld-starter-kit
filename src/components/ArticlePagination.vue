<script lang="ts" setup>
const props = defineProps({
  count: { type: Number, required: true },
  current: { type: Number, required: true, default: 1 }
})
const pageCount = computed(() => Math.ceil(props.count / 10))
</script>

<template>
  <ul class="pagination" v-if="pageCount > 1">
    <li
      :key="item"
      v-for="item in pageCount"
      :class="['page-item', { active: item === props.current }]"
    >
      <router-link to="" class="page-link" @click="$emit('currentChange', item)">
        {{ item }}
      </router-link>
    </li>
  </ul>
</template>
