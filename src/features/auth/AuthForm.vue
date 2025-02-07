<script setup>
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  document.body.classList.add('bg-gradient-primary')
})

onUnmounted(() => {
  document.body.classList.remove('bg-gradient-primary')
})
</script>

<template>
  <div class="container">
    <!-- Outer Row -->
    <div class="row justify-content-center">
      <div class="col-lg-6 col-md-8">
        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body p-0">
            <!-- Nested Row within Card Body -->
            <div class="p-5">
              <div class="text-center">
                <slot name="header-content"></slot>
              </div>
              <slot name="body-content"></slot>
              <hr />
              <div class="text-center">
                <slot name="footer-content"></slot>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
