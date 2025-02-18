<script setup>
const date = new Date()
const currentYear = date.getFullYear()
</script>

<template>
  <footer class="footer sticky-footer mt-5">
    <div class="container">
      <div class="row gy-4">
        <div class="col-lg-5 col-md-12 footer-info">
          <router-link to="/" class="d-flex align-items-center">
            <h4>Mega Automotives</h4>
          </router-link>
          <p>Our online portal can be accessed by anyone at any time for maximum convenience.</p>
          <div class="w-50 social-links d-flex justify-content-between my-4 mx-auto">
            <a href="https://twitter.com/GbengaPeace" class="twitter">
              <i class="fab fa-twitter fa-2x"></i>
            </a>
            <router-link to="#" class="facebook"><i class="fab fa-facebook fa-2x"></i></router-link>
            <a href="#" class="instagram">
              <i class="fab fa-instagram fa-2x"></i>
            </a>
            <router-link to="#" class="linkedin"><i class="fab fa-linkedin fa-2x"></i></router-link>
          </div>
        </div>

        <div class="col-lg-2 col-6 footer-links">
          <h4>Useful Links</h4>
          <ul class="list-unstyled">
            <li>
              <i class="fas fa-cog fa-xs fa-spin mr-2"></i>
              <router-link to="/">Home</router-link>
            </li>
            <li>
              <i class="fas fa-cog fa-xs fa-spin mr-2"></i>
              <router-link to="/dashboard">Dashboard</router-link>
            </li>
            <li>
              <i class="fas fa-cog fa-xs fa-spin mr-2"></i>
              <router-link to="/services">Services</router-link>
            </li>
            <li>
              <i class="fas fa-cog fa-xs fa-spin mr-2"></i>
              <router-link to="/privacy-policy">Privacy policy</router-link>
            </li>
            <li>
              <i class="fas fa-cog fa-xs fa-spin mr-2"></i>
              <router-link to="/terms-of-service">Terms of service</router-link>
            </li>
          </ul>
        </div>

        <div class="col-lg-2 col-6 footer-links">
          <h4>Our Services</h4>
          <ul class="list-unstyled">
            <li>
              <i class="fas fa-cog fa-xs fa-spin mr-2"></i>
              <router-link to="/services">Vehicle Repairs</router-link>
            </li>
            <li>
              <i class="fas fa-cog fa-xs fa-spin mr-2"></i>
              <router-link to="/rentals">Vehicle Rentals</router-link>
            </li>
            <li>
              <i class="fas fa-cog fa-xs fa-spin mr-2"></i>
              <router-link to="/inventories">Parts/Accessories</router-link>
            </li>
          </ul>
        </div>

        <div class="col-lg-3 col-md-12 footer-contact text-center text-md-start">
          <h4>Contact Us</h4>
          <p>
            Ibadan, <br />
            Oyo State,<br />
            Nigeria.<br /><br />
            <strong>Phone:</strong>
            <a href="tel:+2347064544565"> +234 706 454 4565</a><br />
            <strong>Email:</strong>
            <a href="mailto:gbengabp12@gmail.com"> gbengabp12@gmail.com</a>
          </p>
        </div>
      </div>
    </div>

    <div class="container mt-4 text-center">
      <div class="copyright mb-2">
        All Rights Reserved. © {{ currentYear }} <strong><span>Mega Automotives</span></strong
        >.
      </div>
      <div class="credits copyright">
        <!-- All the links in the footer should remain intact. -->
        <!-- You can delete the links only if you purchased the pro version. -->
        <!-- Licensing information: https://bootstrapmade.com/license/ -->
        <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/impact-bootstrap-business-website-template/ -->
        Developed by
        <router-link to="https://portfolio-cysteines12s-projects.vercel.app">Cysteine</router-link>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #6b6f9c;
  color: #fff;
}

a {
  color: #fff;
}

a:hover {
  text-decoration: none;
  color: #cfcfcf;
}
</style>
