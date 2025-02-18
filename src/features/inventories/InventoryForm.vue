<script setup>
import { onMounted, ref } from 'vue'
import AppButton from '@/components/AppButton.vue'
import AppInputFileBox from '@/components/AppInputFileBox.vue'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  inventory: {
    type: Object,
    required: false,
  },
})

const emit = defineEmits(['submitForm'])

const formData = ref({
  name: null,
  category: null,
  brand: null,
  make: null,
  model: null,
  modelNo: null,
  description: null,
  quantity: null,
  price: null,
  thumbnail: null,
  images: [],
  status: 'Available',
})

onMounted(() => {
  if (props.inventory) formData.value = props.inventory
})

const handleFileEmit = (files) => {
  formData.value.thumbnail = files[0]
}

const submitForm = async () => {
  emit('submitForm', formData.value)
}
</script>

<template>
  <div class="card shadow mb-4">
    <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-primary">Inventory Details</h6>
    </div>
    <div class="card-body">
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name" class="form-label text-primary"> Name* </label>
          <input type="text" v-model="formData.name" class="form-control" id="name" required />
        </div>

        <div class="form-group">
          <label for="category" class="form-label text-primary">Select a Category*</label>

          <select
            v-model="formData.category"
            class="form-control"
            title="Select a category"
            required
          >
            <option value="parts" :selected="formData.category === 'parts'">Parts</option>
            <option value="accessories" :selected="formData.category === 'accessories'">
              Accessories
            </option>
          </select>
        </div>

        <div class="form-group row">
          <div class="col-6 mb-3 mb-sm-0">
            <label for="brand" class="form-label text-primary"> Brand* </label>
            <input type="text" v-model="formData.brand" class="form-control" id="brand" required />
          </div>
          <div class="col-6">
            <label for="model" class="form-label text-primary"> Model* </label>
            <input type="text" v-model="formData.model" class="form-control" id="model" required />
          </div>
        </div>

        <div class="form-group row">
          <div class="col-6 mb-3 mb-sm-0">
            <label for="make" class="form-label text-primary"> Make* </label>
            <input type="text" v-model="formData.make" class="form-control" id="make" required />
          </div>
          <div class="col-6 mb-3 mb-sm-0">
            <label for="modelNo" class="form-label text-primary"> Model No* </label>
            <input
              type="text"
              v-model="formData.modelNo"
              class="form-control"
              id="modelNo"
              required
            />
          </div>
        </div>

        <div class="form-group row">
          <div class="col-6 mb-3 mb-sm-0">
            <label for="price" class="form-label text-primary"> Price* </label>
            <input
              type="number"
              v-model="formData.price"
              class="form-control"
              id="price"
              required
            />
          </div>
          <div class="col-6 mb-3 mb-sm-0">
            <label for="quantity" class="form-label text-primary"> Quantity* </label>
            <input
              type="number"
              v-model="formData.quantity"
              class="form-control"
              id="quantity"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label for="description" class="form-label text-primary"> Describe the inventory* </label>
          <textarea
            v-model="formData.description"
            rows="6"
            placeholder="Describe..."
            class="form-control"
            id="description"
            required
          >
          </textarea>
        </div>

        <div class="form-group">
          <label for="status" class="form-label text-primary"> Status </label>
          <select v-model="formData.status" id="status" class="form-control">
            <option value="Available" :selected="formData.status === 'Available'">Available</option>
            <option value="Out of Stock" :selected="formData.status === 'Out of Stock'">
              Out of Stock
            </option>
            <option value="Discontinued" :selected="formData.status === 'Discontinued'">
              Discontinued
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="fileInputField" class="form-label text-primary">
            Select Inventory Thumbnail*
          </label>
          <AppInputFileBox
            :photos="formData.thumbnail ? [formData.thumbnail] : []"
            :isRequired="true"
            @fileInput="handleFileEmit"
          />
        </div>

        <AppButton
          type="submit"
          text="Add Inventory"
          class="btn-block"
          :loading="loading"
          :disabled="loading"
        />
      </form>
    </div>
  </div>
</template>
