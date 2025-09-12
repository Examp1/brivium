<script setup lang="ts">
import GalleryAlbum from "@/components/gallery/GalleryAlbum.vue";
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
    <AppModal v-if="showModal" @close="showModal = false"> 123 </AppModal>
    <div class="p-4 border-t border-gray-100">
        <!-- <pre>
            {{ galleryAlbums }}
        </pre> -->
        {{ showModal }}
        <div class="flex border-b border-gray-100">
            <div></div>
            <button
                class="h-11 px-10 bg-green-500 text-white rounded-lg mb-3 ml-auto"
                @click="showModal = true"
            >
                Добавить альбом
            </button>
        </div>
        <GalleryAlbum />
    </div>
</template>

<style scoped></style>
