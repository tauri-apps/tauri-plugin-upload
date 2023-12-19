'use strict';

var core = require('@tauri-apps/api/core');

// Copyright 2019-2023 Tauri Programme within The Commons Conservancy
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT
async function upload(url, filePath, progressHandler, headers) {
    const ids = new Uint32Array(1);
    window.crypto.getRandomValues(ids);
    const id = ids[0];
    const onProgress = new core.Channel();
    if (progressHandler != null) {
        onProgress.onmessage = progressHandler;
    }
    await core.invoke("plugin:upload|upload", {
        id,
        url,
        filePath,
        headers: headers ?? {},
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
    const onProgress = new core.Channel();
    if (progressHandler != null) {
        onProgress.onmessage = progressHandler;
    }
    await core.invoke("plugin:upload|download", {
        id,
        url,
        filePath,
        headers: headers ?? {},
        onProgress,
    });
}

exports.download = download;
exports.upload = upload;
