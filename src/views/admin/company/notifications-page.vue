<script setup lang="ts">
import loadFiltredNotifications from "@/composables/notifications/load-filtred-notifications";
import { onMounted } from "vue";

const notificationStore = useNotificationStore();
const { notifications, notificationTypesLength } =
    storeToRefs(notificationStore);

const activeNotificationTab = ref([]);
const activeitem = ref("info");
const changeActiveTab = async (key: string, idx: number) => {
    activeitem.value = key;
    const { data } = await loadFiltredNotifications({
        status: 1,
        type: idx + 1,
    });
    activeNotificationTab.value = data.value.items;
};

onMounted(async () => {
    const { data } = await loadFiltredNotifications({
        status: 1,
        type: 1,
    });
    activeNotificationTab.value = data.value.items;
});
</script>

<template>
    <div class="p-4 border-t border-gray-100">
        <div class="grid grid-cols-[0.2fr_0.8fr] gap-5">
            <div>
                <ul>
                    <li
                        v-for="(
                            notification, key, idx
                        ) in notificationTypesLength"
                        :key="notification.id"
                        class="justify-between text-xl font-medium transition-colors duration-300 hover:bg-gray-300 rounded text-gray-700 flex items-center gap-2 py-1 px-2 cursor-pointer whitespace-nowrap"
                        :class="{
                            'bg-gray-300': activeitem == key,
                        }"
                        @click="changeActiveTab(key, idx)"
                    >
                        {{ notification.title }}
                        <span
                            class="text-sm rounded-full w-5 h-5 flex items-center justify-center text-white bg-blue-500"
                            >{{ notification.lng }}</span
                        >
                    </li>
                </ul>
            </div>
            <div class="">
                <div v-if="activeNotificationTab.length" class="grid gap-3">
                    <div
                        v-for="notification in activeNotificationTab"
                        :key="notification.id"
                        class=""
                    >
                        <div class="text-lg font-semibold">
                            {{ notification.title }}
                        </div>
                        <div class="" v-html="notification.message"></div>
                    </div>
                </div>
                <div v-else class="text-lg text-gray-500">
                    Нових повідомлень поки немає
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
