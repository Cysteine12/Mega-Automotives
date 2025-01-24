import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // General-shared routes
    {
      path: '/',
      component: () => import('@/layouts/GuestLayout.vue'),
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('@/views/HomeView.vue'),
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('@/views/auth/RegisterView.vue'),
          meta: { requiresGuest: true },
        },
        {
          path: '/login',
          name: 'login',
          component: () => import('@/views/auth/LoginView.vue'),
          meta: { requiresGuest: true },
        },
        {
          path: '/forgot-password',
          name: 'forgot-password',
          component: () => import('@/views/auth/ForgotPasswordView.vue'),
          meta: { requiresGuest: true },
        },
        {
          path: '/reset-password/:token',
          name: 'reset-password',
          component: () => import('@/views/auth/ResetPasswordView.vue'),
          props: true,
          meta: { requiresGuest: true },
        },
        {
          path: '/verify-email/:token?',
          name: 'verify-email',
          component: () => import('@/views/auth/VerifyEmailView.vue'),
          props: (route) => ({ token: route.params.token || null }),
        },
      ],
    },
    // User-specific routes
    {
      path: '/',
      component: () => import('@/layouts/UserLayout.vue'),
      meta: { requiresAuth: true, roles: ['customer'] },
      children: [
        {
          path: '/dashboard',
          name: 'user.dashboard',
          component: () => import('@/views/user/UserDashboardView.vue'),
        },
        {
          path: '/notifications',
          name: 'user.notifications',
          component: () => import('@/views/user/UserNotificationsView.vue'),
        },
        {
          path: '/cart',
          name: 'user.cart',
          component: () => import('@/views/user/UserCartView.vue'),
        },
        {
          path: '/services',
          children: [
            {
              path: '',
              name: 'user.services.index',
              component: () => import('@/views/services/ServicesView.vue'),
            },
            {
              path: ':subservice',
              name: 'user.services.show',
              component: () => import('@/views/services/SubserviceView.vue'),
              props: true,
            },
          ],
        },
        {
          path: '/rentals',
          children: [
            {
              path: '',
              name: 'user.rentals.index',
              component: () => import('@/views/rentals/RentalsView.vue'),
            },
            {
              path: ':id',
              name: 'user.rentals.show',
              component: () => import('@/views/rentals/RentalView.vue'),
              props: true,
            },
          ],
        },
        {
          path: '/inventories',
          children: [
            {
              path: '',
              name: 'user.inventories.index',
              component: () => import('@/views/inventories/InventoriesView.vue'),
            },
            {
              path: ':id',
              name: 'user.inventories.show',
              component: () => import('@/views/inventories/InventoryView.vue'),
              props: true,
            },
          ],
        },
        {
          path: '/profile',
          children: [
            {
              path: '',
              name: 'user.profile.index',
              component: () => import('@/views/user/profile/ProfileView.vue'),
            },
            {
              path: 'edit',
              name: 'user.profile.edit',
              component: () => import('@/views/user/profile/EditProfileView.vue'),
            },
            {
              path: 'change-password',
              name: 'user.profile.change-password',
              component: () => import('@/views/user/profile/EditProfilePasswordView.vue'),
            },
          ],
        },
        {
          path: '/bookings',
          children: [
            {
              path: '',
              name: 'user.bookings.index',
              component: () => import('@/views/user/bookings/BookingsView.vue'),
            },
            {
              path: 'service/create',
              name: 'user.bookings.service.create',
              component: () => import('@/views/user/bookings/BookingServiceCreateView.vue'),
            },
            {
              path: 'rental/create',
              name: 'user.bookings.rental.create',
              component: () => import('@/views/user/bookings/BookingRentalCreateView.vue'),
            },
            {
              path: ':id',
              name: 'user.bookings.show',
              component: () => import('@/views/user/bookings/BookingView.vue'),
              props: true,
            },
            {
              path: 'service/:id/edit',
              name: 'user.bookings.service.edit',
              component: () => import('@/views/user/bookings/BookingServiceEditView.vue'),
              props: true,
            },
            {
              path: 'rental/:id/edit',
              name: 'user.bookings.rental.edit',
              component: () => import('@/views/user/bookings/BookingRentalEditView.vue'),
              props: true,
            },
          ],
        },
        {
          path: '/vehicles',
          children: [
            {
              path: '',
              name: 'user.vehicles.index',
              component: () => import('@/views/user/vehicles/VehiclesView.vue'),
            },
            {
              path: 'create',
              name: 'user.vehicles.create',
              component: () => import('@/views/user/vehicles/VehicleCreateView.vue'),
            },
            {
              path: ':id',
              name: 'user.vehicles.show',
              component: () => import('@/views/user/vehicles/VehicleView.vue'),
              props: true,
            },
            {
              path: ':id/edit',
              name: 'user.vehicles.edit',
              component: () => import('@/views/user/vehicles/VehicleEditView.vue'),
              props: true,
            },
          ],
        },
      ],
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: () => import('@/views/PrivacyPolicyView.vue'),
    },
    {
      path: '/terms-of-service',
      name: 'terms-of-service',
      component: () => import('@/views/TermsOfServiceView.vue'),
    },
    {
      path: '/:catchAll(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const { isAuthenticated, isVerified, userRole } = useAuthStore()

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next(`/login?redirect=${to.fullPath}`)
    } else if (!isVerified) {
      next('/verify-email')
    } else if (to.meta.roles && !to.meta.roles?.includes(userRole)) {
      return next({ name: 'not-found' })
    } else {
      console.log(from, to)
      if (from.query.redirect && from.query.redirect !== to.fullPath) next(from.query.redirect)
      else next()
    }
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    if (isAuthenticated) {
      next('/dashboard')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
