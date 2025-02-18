<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useInventoryStore } from '@/stores/inventoryStore'
import AppHeading from '@/components/AppHeading.vue'
import AppSpinner from '@/components/AppSpinner.vue'
import AppButton from '@/components/AppButton.vue'
import AppSearchModal from '@/components/AppSearchModal.vue'
import AppModal from '@/components/AppModal.vue'
import AppPagination from '@/components/AppPagination.vue'

const inventoryStore = useInventoryStore()
const route = useRoute()
const router = useRouter()

const inventories = ref(null)
const selectedInventoryData = ref(null)
const loading = ref(true)
const pagination = ref({
  currentPage: Number(route.query.page) || 1,
  perPage: 10,
  total: null,
})

const getInventories = async () => {
  const query = { page: pagination.value.currentPage, limit: pagination.value.perPage }

  if (route.query.name) {
    await inventoryStore.searchInventoriesByName(route.query.name, query)
  } else {
    await inventoryStore.fetchInventories(query)
  }
  inventories.value = inventoryStore.inventories
  loading.value = inventoryStore.loading
  pagination.value.total = inventoryStore.total
}

onMounted(() => getInventories())

watch(
  () => router.currentRoute.value.fullPath,
  () => {
    loading.value = true
    pagination.value.currentPage = Number(route.query.page) || 1
    getInventories()
    window.scrollTo(0, 0)
  },
)

const handleSearch = async (searchInput) =>
  router.push({
    name: router.currentRoute.value.name,
    query: { name: searchInput },
  })

const handleUpdate = async () => {
  const { id, status } = selectedInventoryData.value
  await inventoryStore.updateInventory(id, { status })
}

const handleDelete = async () => {
  const { id } = selectedInventoryData.value
  await inventoryStore.deleteInventory(id)
}
</script>

<template>
  <main>
    <AppHeading title="Inventories List" />

    <AppSearchModal placeholder="Search inventory..." @handleSubmit="handleSearch" />

    <div v-if="!loading" class="card shadow my-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">Inventories Database</h6>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Manage</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="inventory in inventories"
                :key="inventory._id"
                class="text-capitalize text-nowrap"
              >
                <td>{{ inventory.name }}</td>
                <td class="text-uppercase">${{ inventory.price }}</td>
                <td>{{ inventory.quantity }}</td>
                <td>
                  <div class="d-flex">
                    <select
                      @change="
                        (e) =>
                          (selectedInventoryData = { id: inventory._id, status: e.target.value })
                      "
                      id="selectedValue"
                      class="form-control"
                    >
                      <option value="Available" :selected="inventory.status === 'Available'">
                        Available
                      </option>
                      <option value="Out of Stock" :selected="inventory.status === 'Out of Stock'">
                        Out of Stock
                      </option>
                      <option value="Discontinued" :selected="inventory.status === 'Discontinued'">
                        Discontinued
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
                <td>
                  <div class="d-flex">
                    <router-link :to="`/admin/inventories/${inventory._id}`" class="mx-1">
                      <AppButton color="bg-success text-white btn-sm">
                        <i class="fas fa-eye"></i>
                      </AppButton>
                    </router-link>

                    <router-link :to="`/admin/inventories/${inventory._id}/edit`" class="mx-1">
                      <AppButton color="bg-warning text-white btn-sm">
                        <i class="fas fa-edit"></i>
                      </AppButton>
                    </router-link>

                    <AppButton
                      @click="() => (selectedInventoryData = { id: inventory._id })"
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
        title="Update Inventory Status"
        message="Are you sure you want to update this inventory?"
        @confirm-action="handleUpdate"
      />
      <AppModal
        id="deleteModal"
        title="Delete Inventory"
        message="Are you sure you want to delete this inventory?"
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
