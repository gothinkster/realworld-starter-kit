!function(e){var t={};function r(o){if(t[o])return t[o].exports;var n=t[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=t,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(o,n,function(t){return e[t]}.bind(null,n));return o},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";r.r(t);const o=self.Neo||{};o.config=o.config||{};const n={applyBodyCls:!0,appPath:null,basePath:"./",cssPath:null,environment:"production",gtagId:"UA-153734404-1",isExperimental:!1,isGitHubPages:!1,isInsideSiesta:!1,locale:"default",mainThreadAddons:["Stylesheet"],themes:["neo-theme-light","neo-theme-dark"],unitTestMode:!1,useCss4:!0,useFontAwesome:!0,useGoogleAnalytics:!1,useSharedWorkers:!1,useTouchEvents:!0};Object.assign(n,{resourcesPath:(o.config.basePath||n.basePath)+"resources/",workerBasePath:(o.config.basePath||n.basePath)+"src/worker/"});const i=Symbol.for("configSymbol"),s=Symbol("getSetCache");let a=self.Neo||{};a=self.Neo=Object.assign({ntypeMap:{},insideWorker:"undefined"!=typeof DedicatedWorkerGlobalScope||"undefined"!=typeof WorkerGlobalScope,applyClassConfig(e){let t,r=null,o=null,n={},l=e.prototype||e,u=[],h={};for(;l.__proto__;){if(t=l.constructor,t.hasOwnProperty("classConfigApplied")){r=a.clone(t.config,!0),o=a.clone(t.staticConfig,!0);break}u.unshift(l),l=l.__proto__}n=r||n,h=o||h,u.forEach(r=>{t=r.constructor;let o,l=t.getConfig&&t.getConfig()||{},u=t.getStaticConfig&&t.getStaticConfig()||{};l&&Object.entries(l).forEach(([e,t])=>{"_"===e.slice(-1)?(delete l[e],e=e.slice(0,-1),l[e]=t,function(e,t){if(c(e,t))throw"Config "+t+"_ ("+e.className+") already has a set method, use beforeGet, beforeSet & afterSet instead";a[s]||(a[s]={});a[s][t]||(a[s][t]={get(){let e=this,r="beforeGet"+a.capitalize(t),o=e[i].hasOwnProperty(t),n=e[i][t],s=o?n:e["_"+t];return Array.isArray(s)?"items"!==t&&(s=[...s]):s instanceof Date&&(s=new Date(s.valueOf())),o&&(e[t]=s,s=e["_"+t]),"function"==typeof e[r]&&(s=e[r](s)),s},set(e){let r=this,o="_"+t,n=a.capitalize(t),s="beforeSet"+n,l="afterSet"+n,d=r[o];if(delete r[i][t],"items"!==t&&(e=a.clone(e,!0,!0)),r[o]=e,"function"==typeof r[s]){if(void 0===(e=r[s](e,d)))return void(r[o]=d);r[o]=e}(function(e,t){if(Array.isArray(e))return!0;if(a.isObject(e))return!(t instanceof Date&&e instanceof Date)||t.valueOf()!==e.valueOf();return t!==e})(e,d)&&"function"==typeof r[l]&&r[l](e,d)}});Object.defineProperty(e,t,a[s][t])}(r,e)):c(r,e)||Object.defineProperty(r,e,{enumerable:!0,value:t,writable:!0})}),Object.assign(t,u),l.hasOwnProperty("ntype")&&(a.ntypeMap[l.ntype]=l.className),o=n.hasOwnProperty("mixins")&&n.mixins||[],u&&u.observable&&o.push("Neo.core.Observable"),l.hasOwnProperty("mixins")&&Array.isArray(l.mixins)&&l.mixins.length>0&&o.push(...l.mixins),o.length&&function(e,t){Array.isArray(t)||(t=[t]);let r,o,n,i=0,s=t.length,l={};for(;i<s;i++){if(r=t[i],r.isClass)n=r.prototype,o=a.ns(n.className);else{if(!d(r))throw new Error("Attempting to mixin an undefined class: "+r+", "+e.prototype.className);o=a.ns(r),n=o.prototype}n.className.split(".").reduce(f(o),l),Object.getOwnPropertyNames(n).forEach(p(e.prototype,n))}e.prototype.mixins=l}(t,o),delete l.mixins,delete n.mixins,Object.assign(n,l),Object.assign(h,u),Object.assign(t,{classConfigApplied:!0,config:a.clone(n,!0),isClass:!0,staticConfig:a.clone(h,!0)}),delete t.getConfig,delete t.getStaticConfig,n.singleton||this.applyToGlobalNs(e)})},applyFromNs(e,t,r,o){let n;return e&&r&&"object"==typeof r&&Object.entries(r).forEach(([r,i])=>{n=t[i],e[r]=o?n.bind(t):n}),e},applyToGlobalNs(e){let t,r,o,n,i="function"==typeof e?e.prototype:e;!0===i.constructor.registerToGlobalNs&&(t=i.isClass?i.config.className:i.className,r=t.split("."),o=r.pop(),n=a.ns(r,!0),n[o]=e)},assignDefaults:(e,t)=>(e&&t&&"object"==typeof t&&Object.entries(t).forEach(([t,r])=>{e.hasOwnProperty(t)||(e[t]=r)}),e),clone(e,t=!1,r=!1){let o;if(Array.isArray(e))return t?[...e.map(e=>a.clone(e,t,r))]:[...e];if(null!==e&&"object"==typeof e){if(e.constructor.isClass&&e instanceof a.core.Base)return r?e:this.cloneNeoInstance(e);if(e.constructor.isClass)return e;if(e instanceof Date)e=new Date(e.valueOf());else{if(!(e instanceof Map))return o={},Object.entries(e).forEach(([e,n])=>{o[e]=t?a.clone(n,t,r):n}),o;e=new Map(e)}}return e},cloneNeoInstance(e){let t={...e.originalConfig};return delete t._id,delete t.id,a.create(e.className,t)},create(e,t){let r,o;if("function"==typeof e&&void 0!==e.constructor)r=e;else{if("object"==typeof e){if(!(t=e).className&&!t.module)return console.error("Class created with object configuration missing className or module property",t),null;e=t.className?t.className:t.module.prototype.className}if(!d(e))throw new Error("Class "+e+" does not exist");r=a.ns(e)}return o=new r(t),o.onConstructed(),o.init(),o},emptyFn(){},ns:(e,t,r)=>(e=Array.isArray(e)?e:e.split(".")).reduce((e,r)=>{if(t&&!e[r]&&(e[r]={}),e)return e[r]},r||self),ntype(e,t){if("object"==typeof e){if(!(t=e).ntype)throw new Error("Class defined with object configuration missing ntype property. "+t.ntype);e=t.ntype}let r=a.ntypeMap[e];if(!r)throw new Error("ntype "+e+" does not exist");return a.create(r,t)}},a);const l=["_name","classConfigApplied","className","constructor","isClass","mixin","ntype","observable","registerToGlobalNs"];function d(e){try{return!!e.split(".").reduce((e,t)=>e[t],self)}catch(e){return!1}}function c(e,t){let r;for(;e.__proto__;){if(r=Object.getOwnPropertyDescriptor(e,t),"object"==typeof r&&"function"==typeof r.set)return!0;e=e.__proto__}return!1}function p(e,t){return function(r){if(!~l.indexOf(r)){if(e[r]&&e[r]._from){if(t.className===e[r]._from)return void console.warn("Mixin set multiple times or already defined on a Base Class",e.className,t.className,r);throw new Error(e.className+": Multiple mixins defining same property ("+t.className+", "+e[r]._from+") => "+r)}e[r]=t[r],Object.getOwnPropertyDescriptor(e,r)._from=t.className,"function"==typeof e[r]&&(e[r]._name=r)}}}function f(e){return(t,r,o,n)=>t[r]=o!==n.length-1?t[r]||{}:e}a.config=a.config||{},a.assignDefaults(a.config,n);class u{static getStaticConfig(){return{registerToGlobalNs:!0}}static getConfig(){return{className:"Neo.core.IdGenerator",ntype:"id-generator",base:"neo-",singleton:!0}}constructor(e){this.idCounter={},Neo.getId=this.getId.bind(this)}onConstructed(){}init(){}getId(e){e=e||"neo";let t=this.idCounter,r=t[e]||0;return t[e]=++r,this.base+("neo"===e?"":e+"-")+r}}Neo.applyClassConfig(u);let h=Neo.create(u);Neo.applyToGlobalNs(h);var g=h;const m=Symbol.for("configSymbol"),N=Symbol("isInstance");class y{static getStaticConfig(){return{registerToGlobalNs:!0}}static getConfig(){return{className:"Neo.core.Base",ntype:"base",mixins:null}}constructor(e){e=e||{};let t=this;Object.defineProperties(t,{[m]:{configurable:!0,enumerable:!1,value:{},writable:!0},[N]:{enumerable:!1,value:!0}}),t.createId(e.id||t.id),delete e.id,t.constructor.config&&delete t.constructor.config.id,(t.getStaticConfig("observable")||t.mixins&&Neo.ns("Neo.core.Observable",t.mixins))&&t.initObservable(e),t.initConfig(e),t.controller&&t.controller.parseConfig(),Object.defineProperty(t,"configsApplied",{enumerable:!1,value:!0}),t.remote&&setTimeout(t.initRemote.bind(t),1)}onConstructed(){}init(){}beforeSetEnumValue(e,t,r,o=r+"s"){const n=Array.isArray(o)?o:this.getStaticConfig(o);return n.includes(e)?e:(Neo.logError("Supported values for "+r+" are:",n.join(", "),this),t)}createId(e){let t=this;t.id=e||g.getId(t.getIdKey()),!0===y.instanceManagerAvailable?Neo.manager.Instance.register(t):(Neo.idMap||(Neo.idMap={}),Neo.idMap[t.id]=t)}destroy(){let e=this;!0===y.instanceManagerAvailable?Neo.manager.Instance.unregister(e):Neo.idMap&&delete Neo.idMap[e.id],Object.keys(e).forEach(t=>{Object.getOwnPropertyDescriptor(e,t).writable&&delete e[t]})}getIdKey(){return this.ntype}getStaticConfig(e){let t=this.constructor.staticConfig;return e?t[e]:t}initConfig(e,t){Object.assign(this[m],this.mergeConfig(e,t)),this.processConfigs()}initRemote(){let e,t=this.remote,r=this.className,o=Neo.currentWorker;if(!this.singleton)throw new Error("Remote method access only functional for Singleton classes "+r);!Neo.config.unitTestMode&&Neo.isObject(t)&&("main"!==Neo.workerId&&o.isSharedWorker&&!o.isConnected?e=o.on("connected",()=>{o.un("connected",e),y.sendRemotes(r,t)}):y.sendRemotes(r,t))}mergeConfig(e,t){let r=this,o=r.constructor;if(!o.config)throw new Error("Neo.applyClassConfig has not been run on "+r.className);return t||(r.originalConfig=Neo.clone(e,!0,!0)),{...o.config,...e}}processConfigs(e=!1){let t=this,r=Object.keys(t[m]);r.length>0&&(!e&&t.hasOwnProperty(r[0])||(t[r[0]]=t[m][r[0]]),delete t[m][r[0]],t.processConfigs(e))}static sendRemotes(e,t){let r;Object.entries(t).forEach(([t,o])=>{Neo.workerId!==t&&(r="main"===Neo.workerId?Neo.worker.Manager:Neo.currentWorker,r.sendMessage(t,{action:"registerRemote",methods:o,className:e}))})}set(e={}){let t=this;Object.keys(t[m]).forEach(e=>{delete t[m][e]}),Object.assign(t[m],e),t.processConfigs(!0)}setStaticConfig(e,t){let r=this.constructor.staticConfig;return!!r.hasOwnProperty(e)&&(r[e]=t,!0)}get[Symbol.toStringTag](){return`${this.className} (id: ${this.id})`}static[Symbol.hasInstance](e){return!!e&&(!0===e[N]&&super[Symbol.hasInstance](e))}}Neo.applyClassConfig(y),y.instanceManagerAvailable=!1;class b extends y{static getConfig(){return{className:"Neo.core.Observable",ntype:"mixin-observable",mixin:!0}}initObservable(e){let t,r=this,o=r.__proto__;for(e.listeners&&(r.listeners=e.listeners,delete e.listeners),t=r.listeners,r.listeners={},t&&(Neo.isObject(t)&&(t={...t}),r.addListener(t));o&&o.constructor.isClass;)o.constructor.staticConfig.observable&&!o.constructor.listeners&&Object.assign(o.constructor,{addListener:r.addListener,fire:r.fire,listeners:{},on:r.on,removeListener:r.removeListener,un:r.un}),o=o.__proto__}addListener(e,t,r,o,n,i){let s,a,l,d=this;if("object"==typeof e)e.hasOwnProperty("scope")&&(r=e.scope,delete e.scope),Object.entries(e).forEach(([e,t])=>{d.addListener(e,t,r)});else if("object"==typeof t)r=r||t.scope,s=t.fn,i=i||t.order,o=o||t.eventId;else if("function"==typeof t)s=t;else{if("string"!=typeof t)throw new Error("Invalid addListener call: "+e);s=t}return l={fn:s,scope:r,data:n,id:o||Neo.getId("event")},(a=d.listeners&&d.listeners[e])?(a.forEach(t=>{if(t.id===o||t.fn===s&&t.scope===r)throw new Error("Duplicate event handler attached: "+e)}),"number"==typeof i?a.splice(i,0,l):"before"===i?a.unshift(l):a.push(l)):d.listeners[e]=[l],l.id}fire(e){let t,r,o,n,i=this,s=[].slice.call(arguments,1),a=i.listeners;if(a&&a[e])for(r=[...a[e]],n=r.length,o=0;o<n;o++)t=r[o],t.fn.apply(t.scope||i,t.data?s.concat(t.data):s)}removeListener(e,t){if(Neo.isString(t)){let r=this.listeners[e],o=!1;r.forEach((e,r)=>{if(e.id===t)return o=r}),!1!==o&&r.splice(o,1)}}on(...e){return this.addListener(...e)}un(...e){this.removeListener(...e)}}Neo.applyClassConfig(b);class C{constructor(e){e.destination=e.destination||"main",e.id=e.id||g.getId(Neo.workerId),e.origin=e.origin||Neo.workerId,Object.assign(this,e)}}Neo.ns("Neo.worker",!0).Message=C;class v extends y{static getConfig(){return{className:"Neo.worker.mixin.RemoteMethodAccess",ntype:"mixin-remote-method-access",mixin:!0}}generateRemote(e,t){let r=this,o=e.origin;return function(n,i){let s={action:"remoteMethod",data:n,destination:o,remoteClassName:e.className,remoteMethod:t};return r.isSharedWorker&&(s.appName=s.appName||n&&n.appName,s.port=s.port||n&&n.port),r.promiseMessage(o,s,i)}}onRegisterRemote(e){if(e.destination===Neo.workerId){let t=this,r=e.className,o=!1,n=e.methods,i=Neo.ns(r,!0);n.forEach((function(n){if("main"!==e.origin&&i[n])throw new Error("Duplicate remote method definition "+r+"."+n);i[n]?o=!0:i[n]=t.generateRemote(e,n)})),o||"main"===Neo.workerId||t.fire("remoteregistered",e)}}onRemoteMethod(e){let t,r,o=this,n=Neo.ns(e.remoteClassName);if(!n)throw new Error('Invalid remote namespace "'+e.remoteClassName+'"');if(r=n[e.remoteMethod],!r)throw new Error('Invalid remote method name "'+e.remoteMethod+'"');t=Array.isArray(e.data)?r.call(n,...e.data):r.call(n,e.data),t instanceof Promise?t.then(t=>{o.resolve(e,t)}).catch(t=>{o.reject(e,t)}):o.resolve(e,t)}reject(e,t){let r={action:"reply",data:t,reject:!0,replyId:e.id};this.isSharedWorker&&(r.appName=e.appName,r.port=e.port),this.sendMessage(e.origin,r)}resolve(e,t){let r={action:"reply",data:t,replyId:e.id};this.isSharedWorker&&(r.appName=e.appName,r.port=e.port),this.sendMessage(e.origin,r)}}Neo.applyClassConfig(v);class w extends y{static getConfig(){return{className:"Neo.worker.Base",ntype:"worker",isConnected:!1,isSharedWorker:!1,mixins:[b,v],ports:null,workerId:null}}constructor(e={}){super(e);let t=this;Object.assign(t,{isSharedWorker:"[object SharedWorkerGlobalScope]"===self.toString(),ports:[],promises:{}}),t.isSharedWorker?self.onconnect=t.onConnected.bind(t):self.onmessage=t.onMessage.bind(t),Neo.workerId=t.workerId,Neo.currentWorker=t}getPort(e){let t,r=null;return this.ports.forEach(o=>{t=!0,Object.entries(e).forEach(([e,r])=>{r!==o[e]&&(t=!1)}),t&&(r=o)}),r}onConstructed(){super.onConstructed(),this.isSharedWorker||this.sendMessage("main",{action:"workerConstructed"})}onConnected(e){let t=this,r=Neo.getId("port");t.isConnected=!0,t.ports.push({appName:null,id:r,port:e.ports[0]}),t.ports[t.ports.length-1].port.onmessage=t.onMessage.bind(t),t.fire("connected"),setTimeout(()=>{t.sendMessage("main",{action:"workerConstructed",port:r})},100)}onDisconnect(e){}onMessage(e){let t,r=this,o=e.data,n=o.action,i=o.replyId;if(!n)throw new Error("Message action is missing: "+o.id);"reply"!==n?r["on"+Neo.capitalize(n)](o):(t="reply"===n&&r.promises[i])&&(o.reject?t.reject(o.data):t.resolve(o.data),delete r.promises[i])}onPing(e){this.resolve(e,{originMsg:e})}onRegisterNeoConfig(e){Neo.config=Neo.config||{},Object.assign(Neo.config,e.data)}promiseMessage(e,t,r){let o=this;return new Promise((function(n,i){let s=o.sendMessage(e,t,r).id;o.promises[s]={resolve:n,reject:i}}))}registerApp(e){this.ports.forEach(t=>{t.appName||(t.appName=e,this.sendMessage("main",{action:"registerAppName",appName:e}))})}sendMessage(e,t,r){t.destination=e;let o,n,i,s=this;return s.isSharedWorker?t.port?n=s.getPort({id:t.port}).port:t.appName?(i=s.getPort({appName:t.appName}),n=i.port,t.port=i.id):n=s.ports[0].port:n=self,o=new C(t),n.postMessage(o,r),o}}Neo.applyClassConfig(w);class O extends y{static getConfig(){return{className:"Neo.core.Logger",ntype:"logger",enableLogs:!0,level:"log",singleton:!0}}constructor(e){super(e),Neo.applyFromNs(Neo,this,{error:"error",info:"info",log:"log",logError:"logError",warn:"warn"},!0)}error(e){throw new Error(e)}log(...e){this.level="log",this.write(...e)}info(...e){this.level="info",this.write(...e)}logError(...e){this.level="error",this.write(...e)}warn(...e){this.level="warn",this.write(...e)}write(...e){!0===this.enableLogs&&console[this.level](...e)}}Neo.applyClassConfig(O);let j=Neo.create(O);Neo.applyToGlobalNs(j);class x extends y{static getStaticConfig(){return{decamelRegEx:/([a-z])([A-Z])/g}}static getConfig(){return{className:"Neo.core.Util",ntype:"core-util"}}static bindMethods(e,t){t.forEach(t=>{e[t]=e[t].bind(e)})}static capitalize(e){return x.isString(e)&&e[0].toUpperCase()+e.slice(1)}static createStyleObject(e){if(!e)return null;let t;return e.split(/;(?=[^\)]*(?:\(|$))/g).reduce((e,r)=>(t=r.split(/:(.+)/).map((function(e){let t=parseFloat(e);return e==t?t:e.trim()})),""!==t[0]&&(t[0]=t[0].replace(/-([a-z])/g,(e,t)=>t.toUpperCase()),e[t[0]]=t[1]),e),{})}static createStyles(e){let t="";return Object.entries(e).forEach(([e,r])=>{null!=r&&(t+=x.decamel(e)+":"+r+";")}),t}static decamel(e){return e.replace(x.decamelRegEx,"$1-$2").toLowerCase()}static isArray(e){return Array.isArray(e)}static isBoolean(e){return"boolean"==typeof e}static isDefined(e){return void 0!==e}static isEmpty(e){return Array.isArray(e)?0===e.length:!(e instanceof Date)&&(x.isObject(e)?0===Object.keys(e).length:!!x.isString(e)&&""===e)}static isFunction(e){return"function"==typeof e}static isNumber(e){return"number"==typeof e&&isFinite(e)}static isObject(e){return null!==e&&"object"==typeof e&&!Array.isArray(e)}static isString(e){return"string"==typeof e}static toArray(e,t,r){let o;return e&&(o=e.length)?"string"==typeof e?e.split(""):Array.prototype.slice.call(e,t||0,r||o):[]}}Neo.applyClassConfig(x),Neo.applyFromNs(Neo,x,{bindMethods:"bindMethods",createStyleObject:"createStyleObject",createStyles:"createStyles",capitalize:"capitalize",decamel:"decamel",isArray:"isArray",isBoolean:"isBoolean",isDefined:"isDefined",isEmpty:"isEmpty",isFunction:"isFunction",isNumber:"isNumber",isObject:"isObject",isString:"isString",toArray:"toArray"},!0);class S{constructor(e){Object.assign(this,{attributes:e.attributes||[],childNodes:e.childNodes||[],className:e.className||[],id:e.id||Neo.getId("vnode"),innerHTML:e.innerHTML,nodeName:e.nodeName,style:e.style,vtype:e.vtype||"vnode"})}}Neo.ns("Neo.vdom",!0).VNode=S;class k extends y{static getConfig(){return{className:"Neo.util.VNode"}}static findChildVnode(e,t,r,o){r=r||0,t="string"!=typeof t?t:{id:t};let n,i,s,a=!0,l=[],d=!0,c=0,p=e.childNodes&&e.childNodes.length;if(n=Object.entries(t),i=n.length,n.forEach(([t,r])=>{if(e.hasOwnProperty(t))switch(t){case"attributes":Neo.isObject(r)&&Neo.isObject(e[t])&&(Object.entries(r).forEach(([r,o])=>{e[t].hasOwnProperty(r)&&e[t][r]===o||(a=!1)}),a&&l.push(!0));break;case"className":if("string"==typeof r&&Neo.isArray(e[t]))e[t].includes(r)&&l.push(!0);else if("string"==typeof r&&"string"==typeof e[t])e[t]===r&&l.push(!0);else if(Neo.isArray(r)&&Neo.isArray(e[t]))throw new Error("findChildVnode: cls matching not supported for target & source types of Arrays");break;case"style":Neo.isObject(r)&&Neo.isObject(e[t])&&(Object.entries(r).forEach(([r,o])=>{e[t].hasOwnProperty(r)&&e[t][r]===o||(d=!1)}),d&&l.push(!0));break;default:e[t]===r&&l.push(!0)}}),l.length===i)return{index:r,parentNode:o,vnode:e};if(e.childNodes)for(;c<p;c++)if(s=k.findChildVnode(e.childNodes[c],t,c,e),s)return s;return null}static findChildVnodeById(e,t){let r,o=e.childNodes||[],n=0,i=o.length;if(e.id===t)return e;for(;n<i;n++){if(r=o[n],r.id===t)return r;if(r=k.findChildVnodeById(r,t),r)return r}return null}static getChildIds(e,t=[]){return(e&&e.childNodes||[]).forEach(e=>{e.id&&t.push(e.id),t=k.getChildIds(e,t)}),t}static removeChildVnode(e,t){let r,o=e.childNodes||[],n=0,i=o.length;if(e.id===t)throw new Error("removeChildVnode: target id matches the root vnode id: "+t);for(;n<i;n++){if(r=o[n],r.id===t)return o.splice(n,1),!0;if(k.removeChildVnode(r,t))return!0}return!1}static replaceChildVnode(e,t,r){let o,n=e.childNodes||[],i=0,s=n.length;if(e.id===t)throw new Error("replaceChildVnode: target id matches the root vnode id: "+t);for(;i<s;i++){if(o=n[i],o.id===t)return n[i]=r,!0;if(k.replaceChildVnode(o,t,r))return!0}return!1}}Neo.applyClassConfig(k);var I=k;class M extends y{static getConfig(){return{className:"Neo.vdom.Helper",ntype:"vdom-helper",remote:{app:["create","update"]},returnChildNodeOuterHtml:!1,singleton:!0,voidAttributes:["checked","required"],voidElements:["area","base","br","col","command","embed","hr","img","input","keygen","link","meta","param","source","track","wbr"]}}create(e){let t,r=e.appName,o=!0===e.autoMount,n=e.parentId,i=e.parentIndex;return delete e.appName,delete e.autoMount,delete e.parentId,delete e.parentIndex,t=this.parseHelper(e),t.outerHTML=this.createStringFromVnode(t),o&&(t.appName=r,t.autoMount=!0,t.parentId=n,t.parentIndex=i),t}update(e){let t=this.parseHelper(e.vdom);return{deltas:this.createDeltas({newVnode:t,oldVnode:e.vnode}),updateVdom:!0,vnode:t}}createStringFromVnode(e){let t=this;switch(e.vtype){case"root":return t.createStringFromVnode(e.childNodes[0]);case"text":return void 0===e.innerHTML?"":String(e.innerHTML);case"vnode":return t.createOpenTag(e)+t.createTagContent(e)+t.createCloseTag(e);default:return""}}createOpenTag(e){let t,r="<"+e.nodeName,o=e.attributes,n=e.className;return e.style&&(t=Neo.createStyles(e.style),""!==t&&(r+=' style="'+t+'"')),n&&(Neo.isArray(n)&&(n=n.join(" ")),""!==n&&(r+=' class="'+n+'"')),e.id&&(r+=' id="'+e.id+'"'),Object.entries(o).forEach(([e,t])=>{this.voidAttributes.includes(e)?"true"===t&&(r+=" "+e):"removeDom"!==e&&(r+=" "+e+'="'+t+'"')}),r+">"}createTagContent(e){if(e.innerHTML)return e.innerHTML;let t,r,o="",n=e.childNodes?e.childNodes.length:0,i=0;for(;i<n;i++)t=e.childNodes[i],r=this.createStringFromVnode(t),t.innerHTML!==r&&this.returnChildNodeOuterHtml&&(t.outerHTML=r),o+=r;return o}createCloseTag(e){return this.voidElements.indexOf(e.nodeName)>-1?"":"</"+e.nodeName+">"}parseHelper(e){if(!0===e.removeDom)return null;if("text"===e.vtype)return e.id||(e.id=Neo.getId("vtext")),e.innerHTML=`\x3c!-- ${e.id} --\x3e${e.html||""}\x3c!-- /neo-vtext --\x3e`,delete e.html,e;let t,r=this,o={attributes:{},childNodes:[],style:{}};return e.tag||(e.tag="div"),Object.entries(e).forEach(([e,n])=>{let i,s,a;if(null!=n&&"flag"!==e)switch(e){case"tag":case"nodeName":o.nodeName=n;break;case"html":case"innerHTML":o.innerHTML=n.toString();break;case"children":case"childNodes":case"cn":Neo.isArray(n)||(n=[n]),s=[],n.forEach(e=>{!0!==e.removeDom&&(delete e.removeDom,t=r.parseHelper(e),t&&s.push(t))}),o.childNodes=s;break;case"cls":n&&!Array.isArray(n)?o.className=[n]:Neo.isArray(n)&&n.length<1||(o.className=n);break;case"height":case"maxHeight":case"maxWidth":case"minHeight":case"minWidth":case"width":i=n!=parseInt(n),o.style[e]=n+(i?"":"px");break;case"id":o.id=n;break;case"style":a=o.style,Neo.isString(n)?o.style=Object.assign(a,Neo.core.Util.createStyleObject(n)):o.style=Object.assign(a,n);break;default:"removeDom"!==e&&(o.attributes[e]=n+"")}}),new S(o)}createDeltas(e){let t,r,o,n,i,s,a,l,d,c,p,f,u,h,g,m=this,N=e.deltas||[],y=e.index,b=e.newVnode,C=e.newVnodeRoot||b,v=e.oldVnode,w=e.oldVnodeRoot||v,O=e.parentId;if(b&&!v)w&&(d=m.findVnode(w,b.id,v)),d||N.push({action:"insertNode",id:b.id,index:y,outerHTML:m.createStringFromVnode(b),parentId:O});else if(!b&&v)C&&(l=m.findVnode(C,v.id,b)),l?(N.push({action:"moveNode",id:v.id,index:l.index,parentId:l.parentNode.id}),d=m.findVnode(w,l.parentNode.id),m.createDeltas({deltas:N,newVnode:l.vnode,newVnodeRoot:C,oldVnode:v,oldVnodeRoot:w,parentId:l.parentNode.id}),d.vnode.childNodes.splice(l.index,0,l.vnode)):N.push({action:"removeNode",id:v.id});else{if(b&&v&&b.id!==v.id){if(l=m.findVnode(C,v.id,b),d=m.findVnode(w,b.id,v),!l&&!d)return N.push({action:"removeNode",id:v.id}),N.push({action:"insertNode",id:b.id,index:y,outerHTML:m.createStringFromVnode(b),parentId:O}),{indexDelta:0};if(l&&d&&l.parentNode.id===d.parentNode.id)N.push({action:"moveNode",id:d.vnode.id,index:y,parentId:O}),m.createDeltas({deltas:N,newVnode:b,newVnodeRoot:C,oldVnode:d.vnode,oldVnodeRoot:w,parentId:l.parentNode.id});else{if(!l&&d){if(b.id===d.vnode.id){if(i=0,I.findChildVnodeById(v,b.id))N.push({action:"replaceChild",fromId:v.id,parentId:O,toId:b.id});else{let e=I.findChildVnode(w,d.vnode.id),t=I.findChildVnode(w,v.id);if(i=1,e.parentNode.id===t.parentNode.id){let r=I.findChildVnode(C,b.id),o=y+1;for(n=y+1,h=t.parentNode.childNodes,a=e.index;n<a;n++)I.findChildVnode(r.parentNode,h[n].id)||o++;e.parentNode.childNodes.splice(e.index,1),e.index!==o&&N.push({action:"moveNode",id:d.vnode.id,index:y,parentId:O}),i=0}N.push({action:"removeNode",id:v.id})}return m.createDeltas({deltas:N,newVnode:b,newVnodeRoot:C,oldVnode:d.vnode,oldVnodeRoot:w,parentId:O}),{indexDelta:i}}return N.push({action:"removeNode",id:v.id}),{indexDelta:1}}if(!d)return g=l&&I.findChildVnodeById(b,v.id),g&&N.push({action:"removeNode",id:l.vnode.id}),N.push({action:"insertNode",id:b.id,index:y,outerHTML:m.createStringFromVnode(b),parentId:O}),{indexDelta:g?0:-1};if(l){i=0;let e=I.findChildVnode(C,b.id);return e.parentNode.id===l.parentNode.id&&e.index>l.index&&(i=e.index-l.index),e.parentNode.childNodes[l.index].id!==l.vnode.id&&N.push({action:"moveNode",id:l.vnode.id,index:l.index,parentId:l.parentNode.id}),m.createDeltas({deltas:N,newVnode:l.vnode,newVnodeRoot:C,oldVnode:v,oldVnodeRoot:w,parentId:l.parentNode.id}),{indexDelta:0}}}}b&&v&&b.id===v.id&&("text"===b.vtype&&b.innerHTML!==v.innerHTML?N.push({action:"updateVtext",id:b.id,parentId:I.findChildVnode(C,b.id).parentNode.id,value:b.innerHTML}):(s=Object.keys(b),Object.keys(v).forEach(e=>{b.hasOwnProperty(e)?"attributes"===e&&Object.keys(v[e]).forEach(t=>{b[e].hasOwnProperty(t)||(b[e][t]=null)}):s.push(e)}),s.forEach(e=>{switch(r={},o=b[e],e){case"attributes":t={},Object.entries(o).forEach(([e,r])=>{v.attributes.hasOwnProperty(e)&&v.attributes[e]===r||Neo.isEmpty(r)||(t[e]=r)}),Object.keys(t).length>0&&(r.attributes=t,Object.entries(t).forEach(([e,t])=>{null===t&&delete b.attributes[e]}));break;case"childNodes":for(n=0,i=0,a=Math.max(o.length,v.childNodes.length);n<a;n++)u=m.createDeltas({deltas:N,index:n,newVnode:o[n],newVnodeRoot:C,oldVnode:v.childNodes[n+i],oldVnodeRoot:w,parentId:b.id}),u&&u.indexDelta&&(i+=u.indexDelta);if(i<0)for(n=o.length+i;n<v.childNodes.length;n++)N.push({action:"removeNode",id:v.childNodes[n].id});break;case"nodeName":case"innerHTML":o!==v[e]&&(r[e]=o);break;case"style":c=Neo.util.Style.compareStyles(o,v.style),c&&(r.style=c);break;case"className":v.className?(p=Neo.util.Array.difference(o,v.className),f=Neo.util.Array.difference(v.className,o)):(p=o,f=[]),(p.length>0||f.length>0)&&(r.cls={add:p,remove:f})}Object.keys(r).length>0&&(r.id=b.id,N.push(r))})))}return N}findVnode(e,t,r,o){o||(o=0);let n,i,s,a,l=null;if(e.id===t)l={index:o,parentNode:r,vnode:e};else if("text"!==e.vtype)for(n=e.childNodes,s=0,a=n&&n.length||0;s<a;s++)if(i=this.findVnode(n[s],t,e,s),i&&i.vnode.id===t){l=i;break}return l&&"root"===l.parentId&&(l.index=null),l}}Neo.applyClassConfig(M);let E=Neo.create(M);Neo.applyToGlobalNs(E);class A extends y{static getConfig(){return{className:"Neo.util.Array"}}static add(e,t){Array.isArray(t)||(t=[t]),t.forEach(t=>{e.includes(t)||e.push(t)})}static difference(e=[],t=[]){return e.filter(e=>!t.includes(e))}static hasItem(e,t){return e.includes(t)}static intersection(e=[],t=[]){return e.filter(e=>t.includes(e))}static isEqual(e=[],t=[]){let r,o,n,i=0,s=e.length,a=t.length;for(;i<s;i++)if(n=e[i],Neo.isObject(n)){for(r=!1,o=0;o<a;o++)if(Neo.isObject(t[o])&&Neo.util.Object.isEqual(n,t[o])){r=!0;break}if(!r)return!1}else if(!t.includes(n))return!1;return e.length===t.length}static move(e,t,r){return t===r||(t>=e.length&&(t=e.length-1),e.splice(r,0,e.splice(t,1)[0])),e}static remove(e,t){let r;Array.isArray(t)||(t=[t]),t.forEach(t=>{r=e.indexOf(t),r>-1&&e.splice(r,1)})}static toggle(e,t){this.hasItem(e,t)?this.remove(e,t):this.add(e,t)}static union(e,t){let r,o=[],n=e.concat(t),i=n.length,s={};for(;i--;)r=n[i],s[r]||(o.unshift(r),s[r]=!0);return o}static unshift(e,t){Array.isArray(t)||(t=[t]),t.forEach(t=>{e.includes(t)||e.unshift(t)})}}Neo.applyClassConfig(A);class V extends y{static getConfig(){return{className:"Neo.util.Style"}}static compareStyles(e,t){let r={};return Neo.isString(e)&&(e=Neo.core.Util.createStyleObject(e)),Neo.isString(t)&&(t=Neo.core.Util.createStyleObject(t)),e||t?t?e?(Object.keys(e).forEach((function(o){t.hasOwnProperty(o)&&t[o]===e[o]||(r[o]=e[o])})),Object.keys(t).forEach((function(t){e.hasOwnProperty(t)||(r[t]=null)})),Object.keys(r).length>0?r:null):void Object.keys(t).forEach((function(e){r[e]=null})):Neo.clone(e):null}}Neo.applyClassConfig(V);class P extends w{static getConfig(){return{className:"Neo.worker.VDom",ntype:"vdom-worker",singleton:!0,workerId:"vdom"}}}a.applyClassConfig(P);let T=a.create(P);a.applyToGlobalNs(T);t.default=T}]);