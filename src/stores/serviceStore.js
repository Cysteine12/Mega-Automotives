import { defineStore } from 'pinia'
import API from '@/libs/api'
import { useToast } from 'vue-toastification'
import router from '../router'

const toast = useToast()

export const useServiceStore = defineStore('service', {
  state: () => ({
    services: [],
    subservice: {},
    loading: false,
    message: null,
    error: null,
  }),

  actions: {
    async fetchServices() {
      this.loading = true
      this.error = null
      try {
        const res = await API.get(`/services`)

        if (res.data.success) {
          this.services = res.data.data
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

    async fetchSubservice(id) {
      this.loading = true
      this.error = null
      try {
        const res = await API.get(`/services/${id}/subservice`)

        if (res.data.success) {
          this.subservice = res.data.data
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

    async createService(newService) {
      this.loading = true
      this.error = null
      try {
        const res = await API.post(`/services`, newService)

        if (res.data.success) {
          this.message = res.data.message
          toast.success(this.message)

          router.push(`/services?category=${newService.category}`)
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

    async updateService(id, newService) {
      this.loading = true
      this.error = null
      try {
        const res = await API.patch(`/services/${id}`, newService)

        if (res.data.success) {
          this.message = res.data.message
          toast.success(this.message)

          router.push(`/services?category=${newService.category}`)
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

    async addSubservices(id, newSubservices) {
      this.loading = true
      this.error = null
      try {
        const res = await API.patch(`/services/${id}/add-subservices`, newSubservices)

        if (res.data.success) {
          this.message = res.data.message
          toast.success(this.message)

          router.push(`/services`)
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

    async editSubservice(id, newSubservice) {
      this.loading = true
      this.error = null
      try {
        const res = await API.patch(`/services/${id}/edit-subservice`, newSubservice)

        if (res.data.success) {
          this.message = res.data.message
          toast.success(this.message)

          router.push(`/services/${id}`)
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

    async removeSubservice(id, newSubservice) {
      this.loading = true
      this.error = null
      try {
        const res = await API.patch(`/services/${id}/remove-subservice`, newSubservice)

        if (res.data.success) {
          this.message = res.data.message
          toast.success(this.message)

          router.push(`/services/${id}`)
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

    async deleteService(id) {
      this.loading = true
      this.error = null
      try {
        const res = await API.delete(`/services/${id}`)

        if (res.data.success) {
          this.message = res.data.message
          toast.success(this.message)

          router.push(`/services`)
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
