import { EMediaPath } from "@/enums/EMediaPath";

export function getPath(path: string) {
    if (!path) return "";
    if (
        path.includes("jpg") ||
        path.includes("png") ||
        path.includes("webp") ||
        path.includes("svg")
    ) {
        return `${APP_ENUM.BASE_URL}/${EMediaPath.MEDIA_PATH_PREFIX}${path}`;
    } else {
        return `${APP_ENUM.BASE_URL}/${EMediaPath.FILE_PATH_PREFIX}${path}`;
    }
}
