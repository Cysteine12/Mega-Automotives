<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  rentals: {
    type: Array,
    required: false,
    default: null,
  },
  booking: {
    type: Object,
    required: false,
  },
})

const emit = defineEmits(['submitForm'])

const loading = ref(false)
const formData = ref({
  vehicles: [],
  assignedTo: [],
  assignedToModel: 'Rental',
  description: null,
  schedule: {
    pickUp: {
      date: null,
      time: null,
    },
    dropOff: {
      date: null,
      time: null,
    },
  },
  photos: {
    photoBefore: null,
  },
})

onMounted(() => {
  if (props.booking) {
    formData.value = props.booking
    formData.value.vehicles = props.booking?.vehicles?.map((vehicle) => vehicle._id)
    formData.value.assignedTo = props.booking?.assignedTo?.map((subservice) => subservice._id)
  }
})

const submitForm = async () => {
  loading.value = true

  emit('submitForm', formData.value)
}
</script>

<template>
  <div class="card shadow mb-4">
    <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-primary">Rent A Vehicle</h6>
    </div>
    <div class="card-body">
      <form @submit.prevent="submitForm">
        <div v-if="rentals" class="form-group">
          <label for="vehicle" class="form-label text-primary">Select a Vehicle*</label>

          <select v-model="formData.assignedTo" class="form-control" title="Select a vehicle">
            <option
              v-for="rental in rentals"
              :key="rental._id"
              :value="rental._id"
              :selected="formData.assignedTo.includes(rental._id)"
            >
              {{ vehicle.brand }} {{ vehicle.model }} ({{ vehicle.licenseNo }})
            </option>
          </select>
        </div>

        <div class="form-group row">
          <div class="col-6 mb-3 mb-sm-0">
            <label for="pickUpDate" class="form-label text-primary"> Pick-up Date </label>
            <input
              type="date"
              v-model="formData.schedule.pickUp.date"
              class="form-control"
              id="pickUpDate"
              required
            />
          </div>
          <div class="col-6">
            <label for="pickUpTime" class="form-label text-primary"> Pick-up Time </label>
            <input
              type="time"
              v-model="formData.schedule.pickUp.time"
              class="form-control"
              id="pickUpTime"
              required
            />
          </div>
        </div>

        <div class="form-group row">
          <div class="col-6 mb-3 mb-sm-0">
            <label for="dropOffDate" class="form-label text-primary"> Drop-off Date </label>
            <input
              type="date"
              v-model="formData.schedule.dropOff.date"
              class="form-control"
              id="dropOffDate"
              required
            />
          </div>
          <div class="col-6">
            <label for="dropOffTime" class="form-label text-primary"> Drop-off Time </label>
            <input
              type="time"
              v-model="formData.schedule.dropOff.time"
              class="form-control"
              id="dropOffTime"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label for="description" class="form-label text-primary">
            Describe your purpose of renting
          </label>
          <textarea
            v-model="formData.description"
            rows="6"
            placeholder="Describe..."
            class="form-control"
            id="description"
            required
          >
          </textarea>
        </div>

        <button type="submit" class="btn btn-primary btn-block" :disabled="loading">
          Place Booking
        </button>
      </form>
    </div>
  </div>
</template>
