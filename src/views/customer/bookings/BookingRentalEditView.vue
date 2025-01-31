<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCustomerStore } from '@/stores/customerStore'
import { useRentalStore } from '@/stores/rentalStore'
import AppHeading from '@/components/AppHeading.vue'
import AppSpinner from '@/components/AppSpinner.vue'
import BookRentalForm from '@/features/bookings/BookRentalForm.vue'

const route = useRoute()
const customerStore = useCustomerStore()
const rentalStore = useRentalStore()

const booking = ref(null)
const rentals = ref(null)
const loading = ref(true)

onMounted(async () => {
  const bookingId = route.params.id

  await customerStore.fetchBookingById(bookingId)
  booking.value = customerStore.bookings[0]

  const query = { page: null, limit: null }
  await rentalStore.fetchRentals(query)
  rentals.value = rentalStore.rentals
  loading.value = rentalStore.loading && customerStore.loading
})

const handleSubmit = async (formData) => {
  await customerStore.updateBooking(booking.value._id, formData)
}
</script>

<template>
  <main>
    <AppHeading title="Edit Booking" />

    <div v-if="!loading" class="row">
      <div class="col-lg-6 mb-4">
        <BookRentalForm :booking="booking" :rentals="rentals" @submitForm="handleSubmit" />
      </div>
    </div>

    <AppSpinner v-else />
  </main>
</template>
