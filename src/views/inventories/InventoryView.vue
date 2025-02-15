<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useInventoryStore } from '@/stores/inventoryStore'
import { useCartStore } from '@/stores/cartStore'
import AppHeading from '@/components/AppHeading.vue'
import AppButton from '@/components/AppButton.vue'
import AppSpinner from '@/components/AppSpinner.vue'

const route = useRoute()
const inventoryStore = useInventoryStore()
const cartStore = useCartStore()

const inventory = ref(null)
const cart = ref(null)
const loading = ref(true)

onMounted(async () => {
  await inventoryStore.fetchInventoryById(route.params.id)
  inventory.value = inventoryStore.inventories[0]
  loading.value = inventoryStore.loading

  await cartStore.fetchCart()
  cart.value = cartStore.cart
})

const isAddedToCart = computed(() => {
  return [...cart.value.items.map((item) => item.inventory._id)].includes(inventory.value._id)
})

const addItemToCart = async () => {
  isAddedToCart.value = true
  await cartStore.addItem(inventory.value)
}
</script>

<template>
  <main>
    <AppHeading title="Inventory Details" />

    <div v-if="!loading" class="row m-auto">
      <div class="col-lg-6">
        <div class="card w-100">
          <div class="card-header font-weight-bold text-primary">{{ inventory.name }}</div>
          <div class="card-body">
            <div class="card-img-wrapper position-relative">
              <img :src="inventory.thumbnail" alt="Product image" class="card-img" />
              <button
                type="button"
                class="btn btn-outline btn-icon-split btn-sm btn-inventory"
                :class="inventory.status === 'Available' ? 'btn-success' : 'btn-danger'"
              >
                <span class="icon p-1 pl-2 small">
                  <i
                    class="fas fa-sm"
                    :class="
                      inventory.status === 'Available' ? 'fa-check-circle' : 'fa-times-circle'
                    "
                    aria-hidden="true"
                  ></i>
                </span>
                <span class="text-capitalize p-1 pr-2 small">{{ inventory.status }}</span>
              </button>
            </div>
            <div class="font-weight-bold mt-4">{{ inventory.name }}</div>
            <div class="small">{{ inventory.description }}</div>
            <div class="text-capitalize small">{{ inventory.category }}</div>

            <div class="font-weight-bold mt-2">${{ inventory.price }}</div>

            <div class="bottom d-flex justify-content-end">
              <AppButton
                @click="addItemToCart"
                :text="isAddedToCart ? 'Added to cart' : 'Add to cart'"
                class="btn-sm text-white"
                color="bg-warning"
                :disabled="isAddedToCart"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <AppSpinner v-else />
  </main>
</template>

<style scoped>
.card-img {
  max-width: 300px;
}

.btn-inventory {
  margin: 0;
  position: absolute;
  left: 5px;
  bottom: 0;
}

.btn-bottom {
  position: absolute;
  bottom: 5px;
  right: 15px;
}
</style>
