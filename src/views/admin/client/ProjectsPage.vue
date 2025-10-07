<script setup lang="ts">
import ProjectModal from "@/components/gallery/modals/ProjectModal.vue";
import ProjectList from "@/components/projects/ProjectList.vue";
import AppModal from "@/components/ui/AppModal.vue";
import { onMounted } from "vue";
const projectStore = useProjectStore();

const showModal = ref<boolean>(false);

onMounted(() => {
    projectStore.fetchProjects();
});
</script>

<template>
    <AppModal v-if="showModal" @close="showModal = false">
        <ProjectModal @close="showModal = false" />
    </AppModal>
    <div class="p-4 border-t border-gray-100">
        <div class="flex border-b border-gray-100">
            <div></div>
            <button
                class="h-11 px-10 bg-green-500 text-white rounded-lg mb-3 ml-auto"
                @click="showModal = true"
            >
                Добавить проект
            </button>
        </div>
        <ProjectList :projects="projectStore.projects?.items" />
    </div>
</template>

<style scoped></style>
