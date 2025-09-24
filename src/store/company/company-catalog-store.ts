import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { ERequestMethods } from "@/enums/ERequestMethod";

interface ICompanyCatalogChildren {
    children?: ICompanyCatalogChildren[];
    parent_id: number;
    id: number;
    name: string;
}
interface ICompanyCatalog {
    children?: ICompanyCatalogChildren[];
    id: number;
    name: string;
}

interface ICompanySelectedIds {
    ids: number[];
}

export const useCompanyCatalogStore = defineStore(
    "company-catalog-store",
    () => {
        const companySelectedIds = useLocalStorage<number[]>(
            "companySelectedIds",
            [],
        );

        const companyCatalog = ref<ICompanyCatalog[]>([]);

        async function fetchCompanyCatalogSelectedInfo() {
            const { data } = await fetchWrapper<ICompanySelectedIds>(
                "api/profile/company/catalog/get-ids",
                ERequestMethods.POST,
            );
            if (data.value) {
                companySelectedIds.value = data.value.ids;
            }
        }

        async function updateCompanyCatalogInfo() {
            await fetchWrapper(
                "api/profile/company/catalog/update",
                ERequestMethods.POST,
                { catalog_ids: companySelectedIds.value },
            );
            await fetchCompanyCatalogSelectedInfo();
        }

        function setCatalogIds(id: number) {
            if (companySelectedIds.value.includes(id)) {
                const elIndex = companySelectedIds.value.indexOf(id);
                companySelectedIds.value.splice(elIndex, 1);
            } else {
                companySelectedIds.value.push(id);
            }
            // lsSelectedId.value = companySelectedIds.value;
        }

        async function fetchCompanyCatalog() {
            if (!companySelectedIds.value) {
                fetchCompanyCatalogSelectedInfo();
            }
            const { data } = await fetchWrapper<ICompanyCatalog[]>(
                "api/catalog/group-list",
                ERequestMethods.POST,
                { lang: "uk" },
            );
            if (data.value) {
                companyCatalog.value = data.value;
            }
        }

        return {
            companyCatalog,
            companySelectedIds,
            fetchCompanyCatalogSelectedInfo,
            updateCompanyCatalogInfo,
            setCatalogIds,
            fetchCompanyCatalog,
        };
    },
);
