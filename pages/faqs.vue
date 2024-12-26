<script setup lang="ts">
useSeoMeta({
  title: "Frequently Asked Questions",
  ogTitle: "Frequently Asked Questions",
  description:
    "Find answers to common questions about career coaching and personal branding services.",
  ogDescription:
    "Find answers to common questions about career coaching and personal branding services.",
});

useHead({
  bodyAttrs: {
    class: "navbar-dark navbar-dark-2",
  },
});

const faqs = ref([
  {
    category: "Getting Started",
    questions: [
      {
        id: 1,
        title: "What is Dafeena Consultancy, and how does it work?",
        answer: `
          <p>Dafeena Consultancy is a career coaching and branding service. We specialize in CV writing, LinkedIn profile optimization, cover letter revamps, and career coaching sessions. Our process starts with understanding your career goals and creating tailored solutions to position you for success.</p>
        `,
      },
      {
        id: 2,
        title: "What services do you offer?",
        answer: `
        <p>We offer a range of career branding and coaching services, including:</p>
         <ul class="simple-list" style="padding-left: 20px;">
            <li class="list-item">
            <p>Modern CV Makeovers</p>
            </li>
            <li class="list-item">
            <p>LinkedIn Profile Revamps</p>
            </li>
            <li class="list-item">
            <p>Cover Letter Writing</p>
            </li>
            <li class="list-item">
            <p>Professional Bios</p>
            </li>
            <li class="list-item">
            <p>Interview Preparation</p>
            </li>
            <li class="list-item">
            <p>Career Coaching Sessions</p>
            </li>
          </ul>
          <p>Each service is customized to meet your needs, whether you’re changing careers, re-entering the job market, or applying for that dream role.</p>
        `,
      },
      {
        id: 3,
        title: " Who are your services designed for?",
        answer: `
        <p>Our service are for:</p>
          <ul class="simple-list"  style="padding-left: 20px;">
           <li class="list-item">
            <p>Recent graduates looking to secure their first role.</p>
            </li>
            <li class="list-item">
            <p>Professionals transitioning into new industries.</p>
            </li>
            <li class="list-item">
            <p>Mid-level and senior professionals aiming for career growth.</p>
            </li>
            <li class="list-item">
            <p>Anyone struggling to stand out in today’s competitive job market.</p>
            </li>
          </ul>
        `,
      },
      {
        id: 4,
        title: "How do I get started?",
        answer: `
        <p>Getting started is easy:</p>
          <ul class="simple-list"  style="padding-left: 20px;">
           <li class="list-item">
            <p>Choose the service(s) that best fit your needs.</p>
            </li>
            <li class="list-item">
            <p>Book a consultation call or send us your details via our website.</p>
            </li>
            <li class="list-item">
            <p>Our team will analyze your requirements and work with you to craft the perfect documents or strategy.</p>
            </li>
          </ul>
        `,
      },
    ],
  },
  {
    category: "Manage your account",
    questions: [
      {
        id: 1,
        title: "How do I sign up for your services?",
        answer: `
          <p>You can sign up directly on our website or contact us via email: hello@dafeenaconsultancy.com. Once signed up, we’ll schedule your consultation and begin the process.</p>
        `,
      },
      {
        id: 2,
        title: "Can I update my details after signing up?",
        answer: `
            <p>Yes. If you need to provide additional information, such as job preferences, skills, or experiences, simply email us, and we’ll update your file accordingly.</p>       `,
      },
    ],
  },
  {
    category: "Purchase and License",
    questions: [
      {
        id: 1,
        title: "How much do your services cost?",
        answer: `
        <p>Our pricing varies depending on the service package you choose. For example:</p>
          <ul class="simple-list"  style="padding-left: 20px;">
           <li class="list-item">
            <p>CV Makeover: Ksh 13,000 / $105</p>
            </li>
            <li class="list-item">
            <p>LinkedIn Revamp: Ksh 16,000 / $128</p>
            </li>
            <li class="list-item">
            <p>Career Coaching: Ksh 16,000 / $128</p>
            </li>
          </ul>
           <p>For detailed pricing, visit our <a href="https://dafeenaconsultancy.com/our-services">services</a> page or reach out for a customized quote.</p>
        `,
      },
      {
        id: 2,
        title: "Can I get a bundled package?",
        answer: `
        <p>Yes! We offer value bundles, such as combining a CV Makeover, Cover Letter, and LinkedIn Revamp, to ensure your entire career profile shines. Ask us about our Graduate Package for students and first-time job seekers.</p>
        `,
      },
      {
        id: 3,
        title: "What happens after I make a payment?",
        answer: `
        <p>Once payment is confirmed:</p>
          <ul class="simple-list"  style="padding-left: 20px;">
            <li class="list-item">
              <p>You’ll receive an email confirming your booking and next steps.</p>
            </li>
            <li class="list-item">
              <p>We’ll schedule a consultation (if applicable) to gather all necessary details.</p>
            </li>
            <li class="list-item">
              <p>Our team will begin crafting your career materials.</p>
            </li>
          </ul>
        `,
      },
      {
        id: 4,
        title: "Do you offer refunds?",
        answer: `
        <p>Due to the personalized nature of our services, refunds are unavailable. However, we’re committed to your satisfaction and offer revisions until you’re fully confident in the final result.</p>
        `,
      },
    ],
  },
  {
    category: "Policy, Safety & Copyright",
    questions: [
      {
        id: 1,
        title: "Who owns the documents you create for me?",
        answer: `
        <p>Once finalized, all documents (CVs, LinkedIn updates, cover letters) are fully owned by you. We provide editable versions so you can make updates as your career progresses.</p>
        `,
      },
      {
        id: 2,
        title: "Is my information kept private?",
        answer: `
        <p>Absolutely. Your privacy is our top priority. Any personal details you share with us remain confidential and are used solely to provide our services.</p>
        `,
      },
      {
        id: 3,
        title: "Can I request revisions?",
        answer: `
        <p>Yes. We offer multiple edits to ensure your documents meet your expectations. The exact number of edits varies depending on the service package you choose.</p>
        `,
      },
    ],
  },
  {
    category: "Other Questions",
    questions: [
      {
        id: 1,
        title: "How do I prepare for a career coaching session?",
        answer: `
        <p>Bring along:</p>
        <ul class="simple-list"  style="padding-left: 20px;">
           <li class="list-item">
            <p>Your current CV and cover letter (if any).</p>
            </li>
            <li class="list-item">
            <p>A list of roles or industries you’re targeting.</p>
            </li>
            <li class="list-item">
            <p>Any questions or challenges you’re facing in your career.</p>
            </li>
          </ul>
        <p>We’ll help you gain clarity and move forward confidently.</p>
        `,
      },
      {
        id: 2,
        title: "Can you help me prepare for interviews?",
        answer: `
        <p>Yes! Our Interview Preparation service provides personalized coaching to help you:</p>
        <ul class="simple-list"  style="padding-left: 20px;">
           <li class="list-item">
            <p>Answer common and tough interview questions.</p>
            </li>
            <li class="list-item">
            <p>Highlight your strengths effectively.</p>
            </li>
            <li class="list-item">
            <p>Build confidence and leave a lasting impression.</p>
            </li>
          </ul>
        `,
      },
      {
        id: 3,
        title: "What if I’m not happy with the final result?",
        answer: `
        <p>Your satisfaction is our priority. We’ll work closely with you to make revisions and ensure the final output aligns with your goals.</p>
        `,
      },
      {
        id: 4,
        title: "How can I contact you for more questions?",
        answer: `
        <p>If you have any questions, feel free to <a href="/contact-us">Get In Touch</a>. Our team is always here to help!</p>
        `,
      },
    ],
  },
]);
</script>

<template>
  <div>
    <section
      id="faqs-2"
      class="gr--whitesmoke pb-30 inner-page-hero faqs-section division"
    >
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-11 col-xl-10">
            <div class="inner-page-title">
              <h2 class="s-52 w-700">Questions & Answers</h2>
              <p class="p-lg">Your career growth, simplified!</p>
            </div>
            <div class="accordion-wrapper">
              <ul>
                <li v-for="(category, index) in faqs" :key="index">
                  <ElementsAccordionItem :title="category.category">
                    <div
                      v-for="(question, qIndex) in category.questions"
                      :key="qIndex"
                      class="accordion-panel-item mb-35"
                    >
                      <!-- Question -->
                      <div class="faqs-2-question">
                        <h5 class="s-22 w-700">
                          <span>{{ qIndex + 1 }}.</span> {{ question.title }}
                        </h5>
                      </div>
                      <!-- Answer -->
                      <div
                        class="faqs-2-answer color--grey"
                        v-html="question.answer"
                      ></div>
                    </div>
                  </ElementsAccordionItem>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
