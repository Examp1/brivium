<script setup lang="ts">
import ImageItem from "./ImageItem.vue";

defineProps(["mediaData"]);
</script>

<template>
    <div class="grid grid-cols-6 gap-5 mt-5">
        <ImageItem
            v-for="mediaitem in mediaData"
            :key="mediaitem.id"
            :mediaItem="mediaitem"
        />
    </div>
</template>

<style scoped></style>
