(self.webpackChunkneo_mjs_realworld_example_app=self.webpackChunkneo_mjs_realworld_example_app||[]).push([[88,734],{898:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>r});var l=s(643),n=s(627),i=s(706);class o extends l.Z{static getConfig(){return{className:"Neo.main.addon.HighlightJS",highlightJsPath:"./resources/highlight/highlight.pack.js",highlightJsLineNumbersPath:Neo.config.basePath+"node_modules/highlightjs-line-numbers.js/dist/highlightjs-line-numbers.min.js",remote:{app:["scrollIntoView","syntaxHighlight","syntaxHighlightInit","syntaxHighlightLine"]},singleton:!0,themePath:"./resources/highlightjs-custom-github-theme.css"}}constructor(e){super(e);let t=this;n.Z.loadScript(t.highlightJsPath).then((()=>{n.Z.addScript({src:t.highlightJsLineNumbersPath})})),i.default.createStyleSheet(null,"hljs-theme",t.themePath)}scrollIntoView(e){let t=n.Z.getElement(e.vnodeId).querySelector('[data-list-header="'+e.text+'"]');t&&t.previousSibling.scrollIntoView({behavior:"smooth",block:"start",inline:"nearest"})}syntaxHighlight(e){if(hljs){let t=document.getElementById(e.vnodeId);hljs.highlightBlock(t),hljs.lineNumbersBlock(t)}else console.error("highlight.js is not included inside the main thread.")}syntaxHighlightInit(e){if(hljs){let e=document.querySelectorAll("pre code:not(.hljs)");Array.prototype.forEach.call(e,hljs.highlightBlock)}else console.error("highlight.js is not included inside the main thread.")}syntaxHighlightLine(e){let t,s=document.getElementById(e.vnodeId),l="neo-highlighted-line";Neo.isNumber(e.addLine)&&(t=s.querySelector('[data-line-number="'+e.addLine+'"]'),t&&(t.parentNode.classList.add(l),t.parentNode.scrollIntoView({behavior:"smooth",block:"start",inline:"nearest"}))),Neo.isNumber(e.removeLine)&&(t=s.querySelector('[data-line-number="'+e.removeLine+'"]'),t&&t.parentNode.classList.remove(l))}}Neo.applyClassConfig(o);let h=Neo.create(o);Neo.applyToGlobalNs(h);const r=h},706:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>o});var l=s(643);class n extends l.Z{static getConfig(){return{className:"Neo.main.addon.Stylesheet",remote:{app:["addThemeFiles","createStyleSheet","insertCssRules","swapStyleSheet"]},singleton:!0}}constructor(e){super(e),Neo.config.useFontAwesome&&this.createStyleSheet(null,null,Neo.config.basePath+"node_modules/@fortawesome/fontawesome-free/css/all.min.css"),Neo.config.themes.length>0&&""!==Neo.config.themes[0]&&this.addGlobalCss()}addGlobalCss(){let e=Neo.config,t=e.themes,s=e.useCssVars?["src",...t]:[t[0]],l=e.environment,n=l.startsWith("dist/")?l:"dist/"+l;document.body.classList.add(t[0]),s.forEach((t=>{t.startsWith("neo-")&&(t=t.substring(4)),this.createStyleSheet(null,null,`${e.basePath}${n}/css${e.useCssVars?"":"-no-vars"}/${t}/Global.css`)}))}addThemeFiles(e){let t=e.className,s=Neo.config,l=s.environment,n=l.startsWith("dist/")?l:"dist/"+l;t.startsWith("Neo.")&&(t=t.substring(4)),t=t.split(".").join("/"),e.folders.forEach((e=>{("src"===e&&s.useCssVars||e.includes("theme-")&&(s.useCssVars&&s.themes.includes(`neo-${e}`)||!s.useCssVars&&s.themes[0]===`neo-${e}`))&&this.createStyleSheet(null,null,`${s.basePath}${n}/css${s.useCssVars?"":"-no-vars"}/${e}/${t}.css`)}))}createStyleSheet(e,t,s){if(!e&&!s)throw new Error("createStyleSheet: you need to either pass a name or a href");const l=document.createElement("link"),n=Neo.config.environment,i=n.startsWith("dist/")?n:"dist/"+n,o=s||Neo.config.basePath+i+"/"+e;Object.assign(l,{href:o,rel:"stylesheet",type:"text/css"}),t&&(l.id=t),document.head.appendChild(l)}hasStyleSheet(e){let t,s=0,l=document.styleSheets.length;for(;s<l;s++)if(t=document.styleSheets[s],t.href&&t.href.includes(e))return!0;return!1}insertCssRules(e){let t,s=document.getElementById("neoDynamicStyleSheet"),l=0,n=e.rules.length;for(s||(s=document.createElement("style"),s.id="neoDynamicStyleSheet",document.head.appendChild(s)),t=s.sheet;l<n;l++)t.insertRule(e.rules[l],t.cssRules.length)}removeStyleSheets(e){let t,s,l=0,n=document.styleSheets.length,i=e.included||[],o=e.included||[];for(;l<n;l++)t=document.styleSheets[l],s=!0,t.href&&(o.forEach((e=>{t.href.includes(e)&&(s=!1)})),s&&(i.forEach((e=>{t.href.includes(e)||(s=!1)})),s&&t.ownerNode.parentNode.removeChild(t.ownerNode)))}swapStyleSheet(e){document.getElementById(e.id).setAttribute("href",e.href)}}Neo.applyClassConfig(n);let i=Neo.create(n);Neo.applyToGlobalNs(i);const o=i}}]);