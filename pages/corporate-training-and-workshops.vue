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
    class: "navbar-dark scheme-magenta"
  }
});
</script>

<template>
  <div>
    <!-- Header -->
    <SectionsCorporateTrainingHeader />

    <!-- Stats -->
    <SectionsCorporateTrainingStats />

    <!-- One stop solution -->
    <SectionsCorporateTrainingOneSolution />

    <!--
    <SectionsCorporateTrainingSection3 />
    <SectionsCorporateTrainingSection4 />
    <SectionsCorporateTrainingSection5 />
    <SectionsCorporateTrainingSection6 />
    <SectionsCorporateTrainingSection7 />
    <SectionsCorporateTrainingSection8 />
    <SectionsCorporateTrainingSection9 />
    <SectionsCorporateTrainingSection10 />
    <SectionsCorporateTrainingSection11 />
    <SectionsCorporateTrainingSection12 />

-->
    <!-- Bundled pricing / Accepted payments -->
    <SectionsCorporateTrainingBundledPricing />

    <!-- Benefits -->
    <SectionsCorporateTrainingBenefitsDash />



    <!-- Recent Companies worked here... -->
    <SectionsCorporateTrainingRecentCompanies />

    <!-- Clients rating & Testimonials -->
    <SectionsCorporateTrainingTestimonials />

    <!-- Q/A -->
    <SectionsCorporateTrainingQA />
  </div>
</template>
