<script setup lang="ts">
const testimonials = ref([
  {
    id: 1,
    text: "Thanks to this platform, I landed my dream role as a Frontend Developer within weeks. I couldn't be happier!",
    author: "John Kimani",
    role: "Frontend Developer",
    avatar: "/assets/images/color-scheme/blue.jpg",
  },
  {
    id: 2,
    text: "Finding a position as an Accountant was so smooth! The process was clear, and I got several offers quickly.",
    author: "Faith Nyambura",
    role: "Accountant",
    avatar: "/assets/images/color-scheme/crocus.jpg",
  },
  {
    id: 3,
    text: "As a recent graduate, I was struggling to find work. Virginia and the teamhelped me secure my first internship!",
    author: "Brian Mwangi",
    role: "IT Intern",
    avatar: "/assets/images/color-scheme/green.jpg",
  },
  {
    id: 4,
    text: "I never thought it would be this easy to connect with companies in my field. Highly recommend it.",
    author: "Ann Wanjiku",
    role: "Data Analyst",
    avatar: "/assets/images/color-scheme/magenta.jpg",
  },
]);
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
      <!-- TESTIMONIALS-2 WRAPPER -->
      <div class="reviews-2-wrapper rel">
        <div
          class="row align-items-center row-cols-1 row-cols-md-2"
          style="display: flex"
        >
          <div
            v-for="testimonial in testimonials"
            :key="testimonial.id"
            class="col"
            style="display: flex; flex-grow: 1"
          >
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
