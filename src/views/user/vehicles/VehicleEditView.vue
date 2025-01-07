<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCustomerStore } from '@/stores/customerStore'
import AppHeading from '@/components/AppHeading.vue'
import VehicleForm from '@/features/vehicles/VehicleForm.vue'

const route = useRoute()
const customerStore = useCustomerStore()

const vehicle = ref(null)

onMounted(async () => {
  const vehicleId = route.params.id

  await customerStore.fetchVehicleById(vehicleId)
  vehicle.value = customerStore.vehicles[0]
})

const handleSubmit = async (formData) => {
  await customerStore.updateVehicle(vehicle.value._id, formData)
}
</script>

<template>
  <main>
    <AppHeading title="Edit Vehicle" />

    <div v-if="vehicle" class="row">
      <div class="col-md-6 mb-4">
        <VehicleForm :vehicle="vehicle" @submitForm="handleSubmit" />
      </div>
    </div>
  </main>
</template>
