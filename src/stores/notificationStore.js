import { defineStore } from 'pinia'
import API from '@/libs/api'
import { useToast } from 'vue-toastification'

const toast = useToast()

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: [],
    total: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchNotifications({ page, limit }) {
      this.loading = true
      this.error = null
      try {
        const res = await API.get(`/notifications?page=${page}&limit=${limit}`)

        if (res.data.success) {
          this.notifications = res.data.data
          this.total = res.data.total
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

    async updateNotificationStatus(id) {
      this.loading = true
      this.error = null
      try {
        const res = await API.patch(`/notifications/${id}`)

        if (!res.data.success) {
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
