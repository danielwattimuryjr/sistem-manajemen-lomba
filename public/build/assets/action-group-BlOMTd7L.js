import{j as i,x as p,A as o}from"./app-BLqjA7mZ.js";import{t as n,g as l}from"./getTimeStamp-BiOIucYJ.js";import{T as m,a as e,b as r,c as a}from"./tooltip-Dw5Dabwf.js";import{B as u,b as h}from"./button-CZsnkR0p.js";import{I as s}from"./icon-DZ5H1KtA.js";import{B as x}from"./button-dialog-clqY00NY.js";import"./index-CaS6mYJk.js";import"./index-aKqAcbf4.js";import"./index-BUr3ooAS.js";import"./index-B_aThWFx.js";import"./index-C4xQWx_s.js";import"./index-DLMKl4d5.js";import"./index-D8M5jDuV.js";import"./utils-rgEORciP.js";import"./index-4k5zxHj6.js";import"./createReactComponent-Djspt5ka.js";import"./IconX-BDawAkG1.js";import"./IconPlus-BR_mStXO.js";import"./IconSlash-CQ_UzLeS.js";import"./alert-dialog-D8daV4p3.js";import"./index-BOWu68so.js";function y({competition:t}){const d=()=>{o.patch(route("dashboard.superadmin.competitions.update-status",t),{isActive:!t.isActive},{preserveScroll:!0,onSuccess:()=>{n({title:"Status perlombaan berhasil diperbaharui",description:l()})}})},c=()=>{o.delete(route("dashboard.superadmin.competitions.destroy",t),{preserveScroll:!0,onSuccess:()=>{n({title:"Perlombaan berhasil dihapus",description:l()})}})};return i.jsx("div",{className:"grid grid-cols-3 gap-2",children:i.jsxs(m,{children:[i.jsxs(e,{children:[i.jsx(r,{children:i.jsx(u,{disabled:t.hasFinalScores,size:"icon",variant:t.isActive?"destructive":"default",onClick:d,children:t.isActive?i.jsx(s,{icon:"IconX"}):i.jsx(s,{icon:"IconCheck"})})}),i.jsx(a,{align:"center",sideOffset:8,children:t.isActive?"Non Aktifkan Perlombaan":"Aktifkan Perlombaan"})]}),i.jsxs(e,{children:[i.jsx(r,{children:i.jsx(p,{href:route("dashboard.superadmin.competitions.edit",t),className:h({variant:"outline",size:"icon"}),children:i.jsx(s,{icon:"IconEdit"})})}),i.jsx(a,{align:"center",sideOffset:8,children:"Edit Perlombaan"})]}),i.jsxs(e,{children:[i.jsx(r,{children:i.jsx(x,{triggerButtonVariant:"destructive",dialogDescription:"Keputusan ini tidak dapat di batalkan. Data perlombaan akan dihapus.",triggerIcon:"IconTrash",dialogTitle:"Apa Kamu Yakin?",dialogActionButtonOnClick:c})}),i.jsx(a,{align:"center",sideOffset:8,children:"Hapus Perlombaan"})]})]})})}export{y as default};