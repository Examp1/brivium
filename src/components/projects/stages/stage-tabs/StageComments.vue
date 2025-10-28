<script setup lang="ts">
import CommentForm from "../commnets/CommentForm.vue";

const projectStageStore = useProjectstageStore();
const { projectStageComments } = storeToRefs(projectStageStore);

projectStageStore.fetchProjectStageComments();
</script>

<template>
    <div class="border-b border-gray-100 mb-4 pb-4">
        <CommentForm />
    </div>
    <ul>
        <li
            v-for="comment in projectStageComments?.items"
            :key="comment.id"
            class="border-b border-gray-100 pb-4"
        >
            <span>{{ comment.created_at }}</span>
            <p>{{ comment.comment }}</p>
        </li>
    </ul>
</template>
