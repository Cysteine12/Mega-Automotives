<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBookingStore } from '@/stores/bookingStore'
import AppButton from '@/components/AppButton.vue'
import AppHeading from '@/components/AppHeading.vue'
import AppModal from '@/components/AppModal.vue'
import AppPagination from '@/components/AppPagination.vue'
import AppSearchModal from '@/components/AppSearchModal.vue'
import AppSpinner from '@/components/AppSpinner.vue'
import { formatDateIntl } from '@/utils/dateFormatter'

const bookingStore = useBookingStore()
const route = useRoute()
const router = useRouter()

const bookings = ref(null)
const selectedBookingData = ref(null)
const messageBox = ref(false)
const loading = ref(true)
const pagination = ref({
  currentPage: Number(route.query.page) || 1,
  perPage: 10,
  total: null,
})

const getBookings = async () => {
  const query = { page: pagination.value.currentPage, limit: pagination.value.perPage }

  if (route.query.name) {
    await bookingStore.searchBookingsByOwner(route.query.name, query)
  } else if (route.query.userId) {
    await bookingStore.fetchBookingsByOwnerId(route.query.userId, query)
  } else {
    await bookingStore.fetchBookings(query)
  }
  bookings.value = bookingStore.bookings
  loading.value = bookingStore.loading
  pagination.value.total = bookingStore.total
}

onMounted(async () => getBookings())

watch(
  () => router.currentRoute.value.fullPath,
  () => {
    loading.value = true
    pagination.value.currentPage = Number(route.query.page) || 1
    getBookings()
    window.scrollTo(0, 0)
  },
)

const handleSearch = async (searchInput) =>
  router.push({
    name: router.currentRoute.value.name,
    query: { licenseNo: searchInput },
  })

const handleUpdate = async () => {
  const { id, status, message } = selectedBookingData.value
  if (!id || !status) return

  await bookingStore.updateBookingStatus(id, { status, message })
}

const handleDelete = async () => {
  const { id } = selectedBookingData.value
  await bookingStore.deleteBooking(id)
}
</script>

<template>
  <main>
    <AppHeading title="Bookings List" />

    <AppSearchModal placeholder="Search with customer name..." @handleSubmit="handleSearch" />

    <div v-if="!loading" class="card shadow my-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">Bookings Database</h6>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
            <thead>
              <tr>
                <th>Type</th>
                <th>Owner</th>
                <th>Status</th>
                <th>Booked</th>
                <th>Manage</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="booking in bookings"
                :key="booking._id"
                class="text-capitalize text-nowrap"
              >
                <td>{{ booking.assignedToModel }}</td>
                <td>
                  <router-link :to="`/admin/users/${booking.owner._id}`">
                    {{ booking.owner.name.firstName }} {{ booking.owner.name.lastName }}
                  </router-link>
                </td>
                <td>
                  <div class="d-flex">
                    <div class="d-block">
                      <select
                        @change="
                          (e) =>
                            (selectedBookingData = {
                              id: booking._id,
                              status: e.target.value,
                            })
                        "
                        @click="(e) => (messageBox = { show: true, id: booking._id })"
                        id="selectedStatus"
                        class="form-control"
                      >
                        <option value="booked" :selected="booking.status === 'booked'">
                          Booked
                        </option>
                        <option value="confirmed" :selected="booking.status === 'confirmed'">
                          Confirmed
                        </option>
                        <option value="in-progress" :selected="booking.status === 'in-progress'">
                          In-Progress
                        </option>
                        <option value="completed" :selected="booking.status === 'completed'">
                          Completed
                        </option>
                        <option value="cancelled" :selected="booking.status === 'cancelled'">
                          Cancelled
                        </option>
                      </select>
                      <input
                        v-if="messageBox.show && messageBox.id === booking._id"
                        @change="(e) => (selectedBookingData.message = e.target.value)"
                        type="text"
                        id="messageBox"
                        placeholder="Type a message..."
                      />
                    </div>
                    <AppButton
                      class="ml-1"
                      type="button"
                      color="bg-warning btn-sm"
                      data-toggle="modal"
                      data-target="#updateModal"
                    >
                      <i class="fas fa-arrow-right"></i>
                    </AppButton>
                  </div>
                </td>
                <td>{{ formatDateIntl(booking.createdAt) }}</td>
                <td>
                  <div class="d-flex">
                    <router-link :to="`/admin/bookings/${booking._id}`" class="mx-1">
                      <AppButton color="bg-success text-white btn-sm">
                        <i class="fas fa-eye"></i>
                      </AppButton>
                    </router-link>

                    <AppButton
                      @click="() => (selectedBookingData = { id: booking._id })"
                      color="bg-danger text-white btn-sm"
                      class="mx-1"
                      data-toggle="modal"
                      data-target="#deleteModal"
                    >
                      <i class="fas fa-trash-alt"></i>
                    </AppButton>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <AppPagination :pagination="pagination" />

      <AppModal
        id="updateModal"
        title="Update Booking"
        message="Are you sure you want to update this booking status?"
        @confirm-action="handleUpdate"
      />
      <AppModal
        id="deleteModal"
        title="Delete Booking"
        message="Are you sure you want to delete this booking?"
        @confirm-action="handleDelete"
      />
    </div>

    <AppSpinner v-else />
  </main>
</template>

<style scoped>
select {
  min-width: max-content;
}
</style>
