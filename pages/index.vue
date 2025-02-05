<script setup lang="ts">
// useSeoMeta({
//   title: "Take Your Career to the Next Level",
//   ogTitle: "Take Your Career to the Next Level",
//   description:
//     "Unlock your career potential with expert coaching and personal branding strategies.",
//   ogDescription:
//     "Unlock your career potential with expert coaching and personal branding strategies.",
// });

useHead({
  link: [{ rel: "canonical", href: "https://dafeenaconsultancy.com/" }],
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
