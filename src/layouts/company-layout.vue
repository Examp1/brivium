<script setup lang="ts">
import AppTopbar from "@/components/navigations/app-topbar.vue";
const userStore = useAuthStore();
const { logout } = userStore;

const menu = ref([
    {
        title: "Company info",
        url: "/company/info",
        icon: "mdi-home-city",
    },
    {
        title: "Tariff",
        url: "/company/tariff",
        icon: "mdi-account",
    },
    {
        title: "Catalog",
        url: "/company/catalog",
        icon: "mdi-format-list-bulleted-square",
    },
]);
</script>

<template>
    <div class="flex h-[100vh]">
        <aside
            class="fixed flex flex-col xl:mt-0 top-0 px-5 left-0 bg-white text-gray-900 h-full transition-all duration-300 ease-in-out z-50 border-r border-gray-200 w-[290px] -translate-x-full xl:translate-x-0"
        >
            <div
                class="logo py-4 border-b border-gray-200 flex gap-5 items-center"
            >
                <img
                    class="w-[60px] h-[60px]"
                    src="../assets//images/brivium-logo.jpg"
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
                        <router-link
                            :to="item.url"
                            class="flex items-center gap-2 py-1 px-2 text-base cursor-pointer whitespace-nowrap"
                        >
                            <span
                                class="mdi text-2xl"
                                :class="item.icon"
                            ></span>
                            <span>{{ item.title }}</span>
                        </router-link>
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
        <div class="ml-[290px] flex-1 transition-all duration-300 ease-in-out">
            <AppTopbar />
            <main class="bg-gray-100 min-h-screen h-fit p-5">
                <div class="bg-white rounded-lg overflow-hidden">
                    <Transition name="fade" mode="out-in">
                        <slot />
                    </Transition>
                </div>
            </main>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-100px);
}
</style>
