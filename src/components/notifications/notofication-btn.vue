<script setup lang="ts">
import loadNotifications from "@/composables/notifications/load-notifications";
import { onMounted } from "vue";
import NotificationPopup from "./notification-popup.vue";

const notificationStore = useNotificationStore();
const { notificationCount, notifications, notificationTypesLength } =
    storeToRefs(notificationStore);

const isDropOpen = ref(false);

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
            :notifications="notificationTypesLength"
            :class="{ 'scale-100 opacity-100': isDropOpen }"
        />
    </div>
</template>

<style lang="scss" scoped></style>
