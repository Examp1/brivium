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

    const logout = async (userType: "client" | "company") => {
        await fetchWrapper(
            `api/profile/${userType}/logout`,
            ERequestMethods.POST,
        );
        if (userType === "client") {
            cookies.remove("ClientAccessToken");
        } else {
            cookies.remove("ComapnyAccessToken");
        }
        window.location.href = "/";
    };
    return {
        ComapnyAccessToken,
        logout,
    };
});
