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
    <!-- Pricing cards -->
    <SectionsPricing2Section1 />
    <!-- Bundled pricing / Accepted payments -->
    <SectionsPricing2Section2 />
    <!-- Employees have worked here... -->
    <SectionsPricing2Section3 />
    <!-- Q/A -->
    <SectionsPricing2Section4 />
  </div>
</template>
