<script setup>
defineProps({
  service: {
    type: Object,
    required: true,
  },
  route: {
    required: true,
  },
})
</script>

<template>
  <router-link :to="route" class="card my-3 text-decoration-none">
    <!-- Card Body -->
    <div class="card-img-hover">
      <img class="card-img-top" :src="service.thumbnail" alt="" width="100%" height="100%" />
    </div>
    <!-- Card Footer - Dropdown -->
    <div class="card-body py-3 d-flex flex-row align-items-center justify-content-center">
      <h6 class="m-0 font-weight-bold text-uppercase">
        {{ service.name ? service.name : service.category }}
      </h6>
    </div>
  </router-link>
</template>

<style scoped>
.card {
  margin: auto;
  max-width: 250px;
  box-shadow: 0px 4px 10px gray;
}

.card-img-hover {
  overflow: hidden;
}

.card-img-hover img {
  transition: transform 0.3s ease-in-out;
}

.card:hover img {
  transform: scale(1.1);
}

.card:hover {
  border-radius: 5px;
  background: var(--primary);
  color: #fff;
}
</style>
