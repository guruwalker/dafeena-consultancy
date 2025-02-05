<template>
  <div class="brands-carousel-5">
    <Swiper :modules="[SwiperAutoplay, SwiperEffectCreative]" :slides-per-view="2" :loop="true" :autoplay="{
      delay: 8000,
      disableOnInteraction: true,
    }" :breakpoints="{
        400: { slidesPerView: 2 },
        600: { slidesPerView: 3 },
        900: { slidesPerView: 4 },
        1024: { slidesPerView: 5 },
      }">
      <SwiperSlide style="display: flex; align-items: center">
        <div class="brand-logo">
          <img class="img-fluid theme-light" src="/assets/images/flags/usa.svg" alt="brand-logo" />
          <img class="img-fluid theme-dark" src="/assets/images/flags/usa.svg" alt="brand-logo" />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div class="brand-logo">
          <img class="img-fluid theme-light" src="/assets/images/flags/england.svg" alt="brand-logo" />
          <img class="img-fluid theme-dark" src="/assets/images/flags/england.svg" alt="brand-logo" />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div class="brand-logo">
          <img class="img-fluid theme-light" src="/assets/images/flags/australia.svg" alt="brand-logo" />
          <img class="img-fluid theme-dark" src="/assets/images/flags/australia.svg" alt="brand-logo" />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div class="brand-logo">
          <img class="img-fluid theme-light" src="/assets/images/flags/germany.svg" alt="brand-logo" />
          <img class="img-fluid theme-dark" src="/assets/images/flags/germany.svg" alt="brand-logo" />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div class="brand-logo">
          <img class="img-fluid theme-light" src="/assets/images/flags/finland.svg" alt="brand-logo" />
          <img class="img-fluid theme-dark" src="/assets/images/flags/finland.svg" alt="brand-logo" />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div class="brand-logo">
          <img class="img-fluid theme-light" src="/assets/images/flags/sa.svg" alt="brand-logo" />
          <img class="img-fluid theme-dark" src="/assets/images/flags/sa.svg" alt="brand-logo" />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div class="brand-logo">
          <img class="img-fluid theme-light" src="/assets/images/flags/kenya.svg" alt="brand-logo" />
          <img class="img-fluid theme-dark" src="/assets/images/flags/kenya.svg" alt="brand-logo" />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div class="brand-logo">
          <img class="img-fluid theme-light" src="/assets/images/flags/canada.svg" alt="brand-logo" />
          <img class="img-fluid theme-dark" src="/assets/images/flags/canada.svg" alt="brand-logo" />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div class="brand-logo">
          <img class="img-fluid theme-light" src="/assets/images/flags/qatar.svg" alt="brand-logo" />
          <img class="img-fluid theme-dark" src="/assets/images/flags/qatar.svg" alt="brand-logo" />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div class="brand-logo">
          <img class="img-fluid theme-light" src="/assets/images/flags/sa.svg" alt="brand-logo" />
          <img class="img-fluid theme-dark" src="/assets/images/flags/sa.svg" alt="brand-logo" />
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
