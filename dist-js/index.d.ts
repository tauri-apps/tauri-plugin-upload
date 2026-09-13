interface ProgressPayload {
    progress: number;
    progressTotal: number;
    total: number;
    transferSpeed: number;
}
type ProgressHandler = (progress: ProgressPayload) => void;
declare enum HttpMethod {
    Post = "POST",
    Put = "PUT",
    Patch = "PATCH"
}
declare function upload(url: string, filePath: string, progressHandler?: ProgressHandler, headers?: Map<string, string>, method?: HttpMethod): Promise<string>;
declare function download(url: string, filePath: string, progressHandler?: ProgressHandler, headers?: Map<string, string>, body?: string): Promise<void>;
export { download, upload, HttpMethod };
