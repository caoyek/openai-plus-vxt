var content=(function(){function e(e){return e}var t=globalThis.browser?.runtime?.id?globalThis.browser:globalThis.chrome,n=[`input#email`,`input[name="email"]`,`input[type="email"]`,`input[autocomplete="email"]`],r=[`button[type="submit"]`,`form button:not([type="button"])`];function i(){return c()?!!s(n):!1}async function a(e){let t=s(n);if(!t)return m(`没有找到邮箱输入框`);u(t,e),t.dispatchEvent(new Event(`input`,{bubbles:!0})),t.dispatchEvent(new Event(`change`,{bubbles:!0})),await d();let r=o();return r?(r.disabled&&await f(r,2500),r.disabled?m(`继续按钮仍然不可点击`):(r.click(),p(`已填入邮箱并点击继续`))):m(`没有找到继续按钮`)}function o(){for(let e of r){let t=document.querySelector(e);if(t)return t}return Array.from(document.querySelectorAll(`button`)).find(e=>{let t=(e.textContent||``).trim();return t===`继续`||t.toLowerCase()===`continue`})??null}function s(e){for(let t of e){let e=document.querySelector(t);if(e&&l(e))return e}return null}function c(){return location.hostname===`chatgpt.com`||location.hostname===`auth.openai.com`||location.hostname===`chat.openai.com`}function l(e){let t=e.getBoundingClientRect(),n=window.getComputedStyle(e);return t.width>0&&t.height>0&&n.visibility!==`hidden`&&n.display!==`none`}function u(e,t){Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,`value`)?.set?.call(e,t)}function d(){return new Promise(e=>window.setTimeout(e,60))}function f(e,t){let n=Date.now();return new Promise(r=>{let i=()=>{if(!e.disabled||Date.now()-n>=t){r();return}window.setTimeout(i,100)};i()})}function p(e){return{ok:!0,message:e}}function m(e){return{ok:!1,message:e}}var h=[`input[name="code"]`,`input[name="otp"]`,`input[autocomplete="one-time-code"]`,`input[inputmode="numeric"]`,`input[type="text"]`];function g(){return y()?!!v()&&S(b(),[`code`,`otp`,`verification`,`验证码`,`验证`]):!1}async function _(e){let t=e.replace(/\D/g,``);if(!t)return O(`验证码不能为空`);let n=v();if(!n)return O(`没有找到验证码输入框`);w(n,t),n.dispatchEvent(new Event(`input`,{bubbles:!0})),n.dispatchEvent(new Event(`change`,{bubbles:!0})),await T();let r=C();return r?(r.disabled&&await E(r,2500),r.disabled?O(`验证码继续按钮仍然不可点击`):(r.click(),D(`已填入验证码并点击继续`))):O(`没有找到验证码继续按钮`)}function v(){for(let e of h){let t=document.querySelector(e);if(t&&x(t))return t}return Array.from(document.querySelectorAll(`input`)).find(e=>{if(!x(e))return!1;let t=[e.placeholder,e.ariaLabel,e.name,e.id].join(` `).toLowerCase();return t.includes(`code`)||t.includes(`otp`)||t.includes(`验证`)})??null}function y(){return location.hostname===`chatgpt.com`||location.hostname===`auth.openai.com`||location.hostname===`chat.openai.com`}function b(){return(document.body?.innerText||document.body?.textContent||``).toLowerCase()}function x(e){let t=e.getBoundingClientRect(),n=window.getComputedStyle(e);return t.width>0&&t.height>0&&n.visibility!==`hidden`&&n.display!==`none`}function S(e,t){return t.some(t=>e.includes(t))}function C(){return document.querySelector(`button[type="submit"]`)||(Array.from(document.querySelectorAll(`button`)).find(e=>{let t=(e.textContent||``).trim();return t===`继续`||t.toLowerCase()===`continue`})??null)}function w(e,t){Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,`value`)?.set?.call(e,t)}function T(){return new Promise(e=>window.setTimeout(e,60))}function E(e,t){let n=Date.now();return new Promise(r=>{let i=()=>{if(!e.disabled||Date.now()-n>=t){r();return}window.setTimeout(i,100)};i()})}function D(e){return{ok:!0,message:e}}function O(e){return{ok:!1,message:e}}var ee=[`input[name="name"]`,`input[name="fullName"]`,`input[autocomplete="name"]`,`input[type="text"]`],te=[`input[name="age"]`,`input[inputmode="numeric"]`,`input[type="number"]`,`input[type="text"]`],ne=[`Arlen`,`Brennan`,`Calvin`,`Darian`,`Elliot`,`Finley`,`Gavin`,`Harlan`,`Jasper`,`Kieran`,`Landon`,`Morgan`,`Nolan`,`Parker`,`Rowan`,`Sawyer`,`Tristan`,`Warren`];function re(){return ye()?!!(ae()&&oe(ae())):!1}async function ie(){let e=ae(),t=oe(e);if(!e)return ve(`没有找到全名输入框`);if(!t)return ve(`没有找到年龄输入框`);let n=he(),r=String(ge(25,55));fe(e,n),e.dispatchEvent(new Event(`input`,{bubbles:!0})),e.dispatchEvent(new Event(`change`,{bubbles:!0})),fe(t,r),t.dispatchEvent(new Event(`input`,{bubbles:!0})),t.dispatchEvent(new Event(`change`,{bubbles:!0})),await pe();let i=de();return i?(i.disabled&&await me(i,2500),i.disabled?ve(`完成账户创建按钮仍然不可点击`):(i.click(),_e(`已填写 ${n} / ${r} 并点击创建`))):ve(`没有找到完成账户创建按钮`)}function ae(){let e=se([`全名`,`名字`,`name`,`full name`]);if(e)return e;for(let e of ee){let t=document.querySelector(e);if(t&&be(t)&&!ue(t))return t}return le().find(e=>!ue(e))??null}function oe(e){let t=se([`年龄`,`age`]);if(t&&t!==e)return t;for(let t of te){let n=Array.from(document.querySelectorAll(t)).find(t=>t!==e&&be(t)&&ue(t));if(n)return n}return le().find(t=>t!==e)??null}function se(e){let t=le();for(let n of t){let t=[n.name,n.id,n.placeholder,n.ariaLabel,n.getAttribute(`aria-labelledby`)?ce(n.getAttribute(`aria-labelledby`)||``):``,n.closest(`label`)?.textContent||``,n.parentElement?.textContent||``].join(` `).toLowerCase();if(e.some(e=>t.includes(e.toLowerCase())))return n}return null}function ce(e){return e.split(/\s+/).map(e=>document.getElementById(e)?.textContent||``).join(` `)}function le(){return Array.from(document.querySelectorAll(`input`)).filter(e=>{let t=(e.type||`text`).toLowerCase();return[`text`,`number`,`tel`,``].includes(t)&&be(e)})}function ue(e){let t=[e.name,e.id,e.placeholder,e.ariaLabel,e.inputMode,e.type,e.parentElement?.textContent||``].join(` `).toLowerCase();return t.includes(`age`)||t.includes(`年龄`)||t.includes(`numeric`)||e.type===`number`}function de(){return document.querySelector(`button[type="submit"]`)||(Array.from(document.querySelectorAll(`button`)).find(e=>{let t=(e.textContent||``).trim().toLowerCase();return t.includes(`完成帐户创建`)||t.includes(`完成账户创建`)||t.includes(`create account`)||t.includes(`continue`)})??null)}function fe(e,t){Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,`value`)?.set?.call(e,t)}function pe(){return new Promise(e=>window.setTimeout(e,80))}function me(e,t){let n=Date.now();return new Promise(r=>{let i=()=>{if(!e.disabled||Date.now()-n>=t){r();return}window.setTimeout(i,100)};i()})}function he(){return ne[ge(0,ne.length-1)]}function ge(e,t){return Math.floor(Math.random()*(t-e+1))+e}function _e(e){return{ok:!0,message:e}}function ve(e){return{ok:!1,message:e}}function ye(){return location.hostname===`chatgpt.com`||location.hostname===`auth.openai.com`||location.hostname===`chat.openai.com`}function be(e){let t=e.getBoundingClientRect(),n=window.getComputedStyle(e);return t.width>0&&t.height>0&&n.visibility!==`hidden`&&n.display!==`none`}var xe=/^[^\s@]+@[^\s@]+\.[^\s@]+$/,Se=/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/;function Ce(e){let t=e.trim();if(!t)return we(`empty`,`请输入邮箱或临时邮箱账号行`);let n=t.split(/\r?\n/).map(e=>e.trim()).find(Boolean)||``;if(n.includes(`----`)){let e=n.split(`----`).map(e=>e.trim()),t=e[0]||``;if(Te(t))return e.length<3||!e[1]||!e[2]?we(`invalid`,`新建临时邮箱需要 Worker地址----admin_auth----邮箱域名`):{ok:!0,mode:`outlook-line`,email:``,accountLine:n,apiBase:Ee(t),message:`临时邮箱 API 新建地址并自动收码`};let r=t;return xe.test(r)?e.length<3||!Se.test(e[1])||!Te(e[2])?we(`invalid`,`已有临时邮箱需要 email----地址JWT----Worker地址`):{ok:!0,mode:`outlook-line`,email:r,accountLine:n,apiBase:Ee(e[2]),message:`临时邮箱 API 自动验证码`}:we(`invalid`,`临时邮箱行里的邮箱格式不正确`)}return xe.test(n)?{ok:!0,mode:`email`,email:n,accountLine:``,message:`单邮箱模式，验证码手动输入`}:we(`invalid`,`邮箱格式不正确`)}function we(e,t){return{ok:!1,mode:e,email:``,accountLine:``,message:t}}function Te(e){try{let t=new URL(e);return t.protocol===`http:`||t.protocol===`https:`}catch{return!1}}function Ee(e){return e.replace(/\/+$/,``)}var De=/"accessToken"\s*:\s*"([^"]+)"/,Oe=/"accessToken"\s*:\s*"?([A-Za-z0-9_.-]+)/,ke=/\beyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\b/,k={planName:`chatgptplusplan`,uiMode:`custom`,region:`US`,workspaceName:`MyTeam`,seatQuantity:5};function Ae(e){let t=String(e||``).trim();if(!t)throw Error(`请输入包含 accessToken 的 JSON 或字符串`);let n=Ie(t)||Re(t)||ze(t);if(!n)throw Error(`未找到 accessToken`);if(n.split(`.`).length!==3)throw Error(`accessToken 格式不正确`);return n}function je(e){let t=Be(e)?e:{};return{planName:Me(t.planName),uiMode:Ne(t.uiMode),region:Pe(t.region||t.country),workspaceName:String(t.workspaceName||t.workspace_name||k.workspaceName).trim()||k.workspaceName,seatQuantity:Fe(t.seatQuantity)}}function Me(e){return e===`chatgptplusplan`||e===`chatgptteamplan`?e:k.planName}function Ne(e){return e===`hosted`?`hosted`:`custom`}function Pe(e){let t=String(e||k.region).trim().toUpperCase();return t===`ID`||t===`DE`||t===`JP`||t===`US`?t:k.region}function Fe(e){let t=Number(e||k.seatQuantity);if(!Number.isInteger(t)||t<1)throw Error(`team_plan_data.seat_quantity 必须是大于 0 的整数`);return t}function Ie(e){try{return Le(JSON.parse(e))}catch{return``}}function Le(e,t=0){if(!Be(e)||t>4)return``;if(typeof e.accessToken==`string`)return e.accessToken.trim();for(let n of Object.values(e)){let e=Le(n,t+1);if(e)return e}return``}function Re(e){let t=De.exec(e);if(t?.[1])return t[1].trim();let n=Oe.exec(e);if(!n?.[1])return``;let r=n[1].trim().replace(/[",}\]\s]+$/,``);return ke.exec(r)?.[0]?.trim()||r}function ze(e){return ke.exec(e)?.[0]?.trim()||``}function Be(e){return!!(e&&typeof e==`object`)}var A=`opx.registerAssist.state`,j={rawInput:``,email:``,accountLine:``,inputMode:`empty`,autoOtp:!1,apiBase:``,otpRequestedAt:0,updatedAt:0},Ve={checkoutOptions:k,updatedAt:0},He={rawInput:``,history:[],updatedAt:0},Ue={activeTab:`register`,panelCollapsed:!1,register:j,linkExtractor:Ve,smsRelay:He};async function M(){return $e((await t.storage.local.get(A))[A])}async function We(e){let n=$e({...await M(),activeTab:e});return await t.storage.local.set({[A]:n}),n}async function Ge(e){let n=$e({...await M(),panelCollapsed:e});return await t.storage.local.set({[A]:n}),n}async function Ke(){return(await M()).register}async function qe(e){let n=await M(),r=et({...n.register,...e,updatedAt:Date.now()}),i=$e({...n,register:r});return await t.storage.local.set({[A]:i}),i.register}async function Je(){return(await M()).linkExtractor}async function Ye(e){let n=await M(),r=tt({...n.linkExtractor,...e,updatedAt:Date.now()}),i=$e({...n,linkExtractor:r});return await t.storage.local.set({[A]:i}),i.linkExtractor}async function Xe(){return(await M()).smsRelay}async function Ze(e){let n=await M(),r=nt({...n.smsRelay,...e,updatedAt:Date.now()}),i=$e({...n,smsRelay:r});return await t.storage.local.set({[A]:i}),i.smsRelay}function Qe(e){return e===`register`||e===`link`||e===`address`||e===`sms`}function $e(e){let t=N(e)?e:{},n=N(t.register)?t.register:t,r=N(t.linkExtractor)?t.linkExtractor:t,i=N(t.smsRelay)?t.smsRelay:He;return{activeTab:Qe(String(t.activeTab||``))?t.activeTab:Ue.activeTab,panelCollapsed:!!t.panelCollapsed,register:et(n),linkExtractor:tt(r),smsRelay:nt(i)}}function et(e){let t=N(e)?e:{};return{rawInput:String(t.rawInput||j.rawInput),email:String(t.email||j.email),accountLine:String(t.accountLine||j.accountLine),inputMode:it(t.inputMode),autoOtp:!!t.autoOtp,apiBase:String(t.apiBase||j.apiBase),otpRequestedAt:Number(t.otpRequestedAt||j.otpRequestedAt),updatedAt:Number(t.updatedAt||j.updatedAt)}}function tt(e){let t=N(e)?e:{};return{checkoutOptions:je(t.checkoutOptions||Ve.checkoutOptions),updatedAt:Number(t.updatedAt||Ve.updatedAt)}}function nt(e){let t=N(e)?e:{},n=Array.isArray(t.history)?t.history.map(rt).filter(e=>!!e):He.history;return{rawInput:String(t.rawInput||He.rawInput),history:n,updatedAt:Number(t.updatedAt||He.updatedAt)}}function rt(e){if(!N(e))return null;let t=String(e.phone||``).trim(),n=String(e.code||``).trim();if(!t||!n)return null;let r=Number(e.receivedAt||0)||Date.now();return{id:String(e.id||`${t}-${n}-${r}`),phone:t,code:n,message:String(e.message||``).trim(),receivedAt:r}}function it(e){return e===`email`||e===`outlook-line`||e===`invalid`?e:`empty`}function N(e){return!!(e&&typeof e==`object`)}var at=`opx.extension.settings`,P={payOpenAiEnabled:!0,payPalSignupEnabled:!0,countryCode:`US`,city:``,lastAddress:null,updatedAt:0},ot={addressAutofill:P,tempMail:{apiBase:``,adminAuth:``,domain:``,mailboxName:``,customAuth:``,updatedAt:0},updatedAt:0},st=new Set([`RANDOM`,`US`,`CA`,`AU`,`JP`,`TW`,`KR`,`HK`,`GB`,`DE`,`SG`,`FR`,`IT`,`ES`,`NL`,`MY`,`RU`,`CN`,`TH`,`PH`,`AR`,`TR`,`VN`]);async function ct(){return dt((await t.storage.local.get(at))[at])}async function F(e){let n=await ct(),r=ft({...n.addressAutofill,...e,updatedAt:Date.now()}),i=dt({...n,addressAutofill:r,updatedAt:Date.now()});return await t.storage.local.set({[at]:i}),i.addressAutofill}async function I(){return(await ct()).addressAutofill}async function lt(){return(await ct()).tempMail}async function ut(e){let n=await ct(),r=_t({...n.tempMail,...e,updatedAt:Date.now()}),i=dt({...n,tempMail:r,updatedAt:Date.now()});return await t.storage.local.set({[at]:i}),i.tempMail}function dt(e){let t=L(e)?e:{};return{addressAutofill:ft(t.addressAutofill),tempMail:_t(t.tempMail),updatedAt:Number(t.updatedAt||ot.updatedAt)}}function ft(e){let t=L(e)?e:{};return{payOpenAiEnabled:t.payOpenAiEnabled===void 0?P.payOpenAiEnabled:!!t.payOpenAiEnabled,payPalSignupEnabled:t.payPalSignupEnabled===void 0?P.payPalSignupEnabled:!!t.payPalSignupEnabled,countryCode:yt(t.countryCode||t.country),city:String(t.city||t.region||P.city),lastAddress:pt(t.lastAddress),updatedAt:Number(t.updatedAt||P.updatedAt)}}function pt(e){if(!L(e))return null;let t=String(e.line1||``).trim(),n=String(e.city||``).trim(),r=String(e.countryCode||e.country||`US`).trim().toUpperCase(),i=String(e.state||``).trim(),a=r===`US`?i.toUpperCase():i,o=String(e.postalCode||``).trim();return!t||!n||!a||!o?null:{id:String(e.id||`${Date.now()}`),fullName:String(e.fullName||``).trim(),line1:t,line2:String(e.line2||``).trim(),city:n,state:a,stateFull:String(e.stateFull||``).trim(),postalCode:o,countryCode:r,countryLabel:String(e.countryLabel||``).trim(),countryPath:String(e.countryPath||``).trim(),phone:String(e.phone||``).trim(),identity:mt(e.identity),employment:ht(e.employment),creditCard:gt(e.creditCard),source:e.source===`fallback`?`fallback`:`meiguodizhi`,fetchedAt:Number(e.fetchedAt||0)}}function mt(e){let t=L(e)?e:{};return{gender:String(t.gender||``).trim(),title:String(t.title||``).trim(),birthday:String(t.birthday||``).trim(),username:String(t.username||``).trim(),password:String(t.password||``).trim(),temporaryMail:String(t.temporaryMail||``).trim(),system:String(t.system||``).trim(),userAgent:String(t.userAgent||``).trim(),website:String(t.website||``).trim(),securityQuestion:String(t.securityQuestion||``).trim(),securityAnswer:String(t.securityAnswer||``).trim()}}function ht(e){let t=L(e)?e:{};return{educationalBackground:String(t.educationalBackground||``).trim(),occupation:String(t.occupation||``).trim(),employmentStatus:String(t.employmentStatus||``).trim(),monthlySalary:String(t.monthlySalary||``).trim(),companySize:String(t.companySize||``).trim(),companyName:String(t.companyName||``).trim()}}function gt(e){let t=L(e)?e:{},n=String(t.number||``).replace(/\D/g,``),r=String(t.last4||n.slice(-4)||``).replace(/\D/g,``).slice(-4);return{type:String(t.type||``).trim(),number:n,cvv:String(t.cvv||``).trim(),expires:String(t.expires||``).trim(),last4:r,maskedNumber:String(t.maskedNumber||(r?`**** **** **** ${r}`:``)).trim()}}function _t(e){let t=L(e)?e:{};return{apiBase:vt(t.apiBase||t.workerUrl),adminAuth:String(t.adminAuth||``).trim(),domain:String(t.domain||``).trim(),mailboxName:String(t.mailboxName||t.name||``).trim(),customAuth:String(t.customAuth||``).trim(),updatedAt:Number(t.updatedAt||ot.tempMail.updatedAt)}}function L(e){return!!(e&&typeof e==`object`)}function vt(e){let t=String(e||``).trim().replace(/\/+$/,``);if(!t)return``;try{let e=new URL(t);return e.protocol===`http:`||e.protocol===`https:`?e.toString().replace(/\/+$/,``):``}catch{return``}}function yt(e){let t=String(e||P.countryCode).trim().toUpperCase();return st.has(t)?t:P.countryCode}var bt=!1;function xt(){return{getPageState:St,loadState:Ke,saveInput:async e=>{let t=Ce(e);return qe({rawInput:e,email:t.email,accountLine:t.accountLine,apiBase:t.apiBase,inputMode:t.mode,autoOtp:t.mode===`outlook-line`})},fillEmailFromInput:async()=>{if(!i())return R(`当前页面不是 ChatGPT 登录页`);let e=await lt(),n=Ct(e);if(!n.ok)return R(n.message);let r=await t.runtime.sendMessage({type:`opx:create-temp-mail-address`,accountLine:n.accountLine});if(!Tt(r)||!r.ok||!r.email||!r.accountLine)return R(r?.message||`临时邮箱 API 没有返回有效地址`);let o=r.email,s=r.accountLine;return await qe({rawInput:s,email:o,accountLine:s,apiBase:e.apiBase,inputMode:`outlook-line`,autoOtp:!0,otpRequestedAt:Date.now()}),a(o)},fillOtp:async e=>g()?_(e):R(`当前页面不是邮箱验证码页`),waitForOutlookOtp:async()=>{if(!g())return R(`当前页面不是邮箱验证码页`);let e=await Ke();if(!e.accountLine)return R(`当前输入不是临时邮箱账号行，不能自动接收验证码`);let n=await t.runtime.sendMessage({type:`opx:wait-outlook-otp`,accountLine:e.accountLine,apiBase:e.apiBase,since:e.otpRequestedAt||e.updatedAt||Date.now(),timeoutMs:18e4,intervalMs:5e3});if(!wt(n))return R(`临时邮箱 API 没有返回有效结果`);if(!n.ok||!n.code)return n;let r=await _(n.code);return{...r,code:n.code,message:r.ok?`已收到并提交验证码：${n.code}`:r.message}},fillProfileAndCreate:async()=>re()?ie():R(`当前页面不是资料填写页`),autoRunForCurrentPage:async()=>{!re()||bt||(bt=!0,await Et(),await ie())}}}function St(){return i()?{kind:`login`,label:`ChatGPT 登录页`,canFillEmail:!0,canFillOtp:!1,canFillProfile:!1}:g()?{kind:`email-verification`,label:`邮箱验证码页`,canFillEmail:!1,canFillOtp:!0,canFillProfile:!1}:re()?{kind:`about-you`,label:`资料填写页`,canFillEmail:!1,canFillOtp:!1,canFillProfile:!0}:{kind:`unknown`,label:`未识别页面`,canFillEmail:!1,canFillOtp:!1,canFillProfile:!1}}function Ct(e){return!e.apiBase||!e.adminAuth||!e.domain?{ok:!1,message:`请先在设置里填写临时邮箱 Worker 地址、admin_auth 和邮箱域名`}:{ok:!0,accountLine:[e.apiBase,e.adminAuth,e.domain,e.mailboxName,e.customAuth].filter(Boolean).join(`----`)}}function R(e){return{ok:!1,message:e}}function wt(e){return!!(e&&typeof e==`object`&&typeof e.ok==`boolean`&&typeof e.message==`string`)}function Tt(e){return wt(e)}function Et(){return new Promise(e=>window.setTimeout(e,800))}var Dt=[{code:`US`,label:`美国`,path:`/`},{code:`CA`,label:`加拿大`,path:`/ca-address`},{code:`AU`,label:`澳大利亚`,path:`/au-address`},{code:`JP`,label:`日本`,path:`/jp-address`},{code:`TW`,label:`台湾`,path:`/tw-address`},{code:`KR`,label:`韩国`,path:`/kr-address`},{code:`HK`,label:`香港`,path:`/hk-address`},{code:`GB`,label:`英国`,path:`/uk-address`},{code:`DE`,label:`德国`,path:`/de-address`},{code:`SG`,label:`新加坡`,path:`/sg-address`},{code:`FR`,label:`法国`,path:`/fr-address`},{code:`IT`,label:`意大利`,path:`/it-address`},{code:`ES`,label:`西班牙`,path:`/es-address`},{code:`NL`,label:`荷兰`,path:`/nl-address`},{code:`MY`,label:`马来西亚`,path:`/my-address`},{code:`RU`,label:`俄罗斯`,path:`/ru-address`},{code:`CN`,label:`中国`,path:`/cn-address`},{code:`TH`,label:`泰国`,path:`/th-address`},{code:`PH`,label:`菲律宾`,path:`/ph-address`},{code:`AR`,label:`阿根廷`,path:`/ar-address`},{code:`TR`,label:`土耳其`,path:`/tr-address`},{code:`VN`,label:`越南`,path:`/vn-address`}],Ot=`[OPX Pay Autofill]`,kt=[`label[for="payment-method-accordion-item-title-paypal"]`,`#payment-method-accordion-item-title-paypal`,`#payment-method-label-paypal`,`[data-testid="paypal-accordion-item"]`,`button[data-testid="paypal-accordion-item-button"]`,`button[aria-label*="PayPal"]`,`button[aria-label*="paypal" i]`],At=!1,jt=!1,Mt=null,Nt=null,Pt=``,z=!1,Ft=!1,It=0,Lt=null,Rt=0;function zt(){At||location.hostname!==`pay.openai.com`||(At=!0,xn(),bn(),Sn(800))}async function Bt(){if(!jt){jt=!0;try{let e=await I();if(!e.payOpenAiEnabled){console.info(`${Ot} disabled`);return}let t=await nn(e);if(!t){console.info(`${Ot} no address available`);return}let n=await Vt(t);console.info(`${Ot} ${n.message}`,{city:t.city,state:t.state,postalCode:t.postalCode,country:t.countryCode,source:t.source})}catch(e){console.warn(`${Ot} failed`,e)}finally{jt=!1}}}async function Vt(e){if(location.hostname!==`pay.openai.com`)return{ok:!1,filled:0,message:`当前不是 pay.openai.com 页面`};let t=on();t&&ln(),await Dn(t?1400:650);let n=await an(e);return It=0,Rt=0,B(1800),Ht(),{ok:n>0,filled:n,message:n>0?`已填写 OpenAI 支付页 ${n} 项`:`未找到可填写的 OpenAI 支付字段`}}function B(e){z&&!Qt()||Ft||window.setTimeout(()=>{if(z&&!Qt()||Ft)return;if(qt()&&Jt(),!Wt()){It+=1,It<80&&B(1200);return}let e=Qt();if(!e||e.disabled||!U(e)){It+=1,It<80&&B(1200);return}Ft=!0,window.setTimeout(()=>{if(Ft=!1,z||!Wt())return;let e=Qt();if(!e||e.disabled||!U(e)){B(900);return}z=!0,H(e),window.setTimeout(()=>{Qt()?(z=!1,B(900)):Ut()},2500)},900)},e)}function Ht(){Lt||=window.setInterval(()=>{if(z&&!Qt()){Ut();return}B(0)},1800)}function Ut(){Lt&&=(window.clearInterval(Lt),null)}function Wt(){return Gt()&&Kt()}function Gt(){let e=document.querySelector(`#payment-method-accordion-item-title-paypal`),t=document.querySelector(`[data-testid="paypal-accordion-item"]`);return!e&&!t?!0:!!(e?.checked||e?.getAttribute(`aria-checked`)===`true`||t?.className.includes(`selected`)||t?.querySelector(`input[value="paypal"]`)?.getAttribute(`aria-checked`)===`true`)}function Kt(){let e=Zt(`#billingCountry`)||Xt(`billing country`),t=Zt(`#billingAddressLine1`)||Xt(`billing address-line1`),n=Zt(`#billingLocality`)||Xt(`billing address-level2`),r=Zt(`#billingPostalCode`)||Xt(`billing postal-code`),i=Zt(`#billingAdministrativeArea`)||Xt(`billing address-level1`);if(!e||!t||!n||!r)return!1;let a=e.toUpperCase();return(a===`US`||a.includes(`美国`)||a.includes(`UNITED STATES`))&&Yt(`#billingAdministrativeArea`)?!!i:!0}function qt(){return Array.from(document.querySelectorAll(`.AddressAutocomplete-results--showing, .AddressAutocomplete-results`)).some(e=>U(e))}function Jt(){Rt+=1;let e=document.querySelector(`.AddressAutocomplete-result--selected, .AddressAutocomplete-results--showing [role="option"], .AddressAutocomplete-result`);if(e&&U(e)){H(e);return}let t=document.querySelector(`#billingAddressLine1`)||document.querySelector(`input[autocomplete="billing address-line1"]`);if(!t)return;t.focus();let n=Rt<=2?`Enter`:`Escape`;t.dispatchEvent(new KeyboardEvent(`keydown`,{key:n,code:n,bubbles:!0,cancelable:!0})),t.dispatchEvent(new KeyboardEvent(`keyup`,{key:n,code:n,bubbles:!0,cancelable:!0})),Rt>2&&t.blur()}function Yt(e){return!!document.querySelector(e)}function Xt(e){let t=En(e);return Zt(`input[autocomplete="${t}"], textarea[autocomplete="${t}"], select[autocomplete="${t}"]`)}function Zt(e){let t=document.querySelector(e);if(Tn(t)){let e=t.selectedOptions[0];return(t.value||e?.text||``).trim()}return wn(t)?t.value.trim():``}function Qt(){let e=document.querySelector(`.SubmitButton-TextContainer`)?.closest(`button`);if(e instanceof HTMLButtonElement&&U(e)&&!e.disabled&&$t(e))return e;let t=document.querySelector(`.SubmitButton-IconContainer`)?.closest(`button`);return t instanceof HTMLButtonElement&&U(t)&&!tn(t)?t:Array.from(document.querySelectorAll(`button[type="submit"], button`)).filter(U).filter(e=>!e.disabled&&!tn(e)).map(e=>({button:e,score:en(e)})).filter(e=>e.score>0).sort((e,t)=>t.score-e.score)[0]?.button||null}function $t(e){let t=W(e.querySelector(`.SubmitButton-Text--current[aria-hidden="false"]`)?.textContent||e.textContent||e.getAttribute(`aria-label`)||``),n=W(e.querySelector(`[data-testid="submit-button-processing-label"]`)?.textContent||``);return n&&t.includes(n)&&!t.includes(`订阅`)&&!t.includes(`subscribe`)?!1:t.includes(`订阅`)||t.includes(`subscribe`)||t.includes(`pay`)||t.includes(`支付`)||t.includes(`continue`)||t.includes(`继续`)}function en(e){let t=W(e.textContent||e.getAttribute(`aria-label`)||``),n=String(e.className||``),r=0;return e.type===`submit`&&(r+=20),n.includes(`SubmitButton`)&&(r+=40),e.querySelector(`.SubmitButton-IconContainer`)&&(r+=30),(t.includes(`订阅`)||t.includes(`subscribe`)||t.includes(`pay`)||t.includes(`支付`)||t.includes(`continue`)||t.includes(`继续`))&&(r+=20),r}function tn(e){let t=W(e.textContent||e.getAttribute(`aria-label`)||``),n=String(e.className||``);return!!(e.closest(`[data-testid="paypal-accordion-item"]`)||e.closest(`.AddressAutocomplete--clear-button-container`)||n.includes(`AddressAutocomplete--clear-button`)||t.includes(`清空`)||t.includes(`手动输入地址`)||t.includes(`manual`)||t.includes(`paypal`))}async function nn(e){let t=`${e.countryCode}|${e.city}`;return Nt&&Pt===t?Nt:(Nt=await rn(e),Pt=t,Nt)}async function rn(e){let n=await t.runtime.sendMessage({type:`opx:fetch-random-address`,countryCode:e.countryCode,city:e.city});return!On(n)||!n.ok||!n.address?(console.warn(`${Ot} address fetch failed`,n),null):(await F({lastAddress:n.address}),n.address)}async function an(e){let t=0;return t+=V(`#billingName`,e.fullName,!0),t+=dn(`#billingCountry`,e.countryCode,[e.countryLabel,e.countryCode]),document.querySelector(`#billingCountry`)&&await Dn(550),t+=V(`#billingAddressLine1`,e.line1,!0),t+=V(`#billingAddressLine2`,e.line2,!0),t+=V(`#billingLocality`,e.city,!0),t+=pn(`#billingAdministrativeArea`,e.state,[e.stateFull,e.state]),t+=V(`#billingPostalCode`,e.postalCode,!0),t+=V(`#phoneNumber`,e.phone,!1),t+=un(`billing address-line1`,e.line1),t+=un(`billing address-line2`,e.line2),t+=un(`billing address-level2`,e.city),t+=un(`billing postal-code`,e.postalCode),t+=mn(`billing address-level1`,e.state,[e.stateFull,e.state]),t+=fn(`billing country`,e.countryCode,[e.countryLabel,e.countryCode]),t+=_n(),t}function on(){let e=document.querySelector(`#payment-method-accordion-item-title-paypal`),t=document.querySelector(`[data-testid="paypal-accordion-item"]`);if(e?.checked||e?.getAttribute(`aria-checked`)===`true`||t?.className.includes(`selected`))return!0;let n=sn();for(let e of n)H(e);if(n.length)return!0;if(e)return cn(e),!0;for(let e of kt){let t=document.querySelector(e);if(t)return H(t),!0}let r=Array.from(document.querySelectorAll(`button, label, [role="button"], [role="radio"], [data-testid], div`)).filter(U).find(e=>W(e.innerText||e.textContent).includes(`paypal`));return r?(H(r),!0):!1}function sn(){let e=[`button[data-testid="paypal-accordion-item-button"]`,`[data-testid="paypal-accordion-item"] .AccordionItemHeader`,`[data-testid="paypal-accordion-item"] .AccordionItemCover-titleContainer`,`[data-testid="paypal-accordion-item"] .PaymentMethodFormAccordionItemTitle`,`[data-testid="paypal-accordion-item"] #payment-method-label-paypal`,`[data-testid="paypal-accordion-item"] .AccordionItemCover`,`[data-testid="paypal-accordion-item"]`,`#payment-method-accordion-item-title-paypal`],t=new Set,n=[];for(let r of e){let e=document.querySelector(r);!e||t.has(e)||(t.add(e),n.push(e))}return n}function cn(e){e.checked=!0,e.setAttribute(`aria-checked`,`true`),e.dispatchEvent(new Event(`input`,{bubbles:!0})),e.dispatchEvent(new Event(`change`,{bubbles:!0})),H(e)}function ln(){for(let e of[450,1100,2100])window.setTimeout(()=>{let e=document.querySelector(`#payment-method-accordion-item-title-paypal`),t=document.querySelector(`[data-testid="paypal-accordion-item"]`);if(e?.checked||e?.getAttribute(`aria-checked`)===`true`||t?.className.includes(`selected`))return;let n=sn();for(let e of n)H(e)},e)}function V(e,t,n){if(!t)return 0;let r=document.querySelector(e);return!wn(r)||!U(r)||Cn(r)||!n&&r.value.trim()||r.value===t?0:(gn(r,t),1)}function un(e,t){let n=`input[autocomplete="${En(e)}"], textarea[autocomplete="${En(e)}"]`,r=document.querySelector(n);return!wn(r)||!U(r)||r.value===t||Cn(r)?0:(gn(r,t),1)}function dn(e,t,n){let r=document.querySelector(e);return!Tn(r)||!U(r)?0:hn(r,t,n)}function fn(e,t,n){let r=document.querySelector(`select[autocomplete="${En(e)}"]`);return!Tn(r)||!U(r)?0:hn(r,t,n)}function pn(e,t,n){let r=document.querySelector(e);return Tn(r)?U(r)?hn(r,t,n):0:wn(r)?V(e,t,!0):0}function mn(e,t,n){let r=document.querySelector(`select[autocomplete="${En(e)}"]`);return Tn(r)?U(r)?hn(r,t,n):0:un(e,t||n[0]||``)}function hn(e,t,n){let r=Array.from(e.options).filter(e=>!e.disabled&&e.value),i=W(t),a=n.map(e=>W(e)).filter(Boolean),o=r.find(e=>W(e.value)===i)||r.find(e=>a.some(t=>W(`${e.text} ${e.value}`).includes(t)));return!o||e.value===o.value?0:(e.value=o.value,vn(e),1)}function gn(e,t){let n=e instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,r=Object.getOwnPropertyDescriptor(n,`value`);r?.set?r.set.call(e,t):e.value=t,vn(e)}function _n(){let e=0,t=Array.from(document.querySelectorAll(`input[type="checkbox"]`)).filter(U).filter(e=>!e.checked).filter(e=>{let t=W([e.id,e.name,e.getAttribute(`aria-label`),e.closest(`label`)?.textContent,e.parentElement?.textContent].join(` `));return t.includes(`terms`)||t.includes(`consent`)||t.includes(`使用条款`)||t.includes(`隐私政策`)||t.includes(`取消`)||e.id===`termsOfServiceConsentCheckbox`});for(let n of t)n.click(),e+=1;return e}function vn(e){e.dispatchEvent(new Event(`input`,{bubbles:!0})),e.dispatchEvent(new Event(`change`,{bubbles:!0})),e.dispatchEvent(new Event(`blur`,{bubbles:!0}))}function H(e){e.scrollIntoView({block:`center`,inline:`center`}),e.focus?.(),e.click(),yn(e);for(let t of[`pointerdown`,`mousedown`,`pointerup`,`mouseup`,`click`]){let n=t.startsWith(`pointer`)?PointerEvent:MouseEvent;e.dispatchEvent(new n(t,{bubbles:!0,cancelable:!0,composed:!0,button:0,buttons:+!!t.endsWith(`down`),pointerId:1,pointerType:`mouse`}))}e.click()}function yn(e){let t=e.getBoundingClientRect();if(t.width<=0||t.height<=0)return;let n=t.left+t.width/2,r=t.top+t.height/2,i=document.elementFromPoint(n,r);!(i instanceof HTMLElement)||i===e||(i.dispatchEvent(new MouseEvent(`mousedown`,{bubbles:!0,cancelable:!0,clientX:n,clientY:r,button:0})),i.dispatchEvent(new MouseEvent(`mouseup`,{bubbles:!0,cancelable:!0,clientX:n,clientY:r,button:0})),i.click())}function bn(){new MutationObserver(()=>Sn(250)).observe(document.documentElement,{childList:!0,subtree:!0})}function xn(){t.storage.onChanged.addListener((e,t)=>{t===`local`&&Object.keys(e).some(e=>e.includes(`settings`))&&(Nt=null,Pt=``,Sn(100))})}function Sn(e){Mt&&window.clearTimeout(Mt),Mt=window.setTimeout(()=>{Mt=null,Bt()},e)}function U(e){let t=e;if(`disabled`in t&&t.disabled)return!1;let n=window.getComputedStyle(t),r=t.getBoundingClientRect();return n.visibility!==`hidden`&&n.display!==`none`&&r.width>0&&r.height>0}function Cn(e){let t=W([e.getAttribute(`aria-label`),e.getAttribute(`placeholder`),e.getAttribute(`autocomplete`),e.getAttribute(`name`),e.getAttribute(`id`)].join(` `));return[`cc-number`,`card number`,`credit card`,`security code`,`cvc`,`cvv`,`expiry`,`expiration`].some(e=>t.includes(e))}function wn(e){return!!(e&&(e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement))}function Tn(e){return!!(e&&e instanceof HTMLSelectElement)}function W(e){return String(e||``).replace(/\s+/g,` `).trim().toLowerCase()}function En(e){return typeof CSS<`u`&&typeof CSS.escape==`function`?CSS.escape(e):e.replace(/"/g,`\\"`)}function Dn(e){return new Promise(t=>window.setTimeout(t,e))}function On(e){return!!(e&&typeof e==`object`&&typeof e.ok==`boolean`&&typeof e.message==`string`)}var kn=8,An=4,jn=new Set([`data`,`message`,`msg`,`content`,`text`,`body`,`sms`,`otp`,`code`,`verifycode`,`verificationcode`,`captcha`,`result`,`value`]),Mn=new Set([`status`,`statuscode`,`httpstatus`,`ret`,`errno`,`errorcode`]),Nn=/^(no\s*message|no\s*sms|empty|none|null|暂无|没有|未收到)$/i,Pn=/^(ok|success|successful|true|请求成功|成功)$/i;function Fn(e){let t=[],n=[],r=new Set;return e.split(/\r?\n/).map(e=>e.trim()).filter(Boolean).forEach((e,i)=>{let a=e.indexOf(`----`);if(a<0){n.push(`第 ${i+1} 行缺少 ---- 分隔符`);return}let o=e.slice(0,a).trim(),s=e.slice(a+4).trim();if(!o||!s){n.push(`第 ${i+1} 行号码或 API 链接为空`);return}if(!Jn(s)){n.push(`第 ${i+1} 行 API 链接不是 http/https 地址`);return}let c=`${o}\n${s}`;r.has(c)||(r.add(c),t.push({id:Yn(o,s),phone:o,url:s}))}),{targets:t,errors:n}}function In(e){let t=e.trim();return!t||Nn.test(t)?``:t.match(RegExp(`\\b\\d{${An},${kn}}\\b`,`g`))?.[0]||``}function Ln(e){let t=Rn(e),n=t.map(e=>({...e,code:In(e.text)})).filter(e=>e.text&&!Vn(e.text)&&!Hn(e.text)).sort((e,t)=>zn(t)-zn(e))[0];return n?.code?{code:n.code,message:n.text}:{code:``,message:t.map(e=>e.text).find(e=>e&&!Vn(e)&&!Hn(e))||``}}function Rn(e){let t=[],n=new WeakSet;return r(e,``,0),t;function r(e,t,o){if(!(e==null||o>6)){if(typeof e==`string`){i(e,t,o),a(e,t,o);return}if(typeof e==`number`){Kn(t)&&i(String(e),t,o);return}if(typeof e==`object`&&!n.has(e)){if(n.add(e),Array.isArray(e)){e.forEach((e,n)=>r(e,t||String(n),o+1));return}for(let[t,n]of Object.entries(e))Gn(t)||r(n,t,o+1)}}}function i(e,n,r){let i=e.trim();!i||i.length>600||Gn(n)||t.push({text:i,key:n,depth:r,fromPreferredField:Wn(n)})}function a(e,t,n){let i=e.trim();if(!(!i||!/^[{[]/.test(i)))try{r(JSON.parse(i),t,n+1)}catch{}}}function zn(e){let t=0;return e.code&&(t+=100),e.fromPreferredField&&(t+=30),Bn(e.text)&&(t+=20),Kn(e.key)&&(t+=10),Un(e.text)&&(t-=8),t-=e.depth,t}function Bn(e){return/code|验证码|驗證碼|verify|verification|security|otp|paypal|openai|chatgpt/i.test(e)}function Vn(e){return Nn.test(e.trim())}function Hn(e){return Pn.test(e.trim())}function Un(e){return/^[{[]/.test(e.trim())}function Wn(e){return jn.has(qn(e))}function Gn(e){return Mn.has(qn(e))}function Kn(e){let t=qn(e);return t===`otp`||t===`smscode`||t===`verifycode`||t===`verificationcode`||t===`captcha`}function qn(e){return e.toLowerCase().replace(/[^a-z0-9]/g,``)}function Jn(e){try{let t=new URL(e);return t.protocol===`http:`||t.protocol===`https:`}catch{return!1}}function Yn(e,t){return`${e}|${t}`}async function Xn(e){let n;try{n=await t.runtime.sendMessage({type:`opx:fetch-sms-relay`,url:e.url})}catch(t){return{kind:`error`,target:e,message:`请求失败：${Qn(t)}`}}if(!Zn(n)||!n.ok)return{kind:`error`,target:e,message:n?.message||`API 返回结果无效`};let r=Ln({raw:n.raw,data:n.data,text:n.text,message:n.message}),i=r.message,a=r.code;return a?{kind:`code`,target:e,code:a,message:i}:{kind:`empty`,target:e,message:i||n.data||n.message||`暂无短信`}}function Zn(e){return!!(e&&typeof e==`object`&&typeof e.ok==`boolean`&&typeof e.message==`string`)}function Qn(e){return e instanceof Error?e.message:String(e)}var $n=`[OPX PayPal Autofill]`,er=`opx.paypal.autofill.address`,tr=`opx.paypal.autofill.pendingManual`,nr=`opx.paypal.guest.email`,rr=`opx.paypal.signup.password`,ir=`data-opx-paypal-filled`,ar=`opx-paypal-random-fill`,or=3,sr={AR:`Argentina`,AU:`Australia`,CA:`Canada`,CN:`China`,DE:`Germany`,ES:`Spain`,FR:`France`,GB:`United Kingdom`,HK:`Hong Kong`,IT:`Italy`,JP:`Japan`,KR:`South Korea`,MY:`Malaysia`,NL:`Netherlands`,PH:`Philippines`,RU:`Russia`,SG:`Singapore`,TH:`Thailand`,TR:`Turkey`,TW:`Taiwan`,US:`United States`,VN:`Vietnam`},cr=!1,lr=!1,ur=null,G=null,K=null,dr=``,fr=0,pr=``,mr=null,hr=!1,gr=null,_r=!1,vr=!1,yr=0,br=null,xr=!1,Sr=null,Cr=0;function wr(){if(!(cr||!Hi())){if(cr=!0,Ei(),Ai(1200),Di(),Ui()){wi(),Ti(1600);return}if(Wi()){Si(),Ci(1200);return}Ki()||(fi(),bi(),di(),Fi()?Mi(900):xi(800))}}async function Tr(){if(!(hr||!Wi())){hr=!0;try{let e=qi(),t=document.querySelector(`input#email[name="login_email"], input#email[type="email"]`);if(t&&J(t)){ci(t,e),await pa(1200);let n=Yi();if(n&&!n.disabled){n.click();return}}let n=document.querySelector(`input#login_email[name="login_email"], input#login_email[type="email"]`);if(n&&J(n)){ci(n,e),await pa(1200);let t=Xi();t&&!t.disabled&&t.click()}}catch(e){console.warn(`${$n} pay email flow failed`,e)}finally{hr=!1}}}async function Er(){if(!(_r||!Ui())){_r=!0;try{let e=Zi();if(Qi(e)!==6||e.length<6||e.every(e=>e.value.trim()))return;let t=await ea();if(!t){Ti(3500);return}await ta(e.slice(0,6),t),await pa(900);let n=na();n&&!n.disabled&&J(n)&&(ui(n),Ai(2600))}catch(e){console.warn(`${$n} OTP fill failed`,e)}finally{_r=!1}}}async function Dr(e,t=!1,n=!0){if(!Gi())return{ok:!1,filled:0,message:`当前不是 PayPal 注册支付页`,countryChanged:!1};let r=await I(),i=e||await kr(r);if(!i)return{ok:!1,filled:0,message:`没有可用地址资料`,countryChanged:!1};Li(i),t&&!n&&ji(),t&&($r(),ni());let a=await Ar(i,n);return a.countryChanged||(Cr=Date.now()+900,ki(1800)),ei(i,a.countryChanged,n),t&&!n&&(pr=ri(i),a.countryChanged?(Pi(),Mi(1600)):Ii()),{ok:a.filled>0||a.countryChanged,filled:a.filled,countryChanged:a.countryChanged,message:a.countryChanged?`已选择 PayPal 国家：${i.countryCode}，等待页面重新加载`:a.filled>0?`已填写 PayPal ${a.filled} 项`:`未找到可填写的 PayPal 字段`}}async function Or(){if(!lr&&!(pr&&dr===pr)){lr=!0;try{if(!(await I()).payPalSignupEnabled){console.info(`${$n} disabled`);return}let e=await Dr();console.info(`${$n} ${e.message}`),(!e.ok||ti())&&(K?.disconnect(),K=null)}catch(e){console.warn(`${$n} failed`,e)}finally{lr=!1}}}async function kr(e){if(G&&Ri(G,e))return G;let n=Ni();if(n&&Ri(n,e))return G=n,G;let r=await t.runtime.sendMessage({type:`opx:fetch-random-address`,countryCode:e.countryCode,city:e.city});return!ha(r)||!r.ok||!r.address?(console.warn(`${$n} address fetch failed`,r),null):(G=r.address,Li(r.address),await F({lastAddress:r.address}),G)}async function Ar(e,t){let n=0;if(jr(e))return t&&xi(1500),{filled:1,countryChanged:!0};let r=await Mr(e),i=await Rr(e.phone),a=Ji(),o=Bi(e.fullName),s=zi(e.creditCard.expires);return n+=q(Z.email,r,!0),n+=Pr(a),Fr(a),n+=q(Z.phone,i,!0),n+=q(Z.cardNumber,e.creditCard.number,!0),n+=q(Z.expiry,s.short,!0),n+=q(Z.csc,e.creditCard.cvv,!0),n+=q(Z.fullName,e.fullName,!0),n+=q(Z.firstName,o.first,!0),n+=q(Z.lastName,o.last,!0),n+=q(Z.address1,e.line1,!0),n+=q(Z.address2,e.line2,!0),n+=q(Z.city,e.city,!0),n+=Ir(Z.state,e.state,[e.stateFull,e.state]),n+=q(Z.postalCode,e.postalCode,!0),n+=Lr(e,o),n+=Ir(Z.expiryMonth,s.month,[s.month]),n+=Ir(Z.expiryYear,s.year4,[s.year4,s.year2]),{filled:n,countryChanged:!1}}function jr(e){let t=Gr(Z.country);return!t||!J(t)?!1:si(t,e.countryCode,[e.countryCode,sr[e.countryCode]||``,e.countryLabel])}async function Mr(e){let t=await Ke(),n=Ce(t.rawInput);return n.ok&&ua(n.email)?n.email:ua(t.email)?t.email:ua(e.identity.temporaryMail)?e.identity.temporaryMail:Vi(e)}function q(e,t,n){if(!t)return 0;let r=Wr(e);return!r||!J(r)?0:Nr(r,t,n)}function Nr(e,t,n){if(!t||!J(e))return 0;let r=e.value.trim();return e.getAttribute(ir)===`1`||ii(r,t)?(e.setAttribute(ir,`1`),0):!n&&r?0:(ci(e,t),e.setAttribute(ir,`1`),1)}function Pr(e){if(!e)return 0;let t=document.querySelector(`input#password`)||Wr(Z.password);return!t||!J(t)||ii(t.value.trim(),e)?0:(ci(t,e),1)}function Fr(e){let t=_i();if(!t)return;Pr(e);let n=`opx-paypal-password-note`,r=`当前密码：${e}`,i=document.getElementById(n);i||(i=document.createElement(`div`),i.id=n,Object.assign(i.style,{color:`#93e4bd`,fontSize:`12px`,lineHeight:`18px`,margin:`4px 0 10px`,padding:`6px 10px`,border:`1px solid rgba(47, 209, 124, 0.36)`,borderRadius:`6px`,background:`rgba(15, 23, 42, 0.82)`,display:`block`}));let a=t.parentElement;a&&(a.insertBefore(i,t),i.textContent=r)}function Ir(e,t,n){if(!t&&!n.some(Boolean))return 0;let r=Gr(e);return r&&J(r)?+!!si(r,t,n):q(e,t||n.find(Boolean)||``,!0)}function Lr(e,t){let n=Hr();if(!n)return 0;let r=Array.from(n.querySelectorAll(`input, textarea, select`)).filter(e=>(Y(e)||la(e))&&J(e)&&!sa(e)&&!ca(e)),i=0;return i+=Br(n,[`first name`,`given name`],t.first,r[0]),i+=Br(n,[`last name`,`family name`,`surname`],t.last,r[1]),i+=Br(n,[`street address`,`address line 1`,`address 1`],e.line1,r[2]),i+=Br(n,[`apt`,`ste`,`bldg`,`address line 2`,`address 2`],e.line2,r[3]),i+=Br(n,[`city`,`locality`],e.city,r[4]),i+=Vr(n,[`state`,`province`,`region`],e.state,[e.stateFull,e.state],r[5]),i+=Br(n,[`zip`,`postal code`,`postcode`],e.postalCode,r[6]),i}async function Rr(e){try{let t=((await Xe()).rawInput.split(/\r?\n/).map(e=>e.trim()).find(Boolean)||``).split(`----`)[0]?.trim();return zr(t)||e}catch{return e}}function zr(e){let t=String(e||``).replace(/\D/g,``);return t.length===11&&t.startsWith(`1`)?t.slice(1):t||String(e||``).trim()}function Br(e,t,n,r){let i=r&&Y(r)?r:null,a=Ur(e,t,Y)||i;return a?Nr(a,n,!0):0}function Vr(e,t,n,r,i){let a=i&&la(i)?i:null,o=Ur(e,t,la)||a;if(o)return+!!si(o,n,r);let s=i&&Y(i)?i:null,c=Ur(e,t,Y)||s;return c?Nr(c,n||r.find(Boolean)||``,!0):0}function Hr(){return Array.from(document.querySelectorAll(`fieldset, [role="group"], section, form > div`)).find(e=>{let t=X(e.textContent||``);return t.includes(`billing address`)&&(t.includes(`street address`)||t.includes(`address`))&&(t.includes(`first name`)||t.includes(`last name`))})||null}function Ur(e,t,n){let r=t.map(X).filter(Boolean);return Array.from(e.querySelectorAll(`input, textarea, select`)).filter(n).map(e=>({control:e,score:Yr(e,r)})).filter(e=>e.score>0&&J(e.control)&&!sa(e.control)).sort((e,t)=>t.score-e.score)[0]?.control||null}function Wr(e){for(let t of e){let e=Kr(t);if(Y(e))return e}return Jr(e,Y)}function Gr(e){for(let t of e){let e=Kr(t);if(la(e))return e}return Jr(e,la)}function Kr(e){if(!qr(e))return null;try{return document.querySelector(e)}catch{return null}}function qr(e){let t=e.trim();return/^[.#[]/.test(t)||/^(input|select|textarea|button|label|form|fieldset|section|div)([#.[\s:]|$)/i.test(t)}function Jr(e,t){let n=e.filter(e=>!e.includes(`[`)&&!e.includes(`#`)&&!e.includes(`.`)).map(X).filter(Boolean);return n.length&&Array.from(document.querySelectorAll(`input, textarea, select`)).filter(t).map(e=>({control:e,score:Yr(e,n)})).filter(e=>e.score>0&&J(e.control)&&!sa(e.control)).sort((e,t)=>t.score-e.score)[0]?.control||null}function Yr(e,t){if(!J(e)||sa(e))return 0;let n=X([e.id,e.name,`placeholder`in e?e.placeholder:``,`autocomplete`in e?e.autocomplete:``,e.getAttribute(`aria-label`),Xr(e),Zr(e)].join(` `)),r=X([e.previousElementSibling?.textContent,e.nextElementSibling?.textContent,Qr(e)].join(` `)),i=X(e.parentElement?.textContent||``);return t.some(e=>n.includes(e))?30:t.some(e=>r.includes(e))?20:i.length<=120&&t.some(e=>i.includes(e))?5:0}function Xr(e){let t=[],n=e.getAttribute(`aria-labelledby`);if(n)for(let e of n.split(/\s+/)){let n=document.getElementById(e);n?.textContent&&t.push(n.textContent)}let r=e.id;if(r)for(let e of Array.from(document.querySelectorAll(`label[for="${oi(r)}"]`)))t.push(e.textContent||``);return t.join(` `)}function Zr(e){return e.closest(`label`)?.textContent||``}function Qr(e){let t=e.closest(`div, label, section`)?.textContent||``;return t.length<=160?t:``}function $r(){for(let e of Array.from(document.querySelectorAll(`[${ir}]`)))e.removeAttribute(ir)}function ei(e,t,n){let r=ri(e);dr!==r&&(dr=r,fr=0),fr+=1,n&&!t&&fr<or&&xi(1200)}function ti(){return!!(dr&&fr>=or)}function ni(){dr=``,fr=0,pr=``}function ri(e){return[location.origin,location.pathname,new URLSearchParams(location.search).get(`token`)||``,e.id].join(`|`)}function ii(e,t){return!e||!t?!1:e===t?!0:ai(e)===ai(t)}function ai(e){return e.toLowerCase().replace(/[^a-z0-9]/g,``)}function oi(e){return typeof CSS<`u`&&typeof CSS.escape==`function`?CSS.escape(e):e.replace(/"/g,`\\"`)}function si(e,t,n){let r=X(t),i=n.map(X).filter(Boolean),a=Array.from(e.options).filter(e=>!e.disabled&&e.value),o=a.find(e=>X(e.value)===r)||a.find(e=>i.some(t=>X(`${e.text} ${e.value}`).includes(t)));return!o||e.value===o.value?!1:(e.value=o.value,li(e),!0)}function ci(e,t){e.focus();let n=e instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,r=Object.getOwnPropertyDescriptor(n,`value`);r?.set?r.set.call(e,t):e.value=t,li(e)}function li(e){e.dispatchEvent(new Event(`input`,{bubbles:!0})),e.dispatchEvent(new Event(`change`,{bubbles:!0})),e.dispatchEvent(new Event(`blur`,{bubbles:!0}))}function ui(e){e.scrollIntoView({block:`center`,inline:`center`}),e.focus?.(),e.click();let t=e.getBoundingClientRect(),n=t.left+t.width/2,r=t.top+t.height/2,i=t.width>0&&t.height>0?document.elementFromPoint(n,r):null;i instanceof HTMLElement&&i!==e&&(i.focus?.(),i.click());for(let t of[`pointerdown`,`mousedown`,`pointerup`,`mouseup`,`click`]){let a=t.startsWith(`pointer`)?PointerEvent:MouseEvent;e.dispatchEvent(new a(t,{bubbles:!0,cancelable:!0,composed:!0,button:0,buttons:+!!t.endsWith(`down`),clientX:n,clientY:r,pointerId:1,pointerType:`mouse`})),i instanceof HTMLElement&&i!==e&&i.dispatchEvent(new a(t,{bubbles:!0,cancelable:!0,composed:!0,button:0,buttons:+!!t.endsWith(`down`),clientX:n,clientY:r,pointerId:1,pointerType:`mouse`}))}e.click()}function di(){K?.disconnect(),K=new MutationObserver(()=>{fi(),!(pr&&dr===pr)&&(ti()||xi(350))}),K.observe(document.documentElement,{childList:!0,subtree:!0})}function fi(){if(!Gi()||document.getElementById(ar))return;let e=gi(),t=hi(),n=pi();if(e?.parentElement){n.style.marginTop=`8px`,n.style.marginBottom=`12px`,e.parentElement.insertBefore(n,e.nextSibling);return}t?.parentElement&&t.parentElement.insertBefore(n,t)}function pi(){let e=document.createElement(`div`);e.id=ar,e.setAttribute(`data-opx-paypal-random-fill`,`1`),Object.assign(e.style,{display:`flex`,alignItems:`center`,justifyContent:`flex-end`,gap:`8px`,margin:`10px 0 14px`,minHeight:`32px`});let t=document.createElement(`button`);t.type=`button`,t.textContent=`随机输入`,Object.assign(t.style,{appearance:`none`,border:`0`,borderRadius:`6px`,background:`#10b981`,color:`#ffffff`,cursor:`pointer`,fontSize:`13px`,fontWeight:`700`,lineHeight:`1`,minHeight:`32px`,padding:`0 14px`,whiteSpace:`nowrap`});let n=document.createElement(`span`);return Object.assign(n.style,{color:`#64748b`,fontSize:`12px`,lineHeight:`16px`,minWidth:`0`}),t.addEventListener(`click`,()=>{mi(t,n)}),e.append(t,n),e}async function mi(e,n){e.disabled=!0,e.textContent=`获取中...`,Object.assign(e.style,{cursor:`wait`,opacity:`0.72`}),n.textContent=`正在获取新资料`;try{let e=await I(),r=await t.runtime.sendMessage({type:`opx:fetch-random-address`,countryCode:e.countryCode,city:e.city});if(!ha(r)||!r.ok||!r.address){n.textContent=r?.message||`获取失败`;return}G=r.address,Li(r.address),await F({lastAddress:r.address});let i=await Dr(r.address,!0,!1);n.textContent=i.countryChanged?`已切换国家，刷新后继续填写`:i.ok?`已随机输入 ${i.filled} 项`:i.message}catch(e){n.textContent=`失败：${ma(e)}`}finally{e.disabled=!1,e.textContent=`随机输入`,Object.assign(e.style,{cursor:`pointer`,opacity:`1`})}}function hi(){let e=Wr(Z.cardNumber);return e?.closest(`div, label, section`)||e}function gi(){let e=document.querySelector(`div.css-ltr-cssveg > form > section.css-ltr-4jicje:nth-of-type(1) > p.css-ltr-6pd54h.css-ltr-16jt5za-text_body`);return e&&J(e)?e:Array.from(document.querySelectorAll(`form section p, form p`)).filter(e=>J(e)).map(e=>({element:e,score:yi(e)})).filter(e=>e.score>0).sort((e,t)=>t.score-e.score)[0]?.element||null}function _i(){let e=document.querySelector(`section.css-ltr-h5yxuz:nth-of-type(3) > div.css-ltr-h5yxuz:nth-of-type(2) > div.css-ltr-1lvkl1r:nth-of-type(2) > p.css-ltr-abbmt5:nth-of-type(1)`);if(e&&J(e))return e;let t=document.querySelector(`input#password`)||Wr(Z.password),n=t?.closest(`section`)||document;return Array.from(n.querySelectorAll(`p`)).filter(e=>J(e)).map(e=>({element:e,score:vi(e,t)})).filter(e=>e.score>0).sort((e,t)=>t.score-e.score)[0]?.element||null}function vi(e,t){let n=X(e.textContent||``);return!n||![`by creating an account`,`confirm you’re at least 18 years old`,`confirm you're at least 18 years old`,`agree to the`,`privacy statement`].some(e=>n.includes(X(e)))?0:t&&t.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING?20:10}function yi(e){let t=X(e.textContent||``);return t&&[`we don’t share your financial details with the merchant`,`we don't share your financial details with the merchant`,`financial details`,`merchant`].some(e=>t.includes(X(e)))?10:0}function bi(){t.storage.onChanged.addListener((e,t)=>{t===`local`&&Object.keys(e).some(e=>e.includes(`settings`))&&(G=null,ni(),xi(100))})}function xi(e){ji(),ur=window.setTimeout(()=>{ur=null,Or()},e)}function Si(){K?.disconnect(),K=new MutationObserver(()=>Ci(900)),K.observe(document.documentElement,{childList:!0,subtree:!0})}function Ci(e){mr&&window.clearTimeout(mr),mr=window.setTimeout(()=>{mr=null,Tr()},e)}function wi(){K?.disconnect(),K=new MutationObserver(()=>Ti(1200)),K.observe(document.documentElement,{childList:!0,subtree:!0})}function Ti(e){gr&&window.clearTimeout(gr),gr=window.setTimeout(()=>{gr=null,Er()},e)}function Ei(){new MutationObserver(()=>{Ai(900),Ui()&&Ti(1200),Cr>0&&ki(1400)}).observe(document.documentElement,{childList:!0,subtree:!0})}function Di(){br||=window.setInterval(()=>{if(vr&&!ia()){Oi();return}Ai(0)},1800)}function Oi(){br&&=(window.clearInterval(br),null)}function ki(e){xr||(Sr&&window.clearTimeout(Sr),Sr=window.setTimeout(()=>{if(Sr=null,!aa())return;let e=ra();!e||e.disabled||!J(e)||(xr=!0,ui(e))},e))}function Ai(e){vr&&!ia()||window.setTimeout(()=>{let e=ia();if(!e||e.disabled){yr+=1,yr<80&&Ai(1400);return}vr=!0,ui(e),e.form?.requestSubmit?.(e);let t=e.closest(`[data-ppui-info^="grid"], .hagrid-1kgc7wn-row, .hagrid-zwblip-row`);t&&ui(t),window.setTimeout(()=>{ia()?(vr=!1,Ai(900)):Oi()},2500)},e)}function ji(){ur&&=(window.clearTimeout(ur),null)}function Mi(e){window.setTimeout(()=>{let e=Ni();if(!e){Ii();return}Dr(e,!0,!1)},e)}function Ni(){try{let e=sessionStorage.getItem(er);return e?JSON.parse(e):null}catch{return null}}function Pi(){try{sessionStorage.setItem(tr,`1`)}catch{}}function Fi(){try{let e=sessionStorage.getItem(tr)===`1`;return e&&sessionStorage.removeItem(tr),e}catch{return!1}}function Ii(){try{sessionStorage.removeItem(tr)}catch{}}function Li(e){try{sessionStorage.setItem(er,JSON.stringify(e))}catch{}}function Ri(e,t){let n=t.countryCode===`RANDOM`||e.countryCode===t.countryCode,r=!t.city.trim()||X(e.city)===X(t.city);return n&&r}function zi(e){let t=e.match(/\d+/g)||[],n=(t[0]||``).padStart(2,`0`).slice(0,2),r=t[1]||``,i=r.length===2?`20${r}`:r.slice(0,4),a=i.slice(-2);return{month:n,year2:a,year4:i,short:n&&a?`${n}/${a}`:e}}function Bi(e){let t=e.replace(/[^a-zA-Z]/g,``);if(t&&!e.includes(` `))return{first:t.slice(0,Math.max(1,Math.floor(t.length/2))),last:t.slice(Math.max(1,Math.floor(t.length/2)))||t};let n=e.split(/\s+/).map(e=>e.trim()).filter(Boolean);return{first:n[0]||t||`Alex`,last:n.slice(1).join(` `)||`Walker`}}function Vi(e){return`${(e.identity.username||e.fullName||`outlookuser`).toLowerCase().replace(/[^a-z0-9]/g,``).slice(0,18)||`outlookuser`}${(e.id+e.fetchedAt).replace(/\D/g,``).slice(-6)||String(Date.now()).slice(-6)}@outlook.com`}function Hi(){return Gi()||Wi()||Ui()||Ki()}function Ui(){return location.hostname.endsWith(`paypal.com`)&&Zi().length>=4}function Wi(){return location.hostname.endsWith(`paypal.com`)&&!Gi()&&(location.pathname.startsWith(`/pay`)||!!document.querySelector(`input#email[name="login_email"], input#login_email[name="login_email"], button[data-testid="continueButton"]`))}function Gi(){return location.hostname.endsWith(`paypal.com`)&&location.pathname.startsWith(`/checkoutweb/signup`)}function Ki(){return location.hostname.endsWith(`paypal.com`)&&(location.pathname.startsWith(`/webapps/hermes`)||location.pathname.startsWith(`/checkoutnow`)||!!document.querySelector(`button#consentButton, button[data-testid="consentButton"]`))}function qi(){let e=sessionStorage.getItem(nr);if(e&&ua(e))return e;let t=`ppguest${Date.now().toString(36)}${da(4)}@gmail.com`;return sessionStorage.setItem(nr,t),t}function Ji(){let e=sessionStorage.getItem(rr);if(e&&/^[a-zA-Z0-9]{10}$/.test(e))return e;let t=fa(10);return sessionStorage.setItem(rr,t),t}function Yi(){let e=document.querySelector(`button[data-atomic-wait-task="login_create_account"][data-atomic-wait-viewname="email"]`);return e&&J(e)?e:Array.from(document.querySelectorAll(`button`)).find(e=>{let t=X(e.textContent||``);return J(e)&&(t.includes(`创建账户`)||t.includes(`create account`))})||null}function Xi(){let e=document.querySelector(`button[data-testid="continueButton"]`);return e&&J(e)?e:Array.from(document.querySelectorAll(`button`)).find(e=>{let t=X(e.textContent||``);return J(e)&&(t.includes(`继续付款`)||t.includes(`continue to payment`))})||null}function Zi(){return Array.from(document.querySelectorAll(`input[id^="ci-ciBasic-"], input[name^="ciBasic-"], input[type="tel"][aria-label*="-"]`)).filter(J).sort((e,t)=>$i(e)-$i(t))}function Qi(e){let t=e.map(e=>{let t=`${e.getAttribute(`aria-label`)||``} ${e.name} ${e.id}`,n=/-\s*(\d+)/.exec(t);if(n)return Number(n[1]);let r=/ciBasic-(\d+)/.exec(t);return r?Number(r[1])+1:0}).filter(e=>Number.isFinite(e)&&e>0);return X(document.body.textContent||``).includes(`6-digit code`)?6:Math.max(0,...t)}function $i(e){let t=`${e.name} ${e.id} ${e.getAttribute(`aria-label`)||``}`,n=/(\d+)(?:-\d+)?/.exec(t);return n?Number(n[1]):0}async function ea(){let e=Fn((await Xe()).rawInput).targets[0];if(!e)return``;let t=await Xn(e);if(t.kind!==`code`)return``;let n=t.code.replace(/\D/g,``);return n.length===6?n:``}async function ta(e,t){let n=t.replace(/\D/g,``);if(!(n.length!==6||e.length<6))for(let t=0;t<6;t+=1)ci(e[t],n[t]),await pa(220)}function na(){let e=Array.from(document.querySelectorAll(`button[type="submit"], button`)).filter(J);return e.find(e=>{let t=X(e.textContent||e.getAttribute(`aria-label`)||``);return t.includes(`继续`)||t.includes(`continue`)||t.includes(`verify`)||t.includes(`确认`)||t.includes(`submit`)})||e.find(e=>!e.disabled)||null}function ra(){let e=document.querySelector(`button[data-testid="submit-button"][data-atomic-wait-task="review_your_payment"], button[data-testid="submit-button"]`);return e&&J(e)?e:Array.from(document.querySelectorAll(`button[type="submit"], button`)).find(e=>{let t=X(e.textContent||e.getAttribute(`aria-label`)||``);return J(e)&&!e.disabled&&(t.includes(`agree & create account`)||t.includes(`agree and create account`)||t.includes(`create account`)||t.includes(`创建账户`))})||null}function ia(){return document.querySelector(`button#consentButton, button[data-testid="consentButton"]`)||document.querySelector(`[data-ppui-info^="grid"] button[data-testid="consentButton"]`)||Array.from(document.querySelectorAll(`button`)).find(e=>{let t=X(e.textContent||``);return!e.disabled&&(t.includes(`agree and continue`)||t.includes(`同意并继续`))})||null}function aa(){if(!Gi()||Date.now()<Cr)return!1;let e=ra();return!e||!J(e)?!1:oa()}function oa(){let e=[Z.email,Z.password,Z.phone,Z.cardNumber,Z.expiry,Z.csc,Z.firstName,Z.lastName,Z.address1,Z.city,Z.postalCode].filter(e=>{let t=Wr(e);return t&&J(t)&&!!t.value.trim()}).length,t=Gr(Z.state)||Wr(Z.state),n=Gr(Z.country),r=!t||!J(t)||!!(`value`in t&&String(t.value||``).trim()),i=!n||!J(n)||!!n.value.trim();return e>=9&&r&&i}function sa(e){return e instanceof HTMLSelectElement||e instanceof HTMLTextAreaElement?!1:[`hidden`,`radio`,`checkbox`,`submit`,`button`].includes((e.type||``).toLowerCase())}function ca(e){let t=X([e.id,e.name,`placeholder`in e?e.placeholder:``,`autocomplete`in e?e.autocomplete:``,e.getAttribute(`aria-label`),Xr(e)].join(` `));return[`email`,`phone`,`mobile`,`card`,`credit`,`expiry`,`expiration`,`cvv`,`csc`,`security code`].some(e=>t.includes(e))}function J(e){let t=e;if(`disabled`in t&&t.disabled)return!1;let n=window.getComputedStyle(t),r=t.getBoundingClientRect();return n.visibility!==`hidden`&&n.display!==`none`&&r.width>0&&r.height>0}function Y(e){return!!(e&&(e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement))}function la(e){return!!(e&&e instanceof HTMLSelectElement)}function ua(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}function X(e){return String(e||``).replace(/\s+/g,` `).trim().toLowerCase()}function da(e){return Array.from({length:e},()=>String(Math.floor(Math.random()*10))).join(``)}function fa(e){return Array.from({length:e},()=>`abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`[Math.floor(Math.random()*62)]).join(``)}function pa(e){return new Promise(t=>window.setTimeout(t,e))}function ma(e){return e instanceof Error?e.message:String(e)}function ha(e){return!!(e&&typeof e==`object`&&typeof e.ok==`boolean`&&typeof e.message==`string`)}var Z={country:[`select#country`,`select[name="country"]`,`select[name="country.x"]`,`country`,`country or region`],email:[`input#email`,`input[name="email"]`,`input[type="email"]`,`input[autocomplete="email"]`,`email`],password:[`input#password`,`input[name="password"]`,`input[type="password"]`,`input[autocomplete="new-password"]`,`create password`,`password`],phone:[`input#phone`,`input#phoneNumber`,`input[name="phone"]`,`input[name="phoneNumber"]`,`input[type="tel"]`,`phone number`,`mobile`],cardNumber:[`input#cardNumber`,`input#card_number`,`input[name="cardNumber"]`,`input[name="card_number"]`,`input[autocomplete="cc-number"]`,`card number`,`credit card number`],expiry:[`input#expiryDate`,`input#expirationDate`,`input#cardExpiry`,`input[name="expiryDate"]`,`input[name="expirationDate"]`,`input[name="cardExpiry"]`,`input[autocomplete="cc-exp"]`,`expiration`,`expiry`,`有效期限`],expiryMonth:[`select#expMonth`,`select#expiryMonth`,`select[name="expMonth"]`,`select[name="expiryMonth"]`,`expiration month`,`expiry month`],expiryYear:[`select#expYear`,`select#expiryYear`,`select[name="expYear"]`,`select[name="expiryYear"]`,`expiration year`,`expiry year`],csc:[`input#cvv`,`input#csc`,`input#securityCode`,`input[name="cvv"]`,`input[name="csc"]`,`input[name="securityCode"]`,`input[autocomplete="cc-csc"]`,`csc`,`cvv`,`security code`],fullName:[`input#cardholderName`,`input#nameOnCard`,`input#fullName`,`input[name="cardholderName"]`,`input[name="nameOnCard"]`,`input[name="fullName"]`,`input[autocomplete="cc-name"]`,`name on card`,`full name`],firstName:[`input#firstName`,`input#billingFirstName`,`input[name="firstName"]`,`input[name="billingFirstName"]`,`input[autocomplete="given-name"]`,`first name`],lastName:[`input#lastName`,`input#billingLastName`,`input[name="lastName"]`,`input[name="billingLastName"]`,`input[autocomplete="family-name"]`,`last name`],address1:[`input#address1`,`input#addressLine1`,`input#billingAddressLine1`,`input#billingLine1`,`input[name="address1"]`,`input[name="addressLine1"]`,`input[name="billingLine1"]`,`input[autocomplete="address-line1"]`,`address line 1`,`street address`],address2:[`input#address2`,`input#addressLine2`,`input#billingAddressLine2`,`input#billingLine2`,`input[name="address2"]`,`input[name="addressLine2"]`,`input[name="billingLine2"]`,`input[autocomplete="address-line2"]`,`address line 2`],city:[`input#city`,`input#billingLocality`,`input#billingCity`,`input[name="city"]`,`input[name="billingCity"]`,`input[autocomplete="address-level2"]`,`city`],state:[`select#state`,`input#state`,`select#billingAdministrativeArea`,`input#billingAdministrativeArea`,`select#billingState`,`input#billingState`,`select[name="state"]`,`input[name="state"]`,`select[name="billingState"]`,`input[name="billingState"]`,`select[autocomplete="address-level1"]`,`input[autocomplete="address-level1"]`,`state`,`province`],postalCode:[`input#zip`,`input#postalCode`,`input#billingPostalCode`,`input#billingZip`,`input[name="zip"]`,`input[name="postalCode"]`,`input[name="billingPostalCode"]`,`input[name="billingZip"]`,`input[autocomplete="postal-code"]`,`zip code`,`postal code`]};function ga(e){let n=document.createElement(`div`);n.className=`opx-summary`;let r=_a(),i=document.createElement(`input`);i.className=`opx-input`,i.type=`text`,i.placeholder=`城市留空即随机，例如 Tokyo / Berlin / New York`,i.autocomplete=`off`;let a=document.createElement(`div`);a.className=`opx-grid`,a.append(va(`地址国家`,r),va(`指定城市`,i));let o=document.createElement(`div`);o.className=`opx-button-row opx-address-actions`;let s=ya(`获取地址`);o.append(s);let c=document.createElement(`div`);c.className=`opx-copy-list`;let l=document.createElement(`div`);l.className=`opx-status`,e.append(n,a,o,c,l),r.addEventListener(`change`,()=>void d(`国家已保存`)),i.addEventListener(`change`,()=>void d(`城市已保存`)),s.addEventListener(`click`,()=>void f());let u=async()=>{m(await I())};return u(),{update:u};async function d(e){let t=await I(),n=r.value,a=i.value.trim();m(await F({countryCode:n,city:a,lastAddress:t.countryCode!==n||t.city.trim()!==a?null:t.lastAddress})),xa(l,e,`ok`)}async function f(){s.disabled=!0,xa(l,`正在获取随机地址...`,`pending`);try{let e=await t.runtime.sendMessage({type:`opx:fetch-random-address`,countryCode:r.value,city:i.value.trim()});if(!Ca(e)||!e.ok||!e.address){xa(l,e?.message||`获取地址失败`,`error`);return}m(await F({countryCode:r.value,city:i.value.trim(),lastAddress:e.address}));let n=await p(e.address);xa(l,n?`地址已获取并保存；${n}`:`地址已获取并保存`,`ok`)}catch(e){xa(l,`获取地址失败：${Sa(e)}`,`error`)}finally{s.disabled=!1}}async function p(e){return location.hostname===`pay.openai.com`?(await Vt(e)).message:location.hostname.endsWith(`paypal.com`)?(await Dr(e,!0,!1)).message:``}function m(e){r.value=e.countryCode,i.value=e.city,h(e),g(e.lastAddress)}function h(e){n.textContent=`${r.selectedOptions[0]?.textContent||e.countryCode} · ${e.city||`随机城市`}`}function g(e){if(c.textContent=``,!e){c.append(ba(`暂无地址，点击“获取地址”。`));return}c.append(ba(`已保存 ${e.countryLabel||e.countryCode} 地址，用于支付页填写。`))}}function _a(){let e=document.createElement(`select`);e.className=`opx-select`;let t=document.createElement(`option`);t.value=`RANDOM`,t.textContent=`随机国家`,e.append(t);for(let t of Dt){let n=document.createElement(`option`);n.value=t.code,n.textContent=`${t.label} / ${t.code}`,e.append(n)}return e}function va(e,t){let n=document.createElement(`label`);n.className=`opx-field`;let r=document.createElement(`span`);return r.className=`opx-label`,r.textContent=e,n.append(r,t),n}function ya(e,t=`opx-button`){let n=document.createElement(`button`);return n.className=t,n.type=`button`,n.textContent=e,n}function ba(e){let t=document.createElement(`div`);return t.className=`opx-empty-inline`,t.textContent=e,t}function xa(e,t,n){e.textContent=t,e.dataset.type=n}function Sa(e){return e instanceof Error?e.message:String(e)}function Ca(e){return!!(e&&typeof e==`object`&&typeof e.ok==`boolean`&&typeof e.message==`string`)}var wa=[[`ID`,`印尼 / IDR`],[`DE`,`德国 / EUR`],[`JP`,`日本 / JPY`],[`US`,`美国 / USD`]];function Ta(e){let n=document.createElement(`div`);n.className=`opx-summary`;let r=document.createElement(`div`);r.className=`opx-session-card`;let i=Ea(`邮箱`,`未读取`),a=Ea(`套餐`,`未读取`),o=Ea(`Token`,`未读取`);r.append(i.row,a.row,o.row);let s=Da(`读取 ChatGPT session`,`opx-button opx-button-secondary`),c=ka([[`chatgptplusplan`,`ChatGPT Plus`],[`chatgptteamplan`,`ChatGPT Team`]]),l=ka([[`custom`,`短链接 / custom`],[`hosted`,`长链接 / hosted`]]),u=ka(wa),d=Oa(`Workspace 名称`,`text`),f=Oa(`席位数量`,`number`);f.min=`2`,f.step=`1`;let p=document.createElement(`div`);p.className=`opx-grid`;let m=Aa(`套餐类型`,c),h=Aa(`链接形式`,l),g=Aa(`计费区域`,u);p.append(m,h,g);let _=document.createElement(`div`);_.className=`opx-team-options`;let v=document.createElement(`div`);v.className=`opx-grid`,v.append(Aa(`Workspace`,d),Aa(`席位`,f)),_.append(v);let y=document.createElement(`textarea`);y.className=`opx-textarea opx-token-textarea`,y.placeholder=`自动读取或手动粘贴 ChatGPT session JSON / Access Token`,y.autocomplete=`off`,y.spellcheck=!1;let b=document.createElement(`div`);b.className=`opx-hint`,b.textContent=`切到提链接 tab 会读取 /api/auth/session；token 只在当前页面内使用。`;let x=Da(`生成订阅链接`),S=document.createElement(`textarea`);S.className=`opx-textarea opx-output`,S.placeholder=`生成后的订阅链接`,S.readOnly=!0,S.spellcheck=!1;let C=document.createElement(`div`);C.className=`opx-button-row`;let w=Da(`复制链接`,`opx-button opx-button-secondary`),T=Da(`打开链接`,`opx-button opx-button-secondary`),E=Da(`清空`,`opx-button opx-button-secondary`);C.append(w,T,E);let D=document.createElement(`div`);D.className=`opx-status`,D.textContent=`等待读取 ChatGPT session。`;let O=``,ee=``,te=!1,ne=!1,re=async()=>{se((await Je()).checkoutOptions)},ie=async()=>{await oe()},ae=async()=>{try{let e=ce();await Ye({checkoutOptions:e}),le(e),Q(D,`本地参数已更新`,`ok`)}catch(e){Q(D,ja(e),`error`)}};for(let e of[c,l,u,d,f])e.addEventListener(`change`,()=>void ae()),e.addEventListener(`input`,()=>void ae());return s.addEventListener(`click`,()=>void oe()),y.addEventListener(`paste`,()=>window.setTimeout(()=>ue(!1),0)),y.addEventListener(`input`,()=>{ee=``,(y.value.includes(`accessToken`)||y.value.length>900)&&ue(!1)}),x.addEventListener(`click`,async()=>{Q(D,`正在生成订阅链接...`,`pending`);let e=y.value.trim()?ue(!0):ee;if(!e){Q(D,`没有 accessToken，请先读取 session 或手动粘贴。`,`error`);return}let n;try{n=ce(),await Ye({checkoutOptions:n})}catch(e){Q(D,ja(e),`error`);return}let r;try{r=await t.runtime.sendMessage({type:`opx:create-checkout-link`,raw:e,options:n})}catch(e){Q(D,`生成失败：${String(e)}`,`error`);return}let i=r?.link||r?.url||``;if(!Ma(r)||!r.ok||!i){Q(D,r?.message||`生成失败：返回结果无效`,`error`),de(``);return}de(i),Q(D,r.message,`ok`)}),w.addEventListener(`click`,async()=>{O&&(await navigator.clipboard.writeText(O),Q(D,`已复制链接`,`ok`))}),T.addEventListener(`click`,()=>{O&&window.open(O,`_blank`,`noopener,noreferrer`)}),E.addEventListener(`click`,()=>{y.value=``,ee=``,b.textContent=`切到提链接 tab 会读取 /api/auth/session；token 只在当前页面内使用。`,b.classList.remove(`is-ok`),de(``),fe(``,``,``),Q(D,`已清空`,`ok`),y.focus()}),e.append(n,r,s,p,_,y,b,x,Aa(`订阅链接`,S),C,D),re(),de(``),{update:re,onShow:ie};async function oe(){if(!te){te=!0,s.disabled=!0,Q(D,`正在读取 https://chatgpt.com/api/auth/session ...`,`pending`);try{let e=await t.runtime.sendMessage({type:`opx:fetch-chatgpt-session`});if(ne=!0,!Na(e)){Q(D,`session 返回结果无效`,`error`);return}let n=e.session;fe(n?.email||``,n?.planType||``,n?.accessToken||``),n?.accessToken&&(ee=n.accessToken,y.value=n.accessToken,b.textContent=`已从 ChatGPT session 读取 accessToken。`,b.classList.add(`is-ok`)),Q(D,e.message,e.ok?`ok`:`error`)}catch(e){Q(D,`读取 session 失败：${String(e)}`,`error`)}finally{s.disabled=!1,te=!1}}}function se(e){let t=je(e);c.value=t.planName,l.value=t.uiMode,u.value=t.region,d.value=t.workspaceName,f.value=String(t.seatQuantity),le(t)}function ce(){return je({planName:c.value,uiMode:l.value,region:u.value,workspaceName:d.value,seatQuantity:Number(f.value||5)})}function le(e){let t=e.planName===`chatgptteamplan`?`Team · ${e.seatQuantity} seats`:`Plus`,r=e.uiMode===`hosted`?`长链接 hosted`:`短链接 custom`,i=ne?`session 已请求`:`session 待读取`;n.textContent=`${t} · ${r} · ${e.region} · ${i}`,_.hidden=e.planName!==`chatgptteamplan`,g.hidden=e.planName===`chatgptteamplan`}function ue(e){try{let e=Ae(y.value);return y.value.trim()!==e&&(y.value=e),b.textContent=`已本地提取 accessToken。`,b.classList.add(`is-ok`),e}catch(t){return b.classList.remove(`is-ok`),e&&Q(D,ja(t),`error`),``}}function de(e){O=e,S.value=e,w.disabled=!e,T.disabled=!e}function fe(e,t,n){i.value.textContent=e||`未读取`,a.value.textContent=t||`未读取`,o.value.textContent=n?`已获取`:`未获取`}}function Ea(e,t){let n=document.createElement(`div`);n.className=`opx-session-row`;let r=document.createElement(`span`);r.textContent=e;let i=document.createElement(`strong`);return i.textContent=t,n.append(r,i),{row:n,value:i}}function Da(e,t=`opx-button`){let n=document.createElement(`button`);return n.className=t,n.type=`button`,n.textContent=e,n}function Oa(e,t){let n=document.createElement(`input`);return n.className=`opx-input`,n.type=t,n.placeholder=e,n}function ka(e){let t=document.createElement(`select`);t.className=`opx-select`;for(let[n,r]of e){let e=document.createElement(`option`);e.value=n,e.textContent=r,t.append(e)}return t}function Aa(e,t){let n=document.createElement(`label`);n.className=`opx-field`;let r=document.createElement(`span`);return r.className=`opx-label`,r.textContent=e,n.append(r,t),n}function Q(e,t,n){e.textContent=t,e.dataset.type=n}function ja(e){return e instanceof Error?e.message:String(e)}function Ma(e){return!!(e&&typeof e==`object`&&typeof e.ok==`boolean`&&typeof e.message==`string`)}function Na(e){return!!(e&&typeof e==`object`&&typeof e.ok==`boolean`&&typeof e.message==`string`)}function Pa(e,t){let n=document.createElement(`div`);n.className=`opx-hint`,n.textContent=`点击按钮会自动创建临时邮箱并填入当前注册页。`;let r=Fa(`生成邮箱并继续`),i=document.createElement(`input`);i.className=`opx-input`,i.type=`text`,i.inputMode=`numeric`,i.placeholder=`验证码`,i.autocomplete=`one-time-code`;let a=Fa(`填入验证码并继续`),o=Fa(`自动接收并填入验证码`,`opx-button opx-button-secondary`),s=Fa(`填写资料并创建`),c=document.createElement(`div`);c.className=`opx-status`,c.textContent=`等待操作`;let l=async()=>{let e=t.getPageState(),i=await t.loadState();r.disabled=!e.canFillEmail,a.disabled=!e.canFillOtp,o.disabled=!e.canFillOtp||!i.autoOtp,s.disabled=!e.canFillProfile,n.textContent=i.email?`当前临时邮箱：${i.email}`:`点击按钮会自动创建临时邮箱并填入当前注册页。`};return r.addEventListener(`click`,async()=>{La(c,`正在生成临时邮箱...`,`pending`),Ia(c,await t.fillEmailFromInput()),await l()}),a.addEventListener(`click`,async()=>{La(c,`正在提交验证码...`,`pending`),Ia(c,await t.fillOtp(i.value)),await l()}),o.addEventListener(`click`,async()=>{La(c,`等待临时邮箱验证码...`,`pending`),Ia(c,await t.waitForOutlookOtp()),await l()}),s.addEventListener(`click`,async()=>{La(c,`正在填写资料...`,`pending`),Ia(c,await t.fillProfileAndCreate()),await l()}),e.append(n,r,i,a,o,s,c),l(),{update:l}}function Fa(e,t=`opx-button`){let n=document.createElement(`button`);return n.className=t,n.type=`button`,n.textContent=e,n}function Ia(e,t){La(e,t.message,t.ok?`ok`:`error`)}function La(e,t,n){e.textContent=t,e.dataset.type=n}var Ra=`opx.versionCheck.state`,za={ignoredVersion:``,lastCheckedAt:0,latest:null};async function Ba(){return Ua((await t.storage.local.get(Ra))[Ra])}async function Va(e){let n=Ua({...await Ba(),...e});return await t.storage.local.set({[Ra]:n}),n}async function Ha(e){return Va({ignoredVersion:Ga(e)})}function Ua(e){let t=Ka(e)?e:{};return{ignoredVersion:Ga(t.ignoredVersion),lastCheckedAt:Number(t.lastCheckedAt||za.lastCheckedAt),latest:Wa(t.latest)}}function Wa(e){if(!Ka(e))return null;let t=Ga(e.version),n=String(e.htmlUrl||``).trim();return!t||!n?null:{version:t,tagName:String(e.tagName||t).trim(),name:String(e.name||e.tagName||t).trim(),body:String(e.body||``).trim(),htmlUrl:n,downloadUrl:String(e.downloadUrl||n).trim(),publishedAt:String(e.publishedAt||``).trim()}}function Ga(e){return String(e||``).trim().replace(/^v/i,``)}function Ka(e){return!!(e&&typeof e==`object`)}var qa=`https://api.github.com/repos/suyancc/openai-plus-vxt/releases/latest`,Ja=1800*1e3;async function Ya(e=!1){let n=$a(t.runtime.getManifest().version),r=await Ba();if(!e&&r.latest&&Date.now()-r.lastCheckedAt<Ja)return Za(n,r.latest,r.ignoredVersion);try{let e=await fetch(qa,{headers:{Accept:`application/vnd.github+json`},cache:`no-store`});if(e.status===404)return await Va({latest:null,lastCheckedAt:Date.now()}),{currentVersion:n,latest:null,updateAvailable:!1,ignored:!1,error:`当前仓库还没有 GitHub Release`};if(!e.ok)throw Error(`GitHub API ${e.status}`);let t=Qa(await e.json());return await Va({latest:t,lastCheckedAt:Date.now()}),Za(n,t,r.ignoredVersion)}catch(e){return{currentVersion:n,latest:r.latest,updateAvailable:!!(r.latest&&Xa(r.latest.version,n)>0),ignored:!!(r.latest&&r.ignoredVersion===r.latest.version),error:e instanceof Error?e.message:String(e)}}}function Xa(e,t){let n=$a(e).split(`.`).map(eo),r=$a(t).split(`.`).map(eo),i=Math.max(n.length,r.length);for(let e=0;e<i;e+=1){let t=(n[e]||0)-(r[e]||0);if(t!==0)return t>0?1:-1}return 0}function Za(e,t,n){return{currentVersion:e,latest:t,updateAvailable:!!(t&&Xa(t.version,e)>0),ignored:!!(t&&n===t.version)}}function Qa(e){let t=String(e.tag_name||``).trim(),n=$a(t),r=String(e.html_url||``).trim();if(!n||!r)return null;let i=e.assets?.find(e=>{let t=String(e.name||``).toLowerCase();return t.endsWith(`.zip`)&&t.includes(`chrome`)})?.browser_download_url||e.assets?.find(e=>String(e.name||``).toLowerCase().endsWith(`.zip`))?.browser_download_url;return{version:n,tagName:t,name:String(e.name||t).trim(),body:String(e.body||``).trim(),htmlUrl:r,downloadUrl:String(i||r).trim(),publishedAt:String(e.published_at||``).trim()}}function $a(e){return e.trim().replace(/^v/i,``)}function eo(e){let t=Number.parseInt(e.replace(/\D.*$/,``),10);return Number.isFinite(t)?t:0}var to=`https://t.me/fuck_open`;function no(e={}){let n=document.createElement(`div`);n.className=`opx-settings-overlay`,n.hidden=!0;let r=document.createElement(`section`);r.className=`opx-settings-dialog`,r.setAttribute(`role`,`dialog`),r.setAttribute(`aria-modal`,`true`),r.setAttribute(`aria-label`,`插件设置`);let i=document.createElement(`div`);i.className=`opx-settings-header`;let a=document.createElement(`div`);a.className=`opx-settings-title`;let o=document.createElement(`strong`);o.textContent=`设置`;let s=document.createElement(`span`);s.className=`opx-version-badge`,s.textContent=`v${t.runtime.getManifest().version}`;let c=so(`×`,`关闭设置`);a.append(o,s),i.append(a,c);let l=document.createElement(`input`);l.type=`checkbox`,l.className=`opx-checkbox`;let u=document.createElement(`input`);u.type=`checkbox`,u.className=`opx-checkbox`;let d=ro(l,`OpenAI 支付页自动填写`,`用于 pay.openai.com/c/pay 页面，填写姓名、国家、地址、邮编、电话并勾选条款。`),f=ro(u,`PayPal 注册页自动填写`,`用于 paypal.com/checkoutweb/signup 页面，填写国家、邮箱、卡资料、姓名、地址和密码提示。`),p=document.createElement(`div`);p.className=`opx-setting-section-title`,p.textContent=`临时邮箱`;let m=io(`https://mail.example.com`),h=io(`admin_auth`);h.type=`password`;let g=io(`example.com`),_=io(`留空则随机生成`),v=io(`可选`);v.type=`password`;let y=document.createElement(`div`);y.className=`opx-grid`,y.append(ao(`Worker 地址`,m),ao(`admin_auth`,h),ao(`邮箱域名`,g),ao(`邮箱名称`,_),ao(`x-custom-auth`,v));let b=document.createElement(`button`);b.className=`opx-external-link-button`,b.type=`button`,b.title=`立即检查 GitHub Release 最新版本`,b.textContent=`检测更新`;let x=document.createElement(`button`);x.className=`opx-external-link-button`,x.type=`button`,x.title=`打开 TG 群组`,x.append(oo(),document.createTextNode(`TG 群组：t.me/fuck_open`));let S=document.createElement(`div`);S.className=`opx-hint`,S.textContent=`国家、城市和获取地址在“地址”tab 中操作。`;let C=document.createElement(`div`);C.className=`opx-status`,r.append(i,d,f,p,y,b,x,S,C),n.append(r),c.addEventListener(`click`,T),n.addEventListener(`click`,e=>{e.target===n&&T()}),l.addEventListener(`change`,async()=>{await F({payOpenAiEnabled:l.checked}),$(C,`设置已保存`,`ok`)}),u.addEventListener(`change`,async()=>{await F({payPalSignupEnabled:u.checked}),$(C,`设置已保存`,`ok`)});for(let e of[m,h,g,_,v])e.addEventListener(`change`,()=>void E()),e.addEventListener(`blur`,()=>void E());x.addEventListener(`click`,()=>{window.open(to,`_blank`,`noopener,noreferrer`)}),b.addEventListener(`click`,async()=>{b.disabled=!0,$(C,`正在检测 GitHub 最新版本...`,`pending`);try{let t=await Ya(!0);await e.onVersionChecked?.(),t.latest&&t.updateAvailable?$(C,`发现新版本 v${t.latest.version}，顶部已显示更新提示`,`ok`):t.latest?$(C,`当前已是最新版本 v${t.currentVersion}`,`ok`):$(C,t.error||`暂未找到可用 Release`,`pending`)}catch(e){$(C,e instanceof Error?e.message:String(e),`error`)}finally{b.disabled=!1}});let w=async()=>{let e=await I(),t=await lt();l.checked=e.payOpenAiEnabled,u.checked=e.payPalSignupEnabled,m.value=t.apiBase,h.value=t.adminAuth,g.value=t.domain,_.value=t.mailboxName,v.value=t.customAuth;let n=Number(e.payOpenAiEnabled)+Number(e.payPalSignupEnabled),r=!!(t.apiBase&&t.adminAuth&&t.domain);$(C,r?`临时邮箱已配置 · 已开启 ${n} 项自动填写`:`请先配置临时邮箱 Worker、admin_auth 和域名`,r?`ok`:`pending`)};return{element:n,open:()=>{n.hidden=!1,w()},update:w};function T(){n.hidden=!0}async function E(){await ut({apiBase:m.value,adminAuth:h.value,domain:g.value,mailboxName:_.value,customAuth:v.value}),$(C,`临时邮箱设置已保存`,`ok`)}}function ro(e,t,n){let r=document.createElement(`div`);r.className=`opx-setting-item`;let i=document.createElement(`label`);i.className=`opx-check-row`;let a=document.createElement(`span`);a.textContent=t,i.append(e,a);let o=document.createElement(`div`);return o.className=`opx-setting-description`,o.textContent=n,r.append(i,o),r}function io(e){let t=document.createElement(`input`);return t.className=`opx-input`,t.type=`text`,t.placeholder=e,t.autocomplete=`off`,t.spellcheck=!1,t}function ao(e,t){let n=document.createElement(`label`);n.className=`opx-field`;let r=document.createElement(`span`);return r.textContent=e,n.append(r,t),n}function oo(){let e=document.createElementNS(`http://www.w3.org/2000/svg`,`svg`);e.classList.add(`opx-telegram-icon`),e.setAttribute(`viewBox`,`0 0 24 24`),e.setAttribute(`aria-hidden`,`true`);let t=document.createElementNS(`http://www.w3.org/2000/svg`,`path`);return t.setAttribute(`fill`,`currentColor`),t.setAttribute(`d`,`M21.9 4.3 18.7 19c-.2 1-.8 1.2-1.6.8l-4.6-3.4-2.2 2.1c-.2.2-.4.4-.9.4l.3-4.7 8.5-7.7c.4-.3-.1-.5-.6-.2L7.1 12.9 2.6 11.5c-1-.3-1-1 0-1.4L20.2 3.3c.8-.3 1.5.2 1.7 1Z`),e.append(t),e}function so(e,t){let n=document.createElement(`button`);return n.className=`opx-icon-button`,n.type=`button`,n.textContent=e,n.title=t,n.setAttribute(`aria-label`,t),n}function $(e,t,n){e.textContent=t,e.dataset.type=n}function co(e){let t=document.createElement(`div`);t.className=`opx-summary`;let n=document.createElement(`textarea`);n.className=`opx-textarea opx-sms-input`,n.placeholder=`+14642649811----https://xxxx.com/xxx
每行一个号码和 API 链接`,n.autocomplete=`off`,n.spellcheck=!1;let r=document.createElement(`div`);r.className=`opx-button-row opx-sms-actions`;let i=uo(`保存并开始`),a=uo(`立即获取`,`opx-button opx-button-secondary`),o=uo(`清空历史`,`opx-button opx-button-secondary`);r.append(i,a,o);let s=fo(`当前号码`),c=document.createElement(`div`);c.className=`opx-sms-targets`;let l=fo(`最后一次验证码`),u=document.createElement(`div`);u.className=`opx-sms-table`;let d=document.createElement(`div`);d.className=`opx-status`;let f=new Map,p=null,m=``,h=null,g=!1;e.append(t,lo(`接码信息`,n),r,s,c,l,u,d),n.addEventListener(`input`,()=>{v(),b()}),n.addEventListener(`focus`,()=>{g=!0}),n.addEventListener(`blur`,()=>{g=!1,y()}),i.addEventListener(`click`,async()=>{await y(),b(),await S()}),a.addEventListener(`click`,async()=>{await y(),b(),await S()}),o.addEventListener(`click`,async()=>{let e=await Ze({history:[]});p=e,E(e.history),go(d,`验证码历史已清空，输入内容已保留。`,`ok`)});let _=async()=>{let e=await Xe();p=e,!g&&n.value!==e.rawInput&&(n.value=e.rawInput,m=e.rawInput,b()),E(e.history),x()};return _(),{update:_,onShow:async()=>{await _()}};function v(){h&&window.clearTimeout(h),h=window.setTimeout(()=>void y(),450)}async function y(){h&&=(window.clearTimeout(h),null);let e=n.value;e!==m&&(p=await Ze({rawInput:e}),m=e,x())}function b(){let e=Fn(n.value),t=new Set(e.targets.map(e=>e.id));for(let[e]of f)t.has(e)||f.delete(e);for(let t of e.targets){let e=f.get(t.id);e?e.target=t:f.set(t.id,{target:t,status:`waiting`,message:`等待获取`,code:``,lastCheckedAt:0,inFlight:!1})}if(c.textContent=``,!e.targets.length)c.append(po(e.errors[0]||`暂无号码，按每行“号码----API链接”输入。`));else for(let t of e.targets){let e=f.get(t.id);e&&c.append(T(e))}e.errors.length?go(d,e.errors.join(`；`),`error`):e.targets.length?go(d,`已加载 ${e.targets.length} 个接码链接，点击“立即获取”手动获取。`,`pending`):go(d,`输入内容会自动保存。`,`pending`),x()}function x(){let e=Fn(n.value),r=+!!p?.history.length,i=[...f.values()].filter(e=>e.code).length;t.textContent=`${e.targets.length} 个接码链接 · ${i} 个当前验证码 · ${r} 条最近记录`}async function S(){let e=Fn(n.value);!e.targets.length||e.errors.length||(await y(),await Promise.all(e.targets.map(e=>C(e))),b(),E(p?.history||[]))}async function C(e){let t=f.get(e.id);if(!t||t.inFlight)return;t.inFlight=!0,t.status=t.code?`found`:`waiting`,t.message=`正在获取...`,b();let n=await Xn(e);if(t.inFlight=!1,t.lastCheckedAt=Date.now(),n.kind===`code`){t.status=`found`,t.code=n.code,t.message=n.message,await w(e.phone,n.code,n.message),go(d,`${e.phone} 收到验证码 ${n.code}`,`ok`);return}if(n.kind===`error`){t.status=`error`,t.message=n.message,go(d,`${e.phone} 获取失败：${n.message}`,`error`);return}t.status=`waiting`,t.message=n.message}async function w(e,t,n){let r=p||await Xe();if(r.history.some(r=>r.phone===e&&r.code===t&&r.message===n)){p=r;return}p=await Ze({history:[{id:`${e}-${t}-${Date.now()}`,phone:e,code:t,message:n,receivedAt:Date.now()}]})}function T(e){let t=document.createElement(`div`);t.className=`opx-sms-target-row`,t.dataset.status=e.status;let n=document.createElement(`div`);n.className=`opx-sms-target-main`;let r=document.createElement(`strong`);r.textContent=e.target.phone;let i=document.createElement(`span`);i.textContent=e.code?e.message:e.message||`等待获取`,n.append(r,i);let a=document.createElement(`button`);return a.className=`opx-sms-code-chip`,a.type=`button`,a.textContent=e.code||(e.inFlight?`...`:`等待`),a.disabled=!e.code,a.title=e.code?`点击复制验证码`:`尚未收到验证码`,a.addEventListener(`click`,()=>void D(e.code,a)),t.append(n,a),t}function E(e){u.textContent=``;let t=document.createElement(`div`);if(t.className=`opx-sms-table-row opx-sms-table-head`,t.append(mo(`号码`),mo(`验证码`),mo(`时间`)),u.append(t),!e.length){let e=document.createElement(`div`);e.className=`opx-empty-inline`,e.textContent=`暂无验证码历史。`,u.append(e);return}for(let t of e.slice(0,1)){let e=document.createElement(`div`);e.className=`opx-sms-table-row`;let n=document.createElement(`button`);n.className=`opx-sms-code-chip`,n.type=`button`,n.textContent=t.code,n.title=t.message||`点击复制验证码`,n.addEventListener(`click`,()=>void D(t.code,n)),e.append(mo(t.phone),ho(n),mo(_o(t.receivedAt))),u.append(e)}}async function D(e,t){if(!e)return;await navigator.clipboard.writeText(e);let n=t.textContent||e;t.textContent=`已复制`,t.classList.add(`is-copied`),window.setTimeout(()=>{t.textContent=n,t.classList.remove(`is-copied`)},1200)}}function lo(e,t){let n=document.createElement(`label`);n.className=`opx-field`;let r=document.createElement(`span`);return r.className=`opx-label`,r.textContent=e,n.append(r,t),n}function uo(e,t=`opx-button`){let n=document.createElement(`button`);return n.className=t,n.type=`button`,n.textContent=e,n}function fo(e){let t=document.createElement(`div`);return t.className=`opx-section-title`,t.textContent=e,t}function po(e){let t=document.createElement(`div`);return t.className=`opx-empty-inline`,t.textContent=e,t}function mo(e){let t=document.createElement(`div`);return t.className=`opx-sms-table-cell`,t.textContent=e,t}function ho(e){let t=document.createElement(`div`);return t.className=`opx-sms-table-cell`,t.append(e),t}function go(e,t,n){e.textContent=t,e.dataset.type=n}function _o(e){return e?new Date(e).toLocaleTimeString(`zh-CN`,{hour12:!1,hour:`2-digit`,minute:`2-digit`,second:`2-digit`}):`-`}function vo(){let e=document.createElement(`section`);e.className=`opx-version-notice`,e.hidden=!0;let t=document.createElement(`div`);t.className=`opx-version-notice-title`;let n=document.createElement(`div`);n.className=`opx-version-notice-body`;let r=document.createElement(`div`);r.className=`opx-version-notice-actions`;let i=document.createElement(`button`);i.className=`opx-mini-button`,i.type=`button`,i.textContent=`下载更新`;let a=document.createElement(`button`);a.className=`opx-mini-button opx-mini-button-secondary`,a.type=`button`,a.textContent=`更新说明`;let o=document.createElement(`button`);o.className=`opx-mini-button opx-mini-button-secondary`,o.type=`button`,o.textContent=`忽略`,r.append(i,a,o),e.append(t,n,r);let s=null;return i.addEventListener(`click`,()=>{s?.downloadUrl&&window.open(s.downloadUrl,`_blank`,`noopener,noreferrer`)}),a.addEventListener(`click`,()=>{s?.htmlUrl&&window.open(s.htmlUrl,`_blank`,`noopener,noreferrer`)}),o.addEventListener(`click`,async()=>{s&&(await Ha(s.version),e.hidden=!0)}),{element:e,update:async(r=!1)=>{let i=await Ya(r);s=i.latest,yo(i,e,t,n)}}}function yo(e,t,n,r){if(!e.latest||!e.updateAvailable||e.ignored){t.hidden=!0;return}n.textContent=`发现新版本 v${e.latest.version}`,r.textContent=bo(e.currentVersion,e.latest),t.hidden=!1}function bo(e,t){let n=t.body.split(/\r?\n/).map(e=>e.replace(/^#+\s*/,``).trim()).filter(Boolean).slice(0,2).join(` / `),r=`当前 v${e}，最新 ${t.tagName||`v${t.version}`}`;return n?`${r}。${n}`:r}var xo=`
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
`;function So(e,t){e.innerHTML=``;let n=document.createElement(`style`);n.textContent=xo;let r=document.createElement(`div`);r.className=`opx-shell`;let i=document.createElement(`button`);i.className=`opx-collapse-toggle`,i.type=`button`,i.textContent=`收起`,i.title=`收起侧边栏`,i.setAttribute(`aria-expanded`,`true`);let a=document.createElement(`aside`);a.className=`opx-panel`;let o=document.createElement(`div`);o.className=`opx-topbar`;let s=document.createElement(`div`);s.className=`opx-tabs`;let c=To(`register`,`注册`),l=To(`link`,`提链接`),u=To(`address`,`地址`),d=To(`sms`,`接码`);s.append(c,l,u,d);let f=document.createElement(`button`);f.className=`opx-icon-button`,f.type=`button`,f.textContent=`⚙`,f.title=`打开设置`,f.setAttribute(`aria-label`,`打开设置`);let p=document.createElement(`div`);p.className=`opx-state`;let m=wo(),h=wo(),g=wo(),_=wo(),v={register:Pa(m,t),link:Ta(h),address:ga(g),sms:co(_)},y=vo(),b=no({onVersionChecked:()=>y.update(!0)}),x=`register`,S=e=>{r.classList.toggle(`is-collapsed`,e),i.textContent=e?`展开`:`收起`,i.title=e?`展开侧边栏`:`收起侧边栏`,i.setAttribute(`aria-expanded`,e?`false`:`true`)},C=async e=>{Qe(e)&&(x=e,await We(e),w(),await v[e].onShow?.(),await T())},w=()=>{for(let e of[c,l,u,d])e.classList.toggle(`is-active`,e.dataset.tab===x);m.hidden=x!==`register`,h.hidden=x!==`link`,g.hidden=x!==`address`,_.hidden=x!==`sms`},T=async()=>{let e=await M();x=e.activeTab,S(e.panelCollapsed),w(),p.textContent=Co(x,t),await v[x].update()};c.addEventListener(`click`,()=>void C(`register`)),l.addEventListener(`click`,()=>void C(`link`)),u.addEventListener(`click`,()=>void C(`address`)),d.addEventListener(`click`,()=>void C(`sms`)),f.addEventListener(`click`,()=>b.open()),i.addEventListener(`click`,()=>{let e=!r.classList.contains(`is-collapsed`);S(e),Ge(e)}),o.append(s,f),a.append(o,y.element,p,m,h,g,_,b.element),r.append(i,a),e.append(n,r),window.setInterval(()=>void T(),1e3),window.setTimeout(()=>void y.update(),800),T().then(()=>{v[x].onShow?.()})}function Co(e,t){return e===`register`?t.getPageState().label:e===`link`?`提链接：ChatGPT session`:e===`address`?`地址：随机资料`:`接码：短信验证码`}function wo(){let e=document.createElement(`section`);return e.className=`opx-view`,e}function To(e,t){let n=document.createElement(`button`);return n.className=`opx-tab`,n.type=`button`,n.dataset.tab=e,n.textContent=t,n}var Eo=`opx-assistant-root`;function Do(){if(document.getElementById(Eo))return;let e=document.createElement(`div`);e.id=Eo,document.documentElement.append(e);let t=e.attachShadow({mode:`open`}),n=xt();So(t,n),n.autoRunForCurrentPage()}var Oo=`__opx_assistant_content_loaded__`,ko=[`chatgpt.com`,`chat.openai.com`,`auth.openai.com`,`pay.openai.com`,`www.paypal.com`,`paypal.com`],Ao=e({matches:[`https://*/*`,`http://*/*`],runAt:`document_idle`,registration:`manifest`,allFrames:!0,main(){let e=globalThis;if(!e[Oo]&&(e[Oo]=!0,jo(),No(location.hostname))){window.top===window&&Do();try{zt()}catch(e){console.warn(`[OPX] pay autofill init failed`,e)}try{wr()}catch(e){console.warn(`[OPX] PayPal autofill init failed`,e)}}}});function jo(){window.addEventListener(`message`,e=>{if(e.source!==window||!Mo(e.data))return;let n=typeof e.data.requestId==`string`?e.data.requestId:``;t.runtime.sendMessage({type:`opx:run-pay-link`,pay:e.data.pay||e.data.url||e.data.link||e.data.paymentLink||``,incognito:e.data.incognito===!0}).then(e=>{window.postMessage({type:`opx:run-pay-link-result`,requestId:n,...e&&typeof e==`object`?e:{ok:!1,message:`插件返回结果无效`}},`*`)}).catch(e=>{window.postMessage({type:`opx:run-pay-link-result`,requestId:n,ok:!1,message:String(e)},`*`)})})}function Mo(e){if(!e||typeof e!=`object`)return!1;let t=e;return t.type===`opx:run-pay-link`&&typeof(t.pay||t.url||t.link||t.paymentLink||``)==`string`}function No(e){return ko.includes(e)}var Po={debug:(...e)=>([...e],void 0),log:(...e)=>([...e],void 0),warn:(...e)=>([...e],void 0),error:(...e)=>([...e],void 0)},Fo=class e extends Event{static EVENT_NAME=Io(`wxt:locationchange`);constructor(t,n){super(e.EVENT_NAME,{}),this.newUrl=t,this.oldUrl=n}};function Io(e){return`${t?.runtime?.id}:content:${e}`}var Lo=typeof globalThis.navigation?.addEventListener==`function`;function Ro(e){let t,n=!1;return{run(){n||(n=!0,t=new URL(location.href),Lo?globalThis.navigation.addEventListener(`navigate`,e=>{let n=new URL(e.destination.url);n.href!==t.href&&(window.dispatchEvent(new Fo(n,t)),t=n)},{signal:e.signal}):e.setInterval(()=>{let e=new URL(location.href);e.href!==t.href&&(window.dispatchEvent(new Fo(e,t)),t=e)},1e3))}}}var zo=class e{static SCRIPT_STARTED_MESSAGE_TYPE=Io(`wxt:content-script-started`);id;abortController;locationWatcher=Ro(this);constructor(e,t){this.contentScriptName=e,this.options=t,this.id=Math.random().toString(36).slice(2),this.abortController=new AbortController,this.stopOldScripts(),this.listenForNewerScripts()}get signal(){return this.abortController.signal}abort(e){return this.abortController.abort(e)}get isInvalid(){return t.runtime?.id??this.notifyInvalidated(),this.signal.aborted}get isValid(){return!this.isInvalid}onInvalidated(e){return this.signal.addEventListener(`abort`,e),()=>this.signal.removeEventListener(`abort`,e)}block(){return new Promise(()=>{})}setInterval(e,t){let n=setInterval(()=>{this.isValid&&e()},t);return this.onInvalidated(()=>clearInterval(n)),n}setTimeout(e,t){let n=setTimeout(()=>{this.isValid&&e()},t);return this.onInvalidated(()=>clearTimeout(n)),n}requestAnimationFrame(e){let t=requestAnimationFrame((...t)=>{this.isValid&&e(...t)});return this.onInvalidated(()=>cancelAnimationFrame(t)),t}requestIdleCallback(e,t){let n=requestIdleCallback((...t)=>{this.signal.aborted||e(...t)},t);return this.onInvalidated(()=>cancelIdleCallback(n)),n}addEventListener(e,t,n,r){t===`wxt:locationchange`&&this.isValid&&this.locationWatcher.run(),e.addEventListener?.(t.startsWith(`wxt:`)?Io(t):t,n,{...r,signal:this.signal})}notifyInvalidated(){this.abort(`Content script context invalidated`),Po.debug(`Content script "${this.contentScriptName}" context invalidated`)}stopOldScripts(){document.dispatchEvent(new CustomEvent(e.SCRIPT_STARTED_MESSAGE_TYPE,{detail:{contentScriptName:this.contentScriptName,messageId:this.id}})),this.options?.noScriptStartedPostMessage||window.postMessage({type:e.SCRIPT_STARTED_MESSAGE_TYPE,contentScriptName:this.contentScriptName,messageId:this.id},`*`)}verifyScriptStartedEvent(e){let t=e.detail?.contentScriptName===this.contentScriptName,n=e.detail?.messageId===this.id;return t&&!n}listenForNewerScripts(){let t=e=>{!(e instanceof CustomEvent)||!this.verifyScriptStartedEvent(e)||this.notifyInvalidated()};document.addEventListener(e.SCRIPT_STARTED_MESSAGE_TYPE,t),this.onInvalidated(()=>document.removeEventListener(e.SCRIPT_STARTED_MESSAGE_TYPE,t))}},Bo={debug:(...e)=>([...e],void 0),log:(...e)=>([...e],void 0),warn:(...e)=>([...e],void 0),error:(...e)=>([...e],void 0)};return(async()=>{try{let{main:e,...t}=Ao;return await e(new zo(`content`,t))}catch(e){throw Bo.error(`The content script "content" crashed on startup!`,e),e}})()})();
content;