import { useFetch } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref } from "vue";
import { BASE_URL } from "@/utils/constants";
import { EMethods } from "@/types/type";

export const useAuthStore = defineStore("auth-store", () => {
    const accessToken = ref(null);
    // localStorage.accessToken = accessToken.value;

    const logout = () => {
        useFetch(`${BASE_URL}/api/profile/company/logout`, {
            method: EMethods.POST,
            headers: {
                Authorization: `Bearer ${accessToken.value}`,
            },
        });
        localStorage.accessToken = null;
        window.location.href = "/signin";
    };
    return {
        accessToken,
        logout,
    };
});
