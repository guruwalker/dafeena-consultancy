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
    id: 1,
    title: "What is a Cookie?",
    text: [
      "A cookie is a small text file stored on your device (computer, tablet, or smartphone) when you visit a website. It helps the website remember your preferences, login details, and browsing history to provide a more personalized experience.",
      "Dafeena Consultancy uses cookies to enhance website functionality, improve user experience, and analyze platform usage to offer better career consulting and virtual assistance services.",
    ],
  },
  {
    id: 2,
    title: "Types of Cookies We Use",
    subSections: [
      {
        id: "2.1",
        title: "Essential Cookies",
        text: [
          "These cookies are necessary for the core functionality of the Dafeena Consultancy platform. They enable secure navigation, service access, and fraud prevention.",
        ],
        listItems: [
          "Authentication: Verifies your identity and maintains secure sessions.",
          "Security: Protects against unauthorized access and fraudulent activity.",
          "Preferences: Stores settings to enhance the browsing experience.",
        ],
      },
      {
        id: "2.2",
        title: "Performance Cookies",
        text: [
          "Performance cookies help us analyze how users interact with our platform to improve efficiency and usability.",
        ],
        listItems: [
          "Monitor website traffic and usage trends.",
          "Identify and fix performance issues.",
          "Optimize workflows for a smoother user experience.",
        ],
      },
      {
        id: "2.3",
        title: "Functionality Cookies",
        text: [
          "Functionality cookies allow us to remember user preferences and provide a customized browsing experience.",
        ],
        listItems: [
          "Remember language and region settings.",
          "Save login details for easier access.",
          "Enable personalized features for a seamless experience.",
        ],
      },
      {
        id: "2.4",
        title: "Targeting and Advertising Cookies",
        text: [
          "While Dafeena Consultancy does not display third-party ads, these cookies may be used to tailor content and updates based on your browsing activity.",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Third-Party Cookies",
    text: [
      "Dafeena Consultancy may integrate third-party services such as analytics providers and secure payment gateways that use cookies.",
      "We do not control third-party cookies, and their use is subject to their respective privacy policies. You can manage or disable these cookies through your browser settings.",
    ],
  },
  {
    id: 4,
    title: "Managing Cookies",
    text: [
      "You can control and disable cookies through your browser settings. Note that disabling essential cookies may impact the functionality of the website.",
    ],
  },
]);

</script>

<template>
  <div>
    <section id="cookies-page" class="gr--whitesmoke pb-80 inner-page-hero division">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-10">
            <!-- Inner Page Title -->
            <div class="inner-page-title">
              <h2 class="s-52 w-700">Cookies Policy</h2>
              <p class="p-lg">
                These terms are effective as of 17th February 2024
              </p>
            </div>

            <!-- Policy Sections -->
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

              <h4 class="s-30 w-700"><span>9.</span> How to Contact Us</h4>
              <p>
                If you have any questions or suggestions about this Terms of
                Service, do not hesitate to contact us at
                <a href="mailto:hello@dafeenaconsultancy.com" class="color--theme">hello@dafeenaconsultancy.com</a>
              </p>
            </div>
            <!-- End Policy Sections -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
