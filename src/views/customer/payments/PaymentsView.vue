<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { usePaymentStore } from '@/stores/paymentStore'
import AppHeading from '@/components/AppHeading.vue'
import AppPagination from '@/components/AppPagination.vue'
import AppSpinner from '@/components/AppSpinner.vue'
import PaymentCard from '@/features/payments/PaymentCard.vue'

const route = useRoute()
const paymentStore = usePaymentStore()

const payments = ref(null)
const loading = ref(true)
const pagination = ref({
  currentPage: Number(route.query.page) || 1,
  perPage: 4,
  total: null,
})

const getPayments = async () => {
  const query = { page: pagination.value.currentPage, limit: pagination.value.perPage }
  await paymentStore.fetchPayments(query)
  payments.value = paymentStore.payments
  loading.value = paymentStore.loading
  pagination.value.total = paymentStore.total
}

onMounted(() => getPayments())

watch(
  () => route.query.page,
  (currentPage) => {
    loading.value = true
    pagination.value.currentPage = Number(currentPage)
    getPayments()
    window.scrollTo(0, 0)
  },
)
</script>

<template>
  <main>
    <AppHeading title="My Payments" />

    <div v-if="!loading">
      <div v-if="payments.length > 0">
        <div v-for="payment in payments" :key="payment._id" class="my-2">
          <PaymentCard :payment="payment" />
        </div>
      </div>
      <div v-else class="card w-100 p-3">No payments made yet</div>

      <AppPagination :pagination="pagination" />
    </div>

    <AppSpinner v-else />
  </main>
</template>

<style scoped>
.card {
  max-width: 500px;
}
</style>
