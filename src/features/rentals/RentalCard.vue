<script setup>
import AppButton from '@/components/AppButton.vue'

defineProps({
  rental: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="card my-3">
    <div class="card-body">
      <div class="card-img-wrapper position-relative">
        <img :src="rental.thumbnail" alt="Rental vehicle image" class="card-img" />
        <div class="img-title bg-white text-primary font-weight-bold text-uppercase px-1">
          {{ rental.vehicle.brand }} {{ rental.vehicle.color }}
        </div>
      </div>
      <br />
      <div class="row my-1 font-weight-bold small">
        <div class="col-6 text-primary">Category</div>
        <div class="col-6 my-1 text-capitalize">{{ rental.vehicle.category }}</div>
      </div>
      <div class="row my-1 font-weight-bold small">
        <div class="col-6 text-primary">Avg. Price</div>
        <div class="col-6 my-1 text-capitalize d-md-flex">
          <div class="my-1 mr-2">${{ rental.price.perHour }}/hour</div>
          <div class="my-1 mr-2">${{ rental.price.perDay }}/day</div>
          <div class="my-1 mr-2">${{ rental.price.perWeek }}/week</div>
        </div>
      </div>
      <i class="small text-center">
        <sup><i class="fas fa-quote-left fa-xs"></i></sup>
        <span class="text-truncate mx-1">{{ rental.description }}</span>
        <sup><i class="fas fa-quote-right fa-xs"></i></sup>
      </i>

      <div class="mt-4 text-center">
        <span
          class="badge rounded-pill border border-2"
          :class="`${rental.status === 'available' ? 'border-success text-success' : 'border-danger text-danger'}`"
        >
          <i
            class="fas fa-circle"
            :class="`${rental.status === 'available' ? 'text-success' : 'text-danger'}`"
          ></i>
          {{ rental.status === 'available' ? 'Available' : 'Unavailable' }}
        </span>
      </div>
    </div>

    <div class="card-footer d-flex justify-content-end p-0">
      <router-link :to="`/rentals/${rental._id}`" class="btn link mx-2">
        <AppButton type="button" text="View Vehicle" class="btn-sm" />
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.img-title {
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 0 0 1px 1px;
  border-radius: 0 0 0 4px;
}

.badge {
  border: 3px solid;
}
</style>
