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
        title: "What corporate training and workshops does Dafeena Consultancy offer?",
        answer:
          `<p>Dafeena Consultancy provides specialized corporate training programs tailored to businesses and organizations. Our workshops focus on enhancing professional skills, leadership development, team productivity, and industry-specific expertise.</p>`,
      },
      {
        id: 2,
        title: "Who can benefit from these training programs?",
        answer:
          `<p>Our corporate training programs are ideal for:</p>
           <ul class="simple-list" style="padding-left: 20px;">
             <li class="list-item"><p>Corporate teams and employees</p></li>
             <li class="list-item"><p>Business executives and managers</p></li>
             <li class="list-item"><p>Startups and SMEs looking to upskill their workforce</p></li>
             <li class="list-item"><p>Organizations seeking industry-specific training</p></li>
           </ul>`,
      },
      {
        id: 3,
        title: "Are the training sessions in-person or virtual?",
        answer:
          `<p>We offer flexible training options, including in-person workshops, virtual training sessions, and hybrid formats to accommodate diverse business needs.</p>`,
      },
      {
        id: 4,
        title: "How do I book a training session for my company?",
        answer:
          `<p>You can book a training session by contacting us through our website or via email at <a href="mailto:hello@dafeenaconsultancy.com">hello@dafeenaconsultancy.com</a>. Our team will assess your needs and customize a training program suited for your organization.</p>`,
      },
    ],
  },
  {
    category: "Training Programs & Customization",
    questions: [
      {
        id: 1,
        title: "Can the training be customized to fit my company’s needs?",
        answer:
          `<p>Yes! We tailor our corporate training programs to align with your company's goals, industry requirements, and employee skill levels.</p>`,
      },
      {
        id: 2,
        title: "What topics do your training sessions cover?",
        answer:
          `<p>Our workshops cover a wide range of topics, including:</p>
           <ul class="simple-list" style="padding-left: 20px;">
             <li class="list-item"><p>Leadership and Management Training</p></li>
             <li class="list-item"><p>Communication and Team Collaboration</p></li>
             <li class="list-item"><p>Customer Service Excellence</p></li>
             <li class="list-item"><p>Sales and Negotiation Skills</p></li>
             <li class="list-item"><p>Digital Marketing and Branding</p></li>
             <li class="list-item"><p>Time Management and Productivity</p></li>
             <li class="list-item"><p>Industry-specific technical training</p></li>
           </ul>`,
      },
      {
        id: 3,
        title: "How long do the training sessions last?",
        answer:
          `<p>The duration varies depending on the type of workshop. We offer:</p>
           <ul class="simple-list" style="padding-left: 20px;">
             <li class="list-item"><p>Half-day sessions (3-4 hours)</p></li>
             <li class="list-item"><p>Full-day sessions (6-8 hours)</p></li>
             <li class="list-item"><p>Multi-day training programs</p></li>
           </ul>
           <p>For in-depth training, we also provide long-term skill development programs.</p>`,
      },
    ],
  },
  {
    category: "Pricing & Payments",
    questions: [
      {
        id: 1,
        title: "How much does a corporate training session cost?",
        answer:
          `<p>Pricing depends on the training type, duration, and level of customization required. Contact us for a tailored quote.</p>`,
      },
      {
        id: 2,
        title: "Do you offer discounts for multiple training sessions?",
        answer:
          `<p>Yes, we provide discounts for organizations that book multiple training sessions or long-term programs.</p>`,
      },
      {
        id: 3,
        title: "What payment methods do you accept?",
        answer:
          `<p>We accept bank transfers, mobile payments (M-Pesa), and online payment options. Payment details will be shared upon booking confirmation.</p>`,
      },
    ],
  },
  {
    category: "Logistics & Additional Information",
    questions: [
      {
        id: 1,
        title: "Where are the training sessions held?",
        answer:
          `<p>We can conduct training at your business premises, a preferred location, or virtually via online conferencing platforms.</p>`,
      },
      {
        id: 2,
        title: "Can we request post-training support or follow-ups?",
        answer:
          `<p>Yes! We offer post-training support, including follow-up sessions, resource materials, and mentorship to reinforce learning.</p>`,
      },
      {
        id: 3,
        title: "What if we need to reschedule a booked session?",
        answer:
          `<p>You can reschedule a session by providing at least 3 days' notice. Rescheduling terms will be discussed at the time of booking.</p>`,
      },
    ],
  },
]);



</script>

<template>
  <div>
    <section id="faqs-2" class="gr--whitesmoke pb-30 inner-page-hero faqs-section division">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-11 col-xl-10">
            <div class="inner-page-title">
              <h2 class="s-52 w-700">Questions & Answers</h2>
              <p class="p-lg">For Corporate Training & Workshops!</p>
            </div>
            <div class="accordion-wrapper">
              <ul>
                <li v-for="(category, index) in faqs" :key="index">
                  <ElementsAccordionItem :title="category.category">
                    <div v-for="(question, qIndex) in category.questions" :key="qIndex"
                      class="accordion-panel-item mb-35">
                      <!-- Question -->
                      <div class="faqs-2-question">
                        <h5 class="s-22 w-700">
                          <span>{{ qIndex + 1 }}.</span> {{ question.title }}
                        </h5>
                      </div>
                      <!-- Answer -->
                      <div class="faqs-2-answer color--grey" v-html="question.answer"></div>
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
