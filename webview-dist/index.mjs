import { invoke } from '@tauri-apps/api/tauri';
import { appWindow } from '@tauri-apps/api/window';

const handlers = new Map();
function listenToUploadEventIfNeeded() {
    return appWindow.listen("upload://progress", ({ payload }) => {
        const handler = handlers.get(payload.id);
        if (typeof handler === "function") {
            handler(payload.progress, payload.total);
        }
    });
}
async function upload(url, filePath, progressHandler, fileSizeHandler, headers) {
    const ids = new Uint32Array(1);
    window.crypto.getRandomValues(ids);
    const id = ids[0];
    if (progressHandler) {
        handlers.set(id, progressHandler);
    }
    await listenToUploadEventIfNeeded();
    const fileSizeId = "file-size-" + id;
    if (fileSizeHandler) {
        handlers.set(fileSizeId, fileSizeHandler);
    }
    appWindow.listen("upload://file-size", ({ payload }) => {
        const fileSizeId = "file-size-" + payload.id;
        if (handlers.has(fileSizeId)) {
            handlers.get(id)(payload.size);
        }
    });
    return await invoke("plugin:upload|upload", {
        id,
        url,
        filePath,
        headers: headers !== null && headers !== void 0 ? headers : {},
    });
}

export { upload as default };
