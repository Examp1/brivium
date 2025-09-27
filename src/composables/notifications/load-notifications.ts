import { useFetch } from "@/composables/useFetch";
import { useCookies } from "@vueuse/integrations/useCookies";
export default async function loadNotifications() {
    // TODO refactor ComapnyAccessToken
    const cookies = useCookies(["ComapnyAccessToken"]);

    const { data, refresh } = await useFetch(
        `${APP_ENUM.BASE_API_URL}/api/profile/company/notifications/load-new`,
        {
            method: ERequestMethods.POST,
            headers: {
                Authorization: `Bearer ${cookies.get("ComapnyAccessToken")}`,
            },
        },
    );
    return {
        data,
        refresh,
    };
}
