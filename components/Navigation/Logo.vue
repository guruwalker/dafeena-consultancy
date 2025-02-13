<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const isMenuOpen = ref<boolean>(false);
const router = useRouter();

// Toggle mobile menu
const toggleMobileMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  document.body.classList.toggle("wsactive", isMenuOpen.value);
};

// Watch for route changes to close menu and scroll to top
watch(
  () => router.currentRoute.value.fullPath,
  () => {
    isMenuOpen.value = false; // Close menu
    document.body.classList.remove("wsactive");
    window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to top
  }
);
</script>


<template>
  <div class="wsmobileheader clearfix">
    <!-- Mobile Logo -->
    <NuxtLink to="/" class="logo-black">
      <span class="smllogo"><img src="/assets/logo/df-dark.png" alt="mobile-logo" /></span>
    </NuxtLink>
    <NuxtLink to="/" class="logo-white">
      <span class="smllogo"><img src="/assets/logo/df-light.png" alt="logo" /></span>
    </NuxtLink>

    <!-- Mobile Menu Toggle Button -->
    <button id="wsnavtoggle" class="wsanimated-arrow" @click="toggleMobileMenu">
      <span></span>
    </button>
  </div>
</template>

