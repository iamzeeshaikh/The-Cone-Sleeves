/*
 * Front-end behaviour for The Cone Sleeves.
 *
 * Replaces the WordPress/Elementor/Rishi JS bundles with the small amount of
 * scripting the design actually needs. Desktop dropdowns and the FAQ accordions
 * are pure CSS / native <details>; everything below is what is left over.
 */

const on = (el, ev, fn) => el && el.addEventListener(ev, fn);
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/* ---------------------------------------------------------------- menus --- */

// Rishi positions desktop dropdowns from a data attribute its own JS wrote.
$$('#header .menu > li.menu-item-has-children').forEach((li) => {
  if (!li.hasAttribute('data-submenu')) li.setAttribute('data-submenu', 'right');
});

// Off-canvas drawer
const drawer = $('#offcanvas');
const canvas = $('.cb__drawer-canvas');

function openDrawer() {
  if (!drawer) return;
  drawer.classList.add('active');
  document.body.classList.add('showing-main-menu-modal');
  const close = $('.close-main-nav-toggle', drawer);
  if (close) close.focus();
}

function closeDrawer() {
  if (!drawer) return;
  drawer.classList.remove('active');
  document.body.classList.remove('showing-main-menu-modal');
}

$$('.cb__header-trigger, .toggle-btn[href="#offcanvas"]').forEach((btn) =>
  on(btn, 'click', (e) => {
    e.preventDefault();
    const open = drawer && drawer.classList.contains('active');
    btn.setAttribute('aria-expanded', String(!open));
    open ? closeDrawer() : openDrawer();
  })
);

$$('#offcanvas .close-main-nav-toggle, #offcanvas .close-button, #offcanvas .cb__panel-actions .close')
  .forEach((btn) => on(btn, 'click', (e) => { e.preventDefault(); closeDrawer(); }));

on(canvas, 'click', closeDrawer);

// Mobile submenu accordions
$$('#offcanvas .menu-item-has-children > a, #offcanvas .page_item_has_children > a').forEach((a) => {
  const li = a.parentElement;
  const toggle = $('.submenu-toggle', a) || $('.child-indicator', a);
  const handler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    li.classList.toggle('current-menu-active');
    a.setAttribute('aria-expanded', String(li.classList.contains('current-menu-active')));
  };
  if (toggle) on(toggle, 'click', handler);
  // Parent entries in this menu are placeholders ("#"), so the label toggles too.
  if (a.getAttribute('href') === '#' || a.getAttribute('href') === '') on(a, 'click', handler);
});

/* -------------------------------------------------------------- search --- */

$$('.cb__header-search').forEach((btn) => {
  const key = btn.getAttribute('data-modal-key');
  const modal = document.querySelector(`.search-toggle-form[data-modal-key="${key}"]`);
  if (!modal) return;
  on(btn, 'click', (e) => {
    e.preventDefault();
    modal.classList.add('is-open');
    document.body.classList.add('showing-search-modal');
    const field = $('.search-field', modal);
    if (field) field.focus();
  });
  $$('.btn-form-close', modal).forEach((c) =>
    on(c, 'click', (e) => {
      e.preventDefault();
      modal.classList.remove('is-open');
      document.body.classList.remove('showing-search-modal');
    })
  );
});

/* --------------------------------------------------------------- popup --- */

const popup = $('#quote-popup');

function openPopup() {
  if (!popup) return;
  popup.hidden = false;
  document.body.classList.add('tcs-popup-open');
  const field = popup.querySelector('input, textarea, button');
  if (field) field.focus();
}

function closePopup() {
  if (!popup) return;
  popup.hidden = true;
  document.body.classList.remove('tcs-popup-open');
}

$$('a[href="#quote-popup"]').forEach((a) =>
  on(a, 'click', (e) => { e.preventDefault(); openPopup(); })
);
$$('[data-popup-close]').forEach((el) => on(el, 'click', closePopup));

on(document, 'keydown', (e) => {
  if (e.key !== 'Escape') return;
  closePopup();
  closeDrawer();
  $$('.search-toggle-form.is-open').forEach((m) => m.classList.remove('is-open'));
  document.body.classList.remove('showing-search-modal');
});

/* ------------------------------------------------------------ accordion --- */

// Elementor's nested accordion allows only one open item at a time.
$$('.e-n-accordion').forEach((acc) => {
  const items = $$('details.e-n-accordion-item', acc);
  items.forEach((d) =>
    on(d, 'toggle', () => {
      const summary = $('summary', d);
      if (summary) summary.setAttribute('aria-expanded', String(d.open));
      if (!d.open) return;
      items.forEach((other) => {
        if (other !== d && other.open) other.open = false;
      });
    })
  );
});

/* ---------------------------------------------------------- back to top --- */

const toTop = $('.to_top');
if (toTop) {
  const sync = () => toTop.classList.toggle('active', window.scrollY > 300);
  sync();
  on(window, 'scroll', sync, { passive: true });
  on(toTop, 'click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* -------------------------------------------------------------- joinchat --- */

const chat = $('.joinchat');
if (chat) {
  const box = $('.joinchat__chatbox', chat);
  const badge = $('.joinchat__badge', chat);
  const toggle = (open) => {
    chat.classList.toggle('joinchat--chatbox', open);
    if (box) box.hidden = !open;
    if (badge && open) badge.style.display = 'none';
  };
  on($('.joinchat__button', chat), 'click', () =>
    toggle(!chat.classList.contains('joinchat--chatbox'))
  );
  on($('.joinchat__close', chat), 'click', (e) => { e.stopPropagation(); toggle(false); });
  // The original widget reveals itself a moment after load.
  setTimeout(() => chat.classList.add('joinchat--show'), 3000);
}

/* ---------------------------------------------------------------- forms --- */

function setStatus(form, message, kind) {
  let box = form.querySelector('.tcs-form-status');
  if (!box) {
    box = document.createElement('div');
    box.className = 'tcs-form-status';
    box.setAttribute('role', 'status');
    box.setAttribute('aria-live', 'polite');
    form.appendChild(box);
  }
  box.textContent = message;
  box.dataset.kind = kind;
}

$$('form[data-tcs-form]').forEach((form) => {
  on(form, 'submit', async (e) => {
    e.preventDefault();
    const submit = form.querySelector('[type="submit"]');
    const original = submit ? submit.innerHTML || submit.value : '';
    if (submit) {
      submit.disabled = true;
      if (submit.tagName === 'INPUT') submit.value = 'Sending…';
      else submit.innerHTML = 'Sending…';
    }
    setStatus(form, '', '');

    try {
      const res = await fetch(form.action, { method: 'POST', body: new FormData(form) });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        form.reset();
        if (data.redirect) {
          window.location.href = data.redirect;
          return;
        }
        setStatus(form, data.message || 'Thanks! Your request was sent.', 'ok');
      } else {
        setStatus(form, data.error || 'Something went wrong. Please try again.', 'error');
      }
    } catch (err) {
      setStatus(form, 'Network error. Please try again.', 'error');
    } finally {
      if (submit) {
        submit.disabled = false;
        if (submit.tagName === 'INPUT') submit.value = original;
        else submit.innerHTML = original;
      }
    }
  });
});
