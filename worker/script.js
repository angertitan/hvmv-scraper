!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r="application/json;charset=UTF-8",o="score-data",a=(e,t)=>new Response(((e,t)=>JSON.stringify(e,null,t?2:0))(e,t),{headers:{"content-type":r}}),i=(e,t)=>a({error:"string"==typeof e?e:e.message},t);async function u(e){const t=new URL(e.url).searchParams,n=t.get("force"),r=await KVStore.get(o+"-updated"),u=function(e){if(!e)return null;const t=Number(e);return(new Date).getTime()-t<36e5}(r);if(!n&&u){const e=await KVStore.get(o),t=await KVStore.get(o+"-headrow");if(e){const n=JSON.parse(e);return a({data:n,headRow:t,updatedAt:r})}}const c=t.get("group")||261158,s=t.get("championship")||"BHV Ost 20/21";if(!c||!s)return i("you need to privide group and championship");const l="https://hvmv-handball.liga.nu/cgi-bin/WebObjects/nuLigaHBDE.woa/wa/groupPage?"+new URLSearchParams(`championship=${s}&group=${c}`).toString();if(!l)return i("Url not found");const p=await fetch(l).then(e=>e.text()),{headRow:f,teamData:d}=function(e){const t=e.split("\n").map(e=>e.trim().replace(/\s\s+/g," ")).filter(e=>""!==e);let n=!1,r=!1;const o=t.filter(e=>(e.includes("<table")&&!r&&(n=!0,r=!0),e.includes("</table>")&&(n=!1),n)).map(e=>e.replace(/<[^>]*>/g,"")).filter(e=>""!==e&&"&nbsp;"!==e),a=o.splice(0,9),i=o.length/a.length,u=[];for(let e=0;e<i;e+=1){const t={};a.forEach((n,r)=>{t[n]=o[e*i+r]}),u.push(t)}return{headRow:a,teamData:u}}(p);await KVStore.put(o,JSON.stringify(d)),await KVStore.put(o+"-headrow",JSON.stringify(f));const g=(new Date).getTime().toString();return await KVStore.put(o+"-updated",g),a({data:d,headRow:f,updatedAt:g})}addEventListener("fetch",e=>{e.respondWith(u(e.request))})}]);