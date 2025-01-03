<script setup>
import router from '@/router'

const goBack = () => router.back()
</script>

<template>
  <div class="container-fluid">
    <div class="text-center flex flex-col justify-center items-center h-96">
      <i class="pi pi-exclamation-triangle text-yellow-500 text-7xl mb-5"></i>
      <div class="error mx-auto" data-text="404">404</div>
      <h1 class="text-6xl font-bold mb-4">Page Not Found</h1>
      <p class="text-xl mb-5">This page does not exist</p>
      <div @click="goBack" class="btn btn-primary btn-icon-split btn-sm">
        <span class="icon text-white-50">
          <i class="fas fa-arrow-left"></i>
        </span>
        <span class="text">Go back</span>
      </div>
    </div>
  </div>
</template>
