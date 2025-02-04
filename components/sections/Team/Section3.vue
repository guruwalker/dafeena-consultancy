<script setup lang="ts">
import Careers from '~~/components/Data/Careers';

const openRoles = ref(Careers);
</script>

<template>
    <section id="careers-1" class="pt-100 pb-60 careers-section">
        <div class="container">
            <!-- SECTION TITLE -->
            <div class="row justify-content-center">
                <div class="col-md-10 col-lg-9">
                    <div class="section-title mb-70">
                        <!-- Title -->
                        <h2 class="s-52 w-700">Open Roles at Dafeena</h2>
                        <!-- Text -->
                        <p class="p-lg">We’re building a better way to work, fueled by transparency, trust, and
                            technology that is a force for positive change for the hourly workforce</p>
                    </div>
                </div>
            </div>
            <!-- OPEN ROLES -->
            <div class="row row-cols-1 row-cols-md-2">
                <div v-for="role in openRoles" :key="role.id" class="col">
                    <div class="role-box bg--white-300 r-10">
                        <NuxtLink :to="role.link">
                            <span>{{ role.department }}</span>
                            <h6 class="s-20 w-700">{{ role.title }}</h6>
                            <p>{{ role.location }}</p>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
