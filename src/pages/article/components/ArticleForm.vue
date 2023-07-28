<script lang="ts" setup>
import { useAsyncState } from '@vueuse/core'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import api from '@/api'

const errors = ref({})
const router = useRouter()
const tagList = ref<string[]>([])
const route = useRoute() as RouteLocationNormalizedLoaded
const isArticleCreate = route.name === 'ArticleCreate'
const formStore = ref({
  title: '',
  description: '',
  body: '',
  tagList: '',
})
async function getArticle() {
  const { article } = await api.getArticle(route.params.id as string)

  tagList.value = article.tagList
  formStore.value.body = article.body
  formStore.value.description = article.description
  formStore.value.title = article.title
}
function createArticle() {
  return api.createArticle({
    article: Object.assign({}, formStore.value, { tagList: tagList.value }),
  })
}
function updateArticle() {
  return api.updateArticle({
    article: Object.assign({}, formStore.value, { tagList: tagList.value }),
    slug: route.params.id as string,
  })
}
function onEnter() {
  if (!formStore.value.tagList || tagList.value.includes(formStore.value.tagList))
    return

  tagList.value.push(formStore.value.tagList)
  formStore.value.tagList = ''
}
const { isLoading, execute: onSubmit } = useAsyncState(
  async () => {
    return (isArticleCreate ? createArticle() : updateArticle())
      .then(({ article }) => {
        router.push(`/article/${article.slug}`)
      })
      .catch((error) => {
        errors.value = error.errors || {}
      })
  },
  null,
  {
    immediate: false,
  },
)

onMounted(() => {
  if (!isArticleCreate)
    getArticle()
})
</script>

<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <error-messages :errors="errors" />
          <form autocomplete="on" @submit.prevent="() => onSubmit()">
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="formStore.title" required type="text" name="title" placeholder="Article Title"
                  class="form-control form-control-lg"
                >
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="formStore.description" required type="text" name="description" class="form-control"
                  placeholder="What's this article about?"
                >
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="formStore.body" rows="8" required name="body" class="form-control"
                  placeholder="Write your article (in markdown)"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="formStore.tagList" type="text" name="tagList" class="form-control"
                  placeholder="Enter tags" @keydown.enter.prevent="onEnter"
                >
                <div class="tag-list">
                  <span v-for="(tag, index) in tagList" :key="tag" class="tag-default tag-pill">
                    <i class="ion-close-round" @click="tagList.splice(index, 1)" />
                    {{ tag }}
                  </span>
                </div>
              </fieldset>
              <button type="submit" :disabled="isLoading" class="btn btn-lg pull-xs-right btn-primary">
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
