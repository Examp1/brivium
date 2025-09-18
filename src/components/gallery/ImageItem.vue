<script setup lang="ts">
import BaseCard from "../base/BaseCard.vue";
const props = defineProps(["mediaItem"]);
const loading = ref<boolean>(false);
const galleryStore = useGalleryStore();

const deleteFile = async () => {
    loading.value = true;
    galleryStore.deleteMediaFileById(props.mediaItem.id);
};

function getYouTubeThumbnail(url: string, quality = "hqdefault") {
    const videoId = url.match(
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?#]+)/,
    )?.[1];

    if (!videoId) {
        console.error("Не удалось извлечь ID видео");
        return null;
    }
    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}
const cardData = computed(() => {
    switch (props.mediaItem.type_code) {
        case 1:
            return {
                type: "image",
                src: props.mediaItem.image_url,
            };
        case 2:
            return {
                type: "video",
                src: props.mediaItem.video_url,
            };
        case 3:
            return {
                type: "video_url",
                link: props.mediaItem.video_link,
                src: getYouTubeThumbnail(props.mediaItem.video_link),
            };
        default:
            return {
                type: "undefined",
                src: "",
            };
    }
});
</script>

<template>
    <!-- {{ mediaItem }} -->
    <BaseCard
        :type="cardData.type"
        :src_type="cardData.type"
        :src="cardData.src"
        :link="cardData.link"
        :title="mediaItem.type_text"
        :loading
        @delete="deleteFile"
    />
    <!-- <div
        v-if="mediaItem.type_code === 1"
        class="cursor-pointer relative overflow-hidden group"
    >
        <span
            @click="emit('deleteMedia', mediaItem.id)"
            class="mdi mdi-trash-can absolute top-2.5 -right-[100%] text-3xl text-red-400 base-transition opacity-0 group-hover:opacity-100 group-hover:right-2.5"
        ></span>
        <img
            class="aspect-square object-cover w-full"
            :src="mediaItem.image_url"
            alt=""
        />
    </div>
    <div
        v-else-if="mediaItem.type_code === 2"
        class="relative cursor-pointer overflow-hidden group"
    >
        <span
            @click="emit('deleteMedia', mediaItem.id)"
            class="mdi mdi-trash-can absolute top-2.5 right-2.5 text-3xl text-red-400 base-transition opacity-0 group-hover:opacity-100 group-hover:right-2.5"
        ></span>
        <span
            class="absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] mdi mdi-play-box text-white text-7xl"
        ></span>
        <video class="aspect-square object-cover w-ful" muted playsinline loop>
            <source :src="mediaItem.video_url" type="video/mp4" />
            Ваш браузер не поддерживает тег видео.
        </video>
    </div> -->
</template>

<style scoped></style>
