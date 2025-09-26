<script setup lang="ts">
import AppHeader from "@/components/layout/AppHeader.vue";
import AppSidebar from "@/components/layout/AppSidebar.vue";
import { onMounted } from "vue";

const companyInfoStore = useCompanyInfoStore();

const menu = ref([
    {
        title: "Профіль",
        url: "/company/profile",
        icon: "mdi-home-city",
    },
    {
        title: "Тариф",
        url: "/company/tariff",
        icon: "mdi-account",
    },
    {
        title: "Каталог",
        url: "/company/catalog",
        icon: "mdi-format-list-bulleted-square",
    },
    {
        title: "Галерея",
        url: "/company/gallery",
        icon: "mdi mdi-image-area",
    },
    {
        title: "Відгуки",
        url: "/company/reviews",
        icon: "mdi-book-open-variant",
    },
    {
        title: "Сповіщення",
        url: "/company/notifications",
        icon: "mdi mdi-bell",
    },
]);

const showMenu = ref<boolean>(false);
onMounted(async () => {
    // if (!companyInfo.value) {
    await companyInfoStore.fetchCompanyInfo();
    // }
});
</script>

<template>
    <div class="flex h-[100vh]">
        <AppSidebar
            :menu="menu"
            :class="showMenu ? '-translate-x-0' : '-translate-x-full'"
        />
        <div class="xl:ml-[290px] flex-1 base-transition">
            <AppHeader @toggleView="showMenu = !showMenu" />
            <main class="bg-gray-100 min-h-screen h-fit p-5">
                <div class="bg-white rounded-lg overflow-hidden">
                    <!-- <Transition name="fade" mode="out-in"> -->
                    <slot />
                    <!-- </Transition> -->
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
