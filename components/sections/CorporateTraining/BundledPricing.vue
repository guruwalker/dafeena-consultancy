<script setup lang="ts">
const bundledServices = ref([
  {
    feature: "Training Duration (Days)",
    silver: "1-2 days",
    gold: "3-4 days",
    platinum: "5+ days",
    description:
      "Length of the training program tailored to organizational needs.",
  },
  {
    feature: "Number of Trainers",
    silver: "1 trainer",
    gold: "2 trainers",
    platinum: "3+ trainers",
    description: "Experienced professionals delivering the training sessions.",
  },
  {
    feature: "Delivery Method",
    silver: "Online",
    gold: "On-site",
    platinum: "Hybrid (Online & On-site)",
    description: "Mode of training delivery to suit company preferences.",
  },
  {
    feature: "Customization Level",
    silver: "Standard Content",
    gold: "Customized Content",
    platinum: "Fully Tailored Content",
    description:
      "Degree of content customization to align with company objectives.",
  },
  {
    feature: "Post-Training Support",
    silver: "1-week email support",
    gold: "1-month email and phone support",
    platinum: "3-month comprehensive support",
    description:
      "Duration and type of support available after training completion.",
  },
  {
    feature: "Training Materials",
    silver: "Digital handouts",
    gold: "Printed manuals",
    platinum: "Printed manuals and access to online resources",
    description: "Resources provided to participants for reference.",
  },
  {
    feature: "Assessment & Certification",
    silver: "Participation Certificate",
    gold: "Completion Certificate with Assessment",
    platinum: "Advanced Certification with Project Evaluation",
    description: "Recognition awarded upon successful training completion.",
  },
  {
    feature: "Group Size",
    silver: "Up to 20 participants",
    gold: "Up to 50 participants",
    platinum: "Unlimited participants",
    description: "Maximum number of attendees per training session.",
  },
  {
    feature: "Price Estimate",
    silver: "KES 50,000",
    gold: "KES 90,000",
    platinum: "KES 150,000",
    description: "Estimated cost of the training package.",
  },
  {
    feature: "",
    silver: "/silver",
    gold: "/gold",
    platinum: "/platinum",
  },
]);
</script>

<template>
  <section id="comp-table" class="py-60 pricing-section division">
    <div class="container">
      <!-- SECTION TITLE -->
      <div class="row justify-content-center">
        <div class="col-md-10 col-lg-9">
          <div class="section-title mb-70">
            <!-- Title -->
            <h2 class="s-52 w-700">Bundled Plans</h2>
            <!-- Text -->
            <p class="p-xl">
              Complete list of features available in our pricing plans
            </p>
          </div>
        </div>
      </div>
      <!-- PRICING COMPARE -->
      <div class="comp-table animate__animated animate__fadeInUp">
        <div class="row">
          <div class="col">
            <!-- Table -->
            <div class="table-responsive mb-50">
              <table class="table text-center">
                <thead>
                  <tr>
                    <th style="width: 34%"></th>
                    <th style="width: 22%">Silver Package</th>
                    <th style="width: 22%">Gold Package</th>
                    <th style="width: 22%">Platinum Package</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(plan, index) in bundledServices" :key="index">
                    <th scope="row" class="text-start">{{ plan.feature }}</th>

                    <td
                      v-for="(value, key) in {
                        silver: plan.silver,
                        gold: plan.gold,
                        platinum: plan.platinum,
                      }"
                      :key="key"
                    >
                      <template v-if="value === '/silver'">
                        <a
                          href="/request-service?service=corporate_silver_package"
                          class="btn btn--theme hover--theme"
                        >
                          Request Quote</a
                        >
                      </template>

                      <template v-else-if="value === '/gold'">
                        <a
                          href="/request-service?service=corporate_gold_package"
                          class="btn btn--theme hover--theme"
                        >
                          Request Quote</a
                        >
                      </template>

                      <template v-else-if="value === '/platinum'">
                        <a
                          href="/request-service?service=corporate_platinum_package"
                          class="btn btn--theme hover--theme"
                        >
                          Request Quote</a
                        >
                      </template>

                      <template v-else-if="typeof value === 'string'">
                        {{ value }}
                      </template>

                      <template v-else-if="value">
                        <span class="ico-20 color--theme">
                          <span class="flaticon-check"></span>
                        </span>
                      </template>

                      <template
                        v-else-if="
                          !value && index !== bundledServices.length - 1
                        "
                      >
                        <span class="ico-15 disabled-option">
                          <span class="flaticon-cancel"></span>
                        </span>
                      </template>

                      <template
                        v-else-if="
                          !value && index === bundledServices.length - 1
                        "
                      >
                      </template>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- End Table -->
          </div>
        </div>
      </div>
      <!-- END PRICING COMPARE -->
      <!-- PRICING COMPARE PAYMENT -->
      <div class="comp-table-payment">
        <div class="row row-cols-1 row-cols-md-3">
          <!-- Payment Methods -->
          <div class="col col-lg-5">
            <div
              id="pbox-1"
              class="pbox mb-40 animate__animated animate__fadeInUp"
            >
              <!-- Title -->
              <h6 class="s-18 w-700">Accepted Payment Methods</h6>
              <!-- Payment Icons -->
              <ul class="payment-icons ico-45 mt-25">
                <li>
                  <img
                    src="/assets/images/png_icons/visa.png"
                    alt="payment-icon"
                  />
                </li>
                <li>
                  <img
                    src="/assets/images/m-pesa-logo.jpeg"
                    alt="payment-icon"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- END PRICING COMPARE PAYMENT -->
    </div>
    <!-- End container -->
  </section>
</template>
