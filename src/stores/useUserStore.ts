import api from '@/api'
import type { UserInfo, User } from '@/types'
import { useCookies } from '@vueuse/integrations/useCookies'

export const useUserStore = defineStore('user', () => {
  const { set } = useCookies()
  const userInfo = ref<UserInfo | null>(null)
  const isLoggedIn = computed(() => userInfo.value !== null)
  const auth = async (type: string, formStore: { user: User }) => {
    const { user } = type === 'register' ? await api.createUser(formStore) : await api.login(formStore)
    userInfo.value = user
    set('jwt-token', user.token)
  }
  const getUserInfo = async () => {
    const { user } = await api.getUserInfo()
    userInfo.value = user
  }

  return { userInfo, isLoggedIn, auth, getUserInfo }
})
