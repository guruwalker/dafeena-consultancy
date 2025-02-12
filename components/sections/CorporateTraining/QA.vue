<script setup>
import { ref } from "vue";

const faqs = ref([
    {
        question: "What is corporate training?",
        answer:
            "Corporate training is a structured learning program designed to enhance employees' skills, knowledge, and performance to meet business goals.",
    },
    {
        question: "What types of training do you offer?",
        answer:
            "We offer leadership development, team building, communication skills, technical training, customer service, and industry-specific programs tailored to your needs.",
    },
    {
        question: "Can training programs be customized for our company?",
        answer:
            "Yes, we design customized training solutions based on your company’s goals, industry, and employee skill levels.",
    },
    {
        question: "How is the training delivered?",
        answer:
            "We offer in-person workshops, virtual training sessions, and blended learning programs to accommodate different business needs.",
    },
    {
        question: "Who conducts the training sessions?",
        answer:
            "Our experienced trainers and industry experts lead the sessions, ensuring high-quality and impactful learning experiences.",
    },
    {
        question: "How do we measure the effectiveness of the training?",
        answer:
            "We provide post-training assessments, feedback sessions, and performance tracking to measure improvements and ensure ROI.",
    },
    {
        question: "How do we get started with corporate training?",
        answer:
            "Contact us to discuss your training needs, and we'll design a program that aligns with your company’s objectives.",
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
                        <p class="s-21 color--grey">Find answers to common questions about our virtual assistance
                            services.</p>
                    </div>
                </div>
            </div>

            <!-- FAQs-3 QUESTIONS -->
            <div class="faqs-3-questions">
                <div class="row">
                    <!-- Loop through the FAQs -->
                    <div v-for="(faq, index) in faqs" :key="index" class="col-lg-6">
                        <div class="questions-holder">
                            <div class="question mb-35 animate__animated animate__fadeInUp">
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
