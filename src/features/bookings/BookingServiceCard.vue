<script setup>
import AppButton from '@/components/AppButton.vue'
import { formatDate } from '@/utils/dateFormatter'

defineProps({
  booking: {
    type: Object,
    required: true,
  },
  showMenu: {
    type: Boolean,
    default: false,
  },
  showButton: {
    type: Boolean,
    default: false,
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
  <div class="card w-100 mb-4 mx-lg-auto">
    <div
      class="card-header d-flex align-items-center justify-content-between py-3 position-relative"
    >
      <h6 class="m-0 font-weight-bold text-primary">Vehicle Service</h6>
      <div v-if="showMenu" class="dropdown no-arrow">
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
            :to="`/bookings/service/${booking._id}/edit`"
          >
            <i class="fas fa-edit"></i> Edit Booking
          </router-link>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item small text-danger" data-toggle="modal" data-target="#promptModal">
            <i class="fas fa-trash-alt"></i> Delete Booking
          </a>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="d-flex justify-content-between flex-wrap mb-lg-3">
        <div v-if="booking.photos.photoBefore" class="card-img-wrapper">
          <img :src="booking.photos.photoBefore" class="card-img img-size" />
        </div>

        <div class="vehicle small my-3 my-lg-0 mx-lg-auto">
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

      <div class="small">
        <div class="font-weight-bold text-primary">Booked Categories</div>

        <div v-for="subservice in booking.assignedTo" :key="subservice._id" class="my-2">
          <span class="text-primary mr-1"><i class="fas fa-check"></i></span>
          <span> {{ subservice.name }}</span>
        </div>
      </div>

      <slot name="content"></slot>
    </div>

    <div class="d-flex justify-content-between">
      <div class="font-weight-bold small m-3">Updated: {{ formatDate(booking.updatedAt) }}</div>

      <router-link v-if="showButton" :to="`/bookings/${booking._id}`" class="btn link mx-2">
        <AppButton type="button" text="View Booking" class="btn-sm" />
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
