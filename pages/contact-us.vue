<script setup>
useSeoMeta({
  title: "Contact Us",
  ogTitle: "Contact Us",
  description:
    "Get in touch with us",
  ogDescription:
    "Get in touch with us",
});

useHead({
  bodyAttrs: {
    class: "navbar-dark navbar-dark-2",
  },
});

const { contactUsFormState, submitContactUsForm } = useForms();
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
              <h2 class="s-52 w-700">Questions? Let's Talk</h2>
              <!-- Text -->
              <p class="p-lg">
                Want to learn more about our services, get a quote, or speak
                with an expert? Let us know what you are looking for and we’ll
                get back to you right away
              </p>
            </div>
          </div>
        </div>
        <!-- CONTACT FORM -->
        <div class="row justify-content-center">
          <div class="col-md-11 col-lg-10 col-xl-8">
            <div class="form-holder">
              <form
                @submit.prevent="submitContactUsForm"
                name="contactform"
                class="row contact-form"
              >
                <!-- Form Select -->
                <div class="col-md-12 input-subject">
                  <p class="p-lg">What is your inquiry about?</p>
                  <span>Select a topic, so we can best assist you:</span>
                  <select
                    class="form-select subject"
                    aria-label="Default select example"
                    v-model="contactUsFormState.topic"
                    placeholder="Please choose a topic"
                  >
                    <option value="Virtual Assistance Services">
                      Virtual Assistance Services
                    </option>
                    <option value="Career Packaging (Resumes, Cover Letters)">
                      Career Packaging (Resumes, Cover Letters)
                    </option>
                    <option value="Career Coaching">Career Coaching</option>
                    <option value="Branding Consultation">
                      Branding Consultation
                    </option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>

                <!-- Contact Form Input -->
                <div class="col-md-12">
                  <p class="p-lg">Your Name:</p>
                  <span>Please enter your full name:</span>
                  <input
                    type="text"
                    name="name"
                    class="form-control name"
                    placeholder="Enter your full name*"
                    v-model="contactUsFormState.name"
                  />
                </div>

                <div class="col-md-12">
                  <p class="p-lg">Your Email Address:</p>
                  <span>Provide your email for us to respond:</span>
                  <input
                    type="email"
                    name="email"
                    class="form-control email"
                    placeholder="Enter your email address*"
                    v-model="contactUsFormState.email"
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
                    v-model="contactUsFormState.description"
                  ></textarea>
                </div>

                <!-- Contact Form Button -->
                <div class="col-md-12 mt-15 form-btn text-right">
                  <button
                    type="submit"
                    class="btn btn--theme hover--theme submit"
                  >
                    Submit Inquiry
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
