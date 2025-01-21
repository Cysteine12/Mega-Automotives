<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useServiceStore } from '@/stores/serviceStore'
import AppHeading from '@/components/AppHeading.vue'
import AppSearchModal from '@/components/AppSearchModal.vue'
import SubservicesList from '@/features/services/SubservicesList.vue'
import AppMegaBotComponent from '@/components/AppMegaBotComponent.vue'

const route = useRoute()
const serviceStore = useServiceStore()
const services = ref(null)
const selectedCategory = ref(null)
const filteredSubservices = ref(null)
const subservices = ref(null)

onMounted(async () => {
  await serviceStore.fetchServices()
  services.value = serviceStore.services

  if (route.query.category) {
    selectedCategory.value = route.query.category

    const filteredService = services.value.find((service) => {
      return service.category === selectedCategory.value
    })

    subservices.value = filteredService.subservices
  } else {
    selectedCategory.value = services.value[0].category
    subservices.value = services.value[0].subservices || null
  }
  filteredSubservices.value = subservices.value
})

const handleSearchInput = (inputValue) => {
  if (!inputValue) {
    filteredSubservices.value = subservices.value
    return
  }

  filteredSubservices.value = services.value.flatMap((service) =>
    service.subservices.filter((subservice) =>
      subservice.name.toLowerCase().includes(inputValue.toLowerCase()),
    ),
  )
}

const changeCategory = (category) => {
  const filteredService = services.value.find((service) => {
    return service.category === category
  })
  selectedCategory.value = category
  filteredSubservices.value = filteredService.subservices
}
</script>

<template>
  <main>
    <AppHeading title="Our Services" />

    <!-- Content Row -->

    <div class="custom-wrapper m-auto">
      <!-- Service Search -->
      <AppSearchModal
        placeholder="Search for a service..."
        @handleSearchInput="handleSearchInput"
      />

      <div
        v-if="services"
        class="row d-flex flex-row align-items-center justify-content-center bg-white text-dark my-4 mx-0"
      >
        <div
          type="button"
          v-for="service in services"
          :key="service._id"
          @click="changeCategory(service.category)"
          class="mx-1 py-2 px-1 font-weight-bold"
          :class="{ 'border-bottom-primary': service.category === selectedCategory }"
        >
          {{ service.category }}
        </div>
      </div>

      <SubservicesList v-if="filteredSubservices" :filteredSubservices="filteredSubservices" />

      <AppMegaBotComponent />
    </div>
  </main>
</template>

<style scoped>
.custom-wrapper {
  max-width: 800px;
}
</style>
