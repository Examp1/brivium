<script setup lang="ts">
const projectStageStore = useProjectstageStore();
const { projectStages } = storeToRefs(projectStageStore);
const route = useRoute();
</script>

<template>
    <div>
        <router-link
            :to="{
                name: 'project-stage-page',
                params: {
                    project: route.params.project,
                    stage: stage.id,
                },
            }"
            v-for="stage in projectStages?.items"
            :key="stage.id"
            class="border-b border-gray-400 py-4 block"
        >
            <div class="flex gap-5">
                <h2>
                    {{ stage.name }}
                </h2>
                <span class="text-gray-400">{{ stage.created_at }}</span>
            </div>
            <p v-if="stage.description">{{ stage.description }}</p>
        </router-link>
    </div>
</template>

<style scoped></style>
