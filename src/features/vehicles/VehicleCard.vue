<script setup>
import { formatDate } from '@/utils/formatters'
import AppButton from '@/components/AppButton.vue'

defineProps({
  vehicle: {
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
</script>

<template>
  <div class="card my-4 text-capitalize">
    <div
      class="card-header d-flex align-items-center justify-content-between py-3 position-relative"
    >
      <h6 class="m-0 font-weight-bold text-primary">{{ vehicle.brand }} {{ vehicle.model }}</h6>
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
          <div class="dropdown-header">Vehicle Settings:</div>
          <router-link class="dropdown-item small" :to="`/vehicles/${vehicle._id}/edit`">
            <i class="fas fa-edit"></i> Edit Vehicle
          </router-link>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item small text-danger" data-toggle="modal" data-target="#promptModal">
            <i class="fas fa-trash-alt"></i> Delete Vehicle
          </a>
        </div>
      </div>
    </div>
    <div class="card-body row">
      <div class="col-4 text-primary large-icon">
        <i :class="`fas fa-${vehicle.category}`"></i>
      </div>
      <div class="col-8 pl-3 mt-4 font-weight-bold small text-capitalize">
        <div class="row">
          <div class="col-6"><i class="fas fa-cog"></i> Category</div>
          <div class="col-6 text-primary">{{ vehicle.category }}</div>
        </div>
        <div class="row">
          <div class="col-6"><i class="fas fa-cog"></i> License</div>
          <div class="col-6 text-primary">{{ vehicle.licenseNo }}</div>
        </div>
        <div class="row">
          <div class="col-6"><i class="fas fa-cog"></i> Color</div>
          <div class="col-6 text-primary">{{ vehicle.color }}</div>
        </div>
        <div class="row">
          <div class="col-6"><i class="fas fa-cog"></i> Added</div>
          <div class="col-6 text-primary">{{ formatDate(vehicle.createdAt) }}</div>
        </div>
      </div>
    </div>
    <div v-if="showButton" class="d-flex justify-content-end">
      <router-link :to="`/vehicles/${vehicle._id}`" class="btn link mx-2">
        <AppButton type="button" text="View Vehicle" class="btn-sm" />
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.large-icon {
  font-size: 80px;
}
</style>
