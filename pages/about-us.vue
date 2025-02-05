<script setup lang="ts">
useSeoMeta({
  title: "About Dafeena Consultancy",
  ogTitle: "About Dafeena Consultancy",
  description: "Dafeena Consultancy provides top-notch career coaching and virtual assistance services, helping individuals and businesses achieve their goals with personalized strategies and professional support.",
  ogDescription: "Dafeena Consultancy provides top-notch career coaching and virtual assistance services, helping individuals and businesses achieve their goals with personalized strategies and professional support.",
});

useHead({
  bodyAttrs: {
    class: "navbar-dark navbar-dark-2",
  },
});
</script>

<template>
  <div>
    <!-- Title and Images -->
    <SectionsAboutSection1 />
    <!-- Mission and Impact -->
    <SectionsAboutSection2 />
    <!-- Stats -->
    <SectionsAboutSection3 />
    <!-- Founder Statement -->
    <SectionsAboutSection4 />
    <!-- Clients have worked here -->
    <SectionsAboutSection6 />
    <!-- The Team -->
    <SectionsAboutSection7 />
    <!-- Why choose us -->
    <SectionsAboutSection8 />
    <!-- Testimonials -->
    <SectionsAboutSection10 />
    <!-- Blogs -->
    <!-- <SectionsAboutSection13 /> -->
  </div>
</template>
