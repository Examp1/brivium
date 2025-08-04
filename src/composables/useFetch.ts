import axios, { type AxiosResponse } from "axios";
import { computed, ref } from "vue";
import { showError, successMsg } from "@/composables/toast-notification";
export const useFetch = async (url: string, config: IRequest) => {
    const data = ref(null);
    const response = ref<AxiosResponse>();
    const error = ref<unknown>(null);
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
            error.value = ex;
            showError(ex?.message || "что-то пошло не так");
        } finally {
            loading.value = false;
        }
    };
    // !config?.skip &&
    await fetch();
    return { response, error, data, loading, fetch };
};

export const useFetchCache = (key, url, config) => {
    const info = useFetch(url, { skip: true, ...config });

    const update = () => cacheMap.set(key, info.response.value);
    const clear = () => cacheMap.set(key, undefined);

    const fetch = async () => {
        try {
            await info.fetch();
            update();
        } catch {
            clear();
        }
    };

    const responce = computed(() => cacheMap.get(key));
    const data = computed(() => responce.value?.data);

    if (responce.value == null) fetch();
    return { ...info, fetch, data, responce, clear };
};
