<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAdminStore } from '@/stores/adminStore'
import AppButton from '@/components/AppButton.vue'
import AppHeading from '@/components/AppHeading.vue'
import AppModal from '@/components/AppModal.vue'
import AppPagination from '@/components/AppPagination.vue'
import AppSearchModal from '@/components/AppSearchModal.vue'
import AppSpinner from '@/components/AppSpinner.vue'
import { formatDateIntl } from '@/utils/dateFormatter'

const adminStore = useAdminStore()
const route = useRoute()
const router = useRouter()

const payments = ref(null)
const selectedPaymentData = ref(null)
const loading = ref(true)
const pagination = ref({
  currentPage: Number(route.query.page) || 1,
  perPage: 10,
  total: null,
})

const getPayments = async () => {
  const query = { page: pagination.value.currentPage, limit: pagination.value.perPage }

  if (route.query.reference) {
    await adminStore.searchPaymentByReference(route.query.reference, query)
  } else if (route.query.userId) {
    await adminStore.fetchPaymentsByUser(route.query.userId, query)
  } else {
    await adminStore.fetchPayments(query)
  }
  payments.value = adminStore.payments
  loading.value = adminStore.loading
  pagination.value.total = adminStore.total
}

onMounted(async () => getPayments())

watch(
  () => router.currentRoute.value.fullPath,
  () => {
    loading.value = true
    pagination.value.currentPage = Number(route.query.page) || 1
    getPayments()
    window.scrollTo(0, 0)
  },
)

const handleSearch = async (searchInput) =>
  router.push({
    name: router.currentRoute.value.name,
    query: { reference: searchInput },
  })

const handleUpdate = async () => {
  const { id, status } = selectedPaymentData.value
  if (!id || !status) return

  await adminStore.updatePaymentStatus(id, { status })
}

const handleDelete = async () => {
  const { id } = selectedPaymentData.value
  await adminStore.deletePayment(id)
}
</script>

<template>
  <main>
    <AppHeading title="Payments List" />

    <AppSearchModal placeholder="Search with reference number..." @handleSubmit="handleSearch" />

    <div v-if="!loading" class="card shadow my-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">Payments Database</h6>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Category</th>
                <th>Reference</th>
                <th>Status</th>
                <th>Recorded</th>
                <th>Manage</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="payment in payments"
                :key="payment._id"
                class="text-capitalize text-nowrap"
              >
                <td>
                  <router-link :to="`/admin/users/${payment.user._id}`">
                    {{ payment.user.name.firstName }} {{ payment.user.name.lastName }}
                  </router-link>
                </td>
                <td>{{ payment.assignedToModel }}</td>
                <td>{{ payment.reference }}</td>
                <td>
                  <div class="d-flex">
                    <select
                      @change="
                        (e) => (selectedPaymentData = { id: payment._id, status: e.target.value })
                      "
                      id="selectedValue"
                      class="form-control"
                    >
                      <option value="pending" :selected="payment.status === 'pending'">
                        Pending
                      </option>
                      <option value="success" :selected="payment.status === 'success'">
                        Success
                      </option>
                      <option value="failed" :selected="payment.status === 'failed'">Failed</option>
                      <option value="refunded" :selected="payment.status === 'refunded'">
                        Refunded
                      </option>
                    </select>
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
                <td>{{ formatDateIntl(payment.createdAt) }}</td>
                <td>
                  <div class="d-flex">
                    <router-link :to="`/admin/payments/${payment._id}`" class="mx-1">
                      <AppButton color="bg-success text-white btn-sm">
                        <i class="fas fa-eye"></i>
                      </AppButton>
                    </router-link>

                    <AppButton
                      @click="() => (selectedPaymentData = { id: payment._id })"
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
        title="Update Payment"
        message="Are you sure you want to update this payment status?"
        @confirm-action="handleUpdate"
      />
      <AppModal
        id="deleteModal"
        title="Delete Payment"
        message="Are you sure you want to delete this payment?"
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
