import api from '@/api'
import type { UserInfo, User } from '@/types'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserInfo | null>(null)
  const isLoggedIn = computed(() => userInfo.value !== null)
  const auth = async (type: string, formStore: { user: User }) => {
    const { user } = type === 'register' ? await api.createUser(formStore) : await api.login(formStore)
    userInfo.value = user
    localStorage.setItem('jwt-token', user.token as string)
  }
  const getUserInfo = async () => {
    const { user } = await api.getUserInfo()
    userInfo.value = user
    localStorage.setItem('jwt-token', user.token as string)
  }

  return { userInfo, isLoggedIn, auth, getUserInfo }
})
