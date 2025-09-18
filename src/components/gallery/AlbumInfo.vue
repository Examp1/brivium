<script setup lang="ts">
import AppModal from "../ui/AppModal.vue";
import ImageListItem from "./ImageListItem.vue";
import UploadMedia from "./modals/UploadMedia.vue";

const galleryStore = useGalleryStore();
const { albumData } = storeToRefs(galleryStore);
const emit = defineEmits(["close"]);

const openModal = ref<boolean>(false);

const selectMedia = (event, type: "video" | "image") => {
    galleryStore.uploadMedia(event.target.files, type);
};
</script>

<template>
    <AppModal v-if="openModal" @close="openModal = false">
        <UploadMedia @close="openModal = false" :albumId="albumData.model.id" />
    </AppModal>
    <div>
        <div class="border-b border-gray-100 py-2.5 flex items-center gap-5">
            <button
                class="bg-gray-200 py-2 px-3 rounded-lg"
                @click="emit('close')"
            >
                Назад
            </button>
            <h2 class="text-2xl font-medium">
                Альбом: {{ albumData.model.title }}
            </h2>
            <div class="ml-auto flex gap-4">
                <label
                    class="h-11 px-10 bg-blue-500 text-white rounded-lg cursor-pointer flex items-center"
                    for="image_upload"
                >
                    Додати зображення
                </label>
                <label
                    class="h-11 px-10 bg-blue-500 text-white rounded-lg cursor-pointer flex items-center"
                    for="video_upload"
                >
                    Додати відео файл
                </label>
                <button
                    class="h-11 px-10 bg-green-500 text-white rounded-lg"
                    @click="openModal = true"
                >
                    Додати відео за посиланням
                </button>
            </div>
        </div>
        <input
            class="hidden"
            @change="selectMedia($event, 'image')"
            type="file"
            id="image_upload"
            multiple
            accept="image/*,.png,.SVG,.jpg,.jpeg,.gif"
        />
        <input
            class="hidden"
            @change="selectMedia($event, 'video')"
            type="file"
            id="video_upload"
            multiple
            accept="video/*,.mp4,.webm,.avi,.mov,.mkv"
        />
        <ImageListItem :mediaData="albumData" />
    </div>
</template>

<style scoped></style>
