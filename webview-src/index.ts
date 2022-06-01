import { invoke } from "@tauri-apps/api/tauri";
import { appWindow } from "@tauri-apps/api/window";

interface ProgressPayload {
  id: number;
  progress: number;
  total: number;
}

interface ResponseData {
  text: string;
  status: number;
}

type ProgressHandler = (progress: number, total: number) => void;
type SizeHandler = (size: number) => unknown;
const handlers: Map<number | string, ProgressHandler | SizeHandler> = new Map();
let listening = false;

function listenToUploadEventIfNeeded() {
  if (listening) {
    return Promise.resolve();
  }
  return appWindow.listen<ProgressPayload>(
    "upload://progress",
    ({ payload }) => {
      const handler = handlers.get(payload.id);
      if (typeof handler === "function") {
        handler(payload.progress, payload.total);
      }
    }
  );
}

export default async function upload(
  url: string,
  filePath: string,
  progressHandler?: ProgressHandler,
  fileSizeHandler?: (size: number) => unknown,
  headers?: Map<string, string>
) {
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

  appWindow.listen<{ id: number; size: number }>(
    "upload://file-size",
    ({ payload }) => {
      const fileSizeId = "file-size-" + payload.id;
      if (handlers.has(fileSizeId)) {
        (handlers.get(id) as SizeHandler)(payload.size);
      }
    }
  );

  return await invoke<ResponseData>("plugin:upload|upload", {
    id,
    url,
    filePath,
    headers: headers ?? {},
  });
}
