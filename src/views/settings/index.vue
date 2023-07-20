<script lang="ts" setup>
import api from '@/api'
import type { UserInfo } from '@/types'
import { useAsyncState } from '@vueuse/core'
import { useUserStore } from '@/stores/useUserStore'

const router = useRouter()
const store = useUserStore()
const fromStore = ref<UserInfo>({
  image: '',
  username: '',
  bio: '',
  email: '',
  password: ''
})
const { isLoading, execute: onSubmit } = useAsyncState(
  async () => {
    return await api.updateUser({ user: fromStore.value }).then(({ user }) => {
      store.userInfo = user
    })
  },
  null,
  { immediate: false }
)
const onLogout = () => {
  store.userInfo = null
  localStorage.removeItem('jwt-token')
  router.push('/')
}

onMounted(() => {
  if (store.userInfo) {
    fromStore.value = { ...store.userInfo }
  }
})
</script>

<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>
          <form autocomplete="on" ref="formRef" @submit.prevent="() => onSubmit()">
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="fromStore.image"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  placeholder="Your Name"
                  v-model="fromStore.username"
                  class="form-control form-control-lg"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  rows="8"
                  v-model="fromStore.bio"
                  placeholder="Short bio about you"
                  class="form-control form-control-lg"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  placeholder="Email"
                  v-model="fromStore.email"
                  class="form-control form-control-lg"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="password"
                  placeholder="New Password"
                  v-model="fromStore.password"
                  class="form-control form-control-lg"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right" :disabled="isLoading">
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger" @click="onLogout">Or click here to logout.</button>
        </div>
      </div>
    </div>
  </div>
</template>
