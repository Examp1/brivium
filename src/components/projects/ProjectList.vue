<script setup lang="ts">
import ProjectCard from "./ProjectCard.vue";

defineProps(["projects"]);
</script>

<template>
    <div class="mt-5">
        <div class="grid grid-cols-4 gap-5">
            <transition-group name="slide">
                <ProjectCard
                    v-for="project in projects"
                    :key="project.id"
                    :project="project"
                />
            </transition-group>
        </div>
    </div>
</template>

<style scoped lang="scss">
.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s ease;
}
.slide-enter-from {
    opacity: 0;
    transform: translateX(30px);
}
.slide-leave-to {
    opacity: 0;
    transform: translateX(-30px);
}
.slide-enter-to,
.slide-leave-from {
    opacity: 1;
    transform: translateX(0);
}
</style>
