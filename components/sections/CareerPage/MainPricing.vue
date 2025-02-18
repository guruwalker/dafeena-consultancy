<script setup lang="ts">
const services = ref([
  {
    id: "pt-1",
    title: "Modern CV Makeover",
    slug: "modern_cv_makeover",
    description: "Create a crisp and professional CV.",
    price: { currency: "KSH", amount: 2500, validity: null },
    buttonText: "Get Started",
    buttonLink: "/request-service?service=modern_cv_makeover",
    note: "",
  },
  {
    id: "pt-2",
    title: "Modern CV Makeover + Consultation",
    slug: "modern_cv_makeover_consultation",
    description: "CV creation with a detailed 40-min consultation.",
    price: { currency: "KSH", amount: 3500, validity: null },
    buttonText: "Schedule Now",
    buttonLink: "/request-service?service=modern_cv_makeover_consultation",
    note: "",
  },
  {
    id: "pt-3",
    title: "Express CV Makeover",
    slug: "express_cv_makeover",
    description: "Get your CV delivered in 24 hours.",
    price: { currency: "KSH", amount: 2800, validity: null },
    buttonText: "Get Started",
    buttonLink: "/request-service?service=express_cv_makeover",
    note: "",
  },
  {
    id: "pt-4",
    title: "One Page CV Profile",
    slug: "one_page_cv_profile",
    description: "A concise, single-page professional CV.",
    price: { currency: "KSH", amount: 3500, validity: null },
    buttonText: "Get Started",
    buttonLink: "/request-service?service=one_page_cv_profile",
    note: "",
  },
  {
    id: "pt-5",
    title: "Professional Bio",
    slug: "professional_bio",
    description: "Craft a compelling and impactful personal bio.",
    price: { currency: "KSH", amount: 4000, validity: null },
    buttonText: "Get Started",
    buttonLink: "/request-service?service=professional_bio",
    note: "",
  },
  {
    id: "pt-6",
    title: "ATS Compliant CV",
    slug: "ats_compliant_cv",
    description: "Tailored CV optimized for ATS systems.",
    price: { currency: "KSH", amount: 4500, validity: null },
    buttonText: "Get Started",
    buttonLink: "/request-service?service=ats_compliant_cv",
    note: "",
  },
  {
    id: "pt-7",
    title: "LinkedIn Profile Revamp",
    slug: "linkedin_profile_revamp",
    description: "Enhance your LinkedIn profile for visibility.",
    price: { currency: "KSH", amount: 5000, validity: null },
    buttonText: "Revamp Now",
    buttonLink: "/request-service?service=linkedin_profile_revamp",
    note: "",
  },
  {
    id: "pt-8",
    title: "LinkedIn Profile Revamp + Consultation",
    slug: "linkedin_profile_revamp_consultation",
    description: "LinkedIn revamp with expert consultation support.",
    price: { currency: "KSH", amount: 6000, validity: null },
    buttonText: "Get Started",
    buttonLink: "/request-service?service=linkedin_profile_revamp_consultation",
    note: "",
  },
  {
    id: "pt-9",
    title: "Express LinkedIn Revamp",
    slug: "express_linkedin_revamp",
    description: "Fast LinkedIn revamp delivered in 24 hours.",
    price: { currency: "KSH", amount: 6500, validity: null },
    buttonText: "Revamp Now",
    buttonLink: "/request-service?service=express_linkedin_revamp",
    note: "",
  },
  {
    id: "pt-10",
    title: "Cover Letter Revamp",
    slug: "cover_letter_revamp",
    description: "Create a precise and persuasive cover letter.",
    price: { currency: "KSH", amount: 2500, validity: null },
    buttonText: "Get Started",
    buttonLink: "/request-service?service=cover_letter_revamp",
    note: "",
  },
  {
    id: "pt-11",
    title: "Consultation with Associate",
    slug: "consultation_with_associate",
    description: "One-on-one career advice and guidance session.",
    price: { currency: "KSH", amount: 3000, validity: null },
    buttonText: "Book Now",
    buttonLink: "/request-service?service=consultation_with_associate",
    note: "",
  },
  {
    id: "pt-12",
    title: "Express Cover Letter",
    slug: "express_cover_letter",
    description: "Urgent cover letter delivered in 24 hours.",
    price: { currency: "KSH", amount: 3000, validity: null },
    buttonText: "Get Started",
    buttonLink: "/request-service?service=express_cover_letter",
    note: "",
  },
  {
    id: "pt-13",
    title: "Career Coaching 1-hour Session",
    slug: "career_coaching_1_hour_session",
    description: "Set career goals and overcome career obstacles.",
    price: { currency: "KSH", amount: 7000, validity: null },
    buttonText: "Book Session",
    buttonLink: "/request-service?service=career_coaching_1_hour_session",
    note: "",
  },
  {
    id: "pt-14",
    title: "Interview Preparation",
    slug: "interview_preparation",
    description: "Prepare thoroughly to excel in job interviews.",
    price: { currency: "KSH", amount: 8500, validity: null },
    buttonText: "Prepare Now",
    buttonLink: "/request-service?service=interview_preparation",
    note: "",
  },
  {
    id: "pt-15",
    title: "Networking Templates for LinkedIn & Email",
    slug: "networking_templates_for_linkedin_email",
    description: "Professional templates for networking success.",
    price: { currency: "KSH", amount: 2500, validity: null },
    buttonText: "Get Templates",
    buttonLink:
      "/request-service?service=networking_templates_for_linkedin_email",
    note: "",
  },
  {
    id: "pt-16",
    title: "Graduate Package",
    slug: "graduate_package",
    description: "ATS CV and cover letter for graduates.",
    price: { currency: "KSH", amount: 4500, validity: null },
    buttonText: "Get Package",
    buttonLink: "/request-service?service=graduate_package",
    note: "",
  },
]);
</script>

<template>
  <section
    id="pricing-3"
    class="bg--fixed hero-section gr--whitesmoke inner-page-hero pb-60 pricing-section"
  >
    <div class="container">
      <!-- SECTION TITLE -->
      <div class="row justify-content-center">
        <div class="col-md-10 col-lg-8">
          <div class="section-title text-center mb-60">
            <h2 class="s-52 w-700">Find the Right Package for You</h2>
            <div class="toggle-btn ext-toggle-btn toggle-btn-md mt-30">
              <p class="color--disabled">
                Looking for a reliable and effective solution? Browse our
                services and see how we can help you succeed. We offer
                competitive pricing and flexible options to fit your budget.
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- END SECTION TITLE -->
      <!-- PRICING TABLES -->
      <div class="pricing-3-wrapper text-center">
        <div class="row row-cols-1 row-cols-md-3 row-cols-sm-2 row-cols-xs-1">
          <!-- Loop through the services array -->
          <div
            class="col"
            v-for="plan in services"
            :key="plan.id"
            style="display: flex; flex-grow: 1"
          >
            <div
              :id="plan.id"
              style="display: flex; flex-direction: column; height: 90%"
              class="p-table pricing-3-table bg--white-100 block-shadow r-12"
            >
              <!-- Table Header -->
              <div class="pricing-table-header">
                <h4 class="s-32">{{ plan.title }}</h4>
                <p class="color--grey">{{ plan.description }}</p>

                <!-- Pricing Section -->
                <div class="price mt-25">
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
                <a
                  :href="plan.buttonLink"
                  class="pt-btn btn btn--theme hover--theme"
                  >{{ plan.buttonText }}</a
                >
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
