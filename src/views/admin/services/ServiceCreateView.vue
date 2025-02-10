<script setup>
import { ref } from 'vue'
import { useServiceStore } from '@/stores/serviceStore'
import { useUserStore } from '@/stores/userStore'
import AppHeading from '@/components/AppHeading.vue'
import AppButton from '@/components/AppButton.vue'
import AppInputFileBox from '@/components/AppInputFileBox.vue'
import SubserviceForm from '@/features/services/SubserviceForm.vue'
import handleFileChange from '@/composables/handleFileChange'

const serviceStore = useServiceStore()
const userStore = useUserStore()

const formData = ref({
  category: null,
  description: null,
  thumbnail: null,
  subservices: [],
})
const loading = ref(false)

const handleFileEmit = (files) => {
  formData.value.thumbnail = files[0]
}

const addSubservice = () => {
  const lastSubserviceId =
    formData.value.subservices.length > 0
      ? formData.value.subservices[formData.value.subservices.length - 1].id
      : 0

  formData.value.subservices.push({
    id: lastSubserviceId + 1,
    name: null,
    description: null,
    price: null,
    duration: null,
    thumbnail: null,
    images: null,
  })
  return
}

const handleSubserviceFormEmit = (subserviceId, newSubservice) => {
  formData.value.subservices = formData.value.subservices.map((subservice) => {
    if (subservice.id === subserviceId) {
      subservice = { id: subserviceId, ...newSubservice }
    }

    return subservice
  })
}

const removeSelectedSubservice = (subserviceId) => {
  formData.value.subservices = formData.value.subservices.filter(
    (subservice) => subservice.id !== subserviceId,
  )
}

const handleSubmit = async () => {
  loading.value = true
  formData.value.subservices = formData.value.subservices.map(async (subservice) => {
    return await handleFileChange(userStore.user._id, subservice.thumbnail)
  })

  formData.value.thumbnail = await handleFileChange(userStore.user._id, formData.value.thumbnail)

  await serviceStore.createService(formData.value)
  loading.value = serviceStore.loading
}
</script>

<template>
  <main>
    <AppHeading title="Create New Service" />

    <div class="row">
      <div class="col-lg-6">
        <div class="card">
          <div class="card-header">
            <h6 class="text-primary font-weight-bold">Add new Service</h6>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleSubmit">
              <div class="form-group">
                <label for="serviceCategory" class="form-label text-primary">
                  Service Category*
                </label>
                <input
                  type="text"
                  v-model="formData.category"
                  class="form-control"
                  id="serviceCategory"
                  required
                />
              </div>

              <div class="form-group">
                <label for="fileInputField" class="form-label text-primary">
                  Select Service Thumbnail*
                </label>
                <AppInputFileBox
                  :photos="formData.thumbnail ? [formData.thumbnail] : []"
                  :isRequired="true"
                  @fileInput="handleFileEmit"
                />
              </div>

              <div class="form-group">
                <label for="description" class="form-label text-primary">
                  Describe Service Category*
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

              <br />

              <div v-for="subservice in formData.subservices" :key="subservice.id">
                <SubserviceForm
                  @handleFormEmit="
                    (newSubservice) => handleSubserviceFormEmit(subservice.id, newSubservice)
                  "
                  @handleRemoveEmit="removeSelectedSubservice(subservice.id)"
                />
              </div>

              <AppButton @click="addSubservice" class="my-2">
                <i class="fas fa-plus mr-1"></i>Add Subservice
              </AppButton>

              <div class="d-flex justify-content-end my-2">
                <AppButton @click="handleSubmit" text="Add Service" :isDisabled="loading" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
