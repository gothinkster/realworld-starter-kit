<script lang="ts" setup>
import api from '@/api'
import type { Article } from '@/types'
import { formattedDate } from '@/utils'
import { useUserStore } from '@/stores/useUserStore'
import commentList from './components/CommentList.vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

const route = useRoute() as RouteLocationNormalizedLoaded
const store = useUserStore()
const isAuthor = computed(() => {
  return store.userInfo?.username === article.value.author.username
})
const article = ref<Article>({
  title: '',
  author: {
    username: '',
    image: '',
    bio: '',
    following: false
  },
  createdAt: '',
  slug: '',
  description: '',
  body: '',
  tagList: [],
  updatedAt: '',
  favorited: false,
  favoritesCount: 0
})
const getActive = async () => {
  const res = await api.getArticle(route.params.id as string)

  article.value = res.article
}

const changeFacorited = (value: Article) => {
  article.value = value
}
const changeFollow = (value: boolean) => {
  article.value.author.following = value
}

onMounted(() => {
  getActive()
})
</script>
<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <div class="article-meta">
          <router-link to="">
            <img :src="article.author.image" />
          </router-link>
          <div class="info">
            <router-link to="" class="author">{{ article.author.username }}</router-link>
            <span class="date">{{ formattedDate(article.createdAt) }}</span>
          </div>
          <template v-if="isAuthor">
            <edit-article-button :to="`/article/editor/${article.slug}`" />
            &nbsp;&nbsp;
            <delete-article-button :slug="article.slug" />
          </template>
          <template v-else>
            <follow-button
              v-if="article.title"
              @change="changeFollow"
              :following="article.author.following"
              :username="article.author.username"
            />
            &nbsp;&nbsp;
            <favorite-button :article="article" v-if="article.title" @change="changeFacorited" />
          </template>
        </div>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-xs-12">
          <p>{{ article.description }}</p>
          <p v-html="article.body"></p>
          <tag-list :options="article.tagList" />
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <div class="article-meta">
          <router-link to="">
            <img :src="article.author.image" />
          </router-link>
          <div class="info">
            <router-link to="" class="author">{{ article.author.username }}</router-link>
            <span class="date">{{ formattedDate(article.createdAt) }}</span>
          </div>

          <template v-if="isAuthor">
            <edit-article-button :to="`/article/editor/${article.slug}`" />
            &nbsp;&nbsp;
            <delete-article-button :slug="article.slug" />
          </template>
          <template v-else>
            <follow-button
              v-if="article.title"
              @change="changeFollow"
              :following="article.author.following"
              :username="article.author.username"
            />
            &nbsp;&nbsp;
            <favorite-button :article="article" v-if="article.title" @change="changeFacorited" />
          </template>
        </div>
      </div>

      <div class="row" v-if="!store.isLoggedIn">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <p>
            <router-link to="/login">Sign in</router-link>
            &nbsp; or &nbsp;
            <router-link to="/register">Sign up</router-link>
            &nbsp; to add comments on this article.
          </p>
        </div>
      </div>

      <comment-list v-else :article="article" />
    </div>
  </div>
</template>
