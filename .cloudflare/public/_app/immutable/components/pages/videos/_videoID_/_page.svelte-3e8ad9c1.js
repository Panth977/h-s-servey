import{S as I,i as H,s as k,v as l,a as V,k as q,w as d,c as D,l as C,m as E,h as $,n as J,x as u,b as _,f as c,t as v,y as h,J as L}from"../../../../chunks/index-2288207f.js";import{p as P}from"../../../../chunks/stores-83358fdb.js";import{V as j}from"../../../../chunks/Video-4c69a625.js";import{H as y}from"../../../../chunks/Header-9cf8977c.js";import{S as z}from"../../../../chunks/Seo-aba2adc6.js";import"../../../../chunks/singletons-c0295a0c.js";import"../../../../chunks/Ads-15616d52.js";import"../../../../chunks/state-2107352d.js";import"../../../../chunks/db-06457d1e.js";import"../../../../chunks/Share-9deee359.js";function A(i){var g;let s,n,o,m,r,a,p;return s=new z({props:{discription:i[0].caption,poster:i[0].video,title:i[0].title}}),o=new y({props:{title:"Latest Video",share:{path:`/videos/${i[1]}`,title:(g=i[0])==null?void 0:g.title}}}),a=new j({props:{video:i[0]}}),{c(){l(s.$$.fragment),n=V(),l(o.$$.fragment),m=V(),r=q("div"),l(a.$$.fragment),this.h()},l(e){d(s.$$.fragment,e),n=D(e),d(o.$$.fragment,e),m=D(e),r=C(e,"DIV",{class:!0});var t=E(r);d(a.$$.fragment,t),t.forEach($),this.h()},h(){J(r,"class","pb-9 mt-1")},m(e,t){u(s,e,t),_(e,n,t),u(o,e,t),_(e,m,t),_(e,r,t),u(a,r,null),p=!0},p(e,[t]){var S;const f={};t&1&&(f.discription=e[0].caption),t&1&&(f.poster=e[0].video),t&1&&(f.title=e[0].title),s.$set(f);const b={};t&3&&(b.share={path:`/videos/${e[1]}`,title:(S=e[0])==null?void 0:S.title}),o.$set(b);const w={};t&1&&(w.video=e[0]),a.$set(w)},i(e){p||(c(s.$$.fragment,e),c(o.$$.fragment,e),c(a.$$.fragment,e),p=!0)},o(e){v(s.$$.fragment,e),v(o.$$.fragment,e),v(a.$$.fragment,e),p=!1},d(e){h(s,e),e&&$(n),h(o,e),e&&$(m),e&&$(r),h(a)}}}function B(i,s,n){let o,m;L(i,P,a=>n(2,m=a));let{data:r}=s;return i.$$set=a=>{"data"in a&&n(0,r=a.data)},i.$$.update=()=>{i.$$.dirty&4&&n(1,o=m.params.videoID)},[r,o,m]}class W extends I{constructor(s){super(),H(this,s,B,A,k,{data:0})}}export{W as default};