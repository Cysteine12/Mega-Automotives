<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCustomerStore } from '@/stores/customerStore'
import AppHeading from '@/components/AppHeading.vue'
import AppModal from '@/components/AppModal.vue'
import AppSpinner from '@/components/AppSpinner.vue'
import BookingServiceCard from '@/features/bookings/BookingServiceCard.vue'
import BookingRentalCard from '@/features/bookings/BookingRentalCard.vue'

const customerStore = useCustomerStore()
const route = useRoute()

const booking = ref(null)
const loading = ref(true)

onMounted(async () => {
  const bookingId = route.params.id

  await customerStore.fetchBookingById(bookingId)
  booking.value = customerStore.bookings[0]
  loading.value = customerStore.loading
})

const handleDelete = async () => {
  await customerStore.deleteBooking(booking.value._id)
}
</script>

<template>
  <main>
    <AppHeading title="Booking Details" />

    <div v-if="!loading" class="row">
      <div class="col-lg-6 mb-4">
        <BookingServiceCard
          v-if="booking && booking.assignedToModel === 'Subservice'"
          :booking="booking"
          :showMenu="true"
        >
          <template #content>
            <div class="small">
              <div class="my-2">
                <i>{{ booking.description }}</i>
              </div>
              <div v-if="booking.message" class="my-2">
                Message: <i>{{ booking.message }}</i>
              </div>

              <div class="row">
                <div class="col-6 border border-gray rounded-left">
                  <span class="text-primary font-weight-bold">
                    <i class="fas fa-arrow-down"></i> DROP OFF
                  </span>
                  <br />
                  <span><i class="fas fa-clock"></i> {{ booking.schedule.dropOff.date }}</span>
                  <br />
                  <span><i class="fas fa-clock"></i> {{ booking.schedule.dropOff.time }}</span>
                </div>
                <div class="col-6 border border-gray rounded-right">
                  <span class="text-primary font-weight-bold">
                    <i class="fas fa-arrow-up"></i> PICK UP
                  </span>
                  <br />
                  <span><i class="fas fa-clock"></i> {{ booking.schedule.pickUp.date }}</span>
                  <br />
                  <span><i class="fas fa-clock"></i> {{ booking.schedule.pickUp.time }}</span>
                </div>
              </div>
            </div>
          </template>
        </BookingServiceCard>

        <BookingRentalCard
          v-else-if="booking && booking.assignedToModel === 'Rental'"
          :booking="booking"
          :showMenu="true"
        >
          <template #content>
            <div class="small">
              <div class="my-2">
                <i>{{ booking.description }}</i>
              </div>
              <div v-if="booking.message" class="my-2">
                Message: <i>{{ booking.message }}</i>
              </div>

              <div class="row">
                <div class="col-6 border border-gray rounded-left">
                  <span class="text-primary font-weight-bold">
                    <i class="fas fa-arrow-up"></i> PICK UP
                  </span>
                  <br />
                  <span>
                    <i class="fas fa-calendar-alt"></i> {{ booking.schedule.pickUp.date }}
                  </span>
                  <br />
                  <span><i class="fas fa-clock"></i> {{ booking.schedule.pickUp.time }}</span>
                </div>
                <div class="col-6 border border-gray rounded-right">
                  <span class="text-primary font-weight-bold">
                    <i class="fas fa-arrow-down"></i> DROP OFF
                  </span>
                  <br />
                  <span>
                    <i class="fas fa-calendar-alt"></i> {{ booking.schedule.dropOff.date }}
                  </span>
                  <br />
                  <span><i class="fas fa-clock"></i> {{ booking.schedule.dropOff.time }}</span>
                </div>
              </div>
            </div>
          </template>
        </BookingRentalCard>
      </div>

      <AppModal
        title="Delete Booking"
        message="Are you sure you want to delete this booking?"
        @confirmAction="handleDelete"
      />
    </div>

    <AppSpinner v-else />
  </main>
</template>

<style scoped>
.card {
  box-shadow: 0px 4px 10px gray;
}

.status-tag {
  position: absolute;
  top: 0;
  right: 0;
}

.badge {
  border-radius: 50%;
  border: 2px solid #63e941;
}

.img-size {
  max-width: 280px;
  width: 100%;
}
@media screen and (max-width: 600px) {
  .img-size {
    max-width: none;
    width: 100%;
  }

  .vehicle {
    width: 100%;
  }
}
</style>
