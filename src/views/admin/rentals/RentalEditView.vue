<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useRentalStore } from '@/stores/rentalStore'
import AppHeading from '@/components/AppHeading.vue'
import RentalForm from '@/features/rentals/RentalForm.vue'
import handleFileChange from '@/composables/handleFileChange'

const route = useRoute()
const rentalStore = useRentalStore()

const rental = ref(null)
const formData = ref(null)
const loading = ref(false)

onMounted(async () => {
  await rentalStore.fetchRentalById(route.params.id)
  rental.value = rentalStore.rentals[0]
  formData.value = rentalStore.rentals[0]
})

const handleSubmit = async () => {
  loading.value = true

  if (formData.value.thumbnail.type) {
    formData.value.thumbnail = await handleFileChange(
      'app/rentals',
      formData.value.thumbnail,
      rental.value.thumbnail,
    )
  }

  await rentalStore.createRental(formData.value)
  loading.value = rentalStore.loading
}
</script>

<template>
  <main>
    <AppHeading title="Edit Rental" />

    <div class="row">
      <div class="col-lg-6">
        <div class="card shadow mb-4">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Vehicle Details</h6>
          </div>
          <div v-if="rental" class="card-body">
            <form @submit.prevent="handleSubmit">
              <RentalForm
                :rental="rental"
                @handleFormChangeEmit="(formData) => (formData = formData)"
              />

              <button type="submit" class="btn btn-primary btn-block" :disabled="loading">
                Add Vehicle
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
