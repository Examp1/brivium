import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { useCookies } from "@vueuse/integrations/useCookies";
// TODO
// import { hashStr } from "@/composables/bcrypt";

export const useAuthStore = defineStore("auth-store", () => {
    const cookies = useCookies(["CompanyAccessToken"]);
    const CompanyAccessToken = ref(cookies.get("CompanyAccessToken") || null);

    watch(CompanyAccessToken, (newVal, oldVal) => {
        if (newVal !== oldVal) {
            cookies.set("CompanyAccessToken", newVal);
        }
    });

    const logout = async (userType: "client" | "company") => {
        await fetchWrapper(
            `api/profile/${userType}/logout`,
            ERequestMethods.POST,
        );
        if (userType === "client") {
            cookies.remove("ClientAccessToken");
        } else {
            cookies.remove("CompanyAccessToken");
        }
        window.location.href = "/";
    };
    return {
        CompanyAccessToken,
        logout,
    };
});
