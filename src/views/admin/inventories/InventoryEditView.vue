<script setup>
import { onMounted, ref } from 'vue'
import { useInventoryStore } from '@/stores/inventoryStore'
import AppHeading from '@/components/AppHeading.vue'
import InventoryForm from '@/features/inventories/InventoryForm.vue'
import handleFileChange from '@/composables/handleFileChange'
import { useRoute } from 'vue-router'
import AppSpinner from '@/components/AppSpinner.vue'

const route = useRoute()
const inventoryStore = useInventoryStore()

const loading = ref(true)
const inventory = ref(null)

onMounted(async () => {
  await inventoryStore.fetchInventoryById(route.params.id)
  inventory.value = inventoryStore.inventories[0]
  loading.value = inventoryStore.loading
})

const handleSubmit = async (formData) => {
  loading.value = true

  if (formData.thumbnail.type) {
    formData.thumbnail = await handleFileChange(
      'app/inventories',
      formData.thumbnail,
      inventory.value.thumbnail,
    )
  }

  await inventoryStore.createInventory(formData)
  loading.value = inventoryStore.loading
}
</script>

<template>
  <main>
    <AppHeading title="Edit Inventory Details" />

    <div v-if="!loading" class="row">
      <div class="col-lg-6">
        <InventoryForm :inventory="inventory" :loading="loading" @submitForm="handleSubmit" />
      </div>
    </div>

    <AppSpinner v-else />
  </main>
</template>
