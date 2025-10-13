export interface IPagination {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export interface IStageFile {
    pagination: IPagination;
}
export interface IStageComment {
    pagination: IPagination;
}
