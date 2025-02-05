<script setup lang="ts">
    useHead({
        bodyAttrs: {
            class: "navbar-dark navbar-dark-2"
        },
    })
</script>

<template>
    <div>
        <!-- The Team -->
        <SectionsTeamSection1 />

        <!-- Banner for open roles -->
        <SectionsTeamSection2 />

        <!-- Open roles -->
        <SectionsTeamSection3 />

        <!-- Cant wait to meet you -->
        <SectionsTeamSection4 />
    </div>
</template>
