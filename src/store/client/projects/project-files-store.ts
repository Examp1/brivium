export const useProjectFileStore = defineStore("project-file-store", () => {
    const projectFiles = ref();

    const fetchProjectFiles = async (projectId: number) => {
        const { data } = await fetchWrapper(
            "api/profile/client/project/file/list",
            ERequestMethods.POST,
            {
                project_id: projectId,
            },
        );
        projectFiles.value = data.value;
    };

    return {
        projectFiles,
        fetchProjectFiles,
    };
});
