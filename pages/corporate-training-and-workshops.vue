<script setup lang="ts">
useSeoMeta({
  title: "Corporate Training Solutions for Businesses & Teams",
  ogTitle: "Corporate Training Solutions for Businesses & Teams",
  description:
    "Explore our tailored corporate training programs designed to enhance team performance, leadership, and productivity.",
  ogDescription:
    "Explore our tailored corporate training programs designed to enhance team performance, leadership, and productivity.",
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
