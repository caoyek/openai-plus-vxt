var content=(function(){function e(e){return e}var t=globalThis.browser?.runtime?.id?globalThis.browser:globalThis.chrome,n=[`input#email`,`input[name="email"]`,`input[type="email"]`,`input[autocomplete="email"]`],r=[`button[type="submit"]`,`form button:not([type="button"])`];function i(){return c()?!!s(n):!1}async function a(e){let t=s(n);if(!t)return m(`没有找到邮箱输入框`);u(t,e),t.dispatchEvent(new Event(`input`,{bubbles:!0})),t.dispatchEvent(new Event(`change`,{bubbles:!0})),await d();let r=o();return r?(r.disabled&&await f(r,2500),r.disabled?m(`继续按钮仍然不可点击`):(r.click(),p(`已填入邮箱并点击继续`))):m(`没有找到继续按钮`)}function o(){for(let e of r){let t=document.querySelector(e);if(t)return t}return Array.from(document.querySelectorAll(`button`)).find(e=>{let t=(e.textContent||``).trim();return t===`继续`||t.toLowerCase()===`continue`})??null}function s(e){for(let t of e){let e=document.querySelector(t);if(e&&l(e))return e}return null}function c(){return location.hostname===`chatgpt.com`||location.hostname===`auth.openai.com`||location.hostname===`chat.openai.com`}function l(e){let t=e.getBoundingClientRect(),n=window.getComputedStyle(e);return t.width>0&&t.height>0&&n.visibility!==`hidden`&&n.display!==`none`}function u(e,t){Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,`value`)?.set?.call(e,t)}function d(){return new Promise(e=>window.setTimeout(e,60))}function f(e,t){let n=Date.now();return new Promise(r=>{let i=()=>{if(!e.disabled||Date.now()-n>=t){r();return}window.setTimeout(i,100)};i()})}function p(e){return{ok:!0,message:e}}function m(e){return{ok:!1,message:e}}var h=[`input[name="code"]`,`input[name="otp"]`,`input[autocomplete="one-time-code"]`,`input[inputmode="numeric"]`,`input[type="text"]`];function g(){return y()?!!v()&&S(b(),[`code`,`otp`,`verification`,`验证码`,`验证`]):!1}async function _(e){let t=e.replace(/\D/g,``);if(!t)return O(`验证码不能为空`);let n=v();if(!n)return O(`没有找到验证码输入框`);w(n,t),n.dispatchEvent(new Event(`input`,{bubbles:!0})),n.dispatchEvent(new Event(`change`,{bubbles:!0})),await T();let r=C();return r?(r.disabled&&await E(r,2500),r.disabled?O(`验证码继续按钮仍然不可点击`):(r.click(),D(`已填入验证码并点击继续`))):O(`没有找到验证码继续按钮`)}function v(){for(let e of h){let t=document.querySelector(e);if(t&&x(t))return t}return Array.from(document.querySelectorAll(`input`)).find(e=>{if(!x(e))return!1;let t=[e.placeholder,e.ariaLabel,e.name,e.id].join(` `).toLowerCase();return t.includes(`code`)||t.includes(`otp`)||t.includes(`验证`)})??null}function y(){return location.hostname===`chatgpt.com`||location.hostname===`auth.openai.com`||location.hostname===`chat.openai.com`}function b(){return(document.body?.innerText||document.body?.textContent||``).toLowerCase()}function x(e){let t=e.getBoundingClientRect(),n=window.getComputedStyle(e);return t.width>0&&t.height>0&&n.visibility!==`hidden`&&n.display!==`none`}function S(e,t){return t.some(t=>e.includes(t))}function C(){return document.querySelector(`button[type="submit"]`)||(Array.from(document.querySelectorAll(`button`)).find(e=>{let t=(e.textContent||``).trim();return t===`继续`||t.toLowerCase()===`continue`})??null)}function w(e,t){Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,`value`)?.set?.call(e,t)}function T(){return new Promise(e=>window.setTimeout(e,60))}function E(e,t){let n=Date.now();return new Promise(r=>{let i=()=>{if(!e.disabled||Date.now()-n>=t){r();return}window.setTimeout(i,100)};i()})}function D(e){return{ok:!0,message:e}}function O(e){return{ok:!1,message:e}}var ee=[`input[name="name"]`,`input[name="fullName"]`,`input[autocomplete="name"]`,`input[type="text"]`],te=[`input[name="age"]`,`input[inputmode="numeric"]`,`input[type="number"]`,`input[type="text"]`],ne=[`Arlen`,`Brennan`,`Calvin`,`Darian`,`Elliot`,`Finley`,`Gavin`,`Harlan`,`Jasper`,`Kieran`,`Landon`,`Morgan`,`Nolan`,`Parker`,`Rowan`,`Sawyer`,`Tristan`,`Warren`];function re(){return ye()?!!(ae()&&oe(ae())):!1}async function ie(){let e=ae(),t=oe(e);if(!e)return ve(`没有找到全名输入框`);if(!t)return ve(`没有找到年龄输入框`);let n=he(),r=String(ge(25,55));fe(e,n),e.dispatchEvent(new Event(`input`,{bubbles:!0})),e.dispatchEvent(new Event(`change`,{bubbles:!0})),fe(t,r),t.dispatchEvent(new Event(`input`,{bubbles:!0})),t.dispatchEvent(new Event(`change`,{bubbles:!0})),await pe();let i=de();return i?(i.disabled&&await me(i,2500),i.disabled?ve(`完成账户创建按钮仍然不可点击`):(i.click(),_e(`已填写 ${n} / ${r} 并点击创建`))):ve(`没有找到完成账户创建按钮`)}function ae(){let e=se([`全名`,`名字`,`name`,`full name`]);if(e)return e;for(let e of ee){let t=document.querySelector(e);if(t&&be(t)&&!ue(t))return t}return le().find(e=>!ue(e))??null}function oe(e){let t=se([`年龄`,`age`]);if(t&&t!==e)return t;for(let t of te){let n=Array.from(document.querySelectorAll(t)).find(t=>t!==e&&be(t)&&ue(t));if(n)return n}return le().find(t=>t!==e)??null}function se(e){let t=le();for(let n of t){let t=[n.name,n.id,n.placeholder,n.ariaLabel,n.getAttribute(`aria-labelledby`)?ce(n.getAttribute(`aria-labelledby`)||``):``,n.closest(`label`)?.textContent||``,n.parentElement?.textContent||``].join(` `).toLowerCase();if(e.some(e=>t.includes(e.toLowerCase())))return n}return null}function ce(e){return e.split(/\s+/).map(e=>document.getElementById(e)?.textContent||``).join(` `)}function le(){return Array.from(document.querySelectorAll(`input`)).filter(e=>{let t=(e.type||`text`).toLowerCase();return[`text`,`number`,`tel`,``].includes(t)&&be(e)})}function ue(e){let t=[e.name,e.id,e.placeholder,e.ariaLabel,e.inputMode,e.type,e.parentElement?.textContent||``].join(` `).toLowerCase();return t.includes(`age`)||t.includes(`年龄`)||t.includes(`numeric`)||e.type===`number`}function de(){return document.querySelector(`button[type="submit"]`)||(Array.from(document.querySelectorAll(`button`)).find(e=>{let t=(e.textContent||``).trim().toLowerCase();return t.includes(`完成帐户创建`)||t.includes(`完成账户创建`)||t.includes(`create account`)||t.includes(`continue`)})??null)}function fe(e,t){Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,`value`)?.set?.call(e,t)}function pe(){return new Promise(e=>window.setTimeout(e,80))}function me(e,t){let n=Date.now();return new Promise(r=>{let i=()=>{if(!e.disabled||Date.now()-n>=t){r();return}window.setTimeout(i,100)};i()})}function he(){return ne[ge(0,ne.length-1)]}function ge(e,t){return Math.floor(Math.random()*(t-e+1))+e}function _e(e){return{ok:!0,message:e}}function ve(e){return{ok:!1,message:e}}function ye(){return location.hostname===`chatgpt.com`||location.hostname===`auth.openai.com`||location.hostname===`chat.openai.com`}function be(e){let t=e.getBoundingClientRect(),n=window.getComputedStyle(e);return t.width>0&&t.height>0&&n.visibility!==`hidden`&&n.display!==`none`}var xe=/^[^\s@]+@[^\s@]+\.[^\s@]+$/,Se=/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/;function Ce(e){let t=e.trim();if(!t)return we(`empty`,`请输入邮箱或临时邮箱账号行`);let n=t.split(/\r?\n/).map(e=>e.trim()).find(Boolean)||``;if(n.includes(`----`)){let e=n.split(`----`).map(e=>e.trim()),t=e[0]||``;if(Te(t))return e.length<3||!e[1]||!e[2]?we(`invalid`,`新建临时邮箱需要 Worker地址----admin_auth----邮箱域名`):{ok:!0,mode:`outlook-line`,email:``,accountLine:n,apiBase:Ee(t),message:`临时邮箱 API 新建地址并自动收码`};let r=t;return xe.test(r)?e.length<3||!Se.test(e[1])||!Te(e[2])?we(`invalid`,`已有临时邮箱需要 email----地址JWT----Worker地址`):{ok:!0,mode:`outlook-line`,email:r,accountLine:n,apiBase:Ee(e[2]),message:`临时邮箱 API 自动验证码`}:we(`invalid`,`临时邮箱行里的邮箱格式不正确`)}return xe.test(n)?{ok:!0,mode:`email`,email:n,accountLine:``,message:`单邮箱模式，验证码手动输入`}:we(`invalid`,`邮箱格式不正确`)}function we(e,t){return{ok:!1,mode:e,email:``,accountLine:``,message:t}}function Te(e){try{let t=new URL(e);return t.protocol===`http:`||t.protocol===`https:`}catch{return!1}}function Ee(e){return e.replace(/\/+$/,``)}var De=/"accessToken"\s*:\s*"([^"]+)"/,Oe=/"accessToken"\s*:\s*"?([A-Za-z0-9_.-]+)/,ke=/\beyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\b/,k={planName:`chatgptplusplan`,uiMode:`custom`,region:`US`,workspaceName:`MyTeam`,seatQuantity:5};function Ae(e){let t=String(e||``).trim();if(!t)throw Error(`请输入包含 accessToken 的 JSON 或字符串`);let n=Ie(t)||Re(t)||ze(t);if(!n)throw Error(`未找到 accessToken`);if(n.split(`.`).length!==3)throw Error(`accessToken 格式不正确`);return n}function je(e){let t=Be(e)?e:{};return{planName:Me(t.planName),uiMode:Ne(t.uiMode),region:Pe(t.region||t.country),workspaceName:String(t.workspaceName||t.workspace_name||k.workspaceName).trim()||k.workspaceName,seatQuantity:Fe(t.seatQuantity)}}function Me(e){return e===`chatgptplusplan`||e===`chatgptteamplan`?e:k.planName}function Ne(e){return e===`hosted`?`hosted`:`custom`}function Pe(e){let t=String(e||k.region).trim().toUpperCase();return t===`ID`||t===`DE`||t===`JP`||t===`US`?t:k.region}function Fe(e){let t=Number(e||k.seatQuantity);if(!Number.isInteger(t)||t<1)throw Error(`team_plan_data.seat_quantity 必须是大于 0 的整数`);return t}function Ie(e){try{return Le(JSON.parse(e))}catch{return``}}function Le(e,t=0){if(!Be(e)||t>4)return``;if(typeof e.accessToken==`string`)return e.accessToken.trim();for(let n of Object.values(e)){let e=Le(n,t+1);if(e)return e}return``}function Re(e){let t=De.exec(e);if(t?.[1])return t[1].trim();let n=Oe.exec(e);if(!n?.[1])return``;let r=n[1].trim().replace(/[",}\]\s]+$/,``);return ke.exec(r)?.[0]?.trim()||r}function ze(e){return ke.exec(e)?.[0]?.trim()||``}function Be(e){return!!(e&&typeof e==`object`)}var Ve=`opx.registerAssist.state`,A={rawInput:``,email:``,accountLine:``,inputMode:`empty`,autoOtp:!1,apiBase:``,otpRequestedAt:0,updatedAt:0},He={checkoutOptions:k,updatedAt:0},Ue={rawInput:``,history:[],updatedAt:0},We={activeTab:`register`,panelCollapsed:!1,register:A,linkExtractor:He,smsRelay:Ue};async function j(){return et((await t.storage.local.get(Ve))[Ve])}async function Ge(e){let n=et({...await j(),activeTab:e});return await t.storage.local.set({[Ve]:n}),n}async function Ke(e){let n=et({...await j(),panelCollapsed:e});return await t.storage.local.set({[Ve]:n}),n}async function qe(){return(await j()).register}async function Je(e){let n=await j(),r=tt({...n.register,...e,updatedAt:Date.now()}),i=et({...n,register:r});return await t.storage.local.set({[Ve]:i}),i.register}async function Ye(){return(await j()).linkExtractor}async function Xe(e){let n=await j(),r=nt({...n.linkExtractor,...e,updatedAt:Date.now()}),i=et({...n,linkExtractor:r});return await t.storage.local.set({[Ve]:i}),i.linkExtractor}async function Ze(){return(await j()).smsRelay}async function Qe(e){let n=await j(),r=rt({...n.smsRelay,...e,updatedAt:Date.now()}),i=et({...n,smsRelay:r});return await t.storage.local.set({[Ve]:i}),i.smsRelay}function $e(e){return e===`register`||e===`link`||e===`address`||e===`sms`}function et(e){let t=M(e)?e:{},n=M(t.register)?t.register:t,r=M(t.linkExtractor)?t.linkExtractor:t,i=M(t.smsRelay)?t.smsRelay:Ue;return{activeTab:$e(String(t.activeTab||``))?t.activeTab:We.activeTab,panelCollapsed:!!t.panelCollapsed,register:tt(n),linkExtractor:nt(r),smsRelay:rt(i)}}function tt(e){let t=M(e)?e:{};return{rawInput:String(t.rawInput||A.rawInput),email:String(t.email||A.email),accountLine:String(t.accountLine||A.accountLine),inputMode:at(t.inputMode),autoOtp:!!t.autoOtp,apiBase:String(t.apiBase||A.apiBase),otpRequestedAt:Number(t.otpRequestedAt||A.otpRequestedAt),updatedAt:Number(t.updatedAt||A.updatedAt)}}function nt(e){let t=M(e)?e:{};return{checkoutOptions:je(t.checkoutOptions||He.checkoutOptions),updatedAt:Number(t.updatedAt||He.updatedAt)}}function rt(e){let t=M(e)?e:{},n=Array.isArray(t.history)?t.history.map(it).filter(e=>!!e):Ue.history;return{rawInput:String(t.rawInput||Ue.rawInput),history:n,updatedAt:Number(t.updatedAt||Ue.updatedAt)}}function it(e){if(!M(e))return null;let t=String(e.phone||``).trim(),n=String(e.code||``).trim();if(!t||!n)return null;let r=Number(e.receivedAt||0)||Date.now();return{id:String(e.id||`${t}-${n}-${r}`),phone:t,code:n,message:String(e.message||``).trim(),receivedAt:r}}function at(e){return e===`email`||e===`outlook-line`||e===`invalid`?e:`empty`}function M(e){return!!(e&&typeof e==`object`)}var ot=`opx.extension.settings`,N={payOpenAiEnabled:!0,payPalSignupEnabled:!0,countryCode:`US`,city:``,lastAddress:null,updatedAt:0},st={addressAutofill:N,tempMail:{apiBase:``,adminAuth:``,domain:``,mailboxName:``,customAuth:``,updatedAt:0},updatedAt:0},ct=new Set([`RANDOM`,`US`,`CA`,`AU`,`JP`,`TW`,`KR`,`HK`,`GB`,`DE`,`SG`,`FR`,`IT`,`ES`,`NL`,`MY`,`RU`,`CN`,`TH`,`PH`,`AR`,`TR`,`VN`]);async function lt(){return ft((await t.storage.local.get(ot))[ot])}async function P(e){let n=await lt(),r=pt({...n.addressAutofill,...e,updatedAt:Date.now()}),i=ft({...n,addressAutofill:r,updatedAt:Date.now()});return await t.storage.local.set({[ot]:i}),i.addressAutofill}async function F(){return(await lt()).addressAutofill}async function ut(){return(await lt()).tempMail}async function dt(e){let n=await lt(),r=vt({...n.tempMail,...e,updatedAt:Date.now()}),i=ft({...n,tempMail:r,updatedAt:Date.now()});return await t.storage.local.set({[ot]:i}),i.tempMail}function ft(e){let t=I(e)?e:{};return{addressAutofill:pt(t.addressAutofill),tempMail:vt(t.tempMail),updatedAt:Number(t.updatedAt||st.updatedAt)}}function pt(e){let t=I(e)?e:{};return{payOpenAiEnabled:t.payOpenAiEnabled===void 0?N.payOpenAiEnabled:!!t.payOpenAiEnabled,payPalSignupEnabled:t.payPalSignupEnabled===void 0?N.payPalSignupEnabled:!!t.payPalSignupEnabled,countryCode:bt(t.countryCode||t.country),city:String(t.city||t.region||N.city),lastAddress:mt(t.lastAddress),updatedAt:Number(t.updatedAt||N.updatedAt)}}function mt(e){if(!I(e))return null;let t=String(e.line1||``).trim(),n=String(e.city||``).trim(),r=String(e.countryCode||e.country||`US`).trim().toUpperCase(),i=String(e.state||``).trim(),a=r===`US`?i.toUpperCase():i,o=String(e.postalCode||``).trim();return!t||!n||!a||!o?null:{id:String(e.id||`${Date.now()}`),fullName:String(e.fullName||``).trim(),line1:t,line2:String(e.line2||``).trim(),city:n,state:a,stateFull:String(e.stateFull||``).trim(),postalCode:o,countryCode:r,countryLabel:String(e.countryLabel||``).trim(),countryPath:String(e.countryPath||``).trim(),phone:String(e.phone||``).trim(),identity:ht(e.identity),employment:gt(e.employment),creditCard:_t(e.creditCard),source:e.source===`fallback`?`fallback`:`meiguodizhi`,fetchedAt:Number(e.fetchedAt||0)}}function ht(e){let t=I(e)?e:{};return{gender:String(t.gender||``).trim(),title:String(t.title||``).trim(),birthday:String(t.birthday||``).trim(),username:String(t.username||``).trim(),password:String(t.password||``).trim(),temporaryMail:String(t.temporaryMail||``).trim(),system:String(t.system||``).trim(),userAgent:String(t.userAgent||``).trim(),website:String(t.website||``).trim(),securityQuestion:String(t.securityQuestion||``).trim(),securityAnswer:String(t.securityAnswer||``).trim()}}function gt(e){let t=I(e)?e:{};return{educationalBackground:String(t.educationalBackground||``).trim(),occupation:String(t.occupation||``).trim(),employmentStatus:String(t.employmentStatus||``).trim(),monthlySalary:String(t.monthlySalary||``).trim(),companySize:String(t.companySize||``).trim(),companyName:String(t.companyName||``).trim()}}function _t(e){let t=I(e)?e:{},n=String(t.number||``).replace(/\D/g,``),r=String(t.last4||n.slice(-4)||``).replace(/\D/g,``).slice(-4);return{type:String(t.type||``).trim(),number:n,cvv:String(t.cvv||``).trim(),expires:String(t.expires||``).trim(),last4:r,maskedNumber:String(t.maskedNumber||(r?`**** **** **** ${r}`:``)).trim()}}function vt(e){let t=I(e)?e:{};return{apiBase:yt(t.apiBase||t.workerUrl),adminAuth:String(t.adminAuth||``).trim(),domain:String(t.domain||``).trim(),mailboxName:String(t.mailboxName||t.name||``).trim(),customAuth:String(t.customAuth||``).trim(),updatedAt:Number(t.updatedAt||st.tempMail.updatedAt)}}function I(e){return!!(e&&typeof e==`object`)}function yt(e){let t=String(e||``).trim().replace(/\/+$/,``);if(!t)return``;try{let e=new URL(t);return e.protocol===`http:`||e.protocol===`https:`?e.toString().replace(/\/+$/,``):``}catch{return``}}function bt(e){let t=String(e||N.countryCode).trim().toUpperCase();return ct.has(t)?t:N.countryCode}var xt=!1;function St(){return{getPageState:Ct,loadState:qe,saveInput:async e=>{let t=Ce(e);return Je({rawInput:e,email:t.email,accountLine:t.accountLine,apiBase:t.apiBase,inputMode:t.mode,autoOtp:t.mode===`outlook-line`})},fillEmailFromInput:async()=>{if(!i())return L(`当前页面不是 ChatGPT 登录页`);let e=await ut(),n=wt(e);if(!n.ok)return L(n.message);let r=await t.runtime.sendMessage({type:`opx:create-temp-mail-address`,accountLine:n.accountLine});if(!Et(r)||!r.ok||!r.email||!r.accountLine)return L(r?.message||`临时邮箱 API 没有返回有效地址`);let o=r.email,s=r.accountLine;return await Je({rawInput:s,email:o,accountLine:s,apiBase:e.apiBase,inputMode:`outlook-line`,autoOtp:!0,otpRequestedAt:Date.now()}),a(o)},fillOtp:async e=>g()?_(e):L(`当前页面不是邮箱验证码页`),waitForOutlookOtp:async()=>{if(!g())return L(`当前页面不是邮箱验证码页`);let e=await qe();if(!e.accountLine)return L(`当前输入不是临时邮箱账号行，不能自动接收验证码`);let n=await t.runtime.sendMessage({type:`opx:wait-outlook-otp`,accountLine:e.accountLine,apiBase:e.apiBase,since:e.otpRequestedAt||e.updatedAt||Date.now(),timeoutMs:18e4,intervalMs:5e3});if(!Tt(n))return L(`临时邮箱 API 没有返回有效结果`);if(!n.ok||!n.code)return n;let r=await _(n.code);return{...r,code:n.code,message:r.ok?`已收到并提交验证码：${n.code}`:r.message}},fillProfileAndCreate:async()=>re()?ie():L(`当前页面不是资料填写页`),autoRunForCurrentPage:async()=>{!re()||xt||(xt=!0,await Dt(),await ie())}}}function Ct(){return i()?{kind:`login`,label:`ChatGPT 登录页`,canFillEmail:!0,canFillOtp:!1,canFillProfile:!1}:g()?{kind:`email-verification`,label:`邮箱验证码页`,canFillEmail:!1,canFillOtp:!0,canFillProfile:!1}:re()?{kind:`about-you`,label:`资料填写页`,canFillEmail:!1,canFillOtp:!1,canFillProfile:!0}:{kind:`unknown`,label:`未识别页面`,canFillEmail:!1,canFillOtp:!1,canFillProfile:!1}}function wt(e){return!e.apiBase||!e.adminAuth||!e.domain?{ok:!1,message:`请先在设置里填写临时邮箱 Worker 地址、admin_auth 和邮箱域名`}:{ok:!0,accountLine:[e.apiBase,e.adminAuth,e.domain,e.mailboxName,e.customAuth].filter(Boolean).join(`----`)}}function L(e){return{ok:!1,message:e}}function Tt(e){return!!(e&&typeof e==`object`&&typeof e.ok==`boolean`&&typeof e.message==`string`)}function Et(e){return Tt(e)}function Dt(){return new Promise(e=>window.setTimeout(e,800))}var Ot=[{code:`US`,label:`美国`,path:`/`},{code:`CA`,label:`加拿大`,path:`/ca-address`},{code:`AU`,label:`澳大利亚`,path:`/au-address`},{code:`JP`,label:`日本`,path:`/jp-address`},{code:`TW`,label:`台湾`,path:`/tw-address`},{code:`KR`,label:`韩国`,path:`/kr-address`},{code:`HK`,label:`香港`,path:`/hk-address`},{code:`GB`,label:`英国`,path:`/uk-address`},{code:`DE`,label:`德国`,path:`/de-address`},{code:`SG`,label:`新加坡`,path:`/sg-address`},{code:`FR`,label:`法国`,path:`/fr-address`},{code:`IT`,label:`意大利`,path:`/it-address`},{code:`ES`,label:`西班牙`,path:`/es-address`},{code:`NL`,label:`荷兰`,path:`/nl-address`},{code:`MY`,label:`马来西亚`,path:`/my-address`},{code:`RU`,label:`俄罗斯`,path:`/ru-address`},{code:`CN`,label:`中国`,path:`/cn-address`},{code:`TH`,label:`泰国`,path:`/th-address`},{code:`PH`,label:`菲律宾`,path:`/ph-address`},{code:`AR`,label:`阿根廷`,path:`/ar-address`},{code:`TR`,label:`土耳其`,path:`/tr-address`},{code:`VN`,label:`越南`,path:`/vn-address`}],kt=`[OPX Pay Autofill]`,At=[`label[for="payment-method-accordion-item-title-paypal"]`,`#payment-method-accordion-item-title-paypal`,`#payment-method-label-paypal`,`[data-testid="paypal-accordion-item"]`,`button[data-testid="paypal-accordion-item-button"]`,`button[aria-label*="PayPal"]`,`button[aria-label*="paypal" i]`],jt=!1,Mt=!1,Nt=null,Pt=null,Ft=``,It=!1,Lt=!1,Rt=0,zt=null,Bt=0;function Vt(){jt||location.hostname!==`pay.openai.com`||(jt=!0,Tn(),wn(),En(800))}async function Ht(){if(!Mt){Mt=!0;try{let e=await F();if(!e.payOpenAiEnabled){console.info(`${kt} disabled`);return}let t=await on(e);if(!t){console.info(`${kt} no address available`);return}let n=await Ut(t);console.info(`${kt} ${n.message}`,{city:t.city,state:t.state,postalCode:t.postalCode,country:t.countryCode,source:t.source})}catch(e){console.warn(`${kt} failed`,e)}finally{Mt=!1}}}async function Ut(e){if(location.hostname!==`pay.openai.com`)return{ok:!1,filled:0,message:`当前不是 pay.openai.com 页面`};let t=ln();t&&fn(),await jn(t?1400:650);let n=await cn(e);return Rt=0,Bt=0,Wt(1800),Gt(),{ok:n>0,filled:n,message:n>0?`已填写 OpenAI 支付页 ${n} 项`:`未找到可填写的 OpenAI 支付字段`}}function Wt(e){It&&!tn()||Lt||window.setTimeout(()=>{if(It&&!tn()||Lt)return;if(Xt()&&Zt(),!qt()){Rt+=1,Rt<80&&Wt(1200);return}let e=tn();if(!e||e.disabled||!z(e)){Rt+=1,Rt<80&&Wt(1200);return}Lt=!0,window.setTimeout(()=>{if(Lt=!1,It||!qt())return;let e=tn();if(!e||e.disabled||!z(e)){Wt(900);return}It=!0,R(e),window.setTimeout(()=>{tn()?(It=!1,Wt(900)):Kt()},2500)},900)},e)}function Gt(){zt||=window.setInterval(()=>{if(It&&!tn()){Kt();return}Wt(0)},1800)}function Kt(){zt&&=(window.clearInterval(zt),null)}function qt(){return Jt()&&Yt()}function Jt(){let e=document.querySelector(`#payment-method-accordion-item-title-paypal`),t=document.querySelector(`[data-testid="paypal-accordion-item"]`);return!e&&!t?!0:!!(e?.checked||e?.getAttribute(`aria-checked`)===`true`||t?.className.includes(`selected`)||t?.querySelector(`input[value="paypal"]`)?.getAttribute(`aria-checked`)===`true`)}function Yt(){let e=en(`#billingCountry`)||$t(`billing country`),t=en(`#billingAddressLine1`)||$t(`billing address-line1`),n=en(`#billingLocality`)||$t(`billing address-level2`),r=en(`#billingPostalCode`)||$t(`billing postal-code`),i=en(`#billingAdministrativeArea`)||$t(`billing address-level1`);if(!e||!t||!n||!r)return!1;let a=e.toUpperCase();return(a===`US`||a.includes(`美国`)||a.includes(`UNITED STATES`))&&Qt(`#billingAdministrativeArea`)?!!i:!0}function Xt(){return Array.from(document.querySelectorAll(`.AddressAutocomplete-results--showing, .AddressAutocomplete-results`)).some(e=>z(e))}function Zt(){Bt+=1;let e=document.querySelector(`.AddressAutocomplete-result--selected, .AddressAutocomplete-results--showing [role="option"], .AddressAutocomplete-result`);if(e&&z(e)){R(e);return}let t=document.querySelector(`#billingAddressLine1`)||document.querySelector(`input[autocomplete="billing address-line1"]`);if(!t)return;t.focus();let n=Bt<=2?`Enter`:`Escape`;t.dispatchEvent(new KeyboardEvent(`keydown`,{key:n,code:n,bubbles:!0,cancelable:!0})),t.dispatchEvent(new KeyboardEvent(`keyup`,{key:n,code:n,bubbles:!0,cancelable:!0})),Bt>2&&t.blur()}function Qt(e){return!!document.querySelector(e)}function $t(e){let t=An(e);return en(`input[autocomplete="${t}"], textarea[autocomplete="${t}"], select[autocomplete="${t}"]`)}function en(e){let t=document.querySelector(e);if(kn(t)){let e=t.selectedOptions[0];return(t.value||e?.text||``).trim()}return On(t)?t.value.trim():``}function tn(){let e=document.querySelector(`.SubmitButton-TextContainer`)?.closest(`button`);if(e instanceof HTMLButtonElement&&z(e)&&!e.disabled&&nn(e))return e;let t=document.querySelector(`.SubmitButton-IconContainer`)?.closest(`button`);return t instanceof HTMLButtonElement&&z(t)&&!an(t)?t:Array.from(document.querySelectorAll(`button[type="submit"], button`)).filter(z).filter(e=>!e.disabled&&!an(e)).map(e=>({button:e,score:rn(e)})).filter(e=>e.score>0).sort((e,t)=>t.score-e.score)[0]?.button||null}function nn(e){let t=B(e.querySelector(`.SubmitButton-Text--current[aria-hidden="false"]`)?.textContent||e.textContent||e.getAttribute(`aria-label`)||``),n=B(e.querySelector(`[data-testid="submit-button-processing-label"]`)?.textContent||``);return n&&t.includes(n)&&!t.includes(`订阅`)&&!t.includes(`subscribe`)?!1:t.includes(`订阅`)||t.includes(`subscribe`)||t.includes(`pay`)||t.includes(`支付`)||t.includes(`continue`)||t.includes(`继续`)}function rn(e){let t=B(e.textContent||e.getAttribute(`aria-label`)||``),n=String(e.className||``),r=0;return e.type===`submit`&&(r+=20),n.includes(`SubmitButton`)&&(r+=40),e.querySelector(`.SubmitButton-IconContainer`)&&(r+=30),(t.includes(`订阅`)||t.includes(`subscribe`)||t.includes(`pay`)||t.includes(`支付`)||t.includes(`continue`)||t.includes(`继续`))&&(r+=20),r}function an(e){let t=B(e.textContent||e.getAttribute(`aria-label`)||``),n=String(e.className||``);return!!(e.closest(`[data-testid="paypal-accordion-item"]`)||e.closest(`.AddressAutocomplete--clear-button-container`)||n.includes(`AddressAutocomplete--clear-button`)||t.includes(`清空`)||t.includes(`手动输入地址`)||t.includes(`manual`)||t.includes(`paypal`))}async function on(e){let t=`${e.countryCode}|${e.city}`;return Pt&&Ft===t?Pt:(Pt=await sn(e),Ft=t,Pt)}async function sn(e){let n=await t.runtime.sendMessage({type:`opx:fetch-random-address`,countryCode:e.countryCode,city:e.city});return!Mn(n)||!n.ok||!n.address?(console.warn(`${kt} address fetch failed`,n),null):(await P({lastAddress:n.address}),n.address)}async function cn(e){let t=0;return t+=pn(`#billingName`,e.fullName,!0),t+=hn(`#billingCountry`,e.countryCode,[e.countryLabel,e.countryCode]),document.querySelector(`#billingCountry`)&&await jn(550),t+=pn(`#billingAddressLine1`,e.line1,!0),t+=pn(`#billingAddressLine2`,e.line2,!0),t+=pn(`#billingLocality`,e.city,!0),t+=_n(`#billingAdministrativeArea`,e.state,[e.stateFull,e.state]),t+=pn(`#billingPostalCode`,e.postalCode,!0),t+=pn(`#phoneNumber`,e.phone,!1),t+=mn(`billing address-line1`,e.line1),t+=mn(`billing address-line2`,e.line2),t+=mn(`billing address-level2`,e.city),t+=mn(`billing postal-code`,e.postalCode),t+=vn(`billing address-level1`,e.state,[e.stateFull,e.state]),t+=gn(`billing country`,e.countryCode,[e.countryLabel,e.countryCode]),t+=xn(),t}function ln(){let e=document.querySelector(`#payment-method-accordion-item-title-paypal`),t=document.querySelector(`[data-testid="paypal-accordion-item"]`);if(e?.checked||e?.getAttribute(`aria-checked`)===`true`||t?.className.includes(`selected`))return!0;let n=un();for(let e of n)R(e);if(n.length)return!0;if(e)return dn(e),!0;for(let e of At){let t=document.querySelector(e);if(t)return R(t),!0}let r=Array.from(document.querySelectorAll(`button, label, [role="button"], [role="radio"], [data-testid], div`)).filter(z).find(e=>B(e.innerText||e.textContent).includes(`paypal`));return r?(R(r),!0):!1}function un(){let e=[`button[data-testid="paypal-accordion-item-button"]`,`[data-testid="paypal-accordion-item"] .AccordionItemHeader`,`[data-testid="paypal-accordion-item"] .AccordionItemCover-titleContainer`,`[data-testid="paypal-accordion-item"] .PaymentMethodFormAccordionItemTitle`,`[data-testid="paypal-accordion-item"] #payment-method-label-paypal`,`[data-testid="paypal-accordion-item"] .AccordionItemCover`,`[data-testid="paypal-accordion-item"]`,`#payment-method-accordion-item-title-paypal`],t=new Set,n=[];for(let r of e){let e=document.querySelector(r);!e||t.has(e)||(t.add(e),n.push(e))}return n}function dn(e){e.checked=!0,e.setAttribute(`aria-checked`,`true`),e.dispatchEvent(new Event(`input`,{bubbles:!0})),e.dispatchEvent(new Event(`change`,{bubbles:!0})),R(e)}function fn(){for(let e of[450,1100,2100])window.setTimeout(()=>{let e=document.querySelector(`#payment-method-accordion-item-title-paypal`),t=document.querySelector(`[data-testid="paypal-accordion-item"]`);if(e?.checked||e?.getAttribute(`aria-checked`)===`true`||t?.className.includes(`selected`))return;let n=un();for(let e of n)R(e)},e)}function pn(e,t,n){if(!t)return 0;let r=document.querySelector(e);return!On(r)||!z(r)||Dn(r)||!n&&r.value.trim()||r.value===t?0:(bn(r,t),1)}function mn(e,t){let n=`input[autocomplete="${An(e)}"], textarea[autocomplete="${An(e)}"]`,r=document.querySelector(n);return!On(r)||!z(r)||r.value===t||Dn(r)?0:(bn(r,t),1)}function hn(e,t,n){let r=document.querySelector(e);return!kn(r)||!z(r)?0:yn(r,t,n)}function gn(e,t,n){let r=document.querySelector(`select[autocomplete="${An(e)}"]`);return!kn(r)||!z(r)?0:yn(r,t,n)}function _n(e,t,n){let r=document.querySelector(e);return kn(r)?z(r)?yn(r,t,n):0:On(r)?pn(e,t,!0):0}function vn(e,t,n){let r=document.querySelector(`select[autocomplete="${An(e)}"]`);return kn(r)?z(r)?yn(r,t,n):0:mn(e,t||n[0]||``)}function yn(e,t,n){let r=Array.from(e.options).filter(e=>!e.disabled&&e.value),i=B(t),a=n.map(e=>B(e)).filter(Boolean),o=r.find(e=>B(e.value)===i)||r.find(e=>a.some(t=>B(`${e.text} ${e.value}`).includes(t)));return!o||e.value===o.value?0:(e.value=o.value,Sn(e),1)}function bn(e,t){let n=e instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,r=Object.getOwnPropertyDescriptor(n,`value`);r?.set?r.set.call(e,t):e.value=t,Sn(e)}function xn(){let e=0,t=Array.from(document.querySelectorAll(`input[type="checkbox"]`)).filter(z).filter(e=>!e.checked).filter(e=>{let t=B([e.id,e.name,e.getAttribute(`aria-label`),e.closest(`label`)?.textContent,e.parentElement?.textContent].join(` `));return t.includes(`terms`)||t.includes(`consent`)||t.includes(`使用条款`)||t.includes(`隐私政策`)||t.includes(`取消`)||e.id===`termsOfServiceConsentCheckbox`});for(let n of t)n.click(),e+=1;return e}function Sn(e){e.dispatchEvent(new Event(`input`,{bubbles:!0})),e.dispatchEvent(new Event(`change`,{bubbles:!0})),e.dispatchEvent(new Event(`blur`,{bubbles:!0}))}function R(e){e.scrollIntoView({block:`center`,inline:`center`}),e.focus?.(),e.click(),Cn(e);for(let t of[`pointerdown`,`mousedown`,`pointerup`,`mouseup`,`click`]){let n=t.startsWith(`pointer`)?PointerEvent:MouseEvent;e.dispatchEvent(new n(t,{bubbles:!0,cancelable:!0,composed:!0,button:0,buttons:+!!t.endsWith(`down`),pointerId:1,pointerType:`mouse`}))}e.click()}function Cn(e){let t=e.getBoundingClientRect();if(t.width<=0||t.height<=0)return;let n=t.left+t.width/2,r=t.top+t.height/2,i=document.elementFromPoint(n,r);!(i instanceof HTMLElement)||i===e||(i.dispatchEvent(new MouseEvent(`mousedown`,{bubbles:!0,cancelable:!0,clientX:n,clientY:r,button:0})),i.dispatchEvent(new MouseEvent(`mouseup`,{bubbles:!0,cancelable:!0,clientX:n,clientY:r,button:0})),i.click())}function wn(){new MutationObserver(()=>En(250)).observe(document.documentElement,{childList:!0,subtree:!0})}function Tn(){t.storage.onChanged.addListener((e,t)=>{t===`local`&&Object.keys(e).some(e=>e.includes(`settings`))&&(Pt=null,Ft=``,En(100))})}function En(e){Nt&&window.clearTimeout(Nt),Nt=window.setTimeout(()=>{Nt=null,Ht()},e)}function z(e){let t=e;if(`disabled`in t&&t.disabled)return!1;let n=window.getComputedStyle(t),r=t.getBoundingClientRect();return n.visibility!==`hidden`&&n.display!==`none`&&r.width>0&&r.height>0}function Dn(e){let t=B([e.getAttribute(`aria-label`),e.getAttribute(`placeholder`),e.getAttribute(`autocomplete`),e.getAttribute(`name`),e.getAttribute(`id`)].join(` `));return[`cc-number`,`card number`,`credit card`,`security code`,`cvc`,`cvv`,`expiry`,`expiration`].some(e=>t.includes(e))}function On(e){return!!(e&&(e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement))}function kn(e){return!!(e&&e instanceof HTMLSelectElement)}function B(e){return String(e||``).replace(/\s+/g,` `).trim().toLowerCase()}function An(e){return typeof CSS<`u`&&typeof CSS.escape==`function`?CSS.escape(e):e.replace(/"/g,`\\"`)}function jn(e){return new Promise(t=>window.setTimeout(t,e))}function Mn(e){return!!(e&&typeof e==`object`&&typeof e.ok==`boolean`&&typeof e.message==`string`)}var Nn=8,Pn=4,Fn=new Set([`data`,`message`,`msg`,`content`,`text`,`body`,`sms`,`otp`,`code`,`verifycode`,`verificationcode`,`captcha`,`result`,`value`]),In=new Set([`status`,`statuscode`,`httpstatus`,`ret`,`errno`,`errorcode`]),Ln=/^(no\s*message|no\s*sms|empty|none|null|暂无|没有|未收到)$/i,Rn=/^(ok|success|successful|true|请求成功|成功)$/i;function zn(e){let t=[],n=[],r=new Set;return e.split(/\r?\n/).map(e=>e.trim()).filter(Boolean).forEach((e,i)=>{let a=e.indexOf(`----`);if(a<0){n.push(`第 ${i+1} 行缺少 ---- 分隔符`);return}let o=e.slice(0,a).trim(),s=e.slice(a+4).trim();if(!o||!s){n.push(`第 ${i+1} 行号码或 API 链接为空`);return}if(!Qn(s)){n.push(`第 ${i+1} 行 API 链接不是 http/https 地址`);return}let c=`${o}\n${s}`;r.has(c)||(r.add(c),t.push({id:$n(o,s),phone:o,url:s}))}),{targets:t,errors:n}}function Bn(e){let t=e.trim();return!t||Ln.test(t)?``:t.match(RegExp(`\\b\\d{${Pn},${Nn}}\\b`,`g`))?.[0]||``}function Vn(e){let t=Hn(e),n=t.map(e=>({...e,code:Bn(e.text)})).filter(e=>e.text&&!Gn(e.text)&&!Kn(e.text)).sort((e,t)=>Un(t)-Un(e))[0];return n?.code?{code:n.code,message:n.text}:{code:``,message:t.map(e=>e.text).find(e=>e&&!Gn(e)&&!Kn(e))||``}}function Hn(e){let t=[],n=new WeakSet;return r(e,``,0),t;function r(e,t,o){if(!(e==null||o>6)){if(typeof e==`string`){i(e,t,o),a(e,t,o);return}if(typeof e==`number`){Xn(t)&&i(String(e),t,o);return}if(typeof e==`object`&&!n.has(e)){if(n.add(e),Array.isArray(e)){e.forEach((e,n)=>r(e,t||String(n),o+1));return}for(let[t,n]of Object.entries(e))Yn(t)||r(n,t,o+1)}}}function i(e,n,r){let i=e.trim();!i||i.length>600||Yn(n)||t.push({text:i,key:n,depth:r,fromPreferredField:Jn(n)})}function a(e,t,n){let i=e.trim();if(!(!i||!/^[{[]/.test(i)))try{r(JSON.parse(i),t,n+1)}catch{}}}function Un(e){let t=0;return e.code&&(t+=100),e.fromPreferredField&&(t+=30),Wn(e.text)&&(t+=20),Xn(e.key)&&(t+=10),qn(e.text)&&(t-=8),t-=e.depth,t}function Wn(e){return/code|验证码|驗證碼|verify|verification|security|otp|paypal|openai|chatgpt/i.test(e)}function Gn(e){return Ln.test(e.trim())}function Kn(e){return Rn.test(e.trim())}function qn(e){return/^[{[]/.test(e.trim())}function Jn(e){return Fn.has(Zn(e))}function Yn(e){return In.has(Zn(e))}function Xn(e){let t=Zn(e);return t===`otp`||t===`smscode`||t===`verifycode`||t===`verificationcode`||t===`captcha`}function Zn(e){return e.toLowerCase().replace(/[^a-z0-9]/g,``)}function Qn(e){try{let t=new URL(e);return t.protocol===`http:`||t.protocol===`https:`}catch{return!1}}function $n(e,t){return`${e}|${t}`}async function er(e){let n;try{n=await t.runtime.sendMessage({type:`opx:fetch-sms-relay`,url:e.url})}catch(t){return{kind:`error`,target:e,message:`请求失败：${nr(t)}`}}if(!tr(n)||!n.ok)return{kind:`error`,target:e,message:n?.message||`API 返回结果无效`};let r=Vn({raw:n.raw,data:n.data,text:n.text,message:n.message}),i=r.message,a=r.code;return a?{kind:`code`,target:e,code:a,message:i}:{kind:`empty`,target:e,message:i||n.data||n.message||`暂无短信`}}function tr(e){return!!(e&&typeof e==`object`&&typeof e.ok==`boolean`&&typeof e.message==`string`)}function nr(e){return e instanceof Error?e.message:String(e)}var V=`[OPX PayPal Autofill]`,rr=`opx.paypal.autofill.address`,ir=`opx.paypal.autofill.pendingManual`,ar=`opx.paypal.guest.email`,or=`opx.paypal.signup.password`,sr=`data-opx-paypal-filled`,cr=`opx-paypal-random-fill`,lr=40,ur={AR:`Argentina`,AU:`Australia`,CA:`Canada`,CN:`China`,DE:`Germany`,ES:`Spain`,FR:`France`,GB:`United Kingdom`,HK:`Hong Kong`,IT:`Italy`,JP:`Japan`,KR:`South Korea`,MY:`Malaysia`,NL:`Netherlands`,PH:`Philippines`,RU:`Russia`,SG:`Singapore`,TH:`Thailand`,TR:`Turkey`,TW:`Taiwan`,US:`United States`,VN:`Vietnam`},dr=!1,fr=!1,pr=null,H=null,U=null,mr=``,hr=0,gr=``,_r=null,vr=!1,yr=null,br=!1,xr=!1,Sr=0,Cr=null,wr=!1,Tr=null,Er=0,Dr=!1,Or=!1;function kr(){if(!(dr||!Yi())){if(dr=!0,Ai(),Pi(1200),ji(),Xi()){Oi(),ki(1600);return}if(Zi()){Ei(),Di(1200);return}Qi()||(gi(),Ti(),hi(),Ri(),Hi()?Li(900):K(800))}}async function Ar(){if(!(vr||!Zi())){vr=!0;try{let e=$i(),t=document.querySelector(`input#email[name="login_email"], input#email[type="email"]`);if(t&&J(t)){fi(t,e),await Ca(1200);let n=na();if(n&&!n.disabled){n.click();return}}let n=document.querySelector(`input#login_email[name="login_email"], input#login_email[type="email"]`);if(n&&J(n)){fi(n,e),await Ca(1200);let t=ra();t&&!t.disabled&&t.click()}}catch(e){console.warn(`${V} pay email flow failed`,e)}finally{vr=!1}}}async function jr(){if(!(br||!Xi())){br=!0;try{let e=ia();if(aa(e)!==6||e.length<6||e.every(e=>e.value.trim()))return;let t=await sa();if(!t){ki(3500);return}await ca(e.slice(0,6),t),await Ca(900);let n=la();n&&!n.disabled&&J(n)&&(mi(n),Pi(2600))}catch(e){console.warn(`${V} OTP fill failed`,e)}finally{br=!1}}}async function Mr(e,t=!1,n=!0){if(!q())return{ok:!1,filled:0,message:`当前不是 PayPal 注册支付页`,countryChanged:!1};let r=await F(),i=e||await Pr(r);if(!i)return{ok:!1,filled:0,message:`没有可用地址资料`,countryChanged:!1};Wi(i),t&&!n&&Ii(),t&&(ri(),oi());let a=await Fr(i,n),o=ma();return!a.countryChanged&&(a.filled>0||o)&&(Er=Date.now()+900,Ni(1800)),ii(i,a.countryChanged,n),t&&!n&&(gr=si(i),a.countryChanged?(Vi(),Li(1600)):Ui()),{ok:a.filled>0||a.countryChanged||o,filled:a.filled,countryChanged:a.countryChanged,message:a.countryChanged?`已选择 PayPal 国家：${i.countryCode}，等待页面重新加载`:a.filled>0?`已填写 PayPal ${a.filled} 项`:`未找到可填写的 PayPal 字段`}}async function Nr(){if(!fr&&!(gr&&mr===gr)){fr=!0;try{if(!(await F()).payPalSignupEnabled){console.info(`${V} disabled`);return}let e=await Mr();if(console.info(`${V} ${e.message}`),ai()&&pa()){U?.disconnect(),U=null;return}e.ok||K(1200)}catch(e){console.warn(`${V} failed`,e)}finally{fr=!1}}}async function Pr(e){if(H&&Gi(H,e))return H;let n=Bi();if(n&&Gi(n,e))return H=n,H;let r=await t.runtime.sendMessage({type:`opx:fetch-random-address`,countryCode:e.countryCode,city:e.city});return!Ta(r)||!r.ok||!r.address?(console.warn(`${V} address fetch failed`,r),null):(H=r.address,Wi(r.address),await P({lastAddress:r.address}),H)}async function Fr(e,t){let n=0;if(!pa())return t&&K(1200),{filled:0,countryChanged:!1};if(Ir(e))return t&&K(1500),{filled:1,countryChanged:!0};let r=await Lr(e),i=await Ur(e.phone),a=ea(),o=qi(e.fullName),s=Ki(e.creditCard.expires);return n+=W(Z.email,r,!0),n+=zr(a),Br(a),n+=W(Z.phone,i,!0),n+=W(Z.cardNumber,e.creditCard.number,!0),n+=W(Z.expiry,s.short,!0),n+=W(Z.csc,e.creditCard.cvv,!0),n+=W(Z.fullName,e.fullName,!0),n+=W(Z.firstName,o.first,!0),n+=W(Z.lastName,o.last,!0),n+=W(Z.address1,e.line1,!0),n+=W(Z.address2,e.line2,!0),n+=W(Z.city,e.city,!0),n+=Vr(Z.state,e.state,[e.stateFull,e.state]),n+=W(Z.postalCode,e.postalCode,!0),n+=Hr(e,o),n+=Vr(Z.expiryMonth,s.month,[s.month]),n+=Vr(Z.expiryYear,s.year4,[s.year4,s.year2]),{filled:n,countryChanged:!1}}function Ir(e){let t=Yr(Z.country);return!t||!J(t)?!1:di(t,e.countryCode,[e.countryCode,ur[e.countryCode]||``,e.countryLabel])}async function Lr(e){let t=await qe(),n=Ce(t.rawInput);return n.ok&&va(n.email)?n.email:va(t.email)?t.email:va(e.identity.temporaryMail)?e.identity.temporaryMail:Ji(e)}function W(e,t,n){if(!t)return 0;let r=G(e);return!r||!J(r)?0:Rr(r,t,n)}function Rr(e,t,n){if(!t||!J(e))return 0;let r=e.value.trim();return e.getAttribute(sr)===`1`||ci(r,t)?(e.setAttribute(sr,`1`),0):!n&&r?0:(fi(e,t),e.setAttribute(sr,`1`),1)}function zr(e){if(!e)return 0;let t=document.querySelector(`input#password`)||G(Z.password);return!t||!J(t)||ci(t.value.trim(),e)?0:(fi(t,e),1)}function Br(e){let t=Si();if(!t)return;zr(e);let n=`opx-paypal-password-note`,r=`当前密码：${e}`,i=document.getElementById(n);i||(i=document.createElement(`div`),i.id=n,Object.assign(i.style,{color:`#93e4bd`,fontSize:`12px`,lineHeight:`18px`,margin:`4px 0 10px`,padding:`6px 10px`,border:`1px solid rgba(47, 209, 124, 0.36)`,borderRadius:`6px`,background:`rgba(15, 23, 42, 0.82)`,display:`block`}));let a=t.parentElement;a&&(a.insertBefore(i,t),i.textContent=r)}function Vr(e,t,n){if(!t&&!n.some(Boolean))return 0;let r=Yr(e);return r&&J(r)?+!!di(r,t,n):W(e,t||n.find(Boolean)||``,!0)}function Hr(e,t){let n=qr();if(!n)return 0;let r=Array.from(n.querySelectorAll(`input, textarea, select`)).filter(e=>(Y(e)||_a(e))&&J(e)&&!ha(e)&&!ga(e)),i=0;return i+=Gr(n,[`first name`,`given name`],t.first,r[0]),i+=Gr(n,[`last name`,`family name`,`surname`],t.last,r[1]),i+=Gr(n,[`street address`,`address line 1`,`address 1`],e.line1,r[2]),i+=Gr(n,[`apt`,`ste`,`bldg`,`address line 2`,`address 2`],e.line2,r[3]),i+=Gr(n,[`city`,`locality`],e.city,r[4]),i+=Kr(n,[`state`,`province`,`region`],e.state,[e.stateFull,e.state],r[5]),i+=Gr(n,[`zip`,`postal code`,`postcode`],e.postalCode,r[6]),i}async function Ur(e){try{let t=((await Ze()).rawInput.split(/\r?\n/).map(e=>e.trim()).find(Boolean)||``).split(`----`)[0]?.trim();return Wr(t)||e}catch{return e}}function Wr(e){let t=String(e||``).replace(/\D/g,``);return t.length===11&&t.startsWith(`1`)?t.slice(1):t||String(e||``).trim()}function Gr(e,t,n,r){let i=r&&Y(r)?r:null,a=Jr(e,t,Y)||i;return a?Rr(a,n,!0):0}function Kr(e,t,n,r,i){let a=i&&_a(i)?i:null,o=Jr(e,t,_a)||a;if(o)return+!!di(o,n,r);let s=i&&Y(i)?i:null,c=Jr(e,t,Y)||s;return c?Rr(c,n||r.find(Boolean)||``,!0):0}function qr(){return Array.from(document.querySelectorAll(`fieldset, [role="group"], section, form > div`)).find(e=>{let t=X(e.textContent||``);return t.includes(`billing address`)&&(t.includes(`street address`)||t.includes(`address`))&&(t.includes(`first name`)||t.includes(`last name`))})||null}function Jr(e,t,n){let r=t.map(X).filter(Boolean);return Array.from(e.querySelectorAll(`input, textarea, select`)).filter(n).map(e=>({control:e,score:$r(e,r)})).filter(e=>e.score>0&&J(e.control)&&!ha(e.control)).sort((e,t)=>t.score-e.score)[0]?.control||null}function G(e){for(let t of e){let e=Xr(t);if(Y(e))return e}return Qr(e,Y)}function Yr(e){for(let t of e){let e=Xr(t);if(_a(e))return e}return Qr(e,_a)}function Xr(e){if(!Zr(e))return null;try{return document.querySelector(e)}catch{return null}}function Zr(e){let t=e.trim();return/^[.#[]/.test(t)||/^(input|select|textarea|button|label|form|fieldset|section|div)([#.[\s:]|$)/i.test(t)}function Qr(e,t){let n=e.filter(e=>!e.includes(`[`)&&!e.includes(`#`)&&!e.includes(`.`)).map(X).filter(Boolean);return n.length&&Array.from(document.querySelectorAll(`input, textarea, select`)).filter(t).map(e=>({control:e,score:$r(e,n)})).filter(e=>e.score>0&&J(e.control)&&!ha(e.control)).sort((e,t)=>t.score-e.score)[0]?.control||null}function $r(e,t){if(!J(e)||ha(e))return 0;let n=X([e.id,e.name,`placeholder`in e?e.placeholder:``,`autocomplete`in e?e.autocomplete:``,e.getAttribute(`aria-label`),ei(e),ti(e)].join(` `)),r=X([e.previousElementSibling?.textContent,e.nextElementSibling?.textContent,ni(e)].join(` `)),i=X(e.parentElement?.textContent||``);return t.some(e=>n.includes(e))?30:t.some(e=>r.includes(e))?20:i.length<=120&&t.some(e=>i.includes(e))?5:0}function ei(e){let t=[],n=e.getAttribute(`aria-labelledby`);if(n)for(let e of n.split(/\s+/)){let n=document.getElementById(e);n?.textContent&&t.push(n.textContent)}let r=e.id;if(r)for(let e of Array.from(document.querySelectorAll(`label[for="${ui(r)}"]`)))t.push(e.textContent||``);return t.join(` `)}function ti(e){return e.closest(`label`)?.textContent||``}function ni(e){let t=e.closest(`div, label, section`)?.textContent||``;return t.length<=160?t:``}function ri(){for(let e of Array.from(document.querySelectorAll(`[${sr}]`)))e.removeAttribute(sr)}function ii(e,t,n){let r=si(e);mr!==r&&(mr=r,hr=0),hr+=1,n&&!t&&hr<lr&&K(1200)}function ai(){return!!(mr&&hr>=lr)}function oi(){mr=``,hr=0,gr=``}function si(e){return[location.origin,location.pathname,new URLSearchParams(location.search).get(`token`)||``,e.id].join(`|`)}function ci(e,t){return!e||!t?!1:e===t?!0:li(e)===li(t)}function li(e){return e.toLowerCase().replace(/[^a-z0-9]/g,``)}function ui(e){return typeof CSS<`u`&&typeof CSS.escape==`function`?CSS.escape(e):e.replace(/"/g,`\\"`)}function di(e,t,n){let r=X(t),i=n.map(X).filter(Boolean),a=Array.from(e.options).filter(e=>!e.disabled&&e.value),o=a.find(e=>X(e.value)===r)||a.find(e=>i.some(t=>X(`${e.text} ${e.value}`).includes(t)));return!o||e.value===o.value?!1:(e.value=o.value,pi(e),!0)}function fi(e,t){e.focus();let n=e instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,r=Object.getOwnPropertyDescriptor(n,`value`);r?.set?r.set.call(e,t):e.value=t,pi(e)}function pi(e){e.dispatchEvent(new Event(`input`,{bubbles:!0})),e.dispatchEvent(new Event(`change`,{bubbles:!0})),e.dispatchEvent(new Event(`blur`,{bubbles:!0}))}function mi(e){e.scrollIntoView({block:`center`,inline:`center`}),e.focus?.(),e.click();let t=e.getBoundingClientRect(),n=t.left+t.width/2,r=t.top+t.height/2,i=t.width>0&&t.height>0?document.elementFromPoint(n,r):null;i instanceof HTMLElement&&i!==e&&(i.focus?.(),i.click());for(let t of[`pointerdown`,`mousedown`,`pointerup`,`mouseup`,`click`]){let a=t.startsWith(`pointer`)?PointerEvent:MouseEvent;e.dispatchEvent(new a(t,{bubbles:!0,cancelable:!0,composed:!0,button:0,buttons:+!!t.endsWith(`down`),clientX:n,clientY:r,pointerId:1,pointerType:`mouse`})),i instanceof HTMLElement&&i!==e&&i.dispatchEvent(new a(t,{bubbles:!0,cancelable:!0,composed:!0,button:0,buttons:+!!t.endsWith(`down`),clientX:n,clientY:r,pointerId:1,pointerType:`mouse`}))}e.click()}function hi(){U?.disconnect(),U=new MutationObserver(()=>{gi(),!(gr&&mr===gr)&&(ai()||K(350))}),U.observe(document.documentElement,{childList:!0,subtree:!0})}function gi(){if(!q()||document.getElementById(cr))return;let e=xi(),t=bi(),n=_i();if(e?.parentElement){n.style.marginTop=`8px`,n.style.marginBottom=`12px`,e.parentElement.insertBefore(n,e.nextSibling);return}t?.parentElement&&t.parentElement.insertBefore(n,t)}function _i(){let e=document.createElement(`div`);e.id=cr,e.setAttribute(`data-opx-paypal-random-fill`,`1`),Object.assign(e.style,{display:`flex`,alignItems:`center`,justifyContent:`flex-end`,gap:`8px`,margin:`10px 0 14px`,minHeight:`32px`});let t=document.createElement(`button`);t.type=`button`,t.textContent=`随机输入`,Object.assign(t.style,{appearance:`none`,border:`0`,borderRadius:`6px`,background:`#10b981`,color:`#ffffff`,cursor:`pointer`,fontSize:`13px`,fontWeight:`700`,lineHeight:`1`,minHeight:`32px`,padding:`0 14px`,whiteSpace:`nowrap`});let n=document.createElement(`span`);return Object.assign(n.style,{color:`#64748b`,fontSize:`12px`,lineHeight:`16px`,minWidth:`0`}),t.addEventListener(`click`,()=>{vi(t,n)}),e.append(t,n),e}async function vi(e,t){e.disabled=!0,e.textContent=`获取中...`,Object.assign(e.style,{cursor:`wait`,opacity:`0.72`}),t.textContent=`正在获取新资料`;try{let e=await yi();if(!e){t.textContent=`获取失败`;return}let n=await Mr(e,!0,!1);t.textContent=n.countryChanged?`已切换国家，刷新后继续填写`:n.ok?`已随机输入 ${n.filled} 项`:n.message}catch(e){t.textContent=`失败：${wa(e)}`}finally{e.disabled=!1,e.textContent=`随机输入`,Object.assign(e.style,{cursor:`pointer`,opacity:`1`})}}async function yi(){let e=await F(),n=await t.runtime.sendMessage({type:`opx:fetch-random-address`,countryCode:e.countryCode,city:e.city});return!Ta(n)||!n.ok||!n.address?(console.warn(`${V} fresh address fetch failed`,n),null):(H=n.address,Wi(n.address),await P({lastAddress:n.address}),n.address)}function bi(){let e=G(Z.cardNumber);return e?.closest(`div, label, section`)||e}function xi(){let e=document.querySelector(`div.css-ltr-cssveg > form > section.css-ltr-4jicje:nth-of-type(1) > p.css-ltr-6pd54h.css-ltr-16jt5za-text_body`);return e&&J(e)?e:Array.from(document.querySelectorAll(`form section p, form p`)).filter(e=>J(e)).map(e=>({element:e,score:wi(e)})).filter(e=>e.score>0).sort((e,t)=>t.score-e.score)[0]?.element||null}function Si(){let e=document.querySelector(`section.css-ltr-h5yxuz:nth-of-type(3) > div.css-ltr-h5yxuz:nth-of-type(2) > div.css-ltr-1lvkl1r:nth-of-type(2) > p.css-ltr-abbmt5:nth-of-type(1)`);if(e&&J(e))return e;let t=document.querySelector(`input#password`)||G(Z.password),n=t?.closest(`section`)||document;return Array.from(n.querySelectorAll(`p`)).filter(e=>J(e)).map(e=>({element:e,score:Ci(e,t)})).filter(e=>e.score>0).sort((e,t)=>t.score-e.score)[0]?.element||null}function Ci(e,t){let n=X(e.textContent||``);return!n||![`by creating an account`,`confirm you’re at least 18 years old`,`confirm you're at least 18 years old`,`agree to the`,`privacy statement`].some(e=>n.includes(X(e)))?0:t&&t.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING?20:10}function wi(e){let t=X(e.textContent||``);return t&&[`we don’t share your financial details with the merchant`,`we don't share your financial details with the merchant`,`financial details`,`merchant`].some(e=>t.includes(X(e)))?10:0}function Ti(){t.storage.onChanged.addListener((e,t)=>{t===`local`&&Object.keys(e).some(e=>e.includes(`settings`))&&(H=null,oi(),K(100))})}function K(e){Ii(),pr=window.setTimeout(()=>{pr=null,Nr()},e)}function Ei(){U?.disconnect(),U=new MutationObserver(()=>Di(900)),U.observe(document.documentElement,{childList:!0,subtree:!0})}function Di(e){_r&&window.clearTimeout(_r),_r=window.setTimeout(()=>{_r=null,Ar()},e)}function Oi(){U?.disconnect(),U=new MutationObserver(()=>ki(1200)),U.observe(document.documentElement,{childList:!0,subtree:!0})}function ki(e){yr&&window.clearTimeout(yr),yr=window.setTimeout(()=>{yr=null,jr()},e)}function Ai(){new MutationObserver(()=>{Pi(900),Xi()&&ki(1200),Er>0&&Ni(1400)}).observe(document.documentElement,{childList:!0,subtree:!0})}function ji(){Cr||=window.setInterval(()=>{if(xr&&!da()){Mi();return}Pi(0)},1800)}function Mi(){Cr&&=(window.clearInterval(Cr),null)}function Ni(e){wr||(Tr&&window.clearTimeout(Tr),Tr=window.setTimeout(()=>{if(Tr=null,!fa())return;let e=ua();!e||e.disabled||!J(e)||(wr=!0,mi(e))},e))}function Pi(e){xr&&!da()||window.setTimeout(()=>{let e=da();if(!e||e.disabled){Sr+=1,Sr<80&&Pi(1400);return}xr=!0,mi(e),e.form?.requestSubmit?.(e);let t=e.closest(`[data-ppui-info^="grid"], .hagrid-1kgc7wn-row, .hagrid-zwblip-row`);t&&mi(t),Fi(),window.setTimeout(()=>{da()?(xr=!1,Pi(900)):Mi()},2500)},e)}function Fi(){t.runtime.sendMessage({type:`opx:close-incognito-window`,delayMs:25e3}).catch(()=>{})}function Ii(){pr&&=(window.clearTimeout(pr),null)}function Li(e){window.setTimeout(()=>{let e=Bi();if(!e){Ui();return}Mr(e,!0,!1)},e)}function Ri(){Dr||(Dr=!0,window.setTimeout(()=>{zi(!0)},5e3))}async function zi(e){if(!(Or||!q())){Or=!0;try{let t=await yi();if(!t){e&&window.setTimeout(()=>void zi(!1),2500);return}await Mr(t,!0,!0),window.setTimeout(()=>{e&&!ma()&&(ri(),oi(),zi(!1))},3500)}catch(e){console.warn(`${V} delayed fresh fill failed`,e)}finally{Or=!1}}}function Bi(){try{let e=sessionStorage.getItem(rr);return e?JSON.parse(e):null}catch{return null}}function Vi(){try{sessionStorage.setItem(ir,`1`)}catch{}}function Hi(){try{let e=sessionStorage.getItem(ir)===`1`;return e&&sessionStorage.removeItem(ir),e}catch{return!1}}function Ui(){try{sessionStorage.removeItem(ir)}catch{}}function Wi(e){try{sessionStorage.setItem(rr,JSON.stringify(e))}catch{}}function Gi(e,t){let n=t.countryCode===`RANDOM`||e.countryCode===t.countryCode,r=!t.city.trim()||X(e.city)===X(t.city);return n&&r}function Ki(e){let t=e.match(/\d+/g)||[],n=(t[0]||``).padStart(2,`0`).slice(0,2),r=t[1]||``,i=r.length===2?`20${r}`:r.slice(0,4),a=i.slice(-2);return{month:n,year2:a,year4:i,short:n&&a?`${n}/${a}`:e}}function qi(e){let t=e.replace(/[^a-zA-Z]/g,``);if(t&&!e.includes(` `))return{first:t.slice(0,Math.max(1,Math.floor(t.length/2))),last:t.slice(Math.max(1,Math.floor(t.length/2)))||t};let n=e.split(/\s+/).map(e=>e.trim()).filter(Boolean);return{first:n[0]||t||`Alex`,last:n.slice(1).join(` `)||`Walker`}}function Ji(e){return`${(e.identity.username||e.fullName||`outlookuser`).toLowerCase().replace(/[^a-z0-9]/g,``).slice(0,18)||`outlookuser`}${(e.id+e.fetchedAt).replace(/\D/g,``).slice(-6)||String(Date.now()).slice(-6)}@outlook.com`}function Yi(){return q()||Zi()||Xi()||Qi()}function Xi(){return location.hostname.endsWith(`paypal.com`)&&ia().length>=4}function Zi(){return location.hostname.endsWith(`paypal.com`)&&!q()&&(location.pathname.startsWith(`/pay`)||!!document.querySelector(`input#email[name="login_email"], input#login_email[name="login_email"], button[data-testid="continueButton"]`))}function q(){return location.hostname.endsWith(`paypal.com`)&&location.pathname.startsWith(`/checkoutweb/signup`)}function Qi(){return location.hostname.endsWith(`paypal.com`)&&(location.pathname.startsWith(`/webapps/hermes`)||location.pathname.startsWith(`/checkoutnow`)||!!document.querySelector(`button#consentButton, button[data-testid="consentButton"]`))}function $i(){let e=sessionStorage.getItem(ar);if(e&&va(e))return e;let t=`ppguest${Date.now().toString(36)}${ya(4)}@gmail.com`;return sessionStorage.setItem(ar,t),t}function ea(){let e=sessionStorage.getItem(or);if(e&&ta(e))return e;let t=xa(10);return sessionStorage.setItem(or,t),t}function ta(e){return e.length>=8&&e.length<=20&&/[0-9!@#$%^]/.test(e)}function na(){let e=document.querySelector(`button[data-atomic-wait-task="login_create_account"][data-atomic-wait-viewname="email"]`);return e&&J(e)?e:Array.from(document.querySelectorAll(`button`)).find(e=>{let t=X(e.textContent||``);return J(e)&&(t.includes(`创建账户`)||t.includes(`create account`))})||null}function ra(){let e=document.querySelector(`button[data-testid="continueButton"]`);return e&&J(e)?e:Array.from(document.querySelectorAll(`button`)).find(e=>{let t=X(e.textContent||``);return J(e)&&(t.includes(`继续付款`)||t.includes(`continue to payment`))})||null}function ia(){return Array.from(document.querySelectorAll(`input[id^="ci-ciBasic-"], input[name^="ciBasic-"], input[type="tel"][aria-label*="-"]`)).filter(J).sort((e,t)=>oa(e)-oa(t))}function aa(e){let t=e.map(e=>{let t=`${e.getAttribute(`aria-label`)||``} ${e.name} ${e.id}`,n=/-\s*(\d+)/.exec(t);if(n)return Number(n[1]);let r=/ciBasic-(\d+)/.exec(t);return r?Number(r[1])+1:0}).filter(e=>Number.isFinite(e)&&e>0);return X(document.body.textContent||``).includes(`6-digit code`)?6:Math.max(0,...t)}function oa(e){let t=`${e.name} ${e.id} ${e.getAttribute(`aria-label`)||``}`,n=/(\d+)(?:-\d+)?/.exec(t);return n?Number(n[1]):0}async function sa(){let e=zn((await Ze()).rawInput).targets[0];if(!e)return``;let t=await er(e);if(t.kind!==`code`)return``;let n=t.code.replace(/\D/g,``);return n.length===6?n:``}async function ca(e,t){let n=t.replace(/\D/g,``);if(!(n.length!==6||e.length<6))for(let t=0;t<6;t+=1)fi(e[t],n[t]),await Ca(220)}function la(){let e=Array.from(document.querySelectorAll(`button[type="submit"], button`)).filter(J);return e.find(e=>{let t=X(e.textContent||e.getAttribute(`aria-label`)||``);return t.includes(`继续`)||t.includes(`continue`)||t.includes(`verify`)||t.includes(`确认`)||t.includes(`submit`)})||e.find(e=>!e.disabled)||null}function ua(){let e=document.querySelector(`button[data-testid="submit-button"][data-atomic-wait-task="review_your_payment"], button[data-testid="submit-button"]`);return e&&J(e)?e:Array.from(document.querySelectorAll(`button[type="submit"], button`)).find(e=>{let t=X(e.textContent||e.getAttribute(`aria-label`)||``);return J(e)&&!e.disabled&&(t.includes(`agree & create account`)||t.includes(`agree and create account`)||t.includes(`create account`)||t.includes(`创建账户`))})||null}function da(){return document.querySelector(`button#consentButton, button[data-testid="consentButton"]`)||document.querySelector(`[data-ppui-info^="grid"] button[data-testid="consentButton"]`)||Array.from(document.querySelectorAll(`button`)).find(e=>{let t=X(e.textContent||``);return!e.disabled&&(t.includes(`agree and continue`)||t.includes(`同意并继续`))})||null}function fa(){if(!q()||Date.now()<Er)return!1;let e=ua();return!e||!J(e)?!1:ma()}function pa(){return q()?[Z.email,Z.password,Z.phone,Z.cardNumber,Z.firstName,Z.address1,Z.postalCode].some(e=>{let t=G(e);return!!(t&&J(t))})||!!Yr(Z.country):!1}function ma(){let e=[Z.email,Z.password,Z.phone,Z.cardNumber,Z.expiry,Z.csc,Z.firstName,Z.lastName,Z.address1,Z.city,Z.postalCode].filter(e=>{let t=G(e);return t&&J(t)&&!!t.value.trim()}).length,t=Yr(Z.state)||G(Z.state),n=Yr(Z.country),r=!t||!J(t)||!!(`value`in t&&String(t.value||``).trim()),i=!n||!J(n)||!!n.value.trim();return e>=9&&r&&i}function ha(e){return e instanceof HTMLSelectElement||e instanceof HTMLTextAreaElement?!1:[`hidden`,`radio`,`checkbox`,`submit`,`button`].includes((e.type||``).toLowerCase())}function ga(e){let t=X([e.id,e.name,`placeholder`in e?e.placeholder:``,`autocomplete`in e?e.autocomplete:``,e.getAttribute(`aria-label`),ei(e)].join(` `));return[`email`,`phone`,`mobile`,`card`,`credit`,`expiry`,`expiration`,`cvv`,`csc`,`security code`].some(e=>t.includes(e))}function J(e){let t=e;if(`disabled`in t&&t.disabled)return!1;let n=window.getComputedStyle(t),r=t.getBoundingClientRect();return n.visibility!==`hidden`&&n.display!==`none`&&r.width>0&&r.height>0}function Y(e){return!!(e&&(e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement))}function _a(e){return!!(e&&e instanceof HTMLSelectElement)}function va(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}function X(e){return String(e||``).replace(/\s+/g,` `).trim().toLowerCase()}function ya(e){return Array.from({length:e},()=>String(Math.floor(Math.random()*10))).join(``)}function ba(e){return Array.from({length:e},()=>`abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`[Math.floor(Math.random()*62)]).join(``)}function xa(e){return Sa(ba(Math.min(20,Math.max(8,e))-1)+`!@#$%^`[Math.floor(Math.random()*6)]||`${`abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`[Math.floor(Math.random()*52)]}1`)}function Sa(e){let t=e.split(``);for(let e=t.length-1;e>0;--e){let n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t.join(``)}function Ca(e){return new Promise(t=>window.setTimeout(t,e))}function wa(e){return e instanceof Error?e.message:String(e)}function Ta(e){return!!(e&&typeof e==`object`&&typeof e.ok==`boolean`&&typeof e.message==`string`)}var Z={country:[`select#country`,`select[name="country"]`,`select[name="country.x"]`,`country`,`country or region`],email:[`input#email`,`input[name="email"]`,`input[type="email"]`,`input[autocomplete="email"]`,`email`],password:[`input#password`,`input[name="password"]`,`input[type="password"]`,`input[autocomplete="new-password"]`,`create password`,`password`],phone:[`input#phone`,`input#phoneNumber`,`input[name="phone"]`,`input[name="phoneNumber"]`,`input[type="tel"]`,`phone number`,`mobile`],cardNumber:[`input#cardNumber`,`input#card_number`,`input[name="cardNumber"]`,`input[name="card_number"]`,`input[autocomplete="cc-number"]`,`card number`,`credit card number`],expiry:[`input#expiryDate`,`input#expirationDate`,`input#cardExpiry`,`input[name="expiryDate"]`,`input[name="expirationDate"]`,`input[name="cardExpiry"]`,`input[autocomplete="cc-exp"]`,`expiration`,`expiry`,`有效期限`],expiryMonth:[`select#expMonth`,`select#expiryMonth`,`select[name="expMonth"]`,`select[name="expiryMonth"]`,`expiration month`,`expiry month`],expiryYear:[`select#expYear`,`select#expiryYear`,`select[name="expYear"]`,`select[name="expiryYear"]`,`expiration year`,`expiry year`],csc:[`input#cvv`,`input#csc`,`input#securityCode`,`input[name="cvv"]`,`input[name="csc"]`,`input[name="securityCode"]`,`input[autocomplete="cc-csc"]`,`csc`,`cvv`,`security code`],fullName:[`input#cardholderName`,`input#nameOnCard`,`input#fullName`,`input[name="cardholderName"]`,`input[name="nameOnCard"]`,`input[name="fullName"]`,`input[autocomplete="cc-name"]`,`name on card`,`full name`],firstName:[`input#firstName`,`input#billingFirstName`,`input[name="firstName"]`,`input[name="billingFirstName"]`,`input[autocomplete="given-name"]`,`first name`],lastName:[`input#lastName`,`input#billingLastName`,`input[name="lastName"]`,`input[name="billingLastName"]`,`input[autocomplete="family-name"]`,`last name`],address1:[`input#address1`,`input#addressLine1`,`input#billingAddressLine1`,`input#billingLine1`,`input[name="address1"]`,`input[name="addressLine1"]`,`input[name="billingLine1"]`,`input[autocomplete="address-line1"]`,`address line 1`,`street address`],address2:[`input#address2`,`input#addressLine2`,`input#billingAddressLine2`,`input#billingLine2`,`input[name="address2"]`,`input[name="addressLine2"]`,`input[name="billingLine2"]`,`input[autocomplete="address-line2"]`,`address line 2`],city:[`input#city`,`input#billingLocality`,`input#billingCity`,`input[name="city"]`,`input[name="billingCity"]`,`input[autocomplete="address-level2"]`,`city`],state:[`select#state`,`input#state`,`select#billingAdministrativeArea`,`input#billingAdministrativeArea`,`select#billingState`,`input#billingState`,`select[name="state"]`,`input[name="state"]`,`select[name="billingState"]`,`input[name="billingState"]`,`select[autocomplete="address-level1"]`,`input[autocomplete="address-level1"]`,`state`,`province`],postalCode:[`input#zip`,`input#postalCode`,`input#billingPostalCode`,`input#billingZip`,`input[name="zip"]`,`input[name="postalCode"]`,`input[name="billingPostalCode"]`,`input[name="billingZip"]`,`input[autocomplete="postal-code"]`,`zip code`,`postal code`]};function Ea(e){let n=document.createElement(`div`);n.className=`opx-summary`;let r=Da(),i=document.createElement(`input`);i.className=`opx-input`,i.type=`text`,i.placeholder=`城市留空即随机，例如 Tokyo / Berlin / New York`,i.autocomplete=`off`;let a=document.createElement(`div`);a.className=`opx-grid`,a.append(Oa(`地址国家`,r),Oa(`指定城市`,i));let o=document.createElement(`div`);o.className=`opx-button-row opx-address-actions`;let s=ka(`获取地址`);o.append(s);let c=document.createElement(`div`);c.className=`opx-copy-list`;let l=document.createElement(`div`);l.className=`opx-status`,e.append(n,a,o,c,l),r.addEventListener(`change`,()=>void d(`国家已保存`)),i.addEventListener(`change`,()=>void d(`城市已保存`)),s.addEventListener(`click`,()=>void f());let u=async()=>{m(await F())};return u(),{update:u};async function d(e){let t=await F(),n=r.value,a=i.value.trim();m(await P({countryCode:n,city:a,lastAddress:t.countryCode!==n||t.city.trim()!==a?null:t.lastAddress})),ja(l,e,`ok`)}async function f(){s.disabled=!0,ja(l,`正在获取随机地址...`,`pending`);try{let e=await t.runtime.sendMessage({type:`opx:fetch-random-address`,countryCode:r.value,city:i.value.trim()});if(!Na(e)||!e.ok||!e.address){ja(l,e?.message||`获取地址失败`,`error`);return}m(await P({countryCode:r.value,city:i.value.trim(),lastAddress:e.address}));let n=await p(e.address);ja(l,n?`地址已获取并保存；${n}`:`地址已获取并保存`,`ok`)}catch(e){ja(l,`获取地址失败：${Ma(e)}`,`error`)}finally{s.disabled=!1}}async function p(e){return location.hostname===`pay.openai.com`?(await Ut(e)).message:location.hostname.endsWith(`paypal.com`)?(await Mr(e,!0,!1)).message:``}function m(e){r.value=e.countryCode,i.value=e.city,h(e),g(e.lastAddress)}function h(e){n.textContent=`${r.selectedOptions[0]?.textContent||e.countryCode} · ${e.city||`随机城市`}`}function g(e){if(c.textContent=``,!e){c.append(Aa(`暂无地址，点击“获取地址”。`));return}c.append(Aa(`已保存 ${e.countryLabel||e.countryCode} 地址，用于支付页填写。`))}}function Da(){let e=document.createElement(`select`);e.className=`opx-select`;let t=document.createElement(`option`);t.value=`RANDOM`,t.textContent=`随机国家`,e.append(t);for(let t of Ot){let n=document.createElement(`option`);n.value=t.code,n.textContent=`${t.label} / ${t.code}`,e.append(n)}return e}function Oa(e,t){let n=document.createElement(`label`);n.className=`opx-field`;let r=document.createElement(`span`);return r.className=`opx-label`,r.textContent=e,n.append(r,t),n}function ka(e,t=`opx-button`){let n=document.createElement(`button`);return n.className=t,n.type=`button`,n.textContent=e,n}function Aa(e){let t=document.createElement(`div`);return t.className=`opx-empty-inline`,t.textContent=e,t}function ja(e,t,n){e.textContent=t,e.dataset.type=n}function Ma(e){return e instanceof Error?e.message:String(e)}function Na(e){return!!(e&&typeof e==`object`&&typeof e.ok==`boolean`&&typeof e.message==`string`)}var Pa=[[`ID`,`印尼 / IDR`],[`DE`,`德国 / EUR`],[`JP`,`日本 / JPY`],[`US`,`美国 / USD`]];function Fa(e){let n=document.createElement(`div`);n.className=`opx-summary`;let r=document.createElement(`div`);r.className=`opx-session-card`;let i=Ia(`邮箱`,`未读取`),a=Ia(`套餐`,`未读取`),o=Ia(`Token`,`未读取`);r.append(i.row,a.row,o.row);let s=La(`读取 ChatGPT session`,`opx-button opx-button-secondary`),c=za([[`chatgptplusplan`,`ChatGPT Plus`],[`chatgptteamplan`,`ChatGPT Team`]]),l=za([[`custom`,`短链接 / custom`],[`hosted`,`长链接 / hosted`]]),u=za(Pa),d=Ra(`Workspace 名称`,`text`),f=Ra(`席位数量`,`number`);f.min=`2`,f.step=`1`;let p=document.createElement(`div`);p.className=`opx-grid`;let m=Ba(`套餐类型`,c),h=Ba(`链接形式`,l),g=Ba(`计费区域`,u);p.append(m,h,g);let _=document.createElement(`div`);_.className=`opx-team-options`;let v=document.createElement(`div`);v.className=`opx-grid`,v.append(Ba(`Workspace`,d),Ba(`席位`,f)),_.append(v);let y=document.createElement(`textarea`);y.className=`opx-textarea opx-token-textarea`,y.placeholder=`自动读取或手动粘贴 ChatGPT session JSON / Access Token`,y.autocomplete=`off`,y.spellcheck=!1;let b=document.createElement(`div`);b.className=`opx-hint`,b.textContent=`切到提链接 tab 会读取 /api/auth/session；token 只在当前页面内使用。`;let x=La(`生成订阅链接`),S=document.createElement(`textarea`);S.className=`opx-textarea opx-output`,S.placeholder=`生成后的订阅链接`,S.readOnly=!0,S.spellcheck=!1;let C=document.createElement(`div`);C.className=`opx-button-row`;let w=La(`复制链接`,`opx-button opx-button-secondary`),T=La(`打开链接`,`opx-button opx-button-secondary`),E=La(`清空`,`opx-button opx-button-secondary`);C.append(w,T,E);let D=document.createElement(`div`);D.className=`opx-status`,D.textContent=`等待读取 ChatGPT session。`;let O=``,ee=``,te=!1,ne=!1,re=async()=>{se((await Ye()).checkoutOptions)},ie=async()=>{await oe()},ae=async()=>{try{let e=ce();await Xe({checkoutOptions:e}),le(e),Q(D,`本地参数已更新`,`ok`)}catch(e){Q(D,Va(e),`error`)}};for(let e of[c,l,u,d,f])e.addEventListener(`change`,()=>void ae()),e.addEventListener(`input`,()=>void ae());return s.addEventListener(`click`,()=>void oe()),y.addEventListener(`paste`,()=>window.setTimeout(()=>ue(!1),0)),y.addEventListener(`input`,()=>{ee=``,(y.value.includes(`accessToken`)||y.value.length>900)&&ue(!1)}),x.addEventListener(`click`,async()=>{Q(D,`正在生成订阅链接...`,`pending`);let e=y.value.trim()?ue(!0):ee;if(!e){Q(D,`没有 accessToken，请先读取 session 或手动粘贴。`,`error`);return}let n;try{n=ce(),await Xe({checkoutOptions:n})}catch(e){Q(D,Va(e),`error`);return}let r;try{r=await t.runtime.sendMessage({type:`opx:create-checkout-link`,raw:e,options:n})}catch(e){Q(D,`生成失败：${String(e)}`,`error`);return}let i=r?.link||r?.url||``;if(!Ha(r)||!r.ok||!i){Q(D,r?.message||`生成失败：返回结果无效`,`error`),de(``);return}de(i),Q(D,r.message,`ok`)}),w.addEventListener(`click`,async()=>{O&&(await navigator.clipboard.writeText(O),Q(D,`已复制链接`,`ok`))}),T.addEventListener(`click`,()=>{O&&window.open(O,`_blank`,`noopener,noreferrer`)}),E.addEventListener(`click`,()=>{y.value=``,ee=``,b.textContent=`切到提链接 tab 会读取 /api/auth/session；token 只在当前页面内使用。`,b.classList.remove(`is-ok`),de(``),fe(``,``,``),Q(D,`已清空`,`ok`),y.focus()}),e.append(n,r,s,p,_,y,b,x,Ba(`订阅链接`,S),C,D),re(),de(``),{update:re,onShow:ie};async function oe(){if(!te){te=!0,s.disabled=!0,Q(D,`正在读取 https://chatgpt.com/api/auth/session ...`,`pending`);try{let e=await t.runtime.sendMessage({type:`opx:fetch-chatgpt-session`});if(ne=!0,!Ua(e)){Q(D,`session 返回结果无效`,`error`);return}let n=e.session;fe(n?.email||``,n?.planType||``,n?.accessToken||``),n?.accessToken&&(ee=n.accessToken,y.value=n.accessToken,b.textContent=`已从 ChatGPT session 读取 accessToken。`,b.classList.add(`is-ok`)),Q(D,e.message,e.ok?`ok`:`error`)}catch(e){Q(D,`读取 session 失败：${String(e)}`,`error`)}finally{s.disabled=!1,te=!1}}}function se(e){let t=je(e);c.value=t.planName,l.value=t.uiMode,u.value=t.region,d.value=t.workspaceName,f.value=String(t.seatQuantity),le(t)}function ce(){return je({planName:c.value,uiMode:l.value,region:u.value,workspaceName:d.value,seatQuantity:Number(f.value||5)})}function le(e){let t=e.planName===`chatgptteamplan`?`Team · ${e.seatQuantity} seats`:`Plus`,r=e.uiMode===`hosted`?`长链接 hosted`:`短链接 custom`,i=ne?`session 已请求`:`session 待读取`;n.textContent=`${t} · ${r} · ${e.region} · ${i}`,_.hidden=e.planName!==`chatgptteamplan`,g.hidden=e.planName===`chatgptteamplan`}function ue(e){try{let e=Ae(y.value);return y.value.trim()!==e&&(y.value=e),b.textContent=`已本地提取 accessToken。`,b.classList.add(`is-ok`),e}catch(t){return b.classList.remove(`is-ok`),e&&Q(D,Va(t),`error`),``}}function de(e){O=e,S.value=e,w.disabled=!e,T.disabled=!e}function fe(e,t,n){i.value.textContent=e||`未读取`,a.value.textContent=t||`未读取`,o.value.textContent=n?`已获取`:`未获取`}}function Ia(e,t){let n=document.createElement(`div`);n.className=`opx-session-row`;let r=document.createElement(`span`);r.textContent=e;let i=document.createElement(`strong`);return i.textContent=t,n.append(r,i),{row:n,value:i}}function La(e,t=`opx-button`){let n=document.createElement(`button`);return n.className=t,n.type=`button`,n.textContent=e,n}function Ra(e,t){let n=document.createElement(`input`);return n.className=`opx-input`,n.type=t,n.placeholder=e,n}function za(e){let t=document.createElement(`select`);t.className=`opx-select`;for(let[n,r]of e){let e=document.createElement(`option`);e.value=n,e.textContent=r,t.append(e)}return t}function Ba(e,t){let n=document.createElement(`label`);n.className=`opx-field`;let r=document.createElement(`span`);return r.className=`opx-label`,r.textContent=e,n.append(r,t),n}function Q(e,t,n){e.textContent=t,e.dataset.type=n}function Va(e){return e instanceof Error?e.message:String(e)}function Ha(e){return!!(e&&typeof e==`object`&&typeof e.ok==`boolean`&&typeof e.message==`string`)}function Ua(e){return!!(e&&typeof e==`object`&&typeof e.ok==`boolean`&&typeof e.message==`string`)}function Wa(e,t){let n=document.createElement(`div`);n.className=`opx-hint`,n.textContent=`点击按钮会自动创建临时邮箱并填入当前注册页。`;let r=Ga(`生成邮箱并继续`),i=document.createElement(`input`);i.className=`opx-input`,i.type=`text`,i.inputMode=`numeric`,i.placeholder=`验证码`,i.autocomplete=`one-time-code`;let a=Ga(`填入验证码并继续`),o=Ga(`自动接收并填入验证码`,`opx-button opx-button-secondary`),s=Ga(`填写资料并创建`),c=document.createElement(`div`);c.className=`opx-status`,c.textContent=`等待操作`;let l=async()=>{let e=t.getPageState(),i=await t.loadState();r.disabled=!e.canFillEmail,a.disabled=!e.canFillOtp,o.disabled=!e.canFillOtp||!i.autoOtp,s.disabled=!e.canFillProfile,n.textContent=i.email?`当前临时邮箱：${i.email}`:`点击按钮会自动创建临时邮箱并填入当前注册页。`};return r.addEventListener(`click`,async()=>{qa(c,`正在生成临时邮箱...`,`pending`),Ka(c,await t.fillEmailFromInput()),await l()}),a.addEventListener(`click`,async()=>{qa(c,`正在提交验证码...`,`pending`),Ka(c,await t.fillOtp(i.value)),await l()}),o.addEventListener(`click`,async()=>{qa(c,`等待临时邮箱验证码...`,`pending`),Ka(c,await t.waitForOutlookOtp()),await l()}),s.addEventListener(`click`,async()=>{qa(c,`正在填写资料...`,`pending`),Ka(c,await t.fillProfileAndCreate()),await l()}),e.append(n,r,i,a,o,s,c),l(),{update:l}}function Ga(e,t=`opx-button`){let n=document.createElement(`button`);return n.className=t,n.type=`button`,n.textContent=e,n}function Ka(e,t){qa(e,t.message,t.ok?`ok`:`error`)}function qa(e,t,n){e.textContent=t,e.dataset.type=n}var Ja=`opx.versionCheck.state`,Ya={ignoredVersion:``,lastCheckedAt:0,latest:null};async function Xa(){return $a((await t.storage.local.get(Ja))[Ja])}async function Za(e){let n=$a({...await Xa(),...e});return await t.storage.local.set({[Ja]:n}),n}async function Qa(e){return Za({ignoredVersion:to(e)})}function $a(e){let t=no(e)?e:{};return{ignoredVersion:to(t.ignoredVersion),lastCheckedAt:Number(t.lastCheckedAt||Ya.lastCheckedAt),latest:eo(t.latest)}}function eo(e){if(!no(e))return null;let t=to(e.version),n=String(e.htmlUrl||``).trim();return!t||!n?null:{version:t,tagName:String(e.tagName||t).trim(),name:String(e.name||e.tagName||t).trim(),body:String(e.body||``).trim(),htmlUrl:n,downloadUrl:String(e.downloadUrl||n).trim(),publishedAt:String(e.publishedAt||``).trim()}}function to(e){return String(e||``).trim().replace(/^v/i,``)}function no(e){return!!(e&&typeof e==`object`)}var ro=`https://api.github.com/repos/suyancc/openai-plus-vxt/releases/latest`,io=1800*1e3;async function ao(e=!1){let n=lo(t.runtime.getManifest().version),r=await Xa();if(!e&&r.latest&&Date.now()-r.lastCheckedAt<io)return so(n,r.latest,r.ignoredVersion);try{let e=await fetch(ro,{headers:{Accept:`application/vnd.github+json`},cache:`no-store`});if(e.status===404)return await Za({latest:null,lastCheckedAt:Date.now()}),{currentVersion:n,latest:null,updateAvailable:!1,ignored:!1,error:`当前仓库还没有 GitHub Release`};if(!e.ok)throw Error(`GitHub API ${e.status}`);let t=co(await e.json());return await Za({latest:t,lastCheckedAt:Date.now()}),so(n,t,r.ignoredVersion)}catch(e){return{currentVersion:n,latest:r.latest,updateAvailable:!!(r.latest&&oo(r.latest.version,n)>0),ignored:!!(r.latest&&r.ignoredVersion===r.latest.version),error:e instanceof Error?e.message:String(e)}}}function oo(e,t){let n=lo(e).split(`.`).map(uo),r=lo(t).split(`.`).map(uo),i=Math.max(n.length,r.length);for(let e=0;e<i;e+=1){let t=(n[e]||0)-(r[e]||0);if(t!==0)return t>0?1:-1}return 0}function so(e,t,n){return{currentVersion:e,latest:t,updateAvailable:!!(t&&oo(t.version,e)>0),ignored:!!(t&&n===t.version)}}function co(e){let t=String(e.tag_name||``).trim(),n=lo(t),r=String(e.html_url||``).trim();if(!n||!r)return null;let i=e.assets?.find(e=>{let t=String(e.name||``).toLowerCase();return t.endsWith(`.zip`)&&t.includes(`chrome`)})?.browser_download_url||e.assets?.find(e=>String(e.name||``).toLowerCase().endsWith(`.zip`))?.browser_download_url;return{version:n,tagName:t,name:String(e.name||t).trim(),body:String(e.body||``).trim(),htmlUrl:r,downloadUrl:String(i||r).trim(),publishedAt:String(e.published_at||``).trim()}}function lo(e){return e.trim().replace(/^v/i,``)}function uo(e){let t=Number.parseInt(e.replace(/\D.*$/,``),10);return Number.isFinite(t)?t:0}var fo=`https://t.me/fuck_open`;function po(e={}){let n=document.createElement(`div`);n.className=`opx-settings-overlay`,n.hidden=!0;let r=document.createElement(`section`);r.className=`opx-settings-dialog`,r.setAttribute(`role`,`dialog`),r.setAttribute(`aria-modal`,`true`),r.setAttribute(`aria-label`,`插件设置`);let i=document.createElement(`div`);i.className=`opx-settings-header`;let a=document.createElement(`div`);a.className=`opx-settings-title`;let o=document.createElement(`strong`);o.textContent=`设置`;let s=document.createElement(`span`);s.className=`opx-version-badge`,s.textContent=`v${t.runtime.getManifest().version}`;let c=vo(`×`,`关闭设置`);a.append(o,s),i.append(a,c);let l=document.createElement(`input`);l.type=`checkbox`,l.className=`opx-checkbox`;let u=document.createElement(`input`);u.type=`checkbox`,u.className=`opx-checkbox`;let d=mo(l,`OpenAI 支付页自动填写`,`用于 pay.openai.com/c/pay 页面，填写姓名、国家、地址、邮编、电话并勾选条款。`),f=mo(u,`PayPal 注册页自动填写`,`用于 paypal.com/checkoutweb/signup 页面，填写国家、邮箱、卡资料、姓名、地址和密码提示。`),p=document.createElement(`div`);p.className=`opx-setting-section-title`,p.textContent=`临时邮箱`;let m=ho(`https://mail.example.com`),h=ho(`admin_auth`);h.type=`password`;let g=ho(`example.com`),_=ho(`留空则随机生成`),v=ho(`可选`);v.type=`password`;let y=document.createElement(`div`);y.className=`opx-grid`,y.append(go(`Worker 地址`,m),go(`admin_auth`,h),go(`邮箱域名`,g),go(`邮箱名称`,_),go(`x-custom-auth`,v));let b=document.createElement(`button`);b.className=`opx-external-link-button`,b.type=`button`,b.title=`立即检查 GitHub Release 最新版本`,b.textContent=`检测更新`;let x=document.createElement(`button`);x.className=`opx-external-link-button`,x.type=`button`,x.title=`打开 TG 群组`,x.append(_o(),document.createTextNode(`TG 群组：t.me/fuck_open`));let S=document.createElement(`div`);S.className=`opx-hint`,S.textContent=`国家、城市和获取地址在“地址”tab 中操作。`;let C=document.createElement(`div`);C.className=`opx-status`,r.append(i,d,f,p,y,b,x,S,C),n.append(r),c.addEventListener(`click`,T),n.addEventListener(`click`,e=>{e.target===n&&T()}),l.addEventListener(`change`,async()=>{await P({payOpenAiEnabled:l.checked}),$(C,`设置已保存`,`ok`)}),u.addEventListener(`change`,async()=>{await P({payPalSignupEnabled:u.checked}),$(C,`设置已保存`,`ok`)});for(let e of[m,h,g,_,v])e.addEventListener(`change`,()=>void E()),e.addEventListener(`blur`,()=>void E());x.addEventListener(`click`,()=>{window.open(fo,`_blank`,`noopener,noreferrer`)}),b.addEventListener(`click`,async()=>{b.disabled=!0,$(C,`正在检测 GitHub 最新版本...`,`pending`);try{let t=await ao(!0);await e.onVersionChecked?.(),t.latest&&t.updateAvailable?$(C,`发现新版本 v${t.latest.version}，顶部已显示更新提示`,`ok`):t.latest?$(C,`当前已是最新版本 v${t.currentVersion}`,`ok`):$(C,t.error||`暂未找到可用 Release`,`pending`)}catch(e){$(C,e instanceof Error?e.message:String(e),`error`)}finally{b.disabled=!1}});let w=async()=>{let e=await F(),t=await ut();l.checked=e.payOpenAiEnabled,u.checked=e.payPalSignupEnabled,m.value=t.apiBase,h.value=t.adminAuth,g.value=t.domain,_.value=t.mailboxName,v.value=t.customAuth;let n=Number(e.payOpenAiEnabled)+Number(e.payPalSignupEnabled),r=!!(t.apiBase&&t.adminAuth&&t.domain);$(C,r?`临时邮箱已配置 · 已开启 ${n} 项自动填写`:`请先配置临时邮箱 Worker、admin_auth 和域名`,r?`ok`:`pending`)};return{element:n,open:()=>{n.hidden=!1,w()},update:w};function T(){n.hidden=!0}async function E(){await dt({apiBase:m.value,adminAuth:h.value,domain:g.value,mailboxName:_.value,customAuth:v.value}),$(C,`临时邮箱设置已保存`,`ok`)}}function mo(e,t,n){let r=document.createElement(`div`);r.className=`opx-setting-item`;let i=document.createElement(`label`);i.className=`opx-check-row`;let a=document.createElement(`span`);a.textContent=t,i.append(e,a);let o=document.createElement(`div`);return o.className=`opx-setting-description`,o.textContent=n,r.append(i,o),r}function ho(e){let t=document.createElement(`input`);return t.className=`opx-input`,t.type=`text`,t.placeholder=e,t.autocomplete=`off`,t.spellcheck=!1,t}function go(e,t){let n=document.createElement(`label`);n.className=`opx-field`;let r=document.createElement(`span`);return r.textContent=e,n.append(r,t),n}function _o(){let e=document.createElementNS(`http://www.w3.org/2000/svg`,`svg`);e.classList.add(`opx-telegram-icon`),e.setAttribute(`viewBox`,`0 0 24 24`),e.setAttribute(`aria-hidden`,`true`);let t=document.createElementNS(`http://www.w3.org/2000/svg`,`path`);return t.setAttribute(`fill`,`currentColor`),t.setAttribute(`d`,`M21.9 4.3 18.7 19c-.2 1-.8 1.2-1.6.8l-4.6-3.4-2.2 2.1c-.2.2-.4.4-.9.4l.3-4.7 8.5-7.7c.4-.3-.1-.5-.6-.2L7.1 12.9 2.6 11.5c-1-.3-1-1 0-1.4L20.2 3.3c.8-.3 1.5.2 1.7 1Z`),e.append(t),e}function vo(e,t){let n=document.createElement(`button`);return n.className=`opx-icon-button`,n.type=`button`,n.textContent=e,n.title=t,n.setAttribute(`aria-label`,t),n}function $(e,t,n){e.textContent=t,e.dataset.type=n}function yo(e){let t=document.createElement(`div`);t.className=`opx-summary`;let n=document.createElement(`textarea`);n.className=`opx-textarea opx-sms-input`,n.placeholder=`+14642649811----https://xxxx.com/xxx
每行一个号码和 API 链接`,n.autocomplete=`off`,n.spellcheck=!1;let r=document.createElement(`div`);r.className=`opx-button-row opx-sms-actions`;let i=xo(`保存并开始`),a=xo(`立即获取`,`opx-button opx-button-secondary`),o=xo(`清空历史`,`opx-button opx-button-secondary`);r.append(i,a,o);let s=So(`当前号码`),c=document.createElement(`div`);c.className=`opx-sms-targets`;let l=So(`最后一次验证码`),u=document.createElement(`div`);u.className=`opx-sms-table`;let d=document.createElement(`div`);d.className=`opx-status`;let f=new Map,p=null,m=``,h=null,g=!1;e.append(t,bo(`接码信息`,n),r,s,c,l,u,d),n.addEventListener(`input`,()=>{v(),b()}),n.addEventListener(`focus`,()=>{g=!0}),n.addEventListener(`blur`,()=>{g=!1,y()}),i.addEventListener(`click`,async()=>{await y(),b(),await S()}),a.addEventListener(`click`,async()=>{await y(),b(),await S()}),o.addEventListener(`click`,async()=>{let e=await Qe({history:[]});p=e,E(e.history),Eo(d,`验证码历史已清空，输入内容已保留。`,`ok`)});let _=async()=>{let e=await Ze();p=e,!g&&n.value!==e.rawInput&&(n.value=e.rawInput,m=e.rawInput,b()),E(e.history),x()};return _(),{update:_,onShow:async()=>{await _()}};function v(){h&&window.clearTimeout(h),h=window.setTimeout(()=>void y(),450)}async function y(){h&&=(window.clearTimeout(h),null);let e=n.value;e!==m&&(p=await Qe({rawInput:e}),m=e,x())}function b(){let e=zn(n.value),t=new Set(e.targets.map(e=>e.id));for(let[e]of f)t.has(e)||f.delete(e);for(let t of e.targets){let e=f.get(t.id);e?e.target=t:f.set(t.id,{target:t,status:`waiting`,message:`等待获取`,code:``,lastCheckedAt:0,inFlight:!1})}if(c.textContent=``,!e.targets.length)c.append(Co(e.errors[0]||`暂无号码，按每行“号码----API链接”输入。`));else for(let t of e.targets){let e=f.get(t.id);e&&c.append(T(e))}e.errors.length?Eo(d,e.errors.join(`；`),`error`):e.targets.length?Eo(d,`已加载 ${e.targets.length} 个接码链接，点击“立即获取”手动获取。`,`pending`):Eo(d,`输入内容会自动保存。`,`pending`),x()}function x(){let e=zn(n.value),r=+!!p?.history.length,i=[...f.values()].filter(e=>e.code).length;t.textContent=`${e.targets.length} 个接码链接 · ${i} 个当前验证码 · ${r} 条最近记录`}async function S(){let e=zn(n.value);!e.targets.length||e.errors.length||(await y(),await Promise.all(e.targets.map(e=>C(e))),b(),E(p?.history||[]))}async function C(e){let t=f.get(e.id);if(!t||t.inFlight)return;t.inFlight=!0,t.status=t.code?`found`:`waiting`,t.message=`正在获取...`,b();let n=await er(e);if(t.inFlight=!1,t.lastCheckedAt=Date.now(),n.kind===`code`){t.status=`found`,t.code=n.code,t.message=n.message,await w(e.phone,n.code,n.message),Eo(d,`${e.phone} 收到验证码 ${n.code}`,`ok`);return}if(n.kind===`error`){t.status=`error`,t.message=n.message,Eo(d,`${e.phone} 获取失败：${n.message}`,`error`);return}t.status=`waiting`,t.message=n.message}async function w(e,t,n){let r=p||await Ze();if(r.history.some(r=>r.phone===e&&r.code===t&&r.message===n)){p=r;return}p=await Qe({history:[{id:`${e}-${t}-${Date.now()}`,phone:e,code:t,message:n,receivedAt:Date.now()}]})}function T(e){let t=document.createElement(`div`);t.className=`opx-sms-target-row`,t.dataset.status=e.status;let n=document.createElement(`div`);n.className=`opx-sms-target-main`;let r=document.createElement(`strong`);r.textContent=e.target.phone;let i=document.createElement(`span`);i.textContent=e.code?e.message:e.message||`等待获取`,n.append(r,i);let a=document.createElement(`button`);return a.className=`opx-sms-code-chip`,a.type=`button`,a.textContent=e.code||(e.inFlight?`...`:`等待`),a.disabled=!e.code,a.title=e.code?`点击复制验证码`:`尚未收到验证码`,a.addEventListener(`click`,()=>void D(e.code,a)),t.append(n,a),t}function E(e){u.textContent=``;let t=document.createElement(`div`);if(t.className=`opx-sms-table-row opx-sms-table-head`,t.append(wo(`号码`),wo(`验证码`),wo(`时间`)),u.append(t),!e.length){let e=document.createElement(`div`);e.className=`opx-empty-inline`,e.textContent=`暂无验证码历史。`,u.append(e);return}for(let t of e.slice(0,1)){let e=document.createElement(`div`);e.className=`opx-sms-table-row`;let n=document.createElement(`button`);n.className=`opx-sms-code-chip`,n.type=`button`,n.textContent=t.code,n.title=t.message||`点击复制验证码`,n.addEventListener(`click`,()=>void D(t.code,n)),e.append(wo(t.phone),To(n),wo(Do(t.receivedAt))),u.append(e)}}async function D(e,t){if(!e)return;await navigator.clipboard.writeText(e);let n=t.textContent||e;t.textContent=`已复制`,t.classList.add(`is-copied`),window.setTimeout(()=>{t.textContent=n,t.classList.remove(`is-copied`)},1200)}}function bo(e,t){let n=document.createElement(`label`);n.className=`opx-field`;let r=document.createElement(`span`);return r.className=`opx-label`,r.textContent=e,n.append(r,t),n}function xo(e,t=`opx-button`){let n=document.createElement(`button`);return n.className=t,n.type=`button`,n.textContent=e,n}function So(e){let t=document.createElement(`div`);return t.className=`opx-section-title`,t.textContent=e,t}function Co(e){let t=document.createElement(`div`);return t.className=`opx-empty-inline`,t.textContent=e,t}function wo(e){let t=document.createElement(`div`);return t.className=`opx-sms-table-cell`,t.textContent=e,t}function To(e){let t=document.createElement(`div`);return t.className=`opx-sms-table-cell`,t.append(e),t}function Eo(e,t,n){e.textContent=t,e.dataset.type=n}function Do(e){return e?new Date(e).toLocaleTimeString(`zh-CN`,{hour12:!1,hour:`2-digit`,minute:`2-digit`,second:`2-digit`}):`-`}function Oo(){let e=document.createElement(`section`);e.className=`opx-version-notice`,e.hidden=!0;let t=document.createElement(`div`);t.className=`opx-version-notice-title`;let n=document.createElement(`div`);n.className=`opx-version-notice-body`;let r=document.createElement(`div`);r.className=`opx-version-notice-actions`;let i=document.createElement(`button`);i.className=`opx-mini-button`,i.type=`button`,i.textContent=`下载更新`;let a=document.createElement(`button`);a.className=`opx-mini-button opx-mini-button-secondary`,a.type=`button`,a.textContent=`更新说明`;let o=document.createElement(`button`);o.className=`opx-mini-button opx-mini-button-secondary`,o.type=`button`,o.textContent=`忽略`,r.append(i,a,o),e.append(t,n,r);let s=null;return i.addEventListener(`click`,()=>{s?.downloadUrl&&window.open(s.downloadUrl,`_blank`,`noopener,noreferrer`)}),a.addEventListener(`click`,()=>{s?.htmlUrl&&window.open(s.htmlUrl,`_blank`,`noopener,noreferrer`)}),o.addEventListener(`click`,async()=>{s&&(await Qa(s.version),e.hidden=!0)}),{element:e,update:async(r=!1)=>{let i=await ao(r);s=i.latest,ko(i,e,t,n)}}}function ko(e,t,n,r){if(!e.latest||!e.updateAvailable||e.ignored){t.hidden=!0;return}n.textContent=`发现新版本 v${e.latest.version}`,r.textContent=Ao(e.currentVersion,e.latest),t.hidden=!1}function Ao(e,t){let n=t.body.split(/\r?\n/).map(e=>e.replace(/^#+\s*/,``).trim()).filter(Boolean).slice(0,2).join(` / `),r=`当前 v${e}，最新 ${t.tagName||`v${t.version}`}`;return n?`${r}。${n}`:r}var jo=`
:host {
  all: initial;
  color-scheme: light dark;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.opx-shell {
  position: fixed;
  top: 72px;
  right: 0;
  z-index: 2147483647;
  display: flex;
  align-items: flex-start;
  max-height: calc(100vh - 88px);
}

.opx-panel {
  box-sizing: border-box;
  width: min(320px, calc(100vw - 42px));
  max-height: calc(100vh - 88px);
  margin-right: 18px;
  padding: 10px;
  border: 1px solid rgba(54, 211, 153, 0.28);
  border-radius: 8px;
  background: #0b1220;
  color: #e5f7ef;
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.32);
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-color: rgba(47, 209, 124, 0.55) rgba(15, 23, 42, 0.72);
  scrollbar-width: thin;
}

.opx-panel::-webkit-scrollbar {
  width: 8px;
}

.opx-panel::-webkit-scrollbar-track {
  background: rgba(15, 23, 42, 0.72);
  border-radius: 999px;
}

.opx-panel::-webkit-scrollbar-thumb {
  background: rgba(47, 209, 124, 0.55);
  border-radius: 999px;
}

.opx-collapse-toggle {
  box-sizing: border-box;
  width: 32px;
  min-height: 64px;
  margin: 8px 0 0 0;
  padding: 8px 6px;
  border: 1px solid rgba(47, 209, 124, 0.36);
  border-right: 0;
  border-radius: 8px 0 0 8px;
  background: #0b1220;
  color: #93e4bd;
  cursor: pointer;
  font: inherit;
  font-size: 12px;
  font-weight: 700;
  line-height: 14px;
  writing-mode: vertical-rl;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.28);
}

.opx-shell.is-collapsed .opx-panel {
  display: none;
}

.opx-shell.is-collapsed .opx-collapse-toggle {
  margin-right: 0;
  border-radius: 8px 0 0 8px;
  background: #102019;
}

.opx-topbar {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 34px;
  gap: 6px;
  align-items: stretch;
  margin-bottom: 8px;
}

.opx-tabs {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 4px;
  margin-bottom: 0;
  padding: 3px;
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 8px;
  background: rgba(15, 23, 42, 0.8);
}

.opx-tab {
  height: 30px;
  min-width: 0;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: #94a3b8;
  cursor: pointer;
  font: inherit;
  font-size: 12px;
  font-weight: 650;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.opx-tab.is-active {
  background: #2fd17c;
  color: #04130a;
}

.opx-icon-button {
  box-sizing: border-box;
  width: 34px;
  height: 36px;
  border: 1px solid rgba(47, 209, 124, 0.36);
  border-radius: 8px;
  background: #111827;
  color: #93e4bd;
  cursor: pointer;
  font: inherit;
  font-size: 17px;
  font-weight: 700;
  line-height: 1;
}

.opx-icon-button:hover {
  border-color: rgba(47, 209, 124, 0.74);
  color: #bbf7d0;
}

.opx-state {
  margin: 0 0 8px;
  color: #93e4bd;
  font-size: 12px;
  line-height: 16px;
}

.opx-version-notice {
  display: grid;
  gap: 7px;
  margin: 0 0 8px;
  padding: 8px;
  border: 1px solid rgba(47, 209, 124, 0.42);
  border-radius: 7px;
  background: rgba(47, 209, 124, 0.1);
  color: #dcfce7;
}

.opx-version-notice[hidden] {
  display: none;
}

.opx-version-notice-title {
  color: #bbf7d0;
  font-size: 12px;
  font-weight: 800;
  line-height: 16px;
}

.opx-version-notice-body {
  color: #cbd5e1;
  font-size: 11px;
  line-height: 15px;
  overflow-wrap: anywhere;
}

.opx-version-notice-actions {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) 54px;
  gap: 5px;
}

.opx-mini-button {
  box-sizing: border-box;
  min-width: 0;
  height: 28px;
  border: 0;
  border-radius: 6px;
  background: #2fd17c;
  color: #04130a;
  cursor: pointer;
  font: inherit;
  font-size: 11px;
  font-weight: 750;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.opx-mini-button-secondary {
  border: 1px solid rgba(47, 209, 124, 0.34);
  background: rgba(15, 23, 42, 0.72);
  color: #93e4bd;
}

.opx-view {
  display: block;
}

.opx-view[hidden] {
  display: none;
}

.opx-empty-view {
  min-height: 84px;
  display: grid;
  place-items: center;
  border: 1px dashed rgba(148, 163, 184, 0.28);
  border-radius: 8px;
  color: #94a3b8;
  font-size: 13px;
}

.opx-input,
.opx-select,
.opx-textarea {
  box-sizing: border-box;
  width: 100%;
  height: 36px;
  margin: 0 0 8px;
  padding: 0 10px;
  border: 1px solid rgba(148, 163, 184, 0.32);
  border-radius: 6px;
  background: #111827;
  color: #e5f7ef;
  font: inherit;
  font-size: 13px;
  outline: none;
}

.opx-select {
  appearance: none;
}

.opx-textarea {
  min-height: 72px;
  max-height: 140px;
  padding: 9px 10px;
  resize: vertical;
  line-height: 18px;
}

.opx-input:focus,
.opx-select:focus,
.opx-textarea:focus {
  border-color: #2fd17c;
}

.opx-hint {
  margin: -2px 0 8px;
  color: #94a3b8;
  font-size: 11px;
  line-height: 15px;
}

.opx-hint.is-ok {
  color: #86efac;
}

.opx-summary {
  margin: 0 0 8px;
  padding: 7px 8px;
  border: 1px solid rgba(47, 209, 124, 0.28);
  border-radius: 6px;
  background: rgba(47, 209, 124, 0.08);
  color: #bbf7d0;
  font-size: 11px;
  line-height: 15px;
  word-break: break-word;
  white-space: pre-line;
}

.opx-session-card {
  display: grid;
  gap: 5px;
  margin: 0 0 8px;
  padding: 8px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 6px;
  background: rgba(15, 23, 42, 0.72);
}

.opx-session-row {
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr);
  gap: 6px;
  color: #94a3b8;
  font-size: 11px;
  line-height: 15px;
}

.opx-session-row strong {
  min-width: 0;
  color: #e5f7ef;
  font-weight: 600;
  word-break: break-word;
}

.opx-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 8px;
}

.opx-team-options[hidden] {
  display: none;
}

.opx-field {
  display: block;
  min-width: 0;
}

.opx-label {
  display: block;
  margin: 0 0 4px;
  color: #94a3b8;
  font-size: 11px;
  line-height: 14px;
}

.opx-token-textarea {
  min-height: 92px;
}

.opx-output {
  min-height: 58px;
  resize: vertical;
}

.opx-button-row {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 6px;
}

.opx-address-actions {
  grid-template-columns: minmax(0, 1fr);
}

.opx-button {
  box-sizing: border-box;
  width: 100%;
  height: 34px;
  margin: 0 0 10px;
  border: 0;
  border-radius: 6px;
  background: #2fd17c;
  color: #04130a;
  cursor: pointer;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
}

.opx-button-secondary {
  background: #182235;
  color: #93e4bd;
  border: 1px solid rgba(47, 209, 124, 0.36);
}

.opx-button:disabled {
  cursor: not-allowed;
  opacity: 0.45;
}

.opx-status {
  min-height: 18px;
  color: #cbd5e1;
  font-size: 12px;
  line-height: 18px;
  word-break: break-word;
}

.opx-status[data-type="ok"] {
  color: #86efac;
}

.opx-status[data-type="error"] {
  color: #fca5a5;
}

.opx-settings-overlay {
  position: fixed;
  inset: 0;
  z-index: 2147483647;
  display: grid;
  place-items: start center;
  padding: 22px 10px;
  background: rgba(2, 6, 23, 0.58);
}

.opx-settings-overlay[hidden] {
  display: none;
}

.opx-settings-dialog {
  box-sizing: border-box;
  width: min(300px, calc(100vw - 52px));
  max-height: calc(100vh - 44px);
  overflow-y: auto;
  padding: 10px;
  border: 1px solid rgba(47, 209, 124, 0.38);
  border-radius: 8px;
  background: #0b1220;
  color: #e5f7ef;
  box-shadow: 0 20px 52px rgba(0, 0, 0, 0.42);
}

.opx-settings-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin: 0 0 10px;
  color: #bbf7d0;
  font-size: 14px;
  line-height: 18px;
}

.opx-settings-title {
  display: flex;
  align-items: center;
  gap: 7px;
  min-width: 0;
}

.opx-version-badge {
  padding: 1px 6px;
  border: 1px solid rgba(47, 209, 124, 0.34);
  border-radius: 999px;
  background: rgba(47, 209, 124, 0.08);
  color: #93e4bd;
  font-size: 11px;
  font-weight: 700;
  line-height: 16px;
}

.opx-settings-header .opx-icon-button {
  width: 28px;
  height: 28px;
  font-size: 18px;
}

.opx-settings-dialog .opx-grid {
  grid-template-columns: minmax(0, 1fr);
  gap: 0;
}

.opx-setting-item {
  margin: 0 0 8px;
  padding: 8px;
  border: 1px solid rgba(47, 209, 124, 0.22);
  border-radius: 6px;
  background: rgba(15, 23, 42, 0.54);
}

.opx-setting-item .opx-check-row {
  margin-bottom: 4px;
}

.opx-setting-description {
  margin-left: 26px;
  color: #94a3b8;
  font-size: 11px;
  line-height: 15px;
}

.opx-setting-section-title {
  margin: 10px 0 6px;
  color: #bbf7d0;
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
}

.opx-external-link-button {
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  width: 100%;
  min-height: 34px;
  margin: 0 0 8px;
  padding: 8px 10px;
  border: 1px solid rgba(47, 209, 124, 0.34);
  border-radius: 6px;
  background: rgba(47, 209, 124, 0.1);
  color: #bbf7d0;
  cursor: pointer;
  font: inherit;
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  text-align: left;
}

.opx-telegram-icon {
  flex: 0 0 auto;
  width: 14px;
  height: 14px;
}

.opx-external-link-button:hover {
  border-color: rgba(47, 209, 124, 0.7);
  background: rgba(47, 209, 124, 0.16);
  color: #dcfce7;
}

.opx-external-link-button:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.opx-check-row {
  display: grid;
  grid-template-columns: 18px minmax(0, 1fr);
  gap: 8px;
  align-items: center;
  margin: 0 0 10px;
  color: #e5f7ef;
  cursor: pointer;
  font-size: 12px;
  line-height: 16px;
}

.opx-checkbox {
  width: 16px;
  height: 16px;
  accent-color: #2fd17c;
}

.opx-address-summary {
  min-height: 68px;
}

.opx-settings-buttons {
  margin-top: 2px;
}

.opx-section-title {
  margin: 10px 0 6px;
  color: #bbf7d0;
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
}

.opx-copy-list {
  display: grid;
  gap: 5px;
}

.opx-copy-section {
  display: grid;
  gap: 5px;
  margin: 5px 0 1px;
}

.opx-copy-section-title {
  color: #93e4bd;
  font-size: 11px;
  font-weight: 700;
  line-height: 15px;
}

.opx-copy-section-body {
  display: grid;
  gap: 5px;
}

.opx-accordion-section {
  overflow: hidden;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 6px;
  background: rgba(15, 23, 42, 0.56);
}

.opx-accordion-section summary {
  padding: 7px 8px;
  color: #93e4bd;
  cursor: pointer;
  font-size: 11px;
  font-weight: 700;
  line-height: 15px;
  list-style-position: inside;
}

.opx-accordion-section .opx-copy-section-body {
  padding: 0 6px 6px;
}

.opx-copy-row,
.opx-empty-inline {
  box-sizing: border-box;
  width: 100%;
  min-height: 30px;
  padding: 7px 8px;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 6px;
  background: rgba(15, 23, 42, 0.72);
  color: #cbd5e1;
  font: inherit;
  font-size: 11px;
  line-height: 15px;
  text-align: left;
  word-break: break-word;
}

.opx-copy-row {
  cursor: pointer;
}

.opx-copy-row {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 4px;
  align-items: start;
}

.opx-copy-row:hover {
  border-color: rgba(47, 209, 124, 0.48);
  color: #e5f7ef;
}

.opx-copy-row.is-copied {
  border-color: rgba(47, 209, 124, 0.72);
  background: rgba(47, 209, 124, 0.12);
}

.opx-copy-label {
  color: #94a3b8;
  white-space: nowrap;
}

.opx-copy-row strong {
  min-width: 0;
  color: #e5f7ef;
  font-weight: 600;
  overflow-wrap: anywhere;
}

.opx-copy-feedback {
  align-self: start;
  padding: 1px 5px;
  border-radius: 999px;
  background: rgba(47, 209, 124, 0.16);
  color: #86efac !important;
  font-size: 10px;
  font-weight: 700;
  line-height: 14px;
  white-space: nowrap;
}

.opx-copy-feedback[hidden] {
  display: none;
}

.opx-empty-inline {
  color: #94a3b8;
  border-style: dashed;
}

.opx-sms-input {
  min-height: 88px;
}

.opx-sms-actions {
  grid-template-columns: minmax(0, 1fr) minmax(0, 0.86fr) minmax(0, 0.86fr);
}

.opx-sms-targets {
  display: grid;
  gap: 6px;
}

.opx-sms-target-row {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 8px;
  align-items: center;
  min-height: 44px;
  padding: 7px 8px;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 6px;
  background: rgba(15, 23, 42, 0.72);
}

.opx-sms-target-row[data-status="found"] {
  border-color: rgba(47, 209, 124, 0.5);
  background: rgba(47, 209, 124, 0.1);
}

.opx-sms-target-row[data-status="error"] {
  border-color: rgba(248, 113, 113, 0.42);
  background: rgba(127, 29, 29, 0.2);
}

.opx-sms-target-main {
  min-width: 0;
  display: grid;
  gap: 2px;
}

.opx-sms-target-main strong,
.opx-sms-target-main span {
  min-width: 0;
  overflow-wrap: anywhere;
}

.opx-sms-target-main strong {
  color: #e5f7ef;
  font-size: 12px;
  line-height: 16px;
}

.opx-sms-target-main span {
  color: #94a3b8;
  font-size: 11px;
  line-height: 15px;
}

.opx-sms-code-chip {
  box-sizing: border-box;
  min-width: 56px;
  max-width: 92px;
  min-height: 28px;
  padding: 4px 8px;
  border: 1px solid rgba(47, 209, 124, 0.44);
  border-radius: 999px;
  background: #182235;
  color: #bbf7d0;
  cursor: pointer;
  font: inherit;
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.opx-sms-code-chip:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.opx-sms-code-chip.is-copied {
  background: #2fd17c;
  color: #04130a;
}

.opx-sms-table {
  display: grid;
  gap: 5px;
}

.opx-sms-table-row {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(64px, 0.8fr) 62px;
  gap: 6px;
  align-items: center;
  min-height: 32px;
  padding: 5px 6px;
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 6px;
  background: rgba(15, 23, 42, 0.58);
}

.opx-sms-table-head {
  min-height: 24px;
  background: transparent;
  border-color: transparent;
  color: #93e4bd;
  font-weight: 700;
}

.opx-sms-table-cell {
  min-width: 0;
  color: #cbd5e1;
  font-size: 11px;
  line-height: 15px;
  overflow-wrap: anywhere;
}

@media (max-height: 640px) {
  .opx-shell {
    top: 12px;
    max-height: calc(100vh - 24px);
  }

  .opx-panel {
    max-height: calc(100vh - 24px);
  }
}
`;function Mo(e,t){e.innerHTML=``;let n=document.createElement(`style`);n.textContent=jo;let r=document.createElement(`div`);r.className=`opx-shell`;let i=document.createElement(`button`);i.className=`opx-collapse-toggle`,i.type=`button`,i.textContent=`收起`,i.title=`收起侧边栏`,i.setAttribute(`aria-expanded`,`true`);let a=document.createElement(`aside`);a.className=`opx-panel`;let o=document.createElement(`div`);o.className=`opx-topbar`;let s=document.createElement(`div`);s.className=`opx-tabs`;let c=Fo(`register`,`注册`),l=Fo(`link`,`提链接`),u=Fo(`address`,`地址`),d=Fo(`sms`,`接码`);s.append(c,l,u,d);let f=document.createElement(`button`);f.className=`opx-icon-button`,f.type=`button`,f.textContent=`⚙`,f.title=`打开设置`,f.setAttribute(`aria-label`,`打开设置`);let p=document.createElement(`div`);p.className=`opx-state`;let m=Po(),h=Po(),g=Po(),_=Po(),v={register:Wa(m,t),link:Fa(h),address:Ea(g),sms:yo(_)},y=Oo(),b=po({onVersionChecked:()=>y.update(!0)}),x=`register`,S=e=>{r.classList.toggle(`is-collapsed`,e),i.textContent=e?`展开`:`收起`,i.title=e?`展开侧边栏`:`收起侧边栏`,i.setAttribute(`aria-expanded`,e?`false`:`true`)},C=async e=>{$e(e)&&(x=e,await Ge(e),w(),await v[e].onShow?.(),await T())},w=()=>{for(let e of[c,l,u,d])e.classList.toggle(`is-active`,e.dataset.tab===x);m.hidden=x!==`register`,h.hidden=x!==`link`,g.hidden=x!==`address`,_.hidden=x!==`sms`},T=async()=>{let e=await j();x=e.activeTab,S(e.panelCollapsed),w(),p.textContent=No(x,t),await v[x].update()};c.addEventListener(`click`,()=>void C(`register`)),l.addEventListener(`click`,()=>void C(`link`)),u.addEventListener(`click`,()=>void C(`address`)),d.addEventListener(`click`,()=>void C(`sms`)),f.addEventListener(`click`,()=>b.open()),i.addEventListener(`click`,()=>{let e=!r.classList.contains(`is-collapsed`);S(e),Ke(e)}),o.append(s,f),a.append(o,y.element,p,m,h,g,_,b.element),r.append(i,a),e.append(n,r),window.setInterval(()=>void T(),1e3),window.setTimeout(()=>void y.update(),800),T().then(()=>{v[x].onShow?.()})}function No(e,t){return e===`register`?t.getPageState().label:e===`link`?`提链接：ChatGPT session`:e===`address`?`地址：随机资料`:`接码：短信验证码`}function Po(){let e=document.createElement(`section`);return e.className=`opx-view`,e}function Fo(e,t){let n=document.createElement(`button`);return n.className=`opx-tab`,n.type=`button`,n.dataset.tab=e,n.textContent=t,n}var Io=`opx-assistant-root`;function Lo(){if(document.getElementById(Io))return;let e=document.createElement(`div`);e.id=Io,document.documentElement.append(e);let t=e.attachShadow({mode:`open`}),n=St();Mo(t,n),n.autoRunForCurrentPage()}var Ro=`__opx_assistant_content_loaded__`,zo=[`chatgpt.com`,`chat.openai.com`,`auth.openai.com`,`pay.openai.com`,`www.paypal.com`,`paypal.com`],Bo=e({matches:[`https://*/*`,`http://*/*`],runAt:`document_idle`,registration:`manifest`,allFrames:!0,main(){let e=globalThis;if(!e[Ro]&&(e[Ro]=!0,Vo(),Uo(location.hostname))){window.top===window&&Lo();try{Vt()}catch(e){console.warn(`[OPX] pay autofill init failed`,e)}try{kr()}catch(e){console.warn(`[OPX] PayPal autofill init failed`,e)}}}});function Vo(){window.addEventListener(`message`,e=>{if(e.source!==window||!Ho(e.data))return;let n=typeof e.data.requestId==`string`?e.data.requestId:``;t.runtime.sendMessage({type:`opx:run-pay-link`,pay:e.data.pay||e.data.url||e.data.link||e.data.paymentLink||``,incognito:e.data.incognito===!0}).then(e=>{window.postMessage({type:`opx:run-pay-link-result`,requestId:n,...e&&typeof e==`object`?e:{ok:!1,message:`插件返回结果无效`}},`*`)}).catch(e=>{window.postMessage({type:`opx:run-pay-link-result`,requestId:n,ok:!1,message:String(e)},`*`)})})}function Ho(e){if(!e||typeof e!=`object`)return!1;let t=e;return t.type===`opx:run-pay-link`&&typeof(t.pay||t.url||t.link||t.paymentLink||``)==`string`}function Uo(e){return zo.includes(e)}var Wo={debug:(...e)=>([...e],void 0),log:(...e)=>([...e],void 0),warn:(...e)=>([...e],void 0),error:(...e)=>([...e],void 0)},Go=class e extends Event{static EVENT_NAME=Ko(`wxt:locationchange`);constructor(t,n){super(e.EVENT_NAME,{}),this.newUrl=t,this.oldUrl=n}};function Ko(e){return`${t?.runtime?.id}:content:${e}`}var qo=typeof globalThis.navigation?.addEventListener==`function`;function Jo(e){let t,n=!1;return{run(){n||(n=!0,t=new URL(location.href),qo?globalThis.navigation.addEventListener(`navigate`,e=>{let n=new URL(e.destination.url);n.href!==t.href&&(window.dispatchEvent(new Go(n,t)),t=n)},{signal:e.signal}):e.setInterval(()=>{let e=new URL(location.href);e.href!==t.href&&(window.dispatchEvent(new Go(e,t)),t=e)},1e3))}}}var Yo=class e{static SCRIPT_STARTED_MESSAGE_TYPE=Ko(`wxt:content-script-started`);id;abortController;locationWatcher=Jo(this);constructor(e,t){this.contentScriptName=e,this.options=t,this.id=Math.random().toString(36).slice(2),this.abortController=new AbortController,this.stopOldScripts(),this.listenForNewerScripts()}get signal(){return this.abortController.signal}abort(e){return this.abortController.abort(e)}get isInvalid(){return t.runtime?.id??this.notifyInvalidated(),this.signal.aborted}get isValid(){return!this.isInvalid}onInvalidated(e){return this.signal.addEventListener(`abort`,e),()=>this.signal.removeEventListener(`abort`,e)}block(){return new Promise(()=>{})}setInterval(e,t){let n=setInterval(()=>{this.isValid&&e()},t);return this.onInvalidated(()=>clearInterval(n)),n}setTimeout(e,t){let n=setTimeout(()=>{this.isValid&&e()},t);return this.onInvalidated(()=>clearTimeout(n)),n}requestAnimationFrame(e){let t=requestAnimationFrame((...t)=>{this.isValid&&e(...t)});return this.onInvalidated(()=>cancelAnimationFrame(t)),t}requestIdleCallback(e,t){let n=requestIdleCallback((...t)=>{this.signal.aborted||e(...t)},t);return this.onInvalidated(()=>cancelIdleCallback(n)),n}addEventListener(e,t,n,r){t===`wxt:locationchange`&&this.isValid&&this.locationWatcher.run(),e.addEventListener?.(t.startsWith(`wxt:`)?Ko(t):t,n,{...r,signal:this.signal})}notifyInvalidated(){this.abort(`Content script context invalidated`),Wo.debug(`Content script "${this.contentScriptName}" context invalidated`)}stopOldScripts(){document.dispatchEvent(new CustomEvent(e.SCRIPT_STARTED_MESSAGE_TYPE,{detail:{contentScriptName:this.contentScriptName,messageId:this.id}})),this.options?.noScriptStartedPostMessage||window.postMessage({type:e.SCRIPT_STARTED_MESSAGE_TYPE,contentScriptName:this.contentScriptName,messageId:this.id},`*`)}verifyScriptStartedEvent(e){let t=e.detail?.contentScriptName===this.contentScriptName,n=e.detail?.messageId===this.id;return t&&!n}listenForNewerScripts(){let t=e=>{!(e instanceof CustomEvent)||!this.verifyScriptStartedEvent(e)||this.notifyInvalidated()};document.addEventListener(e.SCRIPT_STARTED_MESSAGE_TYPE,t),this.onInvalidated(()=>document.removeEventListener(e.SCRIPT_STARTED_MESSAGE_TYPE,t))}},Xo={debug:(...e)=>([...e],void 0),log:(...e)=>([...e],void 0),warn:(...e)=>([...e],void 0),error:(...e)=>([...e],void 0)};return(async()=>{try{let{main:e,...t}=Bo;return await e(new Yo(`content`,t))}catch(e){throw Xo.error(`The content script "content" crashed on startup!`,e),e}})()})();
content;