<script setup>
import ButtonComponent from '@/components/ButtonComponent.vue'
import { formatDate } from '@/utils/formatters'

defineProps({
  booking: {
    type: Object,
    required: true,
  },
})

const statusTags = {
  booked: 'primary',
  confirmed: 'warning',
  'in-progress': 'info',
  completed: 'success',
  cancelled: 'danger',
}
</script>

<template>
  <div class="card mb-4 mx-lg-auto">
    <div class="card-header py-3 position-relative">
      <h6 class="m-0 font-weight-bold text-primary">
        Vehicle {{ booking.assignedToModel === 'Subservice' ? 'Services' : 'Rental' }}
      </h6>
    </div>
    <div class="card-body">
      <div class="d-flex justify-content-between flex-wrap mb-lg-3">
        <div class="card-img-wrapper">
          <img src="/img/b.png" class="card-img img-size" />
        </div>

        <div class="vehicle small font-weight-bold my-3 my-lg-0 mx-lg-auto">
          <div class="d-flex justify-content-between mb-2">
            <span class="text-primary mx-lg-2">License: </span>
            <span class="text-uppercase ml-2">{{ booking.vehicle.licenseNo }}</span>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <span class="text-primary mx-lg-2">Model: </span>
            <span class="text-capitalize ml-2">
              {{ booking.vehicle.brand }} {{ booking.vehicle.model }}
            </span>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <span class="text-primary mx-lg-2">Desc: </span>
            <span class="text-capitalize ml-2">
              {{ booking.vehicle.color }} {{ booking.vehicle.category }}
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
      </div>
    </div>

    <div class="d-flex justify-content-between">
      <div class="font-weight-bold small m-3">{{ formatDate(booking.updatedAt) }}</div>

      <router-link :to="`/bookings/${booking._id}`" class="btn link mx-2">
        <ButtonComponent type="button" text="View Booking" class="btn-sm" />
      </router-link>
    </div>
  </div>
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
