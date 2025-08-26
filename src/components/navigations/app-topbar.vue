<script setup lang="ts">
import loadNotifications from "@/composables/notifications/load-notifications";
import { onMounted } from "vue";

const notificationStore = useNotificationStore();
const { notifications } = storeToRefs(notificationStore);

const companyInfoStore = useCompanyInfoStore();
const { companyInfo } = storeToRefs(companyInfoStore);

const isDropOpen = ref(false);

onMounted(async () => {
    const { data } = await loadNotifications();
    notifications.value = data.value;
});
</script>

<template>
    <menu
        class="sticky top-0 bg-white w-full p-4 border-b border-gray-200 flex justify-between"
    >
        <button
            class="flex items-center justify-center w-10 h-10 text-gray-500 border-gray-200 rounded-lg border"
        >
            <span class="mdi mdi-menu"></span>
        </button>

        <div class="flex items-center gap-3">
            <div class="notifications-wrapper relative">
                <div
                    class="relative mdi mdi-bell text-3xl cursor-pointer"
                    @click="isDropOpen = !isDropOpen"
                >
                    <span
                        class="absolute text-xs bg-blue-500 w-fit min-w-4 h-4 flex items-center justify-center rounded-full top-0 right-0 text-white"
                        >{{ notifications?.items?.length }}</span
                    >
                </div>
                <div
                    class="notifications absolute w-[300px] left-[50%] translate-x-[-50%] bg-white shadow-2xl p-4 rounded-lg transition-all duration-200 ease-out scale-95 opacity-0"
                    :class="{ 'scale-100 opacity-100': isDropOpen }"
                >
                    {{ notifications }}
                </div>
            </div>
            <img
                class="h-[44px] w-[44px] rounded-full"
                src="https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg"
                alt=""
            />
            <span class="font-medium text-sm">{{ companyInfo.name }}</span>
        </div>
    </menu>
</template>

<style lang="scss" scoped></style>
