<script setup lang="ts">
const galleryStore = useGalleryStore();
const { albumData } = storeToRefs(galleryStore);
const emit = defineEmits(["close"]);
</script>

<template>
    <div>
        <div class="border-b border-gray-100 py-2.5 flex items-center gap-5">
            <button
                class="bg-gray-200 py-2 px-3 rounded-lg"
                @click="emit('close')"
            >
                Назад
            </button>
            <h2 class="text-2xl font-medium">
                Альбом: {{ albumData.model.title }}
            </h2>
        </div>
        {{ albumData.items }}
    </div>
</template>

<style scoped></style>
