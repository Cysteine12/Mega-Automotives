<script setup>
import { onMounted, ref } from 'vue'
import { useCustomerStore } from '@/stores/customerStore'
import AppHeading from '@/components/AppHeading.vue'
import ProfileCard from '@/features/users/ProfileCard.vue'
import AppModal from '@/components/AppModal.vue'
import { useUserStore } from '@/stores/userStore'
import { hasPermission } from '@/utils/permissions'

const customerStore = useCustomerStore()
const userStore = useUserStore()

const user = ref(null)
const totalVehicles = ref(null)
const totalBookings = ref(null)
const totalPayments = ref(null)

onMounted(async () => {
  user.value = userStore.user

  if (hasPermission('customer')) {
    const query = { page: null, limit: null }
    await customerStore.fetchVehicles(query)
    totalVehicles.value = customerStore.total

    await customerStore.fetchBookings(query)
    totalBookings.value = customerStore.total
  }
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
            <div v-if="hasPermission('customer')">
              <router-link
                v-if="totalVehicles"
                :to="`/vehicles`"
                class="stats mx-2 btn btn-sm text-primary"
              >
                <h6 class="mb-0">My Vehicles</h6>
                <span>{{ totalVehicles }}</span>
              </router-link>
              <router-link
                v-if="totalBookings"
                :to="`/bookings`"
                class="stats mx-2 btn btn-sm text-primary"
              >
                <h6 class="mb-0">My Bookings</h6>
                <span>{{ totalBookings }}</span>
              </router-link>
              <router-link
                v-if="totalPayments"
                :to="`/payments`"
                class="stats mx-2 btn btn-sm text-primary"
              >
                <h6 class="mb-0">My Payments</h6>
                <span>{{ totalPayments }}</span>
              </router-link>
            </div>
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
