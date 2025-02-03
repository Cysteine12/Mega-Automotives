<script setup>
import { onMounted, ref } from 'vue'
import { useCustomerStore } from '@/stores/customerStore'
import AppHeading from '@/components/AppHeading.vue'
import ProfileCard from '@/features/users/ProfileCard.vue'
import AppModal from '@/components/AppModal.vue'
import { useUserStore } from '@/stores/userStore'

const customerStore = useCustomerStore()
const userStore = useUserStore()

const user = ref(null)
const vehicles = ref(null)
const bookings = ref(null)

onMounted(async () => {
  user.value = userStore.user

  const query = { page: 1, limit: 10 }
  await customerStore.fetchVehicles(query)
  vehicles.value = customerStore.vehicles

  await customerStore.fetchBookings(query)
  bookings.value = customerStore.bookings
})

const submitDelete = async () => {
  await userStore.deleteProfile()
}
</script>

<template>
  <main>
    <AppHeading title="My Profile" />

    <div class="row">
      <div class="col-xl-8 col-lg-7">
        <ProfileCard v-if="user" :user="user">
          <template #profile-content>
            <router-link
              v-if="vehicles"
              :to="`/vehicles`"
              class="stats mx-2 btn btn-sm text-primary"
            >
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

    <AppModal
      title="Delete Your Profile"
      message="Are you sure you want to delete your profile? This action cannot be undone!"
      @confirm-action="submitDelete"
    />
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
