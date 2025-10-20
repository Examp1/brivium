<script setup lang="ts">
import BaseInput from "@/components/base/BaseInput.vue";

const projectStageStore = useProjectstageStore();
const comment = ref("");
</script>

<template>
    <BaseInput label="Ваш коментар" class="w-fit mb-3" v-model="comment" />
    <div
        class="h-11 px-10 bg-blue-500 text-white rounded-lg cursor-pointer inline-flex items-center"
        @click="projectStageStore.addStageComment(comment)"
    >
        Додати коментар
    </div>
</template>

<style lang="scss" scoped></style>
