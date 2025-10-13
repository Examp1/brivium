import type { IProjectComment } from "./projects/IProjectComment";
import type { IProjectFile } from "./projects/IProjectFile";
export interface IPagination {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export interface IStageFile {
    items: IProjectFile[];
    pagination: IPagination;
}

export interface IStageComment {
    items: IProjectComment[];
    pagination: IPagination;
}
