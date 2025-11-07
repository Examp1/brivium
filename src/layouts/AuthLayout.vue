<script setup lang="ts">
const route = useRoute();

const routeParams = computed(() => {
    switch (route.name) {
        case "client-login-page":
            return {
                link: "company-signin",
                linkText: "Увійти як компанія",
                formLink: "client-signup",
            };
        case "client-register-page":
            return {
                link: "company-signup",
                linkText: "Зареєструватись як компанія",
                formLink: "client-signin",
            };
        case "company-login-page":
            return {
                link: "client-signin",
                linkText: "Увійти як клієнт",
                formLink: "company-signup",
            };
        case "company-register-page":
            return {
                link: "client-signup",
                linkText: "Зареєструватись як клієнт",
                formLink: "company-signin",
            };
        default:
            return {
                link: "auth/client-signin",
                linkText: "Увійти як клієнт",
                formLink: "company-signup",
            };
    }
});

import clientImage from "@/assets/images/client.png";
import companyImage from "@/assets/images/company.png";

const bgImage = computed(() => {
    return route.path.includes("client") ? clientImage : companyImage;
});
</script>

<template>
    <div class="grid grid-cols-[0.4fr_0.6fr] h-screen w-full">
        <div class="flex items-center justify-center">
            <div class="flex flex-col">
                <slot />
                <router-link
                    :to="routeParams.formLink"
                    v-if="route.path.includes('signup')"
                    class="text-sm font-medium mt-3"
                >
                    Вже маєте обліковий запис?
                    <span class="text-blue-400">Увійдіть</span>
                </router-link>
                <router-link
                    :to="routeParams.formLink"
                    v-else-if="route.path.includes('signin')"
                    class="text-sm font-medium mt-3"
                >
                    Немає облікового запису?
                    <span class="text-blue-400">Зареєструватися</span>
                </router-link>
            </div>
        </div>
        <div class="p-5 text-lg relative">
            <img
                class="object-cover absolute inset-0 w-full h-full"
                :src="bgImage"
                alt=""
            />
            <router-link
                class="absolute t-[10px] left-[20px]"
                :to="routeParams.link"
                >{{ routeParams.linkText }}</router-link
            >
        </div>
    </div>
</template>
