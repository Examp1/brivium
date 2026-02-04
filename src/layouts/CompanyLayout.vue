<!-- <script setup lang="ts">
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
    {
        title: "TASKS",
        url: "/company/tasks",
        icon: "mdi mdi-book-open-variant",
    },
]);

const showMenu = ref<boolean>(false);
onMounted(async () => {
    await companyInfoStore.fetchCompanyInfo();
});
</script>

<template>
    <div class="flex h-[100vh]">
        <AppSidebar
            :menu="menu"
            userType="company"
            :class="showMenu ? '-translate-x-0' : '-translate-x-full'"
        />
        <div class="xl:ml-[290px] flex-1 base-transition">
            <AppHeader
                @toggleView="showMenu = !showMenu"
                :name="companyInfoStore.companyInfo.name || 'user name'"
            />
            <main class="bg-gray-100 min-h-screen h-fit p-5">
                <div class="bg-white rounded-lg overflow-hidden">
                    <slot />

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
</style> -->

<script setup lang="ts">
import { onMounted } from "vue";

const companyInfoStore = useCompanyInfoStore();
const showMenu = ref(false);

const menu = [
    { label: "Профіль", url: "/company/profile", icon: "i-mdi-home-city" },
    { label: "Тариф", url: "/company/tariff", icon: "i-mdi-account" },
    {
        label: "Каталог",
        url: "/company/catalog",
        icon: "i-mdi-format-list-bulleted-square",
    },
    { label: "Галерея", url: "/company/gallery", icon: "i-mdi-image-area" },
    {
        label: "Відгуки",
        url: "/company/reviews",
        icon: "i-mdi-book-open-variant",
    },
    { label: "Сповіщення", url: "/company/notifications", icon: "i-mdi-bell" },
    {
        label: "TASKS",
        url: "/company/tasks",
        icon: "i-mdi-clipboard-check-outline",
    },
];

const links = computed(() =>
    menu.map((i) => ({
        label: i.label,
        to: i.url,
        icon: i.icon,
    })),
);

onMounted(async () => {
    await companyInfoStore.fetchCompanyInfo();
});
</script>

<template>
    <div class="flex h-dvh">
        <!-- Desktop sidebar -->
        <aside class="hidden xl:block fixed left-0 top-0 h-dvh w-[290px]">
            <UCard class="h-full rounded-none">
                <template #header>
                    <div class="truncate font-semibold">
                        {{ companyInfoStore.companyInfo.name || "user name" }}
                    </div>
                    <div class="text-sm text-gray-500">Company area</div>
                </template>
                <UNavigationMenu orientation="vertical" :items="links" />
            </UCard>
        </aside>

        <USlideover v-model="showMenu" class="xl:hidden">
            <UCard class="h-full">
                <template #header>
                    <div class="truncate font-semibold">
                        {{ companyInfoStore.companyInfo.name || "user name" }}
                    </div>
                </template>
                <UNavigationMenu
                    orientation="vertical"
                    :items="links"
                    @click="showMenu = false"
                />
            </UCard>
        </USlideover>

        <!-- Content -->
        <div class="xl:ml-[290px] flex-1 base-transition">
            <!-- Header -->
            <div class="sticky top-0 z-20">
                <UCard class="rounded-none">
                    <div class="flex items-center gap-3">
                        <UButton
                            class="xl:hidden"
                            color="gray"
                            variant="ghost"
                            icon="i-heroicons-bars-3"
                            @click="showMenu = true"
                        />
                        <div class="truncate font-semibold">
                            {{
                                companyInfoStore.companyInfo.name || "user name"
                            }}
                        </div>

                        <div class="ml-auto">
                            <!-- сюда можно потом добавить профиль/выход -->
                            <UButton
                                color="gray"
                                variant="soft"
                                icon="i-heroicons-user-circle"
                            >
                                Account
                            </UButton>
                        </div>
                    </div>
                </UCard>
            </div>

            <!-- Main -->
            <main class="bg-gray-100 min-h-screen h-fit p-5">
                <UCard class="rounded-lg overflow-hidden">
                    <!-- как у тебя был slot, но для router-layout нужен RouterView -->
                    <!-- Вариант без анимации: -->
                    <!-- <RouterView /> -->

                    <!-- Вариант с fade-анимацией: -->
                    <RouterView v-slot="{ Component }">
                        <Transition name="fade" mode="out-in">
                            <component :is="Component" />
                        </Transition>
                    </RouterView>
                </UCard>
            </main>
        </div>
    </div>
</template>

<style scoped>
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
