<script setup lang="ts">
defineProps(["mediaItem"]);
const emit = defineEmits(["deleteMedia"]);
</script>

<template>
    <div
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
    </div>
</template>

<style scoped></style>
