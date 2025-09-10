function bindAnimatedButtons() {
  // Opt-in only: moving spotlight disabled by default
  document.querySelectorAll('[data-spotlight="on"]').forEach(function(button) {
    button.addEventListener('pointermove', function(e) {
      var rect = button.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      button.style.setProperty('--x', x + 'px');
      button.style.setProperty('--y', y + 'px');
    });
  });
}

function bindMobileMenu() {
  var btn = document.querySelector('.menu-btn');
  var panel = document.querySelector('.mobile-panel');
  if (!btn || !panel) return;
  btn.addEventListener('click', function() {
    panel.classList.toggle('open');
  });
}

function bindHeaderScroll() {
  var header = document.querySelector('header');
  if (!header) return;
  function onScroll() {
    if (window.scrollY > 8) header.classList.add('header-scrolled');
    else header.classList.remove('header-scrolled');
  }
  onScroll();
  window.addEventListener('scroll', onScroll);
}

function bindHeroParallax() {
  var orbs = document.querySelectorAll('.hero .orb');
  if (!orbs.length) return;
  var strength = [0.15, 0.25, 0.35];
  function update() {
    var y = window.scrollY || window.pageYOffset;
    orbs.forEach(function(orb, i) {
      var s = strength[i % strength.length];
      orb.style.transform = 'translateY(' + (y * -s) + 'px)';
    });
    requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

function bindNavUnderline() {
  var nav = document.querySelector('.nav-links');
  if (!nav) return;
  var set = function(el) {
    var r = el.getBoundingClientRect();
    var nr = nav.getBoundingClientRect();
    var left = r.left - nr.left;
    nav.style.setProperty('--u-left', left + 'px');
    nav.style.setProperty('--u-width', r.width + 'px');
    nav.style.setProperty('--u-opacity', 1);
  };
  nav.addEventListener('mouseleave', function(){
    nav.style.setProperty('--u-opacity', 0);
  });
  nav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('mouseenter', function(){ set(a); });
    // If current page link has aria-current or matches URL, set on load
    if (a.getAttribute('aria-current') === 'page' || a.href === window.location.href) {
      set(a);
    }
  });
}

// initialize after DOM loaded
document.addEventListener('DOMContentLoaded', function() {
  bindAnimatedButtons();
  bindMobileMenu();
  bindHeaderScroll();
  bindHeroParallax();
  bindThreeDTilt();
  bindNavUnderline();
  // Scroll reveal
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(function(el) { observer.observe(el); });
  // Contact form submit
  var form = document.getElementById('contact-form');
  if (form) {
    var statusEl = document.getElementById('contact-status');
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var formData = new FormData(form);
      var payload = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        service: formData.get('service'),
        message: formData.get('message')
      };
      if (statusEl) statusEl.textContent = 'Sending...';
      // Send to WhatsApp Function
      var wReq = fetch('/.netlify/functions/send-whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).then(function(res) { return res.json().catch(function(){ return {}; }); });

      // Submit to Netlify Forms
      var fReq = fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': form.getAttribute('name') || 'contact',
          'name': payload.name,
          'phone': payload.phone,
          'email': payload.email,
          'service': payload.service,
          'message': payload.message
        }).toString()
      });

      Promise.allSettled([wReq, fReq])
        .then(function(results) {
          var wOk = results[0].status === 'fulfilled' && results[0].value && results[0].value.success;
          var fOk = results[1].status === 'fulfilled';
          if (wOk || fOk) {
            if (statusEl) statusEl.textContent = 'Thanks! We\'ll be in touch shortly.';
            form.reset();
          } else {
            if (statusEl) statusEl.textContent = 'Failed to send. Please try again later.';
          }
        })
        .catch(function() {
          if (statusEl) statusEl.textContent = 'Failed to send. Please try again later.';
        });
    });
  }
});

function bindThreeDTilt() {
  // Opt-in only: elements must declare data-tilt="on"
  var elements = document.querySelectorAll('[data-tilt="on"]');
  if (!elements.length) return;
  var maxTilt = 8; // degrees
  elements.forEach(function(el) {
    el.addEventListener('pointermove', function(e) {
      var rect = el.getBoundingClientRect();
      var px = (e.clientX - rect.left) / rect.width;
      var py = (e.clientY - rect.top) / rect.height;
      var tiltX = (py - 0.5) * -2 * maxTilt;
      var tiltY = (px - 0.5) * 2 * maxTilt;
      el.style.transform = 'perspective(800px) translateY(-2px) rotateX(' + tiltX.toFixed(2) + 'deg) rotateY(' + tiltY.toFixed(2) + 'deg)';
    });
    el.addEventListener('pointerleave', function() {
      el.style.transform = '';
    });
  });
}


