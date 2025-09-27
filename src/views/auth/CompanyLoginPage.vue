<script setup lang="ts">
import { ref } from "vue";
import { useFetch } from "@/composables/useFetch";
import { useCookies } from "@vueuse/integrations/useCookies";

const router = useRouter();
const cookies = useCookies(["ComapnyAccessToken"]);

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

    cookies.set("accessToken", data?.value?.token);
    router.push("/company/info");
};
</script>

<template>
    <form
        class="mx-auto w-full max-w-[400px] flex flex-col gap-3"
        @submit.prevent="signIn"
    >
        <div>
            <label
                for="test"
                class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                >login</label
            >
            <div class="relative">
                <input
                    v-model="loginInputs.login"
                    id="test"
                    class="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-800"
                    type="text"
                />
            </div>
        </div>
        <div>
            <label
                for="test"
                class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                >password</label
            >
            <div class="relative">
                <input
                    v-model="loginInputs.password"
                    id="test"
                    class="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-800"
                    type="password"
                />
            </div>
        </div>
        <button
            type="submit"
            class="bg-blue-500 text-white py-3 px-10 inline w-fit rounded-xl"
        >
            sign in
        </button>
    </form>
</template>

<style scoped></style>
