import { APP_ENUM } from "@/enums/app_enums";
import { defineStore } from "pinia";
import { useFetch } from "@/composables/useFetch";
import { useLocalStorage } from "@vueuse/core";

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
        const authStore = useAuthStore();
        const { accessToken } = storeToRefs(authStore);

        const companySelectedIds = useLocalStorage<number[]>(
            "companySelectedIds",
            [],
        );

        const companyCatalog = ref<ICompanyCatalog[]>([]);

        async function fetchCompanyCatalogSelectedInfo() {
            const { data } = await useFetch<ICompanySelectedIds>(
                `${APP_ENUM.BASE_API_URL}/api/profile/company/catalog/get-ids`,
                {
                    method: ERequestMethods.POST,
                    headers: {
                        Authorization: `Bearer ${accessToken.value}`,
                    },
                },
            );
            if (data.value) {
                companySelectedIds.value = data.value.ids;
            }
        }

        async function updateCompanyCatalogInfo() {
            await useFetch(
                `${APP_ENUM.BASE_API_URL}/api/profile/company/catalog/update`,
                {
                    method: ERequestMethods.POST,
                    headers: {
                        Authorization: `Bearer ${accessToken.value}`,
                    },
                    data: {
                        catalog_ids: companySelectedIds.value,
                    },
                },
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
            const { data } = await useFetch<ICompanyCatalog[]>(
                `${APP_ENUM.BASE_API_URL}/api/catalog/group-list`,
                {
                    method: ERequestMethods.POST,
                    headers: {
                        Authorization: `Bearer ${accessToken.value}`,
                    },
                    data: {
                        lang: "uk",
                    },
                },
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
