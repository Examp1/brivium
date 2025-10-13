<script setup lang="ts">
import BaseCard from "@/components/base/BaseCard.vue";
import BaseCardDropdown from "@/components/base/BaseCardDropdown.vue";
import AddFileInProjectStage from "@/components/gallery/modals/AddFileInProjectStage.vue";
import AppModal from "@/components/ui/AppModal.vue";

const projectFileStore = useProjectFileStore();
const projectStageStore = useProjectstageStore();
const { projectStageFiles } = storeToRefs(projectStageStore);

const loading = ref(false);
const showModal = ref(false);

const fileUploaded = () => {
    projectStageStore.fetchProjectStageFiles();
    showModal.value = false;
};

const deleteFile = async (fileID: number) => {
    loading.value = true;
    await projectFileStore.deleteProjectStageFile(fileID);
    await projectStageStore.fetchProjectStageFiles();
};

projectStageStore.fetchProjectStageFiles();
</script>

<template>
    <AppModal v-if="showModal" @close="showModal = false">
        <AddFileInProjectStage @fileUploaded="fileUploaded" />
    </AppModal>
    <div class="border-b border-gray-100 mb-4 pb-4">
        <div
            class="h-11 px-10 bg-blue-500 text-white rounded-lg cursor-pointer inline-flex items-center"
            @click="showModal = true"
        >
            Додати файл в етап
        </div>
    </div>
    <div class="grid grid-cols-4 gap-4">
        <!-- TODO :loading="loading" -->
        <BaseCard
            v-for="file in projectStageFiles?.items"
            :key="file.id"
            :title="file.title || 'No title'"
            src_type="image"
            type="image"
            :src="file.file_url || file.image_url"
        >
            <template #dropdown>
                <BaseCardDropdown @delete="deleteFile(file.id)" />
            </template>
        </BaseCard>
    </div>
</template>

<style scoped></style>
