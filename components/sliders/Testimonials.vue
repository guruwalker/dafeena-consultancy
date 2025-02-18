<script setup lang="ts">
import Testimonials from '~~/components/Data/Testimonials'
const testimonials = ref(Testimonials);
</script>

<template>
  <div class="reviews-1-wrapper">
    <Swiper :modules="[SwiperAutoplay, SwiperEffectCreative]" :slides-per-view="1" :loop="true" :autoplay="{
      delay: 8000,
      disableOnInteraction: true,
    }" :breakpoints="{
      600: { slidesPerView: 2 },
      920: { slidesPerView: 3 },
    }">
      <SwiperSlide v-for="testimonial in testimonials" :key="testimonial.id" class="mx-3">
        <SharedTestimonialsCard :testimonial="testimonial" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>
