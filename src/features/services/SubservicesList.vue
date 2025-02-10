<script setup>
import ServiceCard from '@/features/services/ServiceCard.vue'
import { formatRoleRoute } from '@/utils/routeFormatter'

defineProps({
  filteredSubservices: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="row">
    <div v-for="subservice in filteredSubservices" :key="subservice._id" class="col-md-6 col-lg-4">
      <ServiceCard :route="formatRoleRoute(`/services/${subservice._id}`)" :service="subservice" />
    </div>
  </div>
</template>
