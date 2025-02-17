import { defineStore } from 'pinia'
import API from '@/libs/api'
import { useToast } from 'vue-toastification'
import router from '../router'

const toast = useToast()

export const useBookingStore = defineStore('booking', {
  state: () => ({
    bookings: [],
    total: null,
    loading: false,
    message: null,
    error: null,
  }),

  actions: {
    async fetchBookings({ page, limit }) {
      this.loading = true
      this.error = null
      try {
        const res = await API.get(`/bookings?page=${page}&limit=${limit}`)

        if (res.data.success) {
          this.bookings = res.data.data
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

    async fetchBookingsByStatus(status, { page, limit }) {
      this.loading = true
      this.error = null
      try {
        const res = await API.get(`/bookings/status/${status}?page=${page}&limit=${limit}`)

        if (res.data.success) {
          this.bookings = res.data.data
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

    async fetchBookingsByOwnerId(id, { page, limit }) {
      this.loading = true
      this.error = null
      try {
        const res = await API.get(`/bookings/owner/${id}?page=${page}&limit=${limit}`)

        if (res.data.success) {
          this.bookings = res.data.data
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

    async searchBookingsByOwner(name, { page, limit }) {
      this.loading = true
      this.error = null
      try {
        const res = await API.get(`/bookings/search?name=${name}&page=${page}&limit=${limit}`)

        if (res.data.success) {
          this.bookings = res.data.data
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

    async fetchBookingById(id) {
      this.loading = true
      this.error = null
      try {
        const res = await API.get(`/bookings/${id}`)

        if (res.data.success) {
          this.bookings.push(res.data.data)
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

    async updateBookingStatus(id, newBooking) {
      this.loading = true
      this.error = null
      try {
        const res = await API.patch(`/bookings/${id}/status`, newBooking)

        if (res.data.success) {
          this.message = res.data.message
          toast.success(this.message)

          router.push(`/bookings/${id}`)
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

    async deleteBooking(id) {
      this.loading = true
      this.error = null
      try {
        const res = await API.delete(`/bookings/${id}`)

        if (res.data.success) {
          this.message = res.data.message
          toast.success(this.message)

          router.go(-1)
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
