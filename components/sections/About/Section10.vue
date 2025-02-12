<script setup lang="ts">
import Testimonials from '~~/components/Data/TestimonialsCareers'
const testimonials = ref(Testimonials);
</script>

<template>
  <section id="reviews-2" class="pt-100 reviews-section">
    <div class="container">
      <!-- SECTION TITLE -->
      <div class="row justify-content-center">
        <div class="col-md-10 col-lg-9">
          <div class="section-title mb-70">
            <!-- Title -->
            <h2 class="s-50 w-700">
              Here’s what our amazing clients are saying
            </h2>
            <!-- Text -->
            <p class="s-21 color--grey">
              We love our clients, and they love us!
            </p>
          </div>
        </div>
      </div>
      <!-- Testimonials -->
      <div class="row">
        <div class="col">
          <SlidersTestimonials />
        </div>
      </div>
    </div>
    <!-- End container -->
  </section>
</template>
