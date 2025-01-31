<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCustomerStore } from '@/stores/customerStore'
import AppHeading from '@/components/AppHeading.vue'
import AppPagination from '@/components/AppPagination.vue'
import AppSpinner from '@/components/AppSpinner.vue'
import BookingServiceCard from '@/features/bookings/BookingServiceCard.vue'
import BookingRentalCard from '@/features/bookings/BookingRentalCard.vue'

const route = useRoute()
const customerStore = useCustomerStore()

const bookings = ref(null)
const loading = ref(true)
const pagination = ref({
  currentPage: Number(route.query.page) || 1,
  perPage: 4,
  total: null,
})

const getBookings = async () => {
  const query = { page: pagination.value.currentPage, limit: pagination.value.perPage }
  await customerStore.fetchBookings(query)

  bookings.value = customerStore.bookings
  loading.value = customerStore.loading
  pagination.value.total = customerStore.total
}

onMounted(() => getBookings())

watch(
  () => route.query.page,
  (currentPage) => {
    loading.value = true
    pagination.value.currentPage = Number(currentPage)
    getBookings()
    window.scrollTo(0, 0)
  },
)
</script>

<template>
  <main>
    <AppHeading title="My Bookings" />

    <div v-if="!loading">
      <div v-if="bookings.length > 0" class="row mx-lg-auto">
        <div
          v-for="booking in bookings"
          :key="booking._id"
          class="d-flex align-items-stretch col-xl-6 col-lg-6"
        >
          <BookingServiceCard
            v-if="booking.assignedToModel === 'Subservice'"
            :booking="booking"
            :showButton="true"
          />
          <BookingRentalCard
            v-else-if="booking.assignedToModel === 'Rental'"
            :booking="booking"
            :showButton="true"
          />
        </div>
      </div>

      <div v-else class="row m-auto">
        <div class="card p-3 d-inline">
          <i class="fas fa-info-circle"></i>
          No bookings found
        </div>
      </div>

      <AppPagination :pagination="pagination" />
    </div>

    <AppSpinner v-else />
  </main>
</template>
