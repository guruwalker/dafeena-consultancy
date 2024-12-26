<script setup lang="ts">
const teamMembers = [
  {
    name: "Virginia Michaels",
    role: "Founder and CEO",
    photo: "/assets/images/team/virginia.png",
  },
  {
    name: "Jaime Fletcher",
    role: "Software Engineer",
    photo: "/assets/images/team-2.jpg",
  },
  {
    name: "Wahome Maina",
    role: "Software Engineer",
    photo: "/assets/images/team-3.jpg",
  },
  {
    name: "Grow with Us!",
    role: '<a href="mailto:hello@dafeenaconsultancy.com">hello@dafeenaconsultancy.com</a>',
    photo: "/assets/images/team-13.jpg",
  },
];
</script>

<template>
  <section id="team-1" class="pt-100 team-section">
    <div class="container">
      <!-- SECTION TITLE -->
      <div class="row justify-content-center">
        <div class="col-md-10 col-lg-9">
          <div class="section-title mb-80">
            <!-- Title -->
            <h2 class="s-50 w-700">
              All we do is dream and craft amazing products
            </h2>
            <!-- Text -->
            <p class="s-21 color--grey">
              Ligula risus auctor tempus magna feugiat lacinia.
            </p>
          </div>
        </div>
      </div>
      <!-- TEAM MEMBERS WRAPPER -->
      <div class="team-members-wrapper">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
          <div class="col" v-for="(member, index) in teamMembers" :key="index">
            <div class="team-member mb-50 wow fadeInUp">
              <!-- Team Member Photo -->
              <div class="team-member-photo r-14">
                <div class="hover-overlay">
                  <img
                    class="img-fluid"
                    :src="member.photo"
                    alt="team-member-foto"
                  />
                  <div class="item-overlay"></div>
                </div>
              </div>
              <!-- Team Member Data -->
              <div class="team-member-data">
                <h6 class="s-20 w-700 color--black">{{ member.name }}</h6>
                <p class="color--grey" v-html="member.role"></p>
              </div>
            </div>
          </div>
        </div>
        <!-- End row -->
      </div>
      <!-- TEAM MEMBERS WRAPPER -->
      <!-- MORES BUTTON -->
      <div class="row">
        <div class="col">
          <div class="more-btn text-center mt-20 wow fadeInUp">
            <NuxtLink to="/careers" class="btn btn--tra-black hover--theme"
              >Join our team</NuxtLink
            >
          </div>
        </div>
      </div>
    </div>
    <!-- End container -->
  </section>
</template>
