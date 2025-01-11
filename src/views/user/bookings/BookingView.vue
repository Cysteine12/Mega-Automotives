<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCustomerStore } from '@/stores/customerStore'
import AppHeading from '@/components/AppHeading.vue'
import AppModal from '@/components/AppModal.vue'

const customerStore = useCustomerStore()
const route = useRoute()

const booking = ref(null)
const statusTags = {
  booked: 'primary',
  confirmed: 'warning',
  'in-progress': 'info',
  completed: 'success',
  cancelled: 'danger',
}

onMounted(async () => {
  const bookingId = route.params.id

  await customerStore.fetchBookingById(bookingId)
  booking.value = customerStore.bookings[0]
})

const handleDelete = async () => {
  await customerStore.deleteBooking(booking.value._id)
}
</script>

<template>
  <main>
    <AppHeading title="Booking Details" />

    <div class="row">
      <div class="col-md-6 mb-4">
        <div v-if="booking" class="card mb-4 mx-lg-2">
          <div
            class="card-header d-flex align-items-center justify-content-between py-3 position-relative"
          >
            <h6 class="m-0 font-weight-bold text-primary">
              Vehicle {{ booking.assignedToModel === 'Subservice' ? 'Services' : 'Rental' }}
            </h6>
            <div class="dropdown no-arrow">
              <a
                class="dropdown-toggle"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="fas fa-ellipsis-v fa-sm fa-fw"></i>
              </a>
              <div
                class="dropdown-menu dropdown-menu-right shadow animated--fade-in p-1"
                aria-labelledby="dropdownMenuLink"
              >
                <div class="dropdown-header">Booking Settings:</div>
                <router-link
                  v-if="['booked', 'confirmed'].includes(booking.status)"
                  class="dropdown-item small"
                  :to="`/bookings/${booking._id}/edit`"
                >
                  <i class="fas fa-edit"></i> Edit Booking
                </router-link>
                <div class="dropdown-divider"></div>
                <a
                  class="dropdown-item small text-danger"
                  data-toggle="modal"
                  data-target="#promptModal"
                >
                  <i class="fas fa-trash-alt"></i> Delete Booking
                </a>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="d-flex justify-content-between flex-wrap mb-lg-3">
              <div class="card-img-wrapper">
                <img src="/img/b.png" class="card-img img-size" />
              </div>

              <div class="vehicle small font-weight-bold my-3 my-lg-0 mx-lg-auto">
                <div class="d-flex justify-content-between mb-2">
                  <span class="text-primary mx-lg-2">License: </span>
                  <span class="text-uppercase ml-2">{{ booking.vehicles[0].licenseNo }}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span class="text-primary mx-lg-2">Model: </span>
                  <span class="text-capitalize ml-2">
                    {{ booking.vehicles[0].brand }} {{ booking.vehicles[0].model }}
                  </span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span class="text-primary mx-lg-2">Desc: </span>
                  <span class="text-capitalize ml-2">
                    {{ booking.vehicles[0].color }} {{ booking.vehicles[0].category }}
                  </span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span class="text-primary mx-lg-2">Status: </span>
                  <span
                    class="badge rounded-pill text-white text-uppercase p-1 ml-2"
                    :class="`border-${statusTags[booking.status]} bg-${statusTags[booking.status]}`"
                  >
                    {{ booking.status }}
                  </span>
                </div>
              </div>
            </div>

            <div v-if="booking.assignedToModel === 'Subservice'" class="small">
              <div class="font-weight-bold text-primary">Booked Categories</div>

              <div v-for="subservice in booking.assignedTo" :key="subservice._id" class="my-2">
                <span class="text-primary mr-1"><i class="fas fa-check"></i></span>
                <span> {{ subservice.name }}</span>
              </div>

              <div>{{ booking.description }}</div>

              <div>{{ booking.schedule }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <AppModal
      title="Delete Booking"
      message="Are you sure you want to delete this booking?"
      @confirmAction="handleDelete"
    />
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
