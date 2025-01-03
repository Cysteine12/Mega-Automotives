<script setup>
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { formatDate } from '@/utils/formatters'

const authStore = useAuthStore()

const user = ref(null)

onMounted(async () => {
  user.value = authStore.user
})
</script>

<template>
  <div v-if="user" class="d-flex justify-content-center align-items-center">
    <div class="profile-card position-relative">
      <div class="upper">
        <img src="/img/Desert.jpg" class="img-fluid" />
      </div>
      <div class="dropdown no-arrow p-1">
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
          <router-link class="dropdown-item small text-danger" to="/">
            <i class="fas fa-trash-alt"></i> Delete Account
          </router-link>
        </div>
      </div>

      <div class="user text-center">
        <div class="profile-img">
          <div>
            <img :src="user.photo" class="rounded-circle" width="80" />
            <span class="badge rounded-circle bg-white text-primary p-1">
              <i class="fas fa-images small" aria-hidden="true"></i>
            </span>
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
  top: -20px;
  right: 0;
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
