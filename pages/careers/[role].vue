<script setup>
useHead({
  bodyAttrs: {
    class: "navbar-dark navbar-dark-2",
  },
});

const route = useRoute();

const roleDetails = ref({
  department: "",
  location: "",
  title: "",
  whatYouWouldDo: "",
  responsibilities: [],
  whoWereLookingFor: [],
  roleDescription: "",
});

const role = ref(route.params.role);

if (role.value === "product-marketing-manager") {
  roleDetails.value = {
    department: "Marketing",
    location: "Kenya / Remote",
    title: "Product Marketing Manager",
    whatYouWouldDo: `
      As a Product Marketing Manager at Dafeena Consultancy, you will be the bridge between our product development and our customers. Your role will involve crafting compelling narratives that highlight the value of our products, defining go-to-market strategies, and driving adoption and engagement. You will collaborate closely with product, sales, and design teams to ensure a cohesive marketing strategy that aligns with our company vision.`,
    responsibilities: [
      "Develop and execute go-to-market strategies for new products and features.",
      "Collaborate with product and engineering teams to understand product functionalities.",
      "Craft compelling product narratives and value propositions.",
      "Create marketing assets, including sales enablement materials, presentations, and product briefs.",
      "Analyze market trends and competitor positioning to inform strategies.",
      "Drive adoption and engagement through targeted marketing campaigns.",
      "Lead customer feedback initiatives to improve product marketing efforts.",
      "Track and measure the performance of product marketing campaigns.",
      "Ensure alignment between marketing, sales, and product teams.",
      "Represent the marketing team in product roadmap discussions.",
    ],
    whoWereLookingFor: [
      "A strategic thinker with a passion for storytelling.",
      "Proven experience in product marketing, preferably in tech or SaaS.",
      "Strong communication and presentation skills.",
      "Ability to analyze market trends and translate them into actionable insights.",
      "Proficient in project management and cross-functional collaboration.",
      "Experience with digital marketing tools and platforms.",
      "A creative problem solver with attention to detail.",
    ],
    roleDescription: `
      The Product Marketing Manager role at Dafeena Consultancy is a critical position that shapes how our products are perceived in the market. You will define our marketing strategies, identify customer needs, and translate product features into value-driven narratives. This role offers the opportunity to influence the direction of the company and work with a talented team in a fast-paced, dynamic environment. If you are someone who thrives at the intersection of creativity and strategy, this role is for you.`,
  };
} else if (role.value === "customer-success-associate") {
  roleDetails.value = {
    department: "Customer Success",
    location: "Kenya / Remote",
    title: "Customer Success Associate",
    whatYouWouldDo: `
      As a Customer Success Associate at Dafeena Consultancy, your primary goal will be to ensure our customers achieve their desired outcomes using our products. You will act as a trusted advisor, providing guidance, support, and insights to help customers maximize the value of our solutions. Through proactive engagement, you will build lasting relationships and drive customer satisfaction, retention, and growth.`,
    responsibilities: [
      "Onboard new customers and ensure a seamless setup experience.",
      "Build and maintain strong customer relationships.",
      "Act as the main point of contact for customer queries and issues.",
      "Provide training and guidance on best practices for using Dafeena Consultancy products.",
      "Monitor customer health metrics and address risks proactively.",
      "Collaborate with sales and product teams to ensure customer needs are met.",
      "Conduct regular check-ins and gather feedback to improve the customer experience.",
      "Develop and execute customer success plans tailored to individual client needs.",
      "Advocate for customers within the company, sharing insights to inform product development.",
      "Drive customer retention and identify upselling opportunities.",
    ],
    whoWereLookingFor: [
      "A people person who thrives on building strong relationships.",
      "Experience in customer success, account management, or a similar role.",
      "Excellent communication and problem-solving skills.",
      "Empathy and a customer-first mindset.",
      "Ability to handle multiple accounts and prioritize tasks effectively.",
      "Familiarity with CRM tools and customer success platforms is a plus.",
      "A proactive and collaborative team player.",
    ],
    roleDescription: `
      The Customer Success Associate role at Dafeena Consultancy is vital for ensuring our customers derive maximum value from our products. You will be at the forefront of customer engagement, acting as their advocate and champion. Your work will directly impact customer satisfaction, retention, and loyalty. This role is perfect for someone passionate about helping others succeed and making a tangible impact in a customer-facing role.`,
  };
} else if (role.value === "virtual-assistant-intern") {
  roleDetails.value = {
    department: "Virtual Assistance",
    location: "Remote",
    title: "Virtual Assistant Intern",
    whatYouWouldDo: `
      As a Virtual Assistant Intern at Dafeena Consultancy, you will work closely with experienced virtual assistants and clients to provide support across various tasks. You will assist with administrative, technical, and creative work, gaining hands-on experience in delivering high-quality virtual assistance services. This internship is an excellent opportunity to learn about different aspects of business operations while developing your skills in the virtual assistance industry.`,
    responsibilities: [
      "Assist with email management, appointment scheduling, and calendar organization.",
      "Support social media management and content creation.",
      "Help with research, report generation, and data entry tasks.",
      "Manage travel and accommodation bookings for clients.",
      "Provide administrative support for virtual events and meetings.",
      "Collaborate with team members to ensure smooth workflow and client satisfaction.",
      "Help in managing customer service inquiries and communication.",
      "Assist in personal errands or project-based tasks as required.",
      "Learn and develop your virtual assistant skills under the guidance of experienced professionals.",
    ],
    whoWereLookingFor: [
      "A motivated individual eager to learn and grow in the virtual assistance field.",
      "Strong organizational and communication skills.",
      "Attention to detail and the ability to manage multiple tasks.",
      "A proactive and self-driven attitude.",
      "Comfortable using digital tools and online platforms.",
      "Ability to work independently and as part of a remote team.",
      "Previous experience in customer service, administration, or related fields is a plus.",
    ],
    roleDescription: `
      The Virtual Assistant Intern role at Dafeena Consultancy is an exciting opportunity for someone looking to start their career in virtual assistance. You will be involved in various tasks, gaining valuable experience and mentorship from seasoned professionals. This internship will help you develop the skills necessary to succeed as a Virtual Assistant and explore different industries, giving you the chance to grow within the field.`,
  };
}


const hiringProcess = ref([
  "1. Application Review: Once you send in your application, our team carefully reviews it to understand your skills, experience, and passion for the role.",
  "2. Initial Interview: Selected candidates are invited for a conversation with our hiring team to learn more about your background and what motivates you.",
  "3. Skill Assessment: Depending on the role, we may include a short task or project to evaluate your technical abilities or creative problem-solving skills.",
  "4. Final Interview: A deep dive into your goals and how they align with Dafeena's mission. This is your chance to ask questions and ensure we’re the right fit for you.",
  "5. Offer Stage: If all goes well, you’ll receive an offer to join our team and start an exciting journey with us.",
]);

const benefitsBoxes = ref([
  {
    id: 2,
    title: "Flexible Schedules",
    description:
      "Enjoy the freedom to manage your work hours, balancing personal commitments and career growth.",
  },
  {
    id: 3,
    title: "Remote Work Opportunities",
    description:
      "Work from anywhere, offering flexibility and autonomy to create a productive and enjoyable work environment.",
  },
  {
    id: 4,
    title: "Career Coaching & Mentorship",
    description:
      "Personalized coaching and mentorship to guide you through career challenges and opportunities.",
  },
]);
</script>

<template>
  <div>
    <section id="role-page" class="pb-80 inner-page-hero division">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-10">
            <!-- ---------------------------------------------- -->
            <!-- Title -->
            <!-- ---------------------------------------------- -->
            <div class="inner-page-title">
              <span>{{ roleDetails.department }}</span>
              <h2 class="s-52 w-700">{{ roleDetails.title }}</h2>
              <p class="p-lg">{{ roleDetails.location }}</p>
            </div>
            <!-- TEXT BLOCK -->
            <div class="txt-block role-info">
              <!-- Text -->
              <p>
                {{ roleDetails.roleDescription }}
              </p>
              <!-- ---------------------------------------------- -->
              <!-- What you would do -->
              <!-- ---------------------------------------------- -->
              <hr />
              <!--Title -->
              <h5 class="s-24 w-700">
                What would you do at Dafeena Consultancy?
              </h5>
              <!-- Text -->
              <p>
                {{ roleDetails.whatYouWouldDo }}
              </p>
              <!-- ---------------------------------------------- -->
              <!-- Responsibilities -->
              <!-- ---------------------------------------------- -->
              <hr />
              <!-- Title -->
              <h5 class="s-24 w-700">Responsibilities</h5>
              <!-- List -->
              <ul class="simple-list long-list" v-for="item in roleDetails.responsibilities">
                <li class="list-item">
                  <p>
                    {{ item }}
                  </p>
                </li>
              </ul>
              <!-- ---------------------------------------------- -->
              <!-- Who we're looking for -->
              <!-- ---------------------------------------------- -->
              <hr />
              <h5 class="s-24 w-700">Who we're looking for</h5>
              <ul class="simple-list long-list" v-for="item in roleDetails.whoWereLookingFor">
                <li class="list-item">
                  <p>
                    {{ item }}
                  </p>
                </li>
              </ul>
              <!-- ---------------------------------------------- -->
              <!-- Benefits -->
              <!-- ---------------------------------------------- -->
              <hr />
              <!-- Title -->
              <h5 class="s-24 w-700">Benefits with you in mind</h5>

              <div class="cbox-6-wrapper bg--white-400 r-16">
                <div class="row align-items-center row-cols-1 row-cols-md-2">
                  <!-- CONTENT BOX #1 -->
                  <div class="col" v-for="benefit in benefitsBoxes">
                    <div id="cb-6-1" class="cbox-6">
                      <!-- Title -->
                      <h6 class="s-20 w-700">{{ benefit.title }}</h6>
                      <!-- Text -->
                      <p>
                        {{ benefit.description }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- ---------------------------------------------- -->
              <!-- Hiring Process -->
              <!-- ---------------------------------------------- -->

              <hr />
              <h5 class="s-24 w-700">What is our hiring process like?</h5>
              <p>
                At Dafeena Consultancy, we believe in creating a hiring
                experience that reflects our values of creativity, passion, and
                collaboration. Here's what you can expect:
              </p>
              <ul class="digit-list" v-for="process in hiringProcess">
                <li class="list-item" style="padding-left: 20px">
                  <p>{{ process }}</p>
                </li>
              </ul>
              <p>
                We value transparency and aim to keep you informed at every
                stage. Our hiring process is designed to help us find the right
                people while ensuring candidates feel valued and supported.
              </p>
              <hr />
              <!-- ---------------------------------------------- -->
              <!-- Apply now -->
              <!-- ---------------------------------------------- -->
              <p>
                To apply for this position, please attach your latest CV, along
                with any other relevant materials or documents that showcase
                your skills and experience. This may include a portfolio, cover
                letter, or references, if applicable. We look forward to
                learning more about you and how you can contribute to Dafeena.
              </p>
              <NuxtLink href="mailto:hello@dafeenaconsultancy.com" target="_blank"
                class="btn r-04 btn--theme hover--theme">Apply to this job!</NuxtLink>
            </div>
            <!-- END TEXT BLOCK -->
          </div>
        </div>
        <!-- End row -->
      </div>
      <!-- End container -->
    </section>
  </div>
</template>
