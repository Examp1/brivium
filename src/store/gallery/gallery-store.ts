import { useFetch } from "@/composables/useFetch";
import { useCookies } from "@vueuse/integrations/useCookies.mjs";

export const useGalleryStore = defineStore("gallery-store", () => {
    const albumData = ref();
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

    const getAlbumInfoById = async (albumId: number) => {
        const { data } = await useFetch(
            `${APP_ENUM.BASE_API_URL}/api/profile/company/gallery/get-by-id`,
            {
                method: ERequestMethods.POST,
                data: {
                    id: albumId,
                },
                headers: {
                    Authorization: `Bearer ${cookies.get("accessToken")}`,
                },
            },
        );
        albumData.value = data.value;
    };
    const getMediaFileById = async (albumId: number, mediaId: number) => {
        await useFetch(
            `${APP_ENUM.BASE_API_URL}/api/profile/company/gallery/items/delete`,
            {
                method: ERequestMethods.POST,
                data: {
                    gallery_id: albumId,
                    id: mediaId,
                },
                headers: {
                    Authorization: `Bearer ${cookies.get("accessToken")}`,
                },
            },
        );
        getAlbumInfoById(albumId);
    };

    return {
        galleryAlbums,
        albumData,
        fetchAlbums,
        deleteAlbumById,
        addNewAlbum,
        getAlbumInfoById,
        getMediaFileById,
    };
});
