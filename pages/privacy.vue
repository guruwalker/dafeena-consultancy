<script setup lang="ts">

useSeoMeta({
  title: 'Privacy Policy',
  ogTitle: 'Privacy Policy',
  description: 'Read about how we protect your personal information at Dafeena Consultancy.',
  ogDescription: 'Read about how we protect your personal information at Dafeena Consultancy.',
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
      "By using our services, you agree to the collection and use of information in accordance with this policy.",
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
          "Register for an account.",
          "Fill out forms or surveys.",
          "Subscribe to our newsletter or services.",
          "Contact our support team or interact with us.",
        ],
        listItems: [
          "Name, email address, and phone number.",
          "Billing information and payment details (if applicable).",
          "Content you upload, such as documents or messages.",
          "Preferences or settings related to your user experience.",
        ],
      },
      {
        id: "2.2",
        title: "Automatic Data Collection",
        text: [
          "When you use our services, we may automatically collect certain information:",
          "Device Information: Type of device, operating system, and browser used.",
          "Usage Data: Time spent on pages, features accessed, and user activity.",
          "IP Address: For identifying location and managing platform security.",
          "This data is collected using cookies, analytics tools, and other technologies to improve our services and user experience.",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Types of Information",
    text: [
      "We may collect the following types of information:",
      "Personal Information: Identifiable details such as name, email, phone number, and billing information.",
      "Non-Personal Information: Aggregated data that cannot identify individuals (e.g., site usage statistics).",
      "Technical Information: Device and connection details like IP address, browser version, and operating system.",
      "This information helps us to provide, improve, and customize our services.",
    ],
  },
  {
    id: 4,
    title: "How We Use Personal Information",
    text: ["We use the information collected for the following purposes:"],
    listItems: [
      "To provide and operate services that meet your needs.",
      "To improve user experience by analyzing site usage and trends.",
      "To communicate with you regarding updates, offers, or support.",
      "To ensure security and fraud prevention on our platform.",
      "To comply with legal obligations and enforce our policies.",
    ],

    text: [
      "We do not sell or share your personal information with third parties unless required by law or with your explicit consent.",
    ],
  },
  {
    id: 5,
    title: "Your Rights",
    text: [
      "Under applicable data protection laws (including the GDPR), you have certain rights regarding your personal information, including:",
    ],
    listItems: [
      "The right to access the personal information we hold about you.",
      "The right to rectify any inaccurate or incomplete information.",
      "The right to erase your personal data in certain circumstances (also known as the 'right to be forgotten').",
      "The right to restrict or object to the processing of your personal information.",
      "The right to data portability, allowing you to request a copy of your data in a commonly used format.",
      "To exercise any of these rights, please contact us using the details provided in the 'Contact Us' section below.",
    ],
  },
  {
    id: 6,
    title: "Data Retention Policies",
    text: [
      "We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, including legal, accounting, or reporting requirements.",
      "We may also retain and use your information to comply with our legal obligations, resolve disputes, and enforce our agreements.",
      "The retention period varies depending on the type of data, but in general, we retain your personal data for the following durations:",
      "Account Information: As long as your account is active.",
      "Transactional Data: For the duration required by law or contractual obligations.",
      "Inactive Data: If your account is inactive for a certain period, we may deactivate or delete your data unless required to retain it for legal purposes.",
    ],
  },
]);
</script>

<template>
  <div>
    <section
      id="privacy-page"
      class="gr--whitesmoke pb-80 inner-page-hero division"
    >
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-10">
            <div class="inner-page-title">
              <h2 class="s-52 w-700">Privacy Policy</h2>
              <p class="p-lg">
                This policy is effective as of 17th November 2024
              </p>
            </div>

            <div class="txt-block legal-info">
              <div v-for="section in sections" :key="section.id">
                <h4 class="s-30 w-700">
                  <span>{{ section.id }}.</span> {{ section.title }}
                </h4>
                <p v-for="text in section.text" :key="text">{{ text }}</p>
                <div v-if="section.subSections">
                  <div
                    v-for="subSection in section.subSections"
                    :key="subSection.id"
                  >
                    <h5 class="s-24 w-700">
                      <span>{{ subSection.id }}.</span> {{ subSection.title }}
                    </h5>
                    <p v-for="text in subSection.text" :key="text">
                      {{ text }}
                    </p>
                    <ul
                      v-if="subSection.listItems"
                      class="simple-list"
                      style="padding-left: 30px"
                    >
                      <li
                        v-for="(item, index) in subSection.listItems"
                        :key="index"
                        class="list-item"
                      >
                        <p>{{ item }}</p>
                      </li>
                    </ul>
                  </div>
                </div>
                <ul
                  v-if="section.listItems"
                  class="simple-list"
                  style="padding-left: 30px"
                >
                  <li
                    v-for="(item, index) in section.listItems"
                    :key="index"
                    class="list-item"
                  >
                    <p>{{ item }}</p>
                  </li>
                </ul>
              </div>

              <h4 class="s-30 w-700"><span>9.</span> How to Contact Us</h4>
              <p>
                If you have any questions or suggestions about this Terms of
                Service, do not hesitate to contact us at
                <a
                  href="mailto:hello@dafeenaconsultancy.com"
                  class="color--theme"
                  >hello@dafeenaconsultancy.com</a
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
