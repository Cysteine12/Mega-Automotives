import { defineStore } from 'pinia'
import API from '@/libs/api'
import { useToast } from 'vue-toastification'

const toast = useToast()

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: {
      items: [],
    },
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
          if (res.data.data) this.cart = res.data.data
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

    async addItem(item) {
      this.loading = true
      this.error = null
      try {
        const res = await API.post(`/carts/add`, { inventory: item._id })

        if (res.data.success) {
          this.cart.items.push({ inventory: item, quantity: 1 })
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
          this.cart.items.map((item) => {
            if (item._id === id) {
              item.quantity = newItem.quantity
            }
            return item
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

    async removeItem(id) {
      this.loading = true
      this.error = null
      try {
        const res = await API.patch(`/carts/remove/${id}`)

        if (res.data.success) {
          this.cart.items = this.cart.items.filter((item) => {
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

    async clearCart() {
      this.loading = true
      this.error = null
      try {
        const res = await API.delete(`/carts/clear`)

        if (res.data.success) {
          this.cart.items = []
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
