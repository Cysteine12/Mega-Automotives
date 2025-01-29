<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '@/stores/authStore'
import { useRoute, useRouter } from 'vue-router'
import AuthForm from '@/features/auth/AuthForm.vue'

const toast = useToast()
const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

const loading = ref(false)
const token = ref(null)
const formData = reactive({
  email: null,
  password: null,
})

onMounted(() => {
  formData.email = route.query.email
  token.value = route.params.token

  if (!formData.email || !token.value) {
    router.push({ name: 'not-found' })
  }
})

const handleSubmit = async () => {
  if (!formData.password) {
    toast.error(`Please input password`)
    return
  }

  loading.value = true
  await authStore.resetPassword(token.value, formData)
  loading.value = authStore.loading
}
</script>

<template>
  <AuthForm>
    <template #header-content>
      <h1 class="h4 text-gray-900 mb-2">Reset Your Password</h1>
      <p class="mb-4">Just one more step. Setup your new password below and you're ready to go!</p>
    </template>

    <template #body-content>
      <form @submit.prevent="handleSubmit" class="user">
        <div class="form-group">
          <input
            v-model="formData.password"
            type="password"
            class="form-control form-control-user"
            id="exampleInputPassword"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary btn-user btn-block" :disabled="loading">
          Reset Password
        </button>
      </form>
    </template>

    <template #footer-content>
      <router-link class="small" to="/forgot-password"> Resend link? </router-link>
      <br />
      <router-link class="small" to="/register">Create an Account!</router-link>
    </template>
  </AuthForm>
</template>
