<template>
  <span class="dark-light-toggle" @click="toggleDarkMode">
    <img class="img-dark" src="/assets/images/icons/dark.svg" alt="dark" />
    <img
        class="img-dark-black"
        src="/assets/images/icons/dark-black.svg"
        alt="dark"
    />
    <img class="img-light" src="/assets/images/icons/light.svg" alt="dark" />
    <img
        class="img-light-black"
        src="/assets/images/icons/light-black.svg"
        alt="dark"
    />
  </span>
</template>

<script setup lang="ts">
// Initialize the cookie to store dark mode preference
const darkModeCookie = useCookie("dark-mode");

onBeforeMount(() => {
  // Set the initial theme based on the cookie value
  if (darkModeCookie.value === "enabled") {
    document.body.classList.add("theme--dark");
  } else {
    document.body.classList.remove("theme--dark");
  }
});

// Toggle dark mode and update the cookie
const toggleDarkMode = () => {
  const isDark = document.body.classList.toggle("theme--dark");
  darkModeCookie.value = isDark ? "enabled" : "disabled"; // Update cookie value
};
</script>
