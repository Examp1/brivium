<script setup lang="ts">
defineProps(["menu"]);

// TODO сделать провайд в nuxtApp
const userStore = useAuthStore();
const { logout } = userStore;
</script>
<template>
    <aside
        class="fixed flex flex-col top-[70px] xl:top-0 px-5 left-0 bg-white text-gray-900 h-full base-transition z-50 border-r border-gray-200 w-[290px] xl:translate-x-0"
    >
        <div class="logo py-4 border-b border-gray-200 flex gap-5 items-center">
            <img
                class="w-[60px] h-[60px]"
                src="@/assets//images/brivium-logo.jpg"
                alt="brivium-logo"
            />
            <h1 class="text-3xl font-semibold">Brivium</h1>
        </div>
        <nav class="border-b border-gray-200 py-4">
            <h3
                class="mb-1 text-xs uppercase flex leading-5 text-gray-400 justify-start"
            >
                Menu
            </h3>
            <ul class="flex flex-col gap-1">
                <li
                    v-for="item in menu"
                    :key="item.title"
                    class="transition-colors duration-300 hover:bg-gray-300 rounded text-gray-700"
                >
                    <RouterLink
                        :to="item.url"
                        class="flex items-center gap-2 py-1 px-2 text-base cursor-pointer whitespace-nowrap"
                    >
                        <span class="mdi text-2xl" :class="item.icon"></span>
                        <span>{{ item.title }}</span>
                    </RouterLink>
                </li>
                <li
                    class="transition-colors duration-300 hover:bg-gray-300 rounded text-red-700"
                >
                    <div
                        class="flex items-center gap-2 py-1 px-2 text-base cursor-pointer whitespace-nowrap"
                        @click="logout"
                    >
                        <span class="mdi mdi-logout text-2xl"></span>
                        <span>logout</span>
                    </div>
                </li>
            </ul>
        </nav>
    </aside>
</template>

<style scoped></style>
