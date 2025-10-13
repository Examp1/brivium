export const useProjectstageStore = defineStore("project-stage-store", () => {
    const projectStages = ref();
    const projectStage = ref();
    const projectStageFiles = ref([]);
    const projectStageComments = ref([]);
    const _projectID = ref<number>();
    const _stageID = ref<number>();

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
    const fetchProjectStagesById = async (stageId: number) => {
        _stageID.value = stageId;
        const { data } = await fetchWrapper(
            "api/profile/client/project/stage/get-by-id",
            ERequestMethods.POST,
            {
                id: stageId,
            },
        );
        projectStage.value = data.value;
    };

    const fetchProjectStageFiles = async () => {
        const { data } = await fetchWrapper(
            "api/profile/client/project/stage/file/list",
            ERequestMethods.POST,
            {
                stage_id: _stageID.value,
            },
        );
        projectStageFiles.value = data.value;
    };

    const fetchProjectStageComments = async () => {
        const { data } = await fetchWrapper(
            "api/profile/client/project/stage/comment/list",
            ERequestMethods.POST,
            {
                stage_id: _stageID.value,
            },
        );
        projectStageComments.value = data.value;
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
        projectStage,
        projectStageFiles,
        projectStageComments,
        fetchProjectStages,
        addDraftStageToProject,
        updateProjectStage,
        deleteProjectStage,
        fetchProjectStagesById,
        fetchProjectStageFiles,
        fetchProjectStageComments,
    };
});
