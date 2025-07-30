import { App } from "vue";
import { useCookies } from "@vueuse/integrations/useCookies";

export default {
    install(app: App) {
        const cookies = useCookies();

        // Делаем глобально доступным через `app.config.globalProperties`
        app.config.globalProperties.$cookies = cookies;
    },
};
