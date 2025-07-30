import { ref } from "vue";
import { useI18n } from "vue-i18n";

import { APP_ENUM } from "@/enums/app_enums";
import { showError } from "./toast-notification";
export function useApiClient() {
    const { locale } = useI18n();
    const isLoading = ref(false);
    const error = ref(null);
    const data = ref(null);

    const fetchData = async <T>(url: string, body: Record<string, any>) => {
        console.log("123");
        isLoading.value = true;
        error.value = null;

        try {
            const response = await fetch(`${APP_ENUM.BASE_URL}${url}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    lang: locale.value,
                    ...body,
                }),
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            data.value = await response.json();
            return data.value as T;
        } catch (err) {
            error.value = err;
            handleApiError(err);
            throw err;
        } finally {
            isLoading.value = false;
        }
    };

    const handleApiError = (err: any) => {
        console.error("API Error:", err);
        showError(err);
    };

    return {
        fetchData,
        isLoading,
        error,
        data,
    };
}
