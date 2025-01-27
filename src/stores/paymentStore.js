import { defineStore } from 'pinia'
import API from '@/libs/api'
import { useToast } from 'vue-toastification'
import router from '../router'

const toast = useToast()

export const usePaymentStore = defineStore('payment', {
  state: () => ({
    payments: [],
    total: null,
    loading: false,
    message: null,
    error: null,
  }),

  actions: {
    async fetchPayments({ page, limit }) {
      this.loading = true
      this.error = null
      try {
        const res = await API.get(`/payments?page=${page}&limit=${limit}`)

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

    async initializePayment(newPayment) {
      this.loading = true
      this.error = null
      try {
        const res = await API.post(`/payments/initialize-payment`, newPayment)

        if (res.data.success) {
          window.location.assign(res.data.data)
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

    async verifyPayment(reference) {
      this.loading = true
      this.error = null
      try {
        const res = await API.get(`/payments/verify-payment/${reference}`)

        if (res.data.success) {
          this.message = res.data.message
          this.payments = [res.data.data]
          toast.success(this.message)

          router.push(`/payments`)
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
