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
            component: () => import("../views/LoginPage.vue"),
        },
        {
            path: "/signup",
            name: "register-page",
            component: () => import("../views/RegisterPage.vue"),
        },
        {
            path: "/company",
            name: "company-page",
            children: [
                {
                    path: "profile",
                    name: "profile-page",
                    component: () =>
                        import("../views/admin/company/ProfilePage.vue"),
                },
                {
                    path: "tariff",
                    name: "tariff-page",
                    component: () =>
                        import("../views/admin/company/TariffPage.vue"),
                },
                {
                    path: "catalog",
                    name: "catalog-page",
                    component: () =>
                        import("../views/admin/company/CatalogPage.vue"),
                },
                {
                    path: "notifications",
                    name: "notifications-page",
                    component: () =>
                        import("../views/admin/company/NotificationsPage.vue"),
                },
                {
                    path: "gallery",
                    name: "gallery-page",
                    component: () =>
                        import("../views/admin/company/GalleryPage.vue"),
                },
            ],
            component: () => import("../views/CompanyPage.vue"),
        },
        // client
        {
            path: "/client",
            name: "client-page",
            children: [
                {
                    path: "profile",
                    name: "profile-page",
                    component: () =>
                        import("../views/admin/company/ProfilePage.vue"),
                },
                {
                    path: "notifications",
                    name: "notifications-page",
                    component: () =>
                        import("../views/admin/company/NotificationsPage.vue"),
                },
                {
                    path: "projects",
                    name: "projects-page",
                    component: () =>
                        import("../views/admin/company/GalleryPage.vue"),
                },
            ],
            component: () => import("../views/CompanyPage.vue"),
        },
    ],
});

export default router;
