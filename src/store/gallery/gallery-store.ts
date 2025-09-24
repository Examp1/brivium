import { useFetch } from "@/composables/useFetch";
import { fetchWrapper } from "@/utils/api/fetchWrapper";

export const useGalleryStore = defineStore("gallery-store", () => {
    const albumData = ref();
    const galleryAlbums = ref();

    const fetchAlbums = async () => {
        const { data } = await fetchWrapper(
            "api/profile/company/gallery/list",
            ERequestMethods.POST,
            {},
        );
        galleryAlbums.value = data.value;
    };

    const deleteAlbumById = async (albumId: number) => {
        await fetchWrapper(
            "api/profile/company/gallery/delete",
            ERequestMethods.POST,
            {
                id: albumId,
            },
        );
        fetchAlbums();
    };
    const addNewAlbum = async (albumData) => {
        await fetchWrapper(
            "api/profile/company/gallery/add",
            ERequestMethods.POST,
            albumData,
        );
        fetchAlbums();
    };

    const getAlbumInfoById = async (albumId: number) => {
        const { data } = await fetchWrapper(
            "api/profile/company/gallery/get-by-id",
            ERequestMethods.POST,
            {
                id: albumId,
            },
        );
        albumData.value = data.value;
    };

    const deleteMediaFileById = async (mediaId: number) => {
        await fetchWrapper(
            "api/profile/company/gallery/items/delete",
            ERequestMethods.POST,
            {
                gallery_id: albumData.value.model.id,
                id: mediaId,
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
        await fetchWrapper(uploadApi, ERequestMethods.POST, formData);
    };

    const updateMediaTitle = async (updData: { id: number; val: string }) => {
        await fetchWrapper(
            "api/profile/company/gallery/items/edit-title",
            ERequestMethods.POST,
            {
                gallery_id: albumData.value.model.id,
                ...updData,
            },
        );
        getAlbumInfoById(albumData.value.model.id);
    };

    const updateAlbumInfo = async (updData: FormData) => {
        await fetchWrapper(
            "api/profile/company/gallery/update",
            ERequestMethods.POST,
            updData,
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
