<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePaymentStore } from '@/stores/paymentStore'
import AppSpinner from '@/components/AppSpinner.vue'

const route = useRoute()
const router = useRouter()
const paymentStore = usePaymentStore()

onMounted(async () => {
  const reference = route.query.reference
  if (reference) router.go(-1)
  await paymentStore.verifyPayment(reference)
})
</script>

<template>
  <main>
    <AppSpinner />
  </main>
</template>
