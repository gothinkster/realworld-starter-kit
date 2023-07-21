<script lang="ts" setup>
defineProps<{ to: string }>()
</script>

<template>
  <router-link :to="to" class="btn btn-outline-secondary btn-sm space">
    <i class="ion-edit space" /> Edit Article
  </router-link>
</template>
