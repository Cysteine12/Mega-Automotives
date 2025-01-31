<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { usePaymentStore } from '@/stores/paymentStore'
import AppHeading from '@/components/AppHeading.vue'
import AppPagination from '@/components/AppPagination.vue'
import AppSpinner from '@/components/AppSpinner.vue'
import { formatDateIntl } from '@/utils/dateFormatter'

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
          <div class="card w-100 m-auto my-2 text-capitalize">
            <div class="card-header d-flex justify-content-between text-primary font-weight-bold">
              <span>{{ payment.assignedToModel }} Payment</span>
              <span>{{ formatDateIntl(payment.createdAt) }}</span>
            </div>
            <div class="card-body p-3">
              <div class="my-1">
                Payment for:
                <span
                  v-for="(item, index) in payment.assignedTo.map((item) => item.name)"
                  :key="index"
                >
                  {{ item }},
                </span>
              </div>
              <div class="my-1">Payment Reference: {{ payment.reference }}</div>
              <div class="my-1">Payment Method: {{ payment.method }}</div>
              <div class="my-1">Payment Amount: {{ payment.amount }}</div>
              <div class="my-1">Status: {{ payment.status }}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="card w-100 p-3">
        No Item in cart yet
        <br /><br />
        <div class="d-flex">
          Go to <router-link to="/inventories" class="ml-1"> Inventory</router-link>
        </div>
      </div>

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
