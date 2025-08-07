import { APP_ENUM } from "@/enums/app_enums";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useCookies } from "@vueuse/integrations/useCookies";
import { useFetch } from "@/composables/useFetch";

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

interface ICompnaySelectedIds {
    ids: number[];
}

export const useCompanyCatalogStore = defineStore(
    "company-catalog-store",
    () => {
        const authStore = useAuthStore();
        const { accessToken } = storeToRefs(authStore);
        //TODO переделать на useLocalStorage
        const cookies = useCookies(["compnaySelectedIds"]);
        const compnaySelectedIds = ref<number[]>(
            cookies.get("compnaySelectedIds") || [],
        );
        const companyCatalog = ref<ICompanyCatalog[]>([]);

        async function fetchCompanyCatalogSelectedInfo() {
            const { data } = await useFetch<ICompnaySelectedIds>(
                `${APP_ENUM.BASE_API_URL}/api/profile/company/catalog/get-ids`,
                {
                    method: ERequestMethods.POST,
                    headers: {
                        Authorization: `Bearer ${accessToken.value}`,
                    },
                },
            );
            if (data.value) {
                compnaySelectedIds.value = data.value.ids;
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
                        catalog_ids: compnaySelectedIds.value,
                    },
                },
            );
            await fetchCompanyCatalogSelectedInfo();
        }

        function setCatalogIds(id: number) {
            if (compnaySelectedIds.value.includes(id)) {
                const elIndex = compnaySelectedIds.value.indexOf(id);
                compnaySelectedIds.value.splice(elIndex, 1);
            } else {
                compnaySelectedIds.value.push(id);
            }
            cookies.set("compnaySelectedIds", compnaySelectedIds.value);
        }

        async function fetchCompanyCatalog() {
            if (!compnaySelectedIds.value) {
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
            compnaySelectedIds,
            fetchCompanyCatalogSelectedInfo,
            updateCompanyCatalogInfo,
            setCatalogIds,
            fetchCompanyCatalog,
        };
    },
);
