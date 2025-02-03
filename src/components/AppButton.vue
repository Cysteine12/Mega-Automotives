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
  isDisabled: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <button :type="type" class="btn border-2 shadow" :class="color" :disabled="isDisabled">
    <slot> {{ text }} </slot>
  </button>
</template>

<style scoped>
.btn:hover {
  background: #fff;
  color: #3d40df;
  color: var(--bs-primary);
}
</style>
