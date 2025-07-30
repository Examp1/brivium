<script setup lang="ts">
import { useAuthStore } from "@/store/auth-store";
import { ref } from "vue";
const userStore = useAuthStore();
const { logout } = userStore;

const drawer = ref(true);
const rail = ref(false);

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
    <v-app>
        <v-navigation-drawer rail expand-on-hover permanent>
            <v-list>
                <v-list-item
                    prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
                    title="Admin"
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
