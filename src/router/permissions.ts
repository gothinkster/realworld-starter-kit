import router from './index'
import { WHITE_LIST } from '@/constants'
import { useUserStore } from '@/stores/useUserStore'
import { useCookies } from '@vueuse/integrations/useCookies'

router.beforeEach(async (to) => {
  const { get, remove } = useCookies()
  const { isLoggedIn, getUserInfo } = useUserStore()

  if (isLoggedIn) {
    return true
  } else {
    if (get('jwt-token')) {
      try {
        await getUserInfo()
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
