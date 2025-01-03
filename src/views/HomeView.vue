<script setup>
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const services = [
  {
    title: 'Auto Repair',
    description: 'Expert repair services to keep your car running smoothly.',
  },
  { title: 'Car Wash', description: 'Professional cleaning for a sparkling finish.' },
  { title: 'Body Shop', description: 'Restoration and cosmetic services for your vehicle.' },
]
const rentals = [
  { title: 'Economy Cars', description: 'Affordable and efficient vehicles for daily use.' },
  {
    title: 'Luxury Cars',
    description: 'Premium vehicles for special occasions or business needs.',
  },
]

const user = ref(null)

onMounted(async () => {
  const authStore = useAuthStore()

  user.value = authStore.user
})
</script>

<template>
  <main>
    <div>
      <!-- Navigation Bar -->
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
          <a class="navbar-brand" href="#">AutoCare Co.</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <a class="nav-link" href="#services">Services</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#rentals">Rentals</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#login">Login</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#dashboard">Dashboard</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <!-- Hero Section -->
      <header class="bg-primary text-white text-center py-5">
        <div class="container">
          <h1>Welcome to AutoCare Co.</h1>
          <p>Your one-stop solution for vehicle services, rentals, and more!</p>
          <a href="#services" class="btn btn-light btn-lg mt-3">Explore Services</a>
        </div>
      </header>

      <!-- Services Section -->
      <section id="services" class="py-5">
        <div class="container">
          <h2 class="text-center mb-4">Our Services</h2>
          <div class="row">
            <div class="col-md-4 mb-3" v-for="service in services" :key="service.title">
              <div class="card">
                <div class="card-body text-center">
                  <h5 class="card-title">{{ service.title }}</h5>
                  <p class="card-text">{{ service.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Rentals Section -->
      <section id="rentals" class="bg-light py-5">
        <div class="container">
          <h2 class="text-center mb-4">Vehicle Rentals</h2>
          <p class="text-center">Find the perfect rental car for your needs.</p>
          <div class="row">
            <div class="col-md-6 mb-3" v-for="rental in rentals" :key="rental.title">
              <div class="card">
                <div class="card-body text-center">
                  <h5 class="card-title">{{ rental.title }}</h5>
                  <p class="card-text">{{ rental.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Login Section -->
      <section id="login" class="py-5">
        <div class="container">
          <h2 class="text-center mb-4">Login</h2>
          <div class="row justify-content-center">
            <div class="col-md-6">
              <form>
                <div class="mb-3">
                  <label for="email" class="form-label">Email address</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    placeholder="Enter your email"
                  />
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    placeholder="Enter your password"
                  />
                </div>
                <button type="submit" class="btn btn-primary w-100">Login</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <!-- Dashboard Section -->
      <section id="dashboard" class="bg-dark text-white py-5">
        <div class="container">
          <h2 class="text-center mb-4">Dashboard</h2>
          <p class="text-center">Access personalized insights and manage your account here.</p>
          <div class="text-center">
            <a href="#" class="btn btn-light">Go to Dashboard</a>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="bg-dark text-white text-center py-3">
        <div class="container">
          <p>&copy; 2024 AutoCare Co. All rights reserved.</p>
        </div>
      </footer>
    </div>
  </main>
</template>

<style scoped>
header {
  background: url('https://via.placeholder.com/1920x600') center/cover no-repeat;
}
</style>
