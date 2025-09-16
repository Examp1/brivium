<script setup lang="ts">
import { useFetch } from "@/composables/useFetch";
import { useCookies } from "@vueuse/integrations/useCookies.mjs";
const emit = defineEmits(["refresh"]);

const cookies = useCookies(["accessToken"]);

const props = defineProps(["albumId"]);
const uploadType = [
    {
        title: "Зображення",
        type: "image",
    },
    {
        title: "Відео",
        type: "video",
    },
    {
        title: "Відео за посиланням",
        type: "video_url",
    },
];

const selectedMedia = ref();
const mediaLink = ref();
const selectMedia = (event) => {
    selectedMedia.value = Array.from(event.target.files);
};

const currentType = ref();

const uploadFilter = computed(() => {
    let temp = {};
    if (currentType.value === "image") {
        temp = {
            title: "SVG, PNG, JPG or GIF",
            filter: "image/*,.png,.SVG,.jpg,.jpeg,.gif",
        };
    } else if (currentType.value === "video") {
        temp = {
            title: "MP4, WebM or AVI",
            filter: "video/*,.mp4,.webm,.avi,.mov,.mkv",
        };
    }

    return temp;
});

const uploadMedia = async () => {
    const uploadApi =
        currentType.value === "image"
            ? "/api/profile/company/gallery/items/upload-image"
            : "/api/profile/company/gallery/items/upload-video";

    for (const file of selectedMedia.value) {
        await fetchMedia(file, uploadApi);
    }
    emit("refresh");
};

const fetchMedia = (file: File, uploadApi: string) => {
    return new Promise(async (resolve, reject) => {
        const formData = new FormData();
        formData.append("gallery_id", props.albumId);
        formData.append("file", file);
        try {
            useFetch(`${APP_ENUM.BASE_API_URL}${uploadApi}`, {
                method: ERequestMethods.POST,
                data: formData,
                headers: {
                    Authorization: `Bearer ${cookies.get("accessToken")}`,
                },
            });
            resolve(`${file.name} uploaded`);
        } catch (error) {
            reject(error);
        }
    });
};

const uploadVideoUrl = () => {
    useFetch(
        `${APP_ENUM.BASE_API_URL}/api/profile/company/gallery/items/upload-video-link`,
        {
            method: ERequestMethods.POST,
            data: {
                gallery_id: props.albumId,
                url: mediaLink,
            },
            headers: {
                Authorization: `Bearer ${cookies.get("accessToken")}`,
            },
        },
    );
};
</script>

<template>
    <div class="p-5 rounded-lg bg-white w-[600px]">
        <div class="text-lg font-medium flex items-center gap-3">
            Завантажити:
            <button
                v-for="item in uploadType"
                :key="item.type"
                class="p-2 rounded-lg"
                :class="
                    currentType === item.type
                        ? 'bg-green-300 text-white'
                        : 'bg-gray-300'
                "
                @click="currentType = item.type"
            >
                {{ item.title }}
            </button>
        </div>

        <div v-if="currentType === 'image' || currentType === 'video'">
            <div class="mt-3 flex items-center justify-center w-full">
                <label
                    for="dropzone-file"
                    class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                    <div
                        class="flex flex-col items-center justify-center pt-5 pb-6"
                    >
                        <svg
                            class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                        </svg>
                        <p
                            class="mb-2 text-sm text-gray-500 dark:text-gray-400"
                        >
                            <span class="font-semibold">Click to upload</span>
                            or drag and drop
                        </p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">
                            {{ uploadFilter?.title }}
                        </p>
                    </div>
                    <input
                        multiple
                        @change="selectMedia"
                        id="dropzone-file"
                        type="file"
                        class="hidden"
                        :accept="uploadFilter?.filter"
                    />
                </label>
            </div>

            <div v-for="file in selectedMedia" :key="file.name">
                {{ file.name }}
            </div>
            <button
                class="mt-3 h-11 px-10 bg-green-500 text-white rounded-lg"
                @click="uploadMedia"
            >
                Завантажити
            </button>
        </div>
        <div v-else-if="currentType === 'video_url'" class="mt-3">
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
