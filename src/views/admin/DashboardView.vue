<script setup>
import { onMounted, ref } from 'vue'
import { useServiceStore } from '@/stores/serviceStore'
import { useAdminStore } from '@/stores/adminStore'
import AppHeading from '@/components/AppHeading.vue'
import ServiceCard from '@/features/services/ServiceCard.vue'
import AppSpinner from '@/components/AppSpinner.vue'

const serviceStore = useServiceStore()
const adminStore = useAdminStore()

const services = ref(null)
const total = ref(null)
const loading = ref(true)

onMounted(async () => {
  await serviceStore.fetchServices()
  services.value = serviceStore.services

  await adminStore.dashboard()
  total.value = adminStore.total
  loading.value = adminStore.loading
})
</script>

<template>
  <main>
    <AppHeading title="Dashboard" />

    <!-- Content Row -->
    <div v-if="!loading" class="row">
      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-primary shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                  Registered Vehicles
                </div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">{{ total.totalVehicles }}</div>
              </div>
              <div class="col-auto">
                <i class="fas fa-car fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-primary shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                  Registered Customers
                </div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">{{ total.totalCustomers }}</div>
              </div>
              <div class="col-auto">
                <i class="fas fa-car fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-success shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                  Completed Payments
                </div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">${{ total.totalPayments }}</div>
              </div>
              <div class="col-auto">
                <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Earnings (Monthly) Card Example -->
      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-info shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Tasks</div>
                <div class="row no-gutters align-items-center">
                  <div class="col-auto">
                    <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">50%</div>
                  </div>
                  <div class="col">
                    <div class="progress progress-sm mr-2">
                      <div
                        class="progress-bar bg-info"
                        role="progressbar"
                        style="width: 50%"
                        aria-valuenow="50"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-auto">
                <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-success shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                  Total Rental Bookings
                </div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">
                  {{ total.totalRentalBookings }}
                </div>
              </div>
              <div class="col-auto">
                <i class="fas fa-wrench fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-warning shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                  Pending Rental Bookings
                </div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">
                  {{ total.totalPendingRentalBookings }}
                </div>
              </div>
              <div class="col-auto">
                <i class="fas fa-wrench fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-success shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                  Total Service Bookings
                </div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">
                  {{ total.totalServiceBookings }}
                </div>
              </div>
              <div class="col-auto">
                <i class="fas fa-wrench fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-warning shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                  Pending Service Bookings
                </div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">
                  {{ total.totalPendingServiceBookings }}
                </div>
              </div>
              <div class="col-auto">
                <i class="fas fa-wrench fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <AppSpinner v-else />
    <br />
    <hr />

    <!-- Content Row -->
    <div class="custom-wrapper m-auto">
      <h4 class="my-4 font-weight-bold text-center">Vehicle Services</h4>

      <div class="row">
        <div v-for="service in services" :key="service._id" class="col-xl-4 col-lg-7">
          <ServiceCard
            :route="{ name: 'customer.services.index', query: { category: service.category } }"
            :service="service"
          />
        </div>
      </div>
    </div>

    <br />
    <hr />
  </main>
</template>

<style scoped>
.custom-wrapper {
  max-width: 900px;
}
</style>
