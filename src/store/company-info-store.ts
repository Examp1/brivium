import { APP_ENUM } from "@/enums/app_enums";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useCookies } from "@vueuse/integrations/useCookies";
import { useFetch } from "@/composables/useFetch";

export const useCompanyInfoStore = defineStore("company-info-store", () => {
    const cookies = useCookies(["accessToken", "selectedIds"]);

    const companyCatalogInfo = ref(null);
    const companyInfo = ref(null);
    const selectedIds = ref<number[]>(cookies.get("selectedIds") || []);

    async function fetchCompanyCatalogSelectedInfo() {
        const { data } = await useFetch(
            `${APP_ENUM.BASE_API_URL}/api/profile/company/catalog/get-ids`,
            {
                method: ERequestMethods.POST,
                headers: {
                    Authorization: `Bearer ${cookies.get("accessToken")}`,
                },
            },
        );
        console.log(data.value);
        companyCatalogInfo.value = data.value;
    }

    function updateCompanyInfo() {
        useFetch(
            `${APP_ENUM.BASE_API_URL}/api/profile/company/catalog/update`,
            {
                method: ERequestMethods.POST,
                headers: {
                    Authorization: `Bearer ${cookies.get("accessToken")}`,
                },
                data: selectedIds.value,
            },
        );
        fetchCompanyCatalogSelectedInfo();
    }

    async function fetchCompanyInfo() {
        const { data } = await useFetch(
            `${APP_ENUM.BASE_API_URL}/api/profile/company`,
            {
                method: ERequestMethods.POST,
                headers: {
                    Authorization: `Bearer ${cookies.get("accessToken")}`,
                },
            },
        );
        companyInfo.value = data.value;
    }

    function setCatalogIds(id: number) {
        if (selectedIds.value.includes(id)) {
            const elIndex = selectedIds.value.indexOf(id);
            selectedIds.value.splice(elIndex, 1);
        } else {
            selectedIds.value.push(id);
        }
        cookies.set("selectedIds", selectedIds.value);
    }

    return {
        selectedIds,
        companyInfo,
        companyCatalogInfo,
        fetchCompanyCatalogSelectedInfo,
        updateCompanyInfo,
        fetchCompanyInfo,
        setCatalogIds,
    };
});
