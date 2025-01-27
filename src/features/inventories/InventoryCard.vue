<script setup>
import AppButton from '@/components/AppButton.vue'
import { useCartStore } from '@/stores/cartStore'
import { computed } from 'vue'

const props = defineProps({
  inventory: {
    type: Object,
    required: true,
  },
  cart: {
    type: Object,
    required: true,
  },
})

const cartStore = useCartStore()

const isAddedToCart = computed(() => {
  return [...props.cart.items.map((item) => item.inventory._id)].includes(props.inventory._id)
})

const addItemToCart = async () => {
  await cartStore.addItem(props.inventory)
}
</script>

<template>
  <div class="card m-2 w-100">
    <div class="row">
      <div class="card-img-wrapper col-6 position-relative">
        <router-link :to="`/inventories/${inventory._id}`">
          <img :src="inventory.thumbnail" alt="Product image" class="card-img" />
        </router-link>
        <button
          type="button"
          class="btn btn-outline btn-icon-split btn-sm btn-inventory"
          :class="inventory.status === 'Available' ? 'btn-success' : 'btn-danger'"
        >
          <span class="icon p-1 pl-2 small">
            <i
              class="fas fa-sm"
              :class="inventory.status === 'Available' ? 'fa-check-circle' : 'fa-times-circle'"
              aria-hidden="true"
            ></i>
          </span>
          <span class="text-capitalize p-1 pr-2 small">{{ inventory.status }}</span>
        </button>
      </div>
      <div class="card-body p-1 col-6 pl-2 pr-3">
        <router-link :to="`/inventories/${inventory._id}`" class="text-decoration-none text-reset">
          <div class="font-weight-bold">{{ inventory.name }}</div>
          <div class="text-truncate small">{{ inventory.description }}</div>
          <div class="text-capitalize small">{{ inventory.category }}</div>
        </router-link>

        <div class="font-weight-bold mt-2">${{ inventory.price }}</div>

        <div class="btn-bottom d-flex justify-content-end">
          <AppButton
            @click="addItemToCart"
            :text="isAddedToCart ? 'Added to cart' : 'Add to cart'"
            class="btn-sm text-white"
            color="bg-warning"
            :isDisabled="isAddedToCart"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  min-width: 300px;
  max-width: 500px;
}
.card-img {
  width: 150px;
  height: 150px;
  border-radius: 5px 0 0 5px !important;
}
.btn-inventory {
  margin: 0;
  position: absolute;
  left: 5px;
  bottom: 0;
  scale: 0.8;
}

.btn-bottom {
  position: absolute;
  bottom: 5px;
  right: 15px;
}
</style>
