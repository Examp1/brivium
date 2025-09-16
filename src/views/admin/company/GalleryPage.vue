<script setup lang="ts">
import GalleryAlbumsList from "@/components/gallery/GalleryAlbumsList.vue";
import GalleryModal from "@/components/gallery/modals/GalleryModal.vue";
import AppModal from "@/components/ui/AppModal.vue";
import { onMounted } from "vue";

const galleryStore = useGalleryStore();
const { galleryAlbums } = storeToRefs(galleryStore);

const showModal = ref<boolean>(false);

onMounted(() => {
    galleryStore.fetchAlbums();
});
</script>

<template>
    <AppModal v-if="showModal" @close="showModal = false">
        <GalleryModal
            @close="showModal = false"
            @refresh="galleryStore.fetchAlbums()"
        />
    </AppModal>
    <div class="p-4 border-t border-gray-100">
        <div class="flex border-b border-gray-100">
            <div></div>
            <button
                class="h-11 px-10 bg-green-500 text-white rounded-lg mb-3 ml-auto"
                @click="showModal = true"
            >
                Добавить альбом
            </button>
        </div>
        <GalleryAlbumsList :albums="galleryAlbums?.items" />
    </div>
</template>

<style scoped></style>
