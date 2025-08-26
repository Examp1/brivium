import { useFetch } from "@/composables/useFetch";
import { useCookies } from "@vueuse/integrations/useCookies";
export default async function loadNotifications() {
    const cookies = useCookies(["accessToken"]);
    const { data, refresh } = await useFetch(
        `${APP_ENUM.BASE_API_URL}/api/profile/company/notifications/load-new`,
        {
            method: ERequestMethods.POST,
            headers: {
                Authorization: `Bearer ${cookies.get("accessToken")}`,
            },
        },
    );
    return {
        data,
        refresh,
    };
}
