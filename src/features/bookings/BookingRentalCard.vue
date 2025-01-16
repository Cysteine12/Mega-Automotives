<script setup>
import AppButton from '@/components/AppButton.vue'
import { formatDate } from '@/utils/formatters'

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
      <h6 class="m-0 font-weight-bold text-primary">Vehicle Rental</h6>
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
            :to="`/bookings/rental/${booking._id}/edit`"
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
      <div class="mb-lg-3">
        <div class="card-img-wrapper">
          <img
            :src="booking.assignedTo[0].thumbnail"
            class="card-img img-size"
            alt="Rental vehicle images"
          />
        </div>

        <div class="vehicle small font-weight-bold my-3 my-lg-0 mx-lg-auto">
          <div class="text-uppercase text-primary my-2">Rented vehicles</div>
          <div
            v-for="vehicle in booking.vehicles"
            :key="vehicle._id"
            class="d-flex justify-content-between mb-2"
          >
            <span class="mx-lg-2">
              <i :class="`fas fa-${vehicle.category}`"></i>
              {{ vehicle.brand }}
              {{ vehicle.model }}
              ({{ vehicle.licenseNo }})
            </span>
            <span class="text-capitalize ml-2">{{ vehicle.color }} {{ vehicle.category }}</span>
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
