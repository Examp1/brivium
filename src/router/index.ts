import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/home-page.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/signin",
            name: "login-page",
            component: () => import("../views/login-page.vue"),
        },
        {
            path: "/signup",
            name: "register-page",
            component: () => import("../views/register-page.vue"),
        },
        {
            path: "/company",
            name: "comapny-page",
            children: [
                {
                    path: "info",
                    name: "comapny-info",
                    component: () =>
                        import("../views/admin/company/info-page.vue"),
                },
                {
                    path: "tariff",
                    name: "tariff-info",
                    component: () =>
                        import("../views/admin/company/tariff-page.vue"),
                },
                {
                    path: "catalog",
                    name: "catalog-info",
                    component: () =>
                        import("../views/admin/company/catalog-page.vue"),
                },
            ],
            component: () => import("../views/company-page.vue"),
        },
    ],
});

export default router;
