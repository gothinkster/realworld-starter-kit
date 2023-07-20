<script lang="ts" setup>
import api from '@/api'
import { formattedDate } from '@/utils'
import { useAsyncState } from '@vueuse/core'
import type { Article, Comment } from '@/types'
import { useUserStore } from '@/stores/useUserStore'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

const comment = ref('')
const store = useUserStore()
const comments = ref<Comment[]>([])
const props = defineProps<{ article: Article }>()
const route = useRoute() as RouteLocationNormalizedLoaded
const isAuthor = (username: string) => {
  return store.userInfo?.username === username
}
const getComments = async () => {
  const res = await api.getComments(route.params.id as string)

  comments.value = res.comments
}
const { isLoading, execute: onSubmit } = useAsyncState(
  async () => {
    return await api
      .createComment({
        slug: props.article.slug,
        comment: { body: comment.value }
      })
      .then(() => {
        comment.value = ''
        getComments()
      })
  },
  null,
  { immediate: false }
)
const onDeleteComment = async (comment: Comment) => {
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
      <form
        ref="formRef"
        autocomplete="on"
        class="card comment-form"
        @submit.prevent="() => onSubmit()"
      >
        <div class="card-block">
          <textarea
            required
            rows="3"
            name="body"
            v-model="comment"
            class="form-control"
            placeholder="Write a comment..."
          />
        </div>
        <div class="card-footer">
          <img :src="store.userInfo?.image" class="comment-author-img" />
          <button class="btn btn-sm btn-primary" :disabled="isLoading">Post Comment</button>
        </div>
      </form>

      <div class="card" :key="index" v-for="(comment, index) in comments">
        <div class="card-block">
          <p class="card-text">{{ comment.body }}</p>
        </div>
        <div class="card-footer">
          <a href="" class="comment-author">
            <img :src="comment.author.image" class="comment-author-img" />
          </a>
          &nbsp;
          <a href="" class="comment-author">{{ comment.author.username }}</a>
          <span class="date-posted">{{ formattedDate(comment.createdAt) }}</span>
          <span class="mod-options" v-if="isAuthor(comment.author.username)">
            <i class="ion-trash-a" @click="onDeleteComment(comment)"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
