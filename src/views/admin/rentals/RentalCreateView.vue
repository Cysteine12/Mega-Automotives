<script setup>
import { ref } from 'vue'
import { useRentalStore } from '@/stores/rentalStore'
import AppHeading from '@/components/AppHeading.vue'
import VehicleForm from '@/features/vehicles/VehicleForm.vue'
import RentalForm from '@/features/rentals/RentalForm.vue'
import handleFileChange from '@/composables/handleFileChange'

const rentalStore = useRentalStore()

const loading = ref(false)
const rentalFormData = ref(null)

const handleSubmit = async (vehicleFormData) => {
  const formData = {
    ...vehicleFormData,
    ...rentalFormData.value,
  }
  loading.value = true

  formData.thumbnail = await handleFileChange('app/rentals', formData.thumbnail)

  await rentalStore.createRental(formData)
  loading.value = rentalStore.loading
}
</script>

<template>
  <main>
    <AppHeading title="Create Rental" />

    <div class="row">
      <div class="col-lg-6">
        <VehicleForm :loading="loading" @submitForm="handleSubmit">
          <RentalForm @handleFormChangeEmit="(formData) => (rentalFormData = formData)" />
        </VehicleForm>
      </div>
    </div>
  </main>
</template>
