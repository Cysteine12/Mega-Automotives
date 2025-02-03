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
})
</script>

<template>
  <main>
    <AppHeading title="User Profile" />

    <div v-if="!loading">
      <ProfileCard :user="user">
        <template #profile-content>
          <router-link
            v-if="totalVehicles"
            :to="`/admin/users/${user._id}/vehicles`"
            class="stats mx-2 btn btn-sm text-primary"
          >
            <h6 class="mb-0">Vehicles</h6>
            <span>{{ totalVehicles }}</span>
          </router-link>
          <router-link
            v-if="totalBookings"
            :to="`/admin/users/${user._id}/bookings`"
            class="stats mx-2 btn btn-sm text-primary"
          >
            <h6 class="mb-0">Bookings</h6>
            <span>{{ totalBookings }}</span>
          </router-link>
        </template>
      </ProfileCard>
    </div>

    <AppSpinner v-else />
  </main>
</template>
