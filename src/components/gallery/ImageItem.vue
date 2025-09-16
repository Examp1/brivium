<script setup lang="ts">
defineProps(["mediaItem"]);
</script>

<template>
    <div v-if="mediaItem.type_code === 1" class="cursor-pointer">
        <img
            class="aspect-square object-cover w-full"
            :src="mediaItem.image_url"
            alt=""
        />
    </div>
    <div v-else-if="mediaItem.type_code === 2" class="relative cursor-pointer">
        <span
            class="absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] mdi mdi-play-box text-white text-7xl"
        ></span>
        <video class="aspect-square object-cover w-ful" muted playsinline loop>
            <source :src="mediaItem.video_url" type="video/mp4" />
            Ваш браузер не поддерживает тег видео.
        </video>
    </div>
</template>

<style scoped></style>
