import api from '@/api'
import { useAsyncState } from '@vueuse/core'
import { useUserStore } from '@/stores/useUserStore'

export function useFollow() {
  const router = useRouter()
  const store = useUserStore()
  const { isLoading, execute: handleFollow } = useAsyncState(
    async ({ following, username }) => {
      const method = following ? 'delete' : 'post'

      if (store.isLoggedIn) {
        return await api.follow({ method, username })
      } else {
        router.push('/register')
      }
    },
    null,
    { immediate: false }
  )

  return { isLoading, handleFollow }
}
