import{j as r}from"./app-BLqjA7mZ.js";import{B as o}from"./breadcrumbs-DpudZ9ye.js";import{H as a}from"./heading-DfaU3GY0.js";import"./react-icons.esm-DmxBueLj.js";import"./index-aKqAcbf4.js";import"./utils-rgEORciP.js";import"./IconSlash-CQ_UzLeS.js";import"./createReactComponent-Djspt5ka.js";function b({competition:t}){const e=[{title:"Dashboard",link:route("dashboard.home")},{title:"Perlombaan",link:route("dashboard.superadmin.competitions.index")},{title:t.name,link:route("dashboard.superadmin.competitions.show",t.slug)},{title:"Form Penilaian"}];return r.jsxs(r.Fragment,{children:[r.jsx(o,{items:e}),r.jsx(a,{title:t.name})]})}export{b as default};