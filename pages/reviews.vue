<script setup>
useHead({
  bodyAttrs: {
    class: "navbar-dark navbar-dark-2",
  },
});

const testimonials = ref([
  {
    id: 1,
    text: "Thanks to this platform, I landed my dream role as a Frontend Developer within weeks. I couldn't be happier!",
    author: "John Kimani",
    role: "Frontend Developer",
    avatar: "/assets/images/review-author-1.jpg",
  },
  {
    id: 2,
    text: "Finding a position as an Accountant was so smooth! The process was clear, and I got several offers quickly.",
    author: "Faith Nyambura",
    role: "Accountant",
    avatar: "/assets/images/review-author-2.jpg",
  },
  {
    id: 3,
    text: "As a recent graduate, I was struggling to find work. This platform helped me secure my first internship!",
    author: "Brian Mwangi",
    role: "IT Intern",
    avatar: "/assets/images/review-author-3.jpg",
  },
  {
    id: 4,
    text: "I never thought it would be this easy to connect with companies in my field. Highly recommend it.",
    author: "Ann Wanjiku",
    role: "Data Analyst",
    avatar: "/assets/images/review-author-4.jpg",
  },
  {
    id: 5,
    text: "I am so grateful for the opportunities here. I transitioned from customer service to project management seamlessly.",
    author: "David Otieno",
    role: "Project Manager",
    avatar: "/assets/images/review-author-5.jpg",
  },
  {
    id: 6,
    text: "From uploading my CV to getting hired as a Marketing Executive, this was a life-changing experience!",
    author: "Esther Chege",
    role: "Marketing Executive",
    avatar: "/assets/images/review-author-6.jpg",
  },
  {
    id: 7,
    text: "I'm now working as a Backend Engineer at a leading tech firm. This platform truly delivers!",
    author: "Sam Kibet",
    role: "Backend Engineer",
    avatar: "/assets/images/review-author-7.jpg",
  },
  {
    id: 8,
    text: "After struggling for months, I finally got a role as an HR Coordinator. Thank you so much!",
    author: "Mercy Achieng",
    role: "HR Coordinator",
    avatar: "/assets/images/review-author-8.jpg",
  },
  {
    id: 9,
    text: "I was able to land a remote job as a Graphic Designer through this site. Couldn't recommend it more!",
    author: "Pauline Njeri",
    role: "Graphic Designer",
    avatar: "/assets/images/review-author-1.jpg",
  },
  {
    id: 10,
    text: "The platform was easy to use, and I got hired as an Electrical Engineer within a month. Very satisfied!",
    author: "Martin Kioko",
    role: "Electrical Engineer",
    avatar: "/assets/images/review-author-2.jpg",
  },
  {
    id: 11,
    text: "As a Software Tester, I needed the right fit. This platform provided exactly that. Amazing results!",
    author: "Nancy Wairimu",
    role: "Software Tester",
    avatar: "/assets/images/review-author-3.jpg",
  },
  {
    id: 12,
    text: "I’m finally working as an Administrative Assistant. The support here is unmatched. Highly recommended!",
    author: "Clara Ochieng",
    role: "Admin Assistant",
    avatar: "/assets/images/review-author-4.jpg",
  },
  {
    id: 13,
    text: "Switching careers felt overwhelming, but I found a great opportunity as a Business Consultant.",
    author: "Kevin Ndungu",
    role: "Business Consultant",
    avatar: "/assets/images/review-author-3.jpg",
  },
  {
    id: 14,
    text: "This platform made my job hunt stress-free. I’m now a Content Writer for a fast-growing company.",
    author: "Joan Maina",
    role: "Content Writer",
    avatar: "/assets/images/review-author-4.jpg",
  },
  {
    id: 15,
    text: "I appreciate how seamless everything was. I'm now a UX Designer at my dream startup!",
    author: "Elias Mutua",
    role: "UX Designer",
    avatar: "/assets/images/review-author-5.jpg",
  },
  {
    id: 16,
    text: "Finding my first junior developer role felt effortless. Thank you for opening so many doors!",
    author: "Peter Njoroge",
    role: "Junior Developer",
    avatar: "/assets/images/review-author-6.jpg",
  },
  {
    id: 17,
    text: "I secured a full-time role as an Operations Manager in just weeks. This platform works!",
    author: "Judith Karanja",
    role: "Operations Manager",
    avatar: "/assets/images/review-author-7.jpg",
  },
  // {
  //   id: 18,
  //   text: "It’s rare to find tools this effective. I’m now working remotely as a Cybersecurity Analyst!",
  //   author: "Dennis Mwema",
  //   role: "Cybersecurity Analyst",
  //   avatar: "/assets/images/review-author-8.jpg",
  // },
  // {
  //   id: 19,
  //   text: "The experience here was fantastic. I got hired as a Logistics Coordinator with ease.",
  //   author: "Jane Nduta",
  //   role: "Logistics Coordinator",
  //   avatar: "/assets/images/review-author-1.jpg",
  // },
  // {
  //   id: 20,
  //   text: "This platform helped me showcase my skills. I’m now a Senior Product Manager at a tech company!",
  //   author: "Francis Ouma",
  //   role: "Product Manager",
  //   avatar: "/assets/images/review-author-2.jpg",
  // },
]);

</script>

<template>
  <div>
    <section
      id="reviews-2"
      class="gr--whitesmoke inner-page-hero reviews-section"
    >
      <div class="container">
        <!-- SECTION TITLE -->
        <div class="row justify-content-center">
          <div class="col-md-10 col-lg-9">
            <div class="section-title mb-70">
              <!-- Title -->
              <h2 class="s-52 w-700">
                Real Stories From Real Customers
              </h2>
              <!-- Text -->
              <p class="s-21 color--grey">Read what customers think about us</p>
            </div>
          </div>
        </div>
        <!-- TESTIMONIALS-2 WRAPPER -->
        <div class="reviews-2-wrapper rel">
          <div class="row align-items-center row-cols-1 row-cols-md-2"  style="display: flex; ">
            <div
              v-for="testimonial in testimonials"
              :key="testimonial.id"
              class="col"
              style="display: flex; flex-grow: 1;"
            >
              <div
                id="rw-2-2"
                class="review-2 bg--white-100 block-shadow r-08"
              >
                <!-- Quote Icon -->
                <div class="review-ico ico-65">
                  <span class="flaticon-quote"></span>
                </div>
                <!-- Text -->
                <div class="review-txt">
                  <!-- Text -->
                  <p>{{ testimonial.text }}</p>
                  <!-- Author -->
                  <div class="author-data clearfix">
                    <!-- Avatar -->
                    <div class="review-avatar">
                      <img :src="testimonial.avatar" alt="review-avatar" />
                    </div>
                    <!-- Data -->
                    <div class="review-author">
                      <h6 class="s-18 w-700">{{ testimonial.author }}</h6>
                      <p class="p-sm">{{ testimonial.role }}</p>
                    </div>
                  </div>
                  <!-- End Author -->
                </div>
                <!-- End Text -->
              </div>
            </div>
          </div>
          <!-- End row -->
        </div>
        <!-- END TESTIMONIALS-2 WRAPPER -->
      </div>
      <!-- End container -->
    </section>
  </div>
</template>
