import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "../views/login-page.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("../views/auth/ClientLoginPage.vue"),
        },
        {
            path: "/auth",
            name: "auth",
            meta: {
                layout: "auth",
            },
            children: [
                {
                    path: "client-signin",
                    name: "client-login-page",
                    component: () =>
                        import("../views/auth/ClientLoginPage.vue"),
                },
                {
                    path: "client-signup",
                    name: "client-register-page",
                    component: () =>
                        import("../views/auth/ClientRegisterPage.vue"),
                },
                {
                    path: "company-signin",
                    name: "company-login-page",
                    component: () =>
                        import("../views/auth/CompanyLoginPage.vue"),
                },
                {
                    path: "company-signup",
                    name: "company-register-page",
                    component: () =>
                        import("../views/auth/CompanyRegisterPage.vue"),
                },
            ],
        },

        {
            path: "/company",
            name: "company-page",
            meta: {
                layout: "company",
            },
            children: [
                {
                    path: "profile",
                    name: "company-profile-page",
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
                    name: "company-notifications-page",
                    component: () =>
                        import("../views/admin/company/NotificationsPage.vue"),
                },
                {
                    path: "gallery",
                    name: "gallery-page",
                    component: () =>
                        import("../views/admin/company/GalleryPage.vue"),
                },
                {
                    path: "reviews",
                    name: "reviews-page",
                    component: () =>
                        import("../views/admin/company/ReviewsPage.vue"),
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
                    name: "client-profile-page",
                    component: () =>
                        import("../views/admin/client/ProfilePage.vue"),
                },
                // {
                //     path: "notifications",
                //     name: "client-notifications-page",
                //     component: () =>
                //         import("../views/admin/company/NotificationsPage.vue"),
                // },
                // {
                //     path: "projects",
                //     name: "projects-page",
                //     component: () =>
                //         import("../views/admin/company/GalleryPage.vue"),
                // },
            ],
            component: () => import("../views/CompanyPage.vue"),
        },
    ],
});

export default router;
