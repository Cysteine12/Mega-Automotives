import { defineStore } from 'pinia'
import API from '@/libs/api'
import { useToast } from 'vue-toastification'
import router from '../router'

const toast = useToast()

export const useRentalStore = defineStore('rental', {
  state: () => ({
    rentals: [],
    total: null,
    loading: false,
    message: null,
    error: null,
  }),

  actions: {
    async fetchRentals({ page, limit }) {
      this.loading = true
      this.error = null
      try {
        const res = await API.get(`/rentals?page=${page}&limit=${limit}`)

        if (res.data.success) {
          this.rentals = res.data.data
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

    async searchRentalsByNameOrLicense(query) {
      this.loading = true
      this.error = null
      try {
        const res = await API.get(`/rentals/search?query=${query}`)

        if (res.data.success) {
          this.rentals = res.data.data
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

    async fetchRentalById(id) {
      this.loading = true
      this.error = null
      try {
        const res = await API.get(`/rentals/${id}`)

        if (res.data.success) {
          this.rentals = [res.data.data]
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

    async createRental(newRental) {
      this.loading = true
      this.error = null
      try {
        const res = await API.post(`/rentals`, newRental)

        if (res.data.success) {
          this.message = res.data.message
          this.rentals.push(res.data.data)
          toast.success(this.message)

          router.push(`/rentals/${this.rentals.at(-1)._id}`)
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

    async updateRental(id, newRental) {
      this.loading = true
      this.error = null
      try {
        const res = await API.patch(`/rentals/${id}`, newRental)

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

    async updateRentalStatus(id, newRental) {
      this.loading = true
      this.error = null
      try {
        const res = await API.patch(`/rentals/${id}/status`, newRental)

        if (res.data.success) {
          this.message = res.data.message
          toast.success(this.message)
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

    async deleteRental(id) {
      this.loading = true
      this.error = null
      try {
        const res = await API.delete(`/rentals/${id}`)

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
