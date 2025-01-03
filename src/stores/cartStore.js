import { defineStore } from 'pinia'
import API from '@/libs/api'
import { useToast } from 'vue-toastification'

const toast = useToast()

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: {},
    loading: false,
    error: null,
  }),

  actions: {
    async fetchCart() {
      this.loading = true
      this.error = null
      try {
        const res = await API.get(`/carts`)

        if (res.data.success) {
          this.cart = res.data.data
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

    async addItem(newItem) {
      this.loading = true
      this.error = null
      try {
        const res = await API.post(`/carts/add`, newItem)

        if (res.data.success) {
          this.cart.items.push(newItem)
          toast.success(res.data.message)
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

    async editItem({ id, newItem }) {
      this.loading = true
      this.error = null
      try {
        const res = await API.patch(`/carts/edit/${id}`, newItem)

        if (res.data.success) {
          this.cart.items.forEach((item) => {
            if (item._id === id) {
              item.quantity = newItem.quantity
            }
          })
          toast.success(res.data.message)
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

    async removeItem({ id }) {
      this.loading = true
      this.error = null
      try {
        const res = await API.patch(`/carts/remove/${id}`)

        if (res.data.success) {
          this.cart = this.cart.items.filter((item) => {
            return item._id !== id
          })
          toast.success(res.data.message)
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

    async clearCart({ id }) {
      this.loading = true
      this.error = null
      try {
        const res = await API.delete(`/carts/clear`)

        if (res.data.success) {
          this.cart = this.cart.items.filter((item) => {
            return item._id !== id
          })
          toast.success(res.data.message)
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
