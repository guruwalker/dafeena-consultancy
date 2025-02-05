<script setup lang="ts">
import Testimonials from '~~/components/Data/TestimonialsVirtualAssistance'
const testimonials = ref(Testimonials);
</script>

<template>
  <section id="reviews-2" class="pt-100 reviews-section">
    <div class="container">
      <!-- SECTION TITLE -->
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="section-title mb-70">
            <!-- Title -->
            <h2 class="s-52 w-700">Loved by thousands of creators and brands</h2>
            <!-- Text -->
            <p class="s-21 color--grey">Hear from our latest clients</p>
          </div>
        </div>
      </div>
      <!-- TESTIMONIALS-2 WRAPPER -->
      <!-- TESTIMONIALS-2 WRAPPER -->
      <div class="reviews-2-wrapper rel">
        <div class="row align-items-center row-cols-1 row-cols-md-2" style="display: flex; ">
          <div v-for="testimonial in testimonials" :key="testimonial.id" class="col"
            style="display: flex; flex-grow: 1;">
            <div id="rw-2-2" class="review-2 bg--white-100 block-shadow r-08">
              <!-- Quote Icon -->
              <div class="review-ico ico-65">
                <span class="flaticon-quote"></span>
              </div>
              <!-- Text -->
              <div class="review-txt">
                <!-- Text -->
                <p>{{ testimonial.text }}</p>
                <!-- Author -->
                <div class="author-data clearfix">
                  <!-- Avatar -->
                  <div class="review-avatar">
                    <img :src="testimonial.avatar" alt="review-avatar" />
                  </div>
                  <!-- Data -->
                  <div class="review-author">
                    <h6 class="s-18 w-700">{{ testimonial.author }}</h6>
                    <p class="p-sm">{{ testimonial.role }}</p>
                  </div>
                </div>
                <!-- End Author -->
              </div>
              <!-- End Text -->
            </div>
          </div>
        </div>
        <!-- End row -->
      </div>
      <!-- END TESTIMONIALS-2 WRAPPER -->
    </div>
    <!-- End container -->
  </section>
</template>
