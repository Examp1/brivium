import { useFetch } from "@/composables/useFetch";
import { useCookies } from "@vueuse/integrations/useCookies.mjs";

export const useGalleryStore = defineStore("gallery-store", () => {
    const galleryListData = ref();
    const galleryAlbums = ref();
    const cookies = useCookies(["accessToken"]);

    const fetchAlbums = async () => {
        const { data } = await useFetch(
            `${APP_ENUM.BASE_API_URL}/api/profile/company/gallery/list`,
            {
                method: ERequestMethods.POST,
                data: {},
                headers: {
                    Authorization: `Bearer ${cookies.get("accessToken") || null}`,
                },
            },
        );
        galleryAlbums.value = data.value;
    };

    const deleteAlbumById = async (albumId: number) => {
        await useFetch(
            `${APP_ENUM.BASE_API_URL}/api/profile/company/gallery/delete`,
            {
                method: ERequestMethods.POST,
                data: {
                    id: albumId,
                },
                headers: {
                    Authorization: `Bearer ${cookies.get("accessToken") || null}`,
                },
            },
        );
        fetchAlbums();
    };
    const addNewAlbum = async (albumAata) => {
        useFetch(`${APP_ENUM.BASE_API_URL}/api/profile/company/gallery/add`, {
            method: ERequestMethods.POST,
            data: albumAata,
            headers: {
                Authorization: `Bearer ${cookies.get("accessToken")}`,
            },
        });
        fetchAlbums();
    };

    return {
        galleryAlbums,
        galleryListData,
        fetchAlbums,
        deleteAlbumById,
        addNewAlbum,
    };
});
