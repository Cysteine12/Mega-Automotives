<script setup>
import { onMounted, ref } from 'vue'
import { useCustomerStore } from '@/stores/customerStore'
import PageHeading from '@/components/PageHeading.vue'
import ProfileCard from '@/features/users/ProfileCard.vue'

const customerStore = useCustomerStore()

const vehicles = ref(null)
const bookings = ref(null)

onMounted(async () => {
  const query = { page: 1, limit: 10 }
  await customerStore.fetchVehicles(query)
  vehicles.value = customerStore.vehicles

  await customerStore.fetchBookings(query)
  bookings.value = customerStore.bookings
})
</script>

<template>
  <main>
    <PageHeading title="My Profile" />

    <div class="row">
      <div class="col-xl-8 col-lg-7">
        <ProfileCard>
          <template #profile-content>
            <router-link v-if="vehicles" :to="`/`" class="stats mx-2 btn btn-sm text-primary">
              <h6 class="mb-0">My Vehicles</h6>
              <span>{{ vehicles.length }}</span>
            </router-link>
            <router-link
              v-if="bookings"
              :to="`/bookings`"
              class="stats mx-2 btn btn-sm text-primary"
            >
              <h6 class="mb-0">My Bookings</h6>
              <span>{{ bookings.length }}</span>
            </router-link>
          </template>
        </ProfileCard>
      </div>
    </div>
  </main>
</template>

<style scoped>
@media (max-width: 576px) {
  .stats h6 {
    font-size: 13px;
  }
  .stats span {
    font-size: 20px;
  }
}
</style>
