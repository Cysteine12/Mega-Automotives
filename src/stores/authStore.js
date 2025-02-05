import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import API from '@/libs/api'
import axios from 'axios'
import * as google from '@/libs/google'
import router from '../router'

const API2 = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

const toast = useToast()

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    loading: false,
    message: null,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    isVerified: (state) => state.user?.isVerified,
    userRole: (state) => state.user?.role,
  },

  actions: {
    async register(newUser) {
      this.loading = true
      this.error = null
      try {
        const res = await API.post(`/auth/register`, newUser)

        if (res.data.success) {
          this.message = res.data.message
          toast.success(this.message)

          this.login(newUser)
        } else {
          this.error = res.data.message
          toast.error(this.error)
        }
      } catch (err) {
        this.error = err.response?.data?.message
        toast.error(this.error)
      } finally {
        this.loading = false
      }
    },

    async login(newUser) {
      this.loading = true
      this.error = null
      try {
        const res = await API.post(`/auth/login`, newUser)

        if (res.data.success) {
          this.user = res.data.user
          this.message = res.data.message

          localStorage.setItem('user', JSON.stringify(this.user))
          toast.success(this.message)

          if (this.userRole === 'administrator') {
            router.push('/admin/dashboard')
          } else {
            router.push('/dashboard')
          }
          return
        } else {
          this.error = res.data.message
          toast.error(this.error)
        }
      } catch (err) {
        this.error = err.response?.data?.message
        toast.error(this.error)
      } finally {
        this.loading = false
      }
    },

    async googleLogin() {
      this.loading = true
      this.error = null
      try {
        const { access_token } = await google.login()
        if (!access_token) {
          toast.error('Error completing sign in')
          return
        }

        const res = await API.post(`/auth/google`, { access_token })

        if (res.data.success) {
          this.user = res.data.user
          this.message = res.data.message

          localStorage.setItem('user', JSON.stringify(this.user))
          toast.success(this.message)

          if (this.userRole === 'administrator') {
            router.push('/admin/dashboard')
          } else {
            router.push('/dashboard')
          }
          return
        } else {
          this.error = res.data.message
          toast.error(this.error)
        }
      } catch (err) {
        this.error = err.response?.data?.message
        console.log(err)
      } finally {
        this.loading = false
      }
    },

    async forgotPassword(newUser) {
      this.loading = true
      this.error = null
      try {
        const res = await API.post(`/auth/forgot-password`, newUser)

        if (res.data.success) {
          this.loading = true
          this.message = res.data.message
          toast.success(this.message, { timeout: false })
        } else {
          this.loading = false
          this.error = res.data.message
          toast.error(this.error)
        }
      } catch (err) {
        this.loading = false
        this.error = err.response?.data?.message
        toast.error(this.error)
      }
    },

    async resetPassword(token, newUser) {
      this.loading = true
      this.error = null
      try {
        const res = await API.post(`/auth/reset-password/${token}`, newUser)

        if (res.data.success) {
          this.message = res.data.message
          toast.success(this.message)

          this.login(newUser)
        } else {
          this.error = res.data.message
          toast.error(this.error)
        }
      } catch (err) {
        this.error = err.response?.data?.message
        toast.error(this.error)
      } finally {
        this.loading = false
      }
    },

    async refreshToken() {
      try {
        await API2.post(`/auth/refresh-token`)
        return
      } catch (err) {
        this.error = err.response?.data?.message
        toast.error(this.error)
        throw err
      }
    },

    async verifyEmail(token) {
      this.loading = true
      this.error = null
      try {
        const res = await API.post(`/auth/verify-email/${token}`)

        if (res.data.success) {
          this.message = res.data.message
          this.user = res.data.user

          localStorage.setItem('user', JSON.stringify(this.user))
          toast.success(this.message)

          router.push('/dashboard')
          return
        } else {
          this.error = res.data.message
          toast.error(this.error)
        }
      } catch (err) {
        this.error = err.response?.data?.message
        toast.error(this.error)
      } finally {
        this.loading = false
      }
    },

    async changePassword(newUser) {
      this.loading = true
      this.error = null
      try {
        const res = await API.post(`/auth/change-password`, newUser)

        if (res.data.success) {
          this.message = res.data.message
          toast.success(this.message)

          if (this.userRole === 'administrator') {
            router.push('/admin/profile')
          } else {
            router.push('/profile')
          }
          return
        } else {
          this.error = res.data.message
          toast.error(this.error)
        }
      } catch (err) {
        this.error = err.response?.data?.message
        toast.error(this.error)
      } finally {
        this.loading = false
      }
    },

    async logout() {
      this.loading = true
      this.error = null
      try {
        const res = await API2.post(`/auth/logout`)

        if (res.data.success) {
          this.user = null
          this.message = res.data.message

          localStorage.removeItem('user')
          toast.success(this.message)

          location.assign('/login')
        } else {
          this.error = res.data.message
          toast.error(this.error)
        }
      } catch (err) {
        this.error = err.response?.data?.message
        toast.error(this.error)
      } finally {
        this.loading = false
      }
    },
  },
})
