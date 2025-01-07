<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCustomerStore } from '@/stores/customerStore'
import AppHeading from '@/components/AppHeading.vue'
import AppModal from '@/components/AppModal.vue'
import { formatDate } from '@/utils/formatters'

const customerStore = useCustomerStore()
const route = useRoute()

const vehicle = ref(null)

onMounted(async () => {
  const vehicleId = route.params.id

  await customerStore.fetchVehicleById(vehicleId)
  vehicle.value = customerStore.vehicles[0]
})

const handleDelete = async () => {
  await customerStore.deleteVehicle(vehicle.value._id)
}
</script>

<template>
  <main>
    <AppHeading title="Vehicle Details" />

    <div v-if="vehicle" class="row mb-4 mx-lg-2">
      <div class="col-md-6 mb-4">
        <div class="card my-4">
          <div
            class="card-header d-flex align-items-center justify-content-between py-3 position-relative"
          >
            <h6 class="m-0 font-weight-bold text-primary">
              {{ vehicle.brand }} {{ vehicle.model }}
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
                <div class="dropdown-header">Vehicle Settings:</div>
                <router-link class="dropdown-item small" :to="`/vehicles/${vehicle._id}/edit`">
                  <i class="fas fa-edit"></i> Edit Vehicle
                </router-link>
                <div class="dropdown-divider"></div>
                <a
                  class="dropdown-item small text-danger"
                  data-toggle="modal"
                  data-target="#promptModal"
                >
                  <i class="fas fa-trash-alt"></i> Delete Vehicle
                </a>
              </div>
            </div>
          </div>
          <div class="card-body">
            <i :class="`fas fa-${vehicle.category}`"></i>
            {{ vehicle.category }}
            {{ vehicle.licenseNo }}
            {{ vehicle.color }}
            {{ formatDate(vehicle.createdAt) }}
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
