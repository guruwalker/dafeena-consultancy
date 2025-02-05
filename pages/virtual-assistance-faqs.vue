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

const virtualAssistanceFaqs = ref([
  {
    category: "Getting Started",
    questions: [
      {
        id: 1,
        title: "What is Virtual Assistance, and how does it work?",
        answer:
          `<p>Virtual assistance involves delegating tasks to a professional who works remotely, providing support with administrative, technical, or creative tasks. Whether you're a business owner, entrepreneur, or individual, we match you with the right virtual assistant to handle various tasks, freeing up your time for other important activities.</p>`,
      },
      {
        id: 2,
        title: "What kind of tasks can a Virtual Assistant help me with?",
        answer:
          `<p>Our Virtual Assistants can assist you with a wide range of tasks, including but not limited to:</p>
           <ul class="simple-list" style="padding-left: 20px;">
             <li class="list-item"><p>Email management</p></li>
             <li class="list-item"><p>Appointment scheduling</p></li>
             <li class="list-item"><p>Social media management</p></li>
             <li class="list-item"><p>Content creation</p></li>
             <li class="list-item"><p>Customer service</p></li>
             <li class="list-item"><p>Data entry</p></li>
             <li class="list-item"><p>Research and report generation</p></li>
             <li class="list-item"><p>Travel and accommodation booking</p></li>
             <li class="list-item"><p>Personal errands</p></li>
           </ul>`,
      },
      {
        id: 3,
        title: "How do I get started with Virtual Assistance?",
        answer:
          `<p>To get started, simply reach out to us via our website or email. After understanding your needs, we will assign a Virtual Assistant who is well-suited to your business or personal requirements.</p>`,
      },
      {
        id: 4,
        title: "What types of businesses or individuals can benefit from Virtual Assistance?",
        answer:
          `<p>Our Virtual Assistance services are ideal for:</p>
           <ul class="simple-list" style="padding-left: 20px;">
             <li class="list-item"><p>Entrepreneurs looking to streamline daily operations.</p></li>
             <li class="list-item"><p>Small business owners needing administrative support.</p></li>
             <li class="list-item"><p>Busy professionals needing help with time management.</p></li>
             <li class="list-item"><p>Anyone looking for a cost-effective way to outsource tasks.</p></li>
           </ul>`,
      },
    ],
  },
  {
    category: "Services and Payments",
    questions: [
      {
        id: 1,
        title: "How much do Virtual Assistant services cost?",
        answer:
          `<p>Our pricing varies depending on the scope and type of tasks you need help with. We offer flexible packages starting from hourly rates to monthly retainers. Contact us for a customized quote based on your needs.</p>`,
      },
      {
        id: 2,
        title: "Do I need to commit to a long-term contract?",
        answer:
          `<p>No long-term contract is required. You can choose to work with our Virtual Assistant on a project-by-project basis or on an ongoing retainer. We’re flexible to match your needs.</p>`,
      },
      {
        id: 3,
        title: "How do I pay for Virtual Assistant services?",
        answer:
          `<p>Payments are made through our secure online payment platform. We accept credit/debit cards, mobile money, and bank transfers. You will receive an invoice after each task or monthly, depending on your payment arrangement.</p>`,
      },
      {
        id: 4,
        title: "Can I get a free trial?",
        answer:
          `<p>We offer a free consultation to discuss your needs and determine how we can best assist you. However, for ongoing services, we charge based on the agreed package.</p>`,
      },
    ],
  },
  {
    category: "Policy, Safety & Copyright",
    questions: [
      {
        id: 1,
        title: "How do you ensure my data is kept private?",
        answer:
          `<p>We take your privacy seriously. All information shared with us is confidential, and we implement strict data security measures to protect your sensitive information. Your data will not be shared without your consent.</p>`,
      },
      {
        id: 2,
        title: "Can I request updates to my Virtual Assistant’s work?",
        answer:
          `<p>Yes, you can provide feedback, and your Virtual Assistant will make the necessary revisions. We encourage open communication to ensure the best results for your tasks.</p>`,
      },
      {
        id: 3,
        title: "What if I’m not satisfied with the service?",
        answer:
          `<p>If you're not satisfied with the work, let us know. We’ll work with you to address any concerns and make adjustments until you're happy with the results.</p>`,
      },
    ],
  },
  {
    category: "Other Questions",
    questions: [
      {
        id: 1,
        title: "How do I communicate with my Virtual Assistant?",
        answer:
          `<p>You can communicate directly with your Virtual Assistant through email, messaging apps, or project management tools. We ensure that communication channels are clear and effective for both parties.</p>`,
      },
      {
        id: 2,
        title: "Can I request a specific skill set for my Virtual Assistant?",
        answer:
          `<p>Yes! We match you with a Virtual Assistant based on your specific needs, including industry experience, technical skills, and preferred working style.</p>`,
      },
      {
        id: 3,
        title: "How can I track the progress of my tasks?",
        answer:
          `<p>We provide regular updates on the tasks we are handling for you, either through project management platforms, email summaries, or direct communication. You will always be informed about the status of your work.</p>`,
      },
      {
        id: 4,
        title: "How do I cancel Virtual Assistant services?",
        answer:
          `<p>If you wish to cancel services, simply notify us in advance. We offer a flexible cancellation policy, and you can stop services at any time without penalty, as long as you notify us within the agreed timeframe.</p>`,
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
              <p class="p-lg">For your Virtual Assistance Needs!</p>
            </div>
            <div class="accordion-wrapper">
              <ul>
                <li v-for="(category, index) in virtualAssistanceFaqs" :key="index">
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
