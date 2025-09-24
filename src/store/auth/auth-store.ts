import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { useCookies } from "@vueuse/integrations/useCookies";
// TODO
// import { hashStr } from "@/composables/bcrypt";

export const useAuthStore = defineStore("auth-store", () => {
    const cookies = useCookies(["accessToken"]);
    const accessToken = ref(cookies.get("accessToken") || null);

    watch(accessToken, (newVal, oldVal) => {
        if (newVal !== oldVal) {
            cookies.set("accessToken", newVal);
        }
    });

    const logout = async () => {
        await fetchWrapper("api/profile/company/logout", ERequestMethods.POST);
        cookies.remove("accessToken");
        window.location.href = "/";
    };
    return {
        accessToken,
        logout,
    };
});
