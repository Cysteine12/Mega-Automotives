<script setup>
import AppHeading from '@/components/AppHeading.vue'
import UserForm from '@/features/users/UserForm.vue'
import { useAdminStore } from '@/stores/adminStore'
import { onMounted } from 'vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const adminStore = useAdminStore()

const user = ref(null)
const loading = ref(false)

onMounted(async () => {
  adminStore.fetchUserById(route.params.id)
  user.value = adminStore.users[0]
})

const handleSubmit = async (formData) => {
  loading.value = true
  await adminStore.updateUser(user.value._id, formData)
  loading.value = adminStore.loading
}
</script>

<template>
  <main>
    <AppHeading title="Update User Account" />

    <div v-if="user" class="row">
      <div class="col-lg-6">
        <div class="card p-3 py-5">
          <UserForm :user="user" :loading="loading" @submitForm="handleSubmit" />
        </div>
      </div>
    </div>
  </main>
</template>
