import{S as N,i as H,s as k,v as l,a as D,k as q,w as u,c as I,l as C,m as E,h as $,n as J,x as _,b as c,f as w,t as g,y as h,J as L}from"../../../../chunks/index-2288207f.js";import{p as P}from"../../../../chunks/stores-83358fdb.js";import{N as V}from"../../../../chunks/News-9ed2f5fd.js";import{H as j}from"../../../../chunks/Header-9cf8977c.js";import{S as y}from"../../../../chunks/Seo-aba2adc6.js";import"../../../../chunks/singletons-c0295a0c.js";import"../../../../chunks/Ads-15616d52.js";import"../../../../chunks/state-2107352d.js";import"../../../../chunks/db-06457d1e.js";import"../../../../chunks/Share-9deee359.js";function z(a){var d;let n,m,r,o,i,s,p;return n=new y({props:{discription:a[0].caption,poster:a[0].image,title:a[0].title}}),r=new j({props:{title:"Latest News",share:{path:`/news/${a[1]}`,title:(d=a[0])==null?void 0:d.title}}}),s=new V({props:{news:a[0]}}),{c(){l(n.$$.fragment),m=D(),l(r.$$.fragment),o=D(),i=q("div"),l(s.$$.fragment),this.h()},l(e){u(n.$$.fragment,e),m=I(e),u(r.$$.fragment,e),o=I(e),i=C(e,"DIV",{class:!0});var t=E(i);u(s.$$.fragment,t),t.forEach($),this.h()},h(){J(i,"class","pb-9 mt-1")},m(e,t){_(n,e,t),c(e,m,t),_(r,e,t),c(e,o,t),c(e,i,t),_(s,i,null),p=!0},p(e,[t]){var S;const f={};t&1&&(f.discription=e[0].caption),t&1&&(f.poster=e[0].image),t&1&&(f.title=e[0].title),n.$set(f);const b={};t&3&&(b.share={path:`/news/${e[1]}`,title:(S=e[0])==null?void 0:S.title}),r.$set(b);const v={};t&1&&(v.news=e[0]),s.$set(v)},i(e){p||(w(n.$$.fragment,e),w(r.$$.fragment,e),w(s.$$.fragment,e),p=!0)},o(e){g(n.$$.fragment,e),g(r.$$.fragment,e),g(s.$$.fragment,e),p=!1},d(e){h(n,e),e&&$(m),h(r,e),e&&$(o),e&&$(i),h(s)}}}function A(a,n,m){let r,o;L(a,P,s=>m(2,o=s));let{data:i}=n;return a.$$set=s=>{"data"in s&&m(0,i=s.data)},a.$$.update=()=>{a.$$.dirty&4&&m(1,r=o.params.newsID)},[i,r,o]}class W extends N{constructor(n){super(),H(this,n,A,z,k,{data:0})}}export{W as default};