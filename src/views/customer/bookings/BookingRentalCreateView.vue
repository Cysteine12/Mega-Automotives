<script setup>
import { onMounted, ref } from 'vue'
import { useRentalStore } from '@/stores/rentalStore'
import { useCustomerStore } from '@/stores/customerStore'
import AppHeading from '@/components/AppHeading.vue'
import AppSpinner from '@/components/AppSpinner.vue'
import BookRentalForm from '@/features/bookings/BookRentalForm.vue'

const rentalStore = useRentalStore()
const customerStore = useCustomerStore()

const rentals = ref(null)
const loading = ref(true)

onMounted(async () => {
  const query = { page: null, limit: null }
  await rentalStore.fetchRentals(query)
  rentals.value = rentalStore.rentals
  loading.value = rentalStore.loading
})

const handleSubmit = async (formData) => {
  await customerStore.createBooking(formData)
}
</script>

<template>
  <main>
    <AppHeading title="Rent Vehicles" />

    <div v-if="!loading" class="row">
      <div class="col-lg-6 mb-4">
        <BookRentalForm :rentals="rentals" @submitForm="handleSubmit" />
      </div>
    </div>

    <AppSpinner v-else />
  </main>
</template>
