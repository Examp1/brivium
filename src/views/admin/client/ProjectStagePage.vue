<script setup lang="ts">
import BaseBtn from "@/components/base/BaseBtn.vue";
import StageTabs from "@/components/projects/stages/StageTabs.vue";
import { onMounted } from "vue";
const projectStageStore = useProjectstageStore();
const { projectStage } = storeToRefs(projectStageStore);

const route = useRoute();

onMounted(() => {
    projectStageStore.fetchProjectStagesById(+route.params.stage!);
});
</script>
<template>
    <div class="p-4 border-t border-gray-100">
        <div class="border-b border-gray-100 py-2.5 flex items-center gap-5">
            <div class="mr-auto flex items-center gap-4">
                <router-link
                    :to="{
                        name: 'project-page',
                        params: { project: route.params.project },
                    }"
                    class="bg-gray-200 py-2 px-3 rounded-lg"
                >
                    Назад
                </router-link>
                <h2 class="text-2xl font-medium">
                    Project: {{ projectStage?.model.name }}
                </h2>
            </div>
            <div class="flex items-center gap-3">
                <BaseBtn
                    title="Додати етап"
                    @click="showModal = true"
                ></BaseBtn>
                <!-- <BaseUpload
                    :id="projectData?.model.id"
                    uploadType="inProject"
                    @uploadComplete="
                        projectFileStore.fetchProjectFiles(
                            projectData?.model.id,
                        )
                    "
                /> -->
            </div>
        </div>
        <StageTabs />
        {{ projectStage }}
    </div>
</template>

<style scoped></style>
