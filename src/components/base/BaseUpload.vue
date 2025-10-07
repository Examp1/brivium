<script setup lang="ts">
const props = defineProps<{
    id: number;
    uploadType: "inProject" | "inAlbum";
}>();
const emit = defineEmits(["openModal", "uploadComplete"]);

const formDataIdName =
    props.uploadType === "inProject" ? "project_id" : "gallery_id";

const uploadMedia = async (
    selectedMedia: FileList,
    mediaType: "video" | "image",
) => {
    let uploadApi = undefined;
    if (props.uploadType === "inProject") {
        uploadApi = "api/profile/client/project/file/upload";
    } else {
        uploadApi =
            mediaType === "image"
                ? "api/profile/company/gallery/items/upload-image"
                : "api/profile/company/gallery/items/upload-video";
    }
    const selectedMediaArray = Array.from(selectedMedia);
    const uploadPromises = selectedMediaArray.map((file) =>
        fetchMedia(file, uploadApi),
    );
    await Promise.all(uploadPromises);
    emit("uploadComplete");
};

const fetchMedia = async (file: File, uploadApi: string) => {
    const formData = new FormData();

    formData.append(formDataIdName, props.id.toString());
    formData.append("file", file);
    await fetchWrapper(uploadApi, ERequestMethods.POST, formData);
};

const selectMedia = (event, type: "video" | "image") => {
    uploadMedia(event.target.files, type);
    event.target.value = null;
};
</script>

<template>
    <div v-if="uploadType === 'inAlbum'">
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
                class="h-11 px-10 bg-blue-500 text-white rounded-lg"
                @click="emit('openModal')"
            >
                Додати відео за посиланням
            </button>
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
    </div>
    <div v-else>
        <div class="ml-auto flex gap-4">
            <label
                class="h-11 px-10 bg-blue-500 text-white rounded-lg cursor-pointer flex items-center"
                for="file_upload"
            >
                Додати файл
            </label>
        </div>
        <input
            class="hidden"
            @change="selectMedia($event, 'image')"
            type="file"
            id="file_upload"
            multiple
        />
    </div>
</template>

<style scoped></style>
