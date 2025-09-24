interface ICompanyInfo {
    [key: string]: string | number | boolean;
}

export const useCompanyInfoStore = defineStore("company-info-store", () => {
    const companyInfo = ref<ICompanyInfo>({});

    async function fetchCompanyInfo() {
        const { data } = await fetchWrapper<ICompanyInfo>(
            "api/profile/company",
            ERequestMethods.POST,
        );
        if (data.value) {
            companyInfo.value = data.value;
        }
    }
    return {
        companyInfo,
        fetchCompanyInfo,
    };
});
