<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
import { computed } from "vue";
import EmptyLayout from "./layouts/EmptyLayout.vue";
import CompanyLayout from "./layouts/CompanyLayout.vue";
import AuthLayout from "./layouts/AuthLayout.vue";

const route = useRoute();
const layout = computed(() => {
    switch (route.meta.layout) {
        case "company":
            return CompanyLayout;
        case "auth":
            return AuthLayout;
        default:
            return EmptyLayout;
    }
});
</script>

<template>
    <component :is="layout">
        <RouterView :key="route.fullPath" />
    </component>
</template>

<style scoped></style>
