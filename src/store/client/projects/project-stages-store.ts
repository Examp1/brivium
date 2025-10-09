export const useProjectstageStore = defineStore("project-stage-store", () => {
    const projectStages = ref();
    const _projectID = ref<number>();

    const fetchProjectStages = async (projectId: number) => {
        _projectID.value = projectId;
        const { data } = await fetchWrapper(
            "api/profile/client/project/stage/list",
            ERequestMethods.POST,
            {
                project_id: projectId,
            },
        );
        projectStages.value = data.value;
    };

    const addDraftStageToProject = async (
        projectId: number,
        stageName: string,
    ) => {
        const { data } = await fetchWrapper(
            "api/profile/client/project/stage/add-draft",
            ERequestMethods.POST,
            {
                project_id: projectId,
                name: stageName,
            },
        );
        return data;
    };

    const updateProjectStage = async (
        updateData: Record<string, string | number>,
    ) => {
        await fetchWrapper(
            "api/profile/client/project/stage/update",
            ERequestMethods.POST,
            updateData,
        );
    };
    const deleteProjectStage = async (id: number) => {
        await fetchWrapper(
            "api/profile/client/project/stage/delete",
            ERequestMethods.POST,
            {
                id,
            },
        );
        await fetchProjectStages(_projectID.value!);
    };
    return {
        projectStages,
        fetchProjectStages,
        addDraftStageToProject,
        updateProjectStage,
        deleteProjectStage,
    };
});
