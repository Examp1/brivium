import { useFetch } from "@/composables/useFetch";
import { defineStore } from "pinia";
import { useCookies } from "@vueuse/integrations/useCookies";
interface IPriceItem {
    catalog_id: number;
    price_id: number;
    cost: number;
}

interface IPriceObj {
    [key: number]: IPriceItem;
}

export const useCompanyPricesStore = defineStore("company-prices-store", () => {
    const authStore = useAuthStore();
    const { accessToken } = storeToRefs(authStore);

    const cookies = useCookies(["compnayfilledPrices"]);

    const companyPricesList = ref(null);
    const filledPrices = ref<IPriceObj>(
        cookies.get("compnayfilledPrices") || {},
    );

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
    async function updateCompanyPricesInfo() {
        await useFetch(
            `${APP_ENUM.BASE_API_URL}/api/profile/company/price/update`,
            {
                method: ERequestMethods.POST,
                headers: {
                    Authorization: `Bearer ${accessToken.value}`,
                },
                data: {
                    list: Object.values(filledPrices.value),
                },
            },
        );
    }

    function setPrices(obj: IPriceItem) {
        if (!obj.cost) return;

        const elExist = filledPrices.value[obj.price_id];

        //TODO
        // if (obj.cost === 0) {
        //     delete filledPrices.value[obj.price_id];
        //     return;
        // }

        if (elExist) {
            elExist.cost = obj.cost;
        } else {
            filledPrices.value[obj.price_id] = obj;
        }

        cookies.set("compnayfilledPrices", filledPrices.value);
    }

    return {
        companyPricesList,
        filledPrices,
        fetchPriceList,
        updateCompanyPricesInfo,
        setPrices,
    };
});
