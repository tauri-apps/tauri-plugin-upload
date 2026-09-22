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
/**
 * Options for {@linkcode upload}.
 *
 * @since 3.0.0
 */
interface UploadOptions {
    /** Headers to send with the request. */
    headers?: Map<string, string> | Record<string, string>;
    /** HTTP method to use. Defaults to {@linkcode HttpMethod.Post}. */
    method?: HttpMethod;
}
/**
 * Options for {@linkcode download}.
 *
 * @since 3.0.0
 */
interface DownloadOptions {
    /** Headers to send with the request. */
    headers?: Map<string, string> | Record<string, string>;
    /** Body to send with the request. When set, a `POST` request is made instead of a `GET`. */
    body?: string;
}
/**
 * Upload a file to the given url.
 *
 * @example
 * ```typescript
 * import { upload, HttpMethod } from '@tauri-apps/plugin-upload';
 * const response = await upload(
 *   'https://example.com/file-upload',
 *   './path/to/my/file.txt',
 *   ({ progressTotal, total }) => console.log(`Uploaded ${progressTotal} of ${total} bytes`),
 *   { headers: { 'Content-Type': 'text/plain' }, method: HttpMethod.Put }
 * );
 * ```
 *
 * @returns The response body.
 */
declare function upload(url: string, filePath: string, progressHandler?: ProgressHandler, options?: UploadOptions): Promise<string>;
/**
 * Download a file from the given url.
 *
 * Note that `filePath` currently must include the file name.
 * Furthermore the progress events will report a total length of 0 if the server did not sent a `Content-Length` header or if the file is compressed.
 *
 * @example
 * ```typescript
 * import { download } from '@tauri-apps/plugin-upload';
 * await download(
 *   'https://example.com/file-download-link',
 *   './path/to/save/my/file.txt',
 *   ({ progressTotal, total }) => console.log(`Downloaded ${progressTotal} of ${total} bytes`),
 *   { headers: { 'Content-Type': 'text/plain' } }
 * );
 * ```
 */
declare function download(url: string, filePath: string, progressHandler?: ProgressHandler, options?: DownloadOptions): Promise<void>;
export { download, upload, HttpMethod };
export type { ProgressPayload, ProgressHandler, UploadOptions, DownloadOptions };
