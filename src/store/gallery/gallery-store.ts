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
        useFetch(
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
    const addNewAlbum = async (albumData) => {
        await useFetch(
            `${APP_ENUM.BASE_API_URL}/api/profile/company/gallery/add`,
            {
                method: ERequestMethods.POST,
                data: albumData,
                headers: {
                    Authorization: `Bearer ${cookies.get("accessToken")}`,
                },
            },
        );
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

        const uploadPromises = selectedMediaArray.map((file) =>
            fetchMedia(file, uploadApi),
        );

        await Promise.all(uploadPromises);

        await getAlbumInfoById(albumData.value.model.id);
    };

    const fetchMedia = async (file: File, uploadApi: string) => {
        const formData = new FormData();
        formData.append("gallery_id", albumData.value.model.id);
        formData.append("file", file);
        await useFetch(`${APP_ENUM.BASE_API_URL}${uploadApi}`, {
            method: ERequestMethods.POST,
            data: formData,
            headers: {
                Authorization: `Bearer ${cookies.get("accessToken")}`,
            },
        });
        return `${file.name} uploaded`;
    };

    const updateMediaTitle = async (updData: { id: number; val: string }) => {
        await useFetch(
            `${APP_ENUM.BASE_API_URL}/api/profile/company/gallery/items/edit-title`,
            {
                method: ERequestMethods.POST,
                data: {
                    gallery_id: albumData.value.model.id,
                    ...updData,
                },
                headers: {
                    Authorization: `Bearer ${cookies.get("accessToken")}`,
                },
            },
        );
        getAlbumInfoById(albumData.value.model.id);
    };
    const updateAlbumInfo = async (updData: FormData) => {
        await useFetch(
            `${APP_ENUM.BASE_API_URL}/api/profile/company/gallery/update`,
            {
                method: ERequestMethods.POST,
                data: updData,
                headers: {
                    Authorization: `Bearer ${cookies.get("accessToken")}`,
                },
            },
        );
        fetchAlbums();
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
        updateMediaTitle,
        updateAlbumInfo,
    };
});
