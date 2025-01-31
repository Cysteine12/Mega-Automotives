<script setup>
import { computed, onMounted, ref } from 'vue'
import { useServiceStore } from '@/stores/serviceStore'
import { useCustomerStore } from '@/stores/customerStore'
import AppHeading from '@/components/AppHeading.vue'
import AppSpinner from '@/components/AppSpinner.vue'
import BookServiceForm from '@/features/bookings/BookServiceForm.vue'

const serviceStore = useServiceStore()
const customerStore = useCustomerStore()

const services = ref(null)
const vehicles = ref(null)
const loading = ref(true)

onMounted(async () => {
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
  await customerStore.createBooking(formData)
}
</script>

<template>
  <main>
    <AppHeading title="Book Service" />

    <div v-if="!loading" class="row">
      <div class="col-lg-6 mb-4">
        <BookServiceForm
          :subservices="filteredSubservices"
          :vehicles="vehicles"
          @submitForm="handleSubmit"
        />
      </div>
    </div>

    <AppSpinner v-else />
  </main>
</template>
