<script setup>
import Testimonials from '~~/components/Data/Testimonials'

useSeoMeta({
  title: 'What Our Clients Say',
  ogTitle: 'What Our Clients Say',
  description: 'See how Dafeena Consultancy has helped individuals and businesses',
  ogDescription: 'See how Dafeena Consultancy has helped individuals and businesses',
});

useHead({
  bodyAttrs: {
    class: "navbar-dark navbar-dark-2",
  },
});

const testimonials = ref(Testimonials);
</script>

<template>
  <div>
    <section id="reviews-2" class="gr--whitesmoke inner-page-hero reviews-section">
      <div class="container">
        <!-- SECTION TITLE -->
        <div class="row justify-content-center">
          <div class="col-md-10 col-lg-9">
            <div class="section-title mb-70">
              <!-- Title -->
              <h2 class="s-52 w-700">
                Real Stories From Real Customers
              </h2>
              <!-- Text -->
              <p class="s-21 color--grey">Our clients love us, and we love them</p>
            </div>
          </div>
        </div>
        <!-- TESTIMONIALS-2 WRAPPER -->
        <div class="reviews-2-wrapper rel">
          <div class="row align-items-center row-cols-1 row-cols-md-2" style="display: flex; ">
            <div v-for="testimonial in testimonials" :key="testimonial.id" class="col"
              style="display: flex; flex-grow: 1;">
              <SharedTestimonialsCard :testimonial="testimonial" />
            </div>
          </div>
        </div>
      </div>
      <!-- End container -->
    </section>
  </div>
</template>
