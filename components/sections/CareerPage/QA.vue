<script setup>
import { ref } from "vue";

const faqs = ref([
  {
    question: "What is an ATS Compliant CV?",
    answer:
      "An applicant tracking system — or ATS, for short — is a type of software used by recruiters and employers during the hiring process to collect, sort, scan, and rank the job applications they receive for their open positions.",
  },
  {
    question: "What is the difference between ATS & CV Makeover?",
    answer:
      "ATS CV is tailored for Computer Software. CV Makeover is tailored for a recruiter or hiring manager.",
  },
  {
    question: "What does LinkedIn Profile + Consultation entail?",
    answer:
      "We discuss what your Career ID is, map out your future aspirations, and discuss how best to align that on the LinkedIn Profile (40 minutes).",
  },
  {
    question: "What does CV Revamp + Consultation entail?",
    answer:
      "We discuss what your career needs are to ensure the person we capture on paper is the same person who appears during the interview.",
  },
  {
    question: "Can I call you?",
    answer: "Due to the large volumes of clients, all communication is on email for easy tracking.",
  },
  {
    question: "Can I get a discount?",
    answer: "All prices are fixed.",
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
            <p class="s-21 color--grey">Find answers to common questions about our career services.</p>
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
