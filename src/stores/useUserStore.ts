import api from '@/api'
import type { User, UserInfo } from '@/types'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserInfo | null>(null)
  const isLoggedIn = computed(() => userInfo.value !== null)
  const updateUserInfo = (user: UserInfo) => {
    userInfo.value = user
    localStorage.setItem('jwt-token', user.token!)
  }
  const handleAuthAction = async (type: string, formStore: { user: User }) => {
    const { user } = type === 'register' ? await api.register(formStore) : await api.login(formStore)

    updateUserInfo(user)
  }
  const getUserInfo = async () => {
    const { user } = await api.getUserInfo()

    updateUserInfo(user)
  }

  return { userInfo, isLoggedIn, handleAuthAction, getUserInfo }
})
