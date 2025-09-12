<script setup lang="ts">
import GalleryAlbum from "@/components/gallery/GalleryAlbum.vue";
import { onMounted } from "vue";

const galleryStore = useGalleryStore();

onMounted(() => {
    galleryStore.fetchAlbums();
});
</script>

<template>
    <div>
        <GalleryAlbum />
    </div>
</template>

<style scoped></style>
