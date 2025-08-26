export const useNotificationStore = defineStore("notifications-store", () => {
    const notifications = ref();

    return {
        notifications,
    };
});
