import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { useCookies } from "@vueuse/integrations/useCookies";
// TODO
// import { hashStr } from "@/composables/bcrypt";

export const useAuthStore = defineStore("auth-store", () => {
    const cookies = useCookies(["ComapnyAccessToken"]);
    const ComapnyAccessToken = ref(cookies.get("ComapnyAccessToken") || null);

    watch(ComapnyAccessToken, (newVal, oldVal) => {
        if (newVal !== oldVal) {
            cookies.set("ComapnyAccessToken", newVal);
        }
    });

    const logout = async () => {
        await fetchWrapper("api/profile/company/logout", ERequestMethods.POST);
        cookies.remove("ComapnyAccessToken");
        window.location.href = "/";
    };
    return {
        ComapnyAccessToken,
        logout,
    };
});
