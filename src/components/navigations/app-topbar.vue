<script setup lang="ts">
import loadNotifications from "@/composables/notifications/load-notifications";
loadNotifications().then((res) => {
    notifications.value = res.data.value;
});

const notificationStore = useNotificationStore();
const { notifications } = storeToRefs(notificationStore);

const companyInfoStore = useCompanyInfoStore();
const { companyInfo } = storeToRefs(companyInfoStore);
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
            <div class="relative mdi mdi-bell text-3xl">
                <span
                    class="absolute text-xs bg-blue-500 w-fit min-w-4 h-4 flex items-center justify-center rounded-full top-0 right-0 text-white"
                    >{{ notifications.items.length }}</span
                >
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
