// import { authGuard } from "~/middleware/authGuard";

import { showError } from "@/composables/toast-notification";

const authStore = useAuthStore();
const { accessToken } = storeToRefs(authStore);
const router = useRouter();
export const withAuth = async <T>(
    callback: () => Promise<T> | T,
): Promise<T | void> => {
    if (!accessToken.value) {
        showError("Проблемы с токеном авторизации");
        router.push("/");
        return;
    }
    return await callback();
};
