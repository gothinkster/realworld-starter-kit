import router from './index'
import { WHITE_LIST } from '@/constants'
import { useUserStore } from '@/stores/useUserStore'

router.beforeEach(async (to) => {
  const store = useUserStore()
  const token = localStorage.getItem('jwt-token')

  if (store.isLoggedIn) {
    return true
  } else {
    if (token) {
      try {
        await store.getUserInfo()
        return true
      } catch {
        localStorage.removeItem('jwt-token')
        return '/'
      }
    } else {
      if (WHITE_LIST.includes(to.name as string)) {
        return true
      } else {
        return '/'
      }
    }
  }
})
