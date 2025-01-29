<script setup>
import { reactive, ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import AppHeading from '@/components/AppHeading.vue'
import { useToast } from 'vue-toastification'

const authStore = useAuthStore()
const toast = useToast()

const loading = ref(false)
const formData = reactive({
  currentPassword: null,
  newPassword: null,
  confirmNewPassword: null,
})

const submitForm = async () => {
  if (formData.newPassword !== formData.confirmNewPassword) {
    toast.error('New password fields do not match')
    return
  }

  loading.value = true
  await authStore.changePassword(formData)
  loading.value = authStore.loading
}
</script>

<template>
  <main>
    <AppHeading title="Change My Password" />

    <div class="row">
      <div class="col-lg-6">
        <!-- Nested Row within Card Body -->
        <div class="card o-hidden border-0 shadow-lg my-1">
          <div class="card-body p-0">
            <div class="p-5">
              <div class="text-center">
                <h1 class="h4 text-gray-900 mb-4">My Profile Details!</h1>
              </div>
              <form @submit.prevent="submitForm" class="user">
                <div class="form-group">
                  <input
                    v-model="formData.currentPassword"
                    type="password"
                    class="form-control form-control-user"
                    placeholder="Current Password"
                    required
                  />
                  <br />
                  <input
                    v-model="formData.newPassword"
                    type="password"
                    class="form-control form-control-user"
                    placeholder="New Password"
                    required
                  />
                  <br />
                  <input
                    v-model="formData.confirmNewPassword"
                    type="password"
                    class="form-control form-control-user"
                    placeholder="Confirm New Password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  class="btn btn-primary btn-user btn-block"
                  :disabled="loading"
                >
                  Change Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
@media (max-width: 576px) {
  .stats h6 {
    font-size: 13px;
  }
  .stats span {
    font-size: 20px;
  }
}
</style>
