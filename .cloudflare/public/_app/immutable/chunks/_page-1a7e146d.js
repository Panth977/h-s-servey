import{d as a,x as s,V as d}from"./db-06457d1e.js";import{e as t}from"./index-d6fabef0.js";const n=async({params:e})=>{try{const o=(await a(s(d,e.videoID))).data();if(!o)throw t(404,"Not found");return o}catch{throw t(404,"Not found")}},i=Object.freeze(Object.defineProperty({__proto__:null,load:n},Symbol.toStringTag,{value:"Module"}));export{i as _,n as l};