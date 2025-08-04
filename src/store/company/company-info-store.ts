import { useFetch } from "@/composables/useFetch";
import { useCookies } from "@vueuse/integrations/useCookies";
export const useCompanyInfoStore = defineStore("company-info-store", () => {
    const cookies = useCookies(["accessToken"]);
    const companyInfo = ref(null);
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
    return {
        companyInfo,
        fetchCompanyInfo,
    };
});
