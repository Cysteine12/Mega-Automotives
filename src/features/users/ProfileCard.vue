<script setup>
import { ref } from 'vue'
import { formatDate } from '@/utils/dateFormatter'
import { useUserStore } from '@/stores/userStore'
import handleFileChange from '@/composables/handleFileChange'
import { hasOwnPermission } from '@/utils/permissions'

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
})

const userStore = useUserStore()

const user = ref(props.user)
const fileInput = ref(null)
const loading = ref(false)

const triggerFileInput = () => {
  fileInput.value.click()
}

const handleFileInput = async (e) => {
  loading.value = true
  const file = e.target.files[0]
  const currentFileUrl = userStore.user.photo

  user.value.photo = URL.createObjectURL(file)

  const newFileUrl = await handleFileChange(`users/${user.value._id}`, file, currentFileUrl)

  await userStore.updateProfilePhoto({ photo: newFileUrl })
  loading.value = userStore.loading
}
</script>

<template>
  <div v-if="user" class="d-flex justify-content-center align-items-center">
    <div class="profile-card position-relative">
      <div class="upper">
        <img src="/img/Desert.jpg" class="img-fluid" />
      </div>
      <div v-if="hasOwnPermission(user._id)" class="dropdown no-arrow p-1">
        <a
          class="dropdown-toggle"
          href="#"
          role="button"
          id="dropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i class="fas fa-ellipsis-v fa-sm fa-fw text-white"></i>
        </a>
        <div
          class="dropdown-menu dropdown-menu-right shadow animated--fade-in p-1"
          aria-labelledby="dropdownMenuLink"
        >
          <div class="dropdown-header">Profile Settings:</div>
          <router-link class="dropdown-item small" to="/profile/edit">
            <i class="fas fa-edit"></i> Edit Profile
          </router-link>
          <router-link class="dropdown-item small" to="/profile/change-password">
            <i class="fas fa-key"></i> Change Password
          </router-link>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item small text-danger" data-toggle="modal" data-target="#promptModal">
            <i class="fas fa-trash-alt"></i> Delete Account
          </a>
        </div>
      </div>

      <div class="user text-center">
        <div class="profile-img">
          <div>
            <img :src="user.photo || '/img/user.png'" class="rounded-circle" width="80" />
            <span v-if="loading" class="img-spinner"><i class="fas fa-spinner fa-spin"></i></span>

            <button
              v-if="!loading && hasOwnPermission(user._id)"
              type="button"
              @click="triggerFileInput"
              class="btn badge rounded-circle bg-white text-primary p-1 cursor-pointer"
            >
              <i class="fas fa-camera" aria-hidden="true"></i>
            </button>
            <input
              v-show="false"
              type="file"
              accept="image/*"
              ref="fileInput"
              @change="handleFileInput"
            />
          </div>
        </div>

        <button
          type="button"
          class="profile-btn btn btn-outline btn-icon-split rounded-pill btn-success text-white mr-3 small"
        >
          <span class="icon icon-sm text-50 p-1 pl-2 small">
            <i class="fas fa-check-circle" aria-hidden="true"></i>
          </span>
          <span class="text-capitalize p-1 pr-2">{{ user.role }}</span>
        </button>
      </div>

      <div class="m-4 mt-5">
        <h4 class="mb-2 text-capitalize">
          {{ user.name.firstName + ' ' + user.name.lastName }}
        </h4>

        <div class="bg-gray-100 py-2 px-1 small font-weight-bold">
          <div class="d-flex justify-content-between my-2">
            <span><i class="fas fa-envelope"></i> Email</span>
            <span class="text-primary">{{ user.email }}</span>
          </div>
          <hr class="m-0 p-0" />
          <div class="d-flex justify-content-between my-2">
            <span><i class="fas fa-phone-alt"></i> Phone</span>
            <span class="text-primary">0{{ user.phone }}</span>
          </div>
          <hr class="m-0 p-0" />
          <div class="d-flex justify-content-between my-2">
            <span><i class="fas fa-calendar-alt"></i> Member since</span>
            <span class="text-primary">{{ formatDate(user.createdAt) }}</span>
          </div>
        </div>

        <div class="d-flex justify-content-center align-items-center my-4 px-4 bg-grey">
          <slot name="profile-content"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.img {
  height: 150px;
  width: 150px;
  border-radius: 50%;
  border: 5px solid #4f5ddb;
  display: flex;
  margin: 0 auto;
}

.profile-card {
  width: 380px;
  border: none;
  border-radius: 15px;
  box-shadow: 0px 4px 10px gray;
  background-color: #fff;
  position: relative;
}

.upper {
  height: 100px;
}

.upper img {
  width: 100%;
  height: 100px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.dropdown {
  position: absolute;
  top: 0;
  right: 0;
}

.user {
  position: relative;
}

.profile-img img {
  height: 80px;
  width: 80px;
  margin-top: 2px;
  box-shadow: 0px 4px 10px gray;
}

.profile-img {
  position: absolute;
  top: -50px;
  height: 90px;
  width: 90px;
  border: 3px solid #fff;
  margin-left: 20px;
  border-radius: 50%;
}

.profile-btn {
  position: absolute;
  top: -1.4em; /* - 20px */
  right: 0;
}

.img-spinner {
  position: absolute;
  top: 25%;
  right: 35%;
  font-size: 25px;
  color: #fff;
}

.badge {
  position: absolute;
  bottom: 0;
  right: 0px;
  border-radius: 50%;
  border: 0.1px solid #4f5ddb;
}

.small {
  font-size: 12px;
}
</style>
