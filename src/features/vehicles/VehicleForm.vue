<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  vehicle: {
    type: Object,
    required: false,
  },
})

const emit = defineEmits(['submitForm'])

const formData = ref({
  category: null,
  licenseNo: null,
  brand: null,
  model: null,
  year: null,
  color: null,
})

onMounted(() => {
  if (props.vehicle) formData.value = props.vehicle
})

const submitForm = async () => {
  emit('submitForm', formData.value)
}
</script>

<template>
  <div class="card shadow mb-4">
    <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-primary">Vehicle Details</h6>
    </div>
    <div class="card-body">
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="category" class="form-label text-primary">Select a Category</label>

          <select
            v-model="formData.category"
            class="form-control"
            title="Select a category"
            required
          >
            <option value="motorcycle" :selected="formData.category === 'motorcycle'">
              Motorcycle
            </option>
            <option value="tricycle" :selected="formData.category === 'tricycle'">Tricycle</option>
            <option value="car" :selected="formData.category === 'car'">Car</option>
            <option value="truck" :selected="formData.category === 'truck'">Truck</option>
            <option value="bus" :selected="formData.category === 'bus'">Bus</option>
            <option value="others" :selected="formData.category === 'others'">Others</option>
          </select>
        </div>

        <div class="form-group">
          <label for="licenseNo" class="form-label text-primary"> License Number </label>
          <input
            type="text"
            v-model="formData.licenseNo"
            class="form-control"
            id="licenseNo"
            required
          />
        </div>

        <div class="form-group row">
          <div class="col-6 mb-3 mb-sm-0">
            <label for="brand" class="form-label text-primary"> Brand </label>
            <input type="text" v-model="formData.brand" class="form-control" id="brand" required />
          </div>
          <div class="col-6">
            <label for="model" class="form-label text-primary"> Model </label>
            <input type="text" v-model="formData.model" class="form-control" id="model" required />
          </div>
        </div>

        <div class="form-group row">
          <div class="col-6 mb-3 mb-sm-0">
            <label for="year" class="form-label text-primary"> Year </label>
            <input type="number" v-model="formData.year" class="form-control" id="year" required />
          </div>
          <div class="col-6">
            <label for="color" class="form-label text-primary"> Color </label>
            <input type="text" v-model="formData.color" class="form-control" id="color" required />
          </div>
        </div>

        <button type="submit" class="btn btn-primary btn-block" :disabled="loading">
          Add Vehicle
        </button>
      </form>
    </div>
  </div>
</template>
