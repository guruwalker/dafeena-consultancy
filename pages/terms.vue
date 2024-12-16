<script setup lang="ts">
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
      "Welcome to Dafeena Consultancy's Career Coaching services. By accessing and using our services, you agree to abide by the terms and conditions outlined in this document. These terms are designed to ensure a smooth and mutually beneficial experience for all our clients.",
      "Please read these terms carefully before engaging in any career coaching services. If you have any questions, feel free to contact us at any time.",
    ],
  },
  {
    id: 2,
    title: "Services We Provide",
    text: [
      "Dafeena Consultancy offers career coaching services that include resume writing, interview preparation, job search strategies, and career guidance. Our services are tailored to help individuals enhance their professional prospects and achieve career goals.",
      "Our coaches are professionals with expertise in various industries and will provide personalized guidance to help you succeed in your job search or career development.",
    ],
  },
  {
    id: 3,
    title: "Client Responsibilities",
    text: [
      "Clients are responsible for providing accurate, honest, and timely information to ensure the best possible coaching experience. Failure to provide necessary information may limit the effectiveness of the coaching sessions.",
      "It is expected that clients will actively participate in coaching sessions, complete any assignments or tasks given by the coach, and follow up on recommendations provided.",
    ],
  },
  {
    id: 4,
    title: "Confidentiality and Data Privacy",
    text: [
      "We value your privacy and are committed to protecting your personal information. All personal data shared during coaching sessions will be kept confidential and used only for the purposes of providing our services.",
      "We will not share your personal information with third parties without your consent, except where required by law.",
    ],
  },
  {
    id: 5,
    title: "Payment and Refund Policy",
    text: [
      "Our services are offered on a paid basis, with fees specified during the booking process. Payment is due before the start of coaching sessions, and we accept various forms of payment, including credit cards and bank transfers.",
      "Refunds may be requested within 7 days of booking, provided no coaching sessions have been held. After the session, no refunds will be granted.",
    ],
  },
  {
    id: 6,
    title: "Limitations of Liability",
    text: [
      "Dafeena Consultancy is not liable for any direct or indirect losses arising from the use of our career coaching services. While we aim to provide valuable insights and guidance, clients are ultimately responsible for their career decisions.",
      "We make no guarantees regarding job placement, career success, or specific outcomes from using our services.",
    ],
  },
  {
    id: 7,
    title: "Termination of Services",
    text: [
      "Clients may terminate their coaching services at any time by notifying Dafeena Consultancy. Any outstanding fees for sessions rendered will be due upon termination.",
      "Dafeena Consultancy reserves the right to terminate services if a client is not following the agreed-upon terms or if inappropriate behavior is displayed during coaching sessions.",
    ],
  },
  {
    id: 8,
    title: "Amendments to Terms",
    text: [
      "Dafeena Consultancy reserves the right to update or amend these terms and conditions at any time. Any changes will be communicated to clients, and continued use of our services will be considered acceptance of the revised terms.",
    ],
  },
  {
    id: 9,
    title: "Governing Law",
    text: [
      "These terms and conditions shall be governed by and construed in accordance with the laws of the jurisdiction in which Dafeena Consultancy operates, without regard to its conflict of law provisions.",
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
              <h2 class="s-52 w-700">Terms and Conditions</h2>
              <p class="p-lg">
                These terms are effective as of 17th November 2024
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
                    <ul v-if="subSection.listItems" class="simple-list">
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
              </div>

              <h4 class="s-30 w-700"><span>9.</span> How to Contact Us</h4>
              <p>
                If you have any questions or suggestions about this Terms of
                Service, do not hesitate to contact us at
                <a href="mailto:yourdomain@mail.com" class="color--theme"
                  >hello@yourdomain.com</a
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
