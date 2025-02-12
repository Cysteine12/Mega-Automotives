<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useRentalStore } from '@/stores/rentalStore'
import AppHeading from '@/components/AppHeading.vue'
import VehicleForm from '@/features/rentals/VehicleForm.vue'

const route = useRoute()
const rentalStore = useRentalStore()

const rental = ref(null)
const loading = ref(false)

onMounted(async () => {
  rentalStore.fetchRentalById(route.params.id)
  rental.value = rentalStore.rentals[0]
})

const handleSubmit = async (formData) => {
  loading.value = true
  await rentalStore.createRental(rental.value._id, formData)
  loading.value = rentalStore.loading
}
</script>

<template>
  <main>
    <AppHeading title="Create Rental" />

    <div class="row">
      <div class="col-lg-6">
        <VehicleForm :loading="loading" @submitForm="handleSubmit"> </VehicleForm>
      </div>
    </div>
  </main>
</template>
