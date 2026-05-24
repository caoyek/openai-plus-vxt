(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=globalThis.browser?.runtime?.id?globalThis.browser:globalThis.chrome,t=`opx.popup.paymentLink`,n=`opx.popup.accessToken`,r=`opx.popup.openIncognito`,i=`opx.popup.checkoutOptions`;document.querySelector(`#app`).innerHTML=`
  <main class="opx-popup">
    <header class="opx-header">
      <strong>PayPal 支付测试</strong>
      <span>输入长链，或用 accessToken 生成长链后继续</span>
    </header>
    <div class="opx-tabs" role="tablist">
      <button id="tab-link" class="opx-tab is-active" type="button">支付长链</button>
      <button id="tab-token" class="opx-tab" type="button">accessToken</button>
    </div>
    <section id="view-link" class="opx-view">
      <label class="opx-field">
        <span>支付长链</span>
        <textarea id="payment-link" placeholder="粘贴 pay.openai.com / chatgpt.com / Stripe 支付长链"></textarea>
      </label>
    </section>
    <section id="view-token" class="opx-view" hidden>
      <label class="opx-field">
        <span>accessToken / session JSON</span>
        <textarea id="access-token" placeholder="粘贴 ChatGPT accessToken，或包含 accessToken 的 session JSON"></textarea>
      </label>
      <div class="opx-grid">
        <label class="opx-field">
          <span>套餐</span>
          <select id="plan">
            <option value="chatgptplusplan">ChatGPT Plus</option>
            <option value="chatgptteamplan">ChatGPT Team</option>
          </select>
        </label>
        <label class="opx-field">
          <span>区域</span>
          <select id="region">
            <option value="US">美国 / USD</option>
            <option value="ID">印尼 / IDR</option>
            <option value="DE">德国 / EUR</option>
            <option value="JP">日本 / JPY</option>
          </select>
        </label>
      </div>
      <div class="opx-grid">
        <label class="opx-field">
          <span>Workspace</span>
          <input id="workspace" type="text" placeholder="Team 套餐使用" />
        </label>
        <label class="opx-field">
          <span>席位</span>
          <input id="seats" type="number" min="2" step="1" />
        </label>
      </div>
    </section>
    <label class="opx-check-row">
      <input id="open-incognito" type="checkbox" />
      <span>无痕窗口打开</span>
    </label>
    <ol class="opx-steps" id="steps">
      <li data-step="source">1. 准备支付长链或 accessToken</li>
      <li data-step="generate">2. 生成 checkout 长链</li>
      <li data-step="open">3. 打开支付页面</li>
      <li data-step="pay">4. 在支付页确认自动填写结果</li>
      <li data-step="paypal">5. 跳转 PayPal 后确认填写结果</li>
    </ol>
    <div class="opx-actions">
      <button id="generate-link" type="button">生成长链</button>
      <button id="open-link" type="button" class="opx-secondary">打开当前长链</button>
    </div>
    <div id="status" class="opx-status">等待输入</div>
  </main>
`;var a=document.querySelector(`#tab-link`),o=document.querySelector(`#tab-token`),s=document.querySelector(`#view-link`),c=document.querySelector(`#view-token`),l=document.querySelector(`#payment-link`),u=document.querySelector(`#access-token`),d=document.querySelector(`#plan`),f=document.querySelector(`#region`),p=document.querySelector(`#workspace`),m=document.querySelector(`#seats`),h=document.querySelector(`#open-incognito`),g=document.querySelector(`#generate-link`),_=document.querySelector(`#open-link`),v=document.querySelector(`#status`),y=document.querySelector(`#steps`),b=`link`,x=!1;S(),a.addEventListener(`click`,()=>C(`link`)),o.addEventListener(`click`,()=>C(`token`)),l.addEventListener(`input`,()=>{e.storage.local.set({[t]:l.value.trim()}),P(l.value.trim()?`链接已保存`:`等待输入链接`,`pending`),I(`source`,!!l.value.trim()),I(`generate`,b===`link`&&!!l.value.trim())}),u.addEventListener(`input`,()=>{e.storage.local.set({[n]:u.value.trim()}),P(u.value.trim()?`Token 已保存`:`等待输入 accessToken`,`pending`),I(`source`,!!u.value.trim())});for(let e of[d,f,p,m])e.addEventListener(`change`,()=>void j()),e.addEventListener(`input`,()=>void j());h.addEventListener(`change`,()=>{e.storage.local.set({[r]:h.checked})}),g.addEventListener(`click`,async()=>{g.disabled=!0;try{if(b===`link`){let n=w();if(!n.ok){P(n.message,`error`),I(`generate`,!1);return}l.value=n.url,await e.storage.local.set({[t]:n.url}),I(`source`,!0),I(`generate`,!0),P(`长链已准备，下一步可手动打开`,`ok`);return}let n=await T();if(!n.ok){P(n.message,`error`),I(`generate`,!1);return}I(`source`,!0),I(`generate`,!0),P(`checkout 长链已生成，下一步可手动打开`,`ok`)}catch(e){P(`生成失败：${e instanceof Error?e.message:String(e)}`,`error`)}finally{g.disabled=!1}}),_.addEventListener(`click`,async()=>{let e=w();if(!e.ok){P(e.message,`error`);return}_.disabled=!0;try{await E(e.url),I(`open`,!0),P(`已打开支付页面，请在新窗口确认后续步骤`,`ok`)}catch(e){P(`打开失败：${L(e)}`,`error`)}finally{_.disabled=!1}});async function S(){let a=await e.storage.local.get([t,n,r,i]);l.value=``,u.value=typeof a[n]==`string`?a[n]:``,h.checked=a[r]===!0,M(a[i]),P(`等待输入`,`pending`),F(),await D()}function C(e){b=e,a.classList.toggle(`is-active`,b===`link`),o.classList.toggle(`is-active`,b===`token`),s.hidden=b!==`link`,c.hidden=b!==`token`,g.textContent=b===`link`?`确认长链`:`生成长链`,F(),P(b===`link`?`等待输入支付长链`:`等待输入 accessToken`,`pending`)}function w(){return k(l.value.trim())}async function T(){let n=u.value.trim();if(!n)return{ok:!1,message:`请先输入 accessToken 或 session JSON`};let r=A();P(`正在生成 checkout 长链...`,`pending`);let i=await e.runtime.sendMessage({type:`opx:create-checkout-link`,raw:n,options:r});if(!i?.ok||!i.link)return{ok:!1,message:i?.message||`生成长链失败`};let a=i.longUrl||i.providerUrl||i.link;return await e.storage.local.set({[t]:a}),l.value=a,{ok:!0,url:a}}async function E(t){if(h.checked){await e.windows.create({url:t,incognito:!0,focused:!0});return}await e.tabs.create({url:t,active:!0})}async function D(){if(x)return;x=!0;let n=new URLSearchParams(location.search),i=n.get(`pay`)||n.get(`url`)||n.get(`link`)||n.get(`paymentLink`)||``;if(!i.trim())return;let a=k(i.trim());if(!a.ok){C(`link`),P(`参数链接无效：${a.message}`,`error`);return}if(C(`link`),l.value=a.url,await e.storage.local.set({[t]:a.url}),I(`source`,!0),I(`generate`,!0),O(n.get(`incognito`)||n.get(`private`))&&(h.checked=!0,await e.storage.local.set({[r]:!0})),!O(n.get(`auto`))&&!O(n.get(`run`))){P(`已从参数载入长链，可点击打开`,`ok`);return}_.disabled=!0;try{await E(a.url),I(`open`,!0),P(`已按参数自动打开支付页面`,`ok`)}catch(e){P(`自动打开失败：${L(e)}`,`error`)}finally{_.disabled=!1}}function O(e){return/^(1|true|yes|on)$/i.test(String(e||``).trim())}function k(e){if(!e)return{ok:!1,message:`请先输入支付长链`};try{let t=new URL(e);return t.protocol===`https:`?N(t.hostname)?{ok:!0,url:t.toString()}:{ok:!1,message:`只支持 OpenAI / ChatGPT / PayPal / Stripe 支付链接`}:{ok:!1,message:`支付链接必须是 https 地址`}}catch{return{ok:!1,message:`链接格式无效`}}}function A(){return{planName:d.value,uiMode:`hosted`,region:f.value,workspaceName:p.value.trim()||`MyTeam`,seatQuantity:Number(m.value||5)}}async function j(){await e.storage.local.set({[i]:A()})}function M(e){let t=e&&typeof e==`object`?e:{};d.value=t.planName===`chatgptteamplan`?`chatgptteamplan`:`chatgptplusplan`,f.value=t.region===`ID`||t.region===`DE`||t.region===`JP`?t.region:`US`,p.value=typeof t.workspaceName==`string`?t.workspaceName:`MyTeam`,m.value=String(typeof t.seatQuantity==`number`?t.seatQuantity:5)}function N(e){return e===`pay.openai.com`||e===`chatgpt.com`||e===`chat.openai.com`||e.endsWith(`paypal.com`)||e.endsWith(`stripe.com`)||e.endsWith(`stripe.com.cn`)}function P(e,t){v.textContent=e,v.dataset.type=t}function F(){I(`source`,b===`link`?!!l.value.trim():!!u.value.trim()),I(`generate`,!!l.value.trim()),I(`open`,!1),I(`pay`,!1),I(`paypal`,!1)}function I(e,t){let n=y.querySelector(`[data-step="${e}"]`);n&&(n.dataset.done=t?`true`:`false`)}function L(e){let t=e instanceof Error?e.message:String(e);return/incognito|无痕/i.test(t)?`请先在 chrome://extensions 为本扩展开启“允许在无痕模式下使用”`:t}