<script lang="ts" setup>
import api from '@/api'
import { useUserStore } from '@/stores/useUserStore'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type { Author, ArticleToggleOptions, ArticleListProps } from '@/types'

const store = useUserStore()
const userIfo = ref<Author>({
  image: '',
  username: '',
  bio: '',
  following: false
})
const activeName = ref('My Articles')
const route = useRoute() as RouteLocationNormalizedLoaded
const isSelf = computed(() => store.userInfo?.username === userIfo.value.username)
const articleListProps = ref<ArticleListProps>({ author: route.params.id as string })
const articleToggleOptions = ref<ArticleToggleOptions[]>([
  { label: 'My Articles' },
  { label: 'Favorite Articles' }
])
const getUserInfo = async () => {
  const { profile } = await api.getPofile(route.params.id as string)

  userIfo.value = profile
}
const handleTabClick = () => {
  if (activeName.value === 'My Articles') {
    articleListProps.value = { author: route.params.id as string }
  } else {
    articleListProps.value = { favorited: route.params.id as string }
  }
}

onMounted(() => {
  getUserInfo()
})
</script>

<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="userIfo.image" class="user-img" />
            <h4>{{ store.userInfo?.username }}</h4>
            <p>{{ store.userInfo?.bio }}</p>
            <button
              v-if="isSelf"
              @click="$router.push('/settings')"
              class="btn btn-sm btn-outline-secondary action-btn"
            >
              <i class="ion-gear-a"></i>
              Edit Profile Settings
            </button>
            <follow-button
              v-else
              class="action-btn"
              :following="userIfo.following"
              :username="userIfo.username"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <article-toggle
            v-model="activeName"
            @change="handleTabClick"
            :options="articleToggleOptions"
          />
          <article-list :remote-params="articleListProps" />
        </div>
      </div>
    </div>
  </div>
</template>
