<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCustomerStore } from '@/stores/customerStore'
import AppHeading from '@/components/AppHeading.vue'
import AppPagination from '@/components/AppPagination.vue'
import AppSpinner from '@/components/AppSpinner.vue'
import VehicleCard from '@/features/vehicles/VehicleCard.vue'

const route = useRoute()
const customerStore = useCustomerStore()

const vehicles = ref(null)
const loading = ref(true)
const pagination = ref({
  currentPage: Number(route.query.page) || 1,
  perPage: 4,
  total: null,
})

const getVehicles = async () => {
  const query = { page: pagination.value.currentPage, limit: pagination.value.perPage }
  await customerStore.fetchVehicles(query)

  vehicles.value = customerStore.vehicles
  loading.value = customerStore.loading
  pagination.value.total = customerStore.total
}

onMounted(async () => getVehicles())

watch(
  () => route.query.page,
  (currentPage) => {
    loading.value = true
    pagination.value.currentPage = Number(currentPage)
    getVehicles()
    window.scrollTo(0, 0)
  },
)
</script>

<template>
  <main>
    <AppHeading title="My Vehicles" />

    <div v-if="!loading">
      <div class="row">
        <div class="col-md-6 mb-4">
          <VehicleCard
            v-for="vehicle in vehicles"
            :key="vehicle._id"
            :vehicle="vehicle"
            :showButton="true"
          />
        </div>
      </div>

      <AppPagination :pagination="pagination" />
    </div>

    <AppSpinner v-else />
  </main>
</template>
