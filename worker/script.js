!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r="application/json;charset=UTF-8",o=(e,t)=>new Response(((e,t)=>JSON.stringify(e,null,t?2:0))(e,t),{headers:{"content-type":r}}),a=(e,t)=>o({error:"string"==typeof e?e:e.message},t);async function i(e){const t=new URL(e.url).searchParams,n=t.get("force"),r=await KVStore.get("score-data-updated"),i=function(e){if(!e)return null;const t=Number(e);return(new Date).getTime()-t<36e5}(r);if(!n&&i){const e=await KVStore.get("score-data");if(e){const t=JSON.parse(e);return o({data:t,savedData:!0,updatedAt:r})}}const u=t.get("group")||261158,s=t.get("championship")||"BHV Ost 20/21";if(!u||!s)return a("you need to privide group and championship");const c="https://hvmv-handball.liga.nu/cgi-bin/WebObjects/nuLigaHBDE.woa/wa/groupPage?"+new URLSearchParams(`championship=${s}&group=${u}`).toString();if(!c)return a("Url not found");const l=function(e){const t=e.split("\n").map(e=>e.trim().replace(/\s\s+/g," ")).filter(e=>""!==e);let n=!1;const r=t.filter(e=>(e.includes("<table")&&(n=!0),e.includes("</table>")&&(n=!1),n)).map(e=>e.replace(/<[^>]*>/g,"")).filter(e=>""!==e&&"&nbsp;"!==e),o=r.splice(0,9),a=r.length/o.length,i=[];for(let e=0;e<a;e+=1){const t={};o.forEach((n,o)=>{t[n]=r[e*a+o]}),i.push(t)}return i}(await fetch(c).then(e=>e.text()));await KVStore.put("score-data",JSON.stringify(l));const p=(new Date).getTime().toString();return await KVStore.put("score-data-updated",p),o({data:l,savedData:!1,updatedAt:p})}addEventListener("fetch",e=>{e.respondWith(i(e.request))})}]);