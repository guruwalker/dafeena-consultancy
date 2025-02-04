<script setup lang="ts">
useHead({
    bodyAttrs: {
        class: "navbar-dark navbar-dark-2"
    },
})

const faqData = ref([
    {
        category: "Virtual Assistance",
        questions: [
            {
                title: "What is Virtual Assistance, and how does it work?",
                answer: `<p>Virtual assistance involves delegating tasks to a professional who works remotely, providing support with administrative, technical, or creative tasks. Whether you're a business owner, entrepreneur, or individual, we match you with the right virtual assistant to handle various tasks, freeing up your time for other important activities.</p>`,
            },
            {
                title: "What kind of tasks can a Virtual Assistant help me with?",
                answer: `<p>Our Virtual Assistants can assist you with a wide range of tasks, including but not limited to:</p>
           <ul class="simple-list" style="padding-left: 40px;">
             <li class="list-item"><p>Email management</p></li>
             <li class="list-item"><p>Appointment scheduling</p></li>
             <li class="list-item"><p>Social media management</p></li>
             <li class="list-item"><p>Content creation</p></li>
             <li class="list-item"><p>Customer service</p></li>
             <li class="list-item"><p>Data entry</p></li>
             <li class="list-item"><p>Research and report generation</p></li>
             <li class="list-item"><p>Travel and accommodation booking</p></li>
             <li class="list-item"><p>Personal errands</p></li>
           </ul>`,
            },
            {
                title: "How do I get started with Virtual Assistance?",
                answer: `<p>Getting started is simple! Reach out to us via our contact page, tell us about your requirements, and we’ll match you with the right Virtual Assistant based on your needs.</p>`,
            },
            {
                title: "What are the benefits of using a Virtual Assistant?",
                answer: `<p>A Virtual Assistant saves you time by handling routine tasks, allowing you to focus on more strategic or revenue-generating activities. It also provides you with access to skilled professionals without the cost of hiring a full-time employee.</p>`,
            },
        ],
    },
    {
        category: "Career Coaching",
        questions: [
            {
                title: "What is Career Coaching and how can it help me?",
                answer: `<p>Career coaching is a personalized service that helps individuals identify their career goals, overcome challenges, and develop strategies to reach their desired career outcomes. Whether you're seeking a career change or aiming to progress in your current field, our coaches offer the guidance and support you need to succeed.</p>`,
            },
            {
                title: "What can I expect from a Career Coaching session?",
                answer: `<p>During a career coaching session, we will work with you to understand your goals, assess your current career situation, and create an actionable plan. You'll receive guidance on resume building, interview strategies, job search techniques, and professional growth strategies tailored to your needs.</p>`,
            },
            {
                title: "How do I know if Career Coaching is right for me?",
                answer: `<p>If you're feeling stuck in your career, uncertain about your goals, or need advice on job transitions, career coaching could be the perfect solution. Our expert coaches can help you gain clarity, identify opportunities, and take action towards achieving your career aspirations.</p>`,
            },
            {
                title: "How much does Career Coaching cost?",
                answer: `<p>Our Career Coaching services are priced based on the type and length of coaching package you select. We offer hourly rates and customized packages to fit your needs. Contact us for a personalized quote.</p>`,
            },
        ],
    },
]);
</script>

<template>
    <div>
        <section id="faqs-4" class="gr--whitesmoke inner-page-hero pb-100 faqs-section division">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-11 col-xl-10">
                        <div class="inner-page-title">
                            <h2 class="s-52 w-700">How Can We Help?</h2>
                        </div>
                        <ElementsTabs class="Tab-exp1">
                            <ElementsTab v-for="(tab, index) in faqData" :key="index" :title="tab.category">
                                <ElementsAccordionItem2 v-for="(item, idx) in tab.questions" :key="idx"
                                    :title="item.title">
                                    <div v-html="item.answer"></div>
                                </ElementsAccordionItem2>

                                <!-- Add a link to the respective FAQ page -->
                                <div class="text-center mt-4">
                                    <a :href="`/${tab.category.toLowerCase().replace(/ /g, '-')}-faqs`"
                                        class="text--theme">
                                        See More FAQs for {{ tab.category }}
                                    </a>
                                </div>
                            </ElementsTab>
                        </ElementsTabs>
                    </div>
                </div>
            </div>
        </section>


        <section id="banner-9" class="bg--02 py-70 x-border banner-section">
            <div class="container">
                <div class="banner-7-wrapper">
                    <div class="row justify-content-center d-flex align-items-center">
                        <div class="col-md-7 col-xl-5">
                            <div class="banner-9-txt">
                                <h3 class="s-40 w-700">Still need help?</h3>
                                <p class="p-lg">Don't hesitate to contact us about any question you might be interested
                                    in</p>
                                <NuxtLink to="/contact-us" class="btn r-04 btn--theme hover--theme">Ask your question
                                    here</NuxtLink>
                            </div>
                        </div>
                        <div class="col-md-5 col-xl-5">
                            <div class="banner-9-img text-end">
                                <img class="img-fluid" src="/assets/images/help.png" alt="banner-image" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
