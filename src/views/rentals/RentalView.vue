<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useRentalStore } from '@/stores/rentalStore'
import { useCustomerStore } from '@/stores/customerStore'
import AppHeading from '@/components/AppHeading.vue'
import BookRentalForm from '@/features/bookings/BookRentalForm.vue'
import BookingUnavailableCard from '@/features/bookings/BookingUnavailableCard.vue'
import RentalCard from '@/features/rentals/RentalCard.vue'

const route = useRoute()
const rentalStore = useRentalStore()
const customerStore = useCustomerStore()

const rental = ref(null)

onMounted(async () => {
  const rentalId = route.params.id

  await rentalStore.fetchRentalById(rentalId)
  rental.value = rentalStore.rentals[0]
})

const handleSubmit = async (formData) => {
  formData.assignedTo.push(rental.value._id)
  formData.vehicles.push(rental.value.vehicle._id)

  await customerStore.createBooking(formData)
}
</script>

<template>
  <main>
    <AppHeading title="Rental Details" />

    <div v-if="rental" class="row">
      <div class="col-xl-6 mb-4">
        <RentalCard :rental="rental" />
      </div>

      <div class="col-xl-6 mb-4">
        <BookRentalForm v-if="rental.status !== 'unavailable'" @submitForm="handleSubmit" />

        <BookingUnavailableCard v-else />
      </div>
    </div>
  </main>
</template>
