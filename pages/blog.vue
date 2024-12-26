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
    <SectionsProjectsSection2 />
    <SectionsProjectsSection3 />
    <SectionsProjectsSection4 />
    <SectionsProjectsSection5 />
  </div>
</template>
