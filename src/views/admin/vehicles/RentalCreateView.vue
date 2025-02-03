<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useVehicleStore } from '@/stores/vehicleStore'
import AppHeading from '@/components/AppHeading.vue'
import VehicleForm from '@/features/vehicles/VehicleForm.vue'

const route = useRoute()
const vehicleStore = useVehicleStore()

const vehicle = ref(null)
const loading = ref(false)

onMounted(async () => {
  vehicleStore.fetchVehicleById(route.params.id)
  vehicle.value = vehicleStore.vehicles[0]
})

const handleSubmit = async (formData) => {
  loading.value = true
  await vehicleStore.createVehicle(vehicle.value._id, formData)
  loading.value = vehicleStore.loading
}
</script>

<template>
  <main>
    <AppHeading title="Update Vehicle Details" />

    <div class="row">
      <div class="col-lg-6">
        <VehicleForm :loading="loading" @submitForm="handleSubmit" />
      </div>
    </div>
  </main>
</template>
