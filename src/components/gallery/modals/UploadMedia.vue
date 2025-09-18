<script setup lang="ts">
import { useFetch } from "@/composables/useFetch";
import { useCookies } from "@vueuse/integrations/useCookies.mjs";
const galleryStore = useGalleryStore();
const cookies = useCookies(["accessToken"]);

const props = defineProps(["albumId"]);

const mediaLink = ref();

const syncAlbumWithStore = () => {
    galleryStore.getAlbumInfoById(props.albumId);
};

const uploadVideoUrl = () => {
    try {
        useFetch(
            `${APP_ENUM.BASE_API_URL}/api/profile/company/gallery/items/upload-video-link`,
            {
                method: ERequestMethods.POST,
                data: {
                    gallery_id: props.albumId,
                    url: mediaLink.value,
                },
                headers: {
                    Authorization: `Bearer ${cookies.get("accessToken")}`,
                },
            },
        );

        syncAlbumWithStore();
    } catch (error) {
        throw Error(error);
    }
};
</script>

<template>
    <div class="p-5 rounded-lg bg-white w-[600px]">
        <div class="mt-3">
            <input
                v-model="mediaLink"
                type="text"
                placeholder="Введіть посилання на відео (youtube)"
                class="p-2.5 w-full h-[48px] border border-gray-400 outline-0 rounded-lg placeholder:text-gray-400"
            />
            <button
                class="mt-3 h-11 px-10 bg-green-500 text-white rounded-lg"
                @click="uploadVideoUrl"
            >
                Завантажити
            </button>
        </div>
    </div>
</template>

<style scoped></style>
