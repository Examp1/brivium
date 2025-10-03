<script setup lang="ts">
import ProjectCard from "./ProjectCard.vue";

const projectStore = useProjectStore();

defineProps(["projects"]);

const isOpenAlbumInfo = ref<boolean>(false);
// const openAlbumInfo = (albumId: number) => {
//     projectStore.getProjectById(albumId);
//     isOpenAlbumInfo.value = true;
// };
</script>

<template>
    <transition name="slide" mode="out-in">
        <div class="mt-5" v-if="!isOpenAlbumInfo">
            <div class="grid grid-cols-4 gap-5">
                <transition-group name="slide">
                    <ProjectCard
                        v-for="project in projects"
                        :key="project.id"
                        :project="project"
                    />
                    <!-- <GalleryAlbum
                        v-for="album in albums"
                        :key="album.id"
                        :album
                        @click="openAlbumInfo(album.id)"
                    /> -->
                </transition-group>
            </div>
        </div>
        <div v-else>
            <!-- <AlbumInfo @close="isOpenAlbumInfo = false" /> -->
        </div>
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
