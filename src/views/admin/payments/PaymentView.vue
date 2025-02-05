<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAdminStore } from '@/stores/adminStore'
import AppHeading from '@/components/AppHeading.vue'
import AppSpinner from '@/components/AppSpinner.vue'
import PaymentCard from '@/features/payments/PaymentCard.vue'

const adminStore = useAdminStore()

const route = useRoute()

const payment = ref(null)
const loading = ref(true)

onMounted(async () => {
  await adminStore.fetchPaymentById(route.params.id)
  payment.value = adminStore.payments[0]
  loading.value = adminStore.loading
})
</script>

<template>
  <main>
    <AppHeading title="Payment Details" />

    <div v-if="!loading">
      <div class="row mb-4 mx-lg-2">
        <div class="col-md-6 mb-4">
          <PaymentCard :payment="payment" />
        </div>
      </div>
    </div>

    <AppSpinner v-else />
  </main>
</template>
