<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useRentalStore } from '@/stores/rentalStore'
import { useCustomerStore } from '@/stores/customerStore'
import AppHeading from '@/components/AppHeading.vue'
import AppSpinner from '@/components/AppSpinner.vue'
import BookRentalForm from '@/features/bookings/BookRentalForm.vue'
import BookingUnavailableCard from '@/features/bookings/BookingUnavailableCard.vue'
import { hasPermission } from '@/utils/permissions'

const route = useRoute()
const rentalStore = useRentalStore()
const customerStore = useCustomerStore()

const rental = ref(null)
const loading = ref(true)

onMounted(async () => {
  const rentalId = route.params.id

  await rentalStore.fetchRentalById(rentalId)
  rental.value = rentalStore.rentals[0]
  loading.value = rentalStore.loading
})

const handleSubmit = async (formData) => {
  formData.assignedTo.push(rental.value._id)
  formData.vehicles.push(rental.value.vehicle._id)

  await customerStore.createBooking(formData)
}
</script>

<template>
  <main>
    <AppHeading title="Rental Details" />

    <div v-if="!loading" class="row">
      <div class="col-xl-6 mb-4">
        <div class="card">
          <div class="card-body">
            <div class="card-img-wrapper position-relative">
              <img :src="rental.thumbnail" alt="Rental vehicle image" class="card-img" />
              <div class="img-title bg-white text-primary font-weight-bold text-uppercase px-1">
                {{ rental.vehicle.brand }} {{ rental.vehicle.model }}
              </div>
            </div>
            <br />

            <div class="row">
              <div class="col-md-6 mb-2">
                <div class="row font-weight-bold small">
                  <div class="col-6 text-primary">Category</div>
                  <div class="col-6 text-capitalize">{{ rental.vehicle.category }}</div>
                </div>
                <div class="row font-weight-bold small">
                  <div class="col-6 text-primary">Color</div>
                  <div class="col-6 text-capitalize">{{ rental.vehicle.color }}</div>
                </div>
              </div>

              <div class="col-md-6 row font-weight-bold small">
                <div class="col-6 text-primary">Renting Price</div>
                <div class="col-6 text-capitalize">
                  <div class="mb-1 mr-2">${{ rental.price.perHour }}/hour</div>
                  <div class="mb-1 mr-2">${{ rental.price.perDay }}/day</div>
                  <div class="mb-1 mr-2">${{ rental.price.perWeek }}/week</div>
                </div>
              </div>
            </div>

            <p class="text-center my-2">
              <i class="small">
                <sup><i class="fas fa-quote-left fa-xs"></i></sup>
                <span class="mx-1">{{ rental.description }}</span>
                <sup><i class="fas fa-quote-right fa-xs"></i></sup>
              </i>
            </p>

            <div class="mt-4 text-center">
              <span
                class="badge rounded-pill border border-2"
                :class="`${rental.status === 'available' ? 'border-success text-success' : 'border-danger text-danger'}`"
              >
                <i
                  class="fas fa-circle"
                  :class="`${rental.status === 'available' ? 'text-success' : 'text-danger'}`"
                ></i>
                {{ rental.status === 'available' ? 'Available' : 'Unavailable' }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="hasPermission('customer')" class="col-xl-6 mb-4">
        <BookRentalForm v-if="rental.status !== 'unavailable'" @submitForm="handleSubmit" />

        <BookingUnavailableCard v-else />
      </div>
    </div>

    <AppSpinner v-else />
  </main>
</template>

<style scoped>
.img-title {
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 0 0 1px 1px;
  border-radius: 0 0 0 4px;
}

.badge {
  border: 3px solid;
}
</style>
