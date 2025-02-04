<script setup lang="ts">
import Testimonials from '~~/components/Data/Testimonials'
const testimonials = ref(Testimonials);
</script>

<template>
  <div class="reviews-1-wrapper">
    <Swiper
      :modules="[SwiperAutoplay, SwiperEffectCreative]"
      :slides-per-view="1"
      :loop="true"
      :autoplay="{
        delay: 8000,
        disableOnInteraction: true,
      }"
      :breakpoints="{
        600: { slidesPerView: 2 },
        920: { slidesPerView: 3 },
      }"
    >
      <SwiperSlide v-for="testimonial in testimonials" :key="testimonial.id">
        <div class="review-1 bg--white-100 block-shadow r-08">
          <div class="review-ico ico-65">
            <span class="flaticon-quote"></span>
          </div>
          <div class="review-txt">
            <p>{{ testimonial.text }}</p>
            <div class="author-data clearfix">
              <div class="review-avatar">
                <img :src="testimonial.avatar" alt="review-avatar" />
              </div>
              <div class="review-author">
                <h6 class="s-18 w-700">{{ testimonial.author }}</h6>
                <p class="p-sm">{{ testimonial.role }}</p>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>
