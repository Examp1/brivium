import { ref, watch } from "vue";
import { useFetch } from "@vueuse/core";
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

    const logout = () => {
        useFetch(`${APP_ENUM.BASE_API_URL}/api/profile/company/logout`, {
            method: ERequestMethods.POST,
            headers: {
                Authorization: `Bearer ${accessToken.value}`,
            },
        });
        cookies.remove("accessToken");
        window.location.href = "/";
    };
    return {
        accessToken,
        logout,
    };
});
