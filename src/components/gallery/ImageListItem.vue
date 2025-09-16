<script setup lang="ts">
import ImageItem from "./ImageItem.vue";
const galleryStore = useGalleryStore();
const props = defineProps(["mediaData"]);

const deleteMedia = (mediaId: number) => {
    galleryStore.getMediaFileById(props.mediaData.model.id, mediaId);
};
</script>

<template>
    <div class="grid grid-cols-6 gap-5 mt-5">
        <transition-group name="shrink" mode="in-out">
            <ImageItem
                v-for="mediaitem in mediaData.items"
                :key="mediaitem.id"
                :mediaItem="mediaitem"
                @deleteMedia="deleteMedia"
            />
        </transition-group>
    </div>
</template>

<style scoped lang="scss">
.shrink-move {
    transition: all 400ms;
}

.shrink-leave-active {
    transition: transform 300ms;
    position: absolute;
    opacity: 0;
}

.shrink-enter-active {
    transition:
        opacity 400ms ease-out 200ms,
        transform 400ms ease-out;
    will-change: opacity, transform;
}

.shrink-enter,
.shrink-leave-to,
.shrink-enter-from {
    opacity: 0;
    transform: scale(0.75) translateY(25%);
}
</style>
