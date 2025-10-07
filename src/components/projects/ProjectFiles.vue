<script setup lang="ts">
import type { IProjectFile } from "@/interfaces/projects/IProjectFile";
import BaseCard from "../base/BaseCard.vue";
import BaseCardDropdown from "../base/BaseCardDropdown.vue";

defineProps<{
    fileList: IProjectFile[];
}>();
</script>

<template>
    {{ fileList }}
    <div class="grid grid-cols-4 gap-4">
        <BaseCard
            v-for="file in fileList"
            :key="file.id"
            :title="file.title || 'No title'"
            src_type="image"
            type="image"
            :src="file.file_url || file.image_url"
        >
            <template #dropdown>
                <BaseCardDropdown
                    @delete="deleteAlbum"
                    @change="showUpdModal = true"
                />
            </template>
        </BaseCard>
    </div>
</template>

<style scoped></style>
