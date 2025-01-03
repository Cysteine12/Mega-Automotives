<script setup>
import ServiceCard from '@/features/services/ServiceCard.vue'

defineProps({
  filteredSubservices: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="row">
    <div v-for="subservice in filteredSubservices" :key="subservice._id" class="col-xl-4 col-lg-7">
      <ServiceCard :route="`/services/${subservice._id}`" :service="subservice" />
    </div>
  </div>
</template>
