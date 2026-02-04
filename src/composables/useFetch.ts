import { APP_ENUM } from "@/enums/app_enums";
import { ref } from "vue";

type QueryParams = Record<string, string | number | boolean | null | undefined>;

export type UseFetchOptions = RequestInit & {
    baseURL?: string;
    params?: QueryParams;
    skip?: boolean; // аналог твоего "не запускать сразу"
    parseAs?: "json" | "text"; // по умолчанию json
    timeoutMs?: number;
};

export type FetchHttpError = {
    name: "FetchHttpError";
    url: string;
    status: number;
    statusText: string;
    data?: unknown; // тело ответа (если смогли распарсить)
};

const buildUrl = (
    url: string,
    baseURL: string = APP_ENUM.BASE_API_URL,
    params?: QueryParams,
) => {
    const full = baseURL
        ? new URL(url, baseURL)
        : new URL(url, window.location.origin);
    if (params) {
        Object.entries(params).forEach(([k, v]) => {
            if (v === undefined || v === null) return;
            full.searchParams.set(k, String(v));
        });
    }
    return baseURL ? full.toString() : full.pathname + full.search + full.hash;
};

const tryParseJson = async (res: Response) => {
    const text = await res.text();
    if (!text) return null;
    try {
        return JSON.parse(text);
    } catch {
        return text;
    }
};

export const useFetch = async <T = unknown>(
    url: string,
    options: UseFetchOptions = {},
) => {
    const data = ref<T | null>(null);
    const response = ref<Response | null>(null);
    const error = ref<unknown>(null);
    const loading = ref(false);

    const controller = new AbortController();

    const refresh = async () => {
        loading.value = true;
        error.value = null;

        let timeoutId: number | undefined;
        try {
            if (options.timeoutMs) {
                timeoutId = window.setTimeout(
                    () => controller.abort(),
                    options.timeoutMs,
                );
            }

            const finalUrl = buildUrl(url, options.baseURL, options.params);

            // Удобство: если body = plain object, отправим как JSON (как это часто делают с axios)
            const headers = new Headers(options.headers);
            let body = options.body;

            const isFormData =
                typeof FormData !== "undefined" && body instanceof FormData;
            const isPlainObject =
                body != null &&
                typeof body === "object" &&
                !isFormData &&
                !(body instanceof Blob) &&
                !(body instanceof ArrayBuffer);

            if (isPlainObject && !headers.has("Content-Type")) {
                headers.set("Content-Type", "application/json");
                body = JSON.stringify(body);
            }

            const res = await fetch(finalUrl, {
                ...options,
                headers,
                body,
                signal: controller.signal,
            });

            response.value = res;

            if (!res.ok) {
                const errData = await tryParseJson(res);
                const httpError: FetchHttpError = {
                    name: "FetchHttpError",
                    url: finalUrl,
                    status: res.status,
                    statusText: res.statusText,
                    data: errData,
                };
                throw httpError;
            }

            const parseAs = options.parseAs ?? "json";
            const parsed = (
                parseAs === "text" ? await res.text() : await res.json()
            ) as T;
            data.value = parsed;
        } catch (e) {
            error.value = e;
            data.value = null;
        } finally {
            if (timeoutId) window.clearTimeout(timeoutId);
            loading.value = false;
        }
    };

    if (!options.skip) {
        await refresh();
    }

    return {
        response,
        error,
        data,
        loading,
        refresh,
        abort: () => controller.abort(),
    };
};
