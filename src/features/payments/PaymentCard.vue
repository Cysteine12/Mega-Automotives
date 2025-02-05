<script setup>
import { formatDateIntl } from '@/utils/dateFormatter'

defineProps({
  payment: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="card w-100 m-auto my-2 text-capitalize">
    <div class="card-header d-flex justify-content-between text-primary font-weight-bold">
      <span>{{ payment.assignedToModel }} Payment</span>
      <span>{{ formatDateIntl(payment.createdAt) }}</span>
    </div>
    <div class="card-body p-3">
      <div class="my-1">
        Payment for:
        <span v-for="(item, index) in payment.assignedTo.map((item) => item.name)" :key="index">
          {{ item }},
        </span>
      </div>
      <div class="my-1">Payment Reference: {{ payment.reference }}</div>
      <div class="my-1">Payment Method: {{ payment.method }}</div>
      <div class="my-1">Payment Amount: {{ payment.amount }}</div>
      <div class="my-1">Status: {{ payment.status }}</div>
    </div>
  </div>
</template>
