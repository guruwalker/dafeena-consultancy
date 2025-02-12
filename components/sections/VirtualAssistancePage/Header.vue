<script setup lang="ts">
const features = ref([
    {
        id: 1,
        icon: "flaticon-graphics",
        title: "Administrative Support",
        description: "From email management to data entry, we handle the details so you can focus on growing your business.",
        shapePath:
            "M69.8,-23C76.3,-2.7,57.6,25.4,32.9,42.8C8.1,60.3,-22.7,67,-39.1,54.8C-55.5,42.7,-57.5,11.7,-48.6,-11.9C-39.7,-35.5,-19.8,-51.7,5.9,-53.6C31.7,-55.6,63.3,-43.2,69.8,-23Z",
    },
    {
        id: 2,
        icon: "flaticon-idea",
        title: "Client & Customer Management",
        description: "We ensure seamless communication with your clients, handling inquiries, follow-ups, and appointment scheduling.",
        shapePath:
            "M69.8,-23C76.3,-2.7,57.6,25.4,32.9,42.8C8.1,60.3,-22.7,67,-39.1,54.8C-55.5,42.7,-57.5,11.7,-48.6,-11.9C-39.7,-35.5,-19.8,-51.7,5.9,-53.6C31.7,-55.6,63.3,-43.2,69.8,-23Z",
    },
    {
        id: 3,
        icon: "flaticon-graphic",
        title: "Business Process Optimization",
        description: "We streamline your workflows and introduce tools that improve efficiency and productivity.",
        shapePath:
            "M69.8,-23C76.3,-2.7,57.6,25.4,32.9,42.8C8.1,60.3,-22.7,67,-39.1,54.8C-55.5,42.7,-57.5,11.7,-48.6,-11.9C-39.7,-35.5,-19.8,-51.7,5.9,-53.6C31.7,-55.6,63.3,-43.2,69.8,-23Z",
    },
    {
        id: 4,
        icon: "flaticon-search-engine-1",
        title: "Social Media Management",
        description: "We create, schedule, and manage content to keep your audience engaged and your brand growing.",
        shapePath:
            "M69.8,-23C76.3,-2.7,57.6,25.4,32.9,42.8C8.1,60.3,-22.7,67,-39.1,54.8C-55.5,42.7,-57.5,11.7,-48.6,-11.9C-39.7,-35.5,-19.8,-51.7,5.9,-53.6C31.7,-55.6,63.3,-43.2,69.8,-23Z",
    },
]);
</script>

<template>
    <div>
        <section id="hero-6" class="hero-section">
            <div class="container">
                <div class="hero-6-wrapper r-16">
                    <div class="row d-flex align-items-center">
                        <div class="col-md-6">
                            <div class="hero-6-txt animate__animated animate__fadeInRight">
                                <h2 class="s-44 w-700">We handle the essentials so you can focus on what truly matters
                                </h2>
                                <p class="p-lg">From daily tasks to strategic support, we take care of the necessary
                                    details—allowing you to stay focused on growth and success.</p>
                                <a href="#comp-table" class="btn r-04 btn--theme hover--theme">Find a suitable plan</a>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="hero-6-img animate__animated animate__fadeInLeft">
                                <img class="img-fluid" src="/assets/images/img-08.png" alt="hero-image" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <section id="features-6" class="py-100 features-section division">
            <div class="container">
                <!-- FEATURES-6 WRAPPER -->
                <div class="fbox-wrapper text-center">
                    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4">
                        <div class="col" v-for="feature in features" :key="feature.id">
                            <div class="fbox-6 animate__animated animate__fadeInUp">
                                <div class="fbox-ico ico-55">
                                    <div class="shape-ico color--theme">
                                        <span :class="feature.icon" class="color--coal"></span>
                                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                            <path :d="feature.shapePath" transform="translate(100 100)" />
                                        </svg>
                                    </div>
                                </div>
                                <div class="fbox-txt">
                                    <h6 class="s-20 w-700">{{ feature.title }}</h6>
                                    <p>{{ feature.description }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
