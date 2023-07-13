import router from './index'
import { WHITE_LIST } from '@/constants'
import { useUserStore } from '@/stores/useUserStore'
import { useCookies } from '@vueuse/integrations/useCookies'

router.beforeEach(async (to) => {
  const store = useUserStore()
  const { get, remove } = useCookies()

  if (store.isLoggedIn) {
    return true
  } else {
    if (get('jwt-token')) {
      try {
        await store.getUserInfo()
        return true
      } catch (error) {
        remove('jwt-token')
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
