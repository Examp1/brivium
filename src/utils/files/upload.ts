export const uploadFile = async (
    apiEndpoint: string,
    selectedFiles: FileList,
    uploadData: Record<string, string | File | number>,
) => {
    const formData = new FormData();
    switch (apiEndpoint) {
        case "api/profile/client/project/file/upload":
            formData.append("project_id", uploadData.project_id as string);
            break;
        case "api/profile/company/gallery/items/upload-image":
            formData.append("gallery_id", uploadData.gallery_id as string);
            break;
        case "api/profile/company/gallery/items/upload-video":
            formData.append("gallery_id", uploadData.gallery_id as string);
            break;
        case "api/profile/client/project/stage/file/add":
            formData.append("stage_id", uploadData.stage_id as string);
            break;
    }
    if (uploadData.title) {
        formData.append("title", uploadData.title as string);
    }
    if (uploadData.public) {
        formData.append("public", uploadData.public as number);
    }

    const selectedMediaArray = Array.from(selectedFiles);
    const uploadPromises = selectedMediaArray.map((file) =>
        _uploadFile(file, apiEndpoint, formData),
    );
    await Promise.all(uploadPromises);
};

const _uploadFile = async (
    file: File,
    uploadApi: string,
    formData: FormData,
) => {
    formData.append("file", file);
    await fetchWrapper(uploadApi, ERequestMethods.POST, formData);
};
