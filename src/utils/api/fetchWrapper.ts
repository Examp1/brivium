import { showError } from "@/composables/toast-notification";
import { useFetch } from "@/composables/useFetch";
import type { Ref } from "vue";

interface FetchResponse<T> {
    response: Record<string, unknown>;
    error: Ref<Error>;
    data: Ref<T | undefined>;
    loading: boolean;
    refresh: () => Promise<void>;
}

export async function fetchWrapper<T>(
    apiEndpoint: string,
    method: ERequestMethods,
    data?: Record<string, unknown> | FormData,
): Promise<FetchResponse<T>> {
    const endpointType = apiEndpoint.includes("client") ? "client" : "company";
    try {
        const res = await useFetch(`${APP_ENUM.BASE_API_URL}/${apiEndpoint}`, {
            method,
            data,
            headers: getBearer(endpointType),
        });

        return res;
    } catch (error) {
        showError(error);
        throw error;
    }
}
