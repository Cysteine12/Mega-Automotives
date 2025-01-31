<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCustomerStore } from '@/stores/customerStore'
import AppHeading from '@/components/AppHeading.vue'
import AppSpinner from '@/components/AppSpinner.vue'
import VehicleForm from '@/features/vehicles/VehicleForm.vue'

const route = useRoute()
const customerStore = useCustomerStore()

const vehicle = ref(null)
const loading = ref(true)

onMounted(async () => {
  const vehicleId = route.params.id

  await customerStore.fetchVehicleById(vehicleId)
  vehicle.value = customerStore.vehicles[0]
  loading.value = customerStore.loading
})

const handleSubmit = async (formData) => {
  await customerStore.updateVehicle(vehicle.value._id, formData)
}
</script>

<template>
  <main>
    <AppHeading title="Edit Vehicle" />

    <div v-if="!loading" class="row">
      <div class="col-lg-6 mb-4">
        <VehicleForm :vehicle="vehicle" @submitForm="handleSubmit" />
      </div>
    </div>

    <AppSpinner v-else />
  </main>
</template>
