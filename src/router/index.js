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
    // Customer-specific routes
    {
      path: '/',
      component: () => import('@/layouts/UserLayout.vue'),
      meta: { requiresAuth: true, roles: ['customer'] },
      children: [
        {
          path: '/dashboard',
          name: 'customer.dashboard',
          component: () => import('@/views/customer/DashboardView.vue'),
        },
        {
          path: '/notifications',
          name: 'customer.notifications',
          component: () => import('@/views/customer/NotificationsView.vue'),
        },
        {
          path: '/cart',
          name: 'customer.cart',
          component: () => import('@/views/customer/CartView.vue'),
        },
        {
          path: '/services',
          children: [
            {
              path: '',
              name: 'customer.services.index',
              component: () => import('@/views/services/ServicesView.vue'),
            },
            {
              path: ':subservice',
              name: 'customer.services.show',
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
              name: 'customer.rentals.index',
              component: () => import('@/views/rentals/RentalsView.vue'),
            },
            {
              path: ':id',
              name: 'customer.rentals.show',
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
              name: 'customer.inventories.index',
              component: () => import('@/views/inventories/InventoriesView.vue'),
            },
            {
              path: ':id',
              name: 'customer.inventories.show',
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
              name: 'customer.profile.index',
              component: () => import('@/views/customer/profile/ProfileView.vue'),
            },
            {
              path: 'edit',
              name: 'customer.profile.edit',
              component: () => import('@/views/customer/profile/EditProfileView.vue'),
            },
            {
              path: 'change-password',
              name: 'customer.profile.change-password',
              component: () => import('@/views/customer/profile/EditProfilePasswordView.vue'),
            },
          ],
        },
        {
          path: '/bookings',
          children: [
            {
              path: '',
              name: 'customer.bookings.index',
              component: () => import('@/views/customer/bookings/BookingsView.vue'),
            },
            {
              path: 'service/create',
              name: 'customer.bookings.service.create',
              component: () => import('@/views/customer/bookings/BookingServiceCreateView.vue'),
            },
            {
              path: 'rental/create',
              name: 'customer.bookings.rental.create',
              component: () => import('@/views/customer/bookings/BookingRentalCreateView.vue'),
            },
            {
              path: ':id',
              name: 'customer.bookings.show',
              component: () => import('@/views/customer/bookings/BookingView.vue'),
              props: true,
            },
            {
              path: 'service/:id/edit',
              name: 'customer.bookings.service.edit',
              component: () => import('@/views/customer/bookings/BookingServiceEditView.vue'),
              props: true,
            },
            {
              path: 'rental/:id/edit',
              name: 'customer.bookings.rental.edit',
              component: () => import('@/views/customer/bookings/BookingRentalEditView.vue'),
              props: true,
            },
          ],
        },
        {
          path: '/vehicles',
          children: [
            {
              path: '',
              name: 'customer.vehicles.index',
              component: () => import('@/views/customer/vehicles/VehiclesView.vue'),
            },
            {
              path: 'create',
              name: 'customer.vehicles.create',
              component: () => import('@/views/customer/vehicles/VehicleCreateView.vue'),
            },
            {
              path: ':id',
              name: 'customer.vehicles.show',
              component: () => import('@/views/customer/vehicles/VehicleView.vue'),
              props: true,
            },
            {
              path: ':id/edit',
              name: 'customer.vehicles.edit',
              component: () => import('@/views/customer/vehicles/VehicleEditView.vue'),
              props: true,
            },
          ],
        },
        {
          path: '/payments',
          children: [
            {
              path: '',
              name: 'customer.payments.index',
              component: () => import('@/views/customer/payments/PaymentsView.vue'),
            },
            {
              path: 'verify',
              name: 'customer.payments.verify',
              component: () => import('@/views/customer/payments/PaymentVerifyView.vue'),
            },
          ],
        },
      ],
    },
    // Admin-specific routes
    {
      path: '/admin',
      component: () => import('@/layouts/AdminLayout.vue'),
      meta: { requiresAuth: true, roles: ['administrator'] },
      children: [
        {
          path: 'dashboard',
          name: 'admin.dashboard',
          component: () => import('@/views/admin/DashboardView.vue'),
        },
        {
          path: 'services',
          children: [
            {
              path: '',
              name: 'admin.services.index',
              component: () => import('@/views/services/ServicesView.vue'),
            },
            {
              path: ':subservice',
              name: 'admin.services.show',
              component: () => import('@/views/services/SubserviceView.vue'),
              props: true,
            },
            {
              path: 'create',
              name: 'admin.services.create',
              component: () => import('@/views/admin/services/ServiceCreateView.vue'),
            },
          ],
        },
        {
          path: 'users',
          children: [
            {
              path: '',
              name: 'admin.users.index',
              component: () => import('@/views/admin/users/UsersView.vue'),
            },
            {
              path: 'create',
              name: 'admin.users.create',
              component: () => import('@/views/admin/users/UserCreateView.vue'),
            },
            {
              path: ':id',
              name: 'admin.users.show',
              component: () => import('@/views/admin/users/UserView.vue'),
            },
            {
              path: ':id/edit',
              name: 'admin.users.edit',
              component: () => import('@/views/admin/users/UserEditView.vue'),
            },
          ],
        },
        {
          path: 'vehicles',
          children: [
            {
              path: '',
              name: 'admin.vehicles.index',
              component: () => import('@/views/admin/vehicles/VehiclesView.vue'),
            },
            {
              path: ':id',
              name: 'admin.vehicles.show',
              component: () => import('@/views/admin/vehicles/VehicleView.vue'),
            },
            {
              path: ':id/edit',
              name: 'admin.vehicles.edit',
              component: () => import('@/views/admin/vehicles/VehicleEditView.vue'),
            },
          ],
        },
        {
          path: 'bookings',
          children: [
            {
              path: '',
              name: 'admin.bookings.index',
              component: () => import('@/views/admin/bookings/BookingsView.vue'),
            },
            {
              path: ':id',
              name: 'admin.bookings.show',
              component: () => import('@/views/admin/bookings/BookingView.vue'),
            },
          ],
        },
        {
          path: 'payments',
          children: [
            {
              path: '',
              name: 'admin.payments.index',
              component: () => import('@/views/admin/payments/PaymentsView.vue'),
            },
            {
              path: ':id',
              name: 'admin.payments.show',
              component: () => import('@/views/admin/payments/PaymentView.vue'),
            },
          ],
        },
      ],
    },
    // General Routes
    {
      path: '/',
      component: () => import('@/layouts/GuestLayout.vue'),
      children: [
        {
          path: 'privacy-policy',
          name: 'privacy-policy',
          component: () => import('@/views/PrivacyPolicyView.vue'),
        },
        {
          path: 'terms-of-service',
          name: 'terms-of-service',
          component: () => import('@/views/TermsOfServiceView.vue'),
        },
        {
          path: ':catchAll(.*)*',
          name: 'not-found',
          component: () => import('@/views/NotFoundView.vue'),
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  const { isAuthenticated, isVerified, userRole } = useAuthStore()

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      return next(`/login?redirect=${to.fullPath}`)
    }
    if (!isVerified) {
      return next('/verify-email')
    }
    if (to.meta.roles && !to.meta.roles?.includes(userRole)) {
      return next({ name: 'not-found' })
    }
    if (from.query.redirect && from.query.redirect !== to.fullPath) {
      return next(from.query.redirect)
    }
    next()
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    if (isAuthenticated) {
      if (userRole === 'administrator') {
        next('/admin/dashboard')
      } else {
        next('/dashboard')
      }
    }
    next()
  } else {
    next()
  }
})

export default router
