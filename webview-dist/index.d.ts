interface ResponseData {
    text: string;
    status: number;
}
declare type ProgressHandler = (progress: number, total: number) => void;
export default function upload(url: string, filePath: string, progressHandler?: ProgressHandler, fileSizeHandler?: (size: number) => unknown, headers?: Map<string, string>): Promise<ResponseData>;
export {};
