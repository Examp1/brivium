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
    const deleteMediaFileById = async (mediaId: number) => {
        await useFetch(
            `${APP_ENUM.BASE_API_URL}/api/profile/company/gallery/items/delete`,
            {
                method: ERequestMethods.POST,
                data: {
                    gallery_id: albumData.value.model.id,
                    id: mediaId,
                },
                headers: {
                    Authorization: `Bearer ${cookies.get("accessToken")}`,
                },
            },
        );
        getAlbumInfoById(albumData.value.model.id);
    };

    const uploadMedia = async (
        selectedMedia: FileList,
        mediaType: "video" | "image",
    ) => {
        const uploadApi =
            mediaType === "image"
                ? "/api/profile/company/gallery/items/upload-image"
                : "/api/profile/company/gallery/items/upload-video";
        const selectedMediaArray = Array.from(selectedMedia);
        for (const file of selectedMediaArray) {
            await fetchMedia(file, uploadApi);
        }

        getAlbumInfoById(albumData.value.model.id);
    };

    const fetchMedia = (file: File, uploadApi: string) => {
        return new Promise(async (resolve, reject) => {
            const formData = new FormData();
            formData.append("gallery_id", albumData.value.model.id);
            formData.append("file", file);
            try {
                useFetch(`${APP_ENUM.BASE_API_URL}${uploadApi}`, {
                    method: ERequestMethods.POST,
                    data: formData,
                    headers: {
                        Authorization: `Bearer ${cookies.get("accessToken")}`,
                    },
                });
                resolve(`${file.name} uploaded`);
            } catch (error) {
                reject(error);
            }
        });
    };

    return {
        galleryAlbums,
        albumData,
        fetchAlbums,
        deleteAlbumById,
        addNewAlbum,
        getAlbumInfoById,
        deleteMediaFileById,
        uploadMedia,
    };
});
