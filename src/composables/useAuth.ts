import type { User } from '@/types'
import { formatError } from '@/utils'
import { useUserStore } from '@/stores/useUserStore'

export function useAuth() {
  const loading = ref(false)
  const router = useRouter()
  const { auth } = useUserStore()
  const errors = ref<string[]>([])
  const { path, name } = useRoute()
  const isRegister = path === '/register'
  const formRef = ref<HTMLFormElement | null>()
  const formStore = ref<User>({
    email: '',
    username: '',
    password: ''
  })
  const onSubmit = async () => {
    errors.value = []
    try {
      loading.value = true
      await auth(name.toLowerCase(), { user: formStore.value })
      router.push('/')
    } catch (error: any) {
      if (error) {
        errors.value = formatError(error.errors)
      }
    } finally {
      loading.value = false
    }
  }

  return {
    onSubmit,
    formRef,
    loading,
    isRegister,
    errors,
    formStore
  }
}
