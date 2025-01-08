<script setup>
defineProps({
  type: {
    type: String,
    default: 'button',
  },
  text: {
    type: String,
    required: true,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <button :type="type" class="btn btn-primary btn-primary-hover" :isDisabled="isDisabled">
    {{ text }}
  </button>
</template>

<style scoped>
.btn {
  border: 1.5px solid #3d40df;
  border-radius: 5px;
}
.btn-primary:hover {
  border: 1.5px solid #3d40df;
  background: #fff;
  color: #3d40df;
}
</style>
