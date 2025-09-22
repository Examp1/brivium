<script setup lang="ts">
import placeholderImage from "@/assets/images/placeholder.jpg";

const props = defineProps([
    "type",
    "link",
    "title",
    "src",
    "src_type",
    "descrition",
    "loading",
]);

const icon = computed(() => {
    switch (props.type) {
        case "image":
            return "mdi-image-area";
        case "video":
            return "mdi-video";
        case "video_url":
            return "mdi-youtube";
    }
});
</script>

<template>
    <div
        class="bg-gray-200 hover:bg-gray-300 base-transition p-2 rounded-xl relative"
    >
        <div
            v-if="loading"
            class="absolute inset-0 bg-white/70 rounded-xl z-1 flex items-center justify-center pointer-events-none"
        >
            <span class="mdi mdi-loading text-6xl animate-spin"></span>
        </div>
        <!-- dropdown -->
        <slot name="dropdown" />

        <!-- main component -->
        <div class="px-2 pt-1 pb-2 flex items-center gap-3">
            <span class="mdi text-xl" :class="icon"></span>
            <h3 class="font-medium text-lg">{{ title }}</h3>
        </div>
        <img
            v-if="src_type === 'image'"
            class="aspect-4/3 object-cover w-full rounded-lg cursor-pointer"
            :src="src || placeholderImage"
            alt=""
        />
        <div v-if="src_type === 'video'" class="relative cursor-pointer">
            <span
                class="absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] mdi mdi-play-box text-white text-7xl"
            ></span>
            <video
                class="aspect-4/3 object-cover w-full rounded-lg"
                muted
                playsinline
                loop
            >
                <source :src="src" type="video/mp4" />
                Ваш браузер не поддерживает тег видео.
            </video>
        </div>
        <a v-if="src_type === 'video_url'" :href="link" target="_blank">
            <img
                :src="src"
                alt=""
                class="aspect-4/3 object-cover w-full rounded-lg"
            />
        </a>
        <div v-if="descrition" class="pt-2">
            {{ descrition }}
        </div>
    </div>
</template>

<style scoped></style>
