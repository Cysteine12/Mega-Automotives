<script setup>
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRoute } from 'vue-router'
import AuthForm from '@/features/auth/AuthForm.vue'

const authStore = useAuthStore()
const route = useRoute()

const loading = ref(false)
const token = ref(null)

onMounted(() => {
  token.value = route.params.token
})

const handleSubmit = async () => {
  loading.value = true
  await authStore.verifyEmail(token.value)
  loading.value = authStore.loading
}
</script>

<template>
  <AuthForm>
    <template #header-content>
      <h1 class="h4 text-gray-900 mb-2">Verify Your Email</h1>
      <p class="mb-4">
        Account registration requires your email verification.
        <span v-if="token">
          If you did not register, kindly ignore this email and do NOT verify!
        </span>
        <span v-else>
          <br /><br />
          Just a step to go. Check your registered email and verify with the link sent to you.
        </span>
      </p>
    </template>

    <template #body-content>
      <form
        v-if="token"
        @submit.prevent="handleSubmit"
        class="user d-flex align-items-center justify-content-center"
      >
        <button type="submit" class="btn btn-success btn-icon-split btn-sm" :disabled="loading">
          <span class="icon text-white-50">
            <i class="fas fa-check"></i>
          </span>
          <span class="text">Verify Email</span>
        </button>
      </form>
    </template>

    <template #footer-content>
      <router-link class="small" to="/"> Go to our Homepage </router-link>
    </template>
  </AuthForm>
</template>
