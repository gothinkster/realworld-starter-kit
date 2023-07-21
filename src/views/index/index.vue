<script lang="ts">
interface IInstance extends ComponentPublicInstance {
  setPathFrom(from: string): void
}

export default defineComponent({
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      const instance = vm as IInstance

      instance.setPathFrom(from.name as string)
    })
  }
})
</script>

<script lang="ts" setup>
import { useUserStore } from '@/stores/useUserStore'
import type { ArticleToggleOptions, ArticleListProps } from '@/types'

const store = useUserStore()
const activeName = ref('Global Feed')
const articleListProps = ref<ArticleListProps>({})
const setPathFrom = (name: string) => {
  if (['Login', 'Register'].includes(name)) {
    activeName.value = 'Your Feed'
    articleListProps.value = { author: store.userInfo?.username }
  }
}
const articleToggleOptions = ref<ArticleToggleOptions[]>([
  {
    label: 'Global Feed',
    show: true
  },
  {
    label: 'Your Feed',
    show: store.isLoggedIn
  }
])
const handleTabClick = () => {
  if (['Your Feed', 'Global Feed'].includes(activeName.value)) {
    if (articleToggleOptions.value.length === 3) {
      articleToggleOptions.value.pop()
    }
    if (activeName.value === 'Global Feed') {
      articleListProps.value = {}
    } else {
      articleListProps.value = { author: store.userInfo?.username }
    }
  }
}
const handleTagClick = (tag: string) => {
  activeName.value = tag
  articleListProps.value = { tag }
  if (articleToggleOptions.value.length === 2) {
    articleToggleOptions.value.push({
      label: tag,
      show: true,
      icon: true
    })
  } else {
    articleToggleOptions.value[2].label = tag
  }
}

defineExpose({ setPathFrom })
</script>

<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <article-toggle
            v-model="activeName"
            @change="handleTabClick"
            :options="articleToggleOptions"
          />
          <article-list :remote-params="articleListProps" />
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <tag-list @change="handleTagClick" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
