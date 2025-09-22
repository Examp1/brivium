<script setup lang="ts">
import BaseCard from "../base/BaseCard.vue";
import BaseCardDropdown from "../base/BaseCardDropdown.vue";
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
    <BaseCard
        :type="cardData.type"
        :src_type="cardData.type"
        :src="cardData.src"
        :link="cardData.link"
        :title="mediaItem.type_text"
        :loading
    >
        <template #dropdown>
            <BaseCardDropdown @delete="deleteFile" />
        </template>
    </BaseCard>
</template>

<style scoped></style>
