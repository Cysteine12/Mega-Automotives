<script setup>
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useUserStore } from '@/stores/userStore'
import AppHeading from '@/components/AppHeading.vue'
import AppButton from '@/components/AppButton.vue'

const authStore = useAuthStore()
const userStore = useUserStore()

const loading = ref(false)
const formData = ref({
  name: {
    firstName: null,
    lastName: null,
  },
  phone: null,
})

onMounted(async () => {
  formData.value = authStore.user
})

const submitForm = async () => {
  loading.value = true
  await userStore.updateProfile(formData.value)
  loading.value = userStore.loading
}
</script>

<template>
  <main>
    <AppHeading title="Edit My Profile" />

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
                    v-model="formData.phone"
                    type="number"
                    class="form-control form-control-user"
                    id="exampleInputNumber"
                    placeholder="Phone Number"
                    required
                  />
                </div>

                <AppButton
                  type="submit"
                  text="Update Profile"
                  class="btn-user btn-block"
                  :loading="loading"
                  :disabled="loading"
                />
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
