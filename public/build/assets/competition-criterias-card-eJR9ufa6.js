import{j as e}from"./app-BLqjA7mZ.js";import{C as d,a as c,c as i}from"./card-CmF8J8cP.js";import{T as x,a as o,b as l,c as n,d as h,e as a,f as j}from"./table-Bz7reh4z.js";import"./utils-rgEORciP.js";const C=({criterias:t})=>e.jsxs(d,{children:[e.jsx(c,{children:"Faktor Penilaian"}),e.jsx(i,{children:e.jsxs(x,{children:[e.jsx(o,{children:e.jsxs(l,{children:[e.jsx(n,{className:"w-[50px] text-center",children:"#"}),e.jsx(n,{children:"Nama Faktor"}),e.jsx(n,{children:"Bobot (%)"})]})}),e.jsx(h,{children:t.length>0?e.jsx(e.Fragment,{children:t.map((s,r)=>e.jsxs(l,{children:[e.jsx(a,{className:"text-center",children:r+1}),e.jsx(a,{children:s.name}),e.jsx(a,{children:s.weight})]},r))}):e.jsx(l,{children:e.jsx(a,{colSpan:3,className:"animate-pulse py-5 text-center text-base font-semibold text-destructive",children:"Data Tidak Ada"})})}),e.jsx(j,{children:e.jsxs(l,{children:[e.jsx(a,{colSpan:2,children:"Total Bobot (%)"}),e.jsx(a,{children:t.reduce((s,r)=>s+r.weight,0)})]})})]})})]});export{C as default};