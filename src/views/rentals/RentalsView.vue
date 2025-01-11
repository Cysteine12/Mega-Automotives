<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useRentalStore } from '@/stores/rentalStore'
import AppHeading from '@/components/AppHeading.vue'
import RentalCard from '@/features/rentals/RentalCard.vue'

const route = useRoute()
const rentalStore = useRentalStore()

const rentals = ref(null)
const pagination = ref({
  currentPage: Number(route.query.page) || 1,
  perPage: 4,
  total: null,
})
const error = ref(null)

const getRentals = async () => {
  const query = { page: pagination.value.currentPage, limit: pagination.value.perPage }
  await rentalStore.fetchRentals(query)

  rentals.value = rentalStore.rentals
  pagination.value.total = rentalStore.total
  error.value = rentalStore.error
}

onMounted(() => getRentals())

watch(
  () => route.query.page,
  (currentPage) => {
    pagination.value.currentPage = Number(currentPage)
    getRentals()
    window.scrollTo(0, 0)
  },
)
</script>

<template>
  <main>
    <AppHeading title="Our Rental Vehicles" />

    <div class="row">
      <div v-if="rentals" class="col-md-6">
        <RentalCard v-for="rental in rentals" :key="rental._id" :rental="rental" />
      </div>
    </div>
  </main>
</template>
