// import type { IProjectFile } from "@/interfaces/projects/IProjectFile";
export const useProjectFileStore = defineStore("project-file-store", () => {
    const projectFiles = ref();
    const _projectID = ref<number>();
    const fetchProjectFiles = async (projectId: number) => {
        _projectID.value = projectId;
        const { data } = await fetchWrapper(
            "api/profile/client/project/file/list",
            ERequestMethods.POST,
            {
                project_id: projectId,
            },
        );
        if (data.value) {
            projectFiles.value = data.value;
        }
    };

    // TODO переговорить с денисом насчет апишек ( они оинаковые данные принимают )
    const deleteProjectFile = async (fileID: number) => {
        await fetchWrapper(
            "api/profile/client/project/file/delete",
            ERequestMethods.POST,
            {
                project_id: _projectID.value,
                file_id: fileID,
            },
        );
        await fetchProjectFiles(_projectID.value!);
    };

    const deleteProjectStageFile = async (fileID: number) => {
        await fetchWrapper(
            "api/profile/client/project/stage/file/delete",
            ERequestMethods.POST,
            {
                project_id: _projectID.value,
                id: fileID,
            },
        );
    };

    return {
        projectFiles,
        fetchProjectFiles,
        deleteProjectFile,
        deleteProjectStageFile,
    };
});
