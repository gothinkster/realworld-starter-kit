<script lang="ts" setup>
import { useAsyncState } from '@vueuse/core'
import api from '@/api'
import type { UserInfo } from '@/types'
import { useUserStore } from '@/stores/useUserStore'

const router = useRouter()
const store = useUserStore()
const fromStore = ref<UserInfo>({
  image: '',
  username: '',
  bio: '',
  email: '',
  password: '',
})
const { isLoading, execute: onSubmit } = useAsyncState(
  async () => {
    return await api.updateUser({ user: fromStore.value }).then(({ user }) => {
      store.userInfo = user
      router.push(`/profile/${user.username}`)
    })
  },
  null,
  { immediate: false },
)
function onLogout() {
  store.userInfo = null
  localStorage.removeItem('jwt-token')
  router.push('/')
}

onMounted(() => {
  if (store.userInfo) {
    fromStore.value = { ...fromStore.value, ...store.userInfo }
  }
})
</script>

<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            Your Settings
          </h1>
          <form autocomplete="on" @submit.prevent="() => onSubmit()">
            <fieldset>
              <fieldset class="form-group">
                <input v-model="fromStore.image" type="text" class="form-control" placeholder="URL of profile picture">
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="fromStore.username" type="text" placeholder="Your Name"
                  class="form-control form-control-lg"
                >
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="fromStore.bio" rows="8" placeholder="Short bio about you"
                  class="form-control form-control-lg"
                />
              </fieldset>
              <fieldset class="form-group">
                <input v-model="fromStore.email" type="text" placeholder="Email" class="form-control form-control-lg">
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="fromStore.password" type="password" placeholder="New Password"
                  class="form-control form-control-lg"
                >
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right" :disabled="isLoading">
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr>
          <button class="btn btn-outline-danger" @click="onLogout">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
