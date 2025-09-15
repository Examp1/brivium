<script setup lang="ts">
import GalleryAlbum from "./GalleryAlbum.vue";

defineProps(["albums"]);
</script>

<template>
    <div class="mt-5">
        <div class="grid grid-cols-4 gap-5">
            <transition-group name="slide" mode="out-in">
                <GalleryAlbum v-for="album in albums" :key="album.id" :album />
            </transition-group>
        </div>
    </div>
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
