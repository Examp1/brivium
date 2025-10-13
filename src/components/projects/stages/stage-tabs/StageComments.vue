<script setup lang="ts">
const projectStageStore = useProjectstageStore();
const { projectStageComments } = storeToRefs(projectStageStore);

// if (!projectStageComments.value) {
projectStageStore.fetchProjectStageComments();
// }
</script>

<template>
    <div>{{ projectStageComments }}</div>
</template>

<style scoped></style>
