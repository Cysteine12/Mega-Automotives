<script setup>
import { useCustomerStore } from '@/stores/customerStore'
import AppHeading from '@/components/AppHeading.vue'
import VehicleForm from '@/features/vehicles/VehicleForm.vue'

const customerStore = useCustomerStore()

const handleSubmit = async (formData) => {
  await customerStore.createVehicle(formData)
}
</script>

<template>
  <main>
    <AppHeading title="Add New Vehicle" />

    <div class="row">
      <div class="col-md-6 mb-4">
        <VehicleForm @submitForm="handleSubmit" />
      </div>
    </div>
  </main>
</template>
