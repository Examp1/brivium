import { useLocalStorage } from "@vueuse/core";
import { toRaw } from "vue";
import { withAuth } from "@/utils/withAuth";
import { ERequestMethods } from "@/enums/ERequestMethod";
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
    const companyPricesList = ref<ICompanyCatalog[]>([]);

    const lsFilledPrices = useLocalStorage<IPriceObj>("filledPrices", {});

    const filledPrices = ref<IPriceObj>(
        structuredClone(toRaw(lsFilledPrices.value)),
    );

    async function fetchPriceList() {
        return withAuth(async () => {
            const { data } = await fetchWrapper<ICompanyCatalogResponse>(
                "api/profile/company/price/list",
                ERequestMethods.POST,
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
        const { error } = await fetchWrapper(
            "api/profile/company/price/update",
            ERequestMethods.POST,
            payload,
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
