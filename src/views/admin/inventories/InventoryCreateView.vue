<script setup>
import { ref } from 'vue'
import { useInventoryStore } from '@/stores/inventoryStore'
import AppHeading from '@/components/AppHeading.vue'
import InventoryForm from '@/features/inventories/InventoryForm.vue'
import handleFileChange from '@/composables/handleFileChange'

const inventoryStore = useInventoryStore()

const loading = ref(false)

const handleSubmit = async (formData) => {
  loading.value = true

  formData.thumbnail = await handleFileChange('app/inventories', formData.thumbnail)

  await inventoryStore.createInventory(formData)
  loading.value = inventoryStore.loading
}
</script>

<template>
  <main>
    <AppHeading title="Add  New Inventory" />

    <div class="row">
      <div class="col-lg-6">
        <InventoryForm :loading="loading" @submitForm="handleSubmit" />
      </div>
    </div>
  </main>
</template>
