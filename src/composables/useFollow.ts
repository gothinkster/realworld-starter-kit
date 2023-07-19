import api from '@/api'
import type { Article } from '@/types'
import { useAsyncState } from '@vueuse/core'
import { useUserStore } from '@/stores/useUserStore'

export function useFollow(article: Article) {
  const router = useRouter()
  const store = useUserStore()
  const { username } = article.author
  const isFollow = ref(article.author.following)
  const { isLoading, execute: onFollow } = useAsyncState(
    async () => {
      if (store.isLoggedIn) {
        return await api
          .follow({ method: isFollow.value ? 'delete' : 'post', username })
          .then(({ profile }) => {
            isFollow.value = profile.following
          })
      } else {
        router.push('/register')
      }
    },
    null,
    { immediate: false }
  )

  return { isFollow, isLoading, onFollow }
}
