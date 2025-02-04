<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useBookingStore } from '@/stores/bookingStore'
import AppHeading from '@/components/AppHeading.vue'
import AppModal from '@/components/AppModal.vue'
import AppSpinner from '@/components/AppSpinner.vue'
import BookingRentalCard from '@/features/bookings/BookingRentalCard.vue'
import BookingServiceCard from '@/features/bookings/BookingServiceCard.vue'

const bookingStore = useBookingStore()

const route = useRoute()

const booking = ref(null)
const loading = ref(true)

onMounted(async () => {
  await bookingStore.fetchBookingById(route.params.id)
  booking.value = bookingStore.bookings[0]
  loading.value = bookingStore.loading
})

const handleDelete = async () => {
  await bookingStore.deleteBooking(booking.value._id)
}
</script>

<template>
  <main>
    <AppHeading title="Booking Details" />

    <div v-if="!loading">
      <div class="row mb-4 mx-lg-2">
        <div class="col-md-6 mb-4">
          <BookingServiceCard
            v-if="booking && booking.assignedToModel === 'Subservice'"
            :booking="booking"
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
