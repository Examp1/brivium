<script setup lang="ts">
const projectStageStore = useProjectstageStore();
const { projectStage } = storeToRefs(projectStageStore);
</script>

<template>
    <div>
        {{ projectStage.bids }}
    </div>
</template>

<style scoped></style>
