import api from '@/api'
import type { Article } from '@/types'
import { useAsyncState } from '@vueuse/core'
import { useUserStore } from '@/stores/useUserStore'

export function useFavorited() {
  const router = useRouter()
  const store = useUserStore()
  const { isLoading, execute: handleFavorited } = useAsyncState(
    async (article: Article) => {
      const { favorited, slug } = article
      const method = favorited ? 'delete' : 'post'

      if (store.isLoggedIn) {
        return await api.favorites({ method, slug })
      } else {
        router.push('/register')
      }
    },
    null,
    { immediate: false }
  )

  return { isLoading, handleFavorited }
}
