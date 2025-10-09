<script setup lang="ts">
const projectStageStore = useProjectstageStore();
const route = useRoute();
defineProps(["stage"]);
const loading = ref(false);
const deleteStage = (id: number) => {
    loading.value = true;
    projectStageStore.deleteProjectStage(id);
};
</script>

<template>
    <div
        class="flex justify-between items-center border-b border-gray-400 py-4 relative"
    >
        <div
            v-if="loading"
            class="absolute inset-0 bg-white/70 rounded-xl z-1 flex items-center justify-center pointer-events-none"
        >
            <span class="mdi mdi-loading text-6xl animate-spin"></span>
        </div>
        <router-link
            :to="{
                name: 'project-stage-page',
                params: {
                    project: route.params.project,
                    stage: stage.id,
                },
            }"
            class="block"
        >
            <div class="flex gap-5">
                <h2>
                    {{ stage.name }}
                </h2>
                <span class="text-gray-400">{{ stage.created_at }}</span>
            </div>
            <p v-if="stage.description">{{ stage.description }}</p>
        </router-link>
        <div class="flex gap-4">
            <span
                class="cursor-pointer mdi mdi-trash-can"
                @click="deleteStage(stage.id)"
            ></span>
        </div>
    </div>
</template>

<style scoped></style>
