<script setup>
import AppButton from '@/components/AppButton.vue'
import AppHeading from '@/components/AppHeading.vue'
import AppModal from '@/components/AppModal.vue'
import AppPagination from '@/components/AppPagination.vue'
import AppSearchModal from '@/components/AppSearchModal.vue'
import AppSpinner from '@/components/AppSpinner.vue'
import { useAdminStore } from '@/stores/adminStore'
import { formatDateIntl } from '@/utils/dateFormatter'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const adminStore = useAdminStore()
const route = useRoute()

const users = ref(null)
const selectedUserData = ref(null)
const loading = ref(true)
const pagination = ref({
  currentPage: Number(route.query.page) || 1,
  perPage: 10,
  total: null,
})

const getUsers = async () => {
  const query = { page: pagination.value.currentPage, limit: pagination.value.perPage }
  await adminStore.fetchUsers(query)

  users.value = adminStore.users
  loading.value = adminStore.loading
  pagination.value.total = adminStore.total
}

onMounted(async () => getUsers())

watch(
  () => route.query.page,
  (currentPage) => {
    loading.value = true
    pagination.value.currentPage = Number(currentPage)
    getUsers()
    window.scrollTo(0, 0)
  },
)

const handleSubmit = async (searchInput) => {
  const query = { page: null, limit: null }
  await adminStore.searchUsersByName(searchInput, query)
  users.value = adminStore.users
}

const handleRoleUpdate = async () => {
  const { id, role } = selectedUserData.value
  await adminStore.updateUserRole(id, { role })
}

const handleDelete = async () => {
  const { id } = selectedUserData.value
  await adminStore.deleteUser(id)
}
</script>

<template>
  <main>
    <AppHeading title="Our Users" />

    <AppSearchModal placeholder="Search for a user..." @handleSubmit="handleSubmit" />

    <div v-if="!loading" class="card shadow my-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">Users Database</h6>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Member Since</th>
                <th>Manage</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="user in users" :key="user._id">
                <td class="text-nowrap">{{ user.name.firstName }} {{ user.name.lastName }}</td>
                <td>{{ user.email }}</td>
                <td>
                  <div class="d-flex">
                    <select
                      @change="(e) => (selectedUserData = { id: user._id, role: e.target.value })"
                      id="selectedValue"
                      class="form-control"
                    >
                      <option value="customer" :selected="user.role === 'customer'">
                        Customer
                      </option>
                      <option
                        value="service-technician"
                        :selected="user.role === 'service-technician'"
                      >
                        Service Technician
                      </option>
                      <option value="administrator" :selected="user.role === 'administrator'">
                        Administrator
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
                <td>{{ formatDateIntl(user.createdAt) }}</td>
                <td>
                  <div class="d-flex">
                    <router-link :to="`/admin/users/${user._id}`" class="mx-1">
                      <AppButton color="bg-success text-white btn-sm">
                        <i class="fas fa-eye"></i>
                      </AppButton>
                    </router-link>

                    <router-link :to="`/admin/users/${user._id}/edit`" class="mx-1">
                      <AppButton color="bg-warning text-white btn-sm">
                        <i class="fas fa-edit"></i>
                      </AppButton>
                    </router-link>

                    <AppButton
                      @click="() => (selectedUserData = { id: user._id })"
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
        title="Update User Role"
        message="Are you sure you want to change user role?"
        @confirm-action="handleRoleUpdate"
      />
      <AppModal
        id="deleteModal"
        title="Delete User Profile"
        message="Are you sure you want to delete user profile?"
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
