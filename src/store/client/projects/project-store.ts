export const useProjectStore = defineStore("project-store", () => {
    const projects = ref();
    const projectData = ref();

    const fetchProjects = async () => {
        const { data } = await fetchWrapper(
            "api/profile/client/project/list",
            ERequestMethods.POST,
        );
        projects.value = data.value;
    };

    const getProjectById = async (projectId: number) => {
        const { data } = await fetchWrapper(
            "api/profile/client/project/get-by-id",
            ERequestMethods.POST,
            {
                id: projectId,
            },
        );
        projectData.value = data.value;
    };

    const addNewProject = async (projectData) => {
        await fetchWrapper(
            "api/profile/client/project/add",
            ERequestMethods.POST,
            projectData,
        );
        await fetchProjects();
    };

    const deleteProjectById = async (projectId: number) => {
        await fetchWrapper(
            "api/profile/client/project/delete",
            ERequestMethods.POST,
            {
                id: projectId,
            },
        );
        await fetchProjects();
    };

    return {
        projects,
        projectData,
        fetchProjects,
        getProjectById,
        addNewProject,
        deleteProjectById,
    };
});
