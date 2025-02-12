<script setup lang="ts">
const props = defineProps({
  testimonial: Object
  })

</script>

<template>
  <div  class="review-2 bg--white-100 block-shadow r-08">
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
</template>
