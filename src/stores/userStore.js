import { defineStore } from 'pinia'
import API from '@/libs/api'
import { useToast } from 'vue-toastification'
import router from '../router'
const toast = useToast()

export const useUserStore = defineStore('user', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    loading: false,
    message: null,
    error: null,
  }),

  actions: {
    async fetchProfile() {
      this.loading = true
      this.error = null
      try {
        const res = await API.get(`/users/profile`)

        if (res.data.success) {
          this.user = res.data.user
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

    async updateProfile(newUser) {
      this.loading = true
      this.error = null
      try {
        const res = await API.patch(`/users/profile`, newUser)

        if (res.data.success) {
          this.user = res.data.user
          this.message = res.data.message

          localStorage.setItem('user', JSON.stringify(this.user))
          toast.success(this.message)

          router.push('/profile')
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

    async deleteProfile() {
      this.loading = true
      this.error = null
      try {
        const res = await API.delete(`/users/profile`)

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
