<!-- <script setup lang="ts">
import { ref } from "vue";
import { useFetch } from "@/composables/useFetch";
import { useCookies } from "@vueuse/integrations/useCookies";

const router = useRouter();
const cookies = useCookies(["CompanyAccessToken"]);

const loginInputs = ref({
    login: "budcraft@gmail.com",
    password: "00000000",
});

const signIn = async () => {
    const { data, error } = await useFetch(
        `${APP_ENUM.BASE_API_URL}/api/auth/company/login`,
        {
            method: ERequestMethods.POST,
            headers: {
                "Content-type": "application/json",
            },
            data: loginInputs.value,
        },
    );
    if (!error.value) {
        checkToken(data?.value?.one_time_token);
    }
};
const checkToken = async (token: string) => {
    const { data } = await useFetch(
        `${APP_ENUM.BASE_API_URL}/api/auth/company/get-token`,
        {
            method: ERequestMethods.POST,
            headers: {
                "Content-type": "application/json",
            },
            data: {
                one_time_token: token,
            },
        },
    );

    cookies.set("CompanyAccessToken", data?.value?.token);
    router.push("/company/profile");
};
</script> -->

<script setup lang="ts">
import { useCookies } from "@vueuse/integrations/useCookies";
import type { FormSubmitEvent } from "@nuxt/ui";
import * as z from "zod";

import { useFetch, type FetchHttpError } from "@/composables/useFetch";
import { companyLoginScheme } from "../../zod/auth/shemes";

type Schema = z.infer<typeof companyLoginScheme>;

type LoginResponse = { one_time_token: string };
type GetTokenResponse = { token: string };

const schema = companyLoginScheme;
const router = useRouter();
const toast = useToast?.();

const cookies = useCookies(["ClientAccessToken"]);
const pending = ref(false);

const state = reactive<Schema>({
    login: "budcraft@gmail.com",
    password: "00000000",
});

function getErrorMessage(e: unknown) {
    if (e && typeof e === "object" && (e as any).name === "FetchHttpError") {
        const fe = e as FetchHttpError;
        const apiMsg = (fe.data as any)?.message;
        return apiMsg ?? `HTTP ${fe.status} ${fe.statusText}`;
    }
    if (e instanceof Error) return e.message;
    return "Помилка запиту. Спробуйте ще раз.";
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
    pending.value = true;
    try {
        // 1) login
        const loginReq = await useFetch<LoginResponse>(
            "/api/auth/company/login",
            {
                method: "POST",
                body: event.data as any,
            },
        );

        if (loginReq.error.value) throw loginReq.error.value;
        const oneTimeToken = loginReq.data.value?.one_time_token;
        if (!oneTimeToken) throw new Error("Не отримано one_time_token");

        // 2) get token
        const tokenReq = await useFetch<GetTokenResponse>(
            "/api/auth/company/get-token",
            {
                method: "POST",
                body: { one_time_token: oneTimeToken } as any,
            },
        );

        if (tokenReq.error.value) throw tokenReq.error.value;
        const token = tokenReq.data.value?.token;
        if (!token) throw new Error("Не отримано token");

        cookies.set("CompanyAccessToken", token, { path: "/" });
        toast.add({
            title: "Успіх",
            description: "Ви увійшли в систему.",
            color: "success",
        });

        await router.push("/company/profile");
    } catch (e) {
        toast.add({
            title: "Помилка",
            description: getErrorMessage(e),
            color: "error",
        });
    } finally {
        pending.value = false;
    }
}
</script>

<template>
    <div class="flex flex-col items-center">
        <h2 class="text-[28px] font-bold mb-[16px]">
            Вхід в особистий кабінет
        </h2>
        <p class="text-base mb-[28px]">
            Заповніть інформацію, яку ви надавали при реєстрації
        </p>

        <!-- <form
            class="mx-auto w-full max-w-[400px] flex flex-col gap-3"
            @submit.prevent="signIn"
        >
            <div class="grid gap-[28px]">
                <input
                    v-model="loginInputs.login"
                    id="test"
                    class="h-11 w-full rounded-sm border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-800"
                    type="text"
                />

                <input
                    v-model="loginInputs.password"
                    id="test"
                    class="h-11 w-full rounded-sm border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-800"
                    type="password"
                />

                <button
                    type="submit"
                    class="bg-blue-500 text-white py-3 px-10 inline rounded-sm"
                >
                    Увійти
                </button>
            </div>
        </form> -->

        <UForm
            :schema="schema"
            :state="state"
            class="space-y-4"
            @submit="onSubmit"
        >
            <UFormField label="Email" name="login">
                <UInput v-model="state.login" autocomplete="email" />
            </UFormField>
            <UFormField label="Password" name="password">
                <UInput
                    v-model="state.password"
                    type="password"
                    autocomplete="current-password"
                />
            </UFormField>
            <UButton type="submit" :loading="pending" :disabled="pending" block>
                Увійти
            </UButton>
        </UForm>
    </div>
</template>

<style scoped></style>
