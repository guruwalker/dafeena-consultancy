<script setup lang="ts">

useSeoMeta({
  title: 'Terms & Conditions',
  ogTitle: 'Terms & Conditions',
  description: 'Review the terms and conditions of working with Dafeena Consultancy.',
  ogDescription: 'Review the terms and conditions of working with Dafeena Consultancy.',
});

useHead({
  bodyAttrs: {
    class: "navbar-dark",
  },
});

const sections = ref([
  {
    id: 1,
    title: "Introduction",
    text: [
      "Welcome to Dafeena Consultancy. We provide Career Consulting and Virtual Assistance services. By engaging with our services via our website, email, or WhatsApp, you agree to the following terms and conditions. These terms govern your use of our services and outline the responsibilities of both Dafeena Consultancy and our clients.",
      "If you do not agree with any part of these terms, please refrain from using our services. For inquiries, contact us via email or WhatsApp."
    ]
  },
  {
    id: 2,
    title: "Career Consulting Services",
    text: ["Dafeena Consultancy offers career coaching services, including but not limited to:"],
    listItems: [
      "Resume writing and optimization",
      "Interview preparation",
      "Job search strategies and career guidance",
      "Personal branding and professional development"
    ],
    subSections: [
      {
        title: "Client Responsibilities",
        listItems: [
          "Provide accurate and up-to-date information for effective coaching.",
          "Actively participate in sessions and implement suggested strategies.",
          "Acknowledge that career outcomes are dependent on personal efforts and external market conditions."
        ]
      },
      {
        title: "Payments & Refunds",
        listItems: [
          "Fees are communicated during service booking and must be paid in advance.",
          "Refunds are only available within 7 days of payment, provided no sessions have been conducted."
        ]
      },
      {
        title: "Limitations of Liability",
        listItems: [
          "Dafeena Consultancy does not guarantee job placement, promotions, or career success.",
          "We provide guidance based on industry best practices but do not assume responsibility for employment outcomes."
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Virtual Assistance Services",
    text: ["Dafeena Consultancy provides virtual assistance services for businesses and professionals, including but not limited to:"],
    listItems: [
      "Administrative support",
      "Email and calendar management",
      "Social media and digital marketing support",
      "Data entry and research assistance"
    ],
    subSections: [
      {
        title: "Client Responsibilities",
        listItems: [
          "Clearly communicate task requirements, expectations, and deadlines.",
          "Provide necessary access to tools and platforms required for task completion.",
          "Ensure prompt payments for agreed-upon services."
        ]
      },
      {
        title: "Payments & Refunds",
        listItems: [
          "Payments must be made as per the agreed service structure (hourly, project-based, or subscription).",
          "Refunds are only available for unused services, subject to prior agreement."
        ]
      },
      {
        title: "Limitations of Liability",
        listItems: [
          "We strive to provide accurate and timely assistance but do not guarantee specific business outcomes.",
          "We are not liable for financial losses resulting from business decisions based on our support services."
        ]
      }
    ]
  },
  {
  id: 4,
  title: "Corporate Training & Workshops",
  text: ["Dafeena Consultancy offers corporate training and workshop services designed to enhance workplace skills and professional development. Our services include, but are not limited to:"],
  listItems: [
    "Leadership and management training",
    "Workplace communication and team collaboration",
    "Career development and personal branding",
    "Industry-specific training programs"
  ],
  subSections: [
    {
      title: "Client Responsibilities",
      listItems: [
        "Provide details on training objectives, target audience, and expected outcomes.",
        "Ensure employee participation and engagement during training sessions.",
        "Facilitate necessary logistical arrangements, such as venue and training materials."
      ]
    },
    {
      title: "Payments & Cancellations",
      listItems: [
        "Payments must be made as per the agreed terms before the training date.",
        "Cancellations made within a specified period (e.g., 7 days) may be eligible for partial refunds.",
        "Rescheduling requests are subject to availability and may incur additional charges."
      ]
    },
    {
      title: "Limitations of Liability",
      listItems: [
        "We strive to provide high-quality training, but we do not guarantee specific business outcomes.",
        "We are not liable for decisions made by attendees based on training content.",
        "Client organizations remain responsible for implementing training insights within their business operations."
      ]
    }
  ]
}

]);

</script>

<template>
  <div>
    <section id="privacy-page" class="gr--whitesmoke pb-80 inner-page-hero division">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-10">
            <div class="inner-page-title">
              <h2 class="s-52 w-700">Terms and Conditions</h2>
              <p class="p-lg">
                These terms are effective as of 17th February 2024
              </p>
            </div>

            <div class="txt-block legal-info">
              <div v-for="section in sections" :key="section.id">
                <h4 class="s-30 w-700">
                  <span>{{ section.id }}.</span> {{ section.title }}
                </h4>
                <p v-for="text in section.text" :key="text">{{ text }}</p>
                <div v-if="section.subSections">
                  <div v-for="subSection in section.subSections" :key="subSection.id">
                    <h5 class="s-24 w-700">
                      <span>{{ subSection.id }}.</span> {{ subSection.title }}
                    </h5>
                    <p v-for="text in subSection.text" :key="text">
                      {{ text }}
                    </p>
                    <ul v-if="subSection.listItems" class="simple-list" style="padding-left: 30px">
                      <li v-for="(item, index) in subSection.listItems" :key="index" class="list-item">
                        <p>{{ item }}</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <h4 class="s-30 w-700"><span>5.</span> How to Contact Us</h4>
              <p>
                If you have any questions or suggestions about this Terms of
                Service, do not hesitate to contact us at
                <a href="mailto:hello@dafeenaconsultancy.com" class="color--theme">hello@dafeenaconsultancy.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
