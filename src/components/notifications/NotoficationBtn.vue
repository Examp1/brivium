<script setup lang="ts">
import loadNotifications from "@/composables/notifications/load-notifications";
import { onMounted } from "vue";
import { onClickOutside } from "@vueuse/core";
import { useTemplateRef } from "vue";

import NotificationPopup from "./NotificationPopup.vue";

const isDropOpen = ref(false);

const target = useTemplateRef<HTMLElement>("notifications");
onClickOutside(target, () => (isDropOpen.value = false));

const notificationStore = useNotificationStore();
const { notificationCount, notifications, notificationTypesLength } =
    storeToRefs(notificationStore);

onMounted(async () => {
    const { data } = await loadNotifications();
    notifications.value = data.value;
});
</script>

<template>
    <div class="notifications-wrapper relative">
        <div
            class="relative mdi mdi-bell text-3xl cursor-pointer"
            @click="isDropOpen = !isDropOpen"
        >
            <span
                class="absolute text-xs bg-blue-500 w-fit min-w-4 h-4 flex items-center justify-center rounded-full top-0 right-0 text-white"
                >{{ notificationCount }}</span
            >
        </div>
        <NotificationPopup
            ref="notifications"
            :notifications="notificationTypesLength"
            :class="isDropOpen ? 'scale-100 opacity-100 block' : 'hidden'"
        />
    </div>
</template>

<style lang="scss" scoped></style>
