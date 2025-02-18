<script setup lang="ts">
const bundledServices = ref([
  {
    feature: "Administrative Support",
    silver: true,
    gold: true,
    platinum: true,
    buttonLink: "/request-service?service=administrative_support",
  },
  {
    feature: "Social Media Management",
    silver: false,
    gold: true,
    platinum: true,
    buttonLink: "/request-service?service=social_media_management",
  },
  {
    feature: "Content Creation & Writing",
    silver: false,
    gold: true,
    platinum: true,
    buttonLink: "/request-service?service=content_writing",
  },
  {
    feature: "Customer Service",
    silver: false,
    gold: true,
    platinum: true,
    buttonLink: "/request-service?service=customer_service",
  },
  {
    feature: "Data Management & Research",
    silver: false,
    gold: false,
    platinum: true,
    buttonLink: "/request-service?service=data_management",
  },
  {
    feature: "Price (per month)",
    silver: "KSH 10,000",
    gold: "KSH 18,000",
    platinum: "KSH 25,000",
  },
  {
    feature: "Hourly Rate",
    silver: "KSH 1,500",
    gold: "KSH 2,500",
    platinum: "KSH 3,500",
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
  <section id="comp-table" class="pb-60 pricing-section division">
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
                          href="/request-service?service=va_silver_package"
                          class="btn btn--theme hover--theme"
                        >
                          Request Package</a
                        >
                      </template>

                      <template v-else-if="value === '/gold'">
                        <a
                          href="/request-service?service=va_gold_package"
                          class="btn btn--theme hover--theme"
                        >
                          Request Package</a
                        >
                      </template>

                      <template v-else-if="value === '/platinum'">
                        <a
                          href="/request-service?service=va_platinum_package"
                          class="btn btn--theme hover--theme"
                        >
                          Request Package</a
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
                <li>
                  <img
                    src="/assets/images/png_icons/paypal.png"
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
