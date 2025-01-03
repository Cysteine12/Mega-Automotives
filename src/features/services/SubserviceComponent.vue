<script setup>
defineProps({
  subservice: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="card shadow mb-4">
    <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-primary">{{ subservice.name }}</h6>
    </div>
    <div class="card-body">
      <div class="card-img-top">
        <img
          class="img-fluid px-3 px-sm-4 mt-3 mb-4"
          style="width: 25rem"
          src="/img/undraw_posting_photo.svg"
          alt="..."
        />
      </div>
      <p>{{ subservice.description }}</p>
      <div
        class="row d-flex flex-row align-items-center justify-content-between font-weight-bold my-2 mx-1"
      >
        <span class="text-primary">Price: </span>
        <span>${{ subservice.price }}</span>
      </div>
      <div
        class="row d-flex flex-row align-items-center justify-content-between font-weight-bold my-2 mx-1"
      >
        <span class="font-weight-bold text-primary">Duration: </span>
        <span>{{ subservice.duration }}hour(s)</span>
      </div>
      <hr />
      <div class="mt-4 text-center small">
        <span class="mr-2">
          <i
            class="fas fa-circle"
            :class="`${subservice.availability ? 'text-success' : 'text-danger'}`"
          ></i>
          {{ subservice.availability ? 'Available' : 'Unavailable' }}
        </span>
      </div>
    </div>
  </div>
</template>
