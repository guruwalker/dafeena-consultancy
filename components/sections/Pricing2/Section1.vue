<script setup lang="ts">
const pricingPlans = ref([
  {
    id: "pt-1",
    title: "Modern CV Makeover",
    description: "Create a crisp and professional CV.",
    price: {
      currency: "KSH",
      amount: 13000,
      validity: null,
    },
    buttonText: "Get Started",
    note: "",
  },
  {
    id: "pt-2",
    title: "Modern CV Makeover + Consultation",
    description: "CV creation with a detailed 40-min consultation.",
    price: {
      currency: "KSH",
      amount: 16000,
      validity: null,
    },
    buttonText: "Schedule Now",
    note: "",
  },
  {
    id: "pt-3",
    title: "Express CV Makeover",
    description: "Get your CV delivered in 24 hours.",
    price: {
      currency: "KSH",
      amount: 18000,
      validity: null,
    },
    buttonText: "Get Started",
    note: "",
  },
  {
    id: "pt-4",
    title: "One Page CV Profile",
    description: "A concise, single-page professional CV.",
    price: {
      currency: "KSH",
      amount: 8000,
      validity: null,
    },
    buttonText: "Get Started",
    note: "",
  },
  {
    id: "pt-5",
    title: "Professional Bio",
    description: "Craft a compelling and impactful personal bio.",
    price: {
      currency: "KSH",
      amount: 12000,
      validity: null,
    },
    buttonText: "Get Started",
    note: "",
  },
  {
    id: "pt-6",
    title: "ATS Compliant CV",
    description: "Tailored CV optimized for ATS systems.",
    price: {
      currency: "KSH",
      amount: 11000,
      validity: null,
    },
    buttonText: "Get Started",
    note: "",
  },
  {
    id: "pt-7",
    title: "LinkedIn Profile Revamp",
    description: "Enhance your LinkedIn profile for visibility.",
    price: {
      currency: "KSH",
      amount: 16000,
      validity: null,
    },
    buttonText: "Revamp Now",
    note: "",
  },
  {
    id: "pt-8",
    title: "LinkedIn Profile Revamp + Consultation",
    description: "LinkedIn revamp with expert consultation support.",
    price: {
      currency: "KSH",
      amount: 20000,
      validity: null,
    },
    buttonText: "Get Started",
    note: "",
  },
  {
    id: "pt-9",
    title: "Express LinkedIn Revamp",
    description: "Fast LinkedIn revamp delivered in 24 hours.",
    price: {
      currency: "KSH",
      amount: 23000,
      validity: null,
    },
    buttonText: "Revamp Now",
    note: "",
  },
  {
    id: "pt-10",
    title: "Cover Letter Revamp",
    description: "Create a precise and persuasive cover letter.",
    price: {
      currency: "KSH",
      amount: 4000,
      validity: null,
    },
    buttonText: "Get Started",
    note: "",
  },
  {
    id: "pt-11",
    title: "Consultation with Associate",
    description: "One-on-one career advice and guidance session.",
    price: {
      currency: "KSH",
      amount: 5000,
      validity: null,
    },
    buttonText: "Book Now",
    note: "",
  },
  {
    id: "pt-12",
    title: "Express Cover Letter",
    description: "Urgent cover letter delivered in 24 hours.",
    price: {
      currency: "KSH",
      amount: 6000,
      validity: null,
    },
    buttonText: "Get Started",
    note: "",
  },
  {
    id: "pt-13",
    title: "Career Coaching 1-hour Session",
    description: "Set career goals and overcome career obstacles.",
    price: {
      currency: "KSH",
      amount: 16000,
      validity: null,
    },
    buttonText: "Book Session",
    note: "",
  },
  {
    id: "pt-14",
    title: "Interview Preparation",
    description: "Prepare thoroughly to excel in job interviews.",
    price: {
      currency: "KSH",
      amount: 21000,
      validity: null,
    },
    buttonText: "Prepare Now",
    note: "",
  },
  {
    id: "pt-15",
    title: "Networking Templates for LinkedIn & Email",
    description: "Professional templates for networking success.",
    price: {
      currency: "KSH",
      amount: 4500,
      validity: null,
    },
    buttonText: "Get Templates",
    note: "",
  },
  {
    id: "pt-16",
    title: "Graduate Package",
    description: "ATS CV and cover letter for graduates.",
    price: {
      currency: "KSH",
      amount: 9000,
      validity: null,
    },
    buttonText: "Get Package",
    note: "",
  },
]);
</script>

<template>
  <section
    id="pricing-3"
    class="gr--whitesmoke inner-page-hero pb-60 pricing-section"
  >
    <div class="container">
      <!-- SECTION TITLE -->
      <div class="row justify-content-center">
        <div class="col-md-10 col-lg-8">
          <div class="section-title text-center mb-60">
            <h2 class="s-52 w-700">Simple, Flexible Pricing</h2>
            <!-- TOGGLE BUTTON -->
            <div class="toggle-btn ext-toggle-btn toggle-btn-md mt-30">
              <!-- Text -->
              <p class="color--theme">Save up to 25% with yearly billing</p>
            </div>
          </div>
        </div>
      </div>
      <!-- END SECTION TITLE -->
      <!-- PRICING TABLES -->
      <div class="pricing-3-wrapper text-center">
        <div class="row row-cols-1 row-cols-md-3 row-cols-sm-2 row-cols-xs-1">
          <!-- Loop through the pricingPlans array -->
          <div
            class="col"
            v-for="plan in pricingPlans"
            :key="plan.id"
            style="display: flex; flex-grow: 1"
          >
            <div
              :id="plan.id"
              style="display: flex; flex-direction: column; height: 90%;"
              class="p-table pricing-3-table bg--white-100 block-shadow r-12"
            >
              <!-- Table Header -->
              <div class="pricing-table-header">
                <h4 class="s-32">{{ plan.title }}</h4>
                <p class="color--grey">{{ plan.description }}</p>

                <!-- Pricing Section -->
                <div class="price mt-25" >
                  <div class="price2" v-if="plan.price">
                    <sup style="font-size: 30px">{{ plan.price.currency }}</sup>
                    <span style="font-size: 40px">{{ plan.price.amount }}</span>
                  </div>
                </div>
              </div>

              <!-- Button and Note -->
              <div
                style="
                  margin-top: auto;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                "
              >
                <a href="#" class="pt-btn btn btn--theme hover--theme">{{
                  plan.buttonText
                }}</a>
                <p class="p-sm btn-txt color--grey">{{ plan.note }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- PRICING TABLES -->
    </div>
    <!-- End container -->
  </section>
</template>
