<template>
  <div class="wsmobileheader clearfix">
    <!-- <NuxtLink to="/"><span class="smllogo"><img src="/assets/images/logo-pink.png" alt="mobile-logo" /></span></NuxtLink> -->
    <NuxtLink to="/" class="logo-black"><span class="smllogo"><img src="/assets/logo/df-dark.png"
          alt="mobile-logo" /></span></NuxtLink>
    <NuxtLink to="/" class="logo-white"><span class="smllogo"><img src="/assets/logo/df-light.png" alt="logo" /></span>
    </NuxtLink>
    <a id="wsnavtoggle" class="wsanimated-arrow" @click="toggleMobileMenu">
      <span></span>
    </a>
  </div>
</template>
<script>
export default {
  methods: {
    toggleMobileMenu() {
      // toggle body class "dark-mode"
      document.body.classList.toggle("wsactive");
    }
  }
};
</script>
