if("__TAURI__"in window){var __TAURI_UPLOAD__=function(e){"use strict";var n=Object.defineProperty,t=(e,n,t)=>{if(!n.has(e))throw TypeError("Cannot "+t)},r=(e,n,r)=>(t(e,n,"read from private field"),r?r.call(e):n.get(e)),o=(e,n,r,o)=>(t(e,n,"write to private field"),o?o.call(e,r):n.set(e,r),r);function a(e,n=!1){let t=window.crypto.getRandomValues(new Uint32Array(1))[0],r=`_${t}`;return Object.defineProperty(window,r,{value:t=>(n&&Reflect.deleteProperty(window,r),e?.(t)),writable:!1,configurable:!0}),t}((e,t)=>{for(var r in t)n(e,r,{get:t[r],enumerable:!0})})({},{Channel:()=>l,PluginListener:()=>s,addPluginListener:()=>d,convertFileSrc:()=>u,invoke:()=>c,transformCallback:()=>a});var i,l=class{constructor(){this.__TAURI_CHANNEL_MARKER__=!0,((e,n,t)=>{if(n.has(e))throw TypeError("Cannot add the same private member more than once");n instanceof WeakSet?n.add(e):n.set(e,t)})(this,i,(()=>{})),this.id=a((e=>{r(this,i).call(this,e)}))}set onmessage(e){o(this,i,e)}get onmessage(){return r(this,i)}toJSON(){return`__CHANNEL__:${this.id}`}};i=new WeakMap;var s=class{constructor(e,n,t){this.plugin=e,this.event=n,this.channelId=t}async unregister(){return c(`plugin:${this.plugin}|remove_listener`,{event:this.event,channelId:this.channelId})}};async function d(e,n,t){let r=new l;return r.onmessage=t,c(`plugin:${e}|register_listener`,{event:n,handler:r}).then((()=>new s(e,n,r.id)))}async function c(e,n={}){return new Promise(((t,r)=>{let o=a((e=>{t(e),Reflect.deleteProperty(window,`_${i}`)}),!0),i=a((e=>{r(e),Reflect.deleteProperty(window,`_${o}`)}),!0);window.__TAURI_IPC__({cmd:e,callback:o,error:i,...n})}))}function u(e,n="asset"){let t=encodeURIComponent(e);return navigator.userAgent.includes("Windows")?`https://${n}.localhost/${t}`:`${n}://localhost/${t}`}async function _(e,n,t,r){const o=new Uint32Array(1);window.crypto.getRandomValues(o);const a=o[0],i=new l;null!=t&&(i.onmessage=t),await c("plugin:upload|upload",{id:a,url:e,filePath:n,headers:null!=r?r:{},onProgress:i})}return e.default=_,e.download=async function(e,n,t,r){const o=new Uint32Array(1);window.crypto.getRandomValues(o);const a=o[0],i=new l;null!=t&&(i.onmessage=t),await c("plugin:upload|download",{id:a,url:e,filePath:n,headers:null!=r?r:{},onProgress:i})},e.upload=_,Object.defineProperty(e,"__esModule",{value:!0}),e}({});Object.defineProperty(window.__TAURI__,"upload",{value:__TAURI_UPLOAD__})}
