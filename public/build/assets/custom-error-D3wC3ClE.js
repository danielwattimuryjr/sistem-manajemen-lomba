import{j as e,S as s,x as n}from"./app-BLqjA7mZ.js";const o=r=>{switch(r){case 403:return"You do not have permission to access this page.";case 404:return"Page not found.";case 500:return"Internal server error.";default:return"An unexpected error occurred."}};function i({code:r,message:t}){return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:`${r}`}),e.jsx("div",{className:"flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8",children:e.jsxs("div",{className:"mx-auto max-w-md text-center",children:[e.jsx("div",{className:"mx-auto h-12 w-12 text-primary"}),e.jsx("h1",{className:"mt-4 text-6xl font-bold tracking-tight text-foreground sm:text-7xl",children:r}),e.jsx("p",{className:"mt-4 text-lg text-muted-foreground",children:t??o(r)}),e.jsx("div",{className:"mt-6",children:e.jsx(n,{href:route("welcome"),className:"inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",prefetch:!1,children:"Go to Homepage"})})]})})]})}export{i as default};