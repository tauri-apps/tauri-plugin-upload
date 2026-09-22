import { Channel, invoke } from '@tauri-apps/api/core';

// Copyright 2019-2023 Tauri Programme within The Commons Conservancy
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT
var HttpMethod;
(function (HttpMethod) {
    HttpMethod["Post"] = "POST";
    HttpMethod["Put"] = "PUT";
    HttpMethod["Patch"] = "PATCH";
})(HttpMethod || (HttpMethod = {}));
function headersToRust(headers) {
    return headers instanceof Map ? Object.fromEntries(headers) : (headers ?? {});
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
async function upload(url, filePath, progressHandler, options) {
    const ids = new Uint32Array(1);
    window.crypto.getRandomValues(ids);
    const id = ids[0];
    const onProgress = new Channel();
    if (progressHandler) {
        onProgress.onmessage = progressHandler;
    }
    return await invoke('plugin:upload|upload', {
        id,
        url,
        filePath,
        headers: headersToRust(options?.headers),
        method: options?.method ?? HttpMethod.Post,
        onProgress
    });
}
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
async function download(url, filePath, progressHandler, options) {
    const ids = new Uint32Array(1);
    window.crypto.getRandomValues(ids);
    const id = ids[0];
    const onProgress = new Channel();
    if (progressHandler) {
        onProgress.onmessage = progressHandler;
    }
    await invoke('plugin:upload|download', {
        id,
        url,
        filePath,
        headers: headersToRust(options?.headers),
        onProgress,
        body: options?.body
    });
}

export { HttpMethod, download, upload };
