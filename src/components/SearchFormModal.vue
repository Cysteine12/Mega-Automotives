<script setup>
import { reactive } from 'vue'

const emit = defineEmits(['handleSearchInput'])

const form = reactive({
  text: null,
})

const handleSearchInput = (e) => {
  emit('handleSearchInput', e.target.value)
}
</script>

<template>
  <form class="form-block ml-md-3 my-2 my-md-0 mw-100 navbar-search">
    <div class="input-group">
      <input
        type="text"
        @input="handleSearchInput"
        v-model="form.text"
        class="form-control bg-light border-1 small"
        placeholder="Search for a service..."
        aria-label="Search"
        aria-describedby="basic-addon2"
      />
      <div class="input-group-append">
        <button class="btn btn-primary" type="button">
          <i class="fas fa-search fa-sm"></i>
        </button>
      </div>
    </div>
  </form>
</template>
