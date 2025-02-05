<script setup>
import { reactive, ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '@/stores/authStore'
import AuthForm from '@/features/auth/AuthForm.vue'

const toast = useToast()
const authStore = useAuthStore()

const loading = ref(false)
const formData = reactive({
  name: {
    firstName: null,
    lastName: null,
  },
  email: null,
  password: null,
  confirmPassword: null,
  phone: null,
})

const handleSubmit = async () => {
  if (formData.password !== formData.confirmPassword) {
    toast.error('Passwords do not match')
    return
  }

  loading.value = true
  await authStore.register(formData)
  loading.value = authStore.loading
}

const handleGoogleAuth = async () => {
  await authStore.googleLogin()
}
</script>

<template>
  <AuthForm>
    <template #header-content>
      <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
    </template>

    <template #body-content>
      <form @submit.prevent="handleSubmit" class="user">
        <div class="form-group row">
          <div class="col-sm-6 mb-3 mb-sm-0">
            <input
              v-model="formData.name.firstName"
              type="text"
              class="form-control form-control-user"
              id="exampleFirstName"
              placeholder="First Name"
              required
            />
          </div>
          <div class="col-sm-6">
            <input
              v-model="formData.name.lastName"
              type="text"
              class="form-control form-control-user"
              id="exampleLastName"
              placeholder="Last Name"
              required
            />
          </div>
        </div>
        <div class="form-group">
          <input
            v-model="formData.email"
            type="email"
            class="form-control form-control-user"
            id="exampleInputEmail"
            placeholder="Email Address"
            required
          />
        </div>
        <div class="form-group row">
          <div class="col-sm-6 mb-3 mb-sm-0">
            <input
              v-model="formData.password"
              type="password"
              class="form-control form-control-user"
              id="exampleInputPassword"
              placeholder="Password"
              required
            />
          </div>
          <div class="col-sm-6">
            <input
              v-model="formData.confirmPassword"
              type="password"
              class="form-control form-control-user"
              id="exampleRepeatPassword"
              placeholder="Repeat Password"
              required
            />
          </div>
        </div>
        <div class="form-group">
          <input
            v-model="formData.phone"
            type="number"
            class="form-control form-control-user"
            id="exampleInputNumber"
            placeholder="Phone Number"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary btn-user btn-block" :disabled="loading">
          Register Account
        </button>
        <hr />
        <button
          @click="handleGoogleAuth"
          type="button"
          to="/"
          class="btn btn-google btn-user btn-block"
        >
          <i class="fab fa-google fa-fw"></i> Register with Google
        </button>
      </form>
    </template>

    <template #footer-content>
      <router-link class="small" to="/forgot-password">Forgot Password?</router-link>
      <br />
      <router-link class="small" to="/login">Already have an account? Login!</router-link>
    </template>
  </AuthForm>
</template>
