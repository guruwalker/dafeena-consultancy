<script setup lang="ts">
useSeoMeta({
  title: "Privacy Policy",
  ogTitle: "Privacy Policy",
  description:
    "Read about how we protect your personal information at Dafeena Consultancy.",
  ogDescription:
    "Read about how we protect your personal information at Dafeena Consultancy.",
});

useHead({
  bodyAttrs: {
    class: "navbar-dark navbar-dark-2",
  },
});

const sections = ref([
  {
    id: 1,
    title: "Introduction",
    text: [
      "Welcome to Dafeena Consultancy. Your privacy is important to us, and we are committed to protecting your personal information. This Privacy Policy outlines the types of data we collect, how we use it, and your rights regarding your personal information.",
      "By using our website or communicating with us via email or WhatsApp, you agree to the collection and use of information in accordance with this policy.",
    ],
  },
  {
    id: 2,
    title: "Personal Information We Collect",
    subSections: [
      {
        id: "2.1",
        title: "Information You Provide to Us",
        text: [
          "We collect personal information you provide directly when you:",
        ],
        listItems: [
          "Contact us via email or WhatsApp for inquiries or services.",
          "Provide details necessary for career consulting or virtual assistance services.",
          "Make payments for services rendered.",
        ],
      },
      {
        id: "2.2",
        title: "Automatic Data Collection",
        text: [
          "When you visit our website, we may automatically collect certain information:",
        ],
        listItems: [
          "Device Information: Type of device, operating system, and browser used.",
          "Usage Data: Pages visited, time spent on the website, and interaction patterns.",
          "IP Address: Used for analytics and security purposes.",
          "Cookies: We may use cookies to enhance website functionality (see our Cookie Policy for details).",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "How We Use Personal Information",
    text: ["We use the information collected for the following purposes:"],
    listItems: [
      "To provide career consulting and virtual assistance services.",
      "To communicate with you regarding service inquiries, updates, or support.",
      "To improve our website and services based on user interaction.",
      "To process payments and manage transactions.",
      "To comply with legal obligations under Kenyan data protection laws.",
    ],
  },
  {
    id: 4,
    title: "Your Rights",
    text: [
      "Under the Data Protection Act of Kenya, you have the following rights regarding your personal information:",
    ],
    listItems: [
      "The right to access the personal information we hold about you.",
      "The right to request correction of inaccurate or incomplete data.",
      "The right to request deletion of your data in certain circumstances.",
      "The right to object to or restrict the processing of your personal data.",
      "The right to data portability, allowing you to request a copy of your data.",
      "To exercise any of these rights, please contact us via email or WhatsApp.",
    ],
  },
  {
    id: 5,
    title: "Data Retention Policies",
    text: [
      "We retain personal information only as long as necessary to provide services and fulfill legal obligations.",
      "Data retention periods depend on the nature of the information:",
    ],
    listItems: [
      "Service Inquiry Data: Retained for up to 12 months.",
      "Transactional Data: Retained as required by Kenyan law.",
      "Communication Records: Retained for a reasonable period for reference.",
    ],
  },
  {
    id: 6,
    title: "Contact Us",
    text: [
      "If you have any questions or concerns about this Privacy Policy, you may contact us via email or WhatsApp.",
    ],
  },
]);
</script>

<template>
  <div>
    <section id="privacy-page" class="gr--whitesmoke pb-80 inner-page-hero division">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-10">
            <div class="inner-page-title">
              <h2 class="s-52 w-700">Privacy Policy</h2>
              <p class="p-lg">
                This policy is effective as of 17th February 2024
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
                <ul v-if="section.listItems" class="simple-list" style="padding-left: 30px">
                  <li v-for="(item, index) in section.listItems" :key="index" class="list-item">
                    <p>{{ item }}</p>
                  </li>
                </ul>
              </div>

              <h4 class="s-30 w-700"><span>7.</span> How to Contact Us</h4>
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
