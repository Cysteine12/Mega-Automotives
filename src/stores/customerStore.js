import { defineStore } from 'pinia'
import API from '@/libs/api'
import { useToast } from 'vue-toastification'
import router from '../router'

const toast = useToast()

export const useCustomerStore = defineStore('customer', {
  state: () => ({
    vehicles: [],
    bookings: [],
    total: null,
    loading: false,
    message: null,
    error: null,
  }),

  actions: {
    async fetchVehicles({ page, limit }) {
      this.loading = true
      this.error = null
      try {
        const res = await API.get(`/customer/vehicles?page=${page}&limit=${limit}`)

        if (res.data.success) {
          this.vehicles = res.data.data
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

    async fetchVehicleById(id) {
      this.loading = true
      this.error = null
      try {
        const res = await API.get(`/customer/vehicles/${id}`)

        if (res.data.success) {
          this.vehicles.push(res.data.data)
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

    async createVehicle(newVehicle) {
      this.loading = true
      this.error = null
      try {
        const res = await API.post(`/customer/vehicles`, newVehicle)

        if (res.data.success) {
          this.vehicles.push(res.data.data)
          this.message = res.data.message
          toast.success(this.message)

          router.push(`/vehicles/${this.vehicles[0]._id}`)
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

    async updateVehicle(id, newVehicle) {
      this.loading = true
      this.error = null
      try {
        const res = await API.patch(`/customer/vehicles/${id}`, newVehicle)

        if (res.data.success) {
          this.message = res.data.message
          toast.success(this.message)

          router.push(`/vehicles/${id}`)
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

    async deleteVehicle(id) {
      this.loading = true
      this.error = null
      try {
        const res = await API.delete(`/customer/vehicles/${id}`)

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

    async fetchBookings({ page, limit }) {
      this.loading = true
      this.error = null
      try {
        const res = await API.get(`/customer/bookings?page=${page}&limit=${limit}`)

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
        const res = await API.get(`/customer/bookings/${id}`)

        if (res.data.success) {
          this.bookings = [res.data.data]
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

    async createBooking(newBooking) {
      this.loading = true
      this.error = null
      try {
        const res = await API.post(`/customer/bookings`, newBooking)

        if (res.data.success) {
          this.bookings.push(res.data.data)
          this.message = res.data.message
          toast.success(this.message)

          router.push(`/bookings/${this.bookings[0]._id}`)
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

    async updateBooking(id, newBooking) {
      this.loading = true
      this.error = null
      try {
        const res = await API.patch(`/customer/bookings/${id}`, newBooking)

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
        const res = await API.delete(`/customer/bookings/${id}`)

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
