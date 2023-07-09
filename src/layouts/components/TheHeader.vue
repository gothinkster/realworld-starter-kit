<script lang="ts" setup>
import { useUserStore } from '@/stores/useUserStore'

const store = useUserStore()
const { isLoggedIn, userInfo } = storeToRefs(store)
const navList = computed(() => [
  {
    label: 'Home',
    path: '/',
    auth: true
  },
  {
    label: 'Sign in',
    path: '/login',
    auth: !isLoggedIn.value
  },
  {
    label: 'Sign up',
    path: '/register',
    auth: !isLoggedIn.value
  },
  {
    label: 'New Article',
    path: '/article/create',
    auth: isLoggedIn.value,
    icon: 'ion-compose'
  },
  {
    label: 'Settings',
    path: '/settings',
    auth: isLoggedIn.value,
    icon: 'ion-gear-a'
  },
  {
    label: userInfo.value?.username,
    path: '/profile',
    auth: isLoggedIn.value,
    pic: userInfo.value?.image
  }
])
</script>

<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">conduit</router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <template :key="label" v-for="{ label, path, icon, pic, auth } in navList">
          <li class="nav-item" v-if="auth">
            <router-link :to="path" class="nav-link" active-class="active">
              <template v-if="icon"><i :class="icon"></i>&nbsp;</template>
              <template v-if="pic"><img :src="pic" class="user-pic" /></template>
              {{ label }}
            </router-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>
