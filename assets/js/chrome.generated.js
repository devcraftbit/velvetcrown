(function(){
  if(window.__g2ChromeRuntimeBound) return;
  window.__g2ChromeRuntimeBound = true;
  var firstForm=document.querySelector('form');
  if(firstForm && !firstForm.id){
    firstForm.id='contact-form';
  }
  if(window.location.hash === '#contact-form'){
    var hashTarget=document.getElementById('contact-form') || firstForm;
    if(hashTarget){
      setTimeout(function(){
        try{ hashTarget.scrollIntoView({behavior:'smooth',block:'start'}); }
        catch(_err){ hashTarget.scrollIntoView(); }
      }, 24);
    }
  }
  var burgers=Array.prototype.slice.call(document.querySelectorAll('[data-burger]'));
  var mobile=document.querySelector('[data-mobile-nav]');
  if(!burgers.length||!mobile) return;
  var closeButtons=Array.prototype.slice.call(mobile.querySelectorAll('[data-mobile-close], [data-close], [data-dismiss], button[aria-label], [aria-label]'));
  var openStateClasses=['is-open','active','open'];
  function setLock(open){
    if(document.body && document.body.classList){
      document.body.classList.toggle('overflow-hidden', open);
      document.body.classList.toggle('no-scroll', open);
    }
    if(document.documentElement && document.documentElement.classList){
      document.documentElement.classList.toggle('overflow-hidden', open);
    }
    document.documentElement.style.overflow=open?'hidden':'';
  }
  function setOpen(open){
    openStateClasses.forEach(function(cls){ mobile.classList.toggle(cls, open); });
    mobile.classList.toggle('hidden', !open);
    mobile.hidden=!open;
    mobile.setAttribute('aria-hidden', open ? 'false' : 'true');
    mobile.setAttribute('data-mobile-open', open ? '1' : '0');
    burgers.forEach(function(btn){ btn.setAttribute('aria-expanded', open ? 'true' : 'false'); });
    setLock(open);
  }
  function isOpen(){
    if(openStateClasses.some(function(cls){ return mobile.classList.contains(cls); })) return true;
    if(mobile.getAttribute('data-mobile-open') === '1') return true;
    if('hidden' in mobile) return !mobile.hidden;
    return !mobile.classList.contains('hidden');
  }
  burgers.forEach(function(btn){
    btn.addEventListener('click', function(event){
      event.preventDefault();
      setOpen(!isOpen());
    });
  });
  closeButtons.forEach(function(btn){
    var aria=String(btn.getAttribute('aria-label') || '').toLowerCase();
    var cls=String(btn.getAttribute('class') || '').toLowerCase();
    var id=String(btn.getAttribute('id') || '').toLowerCase();
    var isLikelyClose=
      btn.hasAttribute('data-mobile-close') ||
      btn.hasAttribute('data-close') ||
      btn.hasAttribute('data-dismiss') ||
      aria.indexOf('close') !== -1 ||
      aria.indexOf('закры') !== -1 ||
      aria.indexOf('menu') !== -1 ||
      cls.indexOf('close') !== -1 ||
      id.indexOf('close') !== -1;
    if(!isLikelyClose) return;
    btn.addEventListener('click', function(event){
      event.preventDefault();
      setOpen(false);
    });
  });
  mobile.addEventListener('click', function(event){
    if(event.target === mobile) setOpen(false);
    var link = event.target && event.target.closest && event.target.closest('a[href]');
    if(link) setOpen(false);
  });
  document.addEventListener('keydown', function(event){
    if(event.key === 'Escape') setOpen(false);
  });
  window.addEventListener('resize', function(){
    if(window.innerWidth >= 900) setOpen(false);
  });
  window.addEventListener('pagehide', function(){
    setLock(false);
  });
  setOpen(false);
})();
