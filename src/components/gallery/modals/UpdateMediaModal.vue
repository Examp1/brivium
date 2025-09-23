<script setup lang="ts">
import BaseInput from "@/components/base/BaseInput.vue";
const emit = defineEmits(["close"]);
const props = defineProps(["mediaId"]);
const galleryStore = useGalleryStore();

const onSubmit = () => {
    galleryStore.updateMediaTitle({
        id: props.mediaId,
        val: title.value,
    });
    emit("close");
};

const title = ref();
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
            <button
                class="h-11 px-10 bg-green-500 text-white rounded-lg mb-3 ml-auto"
            >
                Update
            </button>
        </form>
    </div>
</template>

<style lang="scss" scoped></style>
