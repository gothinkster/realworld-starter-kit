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
      <a class="navbar-brand" @click="$router.push('/')">conduit</a>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item" :key="index" v-for="({ label, path }, index) in navList">
          <a
            :class="['nav-link', { active: $router.currentRoute.value.fullPath === path }]"
            @click="$router.push(path)">
            {{ label }}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>
