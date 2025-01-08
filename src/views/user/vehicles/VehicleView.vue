<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCustomerStore } from '@/stores/customerStore'
import AppHeading from '@/components/AppHeading.vue'
import AppModal from '@/components/AppModal.vue'
import VehicleCard from '@/features/vehicles/VehicleCard.vue'

const customerStore = useCustomerStore()
const route = useRoute()

const vehicle = ref(null)

onMounted(async () => {
  const vehicleId = route.params.id

  await customerStore.fetchVehicleById(vehicleId)
  vehicle.value = customerStore.vehicles[0]
})

const handleDelete = async () => {
  await customerStore.deleteVehicle(vehicle.value._id)
}
</script>

<template>
  <main>
    <AppHeading title="Vehicle Details" />

    <div v-if="vehicle" class="row mb-4 mx-lg-2">
      <div class="col-md-6 mb-4">
        <VehicleCard :vehicle="vehicle" showMenu="true" />
      </div>
    </div>

    <AppModal
      title="Delete Booking"
      message="Are you sure you want to delete this booking?"
      @confirmAction="handleDelete"
    />
  </main>
</template>
