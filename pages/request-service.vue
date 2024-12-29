<script setup>
useSeoMeta({
  title: "Request Service | Dafeena Consultancy",
  ogTitle: "Request Service | Dafeena Consultancy",
  description:
    "Get in touch with us for career coaching, personal branding, and more.",
  ogDescription:
    "Get in touch with us for career coaching, personal branding, and more.",
});

useHead({
  bodyAttrs: {
    class: "navbar-dark navbar-dark-2",
  },
});

const services = ref([
  {
    id: "pt-1",
    title: "Modern CV Makeover",
    slug: "modern_cv_makeover",
    description: "Create a crisp and professional CV.",
    price: {
      currency: "KSH",
      amount: 13000,
      validity: null,
    },
    buttonText: "Get Started",
    buttonLink: "/request-service?service=modern_cv_makeover",
    note: "",
  },
  {
    id: "pt-2",
    title: "Modern CV Makeover + Consultation",
    slug: "modern_cv_makeover_consultation",
    description: "CV creation with a detailed 40-min consultation.",
    price: {
      currency: "KSH",
      amount: 16000,
      validity: null,
    },
    buttonText: "Schedule Now",
    buttonLink: "/request-service?service=modern_cv_makeover_consultation",
    note: "",
  },
  {
    id: "pt-3",
    title: "Express CV Makeover",
    slug: "express_cv_makeover",
    description: "Get your CV delivered in 24 hours.",
    price: {
      currency: "KSH",
      amount: 18000,
      validity: null,
    },
    buttonText: "Get Started",
    buttonLink: "/request-service?service=express_cv_makeover",
    note: "",
  },
  {
    id: "pt-4",
    title: "One Page CV Profile",
    slug: "one_page_cv_profile",
    description: "A concise, single-page professional CV.",
    price: {
      currency: "KSH",
      amount: 8000,
      validity: null,
    },
    buttonText: "Get Started",
    buttonLink: "/request-service?service=one_page_cv_profile",
    note: "",
  },
  {
    id: "pt-5",
    title: "Professional Bio",
    slug: "professional_bio",
    description: "Craft a compelling and impactful personal bio.",
    price: {
      currency: "KSH",
      amount: 12000,
      validity: null,
    },
    buttonText: "Get Started",
    buttonLink: "/request-service?service=professional_bio",
    note: "",
  },
  {
    id: "pt-6",
    title: "ATS Compliant CV",
    slug: "ats_compliant_cv",
    description: "Tailored CV optimized for ATS systems.",
    price: {
      currency: "KSH",
      amount: 11000,
      validity: null,
    },
    buttonText: "Get Started",
    buttonLink: "/request-service?service=ats_compliant_cv",
    note: "",
  },
  {
    id: "pt-7",
    title: "LinkedIn Profile Revamp",
    slug: "linkedin_profile_revamp",
    description: "Enhance your LinkedIn profile for visibility.",
    price: {
      currency: "KSH",
      amount: 16000,
      validity: null,
    },
    buttonText: "Revamp Now",
    buttonLink: "/request-service?service=linkedin_profile_revamp",
    note: "",
  },
  {
    id: "pt-8",
    title: "LinkedIn Profile Revamp + Consultation",
    slug: "linkedin_profile_revamp_consultation",
    description: "LinkedIn revamp with expert consultation support.",
    price: {
      currency: "KSH",
      amount: 20000,
      validity: null,
    },
    buttonText: "Get Started",
    buttonLink: "/request-service?service=linkedin_profile_revamp_consultation",
    note: "",
  },
  {
    id: "pt-9",
    title: "Express LinkedIn Revamp",
    slug: "express_linkedin_revamp",
    description: "Fast LinkedIn revamp delivered in 24 hours.",
    price: {
      currency: "KSH",
      amount: 23000,
      validity: null,
    },
    buttonText: "Revamp Now",
    buttonLink: "/request-service?service=express_linkedin_revamp",
    note: "",
  },
  {
    id: "pt-10",
    title: "Cover Letter Revamp",
    slug: "cover_letter_revamp",
    description: "Create a precise and persuasive cover letter.",
    price: {
      currency: "KSH",
      amount: 4000,
      validity: null,
    },
    buttonText: "Get Started",
    buttonLink: "/request-service?service=cover_letter_revamp",
    note: "",
  },
  {
    id: "pt-11",
    title: "Consultation with Associate",
    slug: "consultation_with_associate",
    description: "One-on-one career advice and guidance session.",
    price: {
      currency: "KSH",
      amount: 5000,
      validity: null,
    },
    buttonText: "Book Now",
    buttonLink: "/request-service?service=consultation_with_associate",
    note: "",
  },
  {
    id: "pt-12",
    title: "Express Cover Letter",
    slug: "express_cover_letter",
    description: "Urgent cover letter delivered in 24 hours.",
    price: {
      currency: "KSH",
      amount: 6000,
      validity: null,
    },
    buttonText: "Get Started",
    buttonLink: "/request-service?service=express_cover_letter",
    note: "",
  },
  {
    id: "pt-13",
    title: "Career Coaching 1-hour Session",
    slug: "career_coaching_1_hour_session",
    description: "Set career goals and overcome career obstacles.",
    price: {
      currency: "KSH",
      amount: 16000,
      validity: null,
    },
    buttonText: "Book Session",
    buttonLink: "/request-service?service=career_coaching_1_hour_session",
    note: "",
  },
  {
    id: "pt-14",
    title: "Interview Preparation",
    slug: "interview_preparation",
    description: "Prepare thoroughly to excel in job interviews.",
    price: {
      currency: "KSH",
      amount: 21000,
      validity: null,
    },
    buttonText: "Prepare Now",
    buttonLink: "/request-service?service=interview_preparation",
    note: "",
  },
  {
    id: "pt-15",
    title: "Networking Templates for LinkedIn & Email",
    slug: "networking_templates_for_linkedin_email",
    description: "Professional templates for networking success.",
    price: {
      currency: "KSH",
      amount: 4500,
      validity: null,
    },
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
    price: {
      currency: "KSH",
      amount: 9000,
      validity: null,
    },
    buttonText: "Get Package",
    buttonLink: "/request-service?service=graduate_package",
    note: "",
  },

  // Bundled Services
  {
    title: "Silver Package",
    slug: "silver_package",
    description:
      "Essentials for a strong job application. Includes Modern CV and ATS-optimized CV.",
    price: {
      currency: "KSH",
      amount: 8000,
      validity: null,
    },
  },
  {
    title: "Gold Package",
    slug: "gold_package",
    description:
      "Step up your job search with a Modern CV, ATS CV, Cover Letter, and a consultation session.",
    price: {
      currency: "KSH",
      amount: 12000,
      validity: null,
    },
  },
  {
    title: "Platinum Package",
    slug: "platinum_package",
    description:
      "The complete package! Includes all services: Modern CV, ATS CV, Cover Letter, Consultation, and LinkedIn profile optimization.",
    price: {
      currency: "KSH",
      amount: 18000,
      validity: null,
    },
  },
]);

const route = useRoute();

const serviceChosen = ref(null);

const getServiceDetails = () => {
  const serviceSlug = route.query.service;
  if (serviceSlug) {
    const foundService = services.value.find(
      (service) => service.slug === serviceSlug
    );
    if (foundService) {
      serviceChosen.value = foundService;
    } else {
      console.log("problem here");
    }
  }
};

const { requestServiceFormState, submitRequestServicesForm } = useForms();

onMounted(async () => {
  await getServiceDetails();

  requestServiceFormState.value.service = serviceChosen.value.title;
});
</script>

<template>
  <div>
    <section
      id="contacts-1"
      class="pb-50 inner-page-hero contacts-section division"
    >
      <div class="container">
        <!-- SECTION TITLE -->
        <div class="row justify-content-center">
          <div class="col-md-10 col-lg-9">
            <div class="section-title text-center mb-80">
              <!-- Title -->
              <h2 class="s-52 w-700">{{ serviceChosen?.title }}</h2>
              <!-- Text -->
              <p class="p-lg">
                {{ serviceChosen?.description }}
              </p>
              <p class="p-sm color--theme">
                <NuxtLink to="#"
                  >Express total: KSH
                  {{ serviceChosen?.price?.amount }}</NuxtLink
                >.
              </p>
            </div>
          </div>
        </div>
        <!-- CONTACT FORM -->
        <div class="row justify-content-center">
          <div class="col-md-11 col-lg-10 col-xl-8">
            <div class="form-holder">
              <form
                @submit.prevent="submitRequestServicesForm"
                name="request_services_form"
                class="row contact-form"
              >
                <!-- Contact Form Input -->
                <div class="col-md-6">
                  <p class="p-lg">Your Name:</p>
                  <span>Please enter your full name:</span>
                  <input
                    type="text"
                    name="name"
                    class="form-control name"
                    placeholder="Enter your full name*"
                    v-model="requestServiceFormState.name"
                  />
                </div>

                <div class="col-md-6">
                  <p class="p-lg">Your Email Address:</p>
                  <span>Provide your email for us to respond:</span>
                  <input
                    type="email"
                    name="email"
                    class="form-control email"
                    placeholder="Enter your email address*"
                    v-model="requestServiceFormState.email"
                  />
                </div>

                <!-- Contact Form Input -->
                <div class="col-md-6">
                  <p class="p-lg">Your Phone Number:</p>
                  <span>Please enter your phone number:</span>
                  <input
                    type="text"
                    name="phone_number"
                    class="form-control phone_number"
                    placeholder="Enter your phone number*"
                    v-model="requestServiceFormState.phone_number"
                  />
                </div>

                <!-- Contact Form Input -->
                <div class="col-md-6">
                  <p class="p-lg">When Can We Contact You:</p>
                  <span>Please select a date:</span>
                  <input
                    type="date"
                    name="date"
                    class="form-control date"
                    placeholder="Enter a date*"
                    v-model="requestServiceFormState.date"
                  />
                </div>

                <div class="col-md-12">
                  <p class="p-lg">Tell us more about your needs:</p>
                  <span>
                    Provide details about your request so we can assist you
                    effectively:
                  </span>
                  <textarea
                    class="form-control message"
                    name="message"
                    rows="6"
                    placeholder="Describe your inquiry or request in detail*"
                    v-model="requestServiceFormState.description"
                  ></textarea>
                </div>

                <!-- Contact Form Button -->
                <div class="col-md-12 mt-15 form-btn text-right">
                  <button
                    type="submit"
                    class="btn btn--theme hover--theme submit"
                  >
                    Request Service
                  </button>
                </div>

                <div class="contact-form-notice">
                  <p class="p-sm">
                    We value your privacy. Dafeena Consultancy uses the
                    information you provide to contact you about our services
                    and offerings. You can opt out at any time. Learn more in
                    our
                    <NuxtLink to="/privacy">Privacy Policy</NuxtLink>.
                  </p>
                </div>

                <!-- Contact Form Message -->
                <div class="col-lg-12 contact-form-msg">
                  <span class="loading"></span>
                </div>
              </form>
            </div>
          </div>
        </div>
        <!-- END CONTACT FORM -->
      </div>
      <!-- End container -->
    </section>
    <hr class="divider" />
  </div>
</template>
