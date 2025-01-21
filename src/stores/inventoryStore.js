import { defineStore } from 'pinia'
import API from '@/libs/api'
import { useToast } from 'vue-toastification'
import router from '../router'

const toast = useToast()

export const useInventoryStore = defineStore('inventory', {
  state: () => ({
    inventories: [],
    total: null,
    loading: false,
    message: null,
    error: null,
  }),

  actions: {
    async fetchInventories({ page, limit }) {
      this.loading = true
      this.error = null
      try {
        const res = await API.get(`/inventories?page=${page}&limit=${limit}`)

        if (res.data.success) {
          this.inventories = res.data.data
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

    async fetchInventoriesByCategory({ category, page, limit }) {
      this.loading = true
      this.error = null
      try {
        const res = await API.get(`/inventories/category/${category}?page=${page}&limit=${limit}`)

        if (res.data.success) {
          this.inventories = res.data.data
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

    async searchInventoriesByName({ name, page, limit }) {
      this.loading = true
      this.error = null
      try {
        const res = await API.get(`/inventories/search?name=${name}&page=${page}&limit=${limit}`)

        if (res.data.success) {
          this.inventories = res.data.data
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

    async fetchInventoryById(id) {
      this.loading = true
      this.error = null
      try {
        const res = await API.get(`/inventories/${id}`)

        if (res.data.success) {
          this.inventories = [res.data.data]
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

    async createInventory(newInventory) {
      this.loading = true
      this.error = null
      try {
        const res = await API.post(`/inventories`, newInventory)

        if (res.data.success) {
          this.message = res.data.message
          this.inventories.push(res.data.data)
          toast.success(this.message)

          router.go(`/inventories/${this.inventories.at(-1)}`)
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

    async updateInventory(id, newInventory) {
      this.loading = true
      this.error = null
      try {
        const res = await API.patch(`/inventories/${id}`, newInventory)

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

    async deleteInventory(id) {
      this.loading = true
      this.error = null
      try {
        const res = await API.delete(`/inventories/${id}`)

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
