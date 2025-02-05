<script setup lang="ts">
useSeoMeta({
  title: "Affordable Career Coaching & Branding Pricing",
  ogTitle: "Affordable Career Coaching & Branding Pricing",
  description:
    "Learn more about our competitive pricing for career coaching and branding services.",
  ogDescription:
    "Learn more about our competitive pricing for career coaching and branding services.",
});

useHead({
  bodyAttrs: {
    class: "navbar-dark navbar-dark-2",
  },
});
</script>

<template>
  <div>
    <!-- Header-->
    <SectionsCareerPageHeader />

    <!-- Pricing cards -->
    <SectionsCareerPageMainPricing />

    <!-- Bundled pricing / Accepted payments -->
    <SectionsCareerPageBundledPricing />

    <!-- Employees have worked here... -->
    <SectionsCareerPageEmployeesWork />

    <!-- Clients rating & Testimonials -->
    <SectionsCareerPageTestimonialsCards />

    <!-- Q/A -->
    <SectionsCareerPageQA />
  </div>
</template>
