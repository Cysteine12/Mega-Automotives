<script setup>
import { ref } from 'vue'
import AppInputFileBox from '@/components/AppInputFileBox.vue'
import AppButton from '@/components/AppButton.vue'

const emit = defineEmits(['handleFormEmit', 'handleRemoveEmit'])

const formData = ref({
  name: null,
  description: null,
  price: null,
  duration: null,
  thumbnail: null,
  images: null,
})

const handleFileEmit = (files) => {
  formData.value.thumbnail = files[0]
}
</script>

<template>
  <div class="card m-1 my-2">
    <div class="card-header d-flex justify-content-between mb-2">
      <h6 class="text-primary font-weight-bold">New Subservice</h6>
      <AppButton
        @click="emit('handleRemoveEmit')"
        class="btn-sm font-weight-bold"
        color=" bg-danger text-white"
      >
        <i class="fas fa-times"></i>
      </AppButton>
    </div>
    <div class="card-body">
      <form @change="emit('handleFormEmit', formData)">
        <div class="form-group">
          <label for="subserviceName" class="form-label text-primary"> Subservice Name* </label>
          <input
            type="text"
            v-model="formData.name"
            class="form-control"
            id="subserviceName"
            required
          />
        </div>

        <div class="form-group">
          <label for="description" class="form-label text-primary"> Describe Subservice* </label>
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

        <div class="form-group row">
          <div class="col-6 mb-3 mb-sm-0">
            <label for="price" class="form-label text-primary">Subservice Price* </label>
            <input
              type="number"
              v-model="formData.price"
              class="form-control"
              id="price"
              required
            />
          </div>
          <div class="col-6">
            <label for="duration" class="form-label text-primary">Subservice Duration* </label>
            <input
              type="number"
              v-model="formData.duration"
              class="form-control"
              id="duration"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label for="fileInputField" class="form-label text-primary">
            Select Subservice Thumbnail*
          </label>
          <AppInputFileBox
            :photos="formData.thumbnail ? [formData.thumbnail] : []"
            :isRequired="true"
            @fileInput="handleFileEmit"
          />
        </div>
      </form>
    </div>
  </div>
</template>
