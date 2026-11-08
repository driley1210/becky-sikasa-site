/* Becky Sikasa — cookie consent + tracking tags.
   Tags load only after the visitor accepts. Edit the IDs below. */
(function(){
  var IDS = {
    meta:   '942667448597117',
    tiktok: 'D4I7OQRC77UBQQ2RB03G',
    google: ''            // e.g. 'AW-123456789' (Google Ads) or 'G-XXXXXXX' (GA4). Leave empty to disable.
  };
  var KEY='bs_consent_v1';

  function get(){ try{return localStorage.getItem(KEY)}catch(e){return null} }
  function set(v){ try{localStorage.setItem(KEY,v)}catch(e){} }

  function loadMeta(id){
    if(!id) return;
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;
    s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init',id); fbq('track','PageView');
  }
  function loadTikTok(id){
    if(!id) return;
    !function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"];
    ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
    ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
    ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};
    var s=d.createElement("script");s.type="text/javascript",s.async=!0,s.src=r+"?sdkid="+e+"&lib="+t;var a=d.getElementsByTagName("script")[0];a.parentNode.insertBefore(s,a)};
    ttq.load(id); ttq.page();}(window,document,'ttq');
  }
  function loadGoogle(id){
    if(!id) return;
    var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+id;document.head.appendChild(s);
    window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;
    gtag('js',new Date()); gtag('config',id);
  }
  var loaded=false;
  function loadAll(){ if(loaded) return; loaded=true; loadMeta(IDS.meta); loadTikTok(IDS.tiktok); loadGoogle(IDS.google); }

  /* banner */
  var css='.ck{position:fixed;left:16px;right:16px;bottom:16px;z-index:200;max-width:560px;margin:0 auto;padding:18px 20px;background:rgba(5,6,8,.92);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid rgba(239,230,214,.25);border-radius:18px;color:#EFE6D6;font-family:"EB Garamond",Garamond,serif;font-size:17px;line-height:1.4;transform:translateY(20px);opacity:0;transition:opacity .4s,transform .4s}'
   +'.ck.on{opacity:1;transform:none}.ck p{margin:0 0 14px}.ck a{color:inherit;text-decoration:underline}'
   +'.ck .row{display:flex;gap:10px;flex-wrap:wrap}.ck button{font:inherit;font-style:italic;font-size:17px;padding:10px 20px;border-radius:999px;border:1.5px solid #EFE6D6;background:transparent;color:#EFE6D6;cursor:pointer}'
   +'.ck button.yes{background:#EFE6D6;color:#050608}.ck button:focus-visible{outline:2px solid #EFE6D6;outline-offset:3px}';
  var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

  function banner(){
    if(document.getElementById('ck')) return;
    var d=document.createElement('div');d.className='ck';d.id='ck';d.setAttribute('role','dialog');d.setAttribute('aria-label','Cookies');
    d.innerHTML='<p>This site uses cookies from Meta, TikTok and Google to measure visits and show Becky’s music to people who might like it. Essential cookies only, unless you say yes. <a href="privacy.html">Privacy &amp; cookies</a></p>'
      +'<div class="row"><button class="yes" type="button">Accept</button><button class="no" type="button">Essential only</button></div>';
    document.body.appendChild(d);
    requestAnimationFrame(function(){d.classList.add('on')});
    d.querySelector('.yes').addEventListener('click',function(){set('all');loadAll();d.remove()});
    d.querySelector('.no').addEventListener('click',function(){set('none');d.remove()});
  }

  var gpc = navigator.globalPrivacyControl===true;
  var c=get();
  if(c==='all'){ loadAll(); }
  else if(c==='none'){ /* nothing */ }
  else if(gpc){ set('none'); }
  else { banner(); }

  /* footer "Cookie settings" link reopens the choice */
  document.addEventListener('click',function(e){
    var a=e.target.closest('[data-cookie-settings]'); if(!a) return;
    e.preventDefault(); try{localStorage.removeItem(KEY)}catch(x){} banner();
  });
})();
