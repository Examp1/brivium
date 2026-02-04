import { useFetch, type UseFetchOptions } from "@/composables/useFetch";
import { getApiEndpointType, getBearer } from "@/utils/api/helpers";

type EndpointType = "client" | "company";
export type UseApiFetchOptions = UseFetchOptions & {
    endpointType?: EndpointType; // ручной override, если по URL не понять
    auth?: boolean; // по умолчанию true, можно выключить для /auth/*
};

const headersToObject = (headers?: HeadersInit): Record<string, string> => {
    if (!headers) return {};

    if (headers instanceof Headers) {
        const obj: Record<string, string> = {};
        headers.forEach((value, key) => (obj[key] = value));
        return obj;
    }

    if (Array.isArray(headers)) {
        return Object.fromEntries(headers);
    }

    return { ...headers };
};

const detectEndpointType = (url: string, baseURL?: string): EndpointType => {
    const full = baseURL ? new URL(url, baseURL).toString() : url;

    if (/(^|\/)client(\/|$)/.test(full)) return "client";
    if (/(^|\/)company(\/|$)/.test(full)) return "company";

    // fallback на твою логику (по умолчанию company)
    return getApiEndpointType(full) as EndpointType;
};

export const useAuthorizedFetch = async <T = unknown>(
    url: string,
    options: UseApiFetchOptions = {},
) => {
    const endpointType =
        options.endpointType ?? detectEndpointType(url, options.baseURL);

    const authHeaders = getBearer(endpointType);
    const userHeaders = headersToObject(options.headers);

    const mergedHeaders: Record<string, string> = {
        ...authHeaders,
        ...userHeaders,
    };

    return useFetch<T>(url, {
        ...options,
        headers: mergedHeaders,
    });
};
