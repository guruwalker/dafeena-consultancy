<script setup lang="ts">
import { ref } from "vue";

const formData = ref({
  name: "",
  email: "",
  message: "",
});

const isLoading = ref(false);
const feedbackMessage = ref("");

const submitForm = async () => {
  isLoading.value = true;
  feedbackMessage.value = "";

  try {
    const response = await $fetch("/api/contact-request", {
      method: "POST",
      body: formData.value,
    });

    if (response.success) {
      feedbackMessage.value = "Your message has been sent!";
      formData.value = { name: "", email: "", message: "" };
    }
  } catch (error: any) {
    feedbackMessage.value =
      error.message || "An error occurred. Please try again.";
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <section>
    <div class="container">
      <h1>Contact Us</h1>
      <form
        @submit.prevent="submitForm"
        name="contactform"
        class="row contact-form"
      >

        <!-- Contact Form Input -->
        <div class="col-md-12">
          <p class="p-lg">Your Name:</p>
          <span>Please enter your full name:</span>
          <input
            type="text"
            name="name"
            class="form-control name"
            placeholder="Enter your full name*"
            v-model="formData.name"
          />
        </div>

        <div class="col-md-12">
          <p class="p-lg">Your Email Address:</p>
          <span>Provide your email for us to respond:</span>
          <input
            type="email"
            name="email"
            class="form-control email"
            placeholder="Enter your email address*"
            v-model="formData.email"
          />
        </div>

        <div class="col-md-12">
          <p class="p-lg">Tell us more about your needs:</p>
          <span>
            Provide details about your request so we can assist you effectively:
          </span>
          <textarea
            class="form-control message"
            name="message"
            rows="6"
            placeholder="Describe your inquiry or request in detail*"
            v-model="formData.description"
          ></textarea>
        </div>

        <!-- Contact Form Button -->
        <div class="col-md-12 mt-15 form-btn text-right">
          <button type="submit" class="btn btn--theme hover--theme submit">
            Submit Inquiry
          </button>
        </div>

        <div class="contact-form-notice">
          <p class="p-sm">
            We value your privacy. Dafeena Consultancy uses the information you
            provide to contact you about our services and offerings. You can opt
            out at any time. Learn more in our
            <NuxtLink to="/privacy">Privacy Policy</NuxtLink>.
          </p>
        </div>

        <!-- Contact Form Message -->
        <div class="col-lg-12 contact-form-msg">
          <span class="loading"></span>
        </div>
      </form>
      <!-- <p v-if="feedbackMessage">{{ feedbackMessage }}</p> -->
    </div>
  </section>
</template>
