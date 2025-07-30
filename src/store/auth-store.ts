import { ref, watch } from "vue";
import { useFetch } from "@vueuse/core";
import { defineStore } from "pinia";
import { BASE_URL } from "@/utils/constants";
import { EMethods } from "@/types/type";
import { useCookies } from "@vueuse/integrations/useCookies";
// TODO
// import { hashStr } from "@/composables/bcrypt";

export const useAuthStore = defineStore("auth-store", () => {
    const cookies = useCookies(["accessToken"]);
    const accessToken = ref(null);

    watch(accessToken, (newVal, oldVal) => {
        if (newVal !== oldVal) {
            cookies.set("accessToken", newVal);
        }
    });

    const logout = () => {
        useFetch(`${BASE_URL}/api/profile/company/logout`, {
            method: EMethods.POST,
            headers: {
                Authorization: `Bearer ${accessToken.value}`,
            },
        });
        window.location.href = "/signin";
    };
    return {
        accessToken,
        logout,
    };
});
