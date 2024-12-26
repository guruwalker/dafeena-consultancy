<template>
  <div class="brands-carousel-5">
    <Swiper
      :modules="[SwiperAutoplay, SwiperEffectCreative]"
      :slides-per-view="2"
      :loop="true"
      :autoplay="{
        delay: 8000,
        disableOnInteraction: true,
      }"
      :breakpoints="{
        400: { slidesPerView: 2 },
        600: { slidesPerView: 3 },
        900: { slidesPerView: 4 },
        1024: { slidesPerView: 5 },
      }"
    >
      <SwiperSlide style="display: flex; align-items: center">
        <div class="brand-logo">
          <img
            class="img-fluid theme-light"
            src="/assets/images/companies/safaricom-logo.png"
            alt="brand-logo"
          />
          <img
            class="img-fluid theme-dark"
            src="/assets/images/companies/safaricom-logo.png"
            alt="brand-logo"
          />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div class="brand-logo">
          <img
            class="img-fluid theme-light"
            src="/assets/images/companies/jubilee-logo.png"
            alt="brand-logo"
          />
          <img
            class="img-fluid theme-dark"
            src="/assets/images/companies/jubilee-logo.png"
            alt="brand-logo"
          />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div class="brand-logo">
          <img
            class="img-fluid theme-light"
            src="/assets/images/companies/absa-logo2.png"
            alt="brand-logo"
          />
          <img
            class="img-fluid theme-dark"
            src="/assets/images/companies/absa-logo2.png"
            alt="brand-logo"
          />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div class="brand-logo">
          <img
            class="img-fluid theme-light"
            src="/assets/images/companies/microsoft-logo.png"
            alt="brand-logo"
          />
          <img
            class="img-fluid theme-dark"
            src="/assets/images/companies/microsoft-logo.png"
            alt="brand-logo"
          />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div class="brand-logo">
          <img
            class="img-fluid theme-light"
            src="/assets/images/companies/kplc-logo.jpeg"
            alt="brand-logo"
          />
          <img
            class="img-fluid theme-dark"
            src="/assets/images/companies/kplc-logo.jpeg"
            alt="brand-logo"
          />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div class="brand-logo">
          <img
            class="img-fluid theme-light"
            src="/assets/images/companies/eabl-logo.png"
            alt="brand-logo"
          />
          <img
            class="img-fluid theme-dark"
            src="/assets/images/companies/eabl-logo.png"
            alt="brand-logo"
          />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div class="brand-logo">
          <img
            class="img-fluid theme-light"
            src="/assets/images/companies/kcb-logo.png"
            alt="brand-logo"
          />
          <img
            class="img-fluid theme-dark"
            src="/assets/images/companies/kcb-logo.png"
            alt="brand-logo"
          />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div class="brand-logo">
          <img
            class="img-fluid theme-light"
            src="/assets/images/companies/coke.png"
            alt="brand-logo"
          />
          <img
            class="img-fluid theme-dark"
            src="/assets/images/companies/coke.png"
            alt="brand-logo"
          />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div class="brand-logo">
          <img
            class="img-fluid theme-light"
            src="/assets/images/companies/bamburi.png"
            alt="brand-logo"
          />
          <img
            class="img-fluid theme-dark"
            src="/assets/images/companies/bamburi.png"
            alt="brand-logo"
          />
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped lang="scss">
.swiper-wrapper {
  display: flex !important;
  align-items: center !important;
}
</style>
