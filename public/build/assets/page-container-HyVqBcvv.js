import{r,j as o,X as ot,A as ce,a as at}from"./app-BLqjA7mZ.js";import{O as de,C as le,a as rt,T as ue,D as pe,P as nt,R as it,b as ct,c as dt}from"./index-BOWu68so.js";import{C as fe}from"./react-icons.esm-DmxBueLj.js";import{c as me}from"./index-4k5zxHj6.js";import{c as T}from"./utils-rgEORciP.js";import{c as ve,u as O,a as J,P as lt,b as C}from"./index-CaS6mYJk.js";import{P,d as ut}from"./index-B_aThWFx.js";import{B as pt}from"./button-CZsnkR0p.js";import{D as ft,a as mt,b as vt,c as xt,d as oe,f as wt,e as ae}from"./dropdown-menu-CR3HhC3I.js";import{t as re,g as ne,u as gt}from"./getTimeStamp-BiOIucYJ.js";import{u as xe}from"./index-aKqAcbf4.js";import{c as ht}from"./index-Djw9-ARP.js";import{B as Tt,R as yt}from"./index-BUr3ooAS.js";import{u as Et}from"./index-C4xQWx_s.js";import{V as we}from"./index-D8M5jDuV.js";import{S as bt}from"./scroll-area-DiKmIhzG.js";const ws=it,gs=ct,Nt=nt,ge=r.forwardRef(({className:e,...t},s)=>o.jsx(de,{className:T("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",e),...t,ref:s}));ge.displayName=de.displayName;const Ct=me("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",{variants:{side:{top:"inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",bottom:"inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",left:"inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",right:"inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"}},defaultVariants:{side:"right"}}),Pt=r.forwardRef(({side:e="right",className:t,children:s,...a},n)=>o.jsxs(Nt,{children:[o.jsx(ge,{}),o.jsxs(le,{ref:n,className:T(Ct({side:e}),t),...a,children:[o.jsxs(rt,{className:"absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",children:[o.jsx(fe,{className:"h-4 w-4"}),o.jsx("span",{className:"sr-only",children:"Close"})]}),s]})]}));Pt.displayName=le.displayName;const Rt=r.forwardRef(({className:e,...t},s)=>o.jsx(ue,{ref:s,className:T("text-lg font-semibold text-foreground",e),...t}));Rt.displayName=ue.displayName;const jt=r.forwardRef(({className:e,...t},s)=>o.jsx(pe,{ref:s,className:T("text-sm text-muted-foreground",e),...t}));jt.displayName=pe.displayName;var Q="Avatar",[St,hs]=ve(Q),[At,he]=St(Q),Te=r.forwardRef((e,t)=>{const{__scopeAvatar:s,...a}=e,[n,c]=r.useState("idle");return o.jsx(At,{scope:s,imageLoadingStatus:n,onImageLoadingStatusChange:c,children:o.jsx(P.span,{...a,ref:t})})});Te.displayName=Q;var ye="AvatarImage",Ee=r.forwardRef((e,t)=>{const{__scopeAvatar:s,src:a,onLoadingStatusChange:n=()=>{},...c}=e,u=he(ye,s),p=It(a,c.referrerPolicy),f=O(i=>{n(i),u.onImageLoadingStatusChange(i)});return J(()=>{p!=="idle"&&f(p)},[p,f]),p==="loaded"?o.jsx(P.img,{...c,ref:t,src:a}):null});Ee.displayName=ye;var be="AvatarFallback",Ne=r.forwardRef((e,t)=>{const{__scopeAvatar:s,delayMs:a,...n}=e,c=he(be,s),[u,p]=r.useState(a===void 0);return r.useEffect(()=>{if(a!==void 0){const f=window.setTimeout(()=>p(!0),a);return()=>window.clearTimeout(f)}},[a]),u&&c.imageLoadingStatus!=="loaded"?o.jsx(P.span,{...n,ref:t}):null});Ne.displayName=be;function It(e,t){const[s,a]=r.useState("idle");return J(()=>{if(!e){a("error");return}let n=!0;const c=new window.Image,u=p=>()=>{n&&a(p)};return a("loading"),c.onload=u("loaded"),c.onerror=u("error"),c.src=e,t&&(c.referrerPolicy=t),()=>{n=!1}},[e,t]),s}var Ce=Te,Pe=Ee,Re=Ne;const je=r.forwardRef(({className:e,...t},s)=>o.jsx(Ce,{ref:s,className:T("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",e),...t}));je.displayName=Ce.displayName;const Se=r.forwardRef(({className:e,...t},s)=>o.jsx(Pe,{ref:s,className:T("aspect-square h-full w-full",e),...t}));Se.displayName=Pe.displayName;const Ae=r.forwardRef(({className:e,...t},s)=>o.jsx(Re,{ref:s,className:T("flex h-full w-full items-center justify-center rounded-full bg-muted",e),...t}));Ae.displayName=Re.displayName;function Dt(){ce.post(route("logout"),void 0,{onSuccess:()=>{re({title:"Logout berhasil",description:ne()})},onError:()=>{re({variant:"destructive",title:"Terjadi kesalahan saat proses logout",description:ne()})}})}function _t(){ce.get(route("profiles.index"))}const Ts=({...e})=>{var s,a,n,c,u,p,f,i,g;const{auth:t}=ot().props;return o.jsxs(ft,{className:e,children:[o.jsx(mt,{asChild:!0,children:o.jsx(pt,{variant:"ghost",className:"relative h-10 w-10 rounded-full",children:o.jsxs(je,{className:"h-10 w-10",children:[o.jsx(Se,{src:"https://github.com/shadcn.png",alt:((a=(s=t.user)==null?void 0:s.data)==null?void 0:a.name)??""}),o.jsx(Ae,{children:(u=(c=(n=t.user)==null?void 0:n.data)==null?void 0:c.name)==null?void 0:u[0]})]})})}),o.jsxs(vt,{className:"w-56",align:"end",forceMount:!0,children:[o.jsx(xt,{className:"font-normal",children:o.jsxs("div",{className:"flex flex-col space-y-1",children:[o.jsx("p",{className:"text-sm font-medium leading-none",children:(f=(p=t.user)==null?void 0:p.data)==null?void 0:f.name}),o.jsx("p",{className:"text-xs leading-none text-muted-foreground",children:(g=(i=t.user)==null?void 0:i.data)==null?void 0:g.email})]})}),o.jsx(oe,{}),o.jsx(wt,{children:o.jsx(ae,{onClick:_t,children:"Profile"})}),o.jsx(oe,{}),o.jsx(ae,{onClick:Dt,children:"Log out"})]})]})};var Z="ToastProvider",[ee,Ft,Lt]=ht("Toast"),[Ie,ys]=ve("Toast",[Lt]),[Mt,W]=Ie(Z),De=e=>{const{__scopeToast:t,label:s="Notification",duration:a=5e3,swipeDirection:n="right",swipeThreshold:c=50,children:u}=e,[p,f]=r.useState(null),[i,g]=r.useState(0),y=r.useRef(!1),F=r.useRef(!1);return s.trim()||console.error(`Invalid prop \`label\` supplied to \`${Z}\`. Expected non-empty \`string\`.`),o.jsx(ee.Provider,{scope:t,children:o.jsx(Mt,{scope:t,label:s,duration:a,swipeDirection:n,swipeThreshold:c,toastCount:i,viewport:p,onViewportChange:f,onToastAdd:r.useCallback(()=>g(j=>j+1),[]),onToastRemove:r.useCallback(()=>g(j=>j-1),[]),isFocusedToastEscapeKeyDownRef:y,isClosePausedRef:F,children:u})})};De.displayName=Z;var _e="ToastViewport",kt=["F8"],z="toast.viewportPause",q="toast.viewportResume",Fe=r.forwardRef((e,t)=>{const{__scopeToast:s,hotkey:a=kt,label:n="Notifications ({hotkey})",...c}=e,u=W(_e,s),p=Ft(s),f=r.useRef(null),i=r.useRef(null),g=r.useRef(null),y=r.useRef(null),F=xe(t,y,u.onViewportChange),j=a.join("+").replace(/Key/g,"").replace(/Digit/g,""),S=u.toastCount>0;r.useEffect(()=>{const l=E=>{var x;a.length!==0&&a.every(w=>E[w]||E.code===w)&&((x=y.current)==null||x.focus())};return document.addEventListener("keydown",l),()=>document.removeEventListener("keydown",l)},[a]),r.useEffect(()=>{const l=f.current,E=y.current;if(S&&l&&E){const v=()=>{if(!u.isClosePausedRef.current){const b=new CustomEvent(z);E.dispatchEvent(b),u.isClosePausedRef.current=!0}},x=()=>{if(u.isClosePausedRef.current){const b=new CustomEvent(q);E.dispatchEvent(b),u.isClosePausedRef.current=!1}},w=b=>{!l.contains(b.relatedTarget)&&x()},h=()=>{l.contains(document.activeElement)||x()};return l.addEventListener("focusin",v),l.addEventListener("focusout",w),l.addEventListener("pointermove",v),l.addEventListener("pointerleave",h),window.addEventListener("blur",v),window.addEventListener("focus",x),()=>{l.removeEventListener("focusin",v),l.removeEventListener("focusout",w),l.removeEventListener("pointermove",v),l.removeEventListener("pointerleave",h),window.removeEventListener("blur",v),window.removeEventListener("focus",x)}}},[S,u.isClosePausedRef]);const m=r.useCallback(({tabbingDirection:l})=>{const v=p().map(x=>{const w=x.ref.current,h=[w,...Gt(w)];return l==="forwards"?h:h.reverse()});return(l==="forwards"?v.reverse():v).flat()},[p]);return r.useEffect(()=>{const l=y.current;if(l){const E=v=>{var h,b,A;const x=v.altKey||v.ctrlKey||v.metaKey;if(v.key==="Tab"&&!x){const L=document.activeElement,D=v.shiftKey;if(v.target===l&&D){(h=i.current)==null||h.focus();return}const I=m({tabbingDirection:D?"backwards":"forwards"}),V=I.findIndex(d=>d===L);Y(I.slice(V+1))?v.preventDefault():D?(b=i.current)==null||b.focus():(A=g.current)==null||A.focus()}};return l.addEventListener("keydown",E),()=>l.removeEventListener("keydown",E)}},[p,m]),o.jsxs(Tt,{ref:f,role:"region","aria-label":n.replace("{hotkey}",j),tabIndex:-1,style:{pointerEvents:S?void 0:"none"},children:[S&&o.jsx(G,{ref:i,onFocusFromOutsideViewport:()=>{const l=m({tabbingDirection:"forwards"});Y(l)}}),o.jsx(ee.Slot,{scope:s,children:o.jsx(P.ol,{tabIndex:-1,...c,ref:F})}),S&&o.jsx(G,{ref:g,onFocusFromOutsideViewport:()=>{const l=m({tabbingDirection:"backwards"});Y(l)}})]})});Fe.displayName=_e;var Le="ToastFocusProxy",G=r.forwardRef((e,t)=>{const{__scopeToast:s,onFocusFromOutsideViewport:a,...n}=e,c=W(Le,s);return o.jsx(we,{"aria-hidden":!0,tabIndex:0,...n,ref:t,style:{position:"fixed"},onFocus:u=>{var i;const p=u.relatedTarget;!((i=c.viewport)!=null&&i.contains(p))&&a()}})});G.displayName=Le;var U="Toast",Ot="toast.swipeStart",Vt="toast.swipeMove",$t="toast.swipeCancel",Kt="toast.swipeEnd",Me=r.forwardRef((e,t)=>{const{forceMount:s,open:a,defaultOpen:n,onOpenChange:c,...u}=e,[p=!0,f]=Et({prop:a,defaultProp:n,onChange:c});return o.jsx(lt,{present:s||p,children:o.jsx(Ut,{open:p,...u,ref:t,onClose:()=>f(!1),onPause:O(e.onPause),onResume:O(e.onResume),onSwipeStart:C(e.onSwipeStart,i=>{i.currentTarget.setAttribute("data-swipe","start")}),onSwipeMove:C(e.onSwipeMove,i=>{const{x:g,y}=i.detail.delta;i.currentTarget.setAttribute("data-swipe","move"),i.currentTarget.style.setProperty("--radix-toast-swipe-move-x",`${g}px`),i.currentTarget.style.setProperty("--radix-toast-swipe-move-y",`${y}px`)}),onSwipeCancel:C(e.onSwipeCancel,i=>{i.currentTarget.setAttribute("data-swipe","cancel"),i.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"),i.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"),i.currentTarget.style.removeProperty("--radix-toast-swipe-end-x"),i.currentTarget.style.removeProperty("--radix-toast-swipe-end-y")}),onSwipeEnd:C(e.onSwipeEnd,i=>{const{x:g,y}=i.detail.delta;i.currentTarget.setAttribute("data-swipe","end"),i.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"),i.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"),i.currentTarget.style.setProperty("--radix-toast-swipe-end-x",`${g}px`),i.currentTarget.style.setProperty("--radix-toast-swipe-end-y",`${y}px`),f(!1)})})})});Me.displayName=U;var[Ht,Wt]=Ie(U,{onClose(){}}),Ut=r.forwardRef((e,t)=>{const{__scopeToast:s,type:a="foreground",duration:n,open:c,onClose:u,onEscapeKeyDown:p,onPause:f,onResume:i,onSwipeStart:g,onSwipeMove:y,onSwipeCancel:F,onSwipeEnd:j,...S}=e,m=W(U,s),[l,E]=r.useState(null),v=xe(t,d=>E(d)),x=r.useRef(null),w=r.useRef(null),h=n||m.duration,b=r.useRef(0),A=r.useRef(h),L=r.useRef(0),{onToastAdd:D,onToastRemove:B}=m,_=O(()=>{var N;(l==null?void 0:l.contains(document.activeElement))&&((N=m.viewport)==null||N.focus()),u()}),I=r.useCallback(d=>{!d||d===1/0||(window.clearTimeout(L.current),b.current=new Date().getTime(),L.current=window.setTimeout(_,d))},[_]);r.useEffect(()=>{const d=m.viewport;if(d){const N=()=>{I(A.current),i==null||i()},R=()=>{const M=new Date().getTime()-b.current;A.current=A.current-M,window.clearTimeout(L.current),f==null||f()};return d.addEventListener(z,R),d.addEventListener(q,N),()=>{d.removeEventListener(z,R),d.removeEventListener(q,N)}}},[m.viewport,h,f,i,I]),r.useEffect(()=>{c&&!m.isClosePausedRef.current&&I(h)},[c,h,m.isClosePausedRef,I]),r.useEffect(()=>(D(),()=>B()),[D,B]);const V=r.useMemo(()=>l?We(l):null,[l]);return m.viewport?o.jsxs(o.Fragment,{children:[V&&o.jsx(Bt,{__scopeToast:s,role:"status","aria-live":a==="foreground"?"assertive":"polite","aria-atomic":!0,children:V}),o.jsx(Ht,{scope:s,onClose:_,children:at.createPortal(o.jsx(ee.ItemSlot,{scope:s,children:o.jsx(yt,{asChild:!0,onEscapeKeyDown:C(p,()=>{m.isFocusedToastEscapeKeyDownRef.current||_(),m.isFocusedToastEscapeKeyDownRef.current=!1}),children:o.jsx(P.li,{role:"status","aria-live":"off","aria-atomic":!0,tabIndex:0,"data-state":c?"open":"closed","data-swipe-direction":m.swipeDirection,...S,ref:v,style:{userSelect:"none",touchAction:"none",...e.style},onKeyDown:C(e.onKeyDown,d=>{d.key==="Escape"&&(p==null||p(d.nativeEvent),d.nativeEvent.defaultPrevented||(m.isFocusedToastEscapeKeyDownRef.current=!0,_()))}),onPointerDown:C(e.onPointerDown,d=>{d.button===0&&(x.current={x:d.clientX,y:d.clientY})}),onPointerMove:C(e.onPointerMove,d=>{if(!x.current)return;const N=d.clientX-x.current.x,R=d.clientY-x.current.y,M=!!w.current,k=["left","right"].includes(m.swipeDirection),$=["left","up"].includes(m.swipeDirection)?Math.min:Math.max,tt=k?$(0,N):0,st=k?0:$(0,R),X=d.pointerType==="touch"?10:2,K={x:tt,y:st},se={originalEvent:d,delta:K};M?(w.current=K,H(Vt,y,se,{discrete:!1})):ie(K,m.swipeDirection,X)?(w.current=K,H(Ot,g,se,{discrete:!1}),d.target.setPointerCapture(d.pointerId)):(Math.abs(N)>X||Math.abs(R)>X)&&(x.current=null)}),onPointerUp:C(e.onPointerUp,d=>{const N=w.current,R=d.target;if(R.hasPointerCapture(d.pointerId)&&R.releasePointerCapture(d.pointerId),w.current=null,x.current=null,N){const M=d.currentTarget,k={originalEvent:d,delta:N};ie(N,m.swipeDirection,m.swipeThreshold)?H(Kt,j,k,{discrete:!0}):H($t,F,k,{discrete:!0}),M.addEventListener("click",$=>$.preventDefault(),{once:!0})}})})})}),m.viewport)})]}):null}),Bt=e=>{const{__scopeToast:t,children:s,...a}=e,n=W(U,t),[c,u]=r.useState(!1),[p,f]=r.useState(!1);return zt(()=>u(!0)),r.useEffect(()=>{const i=window.setTimeout(()=>f(!0),1e3);return()=>window.clearTimeout(i)},[]),p?null:o.jsx(dt,{asChild:!0,children:o.jsx(we,{...a,children:c&&o.jsxs(o.Fragment,{children:[n.label," ",s]})})})},Xt="ToastTitle",ke=r.forwardRef((e,t)=>{const{__scopeToast:s,...a}=e;return o.jsx(P.div,{...a,ref:t})});ke.displayName=Xt;var Yt="ToastDescription",Oe=r.forwardRef((e,t)=>{const{__scopeToast:s,...a}=e;return o.jsx(P.div,{...a,ref:t})});Oe.displayName=Yt;var Ve="ToastAction",$e=r.forwardRef((e,t)=>{const{altText:s,...a}=e;return s.trim()?o.jsx(He,{altText:s,asChild:!0,children:o.jsx(te,{...a,ref:t})}):(console.error(`Invalid prop \`altText\` supplied to \`${Ve}\`. Expected non-empty \`string\`.`),null)});$e.displayName=Ve;var Ke="ToastClose",te=r.forwardRef((e,t)=>{const{__scopeToast:s,...a}=e,n=Wt(Ke,s);return o.jsx(He,{asChild:!0,children:o.jsx(P.button,{type:"button",...a,ref:t,onClick:C(e.onClick,n.onClose)})})});te.displayName=Ke;var He=r.forwardRef((e,t)=>{const{__scopeToast:s,altText:a,...n}=e;return o.jsx(P.div,{"data-radix-toast-announce-exclude":"","data-radix-toast-announce-alt":a||void 0,...n,ref:t})});function We(e){const t=[];return Array.from(e.childNodes).forEach(a=>{if(a.nodeType===a.TEXT_NODE&&a.textContent&&t.push(a.textContent),qt(a)){const n=a.ariaHidden||a.hidden||a.style.display==="none",c=a.dataset.radixToastAnnounceExclude==="";if(!n)if(c){const u=a.dataset.radixToastAnnounceAlt;u&&t.push(u)}else t.push(...We(a))}}),t}function H(e,t,s,{discrete:a}){const n=s.originalEvent.currentTarget,c=new CustomEvent(e,{bubbles:!0,cancelable:!0,detail:s});t&&n.addEventListener(e,t,{once:!0}),a?ut(n,c):n.dispatchEvent(c)}var ie=(e,t,s=0)=>{const a=Math.abs(e.x),n=Math.abs(e.y),c=a>n;return t==="left"||t==="right"?c&&a>s:!c&&n>s};function zt(e=()=>{}){const t=O(e);J(()=>{let s=0,a=0;return s=window.requestAnimationFrame(()=>a=window.requestAnimationFrame(t)),()=>{window.cancelAnimationFrame(s),window.cancelAnimationFrame(a)}},[t])}function qt(e){return e.nodeType===e.ELEMENT_NODE}function Gt(e){const t=[],s=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:a=>{const n=a.tagName==="INPUT"&&a.type==="hidden";return a.disabled||a.hidden||n?NodeFilter.FILTER_SKIP:a.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});for(;s.nextNode();)t.push(s.currentNode);return t}function Y(e){const t=document.activeElement;return e.some(s=>s===t?!0:(s.focus(),document.activeElement!==t))}var Jt=De,Ue=Fe,Be=Me,Xe=ke,Ye=Oe,ze=$e,qe=te;const Qt=Jt,Ge=r.forwardRef(({className:e,...t},s)=>o.jsx(Ue,{ref:s,className:T("fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",e),...t}));Ge.displayName=Ue.displayName;const Zt=me("group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",{variants:{variant:{default:"border bg-background text-foreground",destructive:"destructive group border-destructive bg-destructive text-destructive-foreground"}},defaultVariants:{variant:"default"}}),Je=r.forwardRef(({className:e,variant:t,...s},a)=>o.jsx(Be,{ref:a,className:T(Zt({variant:t}),e),...s}));Je.displayName=Be.displayName;const es=r.forwardRef(({className:e,...t},s)=>o.jsx(ze,{ref:s,className:T("inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",e),...t}));es.displayName=ze.displayName;const Qe=r.forwardRef(({className:e,...t},s)=>o.jsx(qe,{ref:s,className:T("absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",e),"toast-close":"",...t,children:o.jsx(fe,{className:"h-4 w-4"})}));Qe.displayName=qe.displayName;const Ze=r.forwardRef(({className:e,...t},s)=>o.jsx(Xe,{ref:s,className:T("text-sm font-semibold [&+div]:text-xs",e),...t}));Ze.displayName=Xe.displayName;const et=r.forwardRef(({className:e,...t},s)=>o.jsx(Ye,{ref:s,className:T("text-sm opacity-90",e),...t}));et.displayName=Ye.displayName;function Es(){const{toasts:e}=gt();return o.jsxs(Qt,{children:[e.map(function({id:t,title:s,description:a,action:n,...c}){return o.jsxs(Je,{...c,children:[o.jsxs("div",{className:"grid gap-1",children:[s&&o.jsx(Ze,{children:s}),a&&o.jsx(et,{children:a})]}),n,o.jsx(Qe,{})]},t)}),o.jsx(Ge,{})]})}const bs=({children:e,scrollable:t=!1})=>{const s=o.jsx("div",{className:"space-y-4 lg:space-y-8",children:e});return o.jsx(o.Fragment,{children:t?o.jsx(bt,{className:"h-[calc(100dvh-52px)]",children:o.jsx("div",{className:"h-full p-4 md:px-8",children:s})}):o.jsx("div",{className:"h-full p-4 md:px-8",children:s})})};export{bs as P,ws as S,Es as T,Ts as U,gs as a,Pt as b};