<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import { useInventoryStore } from '@/stores/inventoryStore'
import AppHeading from '@/components/AppHeading.vue'
import AppSearchModal from '@/components/AppSearchModal.vue'
import AppPagination from '@/components/AppPagination.vue'
import AppSpinner from '@/components/AppSpinner.vue'
import InventoryCard from '@/features/inventories/InventoryCard.vue'

const route = useRoute()
const inventoryStore = useInventoryStore()
const cartStore = useCartStore()

const inventories = ref(null)
const cart = ref(null)
const loading = ref(true)
const pagination = ref({
  currentPage: Number(route.query.page) || 1,
  perPage: 4,
  total: null,
})

const getInventories = async () => {
  const query = { page: pagination.value.currentPage, limit: pagination.value.perPage }
  await inventoryStore.fetchInventories(query)

  inventories.value = inventoryStore.inventories
  loading.value = inventoryStore.loading
  pagination.value.total = inventoryStore.total
}

onMounted(async () => {
  getInventories()
  await cartStore.fetchCart()
  cart.value = cartStore.cart
})

watch(
  () => route.query.page,
  (currentPage) => {
    loading.value = true
    pagination.value.currentPage = Number(currentPage)
    getInventories()
    window.scrollTo(0, 0)
  },
)

const handleSubmit = async (searchInput) => {
  const query = { name: searchInput, page: null, limit: null }
  await inventoryStore.searchInventoriesByName(query)

  inventories.value = inventoryStore.inventories
}

const handleSearchInput = (searchInput) => {
  if (searchInput === '') return getInventories()
}
</script>

<template>
  <main>
    <AppHeading title="Our Inventories" />

    <AppSearchModal
      placeholder="Search for a product..."
      @handleSubmit="handleSubmit"
      @handleSearchInput="handleSearchInput"
    />

    <div v-if="!loading">
      <div class="row m-auto">
        <div
          v-for="inventory in inventories"
          :key="inventory._id"
          class="d-flex align-items-stretch col-md-6 col-lg-4"
        >
          <InventoryCard v-if="cart" :inventory="inventory" :cart="cart" />
        </div>
      </div>
      <AppPagination :pagination="pagination" />
    </div>

    <AppSpinner v-else />
  </main>
</template>
