export const useNotificationStore = defineStore("notifications-store", () => {
    const notifications = ref();

    const notificationCount = computed(
        () => notifications.value?.items.length || 0,
    );

    const notificationTypesLength = computed(() => {
        const startObj = {
            info: {
                lng: 0,
                title: "Інформаційні",
                lastNotification: {},
            },
            chat: {
                lng: 0,
                title: "Чат",
                lastNotification: {},
            },
            lid: {
                lng: 0,
                title: "Лід",
                lastNotification: {},
            },
        };
        notifications.value?.items.forEach((el) => {
            switch (el.type_code) {
                case 1:
                    startObj.info.lng++;
                    startObj.info.lastNotification = el;
                    break;
                case 2:
                    startObj.chat.lng++;
                    startObj.chat.lastNotification = el;
                    break;
                case 3:
                    startObj.lid.lng++;
                    startObj.lid.lastNotification = el;
                    break;
            }
        });
        return startObj;
    });

    const notifcationGroup = computed(() => {
        const startObj = {
            new: [],
            read: [],
            // archive
        };

        notifications.value?.items.forEach((el) => {
            switch (el.status_code) {
                case 1:
                    startObj.new.push(el);
                    break;
                case 2:
                    startObj.read.push(el);
                    break;
                // case 3:
                //     startObj.new.archive(el);
                //     break;
            }
        });

        return startObj;
    });

    return {
        notifications,
        notifcationGroup,
        notificationCount,
        notificationTypesLength,
    };
});
