<template>
  <footer id="footer-3" class="pt-100 footer ft-3-ntr">
    <div class="container">
      <!-- FOOTER CONTENT -->
      <div class="row">
        <!-- FOOTER LOGO -->
        <div class="col-xl-3">
          <div class="footer-info">
            <img style="min-height: 125px; width: 150px" class="footer-logo" src="/assets/images/DCLogo.png"
              alt="footer-logo" />
          </div>
        </div>
        <!-- FOOTER LINKS -->
        <div class="col-sm-4 col-lg-3 col-xl-2">
          <div class="footer-links fl-1">
            <!-- Title -->
            <h6 class="s-17 w-700">More about us</h6>
            <!-- Links -->
            <ul class="foo-links clearfix">
              <li>
                <p>
                  <NuxtLink to="/careers">Careers</NuxtLink>
                </p>
              </li>
              <li>
                <p>
                  <NuxtLink to="/our-team">Our Team</NuxtLink>
                </p>
              </li>
              <li>
                <p>
                  <NuxtLink to="/testimonials">Testimonials</NuxtLink>
                </p>
              </li>
              <li>
                <p>
                  <NuxtLink target="_blank" href="https://blogs.dafeenaconsultancy.com/">Blog</NuxtLink>
                </p>
              </li>
            </ul>
          </div>
        </div>
        <!-- END FOOTER LINKS -->
        <!-- FOOTER LINKS -->
        <div class="col-sm-4 col-lg-2">
          <div class="footer-links fl-2">
            <!-- Title -->
            <h6 class="s-17 w-700">Additional Information</h6>
            <!-- Links -->
            <ul class="foo-links clearfix">
              <li>
                <p>
                  <NuxtLink to="/virtual-assistance-faqs">Virtual Assistance FAQs</NuxtLink>
                </p>
              </li>
              <li>
                <p>
                  <NuxtLink to="/careers-faqs">Careers FAQs</NuxtLink>
                </p>
              </li>
              <li>
                <p>
                  <NuxtLink to="/help-center">Help Center</NuxtLink>
                </p>
              </li>
            </ul>
          </div>
        </div>
        <!-- END FOOTER LINKS -->
        <!-- FOOTER LINKS -->
        <div class="col-sm-4 col-lg-3 col-xl-2">
          <div class="footer-links fl-3">
            <!-- Title -->
            <h6 class="s-17 w-700">Legal</h6>
            <!-- Links -->
            <ul class="foo-links clearfix">
              <li>
                <p>
                  <NuxtLink to="/terms">Terms of Use</NuxtLink>
                </p>
              </li>
              <li>
                <p>
                  <NuxtLink to="/privacy">Privacy Policy</NuxtLink>
                </p>
              </li>
              <li>
                <p>
                  <NuxtLink to="/cookies">Cookies</NuxtLink>
                </p>
              </li>
            </ul>
          </div>
        </div>
        <!-- END FOOTER LINKS -->
        <!-- FOOTER NEWSLETTER FORM -->
        <div class="col-sm-10 col-md-8 col-lg-4 col-xl-3">
          <div class="footer-form">
            <!-- Title -->
            <h6 class="s-17 w-700">
              Stay up to date with our news, ideas and updates
            </h6>

            <!-- Newsletter Form Input -->
            <form action="https://formspree.io/f/xnnnvyag" method="POST" class="newsletter-form">
              <div class="input-group r-06">
                <input type="email" name="email" class="form-control" placeholder="Email Address" required
                  id="s-email" />
                <span class="input-group-btn ico-15">
                  <button type="submit" class="btn color--theme">
                    <span class="flaticon-right-arrow-1"></span>
                  </button>
                </span>
              </div>
              <!-- Newsletter Form Notification -->
              <label for="s-email" class="form-notification"></label>
            </form>

            <ul class="footer-socials ico-25 text-center clearfix">
              <li>
                <a href="https://www.linkedin.com/company/dafeena-consultancy/" target="_blank"><span
                    class="flaticon-linkedin-logo"></span></a>
              </li>
              <li>
                <a href="https://web.facebook.com/profile.php?id=61569356854369" target="_blank"><span
                    class="flaticon-facebook"></span></a>
              </li>
              <li>
                <a href="https://www.instagram.com/dafeenaconsultancy/" target="_blank"><span
                    class="flaticon-instagram"></span></a>
              </li>
            </ul>
          </div>
        </div>
        <!-- END FOOTER NEWSLETTER FORM -->
      </div>
      <!-- END FOOTER CONTENT -->
      <hr />
      <!-- FOOTER DIVIDER LINE -->
      <!-- BOTTOM FOOTER -->
      <div class="bottom-footer text-center">
        <!-- FOOTER COPYRIGHT -->
        <div class="col">
          <div class="footer-copyright">
            <p class="p-sm">
              &copy; 2025 Dafeena Consultancy. <span>All Rights Reserved</span>
            </p>
          </div>
        </div>
        <!-- End row -->
      </div>
      <!-- END BOTTOM FOOTER -->
    </div>
    <!-- End container -->
    <NavigationGoToTop />
  </footer>
</template>
<script setup lang="ts"></script>
