<script lang="ts" setup>
import { useAuth } from '@/composables/useAuth'

const { isRegister, errors, formStore, formRef, loading, onSubmit } = useAuth()
</script>

<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isRegister ? 'Sign up' : 'Sign in' }}</h1>
          <p class="text-xs-center">
            <router-link :to="isRegister ? '/login' : '/register'">
              {{ isRegister ? 'Have an account?' : 'Need an account?' }}
            </router-link>
          </p>
          <ul class="error-messages" v-if="errors.length">
            <li :key="index" v-for="(error, index) in errors">{{ error }}</li>
          </ul>
          <form autocomplete="on" ref="formRef" @submit.prevent="onSubmit">
            <fieldset class="form-group" v-if="isRegister">
              <input
                required
                type="text"
                name="username"
                placeholder="Your Name"
                v-model="formStore.username"
                class="form-control form-control-lg"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                required
                type="email"
                name="email"
                placeholder="Email"
                v-model="formStore.email"
                class="form-control form-control-lg"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                required
                name="password"
                type="password"
                placeholder="Password"
                v-model="formStore.password"
                class="form-control form-control-lg"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right" type="submit" :disabled="loading">
              {{ isRegister ? 'Sign up' : 'Sign in' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
