<script setup lang="ts">
import StageItem from "./StageItem.vue";
const projectStageStore = useProjectstageStore();
const { projectStages } = storeToRefs(projectStageStore);
</script>

<template>
    <StageItem
        v-for="stage in projectStages?.items"
        :key="stage.id"
        :stage="stage"
    />
</template>

<style scoped></style>
