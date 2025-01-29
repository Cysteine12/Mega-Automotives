<script setup>
import { useNotificationStore } from '@/stores/notificationStore'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppHeading from '@/components/AppHeading.vue'
import AppPagination from '@/components/AppPagination.vue'
import { formatDate } from '@/utils/dateFormatter'
import AppSpinner from '@/components/AppSpinner.vue'

const route = useRoute()
const notificationStore = useNotificationStore()

const notifications = ref(null)
const loading = ref(true)
const pagination = ref({
  currentPage: Number(route.query.page) || 1,
  perPage: 10,
  total: null,
})

const getNotifications = async () => {
  const query = { page: pagination.value.currentPage, limit: pagination.value.perPage }
  await notificationStore.fetchNotifications(query)

  notifications.value = notificationStore.notifications
  loading.value = notificationStore.loading
  pagination.value.total = notificationStore.total
}

onMounted(() => getNotifications())

watch(
  () => route.query.page,
  (currentPage) => {
    pagination.value.currentPage = Number(currentPage)
    getNotifications()
    window.scrollTo(0, 0)
  },
)

const handleClick = async (notificationId, notificationStatus) => {
  if (notificationStatus === 'read') return
  await notificationStore.updateNotificationStatus(notificationId)
}
</script>

<template>
  <main>
    <AppHeading title="My Notifications" />

    <div v-if="!loading">
      <div class="d-flex justify-content-center">
        <div class="card p-2 w-100">
          <div v-for="notification in notifications" :key="notification._id">
            <router-link
              :to="notification.link"
              @click="handleClick(notification._id, notification.status)"
              class="text-decoration-none text-reset"
            >
              <div
                class="card bg-white rounded-0 m-0 p-2 py-4 p-md-4 border-left-primary"
                :class="`border-left-${notification.type} card-highlight`"
              >
                <div class="d-flex justify-content-between align-items-center">
                  <div class="d-flex">
                    <span
                      v-if="notification.isImportant"
                      class="text-capitalize bg-primary text-white rounded p-1 mr-1 small"
                    >
                      <i class="fas fa-info-circle"></i> IMPORTANT
                    </span>
                    <span class="text-primary font-weight-bold">{{ notification.title }}</span>
                  </div>

                  <div class="small">{{ formatDate(notification.createdAt) }}</div>
                </div>

                <div
                  class="py-2"
                  :class="notification.status === 'unread' ? 'font-weight-bold' : ''"
                >
                  {{ notification.message }}
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>

      <AppPagination :pagination="pagination" />
    </div>

    <AppSpinner v-else />
  </main>
</template>

<style scoped>
.card {
  max-width: 600px;
}

.card-highlight:hover {
  background: #bdbdbd;
}
</style>
