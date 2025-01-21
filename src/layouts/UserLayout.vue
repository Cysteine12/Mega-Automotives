<script setup>
import { useAuthStore } from '@/stores/authStore'
import { useCartStore } from '@/stores/cartStore'
import { useNotificationStore } from '@/stores/notificationStore'
import { formatDate } from '@/utils/formatters'
import { onMounted, ref } from 'vue'

const user = ref(null)
const notifications = ref(null)
const cart = ref(null)

const authStore = useAuthStore()
const notificationStore = useNotificationStore()
const cartStore = useCartStore()

onMounted(async () => {
  user.value = authStore.user

  const query = { page: 1, limit: 4 }
  await notificationStore.fetchNotifications(query)
  notifications.value = notificationStore.notifications

  await cartStore.fetchCart()
  cart.value = cartStore.cart
})

const logout = async () => {
  await authStore.logout()
}

const getDate = (datetime) => formatDate(datetime)

const sidebarToggle = async () => {
  var body = document.getElementsByClassName('body-toggle')[0]
  body.classList.toggle('sidebar-toggled')
  var sidebar = document.getElementById('accordionSidebar')
  sidebar.classList.toggle('toggled')
}

const scrollToTop = async () => {
  window.scrollTo(0, 0)
}
</script>

<template>
  <div class="body-toggle">
    <!-- Page Wrapper -->
    <div id="wrapper">
      <!-- Sidebar -->
      <ul
        class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <!-- Sidebar - Brand -->
        <router-link class="sidebar-brand d-flex align-items-center justify-content-center" to="/">
          <div class="sidebar-brand-icon rotate-n-15">
            <i class="fas fa-truck"></i>
          </div>
          <div class="sidebar-brand-text mx-3">Mega Auto</div>
        </router-link>

        <!-- Divider -->
        <hr class="sidebar-divider my-0" />

        <!-- Nav Item - Dashboard -->
        <li class="nav-item active">
          <router-link class="nav-link" to="/dashboard">
            <i class="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </router-link>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider" />

        <!-- Heading -->
        <div class="sidebar-heading">Workshop</div>

        <!-- Nav Item - Services -->
        <li class="nav-item">
          <router-link class="nav-link" to="/services">
            <i class="fas fa-fw fa-table"></i>
            <span>Services</span>
          </router-link>
        </li>

        <!-- Nav Item - Rentals -->
        <li class="nav-item">
          <router-link class="nav-link" to="/rentals">
            <i class="fas fa-fw fa-car"></i>
            <span>Rentals</span>
          </router-link>
        </li>

        <!-- Nav Item - Inventory -->
        <li class="nav-item">
          <router-link class="nav-link" to="/inventories">
            <i class="fas fa-fw fa-cogs"></i>
            <span>Inventory</span>
          </router-link>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider" />

        <!-- Heading -->
        <div class="sidebar-heading">Personals</div>

        <!-- Nav Item - Pages Collapse Menu -->
        <li class="nav-item">
          <a
            class="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapsePages"
            aria-expanded="true"
            aria-controls="collapsePages"
          >
            <i class="fas fa-fw fa-truck"></i>
            <span>My Vehicles</span>
          </a>
          <div
            id="collapsePages"
            class="collapse"
            data-toggle="collapse"
            data-target="#collapsePages"
            aria-labelledby="headingPages"
            data-parent="#accordionSidebar"
          >
            <div class="bg-white py-2 collapse-inner rounded">
              <router-link class="collapse-item" to="/vehicles/create">Add new vehicle</router-link>
              <router-link class="collapse-item" to="/vehicles">View vehicles</router-link>
            </div>
          </div>
        </li>

        <!-- Nav Item - Charts -->
        <li class="nav-item">
          <a
            class="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapseThree"
            aria-expanded="true"
            aria-controls="collapseThree"
          >
            <i class="fas fa-fw fa-clipboard-list"></i>
            <span>My Bookings</span>
          </a>
          <div
            id="collapseThree"
            class="collapse"
            data-toggle="collapse"
            data-target="#collapseThree"
            aria-labelledby="headingThree"
            data-parent="#accordionSidebar"
          >
            <div class="bg-white py-2 collapse-inner rounded">
              <router-link class="collapse-item" to="/bookings/service/create"
                >Book services</router-link
              >
              <router-link class="collapse-item" to="/bookings/rental/create"
                >Rent vehicles</router-link
              >
              <router-link class="collapse-item" to="/bookings">View bookings</router-link>
            </div>
          </div>
        </li>

        <!-- Nav Item - Settings Collapse Menu -->
        <li class="nav-item">
          <a
            class="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            <i class="fas fa-fw fa-cog"></i>
            <span>Settings</span>
          </a>
          <div
            id="collapseTwo"
            class="collapse"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div class="bg-white py-2 collapse-inner rounded">
              <router-link class="collapse-item" to="/profile"> My Profile </router-link>
              <router-link class="collapse-item" to="/"> Notifications </router-link>
              <router-link class="collapse-item" to="/"> My Payments </router-link>
            </div>
          </div>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider d-none d-md-block" />

        <!-- Sidebar Toggler (Sidebar) -->
        <div class="text-center d-none d-md-inline">
          <button
            @click.prevent="sidebarToggle"
            class="rounded-circle border-0"
            id="sidebarToggle"
          ></button>
        </div>
      </ul>
      <!-- End of Sidebar -->

      <!-- Content Wrapper -->
      <div id="content-wrapper" class="d-flex flex-column">
        <!-- Main Content -->
        <div id="content">
          <!-- Topbar -->
          <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <!-- Sidebar Toggle (Topbar) -->
            <button
              @click.prevent="sidebarToggle"
              id="sidebarToggleTop"
              class="btn btn-link d-md-none rounded-circle mr-3"
            >
              <i class="fa fa-bars"></i>
            </button>

            <!-- Topbar Search -->
            <form
              class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search"
            >
              <div class="input-group">
                <input
                  type="text"
                  class="form-control bg-light border-0 small"
                  placeholder="Search for..."
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                />
                <div class="input-group-append">
                  <button class="btn btn-primary" type="button">
                    <i class="fas fa-search fa-sm"></i>
                  </button>
                </div>
              </div>
            </form>

            <!-- Topbar Navbar -->
            <ul class="navbar-nav ml-auto">
              <!-- Nav Item - Search Dropdown (Visible Only XS) -->
              <li class="nav-item dropdown no-arrow d-sm-none">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="searchDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i class="fas fa-search fa-fw"></i>
                </a>
                <!-- Dropdown - Messages -->
                <div
                  class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                  aria-labelledby="searchDropdown"
                >
                  <form class="form-inline mr-auto w-100 navbar-search">
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control bg-light border-0 small"
                        placeholder="Search for..."
                        aria-label="Search"
                        aria-describedby="basic-addon2"
                      />
                      <div class="input-group-append">
                        <button class="btn btn-primary" type="button">
                          <i class="fas fa-search fa-sm"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </li>

              <!-- Nav Item - Alerts -->
              <li v-if="notifications" class="nav-item dropdown no-arrow mx-1">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="alertsDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i class="fas fa-bell fa-fw"></i>
                  <!-- Counter - Alerts -->
                  <span class="badge badge-danger badge-counter">{{ notifications.length }}+</span>
                </a>
                <!-- Dropdown - Alerts -->
                <div
                  class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                  aria-labelledby="alertsDropdown"
                >
                  <h6 class="dropdown-header">Notification Alerts</h6>
                  <router-link
                    v-for="notification in notifications"
                    :key="notification._id"
                    :to="notification.link"
                    class="dropdown-item d-flex align-items-center"
                  >
                    <div class="mr-3">
                      <div class="icon-circle bg-primary">
                        <i class="fas fa-file-alt text-white"></i>
                      </div>
                    </div>
                    <div>
                      <div class="small text-gray-500">{{ getDate(notification.createdAt) }}</div>
                      <span :class="{ 'font-weight-bold': notification.status === 'unread' }">
                        {{ notification.title }}
                      </span>
                    </div>
                  </router-link>
                  <router-link class="dropdown-item text-center small text-gray-500" to="/">
                    Show All Alerts
                  </router-link>
                </div>
              </li>

              <!-- Nav Item - Cart -->
              <li v-if="cart" class="nav-item dropdown no-arrow mx-1">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="messagesDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i class="fas fa-shopping-cart fa-fw"></i>
                  <!-- Counter - Messages -->
                  <span class="badge badge-danger badge-counter">{{ cart.items.length }}</span>
                </a>
                <!-- Dropdown - Messages -->
                <div
                  class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                  aria-labelledby="messagesDropdown"
                >
                  <h6 class="dropdown-header">Inventory Cart</h6>
                  <router-link
                    v-for="item in cart.items"
                    :key="item.index"
                    class="dropdown-item d-flex align-items-center justify-content-between"
                    to="/"
                  >
                    <div class="d-flex">
                      <div class="dropdown-list-image mr-3">
                        <img class="rounded-circle" :src="item.inventory.thumbnail" />
                        <div
                          class="status-indicator"
                          :class="`${item.inventory.status === 'Available' ? 'bg-success' : 'bg-danger'}`"
                        ></div>
                      </div>
                      <div>
                        <div>{{ item.inventory.name }}</div>
                        <div class="small text-gray-500">
                          {{ item.inventory.category }} · ${{ item.inventory.price }}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div v-if="item.inventory.status === 'Available'">
                        {{ item.quantity }}
                      </div>
                      <button v-else class="btn btn-danger btn-icon-split btn-sm" disabled>
                        <span class="icon icon-sm text-white-50 small">
                          <i class="fas fa-exclamation-triangle"></i>
                        </span>
                        <span class="text small">{{ item.inventory.status }}</span>
                      </button>
                    </div>
                  </router-link>
                  <router-link class="dropdown-item text-center small font-weight-bold" to="/">
                    <i class="fas fa-sign-out-alt fa-sm fa-fw"></i>
                    Go To Checkout
                  </router-link>
                </div>
              </li>

              <div class="topbar-divider d-none d-sm-block"></div>

              <!-- Nav Item - User Information -->
              <li v-if="user" class="nav-item dropdown no-arrow">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span class="mr-2 d-none d-lg-inline text-gray-600 small">
                    {{ user.name.firstName + ' ' + user.name.lastName }}
                  </span>
                  <img class="img-profile rounded-circle" :src="user.photo || 'img/user.png'" />
                </a>
                <!-- Dropdown - User Information -->
                <div
                  class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                  aria-labelledby="userDropdown"
                >
                  <router-link class="dropdown-item" to="/profile">
                    <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                    Profile
                  </router-link>
                  <router-link class="dropdown-item" to="/">
                    <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                    Settings
                  </router-link>
                  <router-link class="dropdown-item" to="/">
                    <i class="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                    Activity Log
                  </router-link>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                    <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                    Logout
                  </a>
                </div>
              </li>
            </ul>
          </nav>
          <!-- End of Topbar -->

          <!-- Begin Page Content -->
          <div class="container-fluid">
            <router-view></router-view>
          </div>
          <!-- /.container-fluid -->
        </div>
        <!-- End of Main Content -->

        <!-- Footer -->
        <footer class="sticky-footer bg-white">
          <div class="container my-auto">
            <div class="copyright text-center my-auto">
              <span>Copyright &copy; Your Website 2021</span>
            </div>
          </div>
        </footer>
        <!-- End of Footer -->
      </div>
      <!-- End of Content Wrapper -->
    </div>
    <!-- End of Page Wrapper -->

    <!-- Scroll to Top Button-->
    <a @click.prevent="scrollToTop" class="scroll-to-top rounded" href="#page-top">
      <i class="fas fa-angle-up"></i>
    </a>

    <!-- Logout Modal-->
    <div
      class="modal fade"
      id="logoutModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            Select "Logout" below if you are ready to end your current session.
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
            <button @click="logout" class="btn btn-primary" type="button">Logout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn-xsm {
  padding: 0.25rem;
  font-size: 0.5rem;
}
</style>
