export interface IRequest {
    method: ERequestMethods;
    headers?: {
        [key: string]: string;
    };
    data?: unknown;
}
