<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useRentalStore } from '@/stores/rentalStore'
import AppHeading from '@/components/AppHeading.vue'
import AppSpinner from '@/components/AppSpinner.vue'
import AppButton from '@/components/AppButton.vue'
import AppSearchModal from '@/components/AppSearchModal.vue'
import AppModal from '@/components/AppModal.vue'
import AppPagination from '@/components/AppPagination.vue'

const rentalStore = useRentalStore()
const route = useRoute()
const router = useRouter()

const rentals = ref(null)
const selectedRentalData = ref(null)
const loading = ref(true)
const pagination = ref({
  currentPage: Number(route.query.page) || 1,
  perPage: 10,
  total: null,
})

const getRentals = async () => {
  const query = { page: pagination.value.currentPage, limit: pagination.value.perPage }

  if (route.query.query) {
    await rentalStore.searchRentalsByNameOrLicense(route.query.query, query)
  } else {
    await rentalStore.fetchRentals(query)
  }
  rentals.value = rentalStore.rentals
  loading.value = rentalStore.loading
  pagination.value.total = rentalStore.total
}

onMounted(async () => getRentals())

watch(
  () => router.currentRoute.value.fullPath,
  () => {
    loading.value = true
    pagination.value.currentPage = Number(route.query.page) || 1
    getRentals()
    window.scrollTo(0, 0)
  },
)

const handleSearch = async (searchInput) =>
  router.push({
    name: router.currentRoute.value.name,
    query: { query: searchInput },
  })

const handleUpdate = async () => {
  const { id, status } = selectedRentalData.value
  await rentalStore.updateRentalStatus(id, { status })
}

const handleDelete = async () => {
  const { id } = selectedRentalData.value
  await rentalStore.deleteRental(id)
}
</script>

<template>
  <main>
    <AppHeading title="Rentals List" />

    <AppSearchModal placeholder="Search with License Number..." @handleSubmit="handleSearch" />

    <div v-if="!loading" class="card shadow my-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">Rentals Database</h6>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
            <thead>
              <tr>
                <th>Name</th>
                <th>License</th>
                <th>Color</th>
                <th>Status</th>
                <th>Manage</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="rental in rentals" :key="rental._id" class="text-capitalize text-nowrap">
                <td>{{ rental.vehicle.brand }} {{ rental.vehicle.model }}</td>
                <td class="text-uppercase">{{ rental.vehicle.licenseNo }}</td>
                <td>{{ rental.vehicle.color }}</td>
                <td>
                  <div class="d-flex">
                    <select
                      @change="
                        (e) => (selectedRentalData = { id: rental._id, status: e.target.value })
                      "
                      id="selectedValue"
                      class="form-control"
                    >
                      <option value="available" :selected="rental.status === 'available'">
                        Available
                      </option>
                      <option value="in-use" :selected="rental.status === 'in-use'">In-use</option>
                      <option value="unavailable" :selected="rental.status === 'unavailable'">
                        Unavailable
                      </option>
                    </select>
                    <AppButton
                      class="ml-1"
                      type="button"
                      color="bg-warning btn-sm"
                      data-toggle="modal"
                      data-target="#updateModal"
                    >
                      <i class="fas fa-arrow-right"></i>
                    </AppButton>
                  </div>
                </td>
                <td>
                  <div class="d-flex">
                    <router-link :to="`/admin/rentals/${rental._id}`" class="mx-1">
                      <AppButton color="bg-success text-white btn-sm">
                        <i class="fas fa-eye"></i>
                      </AppButton>
                    </router-link>

                    <router-link :to="`/admin/rentals/${rental._id}/edit`" class="mx-1">
                      <AppButton color="bg-warning text-white btn-sm">
                        <i class="fas fa-edit"></i>
                      </AppButton>
                    </router-link>

                    <AppButton
                      @click="() => (selectedRentalData = { id: rental._id })"
                      color="bg-danger text-white btn-sm"
                      class="mx-1"
                      data-toggle="modal"
                      data-target="#deleteModal"
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
        id="updateModal"
        title="Update Rental Status"
        message="Are you sure you want to update this rental?"
        @confirm-action="handleUpdate"
      />
      <AppModal
        id="deleteModal"
        title="Delete Rental"
        message="Are you sure you want to delete this rental?"
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
