<script lang="ts" setup>
import { useAsyncState } from '@vueuse/core'
import { useUserStore } from '@/stores/useUserStore'

const errors = ref({})
const route = useRoute()
const router = useRouter()
const { handleAuthAction } = useUserStore()
const isRegister = (route.name as string) === 'Register'
const formStore = ref({ username: '', email: '', password: '' })
const { isLoading, execute: onSubmit } = useAsyncState(
  async () => {
    errors.value = {}
    return await handleAuthAction(route.name.toLowerCase(), { user: formStore.value })
      .then(() => {
        router.push('/')
      })
      .catch((error) => {
        errors.value = error.errors || {}
      })
  },
  null,
  { immediate: false },
)
</script>

<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            {{ isRegister ? 'Sign up' : 'Sign in' }}
          </h1>
          <p class="text-xs-center">
            <router-link :to="isRegister ? '/login' : '/register'">
              {{ isRegister ? 'Have an account?' : 'Need an account?' }}
            </router-link>
          </p>
          <error-messages :errors="errors" />
          <form autocomplete="on" @submit.prevent="() => onSubmit()">
            <fieldset v-if="isRegister" class="form-group">
              <input
                v-model="formStore.username" required type="text" name="username" placeholder="Your Name"
                class="form-control form-control-lg"
              >
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="formStore.email" required type="email" name="email" placeholder="Email"
                class="form-control form-control-lg"
              >
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="formStore.password" required name="password" type="password" placeholder="Password"
                class="form-control form-control-lg"
              >
            </fieldset>
            <button type="submit" :disabled="isLoading" class="btn btn-lg btn-primary pull-xs-right">
              {{ isRegister ? 'Sign up' : 'Sign in' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
