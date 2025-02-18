import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

const hasPermission = (role) => {
  return userStore.user.role === role
}

const hasOwnPermission = (userId) => {
  return (userStore.user._id = userId)
}

export { hasPermission, hasOwnPermission }
