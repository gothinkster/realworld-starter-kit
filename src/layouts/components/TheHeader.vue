<script lang="ts" setup>
interface NavList {
  label: string
  path: string
}

const navList = reactive<NavList[]>([
  {
    label: 'Home',
    path: '/'
  },
  {
    label: 'Sign in',
    path: '/login'
  },
  {
    label: 'Sign up',
    path: '/register'
  }
])
</script>

<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">conduit</router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item" :key="index" v-for="({ label, path }, index) in navList">
          <router-link
            :to="path"
            :class="['nav-link', { active: $router.currentRoute.value.fullPath === path }]"
          >
            {{ label }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
