import { defineStore } from 'pinia'
import API from '@/libs/api'
import { useToast } from 'vue-toastification'
import router from '../router'

const toast = useToast()

export const useVehicleStore = defineStore('vehicle', {
  state: () => ({
    vehicles: [],
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
        const res = await API.get(`/vehicles?page=${page}&limit=${limit}`)

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

    async fetchVehiclesByCategory(category, { page, limit }) {
      this.loading = true
      this.error = null
      try {
        const res = await API.get(`/vehicles/category/${category}?page=${page}&limit=${limit}`)

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

    async fetchVehiclesByOwnerId(id, { page, limit }) {
      this.loading = true
      this.error = null
      try {
        const res = await API.get(`/vehicles/owner/${id}?page=${page}&limit=${limit}`)

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

    async searchVehiclesByLicenseNo(licenseNo, { page, limit }) {
      this.loading = true
      this.error = null
      try {
        const res = await API.get(
          `/vehicles/search?licenseNo=${licenseNo}&page=${page}&limit=${limit}`,
        )

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
        const res = await API.get(`/vehicles/${id}`)

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

    async updateVehicle(id, newVehicle) {
      this.loading = true
      this.error = null
      try {
        const res = await API.patch(`/vehicles/${id}`, newVehicle)

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

    async deleteVehicle(id) {
      this.loading = true
      this.error = null
      try {
        const res = await API.delete(`/vehicles/${id}`)

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
