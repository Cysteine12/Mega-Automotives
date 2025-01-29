<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useRentalStore } from '@/stores/rentalStore'
import AppHeading from '@/components/AppHeading.vue'
import RentalCard from '@/features/rentals/RentalCard.vue'
import AppPagination from '@/components/AppPagination.vue'
import AppSearchModal from '@/components/AppSearchModal.vue'
import AppSpinner from '@/components/AppSpinner.vue'

const route = useRoute()
const rentalStore = useRentalStore()

const rentals = ref(null)
const loading = ref(true)
const pagination = ref({
  currentPage: Number(route.query.page) || 1,
  perPage: 4,
  total: null,
})

const getRentals = async () => {
  const query = { page: pagination.value.currentPage, limit: pagination.value.perPage }
  await rentalStore.fetchRentals(query)

  rentals.value = rentalStore.rentals
  loading.value = rentalStore.loading
  pagination.value.total = rentalStore.total
}

onMounted(() => getRentals())

watch(
  () => route.query.page,
  (currentPage) => {
    loading.value = true
    pagination.value.currentPage = Number(currentPage)
    getRentals()
    window.scrollTo(0, 0)
  },
)

const handleSubmit = async (searchInput) => {
  await rentalStore.searchRentalsByNameOrLicense(searchInput)
  rentals.value = rentalStore.rentals
}
</script>

<template>
  <main>
    <AppHeading title="Our Rental Vehicles" />

    <AppSearchModal placeholder="Search for a vehicle..." @handleSubmit="handleSubmit" />

    <div v-if="!loading">
      <div class="row">
        <div
          v-for="rental in rentals"
          :key="rental._id"
          class="d-flex align-items-stretch col-md-6"
        >
          <RentalCard :rental="rental" />
        </div>
      </div>

      <AppPagination :pagination="pagination" />
    </div>

    <AppSpinner v-else />
  </main>
</template>
