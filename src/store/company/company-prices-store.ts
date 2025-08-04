import { useFetch } from "@/composables/useFetch";
import { defineStore } from "pinia";
export const useCompanyPricesStore = defineStore("company-prices-store", () => {
    const authStore = useAuthStore();
    const { accessToken } = storeToRefs(authStore);

    const companyPricesList = ref(null);

    async function fetchPriceList() {
        const { data } = await useFetch(
            `${APP_ENUM.BASE_API_URL}/api/profile/company/price/list`,
            {
                method: ERequestMethods.POST,
                headers: {
                    Authorization: `Bearer ${accessToken.value}`,
                },
            },
        );
        companyPricesList.value = data.value.list;
    }
    return {
        companyPricesList,
        fetchPriceList,
    };
});
