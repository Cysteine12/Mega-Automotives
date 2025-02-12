<script setup>
import { onMounted, ref } from 'vue'
import AppInputFileBox from '@/components/AppInputFileBox.vue'

const props = defineProps({
  rental: {
    type: Object,
    required: false,
  },
})

const emit = defineEmits(['handleFormChangeEmit'])

const formData = ref({
  description: null,
  thumbnail: null,
  images: null,
  price: {
    perHour: null,
    perDay: null,
    perWeek: null,
  },
  status: 'available',
})

const handleFileEmit = (files) => {
  formData.value.thumbnail = files[0]
}

onMounted(() => {
  if (props.rental) formData.value = props.rental
})
</script>

<template>
  <form @change="emit('handleFormChangeEmit', formData)">
    <div class="form-group">
      <label for="description" class="form-label text-primary">
        Describe the rental vehicle*
      </label>
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
      <div class="col-4 mb-3 mb-sm-0">
        <label for="pricePerHour" class="form-label text-primary"> PerHour* </label>
        <input
          type="number"
          v-model="formData.price.perHour"
          class="form-control"
          id="pricePerHour"
          required
        />
      </div>
      <div class="col-4 mb-3 mb-sm-0">
        <label for="pricePerDay" class="form-label text-primary"> PerDay* </label>
        <input
          type="number"
          v-model="formData.price.perDay"
          class="form-control"
          id="pricePerDay"
          required
        />
      </div>
      <div class="col-4">
        <label for="pricePerWeek" class="form-label text-primary"> PerWeek* </label>
        <input
          type="number"
          v-model="formData.price.perWeek"
          class="form-control"
          id="pricePerWeek"
          required
        />
      </div>
    </div>

    <div class="form-group">
      <label for="status" class="form-label text-primary"> Status </label>
      <select v-model="formData.status" id="status" class="form-control">
        <option value="available" :selected="formData.status === 'available'">Available</option>
        <option value="in-use" :selected="formData.status === 'in-use'">In-use</option>
        <option value="unavailable" :selected="formData.status === 'unavailable'">
          Unavailable
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="fileInputField" class="form-label text-primary">
        Select Vehicle Thumbnail*
      </label>
      <AppInputFileBox
        :photos="formData.thumbnail ? [formData.thumbnail] : []"
        :isRequired="true"
        @fileInput="handleFileEmit"
      />
    </div>
  </form>
</template>
