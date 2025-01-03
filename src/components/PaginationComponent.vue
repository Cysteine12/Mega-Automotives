<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  pagination: {
    type: Object,
    required: true,
  },
})

const router = useRouter()

const page = ref({
  currentPage: props.pagination.currentPage,
  perPage: props.pagination.perPage,
  total: props.pagination.total,
  totalPage: Math.round(props.pagination.total / props.pagination.perPage),
})
const currentRoute = ref(router.currentRoute.value.path)

watch(
  () => props.pagination.currentPage,
  (currentPage) => {
    page.value.currentPage = currentPage
  },
)

let pagesIndex = []
for (let i = 1; i <= page.value.totalPage; i++) {
  pagesIndex.push(i)
}
</script>

<template>
  <nav class="my-5" aria-label="Page navigation example">
    <ul v-if="pagesIndex !== ''" class="pagination justify-content-center">
      <li :class="{ disabled: page.currentPage === 1 }" class="page-item">
        <router-link :to="`${currentRoute}?page=${page.currentPage - 1}`" class="page-link">
          Previous
        </router-link>
      </li>
      <li v-for="pageIndex in pagesIndex" :key="pageIndex.index" class="page-item">
        <router-link
          :to="`${currentRoute}?page=${pageIndex}`"
          :class="{ current: page.currentPage === pageIndex }"
          class="page-link"
        >
          {{ pageIndex }}
        </router-link>
      </li>
      <li :class="{ disabled: page.currentPage === page.totalPage }" class="page-item">
        <router-link :to="`${currentRoute}?page=${page.currentPage + 1}`" class="page-link">
          Next
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style>
.current {
  background: #2b60d1;
  color: #fff;
}
</style>
