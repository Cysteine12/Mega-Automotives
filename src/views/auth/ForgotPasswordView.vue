<script setup>
import { reactive, ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '@/stores/authStore'
import AuthForm from '@/features/auth/AuthForm.vue'
import AppButton from '@/components/AppButton.vue'

const toast = useToast()
const authStore = useAuthStore()

const loading = ref(false)
const formData = reactive({
  email: null,
})

const handleSubmit = async () => {
  if (!formData.email) {
    toast.error(`Please input your email`)
    return
  }

  loading.value = true
  await authStore.forgotPassword(formData)
  loading.value = authStore.loading
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
      <form @submit.prevent="handleSubmit" class="user">
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
        <AppButton
          type="submit"
          text="Reset Password"
          class="btn btn-primary btn-user btn-block"
          :loading="loading"
          :disabled="loading"
        />
      </form>
    </template>

    <template #footer-content>
      <router-link class="small" to="/register">Create an Account!</router-link>
      <br />
      <router-link class="small" to="/login">Already have an account? Login!</router-link>
    </template>
  </AuthForm>
</template>
