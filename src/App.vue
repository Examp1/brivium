<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
// import DefaultLayout from "./layouts/default-layout.vue";
import { computed } from "vue";
import EmptyLayout from "./layouts/empty-layout.vue";
import CompanyLayout from "./layouts/company-layout.vue";
const route = useRoute();
const layout = computed(() => {
    let layoutComponent;
    if (route.path.includes("company")) {
        layoutComponent = CompanyLayout;
    } else {
        layoutComponent = EmptyLayout;
        // layoutComponent = DefaultLayout;
    }
    return layoutComponent;
});
</script>

<template>
    <component :is="layout">
        <RouterView :key="route.fullPath" />
    </component>
</template>

<style scoped></style>
