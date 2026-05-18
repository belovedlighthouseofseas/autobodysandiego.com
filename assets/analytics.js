/*
 * AutoBody San Diego — analytics + event tracking
 *
 * Page views: tracked automatically by Vercel Analytics (loaded via
 * /_vercel/insights/script.js in each page's <head>).
 *
 * Custom events: any element with a data-track="event_name" attribute
 * fires that event when interacted with. Forms fire on submit, everything
 * else fires on click. Damage-type radio buttons fire on change and
 * include the selected value.
 *
 * Events wired (see docs/session-5-quote-funnel.md §21):
 *   quote_form_started        — focus on first field of quote form
 *   quote_form_submitted      — submit button on quote form
 *   damage_type_selected      — any damage-type radio change
 *   photo_upload_clicked      — focus on photo dropzone
 *   call_clicked              — call CTAs sitewide
 *   text_clicked              — text CTAs sitewide
 *   call_or_text_clicked      — generic "call or text" CTAs
 *   thank_you_page_viewed     — fired once on thank-you page load
 *
 * Local dev (localhost): events log to console instead of Vercel.
 */
(function () {
  function track(name, props) {
    if (typeof window.va === 'function') {
      window.va('track', name, props || {});
    } else if (
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1'
    ) {
      // eslint-disable-next-line no-console
      console.log('[track]', name, props || {});
    }
  }

  // Generic data-track binding
  document.querySelectorAll('[data-track]').forEach(function (el) {
    var event = el.dataset.track;
    var tag = el.tagName;
    if (tag === 'FORM') {
      // Fire on first focus into the form as well
      var fired = false;
      el.addEventListener('focusin', function () {
        if (!fired) {
          fired = true;
          track('quote_form_started');
        }
      });
      el.addEventListener('submit', function () {
        track(event);
      });
    } else {
      el.addEventListener('click', function () {
        track(event);
      });
    }
  });

  // Damage-type radio selection (each radio has its own change handler)
  document.querySelectorAll('.damage-card-radio input').forEach(function (input) {
    input.addEventListener('change', function () {
      track('damage_type_selected', { damage_type: input.value });
    });
  });

  // Photo upload zone — focus or click counts as engagement
  document.querySelectorAll('.photo-upload input[type="file"]').forEach(function (input) {
    var fired = false;
    input.addEventListener('focus', function () {
      if (!fired) {
        fired = true;
        track('photo_upload_clicked');
      }
    });
  });

  // Thank-you page load event
  if (document.body && document.body.dataset.track === 'thank_you_page_viewed') {
    track('thank_you_page_viewed');
  }
})();
