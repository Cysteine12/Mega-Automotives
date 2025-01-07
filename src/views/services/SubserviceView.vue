<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useServiceStore } from '@/stores/serviceStore'
import { useCustomerStore } from '@/stores/customerStore'
import AppHeading from '@/components/AppHeading.vue'
import SubserviceComponent from '@/features/services/SubserviceComponent.vue'
import BookServiceForm from '@/features/bookings/BookServiceForm.vue'
import BookingUnavailableCard from '@/features/bookings/BookingUnavailableCard.vue'

const route = useRoute()
const serviceStore = useServiceStore()
const customerStore = useCustomerStore()

const subservice = ref(null)
const vehicles = ref(null)

onMounted(async () => {
  const subserviceId = route.params.subservice

  await serviceStore.fetchSubservice(subserviceId)
  subservice.value = serviceStore.subservice

  const query = { page: 1, limit: 10 }
  await customerStore.fetchVehicles(query)
  vehicles.value = customerStore.vehicles
})

const handleSubmit = async (formData) => {
  formData.assignedTo.push(subservice.value._id)

  await customerStore.createBooking(formData)
}
</script>

<template>
  <main v-if="subservice">
    <AppHeading :title="subservice.name" />

    <!-- Content Row -->
    <div class="row">
      <div class="col-xl-6 mb-4">
        <SubserviceComponent :subservice="subservice" />
      </div>

      <div v-if="vehicles" class="col-xl-6 mb-4">
        <BookServiceForm
          v-if="subservice.availability"
          :vehicles="vehicles"
          @submitForm="handleSubmit"
        />

        <BookingUnavailableCard v-else />
      </div>
    </div>
  </main>
</template>
