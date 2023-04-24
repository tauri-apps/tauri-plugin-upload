import { invoke } from '@tauri-apps/api/tauri';
import { appWindow } from '@tauri-apps/api/window';

const handlers = new Map();
let listening = false;
async function listenToEventIfNeeded(event) {
    if (listening) {
        return await Promise.resolve();
    }
    return await appWindow
        .listen(event, ({ payload }) => {
        const handler = handlers.get(payload.id);
        if (handler != null) {
            handler(payload.progress, payload.total);
        }
    })
        .then(() => {
        listening = true;
    });
}
async function upload(url, filePath, progressHandler, headers) {
    const ids = new Uint32Array(1);
    window.crypto.getRandomValues(ids);
    const id = ids[0];
    if (progressHandler != null) {
        handlers.set(id, progressHandler);
    }
    await listenToEventIfNeeded("upload://progress");
    await invoke("plugin:upload|upload", {
        id,
        url,
        filePath,
        headers: headers !== null && headers !== void 0 ? headers : {},
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
    if (progressHandler != null) {
        handlers.set(id, progressHandler);
    }
    await listenToEventIfNeeded("download://progress");
    await invoke("plugin:upload|download", {
        id,
        url,
        filePath,
        headers: headers !== null && headers !== void 0 ? headers : {},
    });
}

export { upload as default, download, upload };
//# sourceMappingURL=index.mjs.map
