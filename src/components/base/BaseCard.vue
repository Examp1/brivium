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
const emit = defineEmits(["delete", "change"]);

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

const change = () => {
    console.log("change");
};

const openDropdown = ref<boolean>(false);
</script>

<template>
    <div
        class="bg-gray-200 hover:bg-gray-300 base-transition p-2 cursor-pointer rounded-xl relative"
    >
        <div
            v-if="loading"
            class="absolute inset-0 bg-white/70 rounded-xl z-1 flex items-center justify-center"
        >
            <span class="mdi mdi-loading text-6xl animate-spin"></span>
        </div>
        <!-- dropdown -->
        <div
            class="action-menu absolute top-[10px] right-[10px] cursor-pointer"
        >
            <span
                class="mdi mdi-dots-vertical flex items-center justify-center text-xl w-[30px] h-[30px] rounded-full hover:bg-gray-200 base-transition"
                @click.stop="openDropdown = !openDropdown"
            ></span>
            <div
                v-if="openDropdown"
                class="dropdown absolute border border-gray-400 bg-white z-1 rounded-sm right-full"
            >
                <div
                    class="text-sm flex gap-2 py-1 px-3 hover:bg-gray-300"
                    @click.stop="change"
                >
                    <span class="mdi mdi-pen"></span> Change
                </div>
                <div
                    @click.stop="emit('delete')"
                    class="text-sm flex gap-2 text-red-400 py-1 px-3 hover:bg-gray-300"
                >
                    <span class="mdi mdi-delete"></span> Delete
                </div>
            </div>
        </div>
        <!-- main component -->
        <div class="px-2 pt-1 pb-2 flex items-center gap-3">
            <span class="mdi text-xl" :class="icon"></span>
            <h3 class="font-medium text-lg">{{ title }}</h3>
        </div>
        <img
            v-if="src_type === 'image'"
            class="aspect-4/3 object-cover w-full rounded-lg"
            :src="src || placeholderImage"
            alt=""
        />
        <div v-if="src_type === 'video'" class="relative">
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
