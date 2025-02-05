import { defineStore } from 'pinia'
import API from '@/libs/api'
import { useToast } from 'vue-toastification'
import router from '../router'

const toast = useToast()

export const useAdminStore = defineStore('admin', {
  state: () => ({
    users: [],
    payments: [],
    total: null,
    loading: false,
    message: null,
    error: null,
  }),

  actions: {
    async dashboard() {
      this.loading = true
      this.error = null
      try {
        const res = await API.get(`/admin/dashboard`)

        if (res.data.success) {
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

    async fetchUsers({ page, limit }) {
      this.loading = true
      this.error = null
      try {
        const res = await API.get(`/admin/users?page=${page}&limit=${limit}`)

        if (res.data.success) {
          this.users = res.data.data
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

    async fetchUsersByRole(role, { page, limit }) {
      this.loading = true
      this.error = null
      try {
        const res = await API.get(`/admin/users/role/${role}?page=${page}&limit=${limit}`)

        if (res.data.success) {
          this.users = res.data.data
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

    async searchUsersByName(name, { page, limit }) {
      this.loading = true
      this.error = null
      try {
        const res = await API.get(`/admin/users/search?name=${name}&page=${page}&limit=${limit}`)

        if (res.data.success) {
          this.users = res.data.data
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

    async fetchUserById(id) {
      this.loading = true
      this.error = null
      try {
        const res = await API.get(`/admin/users/${id}`)

        if (res.data.success) {
          this.users = [res.data.data]
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

    async createUser(newUser) {
      this.loading = true
      this.error = null
      try {
        const res = await API.post(`/admin/users`, newUser)

        if (res.data.success) {
          this.users.push(res.data.data)
          this.message = res.data.message
          toast.success(this.message)

          router.push(`/admin/users/${this.users.at(-1)._id}`)
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

    async updateUser(id, newUser) {
      this.loading = true
      this.error = null
      try {
        const res = await API.patch(`/admin/users/${id}`, newUser)

        if (res.data.success) {
          this.message = res.data.message
          toast.success(this.message)

          router.push(`/admin/users/${id}`)
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

    async updateUserRole(id, newUser) {
      this.loading = true
      this.error = null
      try {
        const res = await API.patch(`/admin/users/${id}/role`, newUser)

        if (res.data.success) {
          this.message = res.data.message
          toast.success(this.message)

          router.push(`/admin/users/${id}`)
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

    async deleteUser(id) {
      this.loading = true
      this.error = null
      try {
        const res = await API.delete(`/admin/users/${id}`)

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

    async fetchPayments({ page, limit }) {
      this.loading = true
      this.error = null
      try {
        const res = await API.get(`/admin/payments?page=${page}&limit=${limit}`)

        if (res.data.success) {
          this.payments = res.data.data
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

    async fetchPaymentsByUser(id, { page, limit }) {
      this.loading = true
      this.error = null
      try {
        const res = await API.get(`/admin/payments/user/${id}?page=${page}&limit=${limit}`)

        if (res.data.success) {
          this.payments = res.data.data
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

    async searchPaymentByReference(reference, { page, limit }) {
      this.loading = true
      this.error = null
      try {
        const res = await API.get(
          `/admin/payments/search?reference=${reference}&page=${page}&limit=${limit}`,
        )

        if (res.data.success) {
          this.payments = res.data.data
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

    async fetchPaymentById(id) {
      this.loading = true
      this.error = null
      try {
        const res = await API.get(`/admin/payments/${id}`)

        if (res.data.success) {
          this.payments = [res.data.data]
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

    async updatePaymentStatus(id, newPayment) {
      this.loading = true
      this.error = null
      try {
        const res = await API.patch(`/admin/payments/${id}/status`, newPayment)

        if (res.data.success) {
          this.message = res.data.message
          toast.success(this.message)

          router.push(`/admin/payments`)
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

    async deletePayment(id) {
      this.loading = true
      this.error = null
      try {
        const res = await API.delete(`/admin/payments/${id}`)

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
  },
})
