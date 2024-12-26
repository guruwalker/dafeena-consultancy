<script setup lang="ts">
useSeoMeta({
  title: "Cookies",
  ogTitle: "Cookies",
  description: "Review the use of cookies used by Dafeena Consultancy.",
  ogDescription: "Review the use of cookies used by Dafeena Consultancy.",
});

useHead({
  bodyAttrs: {
    class: "navbar-dark",
  },
});

const sectionIndex = (mainIndex: number, subIndex: number) => {
  return `${mainIndex + 1}.${subIndex + 1}`;
};

const sections = ref([
  {
    title: "What is a Cookie?",
    paragraphs: [
      "A cookie is a small text file stored on your device (computer, tablet, or smartphone) when you visit a website. It allows the website to recognize your device and remember your preferences, login details, or previous activity to provide a more personalized experience.",
      "At Dafeena Consultancy, we use cookies to enhance the functionality of our website, improve user experience, and analyze how our platform is used to deliver better career coaching and personal branding services.",
    ],
  },
  {
    title: "What Types of Cookies Do We Use?",
    subsections: [
      {
        title: "Essential Cookies",
        paragraphs: [
          "These cookies are necessary for the core functionality of the Dafeena Consultancy platform. They enable you to navigate the site, log in securely, and access protected features like career coaching services, resources, and client portals.",
        ],
        listItems: [
          "Authentication: To verify your identity and maintain a secure session.",
          "Security: To ensure platform security, fraud prevention, and protect user data.",
          "Preferences: To remember your settings and preferences for a seamless experience.",
        ],
      },
      {
        title: "Performance Cookies",
        paragraphs: [
          "Performance cookies collect information about how users interact with Dafeena Consultancy. This helps us analyze usage patterns and improve the platform's functionality, speed, and reliability.",
          "We may use analytics tools such as Google Analytics to measure page performance, identify errors, and enhance user experience for visitors exploring career opportunities and coaching resources.",
        ],
        listItems: [
          "Monitor site traffic and usage trends.",
          "Identify technical issues and improve system performance.",
          "Optimize user workflows for career coaches, clients, and website visitors.",
        ],
      },
      {
        title: "Functionality Cookies",
        paragraphs: [
          "These cookies allow Dafeena Consultancy to remember your preferences and settings to provide a customized experience. While not essential, they enhance usability and convenience for returning users seeking career advice or branding services.",
        ],
        listItems: [
          "Remember language and region preferences.",
          "Save login credentials to streamline access to your personal coaching space.",
          "Enable personalized features, such as saved career goals and branding suggestions.",
        ],
      },
      {
        title: "Targeting/Advertising Cookies",
        paragraphs: [
          "Targeting cookies are used to deliver relevant content or advertisements based on your browsing activity. While Dafeena Consultancy does not currently display third-party advertisements, we may use these cookies to offer tailored information about career resources, coaching services, and new updates.",
        ],
      },
    ],
  },
  {
    title: "Third-Party Cookies on Our Site",
    paragraphs: [
      "Dafeena Consultancy may integrate third-party tools and services that use cookies to enhance platform capabilities. These include analytics providers (e.g., Google Analytics), secure payment gateways, and authentication services.",
      "We do not control third-party cookies, and their use is governed by the respective third-party privacy policies. You can manage or disable third-party cookies through your browser settings.",
    ],
  },
]);
</script>

<template>
  <div>
    <section
      id="cookies-page"
      class="gr--whitesmoke pb-80 inner-page-hero division"
    >
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-10">
            <!-- Inner Page Title -->
            <div class="inner-page-title">
              <h2 class="s-52 w-700">Cookies Policy</h2>
              <p class="p-lg">
                These terms are effective as of 17th January 2024
              </p>
            </div>

            <!-- Policy Sections -->
            <div
              v-for="(section, index) in sections"
              :key="index"
              class="txt-block legal-info"
            >
              <h4 class="s-30 w-700">
                <span>{{ index + 1 }}.</span> {{ section.title }}
              </h4>

              <!-- Render Paragraphs -->
              <p
                v-for="(paragraph, pIndex) in section.paragraphs"
                :key="pIndex"
              >
                {{ paragraph }}
              </p>

              <!-- Render Subsections -->
              <div v-if="section.subsections">
                <div
                  v-for="(sub, subIndex) in section.subsections"
                  :key="subIndex"
                >
                  <h5 class="s-24 w-700">
                    <span>{{ sectionIndex(index, subIndex) }}.</span>
                    {{ sub.title }}
                  </h5>
                  <p v-for="(subP, spIndex) in sub.paragraphs" :key="spIndex">
                    {{ subP }}
                  </p>

                  <!-- Render List -->
                  <ul class="simple-list" v-if="sub.listItems">
                    <li v-for="(item, lIndex) in sub.listItems" :key="lIndex">
                      <p>{{ item }}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- End Policy Sections -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
