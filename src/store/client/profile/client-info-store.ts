interface IclientInfo {
    [key: string]: string | number | boolean;
}

export const useClientInfoStore = defineStore("company-info-store", () => {
    const clientInfo = ref<IclientInfo>({});

    async function fetchClientInfo() {
        const { data } = await fetchWrapper<IclientInfo>(
            "api/profile/client",
            ERequestMethods.POST,
        );
        if (data.value) {
            clientInfo.value = data.value;
        }
    }
    return {
        clientInfo,
        fetchClientInfo,
    };
});
