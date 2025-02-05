<script setup>
import { ref } from "vue";

const faqs = ref([
  {
    question: "What is virtual assistance?",
    answer:
      "Virtual assistance is a remote support service where professionals handle administrative, technical, or creative tasks for businesses and individuals.",
  },
  {
    question: "What tasks can a virtual assistant help with?",
    answer:
      "Virtual assistants can handle tasks such as email management, scheduling, data entry, customer support, social media management, and more.",
  },
  {
    question: "How do I communicate with my virtual assistant?",
    answer:
      "Communication is primarily done via email, messaging apps, or video calls, depending on the level of engagement required.",
  },
  {
    question: "Do I need to hire a full-time virtual assistant?",
    answer:
      "No, you can hire a virtual assistant on an as-needed basis—hourly, part-time, or full-time—based on your business needs.",
  },
  {
    question: "Is my business data safe with a virtual assistant?",
    answer:
      "Yes, our virtual assistants follow strict confidentiality and data security protocols to ensure your information remains protected.",
  },
  {
    question: "How do I get started with a virtual assistant?",
    answer:
      "Simply reach out to us with your requirements, and we’ll match you with a skilled virtual assistant who fits your needs.",
  },
]);

</script>

<template>
  <section id="faqs-3" class="pt-100 faqs-section">
    <div class="container">
      <!-- SECTION TITLE -->
      <div class="row justify-content-center">
        <div class="col-md-10 col-lg-9">
          <div class="section-title mb-70">
            <h2 class="s-52 w-700">Questions & Answers</h2>
            <p class="s-21 color--grey">Find answers to common questions about our virtual assistance services.</p>
          </div>
        </div>
      </div>

      <!-- FAQs-3 QUESTIONS -->
      <div class="faqs-3-questions">
        <div class="row">
          <!-- Loop through the FAQs -->
          <div v-for="(faq, index) in faqs" :key="index" class="col-lg-6">
            <div class="questions-holder">
              <div class="question mb-35 wow fadeInUp">
                <h5 class="s-22 w-700">
                  <span>{{ index + 1 }}.</span> {{ faq.question }}
                </h5>
                <p class="color--grey">{{ faq.answer }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- MORE QUESTIONS LINK -->
      <div class="row">
        <div class="col">
          <div class="more-questions mt-40">
            <div class="more-questions-txt bg--white-400 r-100">
              <p class="p-lg">
                Have any questions?
                <NuxtLink to="/contact-us" class="color--theme">Get in Touch</NuxtLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
