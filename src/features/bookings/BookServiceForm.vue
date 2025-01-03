<script setup>
import { ref } from 'vue'

const props = defineProps({
  subservices: {
    type: Array,
    required: false,
    default: null,
  },
  vehicles: {
    type: Array,
    required: true,
  },
  booking: {
    type: Object,
    required: false,
  },
})

const emit = defineEmits(['submitForm'])

const loading = ref()
const formData = ref({
  vehicle: null,
  assignedTo: [],
  assignedToModel: 'Subservice',
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

if (props.booking) {
  formData.value = props.booking
  formData.value.vehicle = props.booking?.vehicle?._id
  formData.value.assignedTo = props.booking?.assignedTo?.map((subservice) => subservice._id)
}

const submitForm = async () => {
  loading.value = true

  emit('submitForm', formData.value)
}
</script>

<template>
  <div class="card shadow mb-4">
    <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-primary">Book An Appointment</h6>
    </div>
    <div class="card-body">
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="vehicle" class="form-label text-primary">Select a Vehicle*</label>

          <select v-model="formData.vehicle" class="form-control" title="Select a vehicle">
            <template v-if="vehicles">
              <option
                v-for="vehicle in vehicles"
                :key="vehicle._id"
                :value="vehicle._id"
                :selected="formData.vehicle === vehicle._id"
              >
                {{ vehicle.brand }} {{ vehicle.model }} ({{ vehicle.licenseNo }})
              </option>
            </template>
            <template v-else>
              <option disabled selected>No registered vehicle found</option>
            </template>
          </select>
        </div>

        <div v-if="subservices" class="form-group">
          <label for="subservices" class="form-label text-primary">Select service categories</label>
          <div v-for="(subservice, index) in subservices" :key="subservice._id" class="form-check">
            <input
              type="checkbox"
              v-model="formData.assignedTo"
              :value="subservice._id"
              class="form-check-input"
              :id="`checkbox${index}`"
              :checked="formData.assignedTo.includes(subservice._id)"
            />
            <label :for="`checkbox${index}`" class="form-check-label">{{ subservice.name }}</label>
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

        <div class="form-group">
          <label for="description" class="form-label text-primary">
            Describe your vehicle's fault
          </label>
          <textarea
            v-model="formData.description"
            rows="6"
            placeholder="Describe your vehicle fault here..."
            class="form-control"
            id="description"
            required
          >
          </textarea>
        </div>

        <div class="form-group">
          <label for="vehiclePic" class="form-label text-primary">
            Current picture of your vehicle
          </label>
          <input type="file" class="form-control form-file" id="vehiclePic" required />
        </div>

        <button type="submit" class="btn btn-primary btn-user btn-block" :disabled="loading">
          Place Booking
        </button>
      </form>
    </div>
  </div>
</template>
