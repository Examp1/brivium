export const useProjectstageStore = defineStore("project-stage-store", () => {
    const projectStages = ref();

    const fetchProjectStages = async (projectId: number) => {
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
        await fetchWrapper(
            "api/profile/client/project/stage/add-draft",
            ERequestMethods.POST,
            {
                project_id: projectId,
                name: stageName,
            },
        );
    };
    return {
        projectStages,
        fetchProjectStages,
        addDraftStageToProject,
    };
});
