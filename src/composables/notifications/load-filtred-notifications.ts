import { useCookies } from "@vueuse/integrations/useCookies";
import { useFetch } from "../useFetch";

export default async function loadFiltredNotifications(filter: {
    status: number;
    type: number;
}) {
    // TODO refactor ComapnyAccessToken
    const cookies = useCookies(["ComapnyAccessToken"]);
    const { data, refresh } = await useFetch(
        `${APP_ENUM.BASE_API_URL}/api/profile/company/notifications/list`,
        {
            method: ERequestMethods.POST,
            headers: {
                Authorization: `Bearer ${cookies.get("ComapnyAccessToken")}`,
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
