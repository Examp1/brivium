<script setup lang="ts">
const projectStageStore = useProjectstageStore();
const { projectStageFiles } = storeToRefs(projectStageStore);

// if (!projectStageFiles.value) {
projectStageStore.fetchProjectStageFiles();
// }
</script>

<template>
    <div>{{ projectStageFiles }}</div>
</template>

<style scoped></style>
