import axios, { AxiosError, type AxiosResponse } from "axios";
import { showError, successMsg } from "@/composables/toast-notification";
export const useFetch = async <T = unknown>(url: string, config: IRequest) => {
    const data = ref<T | null>(null);
    const response = ref<AxiosResponse>();
    const error = ref<AxiosError | unknown>(null);
    const loading = ref<boolean>(false);

    const fetch = async () => {
        loading.value = true;
        try {
            const result = await axios.request({
                url,
                ...config,
            });
            response.value = result;
            data.value = result.data;
            successMsg(`Success ${url}`);
        } catch (ex) {
            if (axios.isAxiosError(ex)) {
                error.value = ex;
                showError(
                    ex.response?.data?.message ||
                        ex.message ||
                        "Ошибка запроса",
                );
            } else if (ex instanceof Error) {
                showError(ex.message);
                error.value = ex;
            } else {
                showError("Что-то пошло не так");
                error.value = null;
            }
            error.value = ex;
        } finally {
            loading.value = false;
        }
    };

    // !config?.skip &&

    await fetch();

    return { response, error, data, loading, refresh: fetch };
};

// import { showError, successMsg } from "@/composables/toast-notification";

// export const useFetch = <T = unknown>(url: string, config?: IRequest) => {
//     const data = ref<T | null>(null);
//     const response = ref<Response | null>(null);
//     const error = ref<Error | unknown>(null);
//     const loading = ref<boolean>(false);

//     const finalUrl = APP_ENUM.BASE_API_URL + url;

//     const fetchData = async () => {
//         loading.value = true;
//         try {
//             const result = await fetch(finalUrl, {
//                 method: config?.method || "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                     ...(config?.headers || {}),
//                 },
//                 body:
//                     config?.body && config.method !== "GET"
//                         ? JSON.stringify(config.body)
//                         : undefined,
//             });

//             response.value = result;

//             if (!result.ok) {
//                 const errText = await result.text();
//                 throw new Error(
//                     `Request failed (${result.status}): ${errText || result.statusText}`,
//                 );
//             }

//             const resultData = (await result.json()) as T;
//             data.value = resultData;

//             successMsg(`Success ${url}`);
//         } catch (ex) {
//             if (ex instanceof Error) {
//                 showError(ex.message || "Ошибка запроса");
//                 error.value = ex;
//             } else {
//                 showError("Что-то пошло не так");
//                 error.value = null;
//             }
//         } finally {
//             loading.value = false;
//         }
//     };

//     // запускаем загрузку сразу
//     const promise = fetchData();

//     const result = {
//         data,
//         error,
//         loading,
//         response,
//         refresh: fetchData,
//         // сделал thenable-объект, как у Nuxt
//         then(onFulfilled: any, onRejected: any) {
//             return promise.then(() => onFulfilled(result), onRejected);
//         },
//     };

//     return result;
// };

// export const useFetchCache = (key, url, config) => {
//     const info = useFetch(url, { skip: true, ...config });

//     const update = () => cacheMap.set(key, info.response.value);
//     const clear = () => cacheMap.set(key, undefined);

//     const fetch = async () => {
//         try {
//             await info.fetch();
//             update();
//         } catch {
//             clear();
//         }
//     };

//     const responce = computed(() => cacheMap.get(key));
//     const data = computed(() => responce.value?.data);

//     if (responce.value == null) fetch();
//     return { ...info, fetch, data, responce, clear };
// };
