<script setup lang="ts">
const plans = ref([
  {
    feature: "Modern CV",
    silver: true,
    gold: true,
    platinum: true,
  },
  {
    feature: "ATS CV",
    silver: true,
    gold: true,
    platinum: true,
  },
  {
    feature: "Cover Letter",
    silver: false,
    gold: true,
    platinum: true,
  },
  {
    feature: "Consultation with associate",
    silver: false,
    gold: true,
    platinum: true,
  },
  {
    feature: "LinkedIn",
    silver: false,
    gold: false,
    platinum: true,
  },
  {
    feature: "Price",
    silver: "KSH 8,000",
    gold: "KSH 12,000",
    platinum: "KSH 18,000",
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
      <div class="comp-table wow fadeInUp">
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
                  <tr v-for="(plan, index) in plans" :key="index">
                    <!-- Feature Name -->
                    <th scope="row" class="text-start">{{ plan.feature }}</th>

                    <!-- Silver, Gold, Platinum Packages -->
                    <td
                      v-for="(value, key) in {
                        silver: plan.silver,
                        gold: plan.gold,
                        platinum: plan.platinum,
                      }"
                      :key="key"
                    >
                      <template v-if="typeof value !== 'boolean'">
                        {{ value }}
                      </template>
                      <template v-else>
                        <span
                          :class="
                            value
                              ? 'ico-20 color--theme'
                              : 'ico-15 disabled-option'
                          "
                        >
                          <span
                            :class="
                              value ? 'flaticon-check' : 'flaticon-cancel'
                            "
                          ></span>
                        </span>
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
            <div id="pbox-1" class="pbox mb-40 wow fadeInUp">
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
          <!-- Payment Guarantee -->
          <div class="col col-lg-4">
            <div id="pbox-2" class="pbox mb-40 wow fadeInUp">
              <!-- Title -->
              <h6 class="s-18 w-700">Money Back Guarantee</h6>
              <!-- Text -->
              <p>
                Explore Martex platinum for 14 days. If it’s not a perfect fit,
                receive a full refund.
              </p>
            </div>
          </div>
          <!-- Payment Encrypted -->
          <div class="col col-lg-3">
            <div id="pbox-3" class="pbox mb-40 wow fadeInUp">
              <!-- Title -->
              <h6 class="s-18 w-700">SSL Encrypted Payment</h6>
              <!-- Text -->
              <p>Your information is protected by 256-bit SSL encryption.</p>
            </div>
          </div>
        </div>
      </div>
      <!-- END PRICING COMPARE PAYMENT -->
    </div>
    <!-- End container -->
  </section>
</template>
