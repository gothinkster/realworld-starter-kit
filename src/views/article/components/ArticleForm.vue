<script lang="ts" setup>
import api from '@/api'
import { formatError } from '@/utils'
import { useAsyncState } from '@vueuse/core'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

const router = useRouter()
const errors = ref<string[]>([])
const tagList = ref<string[]>([])
const route = useRoute() as RouteLocationNormalizedLoaded
const isArticleCreate = route.name === 'ArticleCreate'
const formStore = ref({
  title: '',
  description: '',
  body: '',
  tagList: ''
})
const getArticle = async () => {
  const { article } = await api.getArticle(route.params.id as string)

  tagList.value = article.tagList
  formStore.value.body = article.body
  formStore.value.description = article.description
  formStore.value.title = article.title
}
const createArticle = () => {
  return api.createArticle({
    article: Object.assign({}, formStore.value, { tagList: tagList.value })
  })
}
const updateArticle = () => {
  return api.updateArticle({
    article: Object.assign({}, formStore.value, { tagList: tagList.value }),
    slug: route.params.id as string
  })
}
const onEnter = () => {
  if (!formStore.value.tagList || tagList.value.includes(formStore.value.tagList)) {
    return
  }
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
        if (error) {
          errors.value = formatError(error)
        }
      })
  },
  null,
  {
    immediate: false
  }
)

onMounted(() => {
  if (!isArticleCreate) getArticle()
})
</script>

<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <ul class="error-messages">
            <li :key="index" v-for="(error, index) in errors">{{ error }}</li>
          </ul>
          <form autocomplete="on" ref="formRef" @submit.prevent="() => onSubmit()">
            <fieldset>
              <fieldset class="form-group">
                <input
                  required
                  type="text"
                  name="title"
                  v-model="formStore.title"
                  placeholder="Article Title"
                  class="form-control form-control-lg"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  required
                  type="text"
                  name="description"
                  class="form-control"
                  v-model="formStore.description"
                  placeholder="What's this article about?"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  rows="8"
                  required
                  name="body"
                  class="form-control"
                  v-model="formStore.body"
                  placeholder="Write your article (in markdown)"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  name="tagList"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="formStore.tagList"
                  @keydown.enter.prevent="onEnter"
                />
                <div class="tag-list">
                  <span :key="tag" v-for="(tag, index) in tagList" class="tag-default tag-pill">
                    <i class="ion-close-round" @click="tagList.splice(index, 1)" />
                    {{ tag }}
                  </span>
                </div>
              </fieldset>
              <button
                type="submit"
                :disabled="isLoading"
                class="btn btn-lg pull-xs-right btn-primary"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
