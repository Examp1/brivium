<script setup lang="ts">
import BaseCard from "../base/BaseCard.vue";
import BaseCardDropdown from "../base/BaseCardDropdown.vue";
const projectFileStore = useProjectFileStore();
const { projectFiles } = storeToRefs(projectFileStore);
const loading = ref(false);

const deleteFile = async (fileID: number) => {
    loading.value = true;
    await projectFileStore.deleteProjectFile(fileID);
};
</script>

<template>
    <div class="grid grid-cols-4 gap-4">
        <BaseCard
            v-for="file in projectFiles?.items"
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
