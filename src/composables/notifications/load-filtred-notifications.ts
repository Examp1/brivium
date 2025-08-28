import { useCookies } from "@vueuse/integrations/useCookies";
import { useFetch } from "../useFetch";

export default async function loadFiltredNotifications(filter: {
    status: number;
    type: number;
}) {
    const cookies = useCookies(["accessToken"]);
    const { data, refresh } = await useFetch(
        `${APP_ENUM.BASE_API_URL}/api/profile/company/notifications/list`,
        {
            method: ERequestMethods.POST,
            headers: {
                Authorization: `Bearer ${cookies.get("accessToken")}`,
            },
            data: {
                filter,
            },
        },
    );
    return {
        data,
        refresh,
    };
}
