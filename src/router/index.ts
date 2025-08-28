import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "../views/login-page.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        // {
        //     path: "/",
        //     name: "home",
        //     component: HomeView,
        // },
        {
            path: "/",
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
            name: "company-page",
            children: [
                {
                    path: "info",
                    name: "info-page",
                    component: () =>
                        import("../views/admin/company/info-page.vue"),
                },
                {
                    path: "tariff",
                    name: "tariff-page",
                    component: () =>
                        import("../views/admin/company/tariff-page.vue"),
                },
                {
                    path: "catalog",
                    name: "catalog-page",
                    component: () =>
                        import("../views/admin/company/catalog-page.vue"),
                },
                {
                    path: "notifications",
                    name: "notifications-page",
                    component: () =>
                        import("../views/admin/company/notifications-page.vue"),
                },
            ],
            component: () => import("../views/company-page.vue"),
        },
    ],
});

export default router;
