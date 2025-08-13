import { useFetch } from "@/composables/useFetch";
import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { toRaw } from "vue";
import { withAuth } from "@/utils/withAuth";
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
        structuredClone(toRaw(lsFilledPrices.value)),
    );

    async function fetchPriceList() {
        return withAuth(async () => {
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
        });
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
            lsFilledPrices.value = structuredClone(toRaw(filledPrices.value));
        }
    }

    function setPrices(obj: IPriceItem) {
        if (obj.cost === 0 || !obj.cost) {
            delete filledPrices.value[obj.price_id];
            return;
        }

        const elExist = filledPrices.value[obj.price_id];

        if (elExist) {
            filledPrices.value[obj.price_id] = { ...elExist, cost: obj.cost };
        } else {
            filledPrices.value[obj.price_id] = { ...obj };
        }
    }

    function resetPrices() {
        filledPrices.value = structuredClone(toRaw(lsFilledPrices.value));
    }

    return {
        companyPricesList,
        filledPrices,
        fetchPriceList,
        resetPrices,
        updateCompanyPricesInfo,
        setPrices,
    };
});
