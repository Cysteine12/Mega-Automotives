<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  photos: {
    type: Array,
    required: false,
  },
  isRequired: {
    type: Boolean,
    default: true,
  },
})
const emit = defineEmits(['fileInput'])

const currentPhotos = ref([])

// couldn't figure out vue reactivity problem - used setTimeout instead of onMounted
setTimeout(() => {
  if (props.photos.length > 0) currentPhotos.value = [...props.photos]
  console.log(currentPhotos.value)
}, 2000)

const handleFileChange = async (e) => {
  if (e.target.files.length < 1) return

  const files = Array.from(e.target.files)
  currentPhotos.value.push(...files.map((file) => URL.createObjectURL(file)))

  emit('fileInput', files)
}
</script>

<template>
  <div>
    <div class="border border-gray w-100 p-1 min-height-100">
      <img
        v-for="(photo, index) in currentPhotos"
        :key="index"
        :src="photo"
        alt=""
        width="80px"
        height="80px"
        class="d-inline m-1"
      />
    </div>

    <input
      type="file"
      @change="handleFileChange"
      accept="image/*"
      class="form-control form-file"
      id="fileInputField"
      max
      multiple
      :required="isRequired"
    />
  </div>
</template>

<style scoped>
.form-control {
  border-radius: 0;
}

.min-height-100 {
  min-height: 100px;
}
</style>
