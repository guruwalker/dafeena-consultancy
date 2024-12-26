<script setup lang="ts">
const testimonials = ref([
  {
    id: 1,
    text: "Thanks to this platform, I landed my dream role as a Frontend Developer within weeks. I couldn't be happier!",
    author: "John Kimani",
    role: "Frontend Developer",
    avatar: "/assets/images/color-scheme/blue.jpg",
  },
  {
    id: 2,
    text: "Finding a position as an Accountant was so smooth! The process was clear, and I got several offers quickly.",
    author: "Faith Nyambura",
    role: "Accountant",
    avatar: "/assets/images/color-scheme/crocus.jpg",
  },
  {
    id: 3,
    text: "As a recent graduate, I was struggling to find work. Virginia and the teamhelped me secure my first internship!",
    author: "Brian Mwangi",
    role: "IT Intern",
    avatar: "/assets/images/color-scheme/green.jpg",
  },
  {
    id: 4,
    text: "I never thought it would be this easy to connect with companies in my field. Highly recommend it.",
    author: "Ann Wanjiku",
    role: "Data Analyst",
    avatar: "/assets/images/color-scheme/magenta.jpg",
  },
  {
    id: 5,
    text: "I am so grateful for the opportunities here. I transitioned from customer service to project management seamlessly.",
    author: "David Otieno",
    role: "Project Manager",
    avatar: "/assets/images/color-scheme/pink.jpg",
  },
  {
    id: 6,
    text: "From uploading my CV to getting hired as a Marketing Executive, this was a life-changing experience!",
    author: "Esther Chege",
    role: "Marketing Executive",
    avatar: "/assets/images/color-scheme/purple.jpg",
  },
  {
    id: 7,
    text: "I'm now working as a Backend Engineer at a leading tech firm. Virginia and the teamtruly delivers!",
    author: "Sam Kibet",
    role: "Backend Engineer",
    avatar: "/assets/images/color-scheme/red.jpg",
  },
  {
    id: 8,
    text: "After struggling for months, I finally got a role as an HR Coordinator. Thank you so much!",
    author: "Mercy Achieng",
    role: "HR Coordinator",
    avatar: "/assets/images/color-scheme/skyblue.jpg",
  },
  {
    id: 9,
    text: "I was able to land a remote job as a Graphic Designer through this site. Couldn't recommend it more!",
    author: "Pauline Njeri",
    role: "Graphic Designer",
    avatar: "/assets/images/color-scheme/violet.jpg",
  },
  {
    id: 10,
    text: "The platform was easy to use, and I got hired as an Electrical Engineer within a month. Very satisfied!",
    author: "Martin Kioko",
    role: "Electrical Engineer",
    avatar: "/assets/images/color-scheme/blue.jpg",
  },
  {
    id: 11,
    text: "As a Software Tester, I needed the right fit. Virginia and the teamprovided exactly that. Amazing results!",
    author: "Nancy Wairimu",
    role: "Software Tester",
    avatar: "/assets/images/color-scheme/crocus.jpg",
  },
  {
    id: 12,
    text: "I’m finally working as an Administrative Assistant. The support here is unmatched. Highly recommended!",
    author: "Clara Ochieng",
    role: "Admin Assistant",
    avatar: "/assets/images/color-scheme/green.jpg",
  },
  {
    id: 13,
    text: "Switching careers felt overwhelming, but I found a great opportunity as a Business Consultant.",
    author: "Kevin Ndungu",
    role: "Business Consultant",
    avatar: "/assets/images/color-scheme/magenta.jpg",
  },
  {
    id: 14,
    text: "Virginia and the teammade my job hunt stress-free. I’m now a Content Writer for a fast-growing company.",
    author: "Joan Maina",
    role: "Content Writer",
    avatar: "/assets/images/color-scheme/pink.jpg",
  },
  {
    id: 15,
    text: "I appreciate how seamless everything was. I'm now a UX Designer at my dream startup!",
    author: "Elias Mutua",
    role: "UX Designer",
    avatar: "/assets/images/color-scheme/purple.jpg",
  },
  {
    id: 16,
    text: "Finding my first junior developer role felt effortless. Thank you for opening so many doors!",
    author: "Peter Njoroge",
    role: "Junior Developer",
    avatar: "/assets/images/color-scheme/red.jpg",
  },
  {
    id: 17,
    text: "I secured a full-time role as an Operations Manager in just weeks. Virginia and the teamworks!",
    author: "Judith Karanja",
    role: "Operations Manager",
    avatar: "/assets/images/color-scheme/skyblue.jpg",
  },
]);
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
