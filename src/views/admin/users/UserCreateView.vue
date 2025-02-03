<script setup>
import AppHeading from '@/components/AppHeading.vue'
import UserForm from '@/features/users/UserForm.vue'
import { useAdminStore } from '@/stores/adminStore'
import { ref } from 'vue'

const adminStore = useAdminStore()

const loading = ref(false)

const handleSubmit = async (formData) => {
  loading.value = true
  await adminStore.createUser(formData)
  loading.value = adminStore.loading
}
</script>

<template>
  <main>
    <AppHeading title="Create User Account" />

    <div class="row">
      <div class="col-lg-6">
        <div class="card p-3 py-5">
          <UserForm :loading="loading" @submitForm="handleSubmit" />
        </div>
      </div>
    </div>
  </main>
</template>
