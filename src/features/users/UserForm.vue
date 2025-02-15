<script setup>
import AppButton from '@/components/AppButton.vue'
import { onMounted, ref } from 'vue'

const props = defineProps({
  user: {
    type: Object,
    required: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['submitForm'])

const formData = ref({
  name: {
    firstName: null,
    lastName: null,
  },
  email: null,
  phone: null,
  role: null,
})

onMounted(() => {
  if (props.user) formData.value = props.user
})

const handleSubmit = () => {
  emit('submitForm', formData.value)
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="user">
    <div class="form-group row">
      <div class="col-sm-6 mb-3 mb-sm-0">
        <label for="exampleFirstName" class="form-label text-primary">First Name*</label>
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
        <label for="exampleLastName" class="form-label text-primary">Last Name*</label>
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
      <label for="exampleInputEmail" class="form-label text-primary">Confirmed Email*</label>
      <input
        v-model="formData.email"
        type="email"
        class="form-control form-control-user"
        id="exampleInputEmail"
        placeholder="Email Address"
        required
      />
    </div>
    <div class="form-group">
      <label for="exampleInputNumber" class="form-label text-primary">Phone Number*</label>
      <input
        v-model="formData.phone"
        type="number"
        class="form-control form-control-user"
        id="exampleInputNumber"
        placeholder="Phone Number"
        required
      />
    </div>
    <div v-if="!formData.role" class="form-group">
      <label for="formRole" class="form-label text-primary">User Role*</label>
      <select v-model="formData.role" class="form-control form-control-user" id="formRole" required>
        <option disabled hidden selected>Select Role</option>
        <option value="customer">Customer</option>
        <option value="service-technician">Service Technician</option>
        <option value="administrator">Administrator</option>
      </select>
    </div>

    <AppButton
      type="submit"
      text="Add User"
      class="btn-user btn-block"
      :loading="loading"
      :disabled="loading"
    />
  </form>
</template>
