<script setup lang="ts">
import BaseCard from "../base/BaseCard.vue";
import BaseCardDropdown from "../base/BaseCardDropdown.vue";
// import AppModal from "../ui/AppModal.vue";
// import UpdateAlbumModal from "./modals/UpdateAlbumModal.vue";
const props = defineProps(["project"]);

const projectStore = useProjectStore();
const loading = ref<boolean>(false);
const deleteProject = async () => {
    loading.value = true;
    projectStore.deleteProjectById(props.project.id);
};
const showUpdModal = ref<boolean>(false);
</script>

<template>
    <router-link
        :to="{ name: 'project-page', params: { project: project.id } }"
    >
        <BaseCard
            :title="project.name"
            :descrition="project.description"
            :src="project.cover_image"
            src_type="image"
            type="album"
            :loading
            @delete="deleteProject"
        >
            <template #dropdown>
                <BaseCardDropdown
                    @delete="deleteProject"
                    @change="showUpdModal = true"
                /> </template
        ></BaseCard>
        <!-- <AppModal v-if="showUpdModal" @close="showUpdModal = false">
            <UpdateAlbumModal
                :albumData="album"
                @close="showUpdModal = false"
            />
        </AppModal> -->
    </router-link>
</template>

<style scoped></style>
