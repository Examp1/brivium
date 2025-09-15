<script setup lang="ts">
import AlbumInfo from "./AlbumInfo.vue";
import GalleryAlbum from "./GalleryAlbum.vue";
const galleryStore = useGalleryStore();

defineProps(["albums"]);

const isOpenAlbumInfo = ref<boolean>(false);
const openAlbumInfo = (albumId: number) => {
    galleryStore.getAlbumInfoById(albumId);
    isOpenAlbumInfo.value = true;
};
</script>

<template>
    <transition name="slide" mode="out-in">
        <div class="mt-5" v-if="!isOpenAlbumInfo">
            <div class="grid grid-cols-4 gap-5">
                <transition-group name="slide">
                    <GalleryAlbum
                        v-for="album in albums"
                        :key="album.id"
                        :album
                        @click="openAlbumInfo(album.id)"
                    />
                </transition-group>
            </div>
        </div>
        <AlbumInfo v-else @close="isOpenAlbumInfo = false" />
    </transition>
</template>

<style scoped lang="scss">
.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s ease;
}
.slide-enter-from {
    opacity: 0;
    transform: translateX(30px);
}
.slide-leave-to {
    opacity: 0;
    transform: translateX(-30px);
}
.slide-enter-to,
.slide-leave-from {
    opacity: 1;
    transform: translateX(0);
}
</style>
