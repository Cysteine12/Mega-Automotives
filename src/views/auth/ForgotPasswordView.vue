<script setup>
import { reactive, ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '@/stores/authStore'
import AuthForm from '@/features/auth/AuthForm.vue'

const toast = useToast()
const authStore = useAuthStore()

const loading = ref(false)
const formData = reactive({
  email: null,
})

const submitForm = async () => {
  if (!formData.email) {
    toast.error(`Please input your email`)
    return
  }

  loading.value = authStore.loading

  await authStore.forgotPassword(formData)
}
</script>

<template>
  <AuthForm>
    <template #header-content>
      <h1 class="h4 text-gray-900 mb-2">Forgot Your Password?</h1>
      <p class="mb-4">
        We get it, stuff happens. Just enter your email address below and we'll send you a link to
        reset your password!
      </p>
    </template>

    <template #body-content>
      <form @submit.prevent="submitForm" class="user">
        <div class="form-group">
          <input
            v-model="formData.email"
            type="email"
            class="form-control form-control-user"
            id="exampleInputEmail"
            aria-describedby="emailHelp"
            placeholder="Enter Email Address..."
            required
          />
        </div>
        <button type="submit" class="btn btn-primary btn-user btn-block" :disabled="loading">
          Reset Password
        </button>
      </form>
    </template>

    <template #footer-content>
      <router-link class="small" to="/register">Create an Account!</router-link>
      <br />
      <router-link class="small" to="/login">Already have an account? Login!</router-link>
    </template>
  </AuthForm>
</template>
