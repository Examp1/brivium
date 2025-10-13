<script setup lang="ts">
import BaseInput from "@/components/base/BaseInput.vue";

const projectStageStore = useProjectstageStore();
const { projectStageComments } = storeToRefs(projectStageStore);

const comment = ref("");

projectStageStore.fetchProjectStageComments();
</script>

<template>
    <div class="border-b border-gray-100 mb-4 pb-4">
        <BaseInput label="Ваш коментар" class="w-fit mb-3" v-model="comment" />
        <div
            class="h-11 px-10 bg-blue-500 text-white rounded-lg cursor-pointer inline-flex items-center"
            @click="projectStageStore.addStageComment(comment)"
        >
            Додати коментар
        </div>
    </div>
    <ul>
        <li v-for="comment in projectStageComments.items" :key="comment">
            {{ comment }}
        </li>
    </ul>
</template>

<style scoped></style>
