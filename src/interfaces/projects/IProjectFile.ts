export interface IProjectFile {
    id: number;
    project_id: number;
    stage_id: number | null;
    type: number;
    title: string | null;
    public: number;
    inline: number;
    order: number;
    file_url: string;
    image_url: string;
    created_at: string;
}
