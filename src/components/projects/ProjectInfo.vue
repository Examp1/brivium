<script setup lang="ts">
import BaseUpload from "../base/BaseUpload.vue";

const emit = defineEmits(["close"]);
const projectStore = useProjectStore();
const { projectData } = storeToRefs(projectStore);

const openModal = ref<boolean>(false);
</script>

<template>
    <div>
        {{ projectData }}
        <div class="border-b border-gray-100 py-2.5 flex items-center gap-5">
            <div class="mr-auto flex items-center gap-4">
                <button
                    class="bg-gray-200 py-2 px-3 rounded-lg"
                    @click="emit('close')"
                >
                    Назад
                </button>
                <h2 class="text-2xl font-medium">
                    Project: {{ projectData?.model.name }}
                </h2>
            </div>
            <BaseUpload
                :id="projectData?.model.id"
                uploadType="inProject"
                @uploadComplete="
                    projectStore.getProjectById(projectData?.model.id)
                "
                @openModal="openModal = true"
            />
        </div>

        <!-- <ImageListItem :mediaData="albumData" /> -->
    </div>
</template>

<style scoped></style>
