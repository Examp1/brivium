<script setup lang="ts">
const projectStageStore = useProjectstageStore();
const { projectStage } = storeToRefs(projectStageStore);
</script>

<template>
    <div>
        {{ projectStage }}
    </div>
</template>

<style scoped></style>
