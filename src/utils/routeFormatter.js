import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

const formatRoleRoute = (route) => {
  const userRole = userStore.user.role
  let roleRoute

  if (userRole === 'customer') roleRoute = ''
  if (userRole === 'administrator') roleRoute = '/admin'
  if (userRole === 'service-technician') roleRoute = '/technician'

  return `${roleRoute}${route}`
}

export { formatRoleRoute }
