<script setup>
import PageHeading from '@/components/PageHeading.vue'
import BookServiceForm from '@/features/bookings/BookServiceForm.vue'
import { useCustomerStore } from '@/stores/customerStore'
import { useServiceStore } from '@/stores/serviceStore'
import { computed, onMounted, ref } from 'vue'

const serviceStore = useServiceStore()
const customerStore = useCustomerStore()

const services = ref(null)
const vehicles = ref(null)

onMounted(async () => {
  await serviceStore.fetchServices()
  services.value = serviceStore.services

  const query = { page: null, limit: null }
  await customerStore.fetchVehicles(query)
  vehicles.value = customerStore.vehicles
})

const filteredSubservices = computed(() =>
  services.value?.flatMap((service) =>
    service.subservices.filter((subservice) => subservice.availability),
  ),
)

const handleSubmit = async (formData) => {
  await customerStore.createBooking(formData)
}
</script>

<template>
  <main>
    <PageHeading title="Book Service" />

    <div v-if="filteredSubservices && vehicles">
      <BookServiceForm
        :subservices="filteredSubservices"
        :vehicles="vehicles"
        @submitForm="handleSubmit"
      />
    </div>
  </main>
</template>
