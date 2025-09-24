import { useFetch } from "@/composables/useFetch";

export async function fetchWrapper(
    apiEndpoint: string,
    method: ERequestMethods,
    data: Record<string, unknown> | FormData,
) {
    const res = await useFetch(`${APP_ENUM.BASE_API_URL}/${apiEndpoint}`, {
        method,
        data,
        headers: getBearer(),
    });

    return res;
}
