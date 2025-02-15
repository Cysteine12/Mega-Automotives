<script setup>
import AppButton from '@/components/AppButton.vue'
import { computed, onMounted, ref } from 'vue'

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

const selectedRentalRef = ref(null)
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
    license: null,
  },
})

onMounted(() => {
  if (props.booking) {
    formData.value = props.booking
    formData.value.vehicles = props.booking?.vehicles?.map((vehicle) => vehicle._id)
    formData.value.assignedTo = props.booking?.assignedTo?.map((rental) => rental._id)
  }
})

const addSelectedRental = () => {
  if (formData.value.assignedTo.includes(selectedRentalRef.value.value)) {
    selectedRentalRef.value.value = null
    return
  }

  formData.value.assignedTo.push(selectedRentalRef.value.value)
  formData.value.vehicles.push(
    [props.rentals.find((rental) => rental._id === selectedRentalRef.value.value)][0].vehicle._id,
  )

  selectedRentalRef.value.value = null
}

const removeSelectedRental = (selectedRental, selectedVehicle) => {
  formData.value.assignedTo = formData.value.assignedTo.filter(
    (rental) => rental !== selectedRental,
  )
  formData.value.vehicles = formData.value.vehicles.filter((vehicle) => vehicle !== selectedVehicle)
}

const filteredSelectedRental = computed(() =>
  props.rentals.filter((rental) => formData.value.assignedTo.includes(rental._id)),
)

const submitForm = async () => {
  loading.value = true

  emit('submitForm', formData.value)
}
</script>

<template>
  <div class="card shadow mb-4">
    <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-primary">Rent Vehicle(s)</h6>
    </div>
    <div class="card-body">
      <form @submit.prevent="submitForm">
        <div v-if="rentals" class="form-group">
          <label for="vehicle" class="form-label text-primary">Select Vehicle(s)*</label>
          <div class="d-flex">
            <select
              ref="selectedRentalRef"
              id="vehicle"
              class="form-control"
              title="Select vehicle"
            >
              <option disabled hidden selected>Select..</option>
              <option v-for="rental in rentals" :key="rental._id" :value="rental._id">
                {{ rental.vehicle.brand }}
                {{ rental.vehicle.model }}
                ({{ rental.vehicle.licenseNo }})
              </option>
            </select>
            <button type="button" @click="addSelectedRental" class="btn btn-primary d-flex ml-2">
              <span><i class="fas fa-plus"></i></span>
              <span class="ml-1">Add</span>
            </button>
          </div>
          <div>
            <div
              v-for="rental in filteredSelectedRental"
              :key="rental"
              class="d-flex justify-content-between align-items-center badge border border-gray my-1 py-1"
            >
              <span>
                {{ rental.vehicle.brand }}
                {{ rental.vehicle.model }}
                ({{ rental.vehicle.licenseNo }})
              </span>
              <button
                @click="removeSelectedRental(rental._id, rental.vehicle._id)"
                class="btn p-0 px-2 m-0 text-danger"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
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

        <AppButton
          type="submit"
          text="Place Booking"
          class="btn-block"
          :loading="loading"
          :disabled="loading"
        />
      </form>
    </div>
  </div>
</template>
