<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const isOpen = ref<boolean[]>([false, false]);

const darkModeCookie = useCookie("dark-mode");

const toggle = (index: number) => {
  isOpen.value[index] = !isOpen.value[index];
};

const handleScroll = () => {
  const menu = document.getElementById("main-menu");
  const header = document.getElementById("header");
  if (menu && header) {
    if (window.pageYOffset > 100) {
      menu.classList.add("scroll");
      header.classList.add("scroll");
    } else {
      menu.classList.remove("scroll");
      header.classList.remove("scroll");
    }
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div id="main-menu" class="wsmainfull menu clearfix">
    <div class="wsmainwp clearfix">
      <!-- HEADER BLACK LOGO -->
      <div v-if="darkModeCookie" class="desktoplogo">
        <NuxtLink to="/"
          ><img
            style="min-height: 73px; width: 102px"
            src="/assets/logo/df-dark.png"
            alt="logo"
        /></NuxtLink>
      </div>
      <!-- HEADER WHITE LOGO -->
      <div v-if="!darkModeCookie" class="desktoplogo">
        <NuxtLink to="/"
          ><img
            style="min-height: 73px; width: 102px"
            src="/assets/logo/df-light.png"
            alt="logo"
        /></NuxtLink>
      </div>
      <!-- MAIN MENU -->
      <nav
        class="wsmenu clearfix"
        style="
          display: flex;
          justify-content: center;
          align-content: center;
          align-items: center;
        "
      >
        <ul class="wsmenu-list nav-theme">
          <li class="nl-simple custom-menu-items" aria-haspopup="true">
            <NuxtLink to="/corporate-training-and-workshops" class="h-link"
              >Corporate Training & Workshops</NuxtLink
            >
          </li>
          <li class="nl-simple custom-menu-items" aria-haspopup="true">
            <NuxtLink to="/career-coaching" class="h-link"
              >Career Coaching</NuxtLink
            >
          </li>
          <li class="nl-simple custom-menu-items" aria-haspopup="true">
            <NuxtLink to="/virtual-assistance" class="h-link"
              >Virtual Assistance</NuxtLink
            >
          </li>
          <!-- <li class="nl-simple custom-menu-items" aria-haspopup="true">
            <NuxtLink to="/contact-us" class="h-link">Contact Us</NuxtLink>
          </li> -->
          <li class="nl-simple pr-5" aria-haspopup="true">
            <NuxtLink
              to="/schedule-consultation"
              class="btn r-04 btn--theme hover--tra-white last-link"
              >Schedule a Consultation
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <!-- END MAIN MENU -->
    </div>
  </div>
</template>
