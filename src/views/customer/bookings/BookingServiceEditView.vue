<script setup>
import { computed, onMounted, ref } from 'vue'
import { useCustomerStore } from '@/stores/customerStore'
import { useRoute } from 'vue-router'
import { useServiceStore } from '@/stores/serviceStore'
import AppHeading from '@/components/AppHeading.vue'
import AppSpinner from '@/components/AppSpinner.vue'
import BookServiceForm from '@/features/bookings/BookServiceForm.vue'

const route = useRoute()
const customerStore = useCustomerStore()
const serviceStore = useServiceStore()

const booking = ref(null)
const vehicles = ref(null)
const services = ref(null)
const loading = ref(null)

onMounted(async () => {
  const bookingId = route.params.id

  await customerStore.fetchBookingById(bookingId)
  booking.value = customerStore.bookings[0]

  await serviceStore.fetchServices()
  services.value = serviceStore.services

  const query = { page: null, limit: null }
  await customerStore.fetchVehicles(query)
  vehicles.value = customerStore.vehicles
  loading.value = customerStore.loading && serviceStore.loading
})

const filteredSubservices = computed(() =>
  services.value?.flatMap((service) =>
    service.subservices.filter((subservice) => subservice.availability),
  ),
)

const handleSubmit = async (formData) => {
  await customerStore.updateBooking(booking.value._id, formData)
}
</script>

<template>
  <main>
    <AppHeading title="Edit Booking" />

    <div v-if="!loading && vehicles" class="row">
      <div class="col-lg-6 mb-4">
        <BookServiceForm
          :subservices="filteredSubservices"
          :vehicles="vehicles"
          :booking="booking"
          @submitForm="handleSubmit"
        />
      </div>
    </div>

    <AppSpinner v-else />
  </main>
</template>
