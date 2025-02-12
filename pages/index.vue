<script setup lang="ts">
useSeoMeta({
  title: "Career Growth, Business Support & Corporate Training",
  ogTitle: "Career Growth, Business Support & Corporate Training",
  description:
    "Dafeena Consultancy empowers professionals, businesses, and teams with expert career coaching, virtual assistance, and corporate training solutions.",
  ogDescription:
    "Advance your career, streamline business operations, and upskill your team with expert coaching, virtual assistance, and corporate training from Dafeena Consultancy.",
});


useHead({
  bodyAttrs: {
    class: "navbar-dark navbar-dark-2",
  },
});
</script>

<template>
  <div>
    <!-- Hero -->
    <SectionsDemo2Hero />
    <!-- Stats -->
    <SectionsDemo2Section11 />
    <!-- Top service - Happy clients -->
    <SectionsDemo2Section6 />
    <!-- CAREER - One stop solution -->
    <SectionsDemo2Section5 />
    <!-- VA - Benefits -->
    <SectionsDemo2Section7 />

    <!-- Testimonials sliders -->
    <SectionsDemo2Section16 />

    <!-- Questions -->
    <div class="row">
      <div class="col">
        <div class="more-questions mt-40">
          <div class="more-questions-txt bg--white-400 r-100">
            <p class="p-lg">
              Have any questions?
              <NuxtLink to="/help-center" class="color--theme">View our Help Center</NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- View services banner -->
    <SectionsDemo2Section18 />
  </div>
</template>
