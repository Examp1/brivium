import { useFetch } from "@/composables/useFetch";
import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
interface IPriceItem {
    catalog_id: number;
    price_id: number;
    cost: number;
}

interface IPriceObj {
    [key: number]: IPriceItem;
}

interface ICompanyCatalogPrices {
    id: number;
    name: string;
    unit: string;
}

interface ICompanyCatalog {
    full_name: string;
    id: number;
    name: string;
    parent_name: string;
    prices: ICompanyCatalogPrices[];
}
interface ICompanyCatalogResponse {
    list: ICompanyCatalog[];
}

export const useCompanyPricesStore = defineStore("company-prices-store", () => {
    const authStore = useAuthStore();
    const { accessToken } = storeToRefs(authStore);
    const companyPricesList = ref<ICompanyCatalog[]>([]);

    const lsFilledPrices = useLocalStorage<IPriceObj>("filledPrices", {});

    const filledPrices = ref<IPriceObj>(
        JSON.parse(JSON.stringify(lsFilledPrices.value)),
    );

    async function fetchPriceList() {
        const { data } = await useFetch<ICompanyCatalogResponse>(
            `${APP_ENUM.BASE_API_URL}/api/profile/company/price/list`,
            {
                method: ERequestMethods.POST,
                headers: {
                    Authorization: `Bearer ${accessToken.value}`,
                },
            },
        );
        if (data.value) {
            companyPricesList.value = data.value?.list;
        }
    }
    async function updateCompanyPricesInfo() {
        const payload = {
            list: Object.values(filledPrices.value),
        };
        const { error } = await useFetch(
            `${APP_ENUM.BASE_API_URL}/api/profile/company/price/update`,
            {
                method: ERequestMethods.POST,
                headers: {
                    Authorization: `Bearer ${accessToken.value}`,
                },
                data: payload,
            },
        );
        if (!error.value) {
            lsFilledPrices.value = filledPrices.value;
        }
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
    }

    return {
        companyPricesList,
        filledPrices,
        fetchPriceList,
        updateCompanyPricesInfo,
        setPrices,
    };
});
