import { Channel, invoke } from '@tauri-apps/api/tauri';

async function upload(url, filePath, progressHandler, headers) {
    const ids = new Uint32Array(1);
    window.crypto.getRandomValues(ids);
    const id = ids[0];
    const onProgress = new Channel();
    if (progressHandler != null) {
        onProgress.onmessage = progressHandler;
    }
    await invoke("plugin:upload|upload", {
        id,
        url,
        filePath,
        headers: headers !== null && headers !== void 0 ? headers : {},
        onProgress,
    });
}
/// Download file from given url.
///
/// Note that `filePath` currently must include the file name.
/// Furthermore the progress events will report a total length of 0 if the server did not sent a `Content-Length` header or if the file is compressed.
async function download(url, filePath, progressHandler, headers) {
    const ids = new Uint32Array(1);
    window.crypto.getRandomValues(ids);
    const id = ids[0];
    const onProgress = new Channel();
    if (progressHandler != null) {
        onProgress.onmessage = progressHandler;
    }
    await invoke("plugin:upload|download", {
        id,
        url,
        filePath,
        headers: headers !== null && headers !== void 0 ? headers : {},
        onProgress,
    });
}

export { upload as default, download, upload };
//# sourceMappingURL=index.mjs.map
