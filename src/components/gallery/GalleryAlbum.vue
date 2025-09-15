<script setup lang="ts">
const galleryStore = useGalleryStore();

defineProps(["album"]);
const openDropdown = ref<boolean>(false);
</script>

<template>
    <div class="border border-gray-400 rounded-lg relative cursor-pointer">
        <div
            class="action-menu absolute top-[10px] right-[10px] cursor-pointer"
        >
            <span
                class="mdi mdi-dots-vertical text-xl"
                @click="openDropdown = !openDropdown"
            ></span>
            <div
                v-if="openDropdown"
                class="dropdown absolute border border-gray-400 bg-white z-1 rounded-lg right-full"
            >
                <div class="text-sm flex gap-2 py-1 px-3 hover:bg-gray-300">
                    <span class="mdi mdi-pen"></span> Change
                </div>
                <div
                    @click="galleryStore.deleteAlbumById(album.id)"
                    class="text-sm flex gap-2 text-red-400 py-1 px-3 hover:bg-gray-300"
                >
                    <span class="mdi mdi-delete"></span> Delete
                </div>
            </div>
        </div>
        <h2 class="text-xl font-medium px-4 pt-4 pb-1">
            {{ album.title }}
        </h2>
        <img
            class="aspect-4/3 object-cover"
            :src="album.cover_image"
            :alt="album.title"
            :title="album.title"
        />
        <p
            v-if="album.description"
            class="text-base font-medium px-4 pb-4 pt-1"
        >
            {{ album.description }}
        </p>
    </div>
</template>

<style scoped></style>
