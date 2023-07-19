import api from '@/api'
import type { Article } from '@/types'
import { useAsyncState } from '@vueuse/core'
import { useUserStore } from '@/stores/useUserStore'

export function useFavorited(article: Article) {
  const router = useRouter()
  const store = useUserStore()
  const isFavorited = ref(article.favorited)
  const favoritesCount = ref(article.favoritesCount)
  const { isLoading, execute: onFavorited } = useAsyncState(
    (slug: string) => {
      if (store.isLoggedIn) {
        const method = isFavorited.value ? 'delete' : 'post'

        return api.favorites({ method, slug }).then(({ article }) => {
          favoritesCount.value = article.favoritesCount
          isFavorited.value = article.favorited
        })
      } else {
        router.push('/register')
      }
    },
    null,
    { immediate: false }
  )

  return { isLoading, favoritesCount, onFavorited }
}
