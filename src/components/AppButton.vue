<script setup>
defineProps({
  type: {
    type: String,
    default: 'button',
  },
  text: {
    type: String,
    required: false,
  },
  color: {
    type: String,
    default: 'btn-primary',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <button :type="type" class="btn border-2 shadow" :class="color" :disabled="disabled">
    <span v-if="loading"><i class="fas fa-spinner fa-spin"></i></span>
    <slot v-if="!loading">
      <span> {{ text }} </span>
    </slot>
  </button>
</template>

<style scoped>
/* .btn:hover {
  background: #fff;
  color: #3d40df;
  color: var(--bs-primary);
} */
</style>
