<script setup lang="ts">
import { ref } from "vue";
import { useFetch } from "@/composables/useFetch";
import { useCookies } from "@vueuse/integrations/useCookies";

const router = useRouter();
const cookies = useCookies(["ClientAccessToken"]);

const loginInputs = ref({
    login: "testuser@email.com",
    password: "123123123",
});

const signIn = async () => {
    const { data, error } = await useFetch(
        `${APP_ENUM.BASE_API_URL}/api/auth/client/login`,
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
        `${APP_ENUM.BASE_API_URL}/api/auth/client/get-token`,
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

    console.log(data?.value);

    cookies.set("ClientAccessToken", data?.value?.token);
    router.push("/client/profile");
};
</script>

<template>
    <div class="flex flex-col items-center">
        <h2 class="text-[28px] font-bold mb-[16px]">
            Вхід в особистий кабінет
        </h2>
        <p class="text-base mb-[28px]">
            Заповніть інформацію, яку ви надавали при реєстрації
        </p>
        <form
            class="mx-auto w-full max-w-[400px] flex flex-col gap-3"
            @submit.prevent="signIn"
        >
            <div class="grid gap-[28px]">
                <input
                    v-model="loginInputs.login"
                    id="test"
                    class="h-11 w-full rounded-sm border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-800"
                    type="text"
                    placeholder="Пошта або телефон"
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
        </form>
    </div>
</template>

<style scoped></style>
