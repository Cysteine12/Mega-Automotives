<script setup>
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import AppFooter from '@/components/AppFooter.vue'
import AppButton from '@/components/AppButton.vue'
import { useServiceStore } from '@/stores/serviceStore'
import { useInventoryStore } from '@/stores/inventoryStore'
import { useRentalStore } from '@/stores/rentalStore'

const serviceStore = useServiceStore()
const inventoryStore = useInventoryStore()
const authStore = useAuthStore()
const rentalStore = useRentalStore()

const user = ref(null)
const services = ref(null)
const inventories = ref(null)
const rentals = ref(null)

onMounted(async () => {
  const query = { page: 1, limit: 12 }
  user.value = authStore.user

  await serviceStore.fetchServices()
  services.value = serviceStore.services

  await inventoryStore.fetchInventories(query)
  inventories.value = inventoryStore.inventories

  await rentalStore.fetchRentals({ page: 1, limit: 4 })
  rentals.value = rentalStore.rentals
})

/**
 * Sticky Header on Scroll
 */
const selectHeader = document.querySelector('#header')
if (selectHeader) {
  let headerOffset = selectHeader.offsetTop
  let nextElement = selectHeader.nextElementSibling

  const headerFixed = () => {
    if (headerOffset - window.scrollY <= 0) {
      selectHeader.classList.add('sticked')
      if (nextElement) nextElement.classList.add('sticked-header-offset')
    } else {
      selectHeader.classList.remove('sticked')
      if (nextElement) nextElement.classList.remove('sticked-header-offset')
    }
  }
  window.addEventListener('load', headerFixed)
  document.addEventListener('scroll', headerFixed)
}

/**
 * Navbar links active state on scroll
 */
let navbarlinks = document.querySelectorAll('#navbar a')

function navbarlinksActive() {
  navbarlinks.forEach((navbarlink) => {
    if (!navbarlink.hash) return

    let section = document.querySelector(navbarlink.hash)
    if (!section) return

    let position = window.scrollY + 200

    if (position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight) {
      navbarlink.classList.add('active')
    } else {
      navbarlink.classList.remove('active')
    }
  })
}
window.addEventListener('load', navbarlinksActive)
document.addEventListener('scroll', navbarlinksActive)

/**
 * Mobile nav toggle
 */
const mobileNavShow = document.querySelector('.mobile-nav-show')
const mobileNavHide = document.querySelector('.mobile-nav-hide')

const toggleMenu = (e) => {
  console.log('iran')
  e.preventDefault()
  mobileNavToogle()
}

document.querySelectorAll('.mobile-nav-toggle').forEach((el) => {
  el.addEventListener('click', function (event) {
    console.log('iran')
    event.preventDefault()
    mobileNavToogle()
  })
})

function mobileNavToogle() {
  document.querySelector('body').classList.toggle('mobile-nav-active')
  mobileNavShow.classList.toggle('d-none')
  mobileNavHide.classList.toggle('d-none')
}

/**
 * Hide mobile nav on same-page/hash links
 */
document.querySelectorAll('#navbar a').forEach((navbarlink) => {
  if (!navbarlink.hash) return

  let section = document.querySelector(navbarlink.hash)
  if (!section) return

  navbarlink.addEventListener('click', () => {
    if (document.querySelector('.mobile-nav-active')) {
      mobileNavToogle()
    }
  })
})
</script>

<template>
  <main>
    <header id="header" class="header d-flex align-items-center">
      <div class="container-fluid container-xl d-flex align-items-center justify-content-between">
        <router-link to="/" class="logo d-flex align-items-center">
          <!-- Uncomment the line below if you also wish to use an image logo -->
          <img src="/megaautomotives.webp" alt="" />
          <h1>Mega-Auto<span>.</span></h1>
        </router-link>
        <nav id="navbar" class="navbar">
          <ul>
            <li><router-link to="/">Home</router-link></li>

            <li v-if="!user" class="rounded-pill">
              <router-link to="/login"><AppButton text="Login" /></router-link>
            </li>
            <li v-else>
              <router-link to="/dashboard"><b>Dashboard</b></router-link>
            </li>
          </ul>
        </nav>
        <!-- .navbar -->

        <span @click="toggleMenu" class="mobile-nav-toggle mobile-nav-show"
          ><i class="fas fa-bars"></i
        ></span>

        <span @click="toggleMenu" class="mobile-nav-toggle mobile-nav-hide d-none"
          ><i class="fas fa-times"></i
        ></span>
      </div>
    </header>
    <!-- End Header -->
    <!-- End Header -->

    <!-- ======= Hero Section ======= -->
    <section id="hero" class="hero">
      <div class="container position-relative">
        <div class="row gy-5">
          <div
            class="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center text-center text-lg-start"
          >
            <h2>Welcome to <span>Mega-Automotives</span></h2>
            <p>
              We provide vehicle repair services and rentals all across the country at your
              disposal.
            </p>
            <div class="d-flex justify-content-center justify-content-lg-start">
              <router-link to="/login" class="btn-get-started">Get Started</router-link>
              <!-- <a
                to="https://www.youtube.com"
                class="glightbox btn-watch-video d-flex align-items-center"
                ><i class="fas fa-play-circle"></i><span>Watch Video</span></a
              > -->
            </div>
          </div>
          <div class="col-lg-6 order-1 order-lg-2">
            <img src="/home-imgs/hero-img.svg" class="img-fluid" alt="" />
          </div>
        </div>
      </div>

      <div class="icon-boxes position-relative">
        <div class="container position-relative">
          <div class="row gy-4 mt-5">
            <div class="col-xl-3 col-md-6">
              <div class="icon-box">
                <div class="icon"><i class="fas fa-gem"></i></div>
                <h4 class="title">
                  <router-link to="" class="stretched-link">Reliable</router-link>
                </h4>
              </div>
            </div>
            <!--End Icon Box -->

            <div class="col-xl-3 col-md-6">
              <div class="icon-box">
                <div class="icon"><i class="fas fa-dollar-sign"></i></div>
                <h4 class="title">
                  <router-link to="" class="stretched-link">Cost-Effective</router-link>
                </h4>
              </div>
            </div>
            <!--End Icon Box -->

            <div class="col-xl-3 col-md-6">
              <div class="icon-box">
                <div class="icon"><i class="fas fa-clock"></i></div>
                <h4 class="title">
                  <router-link to="" class="stretched-link">Quick Service</router-link>
                </h4>
              </div>
            </div>
            <!--End Icon Box -->

            <div class="col-xl-3 col-md-6">
              <div class="icon-box">
                <div class="icon"><i class="fas fa-star"></i></div>
                <h4 class="title">
                  <router-link to="" class="stretched-link">Quality</router-link>
                </h4>
              </div>
            </div>
            <!--End Icon Box -->
          </div>
        </div>
      </div>
    </section>
    <!-- End Hero Section -->

    <main id="main">
      <!-- ======= About Us Section ======= -->
      <section id="about" class="about">
        <div class="container">
          <div class="section-header">
            <h2>About Us</h2>
            <p>
              At Mega-Automotives, we go beyond fixing cars – we build lasting relationships with
              our customers by providing trustworthy and efficient services.
            </p>
          </div>

          <div class="row gy-4">
            <div class="col-lg-6">
              <h3>Visit us today and experience automotive care like never before!</h3>
              <img src="/home-imgs/tech2.webp" class="img-fluid rounded-4 mb-4" alt="" />
              <p class="fst-italic">Our Services:</p>
              <p>
                ✔ Auto Repair & Maintenance – From routine oil changes to complex engine repairs,
                our skilled technicians ensure your vehicle remains in peak condition. We specialize
                in brake repairs, engine diagnostics, bodywork, painting, and more.
                <br />
                ✔ Parts Sales on Order – Need a specific part for your car? We offer a wide range
                of high-quality spare parts sourced from trusted suppliers. Simply place an order,
                and we’ll ensure timely delivery.
                <br />

                ✔ Vehicle Rentals – Whether you need a car for a business trip or a temporary
                replacement while yours is in service, our affordable and well-maintained rental
                fleet is at your service.
              </p>
            </div>
            <div class="col-lg-6">
              <div class="content ps-0 ps-lg-5">
                <p class="fst-italic">Why Choose Us?</p>
                <ul>
                  <li>
                    <i class="fas fa-check-circle"></i> Expert Technicians – Our team is trained to
                    handle all makes and models with precision.
                  </li>
                  <li>
                    <i class="fas fa-check-circle"></i> Genuine Parts – We supply only high-quality,
                    original parts for reliability and durability.
                  </li>
                  <li>
                    <i class="fas fa-check-circle"></i> Customer-Centric Service – Your satisfaction
                    is our priority, and we strive to provide seamless experiences from repairs to
                    rentals.
                  </li>
                  <li>
                    <i class="fas fa-check-circle"></i> Competitive Pricing – Get premium automotive
                    solutions at affordable rates.
                  </li>
                </ul>
                <p>
                  At Mega-Automotives, we are committed to keeping you on the road with top-quality
                  automotive repair services, parts sales, and vehicle rentals. With a team of
                  experienced professionals and a passion for excellence, we provide reliable
                  solutions tailored to meet your vehicle’s needs.
                </p>

                <div class="position-relative mt-4">
                  <img src="/home-imgs/about-2.jpg" class="img-fluid rounded-4" alt="" />
                  <router-link
                    to="https://www.youtube.com/watch?v=LXb3EKWsInQ"
                    class="glightbox play-btn"
                  ></router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- End About Us Section -->

      <!-- ======= Stats Counter Section ======= -->
      <section id="stats-counter" class="stats-counter">
        <div class="container">
          <div class="row gy-4 align-items-center">
            <div class="col-lg-6">
              <img src="/home-imgs/stats-img.svg" alt="" class="img-fluid" />
            </div>

            <div class="col-lg-6">
              <div class="stats-item d-flex align-items-center">
                <span class="purecounter">232</span>
                <p><strong>Happy Clients</strong> - our goal</p>
              </div>
              <!-- End Stats Item -->

              <div class="stats-item d-flex align-items-center">
                <span class="purecounter">521</span>
                <p><strong>Rentals</strong> - with good reviews and feedback</p>
              </div>
              <!-- End Stats Item -->

              <div class="stats-item d-flex align-items-center">
                <span class="purecounter">453</span>
                <p><strong>Hours Of Services</strong> - at the best quotes possible</p>
              </div>
              <!-- End Stats Item -->
            </div>
          </div>
        </div>
      </section>
      <!-- End Stats Counter Section -->

      <!-- ======= Call To Action Section ======= -->
      <section id="call-to-action" class="call-to-action">
        <div class="container text-center">
          <router-link to="https://www.youtube.com" class="glightbox play-btn"></router-link>
          <h3>Call To Action</h3>
          <p>Visit us today and experience automotive care like never before!</p>
          <router-link class="cta-btn" to="/login">Call To Action</router-link>
        </div>
      </section>
      <!-- End Call To Action Section -->

      <!-- ======= Our Services Section ======= -->
      <section id="services" class="services sections-bg">
        <div class="container">
          <div class="section-header">
            <h2>Our Services</h2>
            <p>
              We offer different range of services for Auto Repair & Maintenance – From routine oil
              changes to complex engine repairs, our skilled technicians ensure your vehicle remains
              in peak condition. We specialize in brake repairs, engine diagnostics, bodywork,
              painting, and more.
            </p>
          </div>

          <div v-if="services" class="row gy-4">
            <div v-for="service in services" :key="service._id" class="col-lg-4">
              <div class="my-2 service-item position-relative">
                <div class="card-img-wrapper">
                  <img :src="service.thumbnail" class="img-fluid" alt="service thumbnail" />
                </div>
                <h3>{{ service.category }}</h3>
                <p>
                  {{ service.description }}
                </p>
                <router-link :to="`/services/${service.category}`" class="readmore stretched-link"
                  >Read more <i class="fas fa-arrow-right"></i
                ></router-link>
              </div>
            </div>
            <!-- End Service Item -->
          </div>
        </div>
      </section>
      <!-- End Our Services Section -->

      <!-- ======= Inventory Section ======= -->
      <section id="portfolio" class="portfolio sections-bg">
        <div class="container">
          <div class="section-header">
            <h2>Inventory Store</h2>
            <p>
              Need a specific part for your vehicle? We offer a wide range of high-quality spare
              parts sourced from trusted suppliers. Simply place an order, and we’ll ensure timely
              delivery.
            </p>
          </div>

          <div v-if="inventories" class="portfolio-isotope">
            <div class="row gy-4 portfolio-container">
              <div
                v-for="inventory in inventories"
                :key="inventory._id"
                class="col-xl-4 col-md-6 portfolio-item filter-app"
              >
                <div class="mx-auto mb-4 portfolio-wrap">
                  <router-link
                    :to="`/inventories/${inventory._id}`"
                    data-gallery="portfolio-gallery-app"
                    class="glightbox"
                  >
                    <div class="card-img-wrapper">
                      <img
                        :src="inventory.thumbnail"
                        class="img-fluid"
                        alt="Inventory item thumbnail"
                      />
                    </div>
                  </router-link>
                  <div class="py-2 px-1 portfolio-info">
                    <h4 class="d-flex justify-content-between">
                      <router-link :to="`/inventories/${inventory._id}`" title="More Details">{{
                        inventory.name
                      }}</router-link>
                      <div>${{ inventory.price }}</div>
                    </h4>
                    <p class="text-truncate">{{ inventory.description }}</p>
                  </div>
                </div>
              </div>
              <!-- End Portfolio Item -->
            </div>
            <!-- End Portfolio Container -->
          </div>
        </div>
      </section>
      <!-- End Portfolio Section -->

      <!-- ======= Our Rental Section ======= -->
      <section id="team" class="team">
        <div class="container">
          <div class="section-header">
            <h2>Available for Rentals</h2>
            <p>
              Whether you need a car for a business trip or a temporary replacement while yours is
              in service, our affordable and well-maintained rental fleet is at your service.
            </p>
          </div>

          <div v-if="rentals" class="row gy-4">
            <div v-for="rental in rentals" :key="rental._id" class="col-xl-3 col-md-6 d-flex">
              <div class="member">
                <img :src="rental.thumbnail" class="img-fluid" alt="" />
                <h4>{{ rental.vehicle.brand }} {{ rental.vehicle.model }}</h4>
                <span class="text-truncate">{{ rental.description }}</span>
                <div class="social">
                  <router-link :to="`/rentals/${rental._id}`"
                    >${{ rental.price.perHour }}</router-link
                  >
                  <router-link to="">${{ rental.price.perDay }}</router-link>
                  <router-link to="">${{ rental.price.perWeek }}</router-link>
                  <router-link to=""><i class="fas fa-linkedin"></i></router-link>
                </div>
              </div>
            </div>
            <!-- End Team Member -->
          </div>
        </div>
      </section>
      <!-- End Our Team Section -->

      <!-- ======= Pricing Section ======= -->
      <!-- <section id="pricing" class="pricing sections-bg">
        <div class="container">
          <div class="section-header">
            <h2>Pricing</h2>
            <p>
              Aperiam dolorum et et wuia molestias qui eveniet numquam nihil porro incidunt dolores
              placeat sunt id nobis omnis tiledo stran delop
            </p>
          </div>

          <div class="row g-4 py-lg-5">
            <div class="col-lg-4">
              <div class="pricing-item">
                <h3>Free Plan</h3>
                <div class="icon">
                  <i class="fas fa-box"></i>
                </div>
                <h4><sup>$</sup>0<span> / month</span></h4>
                <ul>
                  <li><i class="fas fa-check"></i> Quam adipiscing vitae proin</li>
                  <li><i class="fas fa-check"></i> Nec feugiat nisl pretium</li>
                  <li><i class="fas fa-check"></i> Nulla at volutpat diam uteera</li>
                  <li class="na">
                    <i class="fas fa-x"></i> <span>Pharetra massa massa ultricies</span>
                  </li>
                  <li class="na">
                    <i class="fas fa-x"></i> <span>Massa ultricies mi quis hendrerit</span>
                  </li>
                </ul>
                <div class="text-center">
                  <router-link to="#" class="buy-btn">Buy Now</router-link>
                </div>
              </div>
            </div>

            <div class="col-lg-4">
              <div class="pricing-item featured">
                <h3>Business Plan</h3>
                <div class="icon">
                  <i class="fas fa-airplane"></i>
                </div>

                <h4><sup>$</sup>29<span> / month</span></h4>
                <ul>
                  <li><i class="fas fa-check"></i> Quam adipiscing vitae proin</li>
                  <li><i class="fas fa-check"></i> Nec feugiat nisl pretium</li>
                  <li><i class="fas fa-check"></i> Nulla at volutpat diam uteera</li>
                  <li><i class="fas fa-check"></i> Pharetra massa massa ultricies</li>
                  <li><i class="fas fa-check"></i> Massa ultricies mi quis hendrerit</li>
                </ul>
                <div class="text-center">
                  <router-link to="#" class="buy-btn">Buy Now</router-link>
                </div>
              </div>
            </div>

            <div class="col-lg-4">
              <div class="pricing-item">
                <h3>Developer Plan</h3>
                <div class="icon">
                  <i class="fas fa-send"></i>
                </div>
                <h4><sup>$</sup>49<span> / month</span></h4>
                <ul>
                  <li><i class="fas fa-check"></i> Quam adipiscing vitae proin</li>
                  <li><i class="fas fa-check"></i> Nec feugiat nisl pretium</li>
                  <li><i class="fas fa-check"></i> Nulla at volutpat diam uteera</li>
                  <li><i class="fas fa-check"></i> Pharetra massa massa ultricies</li>
                  <li><i class="fas fa-check"></i> Massa ultricies mi quis hendrerit</li>
                </ul>
                <div class="text-center">
                  <router-link to="#" class="buy-btn">Buy Now</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> -->
      <!-- End Pricing Section -->

      <!-- ======= Contact Section ======= -->
      <section id="contact" class="contact">
        <div class="container">
          <div class="section-header">
            <h2>Contact</h2>
            <p>
              Nulla dolorum nulla nesciunt rerum facere sed ut inventore quam porro nihil id ratione
              ea sunt quis dolorem dolore earum
            </p>
          </div>

          <div class="row gx-lg-0 gy-4">
            <div class="col-lg-4">
              <div
                class="info-container d-flex flex-column align-items-center justify-content-center"
              >
                <div class="info-item d-flex">
                  <i class="fas fa-map-marker flex-shrink-0"></i>
                  <div>
                    <h4>Location:</h4>
                    <p>A108 Adam Street, New York, NY 535022</p>
                  </div>
                </div>
                <!-- End Info Item -->

                <div class="info-item d-flex">
                  <i class="fas fa-envelope flex-shrink-0"></i>
                  <div>
                    <h4>Email:</h4>
                    <p>info@example.com</p>
                  </div>
                </div>
                <!-- End Info Item -->

                <div class="info-item d-flex">
                  <i class="fas fa-phone flex-shrink-0"></i>
                  <div>
                    <h4>Call:</h4>
                    <p>+1 5589 55488 55</p>
                  </div>
                </div>
                <!-- End Info Item -->

                <div class="info-item d-flex">
                  <i class="fas fa-clock flex-shrink-0"></i>
                  <div>
                    <h4>Open Hours:</h4>
                    <p>Mon-Sat: 11AM - 23PM</p>
                  </div>
                </div>
                <!-- End Info Item -->
              </div>
            </div>

            <div class="col-lg-8">
              <form class="php-email-form">
                <div class="row">
                  <div class="col-md-6 form-group">
                    <input
                      type="text"
                      name="name"
                      class="form-control"
                      id="name"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div class="col-md-6 form-group mt-3 mt-md-0">
                    <input
                      type="email"
                      class="form-control"
                      name="email"
                      id="email"
                      placeholder="Your Email"
                      required
                    />
                  </div>
                </div>
                <div class="form-group mt-3">
                  <input
                    type="text"
                    class="form-control"
                    name="subject"
                    id="subject"
                    placeholder="Subject"
                    required
                  />
                </div>
                <div class="form-group mt-3">
                  <textarea
                    class="form-control"
                    name="message"
                    rows="7"
                    placeholder="Message"
                    required
                  ></textarea>
                </div>
                <div class="my-3">
                  <div class="loading">Loading</div>
                  <div class="error-message"></div>
                  <div class="sent-message">Your message has been sent. Thank you!</div>
                </div>
                <div class="text-center"><button type="submit">Send Message</button></div>
              </form>
            </div>
            <!-- End Contact Form -->
          </div>
        </div>
      </section>
      <!-- End Contact Section -->
    </main>
    <!-- End #main -->

    <!-- ======= Footer ======= -->
    <AppFooter />

    <router-link to="#" class="scroll-top d-flex align-items-center justify-content-center"
      ><i class="fas fa-arrow-up-short"></i
    ></router-link>
  </main>
</template>

<style scoped>
:root {
  --color-default: #222222;
  --color-primary: #008374;
  --color-secondary: #f85a40;
}

img {
  border-radius: 10px;
}

main {
  color: #222222;
}

a {
  color: #008374;
  text-decoration: none;
}

a:hover {
  color: #00b6a1;
  text-decoration: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--font-primary);
}

.header {
  transition: all 0.5s;
  z-index: 997;
  height: 90px;
  background-color: #008374;
}

.header.sticked {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 70px;
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.1);
}

.header .logo img {
  max-height: 40px;
  margin-right: 6px;
}

.header .logo h1 {
  font-size: 30px;
  margin: 0;
  font-weight: 600;
  letter-spacing: 0.8px;
  color: #fff;
  font-family: var(--font-primary);
}

.header .logo h1 span {
  color: #f96f59;
}

.sticked-header-offset {
  margin-top: 70px;
}

section {
  scroll-margin-top: 70px;
}

/*--------------------------------------------------------------
# Sections & Section Header
--------------------------------------------------------------*/
section {
  padding: 60px 0;
  overflow: hidden;
}

.sections-bg {
  background-color: #f6f6f6;
}

.section-header {
  text-align: center;
  padding-bottom: 60px;
}

.section-header h2 {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 20px;
  padding-bottom: 20px;
  position: relative;
}

.section-header h2:after {
  content: '';
  position: absolute;
  display: block;
  width: 50px;
  height: 3px;
  background: #008374;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

.section-header p {
  margin-bottom: 0;
  color: #6f6f6f;
}

/*--------------------------------------------------------------
# Breadcrumbs
--------------------------------------------------------------*/
.breadcrumbs .page-header {
  padding: 60px 0 60px 0;
  min-height: 20vh;
  position: relative;
  background-color: #008374;
}

.breadcrumbs .page-header h2 {
  font-size: 56px;
  font-weight: 500;
  color: #fff;
  font-family: #f96f59;
}

.breadcrumbs .page-header p {
  color: rgba(255, 255, 255, 0.8);
}

.breadcrumbs nav {
  background-color: #f6f6f6;
  padding: 20px 0;
}

.breadcrumbs nav ol {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 16px;
  font-weight: 600;
  color: #222222;
}

.breadcrumbs nav ol a {
  color: #008374;
  transition: 0.3s;
}

.breadcrumbs nav ol a:hover {
  text-decoration: underline;
}

.breadcrumbs nav ol li + li {
  padding-left: 10px;
}

.breadcrumbs nav ol li + li::before {
  display: inline-block;
  padding-right: 10px;
  color: #f96f59;
  content: '/';
}

@media (min-width: 1280px) {
  .navbar {
    padding: 0;
  }

  .navbar ul {
    margin: 0;
    padding: 0;
    display: flex;
    list-style: none;
    align-items: center;
  }

  .navbar li {
    position: relative;
  }

  .navbar > ul > li {
    white-space: nowrap;
    padding: 10px 0 10px 28px;
  }

  .navbar a,
  .navbar a:focus {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 3px;
    font-family: #f96f59;
    font-size: 16px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.6);
    white-space: nowrap;
    transition: 0.3s;
    position: relative;
  }

  .navbar a i,
  .navbar a:focus i {
    font-size: 12px;
    line-height: 0;
    margin-left: 5px;
  }

  .navbar > ul > li > a:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: -6px;
    left: 0;
    background-color: #f96f59;
    visibility: hidden;
    width: 0px;
    transition: all 0.3s ease-in-out 0s;
  }

  .navbar a:hover:before,
  .navbar li:hover > a:before,
  .navbar .active:before {
    visibility: visible;
    width: 100%;
  }

  .navbar a:hover,
  .navbar .active,
  .navbar .active:focus,
  .navbar li:hover > a {
    color: #fff;
  }

  .navbar .dropdown ul {
    display: block;
    position: absolute;
    left: 28px;
    top: calc(100% + 30px);
    margin: 0;
    padding: 10px 0;
    z-index: 99;
    opacity: 0;
    visibility: hidden;
    background: #fff;
    box-shadow: 0px 0px 30px rgba(127, 137, 161, 0.25);
    transition: 0.3s;
    border-radius: 4px;
  }

  .navbar .dropdown ul li {
    min-width: 200px;
  }

  .navbar .dropdown ul a {
    padding: 10px 20px;
    font-size: 15px;
    text-transform: none;
    font-weight: 600;
    color: #006a5d;
  }

  .navbar .dropdown ul a i {
    font-size: 12px;
  }

  .navbar .dropdown ul a:hover,
  .navbar .dropdown ul .active:hover,
  .navbar .dropdown ul li:hover > a {
    color: #f96f59;
  }

  .navbar .dropdown:hover > ul {
    opacity: 1;
    top: 100%;
    visibility: visible;
  }

  .navbar .dropdown .dropdown ul {
    top: 0;
    left: calc(100% - 30px);
    visibility: hidden;
  }

  .navbar .dropdown .dropdown:hover > ul {
    opacity: 1;
    top: 0;
    left: 100%;
    visibility: visible;
  }
}

@media (min-width: 1280px) and (max-width: 1366px) {
  .navbar .dropdown .dropdown ul {
    left: -90%;
  }

  .navbar .dropdown .dropdown:hover > ul {
    left: -100%;
  }
}

@media (min-width: 1280px) {
  .mobile-nav-show,
  .mobile-nav-hide {
    display: none;
  }
}

/*--------------------------------------------------------------
# Mobile Navigation
--------------------------------------------------------------*/
@media (max-width: 1279px) {
  .navbar {
    position: fixed;
    top: 0;
    right: -100%;
    width: 100%;
    max-width: 400px;
    bottom: 0;
    transition: 0.3s;
    z-index: 9997;
  }

  .navbar ul {
    position: absolute;
    inset: 0;
    padding: 50px 0 10px 0;
    margin: 0;
    background: rgba(0, 131, 116, 0.9);
    overflow-y: auto;
    transition: 0.3s;
    z-index: 9998;
  }

  .navbar a,
  .navbar a:focus {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    font-family: var(--font-primary);
    font-size: 15px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.7);
    white-space: nowrap;
    transition: 0.3s;
  }

  .navbar a i,
  .navbar a:focus i {
    font-size: 12px;
    line-height: 0;
    margin-left: 5px;
  }

  .navbar a:hover,
  .navbar .active,
  .navbar .active:focus,
  .navbar li:hover > a {
    color: #fff;
  }

  .navbar .getstarted,
  .navbar .getstarted:focus {
    background: #008374;
    padding: 8px 20px;
    border-radius: 4px;
    margin: 15px;
    color: #fff;
  }

  .navbar .getstarted:hover,
  .navbar .getstarted:focus:hover {
    color: #fff;
    background: rgba(0, 131, 116, 0.8);
  }

  .navbar .dropdown ul,
  .navbar .dropdown .dropdown ul {
    position: static;
    display: none;
    padding: 10px 0;
    margin: 10px 20px;
    transition: all 0.5s ease-in-out;
    background-color: #007466;
    border: 1px solid #006459;
  }

  .navbar .dropdown > .dropdown-active,
  .navbar .dropdown .dropdown > .dropdown-active {
    display: block;
  }

  .mobile-nav-show {
    color: rgba(255, 255, 255, 0.6);
    font-size: 28px;
    cursor: pointer;
    line-height: 0;
    transition: 0.5s;
    z-index: 9999;
    margin-right: 10px;
  }

  .mobile-nav-hide {
    color: #fff;
    font-size: 32px;
    cursor: pointer;
    line-height: 0;
    transition: 0.5s;
    position: fixed;
    right: 20px;
    top: 20px;
    z-index: 9999;
  }

  .mobile-nav-active {
    overflow: hidden;
  }

  .mobile-nav-active .navbar {
    right: 0;
  }

  .mobile-nav-active .navbar:before {
    content: '';
    position: fixed;
    inset: 0;
    background: rgba(0, 106, 93, 0.8);
    z-index: 9996;
  }
}

.hero {
  width: 100%;
  position: relative;
  background: #008374;
  padding: 60px 0 0 0;
}

@media (min-width: 1365px) {
  .hero {
    background-attachment: fixed;
  }
}

.hero h2 {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #fff;
}

.hero p {
  color: rgba(255, 255, 255, 0.6);
  font-weight: 400;
  margin-bottom: 30px;
}

.hero .btn-get-started {
  font-family: var(--font-primary);
  font-weight: 500;
  font-size: 15px;
  letter-spacing: 1px;
  display: inline-block;
  padding: 14px 40px;
  border-radius: 50px;
  transition: 0.3s;
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.08);
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.hero .btn-get-started:hover {
  border-color: rgba(255, 255, 255, 0.5);
}

.hero .btn-watch-video {
  font-size: 16px;
  transition: 0.5s;
  margin-left: 25px;
  color: #fff;
  font-weight: 600;
}

.hero .btn-watch-video i {
  color: rgba(255, 255, 255, 0.5);
  font-size: 32px;
  transition: 0.3s;
  line-height: 0;
  margin-right: 8px;
}

.hero .btn-watch-video:hover i {
  color: #fff;
}

@media (max-width: 640px) {
  .hero h2 {
    font-size: 36px;
  }

  .hero .btn-get-started,
  .hero .btn-watch-video {
    font-size: 14px;
  }
}

.hero .icon-boxes {
  padding-bottom: 60px;
}

@media (min-width: 1200px) {
  .hero .icon-boxes:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: calc(50% + 20px);
    background-color: #fff;
  }
}

.hero .icon-box {
  padding: 60px 30px;
  position: relative;
  overflow: hidden;
  background: #008d7d;
  box-shadow: 0 0 29px 0 rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease-in-out;
  border-radius: 8px;
  z-index: 1;
  height: 100%;
  width: 100%;
  text-align: center;
}

.hero .icon-box .title {
  font-weight: 700;
  margin-bottom: 15px;
  font-size: 24px;
}

.hero .icon-box .title a {
  color: #fff;
  transition: 0.3s;
}

.hero .icon-box .icon {
  margin-bottom: 20px;
  padding-top: 10px;
  display: inline-block;
  transition: all 0.3s ease-in-out;
  font-size: 48px;
  line-height: 1;
  color: rgba(255, 255, 255, 0.6);
}

.hero .icon-box:hover {
  background: #009786;
}

.hero .icon-box:hover .title a,
.hero .icon-box:hover .icon {
  color: #fff;
}

/*--------------------------------------------------------------
# About Us Section
--------------------------------------------------------------*/
.about h3 {
  font-weight: 700;
  font-size: 28px;
  margin-bottom: 20px;
  font-family: var(--font-secondary);
}

.about .call-us {
  left: 10%;
  right: 10%;
  bottom: 0;
  background-color: #fff;
  box-shadow: 0px 2px 25px rgba(0, 0, 0, 0.08);
  padding: 20px;
  text-align: center;
}

.about .call-us h4 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 5px;
}

.about .call-us p {
  font-size: 28px;
  font-weight: 700;
  color: #008374;
}

.about .content ul {
  list-style: none;
  padding: 0;
}

.about .content ul li {
  padding: 0 0 10px 30px;
  position: relative;
}

.about .content ul i {
  position: absolute;
  font-size: 20px;
  left: 0;
  top: -3px;
  color: #008374;
}

.about .content p:last-child {
  margin-bottom: 0;
}

.about .play-btn {
  width: 94px;
  height: 94px;
  background: radial-gradient(#008374 50%, rgba(0, 131, 116, 0.4) 52%);
  border-radius: 50%;
  display: block;
  position: absolute;
  left: calc(50% - 47px);
  top: calc(50% - 47px);
  overflow: hidden;
}

.about .play-btn:before {
  content: '';
  position: absolute;
  width: 120px;
  height: 120px;
  animation-delay: 0s;
  animation: pulsate-btn 2s;
  animation-direction: forwards;
  animation-iteration-count: infinite;
  animation-timing-function: steps;
  opacity: 1;
  border-radius: 50%;
  border: 5px solid rgba(0, 131, 116, 0.7);
  top: -15%;
  left: -15%;
  background: rgba(198, 16, 0, 0);
}

.about .play-btn:after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-40%) translateY(-50%);
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 15px solid #fff;
  z-index: 100;
  transition: all 400ms cubic-bezier(0.55, 0.055, 0.675, 0.19);
}

.about .play-btn:hover:before {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-40%) translateY(-50%);
  width: 0;
  height: 0;
  border: none;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 15px solid #fff;
  z-index: 200;
  animation: none;
  border-radius: 0;
}

.about .play-btn:hover:after {
  border-left: 15px solid #008374;
  transform: scale(20);
}

@keyframes pulsate-btn {
  0% {
    transform: scale(0.6, 0.6);
    opacity: 1;
  }

  100% {
    transform: scale(1, 1);
    opacity: 0;
  }
}

/*--------------------------------------------------------------
# Stats Counter Section
--------------------------------------------------------------*/
.stats-counter {
  padding: 40px 0;
}

.stats-counter .stats-item {
  padding: 20px 0;
  border-bottom: 1px solid #e4e4e4;
}

.stats-counter .stats-item .purecounter {
  min-width: 90px;
  padding-right: 15px;
}

.stats-counter .stats-item i {
  font-size: 44px;
  line-height: 0;
  margin-right: 15px;
}

.stats-counter .stats-item span {
  font-size: 40px;
  display: block;
  font-weight: 700;
  color: #008374;
  line-height: 40px;
}

.stats-counter .stats-item p {
  margin: 0;
  font-family: var(--font-primary);
  font-size: 14px;
}

/*--------------------------------------------------------------
# Call To Action Section
--------------------------------------------------------------*/
.call-to-action .container {
  background:
    linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('./home-imgs/cta-bg.jpg') center center;
  background-size: cover;
  padding: 100px 60px;
  border-radius: 15px;
  overflow: hidden;
}

.call-to-action h3 {
  color: #fff;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 20px;
}

.call-to-action p {
  color: #fff;
  margin-bottom: 20px;
}

.call-to-action .play-btn {
  width: 94px;
  height: 94px;
  margin-bottom: 20px;
  background: radial-gradient(#008374 50%, rgba(0, 131, 116, 0.4) 52%);
  border-radius: 50%;
  display: inline-block;
  position: relative;
  overflow: hidden;
}

.call-to-action .play-btn:before {
  content: '';
  position: absolute;
  width: 120px;
  height: 120px;
  animation-delay: 0s;
  animation: pulsate-btn 2s;
  animation-direction: forwards;
  animation-iteration-count: infinite;
  animation-timing-function: steps;
  opacity: 1;
  border-radius: 50%;
  border: 5px solid rgba(0, 131, 116, 0.7);
  top: -15%;
  left: -15%;
  background: rgba(198, 16, 0, 0);
}

.call-to-action .play-btn:after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-40%) translateY(-50%);
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 15px solid #fff;
  z-index: 100;
  transition: all 400ms cubic-bezier(0.55, 0.055, 0.675, 0.19);
}

.call-to-action .play-btn:hover:before {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-40%) translateY(-50%);
  width: 0;
  height: 0;
  border: none;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 15px solid #fff;
  z-index: 200;
  animation: none;
  border-radius: 0;
}

.call-to-action .play-btn:hover:after {
  border-left: 15px solid #008374;
  transform: scale(20);
}

.call-to-action .cta-btn {
  font-family: var(--font-primary);
  font-weight: 500;
  font-size: 16px;
  letter-spacing: 1px;
  display: inline-block;
  padding: 12px 48px;
  border-radius: 50px;
  transition: 0.5s;
  margin: 10px;
  border: 2px solid #fff;
  color: #fff;
}

.call-to-action .cta-btn:hover {
  background: #008374;
  border: 2px solid #008374;
}

@keyframes pulsate-btn {
  0% {
    transform: scale(0.6, 0.6);
    opacity: 1;
  }

  100% {
    transform: scale(1, 1);
    opacity: 0;
  }
}

/*--------------------------------------------------------------
# Our Services Section
--------------------------------------------------------------*/
.services {
  padding: 60px 0;
}

.services .service-item {
  padding: 40px;
  background: #fff;
  height: 100%;
  border-radius: 10px;
}

.services .service-item .icon {
  width: 48px;
  height: 48px;
  position: relative;
  margin-bottom: 50px;
}

.services .service-item .icon i {
  color: var(--color-default);
  font-size: 56px;
  transition: ease-in-out 0.3s;
  z-index: 2;
  position: relative;
}

.services .service-item .icon:before {
  position: absolute;
  content: '';
  height: 100%;
  width: 100%;
  background: #eeeeee;
  border-radius: 50px;
  z-index: 1;
  top: 10px;
  right: -20px;
  transition: 0.3s;
}

.services .service-item h3 {
  color: var(--color-default);
  font-weight: 700;
  margin: 0 0 20px 0;
  padding-bottom: 8px;
  font-size: 22px;
  position: relative;
  display: inline-block;
  border-bottom: 4px solid #eeeeee;
  transition: 0.3s;
}

.services .service-item p {
  line-height: 24px;
  font-size: 14px;
  margin-bottom: 0;
}

.services .service-item .readmore {
  margin-top: 15px;
  display: inline-block;
  color: #008374;
}

.services .service-item:hover .icon:before {
  background: #00b6a1;
}

.services .service-item:hover h3 {
  border-color: #008374;
}

/*--------------------------------------------------------------
# Testimonials Section
--------------------------------------------------------------*/
.testimonials .testimonial-wrap {
  padding-left: 10px;
}

.testimonials .testimonial-item {
  box-sizing: content-box;
  padding: 30px;
  margin: 30px 10px;
  box-shadow: 0px 0 15px rgba(0, 0, 0, 0.1);
  position: relative;
  background: #fff;
  border-radius: 10px;
}

.testimonials .testimonial-item .testimonial-img {
  width: 90px;
  border-radius: 50px;
  margin-right: 15px;
}

.testimonials .testimonial-item h3 {
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0 5px 0;
  color: #000;
}

.testimonials .testimonial-item h4 {
  font-size: 14px;
  color: #999;
  margin: 0;
}

.testimonials .testimonial-item .stars {
  margin: 10px 0;
}

.testimonials .testimonial-item .stars i {
  color: #ffc107;
  margin: 0 1px;
}

.testimonials .testimonial-item .quote-icon-left,
.testimonials .testimonial-item .quote-icon-right {
  color: #009d8b;
  font-size: 26px;
  line-height: 0;
}

.testimonials .testimonial-item .quote-icon-left {
  display: inline-block;
  left: -5px;
  position: relative;
}

.testimonials .testimonial-item .quote-icon-right {
  display: inline-block;
  right: -5px;
  position: relative;
  top: 10px;
  transform: scale(-1, -1);
}

.testimonials .testimonial-item p {
  font-style: italic;
  margin: 15px auto 15px auto;
}

.testimonials .swiper-pagination {
  margin-top: 20px;
  position: relative;
}

.testimonials .swiper-pagination .swiper-pagination-bullet {
  width: 12px;
  height: 12px;
  background-color: rgba(0, 0, 0, 0.2);
  opacity: 1;
}

.testimonials .swiper-pagination .swiper-pagination-bullet-active {
  background-color: #008374;
}

@media (max-width: 767px) {
  .testimonials .testimonial-wrap {
    padding-left: 0;
  }

  .testimonials .testimonial-item {
    padding: 30px;
    margin: 15px;
  }

  .testimonials .testimonial-item .testimonial-img {
    position: static;
    left: auto;
  }
}

/*--------------------------------------------------------------
# Portfolio Details Section
--------------------------------------------------------------*/

.portfolio-wrap {
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  max-width: 270px;
}

.portfolio-wrap img {
  border-radius: 10px 10px 0 0;
  transition: transform 0.3s ease-in-out;
  height: 200px;
  width: 100%;
}

.portfolio-wrap .card-img-wrapper {
  overflow: hidden;
}

.portfolio-wrap img:hover {
  transform: scale(1.1);
}

.portfolio-details .portfolio-details-slider img {
  width: 100%;
}

.portfolio-details .portfolio-details-slider .swiper-pagination .swiper-pagination-bullet {
  width: 12px;
  height: 12px;
  background-color: rgba(255, 255, 255, 0.7);
  opacity: 1;
}

.portfolio-details .portfolio-details-slider .swiper-pagination .swiper-pagination-bullet-active {
  background-color: #008374;
}

.portfolio-details .swiper-button-prev,
.portfolio-details .swiper-button-next {
  width: 48px;
  height: 48px;
}

.portfolio-details .swiper-button-prev:after,
.portfolio-details .swiper-button-next:after {
  color: rgba(255, 255, 255, 0.8);
  background-color: rgba(0, 0, 0, 0.2);
  font-size: 24px;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
}

.portfolio-details .swiper-button-prev:hover:after,
.portfolio-details .swiper-button-next:hover:after {
  background-color: rgba(0, 0, 0, 0.6);
}

@media (max-width: 575px) {
  .portfolio-details .swiper-button-prev,
  .portfolio-details .swiper-button-next {
    display: none;
  }
}

.portfolio-details .portfolio-info {
  background: #fff;
}

.portfolio-details .portfolio-info h3 {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 20px;
  padding-bottom: 20px;
  position: relative;
}

.portfolio-details .portfolio-info h3:after {
  content: '';
  position: absolute;
  display: block;
  width: 50px;
  height: 3px;
  background: #008374;
  left: 0;
  bottom: 0;
}

.portfolio-details .portfolio-info ul {
  list-style: none;
  padding: 0;
  font-size: 15px;
}

.portfolio-details .portfolio-info ul li {
  display: flex;
  flex-direction: column;
  padding-bottom: 15px;
  font-size: 16px;
}

.portfolio-details .portfolio-info ul strong {
  text-transform: uppercase;
  font-weight: 400;
  color: #9c9c9c;
  font-size: 12px;
}

.portfolio-details .portfolio-info .btn-visit {
  padding: 8px 40px;
  background: #008374;
  color: #fff;
  border-radius: 50px;
  transition: 0.3s;
}

.portfolio-details .portfolio-info .btn-visit:hover {
  background: #009d8b;
}

.portfolio-details .portfolio-description h2 {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 20px;
}

.portfolio-details .portfolio-description p {
  padding: 0;
}

.portfolio-details .portfolio-description .testimonial-item {
  padding: 30px 30px 0 30px;
  position: relative;
  background: white;
  height: 100%;
  margin-bottom: 50px;
}

.portfolio-details .portfolio-description .testimonial-item .testimonial-img {
  width: 90px;
  border-radius: 50px;
  border: 6px solid #fff;
  float: left;
  margin: 0 10px 0 0;
}

.portfolio-details .portfolio-description .testimonial-item h3 {
  font-size: 18px;
  font-weight: bold;
  margin: 15px 0 5px 0;
  padding-top: 20px;
}

.portfolio-details .portfolio-description .testimonial-item h4 {
  font-size: 14px;
  color: #6c757d;
  margin: 0;
}

.portfolio-details .portfolio-description .testimonial-item .quote-icon-left,
.portfolio-details .portfolio-description .testimonial-item .quote-icon-right {
  color: #009d8b;
  font-size: 26px;
  line-height: 0;
}

.portfolio-details .portfolio-description .testimonial-item .quote-icon-left {
  display: inline-block;
  left: -5px;
  position: relative;
}

.portfolio-details .portfolio-description .testimonial-item .quote-icon-right {
  display: inline-block;
  right: -5px;
  position: relative;
  top: 10px;
  transform: scale(-1, -1);
}

.portfolio-details .portfolio-description .testimonial-item p {
  font-style: italic;
  margin: 0 0 15px 0 0 0;
  padding: 0;
}

/*--------------------------------------------------------------
# Our Team Section
--------------------------------------------------------------*/
.team .member {
  text-align: center;
  background: #fff;
  border-radius: 10px;
  padding: 15px;
  overflow: hidden;
  box-shadow: 0px 2px 25px rgba(0, 0, 0, 0.1);
}

.team .member img {
  border-radius: 10px;
  overflow: hidden;
}

.team .member .member-content {
  padding: 0 20px 30px 20px;
}

.team .member h4 {
  font-weight: 700;
  margin-top: 16px;
  margin-bottom: 2px;
  font-size: 20px;
}

.team .member span {
  font-style: italic;
  display: block;
  font-size: 14px;
  color: #6c757d;
}

.team .member p {
  padding-top: 10px;
  font-size: 14px;
  font-style: italic;
  color: #6c757d;
}

.team .member .social {
  margin-top: 15px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.team .member .social a {
  color: #a2a2a2;
  transition: 0.3s;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #bbbbbb;
}

.team .member .social a:hover {
  color: #008374;
  border-color: #008374;
}

.team .member .social i {
  font-size: 18px;
  margin: 0 2px;
}

/*--------------------------------------------------------------
# Pricing Section
--------------------------------------------------------------*/
.pricing .pricing-item {
  padding: 60px 40px;
  box-shadow: 0 3px 20px -2px rgba(108, 117, 125, 0.15);
  background: #fff;
  height: 100%;
  position: relative;
  border-radius: 15px;
}

.pricing h3 {
  font-weight: 600;
  margin-bottom: 15px;
  font-size: 20px;
  color: #555555;
  text-align: center;
}

.pricing .icon {
  margin: 30px auto 30px auto;
  width: 70px;
  height: 70px;
  background: #008374;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
  transform-style: preserve-3d;
}

.pricing .icon i {
  color: #fff;
  font-size: 28px;
  transition: ease-in-out 0.3s;
  line-height: 0;
}

.pricing .icon::before {
  position: absolute;
  content: '';
  height: 86px;
  width: 86px;
  border-radius: 50%;
  background: #87c1bb;
  transition: all 0.3s ease-out 0s;
  transform: translateZ(-1px);
}

.pricing .icon::after {
  position: absolute;
  content: '';
  height: 102px;
  width: 102px;
  border-radius: 50%;
  background: #d2eeeb;
  transition: all 0.3s ease-out 0s;
  transform: translateZ(-2px);
}

.pricing h4 {
  font-size: 48px;
  color: #f96f59;
  font-weight: 700;
  font-family: var(--font-secondary);
  margin-bottom: 0;
  text-align: center;
}

.pricing h4 sup {
  font-size: 28px;
}

.pricing h4 span {
  color: rgba(108, 117, 125, 0.8);
  font-size: 18px;
  font-weight: 400;
}

.pricing ul {
  padding: 20px 0;
  list-style: none;
  color: #6c757d;
  text-align: left;
  line-height: 20px;
}

.pricing ul li {
  padding: 10px 0;
  display: flex;
  align-items: center;
}

.pricing ul i {
  color: #059652;
  font-size: 24px;
  padding-right: 3px;
}

.pricing ul .na {
  color: rgba(108, 117, 125, 0.5);
}

.pricing ul .na i {
  color: rgba(108, 117, 125, 0.5);
}

.pricing ul .na span {
  text-decoration: line-through;
}

.pricing .buy-btn {
  display: inline-block;
  padding: 10px 40px;
  border-radius: 50px;
  color: #008374;
  border: 1px solid rgba(0, 131, 116, 0.2);
  transition: none;
  font-size: 16px;
  font-weight: 600;
  font-family: var(--font-primary);
  transition: 0.3s;
}

.pricing .buy-btn:hover {
  background: #008374;
  color: #fff;
}

.pricing .featured {
  z-index: 10;
  border: 3px solid #008374;
}

@media (min-width: 992px) {
  .pricing .featured {
    transform: scale(1.15);
  }
}

/*--------------------------------------------------------------
# Contact Section
--------------------------------------------------------------*/
.contact .info-container {
  background-color: #008374;
  height: 100%;
  padding: 20px;
  border-radius: 10px 0 0 10px;
  box-shadow: 0px 2px 25px rgba(0, 0, 0, 0.1);
}

.contact .info-item {
  width: 100%;
  background-color: #009282;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 10px;
  color: #fff;
}

.contact .info-item:last-child {
  margin-bottom: 0;
}

.contact .info-item i {
  font-size: 20px;
  color: #fff;
  float: left;
  width: 44px;
  height: 44px;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  transition: all 0.3s ease-in-out;
  margin-right: 15px;
}

.contact .info-item h4 {
  padding: 0;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 5px;
}

.contact .info-item p {
  padding: 0;
  margin-bottom: 0;
  font-size: 14px;
}

.contact .info-item:hover i {
  background: #fff;
  color: #008374;
}

.contact .php-email-form {
  width: 100%;
  height: 100%;
  background: #fff;
  box-shadow: 0px 2px 25px rgba(0, 0, 0, 0.1);
  padding: 30px;
  border-radius: 0 10px 10px 0;
}

.contact .php-email-form .form-group {
  padding-bottom: 8px;
}

.contact .php-email-form .error-message {
  display: none;
  color: #fff;
  background: #df1529;
  text-align: left;
  padding: 15px;
  font-weight: 600;
}

.contact .php-email-form .error-message br + br {
  margin-top: 25px;
}

.contact .php-email-form .sent-message {
  display: none;
  color: #fff;
  background: #059652;
  text-align: center;
  padding: 15px;
  font-weight: 600;
}

.contact .php-email-form .loading {
  display: none;
  background: #fff;
  text-align: center;
  padding: 15px;
}

.contact .php-email-form .loading:before {
  content: '';
  display: inline-block;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  margin: 0 10px -6px 0;
  border: 3px solid #059652;
  border-top-color: #fff;
  animation: animate-loading 1s linear infinite;
}

.contact .php-email-form input,
.contact .php-email-form textarea {
  border-radius: 0;
  box-shadow: none;
  font-size: 14px;
}

.contact .php-email-form input[type='text'],
.contact .php-email-form input[type='email'],
.contact .php-email-form textarea {
  padding: 12px 15px;
}

.contact .php-email-form input[type='text']:focus,
.contact .php-email-form input[type='email']:focus,
.contact .php-email-form textarea:focus {
  border-color: #008374;
}

.contact .php-email-form textarea {
  padding: 10px 12px;
}

.contact .php-email-form button[type='submit'] {
  background: #008374;
  border: 0;
  padding: 14px 45px;
  color: #fff;
  transition: 0.4s;
  border-radius: 50px;
}

.contact .php-email-form button[type='submit']:hover {
  background: rgba(0, 131, 116, 0.8);
}

@keyframes animate-loading {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
