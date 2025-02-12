<script setup lang="ts">
useSeoMeta({
  title: "Reliable & Affordable Virtual Assistance Services",
  ogTitle: "Reliable & Affordable Virtual Assistance Services",
  description:
    "Get expert virtual assistance for administrative, technical, and creative tasks. Scale your business with professional remote support.",
  ogDescription:
    "Get expert virtual assistance for administrative, technical, and creative tasks. Scale your business with professional remote support.",
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
    <SectionsVirtualAssistancePageHeader />

    <!-- Pricing cards -->
    <!-- <SectionsVirtualAssistancePageMainPricing /> -->

    <!-- Bundled pricing / Accepted payments -->
    <SectionsVirtualAssistancePageBundledPricing />

    <!-- Employees have worked here... -->
    <SectionsVirtualAssistancePageClientCountries />

    <!-- Clients rating & Testimonials -->
    <SectionsVirtualAssistancePageTestimonials />

    <!-- Q/A -->
    <SectionsVirtualAssistancePageQA />
  </div>
</template>
