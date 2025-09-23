<script setup lang="ts">
import BaseCard from "../base/BaseCard.vue";
import BaseCardDropdown from "../base/BaseCardDropdown.vue";
import AppModal from "../ui/AppModal.vue";
import UpdateAlbumModal from "./modals/UpdateAlbumModal.vue";
const props = defineProps(["album"]);

const galleryStore = useGalleryStore();
const loading = ref<boolean>(false);
const deleteAlbum = async () => {
    loading.value = true;
    galleryStore.deleteAlbumById(props.album.id);
};
const showUpdModal = ref<boolean>(false);
</script>

<template>
    <AppModal v-if="showUpdModal" @close="showUpdModal = false">
        <UpdateAlbumModal :albumData="album" @close="showUpdModal = false" />
    </AppModal>
    <BaseCard
        :title="album.title"
        :descrition="album.description"
        :src="album.cover_image"
        src_type="image"
        :loading
        @delete="deleteAlbum"
    >
        <template #dropdown>
            <BaseCardDropdown
                @delete="deleteAlbum"
                @change="showUpdModal = true"
            /> </template
    ></BaseCard>
</template>

<style scoped></style>
