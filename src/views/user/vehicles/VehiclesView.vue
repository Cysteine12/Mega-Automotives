<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCustomerStore } from '@/stores/customerStore'
import AppHeading from '@/components/AppHeading.vue'
import AppPagination from '@/components/AppPagination.vue'
import VehicleCard from '@/features/vehicles/VehicleCard.vue'

const route = useRoute()
const customerStore = useCustomerStore()

const vehicles = ref(null)
const pagination = ref({
  currentPage: Number(route.query.page) || 1,
  perPage: 4,
  total: null,
})
const error = ref(null)

const getVehicles = async () => {
  const query = { page: pagination.value.currentPage, limit: pagination.value.perPage }
  await customerStore.fetchVehicles(query)

  vehicles.value = customerStore.vehicles
  pagination.value.total = customerStore.total
  error.value = customerStore.error
}

onMounted(async () => getVehicles())

watch(
  () => route.query.page,
  (currentPage) => {
    pagination.value.currentPage = Number(currentPage)
    getVehicles()
    window.scrollTo(0, 0)
  },
)
</script>

<template>
  <main>
    <AppHeading title="My Vehicles" />

    <div v-if="vehicles" class="row">
      <div class="col-md-6 mb-4">
        <VehicleCard
          v-for="vehicle in vehicles"
          :key="vehicle._id"
          :vehicle="vehicle"
          :showButton="true"
        />
      </div>
    </div>

    <AppPagination v-if="vehicles" :pagination="pagination" />
  </main>
</template>
