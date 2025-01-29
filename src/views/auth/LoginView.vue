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
  password: null,
})

const handleSubmit = async () => {
  if (!formData.email || !formData.password) {
    toast.error(`${!formData.email ? 'Email' : 'Password'} not found`)
    return
  }

  loading.value = true
  await authStore.login(formData)
  loading.value = authStore.loading
}

const handleGoogleAuth = async () => {
  await authStore.googleLogin()
}
</script>

<template>
  <AuthForm>
    <template #header-content>
      <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
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
        <div class="form-group">
          <div class="custom-control custom-checkbox small">
            <input type="checkbox" class="custom-control-input" id="customCheck" />
            <label class="custom-control-label" for="customCheck">Remember Me</label>
          </div>
        </div>
        <button type="submit" class="btn btn-primary btn-user btn-block" :disabled="loading">
          Login
        </button>
        <hr />
        <button
          @click="handleGoogleAuth"
          type="button"
          to="/"
          class="btn btn-google btn-user btn-block"
        >
          <i class="fab fa-google fa-fw"></i> Login with Google
        </button>
      </form>
    </template>

    <template #footer-content>
      <router-link class="small" to="/forgot-password"> Forgot Password? </router-link>
      <br />
      <router-link class="small" to="/register">Create an Account!</router-link>
    </template>
  </AuthForm>
</template>
