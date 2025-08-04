<script setup lang="ts">
const userStore = useAuthStore();
const companyInfoStore = useCompanyInfoStore();
const { logout } = userStore;
const { companyInfo } = storeToRefs(companyInfoStore);

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
    {{ companyInfo }}
    <v-app>
        <v-navigation-drawer rail expand-on-hover permanent>
            <v-list>
                <v-list-item
                    :prepend-avatar="companyInfo?.avatar"
                    :title="companyInfo?.name"
                >
                </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list density="compact" nav>
                <v-list-item
                    v-for="item in menu"
                    :key="item.title"
                    :prepend-icon="item.icon"
                    :title="item.title"
                    tag="router-link"
                    :to="item.url"
                ></v-list-item>
                <v-list-item
                    prepend-icon="mdi-logout"
                    title="logout"
                    tag="div"
                    @click="logout"
                ></v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar title="Brivium"></v-app-bar>
        <v-main>
            <slot />
        </v-main>
    </v-app>
</template>

<style lang="scss" scoped></style>
