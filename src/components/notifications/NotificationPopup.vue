<script setup lang="ts">
defineProps(["notifications"]);
</script>

<template>
    <div
        class="notifications absolute w-[300px] left-[50%] translate-x-[-50%] bg-white shadow-2xl p-4 rounded-lg transition-all duration-200 ease-out scale-95 opacity-0"
    >
        <RouterLink
            to="/company/notifications"
            class="flex justify-end text-base text-gray-400 mb-3"
        >
            Переглянути всі
            <span class="mdi mdi-chevron-right"></span>
        </RouterLink>
        <RouterLink
            to="/company/notifications"
            class="py-2 block"
            v-for="notification in notifications"
            :key="notification.id"
        >
            <div class="flex justify-between">
                <div class="text-lg font-semibold">
                    {{ notification.title }}
                </div>
                <span
                    class="text-sm rounded-full w-5 h-5 flex items-center justify-center text-white bg-blue-500"
                    >{{ notification.lng }}</span
                >
            </div>
            <div class="text-base">
                {{
                    notification.lastNotification.title ||
                    "Нових повідомлень поки немає"
                }}
            </div>
        </RouterLink>
    </div>
</template>

<style lang="scss" scoped></style>
