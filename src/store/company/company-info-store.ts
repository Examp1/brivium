import { useFetch } from "@/composables/useFetch";
import { useCookies } from "@vueuse/integrations/useCookies";

interface ICompanyInfo {
    [key: string]: string | number | boolean;
}

export const useCompanyInfoStore = defineStore("company-info-store", () => {
    const cookies = useCookies(["accessToken"]);
    const companyInfo = ref<ICompanyInfo>({});
    async function fetchCompanyInfo() {
        console.log("start");
        const { data } = await useFetch<ICompanyInfo>(
            `${APP_ENUM.BASE_API_URL}/api/profile/company`,
            {
                method: ERequestMethods.POST,
                headers: {
                    Authorization: `Bearer ${cookies.get("accessToken")}`,
                },
            },
        );
        if (data.value) {
            companyInfo.value = data.value;
        }
        console.log(finish);
    }
    return {
        companyInfo,
        fetchCompanyInfo,
    };
});
