<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCustomerStore } from '@/stores/customerStore'
import AppHeading from '@/components/AppHeading.vue'
import AppPagination from '@/components/AppPagination.vue'
import { formatDate } from '@/utils/formatters'

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
      <div class="col-xl-3 col-md-6 mb-4">
        <div v-for="vehicle in vehicles" :key="vehicle._id" class="card my-4">
          <div class="card-header text-primary font-weight-bold text-capitalize">
            {{ vehicle.brand }} {{ vehicle.model }}
          </div>
          <div class="card-body">
            <i :class="`fas fa-${vehicle.category}`"></i>
            {{ vehicle.category }}
            {{ vehicle.licenseNo }}
            {{ vehicle.color }}
            {{ formatDate(vehicle.createdAt) }}
            <router-link :to="`/vehicles/${vehicle._id}`" class="btn btn-primary"
              >View vehicle</router-link
            >
          </div>
        </div>
      </div>
    </div>

    <AppPagination v-if="vehicles" :pagination="pagination" />
  </main>
</template>
