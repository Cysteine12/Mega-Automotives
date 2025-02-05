<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAdminStore } from '@/stores/adminStore'
import { useBookingStore } from '@/stores/bookingStore'
import { useVehicleStore } from '@/stores/vehicleStore'
import AppHeading from '@/components/AppHeading.vue'
import AppSpinner from '@/components/AppSpinner.vue'
import ProfileCard from '@/features/users/ProfileCard.vue'

const route = useRoute()
const adminStore = useAdminStore()
const vehicleStore = useVehicleStore()
const bookingStore = useBookingStore()

const user = ref(null)
const totalVehicles = ref(0)
const totalBookings = ref(0)
const totalPayments = ref(0)
const loading = ref(true)

onMounted(async () => {
  const query = { page: null, limit: null }
  await adminStore.fetchUserById(route.params.id)
  user.value = adminStore.users[0]
  loading.value = adminStore.loading

  await vehicleStore.fetchVehiclesByOwnerId(user.value._id, query)
  totalVehicles.value = vehicleStore.total

  await bookingStore.fetchBookingsByOwnerId(user.value._id, query)
  totalBookings.value = bookingStore.total

  await adminStore.fetchPaymentsByUser(user.value._id, query)
  totalPayments.value = adminStore.total
})
</script>

<template>
  <main>
    <AppHeading title="User Profile" />

    <div v-if="!loading">
      <ProfileCard :user="user">
        <template #profile-content>
          <router-link
            :to="`/admin/vehicles?userId=${user._id}`"
            class="stats mx-2 btn btn-sm text-primary"
          >
            <h6 class="mb-0">Vehicles</h6>
            <span>{{ totalVehicles }}</span>
          </router-link>
          <router-link
            :to="`/admin/bookings?userId=${user._id}`"
            class="stats mx-2 btn btn-sm text-primary"
          >
            <h6 class="mb-0">Bookings</h6>
            <span>{{ totalBookings }}</span>
          </router-link>
          <router-link
            :to="`/admin/payments?userId=${user._id}`"
            class="stats mx-2 btn btn-sm text-primary"
          >
            <h6 class="mb-0">Payments</h6>
            <span>{{ totalPayments }}</span>
          </router-link>
        </template>
      </ProfileCard>
    </div>

    <AppSpinner v-else />
  </main>
</template>
