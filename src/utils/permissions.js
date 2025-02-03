import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

const hasPermission = (role) => {
  return userStore.user.role === role
}

export { hasPermission }
