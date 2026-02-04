import { createRouter, createWebHistory } from "vue-router";

const AuthLayout = () => import("../layouts/AuthLayout.vue");
const ErrorLayout = () => import("../layouts/ErrorLayout.vue");
const CompanyLayout = () => import("../layouts/CompanyLayout.vue");
const ClientLayout = () => import("../layouts/ClientLayout.vue");

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) return savedPosition;
        return { top: 0 };
    },
    routes: [
        {
            path: "/",
            redirect: { name: "auth-company-signin" }, // или динамический редирект
        },

        // AUTH (layout as route component)
        {
            path: "/auth",
            component: AuthLayout,
            meta: { guestOnly: true },
            children: [
                { path: "", redirect: { name: "auth-company-signin" } },
                {
                    path: "client-signin",
                    name: "auth-client-signin",
                    component: () =>
                        import("../views/auth/ClientLoginPage.vue"),
                },
                {
                    path: "client-signup",
                    name: "auth-client-signup",
                    component: () =>
                        import("../views/auth/ClientRegisterPage.vue"),
                },
                {
                    path: "company-signin",
                    name: "auth-company-signin",
                    component: () =>
                        import("../views/auth/CompanyLoginPage.vue"),
                },
                {
                    path: "company-signup",
                    name: "auth-company-signup",
                    component: () =>
                        import("../views/auth/CompanyRegisterPage.vue"),
                },
            ],
        },

        // // COMPANY
        {
            path: "/company",
            component: CompanyLayout,
            meta: { requiresAuth: true, role: "company" },
            children: [
                { path: "", redirect: { name: "company-profile" } },
                {
                    path: "profile",
                    name: "company-profile",
                    component: () =>
                        import("../views/admin/company/ProfilePage.vue"),
                },
                {
                    path: "tariff",
                    name: "company-tariff",
                    component: () =>
                        import("../views/admin/company/TariffPage.vue"),
                },
                {
                    path: "catalog",
                    name: "company-catalog",
                    component: () =>
                        import("../views/admin/company/CatalogPage.vue"),
                },
                {
                    path: "notifications",
                    name: "company-notifications",
                    component: () =>
                        import("../views/admin/company/NotificationsPage.vue"),
                },
                {
                    path: "gallery",
                    name: "company-gallery",
                    component: () =>
                        import("../views/admin/company/GalleryPage.vue"),
                },
                {
                    path: "reviews",
                    name: "company-reviews",
                    component: () =>
                        import("../views/admin/company/ReviewsPage.vue"),
                },
                {
                    path: "tasks",
                    name: "company-tasks",
                    component: () =>
                        import("../views/admin/company/TasksPage.vue"),
                },
            ],
        },

        // CLIENT
        {
            path: "/client",
            component: ClientLayout,
            meta: { requiresAuth: true, role: "client" },
            children: [
                { path: "", redirect: { name: "client-profile" } },
                {
                    path: "profile",
                    name: "client-profile",
                    component: () =>
                        import("../views/admin/client/ProfilePage.vue"),
                },
                {
                    path: "projects",
                    name: "client-projects",
                    component: () =>
                        import("../views/admin/client/ProjectsPage.vue"),
                },
                {
                    path: "projects/:projectId",
                    name: "client-project",
                    props: true,
                    component: () =>
                        import("../views/admin/client/ProjectPage.vue"),
                },
                {
                    path: "projects/:projectId/stages/:stageId",
                    name: "client-project-stage",
                    props: true,
                    component: () =>
                        import("../views/admin/client/ProjectStagePage.vue"),
                },
            ],
        },

        // 404
        {
            path: "/:pathMatch(.*)*",
            name: "not-found",
            component: ErrorLayout,
        },
    ],
});

export default router;
