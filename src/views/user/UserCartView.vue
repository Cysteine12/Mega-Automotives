<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import AppHeading from '@/components/AppHeading.vue'
import AppButton from '@/components/AppButton.vue'
import AppSpinner from '@/components/AppSpinner.vue'
import { handleCartPayment } from '@/composables/handleCartPayment'

const cartStore = useCartStore()

const cart = ref({
  items: [],
})
const loading = ref(true)

onMounted(async () => {
  await cartStore.fetchCart()
  cart.value = cartStore.cart
  loading.value = cartStore.loading
})

watch(
  () => cartStore.cart.items,
  (cartItems) => {
    cart.value.items = cartItems
  },
)

const removeItemFromCart = async (itemId) => {
  await cartStore.removeItem(itemId)
}

const editItemInCart = async (id, quantity) => {
  if (quantity < 1) return
  await cartStore.editItem({ id, newItem: { quantity } })
}

const clearCart = async () => {
  await cartStore.clearCart()
}

const cartTotalItem = computed(() =>
  cart.value.items.reduce((pre, cur) => {
    if (cur.inventory.status !== 'Available') return pre
    return pre + cur.quantity
  }, 0),
)

const cartTotalPrice = computed(() =>
  cart.value.items.reduce((pre, cur) => {
    if (cur.inventory.status !== 'Available') return pre
    return pre + cur.inventory.price * cur.quantity
  }, 0),
)

const handleCheckoutClick = async () => {
  await handleCartPayment(cart.value)
}
</script>

<template>
  <main>
    <AppHeading title="My Cart" />

    <div v-if="!loading">
      <div v-if="cart.items.length > 0" class="row">
        <div class="col-lg-8">
          <div v-for="item in cart.items" :key="item._id">
            <div class="card m-2 w-100">
              <div class="row">
                <div class="card-img-wrapper col-6 col-md-4 position-relative">
                  <router-link :to="`/inventories/${item.inventory._id}`">
                    <img :src="item.inventory.thumbnail" alt="Product image" class="card-img" />
                  </router-link>
                </div>
                <div class="card-body p-1 col-6 col-md-8 pl-2 pr-4">
                  <div class="d-md-flex justify-content-between">
                    <router-link
                      :to="`/inventories/${item.inventory._id}`"
                      class="text-decoration-none text-reset"
                    >
                      <div class="font-weight-bold">{{ item.inventory.name }}</div>
                      <div class="text-truncate small">{{ item.inventory.description }}</div>
                      <div class="text-capitalize small">{{ item.inventory.category }}</div>
                    </router-link>

                    <div class="font-weight-bold mt-2">${{ item.inventory.price }}</div>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-between align-items-center mt-2">
                <button @click="removeItemFromCart(item._id)" class="btn btn-0 text-warning">
                  <i class="fas fa-trash-alt"></i> Remove
                </button>
                <div class="mb-2 mr-2">
                  <div class="d-flex" v-if="item.inventory.status === 'Available'">
                    <AppButton
                      @click="editItemInCart(item._id, item.quantity - 1)"
                      text="-"
                      class="text-white font-weight-bold"
                      color="bg-warning"
                    />
                    <div class="p-2 px-3 font-weight-bold">{{ item.quantity }}</div>
                    <AppButton
                      @click="editItemInCart(item._id, item.quantity + 1)"
                      text="+"
                      class="text-white font-weight-bold"
                      color="bg-warning"
                    />
                  </div>
                  <button v-else class="btn btn-danger btn-icon-split btn-sm" disabled>
                    <span class="icon icon-sm text-white-50 small">
                      <i class="fas fa-exclamation-triangle"></i>
                    </span>
                    <span class="text small">{{ item.inventory.status }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-4">
          <div class="card m-2 my-5 my-lg-2 p-3 w-100 font-weight-bold">
            <div class="d-flex justify-content-between">
              <h5 class="font-weight-bold">CART SUMMARY</h5>
              <button @click="clearCart()" class="btn btn-warning">Clear Cart</button>
            </div>
            <div class="my-3">
              <div class="d-flex justify-content-between my-1">
                <div>Total Items</div>
                <div>${{ cartTotalItem }}</div>
              </div>
              <div class="d-flex justify-content-between my-1">
                <div>Subtotal</div>
                <div>${{ cartTotalPrice }}</div>
              </div>
            </div>
            <button @click="handleCheckoutClick" class="btn btn-user btn-warning w-100">
              Checkout (${{ cartTotalPrice }})
            </button>
          </div>
        </div>
      </div>
      <div v-else class="card w-100 p-3">
        No Item in cart yet
        <br /><br />
        <div class="d-flex">
          Go to <router-link to="/inventories" class="ml-1"> Inventory</router-link>
        </div>
      </div>
    </div>

    <AppSpinner v-else />
  </main>
</template>

<style scoped>
.card-img {
  width: 150px;
  height: 150px;
  border-radius: 5px 0 0 0 !important;
}
</style>
