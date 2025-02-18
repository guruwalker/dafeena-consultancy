<script setup>
useSeoMeta({
  title: "Schedule Consultation",
  ogTitle: "Schedule Consultation",
  description: "Get a free consultation today!",
  ogDescription: "Get a free consultation today!",
});

useHead({
  bodyAttrs: {
    class: "navbar-dark navbar-dark-2",
  },
});

const { scheduleConsultationFormState, submitScheduleConsultationForm } = useForms();
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
              <h2 class="s-52 w-700">Schedule Consultation</h2>
              <!-- Text -->
              <p class="p-lg">
                Book a free conversation with our experts and get the guidance
                you need to take the next step in your career or business.
              </p>
              <p class="p-sm color--theme">
                <NuxtLink to="#">Express total: FREE</NuxtLink>.
              </p>
            </div>
          </div>
        </div>
        <!-- CONTACT FORM -->
        <div class="row justify-content-center">
          <div class="col-md-11 col-lg-10 col-xl-8">
            <div class="form-holder">
              <form
                @submit.prevent="submitScheduleConsultationForm"
                name="request_consultation_form"
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
                    v-model="scheduleConsultationFormState.name"
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
                    v-model="scheduleConsultationFormState.email"
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
                    v-model="scheduleConsultationFormState.phone_number"
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
                    v-model="scheduleConsultationFormState.date"
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
                    v-model="scheduleConsultationFormState.description"
                  ></textarea>
                </div>

                <!-- Contact Form Button -->
                <div class="col-md-12 mt-15 form-btn text-right">
                  <button
                    type="submit"
                    class="btn btn--theme hover--theme submit"
                  >
                    Submit
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
