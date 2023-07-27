<script lang="ts" setup>
import { useAsyncState } from '@vueuse/core'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import api from '@/api'
import { formatDate } from '@/utils'
import type { Article, Comment } from '@/types'
import { useUserStore } from '@/stores/useUserStore'

const props = defineProps<{ article: Article }>()
const body = ref('')
const store = useUserStore()
const comments = ref<Comment[]>([])
const route = useRoute() as RouteLocationNormalizedLoaded
function isAuthor(username: string) {
  return store.userInfo?.username === username
}
async function getComments() {
  const res = await api.getComments(route.params.id as string)

  comments.value = res.comments
}
const { isLoading, execute: onSubmit } = useAsyncState(
  async () => {
    return await api
      .createComment({
        slug: props.article.slug,
        comment: { body: body.value },
      })
      .then(() => {
        body.value = ''
        getComments()
      })
  },
  null,
  { immediate: false },
)
async function onDeleteComment(comment: Comment) {
  await api.deleteComment(route.params.id as string, comment.id)
  getComments()
}

onMounted(() => {
  getComments()
})
</script>

<template>
  <div class="row">
    <div class="col-xs-12 col-md-8 offset-md-2">
      <form autocomplete="on" class="card comment-form" @submit.prevent="() => onSubmit()">
        <div class="card-block">
          <textarea v-model="body" required rows="3" name="body" class="form-control" placeholder="Write a comment..." />
        </div>
        <div class="card-footer">
          <img :src="store.userInfo?.image" class="comment-author-img">
          <button class="btn btn-sm btn-primary" :disabled="isLoading">
            Post Comment
          </button>
        </div>
      </form>

      <div v-for="(comment, index) in comments" :key="index" class="card">
        <div class="card-block">
          <p class="card-text">
            {{ comment.body }}
          </p>
        </div>
        <div class="card-footer">
          <a href="" class="comment-author">
            <img :src="comment.author.image" class="comment-author-img">
          </a>
          &nbsp;
          <a href="" class="comment-author">{{ comment.author.username }}</a>
          <span class="date-posted">{{ formatDate(comment.createdAt) }}</span>
          <span v-if="isAuthor(comment.author.username)" class="mod-options">
            <i class="ion-trash-a" @click="onDeleteComment(comment)" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
