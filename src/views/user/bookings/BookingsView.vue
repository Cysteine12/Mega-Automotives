<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCustomerStore } from '@/stores/customerStore'
import PageHeading from '@/components/PageHeading.vue'
import BookingCard from '@/features/bookings/BookingCard.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'

const route = useRoute()
const customerStore = useCustomerStore()

const bookings = ref(null)
const pagination = ref({
  currentPage: Number(route.query.page) || 1,
  perPage: 4,
  total: null,
})
const error = ref(null)

const getBookings = async () => {
  const query = { page: pagination.value.currentPage, limit: 4 }
  await customerStore.fetchBookings(query)

  bookings.value = customerStore.bookings
  pagination.value.total = customerStore.total
  error.value = customerStore.error
}

onMounted(async () => getBookings())

watch(
  () => route.query.page,
  (currentPage) => {
    pagination.value.currentPage = Number(currentPage)
    getBookings()
    window.scrollTo(0, 0)
  },
)
</script>

<template>
  <main>
    <PageHeading title="My Bookings" />

    <div v-if="bookings" class="row mx-lg-auto">
      <div
        v-for="booking in bookings"
        :key="booking._id"
        class="d-flex align-items-stretch col-xl-6 col-lg-6"
      >
        <BookingCard :booking="booking" />
      </div>
    </div>

    <div v-else class="row m-auto">
      <div class="card p-3 d-inline">
        <i class="fas fa-info-circle"></i>
        No bookings found
      </div>
      <div v-if="error">{{ error }}</div>
    </div>

    <PaginationComponent v-if="bookings" :pagination="pagination" />
  </main>
</template>
