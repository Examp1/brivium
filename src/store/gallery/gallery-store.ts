import { useFetch } from "@/composables/useFetch";
import { useCookies } from "@vueuse/integrations/useCookies.mjs";

export const useGalleryStore = defineStore("gallery-store", () => {
    const galleryListData = ref();
    const galleryAlbums = ref();
    const cookies = useCookies(["accessToken"]);

    const fetchAlbums = async () => {
        const { data } = await useFetch("/api/profile/company/gallery/list", {
            method: ERequestMethods.POST,
            data: {},
            headers: {
                Authorization: `Bearer ${cookies.get("accessToken") || null}`,
            },
        });
        galleryAlbums.value = data.value;
    };

    return {
        galleryAlbums,
        galleryListData,
        fetchAlbums,
    };
});
