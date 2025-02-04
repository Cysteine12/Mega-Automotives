<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useVehicleStore } from '@/stores/vehicleStore'
import AppButton from '@/components/AppButton.vue'
import AppHeading from '@/components/AppHeading.vue'
import AppModal from '@/components/AppModal.vue'
import AppPagination from '@/components/AppPagination.vue'
import AppSearchModal from '@/components/AppSearchModal.vue'
import AppSpinner from '@/components/AppSpinner.vue'

const vehicleStore = useVehicleStore()
const route = useRoute()
const router = useRouter()

const vehicles = ref(null)
const selectedVehicleData = ref(null)
const loading = ref(true)
const pagination = ref({
  currentPage: Number(route.query.page) || 1,
  perPage: 10,
  total: null,
})

const getVehicles = async () => {
  const query = { page: pagination.value.currentPage, limit: pagination.value.perPage }

  if (route.query.licenseNo) {
    await vehicleStore.searchVehiclesByLicenseNo(route.query.licenseNo, query)
  } else if (route.query.userId) {
    await vehicleStore.fetchVehiclesByOwnerId(route.query.userId, query)
  } else {
    await vehicleStore.fetchVehicles(query)
  }
  vehicles.value = vehicleStore.vehicles
  loading.value = vehicleStore.loading
  pagination.value.total = vehicleStore.total
}

onMounted(async () => getVehicles())

watch(
  () => router.currentRoute.value.fullPath,
  () => {
    loading.value = true
    pagination.value.currentPage = Number(route.query.page) || 1
    getVehicles()
    window.scrollTo(0, 0)
  },
)

const handleSearch = async (searchInput) =>
  router.push({
    name: router.currentRoute.value.name,
    query: { licenseNo: searchInput },
  })

const handleDelete = async () => {
  const { id } = selectedVehicleData.value
  await vehicleStore.deleteVehicle(id)
}
</script>

<template>
  <main>
    <AppHeading title="Vehicles List" />

    <AppSearchModal placeholder="Search with License Number..." @handleSubmit="handleSearch" />

    <div v-if="!loading" class="card shadow my-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">Vehicles Database</h6>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
            <thead>
              <tr>
                <th>Name</th>
                <th>License</th>
                <th>Owner</th>
                <th>Color</th>
                <th>Manage</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="vehicle in vehicles"
                :key="vehicle._id"
                class="text-capitalize text-nowrap"
              >
                <td>{{ vehicle.brand }} {{ vehicle.model }}</td>
                <td class="text-uppercase">{{ vehicle.licenseNo }}</td>
                <td>
                  <router-link :to="`/admin/users/${vehicle.owner._id}`">
                    {{ vehicle.owner.name.firstName }} {{ vehicle.owner.name.lastName }}
                  </router-link>
                </td>
                <td>{{ vehicle.color }}</td>
                <td>
                  <div class="d-flex">
                    <router-link :to="`/admin/vehicles/${vehicle._id}`" class="mx-1">
                      <AppButton color="bg-success text-white btn-sm">
                        <i class="fas fa-eye"></i>
                      </AppButton>
                    </router-link>

                    <router-link :to="`/admin/vehicles/${vehicle._id}/edit`" class="mx-1">
                      <AppButton color="bg-warning text-white btn-sm">
                        <i class="fas fa-edit"></i>
                      </AppButton>
                    </router-link>

                    <AppButton
                      @click="() => (selectedVehicleData = { id: vehicle._id })"
                      color="bg-danger text-white btn-sm"
                      class="mx-1"
                      data-toggle="modal"
                      data-target="#promptModal"
                    >
                      <i class="fas fa-trash-alt"></i>
                    </AppButton>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <AppPagination :pagination="pagination" />

      <AppModal
        title="Delete Vehicle"
        message="Are you sure you want to delete this vehicle?"
        @confirm-action="handleDelete"
      />
    </div>

    <AppSpinner v-else />
  </main>
</template>

<style scoped>
select {
  min-width: max-content;
}
</style>
