<template>
  <div id="main-menu" class="wsmainfull menu clearfix">
    <div class="wsmainwp clearfix">
      <!-- HEADER BLACK LOGO -->
      <div class="desktoplogo">
        <NuxtLink to="/" class="logo-black"
          ><img
            style="min-height: 110px; width: 160px; padding: 5px;"
            src="/assets/images/DCLogo.png"
            alt="logo"
        /></NuxtLink>
      </div>
      <!-- HEADER WHITE LOGO -->
      <div class="desktoplogo">
        <NuxtLink to="/" class="logo-white"
          ><img
            style="min-height: 61px; width: 85px"
            src="/assets/images/DCLogo.png"
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
          <li class="nl-simple" aria-haspopup="true">
            <NuxtLink to="/our-services" class="h-link">Our Services</NuxtLink>
          </li>
          <li class="nl-simple" aria-haspopup="true">
            <NuxtLink to="/faqs" class="h-link">FAQs</NuxtLink>
          </li>
          <li class="nl-simple" aria-haspopup="true">
            <NuxtLink to="/contact-us" class="h-link">Contact Us</NuxtLink>
          </li>
        </ul>
      </nav>
      <!-- END MAIN MENU -->
    </div>
  </div>
</template>
<script>
import { reactive } from "vue";
export default {
  setup() {
    const state = reactive({
      isOpen: [false, false],
    });
    const toggle = (index) => {
      state.isOpen[index] = !state.isOpen[index];
    };
    return {
      toggle,
      isOpen: state.isOpen,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const menu = document.getElementById("main-menu");
      const header = document.getElementById("header");
      if (window.pageYOffset > 100) {
        menu.classList.add("scroll");
        header.classList.add("scroll");
      } else {
        menu.classList.remove("scroll");
        header.classList.remove("scroll");
      }
    },
  },
};
</script>
