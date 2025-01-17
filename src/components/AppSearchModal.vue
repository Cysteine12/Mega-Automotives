<script setup>
import { ref } from 'vue'

defineProps({
  placeholder: {
    type: String,
    default: 'Search here...',
  },
})

const emit = defineEmits(['handleSearchInput', 'handleSubmit'])

const searchInput = ref(null)

const handleSearchInput = (e) => {
  emit('handleSearchInput', e.target.value)
}
const handleSubmit = () => {
  if (!searchInput.value) return
  emit('handleSubmit', searchInput.value)
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="form-block ml-md-3 my-2 my-md-0 mw-100 navbar-search">
    <div class="input-group">
      <input
        type="text"
        @input="handleSearchInput"
        v-model="searchInput"
        class="form-control bg-light border-1 small"
        :placeholder="placeholder"
        aria-label="Search"
        aria-describedby="basic-addon2"
      />
      <div class="input-group-append">
        <button class="btn btn-primary" type="submit">
          <i class="fas fa-search fa-sm"></i>
        </button>
      </div>
    </div>
  </form>
</template>
