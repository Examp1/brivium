<script setup lang="ts">
import BaseBtn from "@/components/base/BaseBtn.vue";
import StageComments from "@/components/projects/stages/stage-tabs/StageComments.vue";
import StageFiles from "@/components/projects/stages/stage-tabs/StageFiles.vue";
import StageInfo from "@/components/projects/stages/stage-tabs/StageInfo.vue";
import StageBid from "@/components/projects/stages/stage-tabs/StageBid.vue";
import StageTabs from "@/components/projects/stages/StageTabs.vue";
import { onMounted } from "vue";
const projectStageStore = useProjectstageStore();
const { projectStage } = storeToRefs(projectStageStore);

const route = useRoute();
const router = useRouter();
const currentTab = ref("Загальна інформація");
const changeCurrentTab = (tab: string) => {
    currentTab.value = tab;
};

const deleteStage = () => {
    projectStageStore.deleteProjectStage(+route.params.stage!).then(() => {
        router.push({
            name: "project-page",
            params: { project: route.params.project },
        });
    });
};

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
                    Етап: {{ projectStage?.model.name }}
                </h2>
            </div>
            <!-- <div class="flex items-center gap-3">
                <BaseBtn
                    title="Додати етап"
                    @click="showModal = true"
                ></BaseBtn>
                <BaseUpload
                    :id="projectData?.model.id"
                    uploadType="inProject"
                    @uploadComplete="
                        projectFileStore.fetchProjectFiles(
                            projectData?.model.id,
                        )
                    "
                />
            </div> -->
        </div>
        <StageTabs @changeCurrentTab="changeCurrentTab" />
        <div class="border-t border-gray-100 mt-4 pt-4">
            <StageInfo v-if="currentTab === 'Загальна інформація'" />
            <StageBid v-if="currentTab === 'Ставки'" />
            <StageFiles v-if="currentTab === 'Файли'" />
            <StageComments v-if="currentTab === 'Коментарі'" />
        </div>
        <BaseBtn
            class="mt-10"
            color="bg-red-500"
            title="Видалити етап"
            @click="deleteStage"
        ></BaseBtn>
    </div>
</template>

<style scoped></style>
