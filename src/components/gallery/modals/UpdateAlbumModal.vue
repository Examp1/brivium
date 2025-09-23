<script setup lang="ts">
import BaseInput from "@/components/base/BaseInput.vue";
const emit = defineEmits(["close"]);
const props = defineProps(["albumData"]);
const galleryStore = useGalleryStore();

const onSubmit = async () => {
    const formData = new FormData();

    formData.append("id", props.albumData?.id);
    if (title.value) {
        formData.append("title", title.value);
    }
    if (description.value) {
        formData.append("description", description.value);
    }
    if (previewImage.value) {
        formData.append("cover_image", previewImage.value);
    }

    await galleryStore.updateAlbumInfo(formData);
    emit("close");
};

const updatePreviewImage = (event) => {
    previewImage.value = event.target.files[0];
};
const previewImage = ref();
const title = ref(props.albumData.title || "");
const description = ref(props.albumData.description || "");
</script>
<template>
    <div class="p-5 rounded-lg bg-white w-[540px]">
        <form @submit.prevent="onSubmit" class="grid gap-5">
            <BaseInput
                label="Title"
                placeholder="Media file title"
                name="title"
                v-model="title"
            />
            <BaseInput
                label="Description"
                placeholder="Media file description"
                name="description"
                v-model="description"
            />
            <label
                for="preview_image"
                class="h-11 px-10 bg-blue-500 text-white rounded-lg w-fit flex items-center cursor-pointer"
            >
                Update preview image
            </label>
            <input
                type="file"
                id="preview_image"
                @change="updatePreviewImage"
            />
            <button
                class="h-11 px-10 bg-green-500 text-white rounded-lg mb-3 ml-auto"
            >
                Update
            </button>
        </form>
    </div>
</template>

<style lang="scss" scoped></style>
