<script setup lang="ts">
import BaseBtn from "@/components/base/BaseBtn.vue";
import AddProjectStage from "@/components/gallery/modals/AddProjectStage.vue";
import ProjectFiles from "@/components/projects/ProjectFiles.vue";
import AppModal from "@/components/ui/AppModal.vue";
import { onMounted } from "vue";
const projectStore = useProjectStore();
const { projectData } = storeToRefs(projectStore);
const projectFileStore = useProjectFileStore();
const { projectFiles } = storeToRefs(projectFileStore);
const projectStageStore = useProjectstageStore();
const { projectStages } = storeToRefs(projectStageStore);

const route = useRoute();

const showModal = ref<boolean>(false);

onMounted(async () => {
    await projectStore.getProjectById(+route.params.project);
    await projectFileStore.fetchProjectFiles(+route.params.project);
    await projectStageStore.fetchProjectStages(+route.params.project);
});
</script>

<template>
    <AppModal v-if="showModal" @close="showModal = false">
        <AddProjectStage
            @close="showModal = false"
            :projectId="route.params.project"
        />
    </AppModal>
    <div class="p-4 border-t border-gray-100">
        {{ projectFiles }}
        {{ projectData }}
        <div class="border-b border-gray-100 py-2.5 flex items-center gap-5">
            <div class="mr-auto flex items-center gap-4">
                <router-link
                    :to="{ name: 'projects-page' }"
                    class="bg-gray-200 py-2 px-3 rounded-lg"
                >
                    Назад
                </router-link>
                <h2 class="text-2xl font-medium">
                    Project: {{ projectData?.model.name }}
                </h2>
            </div>
            <BaseBtn title="Добавить этап" @click="showModal = true"></BaseBtn>
        </div>
        <ProjectFiles :fileList="projectFiles.items" />
    </div>
</template>

<style scoped></style>
