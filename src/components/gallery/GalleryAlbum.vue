<script setup lang="ts">
import BaseCard from "../base/BaseCard.vue";
const props = defineProps(["album"]);

const galleryStore = useGalleryStore();
const loading = ref<boolean>(false);
const deleteAlbum = async () => {
    loading.value = true;
    galleryStore.deleteAlbumById(props.album.id);
};
</script>

<template>
    <BaseCard
        :title="album.title"
        :descrition="album.description"
        :src="album.cover_image"
        src_type="image"
        :loading
        @delete="deleteAlbum"
    />
</template>

<style scoped></style>
