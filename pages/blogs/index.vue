<script setup lang="ts">
useSeoMeta({
  title: "Dafeena Blog | Career Advice & Growth",
  ogTitle: "Dafeena Blog | Career Advice & Growth",
  description:
    "Discover expert tips, career insights, and resources to guide you in achieving your professional goals.",
  ogDescription:
    "Explore Dafeena's blog for valuable career advice, tips for personal growth, and resources to help you thrive in your career.",
});

useHead({
  bodyAttrs: {
    class: "navbar-dark navbar-dark-2",
  },
});
</script>
<template>
  <div>
    <SectionsProjectsSection1 />

    <section id="banner-6" class="bg--05 bg--scroll banner-section">
      <div class="banner-overlay pt-80 pb-90">
        <div class="container">
          <!-- BANNER-6 WRAPPER -->
          <div class="banner-6-wrapper">
            <div class="row justify-content-center">
              <!-- BANNER-6 TEXT -->
              <div class="col-md-9">
                <div class="banner-6-txt text-center color--white">
                  <!-- Title -->
                  <h3 class="s-46 w-700">Give it a try, it's free!</h3>
                  <!-- Text -->
                  <p class="p-xl o-85">
                    It only takes a few clicks to get started
                  </p>
                  <!-- Button -->
                  <a
                    href="#"
                    class="btn r-04 btn--theme hover--tra-white"
                    data-bs-toggle="modal"
                    data-bs-target="#modal-3"
                    >Get srarted - it's free</a
                  >
                  <!-- Button Text -->
                  <p class="p-sm btn-txt ico-15 o-85">
                    <span class="flaticon-check"></span> Free for 14 days, no
                    credit card required.
                  </p>
                </div>
              </div>
              <!-- END BANNER-6 TEXT -->
            </div>
            <!-- End row -->
          </div>
          <!-- END BANNER-6 WRAPPER -->
        </div>
        <!-- End container -->
      </div>
      <!-- End banner overlay -->
    </section>
  </div>
</template>
