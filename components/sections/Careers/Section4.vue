<script setup lang="ts">
const benefitsBoxes = ref([
  {
    id: 2,
    title: "Flexible Schedules",
    icon: "flaticon-time",
    svgPath:
      "M69.8,-23C76.3,-2.7,57.6,25.4,32.9,42.8C8.1,60.3,-22.7,67,-39.1,54.8C-55.5,42.7,-57.5,11.7,-48.6,-11.9C-39.7,-35.5,-19.8,-51.7,5.9,-53.6C31.7,-55.6,63.3,-43.2,69.8,-23Z",
    description:
      "Enjoy the freedom to manage your work hours, balancing personal commitments and career growth.",
  },
  {
    id: 3,
    title: "Remote Work Opportunities",
    icon: "flaticon-profits",
    svgPath:
      "M69.8,-23C76.3,-2.7,57.6,25.4,32.9,42.8C8.1,60.3,-22.7,67,-39.1,54.8C-55.5,42.7,-57.5,11.7,-48.6,-11.9C-39.7,-35.5,-19.8,-51.7,5.9,-53.6C31.7,-55.6,63.3,-43.2,69.8,-23Z",
    description:
      "Work from anywhere, offering flexibility and autonomy to create a productive and enjoyable work environment.",
  },
  {
    id: 4,
    title: "Career Coaching & Mentorship",
    icon: "flaticon-virus-1",
    svgPath:
      "M69.8,-23C76.3,-2.7,57.6,25.4,32.9,42.8C8.1,60.3,-22.7,67,-39.1,54.8C-55.5,42.7,-57.5,11.7,-48.6,-11.9C-39.7,-35.5,-19.8,-51.7,5.9,-53.6C31.7,-55.6,63.3,-43.2,69.8,-23Z",
    description:
      "Personalized coaching and mentorship to guide you through career challenges and opportunities.",
  },
]);
</script>

<template>
  <section id="features-11" class="py-100 features-section division">
    <div class="container">
      <!-- SECTION TITLE -->
      <div class="row justify-content-center">
        <div class="col-md-10 col-lg-9">
          <div class="section-title mb-70">
            <!-- Title -->
            <h2 class="s-52 w-700">Benefits and Perks</h2>
            <!-- Text -->
            <p class="s-21 color--grey">
              Here is why you should work with us!
            </p>
          </div>
        </div>
      </div>
      <!-- FEATURES-11 WRAPPER -->
      <div class="fbox-wrapper">
        <div class="row row-cols-1 row-cols-md-2 rows-3">
          <div
            v-for="(feature, index) in benefitsBoxes"
            :key="feature.id"
            class="col"
          >
            <div :class="['fbox-11', 'fb-' + feature.id, 'animate__animated', 'animate__fadeInUp']">
              <!-- Icon -->
              <div class="fbox-ico-wrap">
                <div class="fbox-ico ico-50">
                  <div class="shape-ico">
                    <!-- Vector Icon -->
                    <span
                      :class="['flaticon', feature.icon, 'color--theme']"
                    ></span>
                    <!-- Shape -->
                    <svg
                      viewBox="0 0 200 200"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        :d="feature.svgPath"
                        fill="#f4f9fc"
                        transform="translate(100 100)"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <!-- End Icon -->
              <!-- Text -->
              <div class="fbox-txt">
                <h6 class="s-22 w-700">{{ feature.title }}</h6>
                <p>{{ feature.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- END FEATURES-11 WRAPPER -->
    </div>
    <!-- End container -->
  </section>
</template>
