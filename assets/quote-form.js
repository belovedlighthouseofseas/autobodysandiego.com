/*
 * AutoBody San Diego — quote form handler
 *
 * Intercepts the quote form submit, uploads any photos to Supabase Storage
 * (lead-photos bucket), inserts the lead row, and redirects to /thank-you.
 *
 * Lead row schema lives in public.leads. RLS allows anon INSERTs but
 * restricts SELECT/UPDATE to the admin email allowlist.
 *
 * Falls back gracefully:
 *   - If Supabase JS hasn't loaded, the form still submits to its action
 *     attribute (currently a FormSubmit URL — preserved as a safety net).
 *   - If photo upload fails, the lead row still gets inserted minus those
 *     photos — the user is not blocked from submitting.
 */
(function () {
  // Map free-text radio values from the form to lead-table enum values.
  var DAMAGE_MAP = {
    'Bumper damage': 'bumper',
    'Paint damage': 'paint',
    'Collision damage': 'collision',
    'Accident / insurance help': 'insurance',
    'Not sure': 'not_sure',
  };
  var PAY_MAP = {
    'Customer-pay': 'customer_pay',
    'Insurance claim': 'insurance',
    'Not sure yet': 'not_sure',
  };
  var DRIVABLE_MAP = {
    'Yes': 'yes',
    'No': 'no',
    'Not sure': 'not_sure',
  };
  var CONTACT_MAP = {
    'Text': 'text',
    'Call': 'call',
    'Email': 'email',
  };

  function pickValue(form, name) {
    var el = form.elements[name];
    if (!el) return null;
    if (el.value !== undefined && el.tagName) return el.value || null;
    // RadioNodeList
    for (var i = 0; i < el.length; i++) {
      if (el[i].checked) return el[i].value || null;
    }
    return null;
  }

  function mapped(raw, map) {
    if (!raw) return null;
    return map[raw] || null;
  }

  function setStatus(form, message, isError) {
    var note = form.querySelector('.quote-form-status') ||
      (function () {
        var p = document.createElement('p');
        p.className = 'form-note quote-form-status';
        p.style.marginTop = '0.75rem';
        var submit = form.querySelector('button[type="submit"]');
        if (submit && submit.parentNode === form) form.appendChild(p);
        return p;
      })();
    note.textContent = message;
    note.style.color = isError ? 'var(--danger-bright)' : 'var(--muted)';
  }

  async function handleSubmit(event) {
    var form = event.target;
    var sb = window.initSupabase && window.initSupabase();
    if (!sb) {
      // Let the form fall back to its action attribute (FormSubmit).
      return;
    }

    event.preventDefault();
    var submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.dataset.originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending…';
    }
    setStatus(form, 'Uploading photos and submitting your request…');

    try {
      // 1. Upload photos to storage (if any)
      var fileInput = form.querySelector('input[type="file"]');
      var files = (fileInput && fileInput.files) ? Array.from(fileInput.files) : [];
      var photoPaths = [];
      if (files.length) {
        var leadFolder = 'lead-' + crypto.randomUUID();
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          var safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
          var path = leadFolder + '/' + Date.now() + '-' + i + '-' + safeName;
          var up = await sb.storage
            .from(window.SUPABASE_CONFIG.photosBucket)
            .upload(path, file, { upsert: false, contentType: file.type });
          if (up.error) {
            console.warn('Photo upload failed:', up.error.message);
          } else {
            photoPaths.push(path);
          }
        }
      }

      // 2. Build the lead row
      var row = {
        name: pickValue(form, 'name'),
        phone: pickValue(form, 'phone'),
        email: pickValue(form, 'email'),
        preferred_contact: mapped(pickValue(form, 'preferred_contact'), CONTACT_MAP) || 'text',
        vehicle_year: pickValue(form, 'vehicle_year'),
        vehicle_make: pickValue(form, 'vehicle_make'),
        vehicle_model: pickValue(form, 'vehicle_model'),
        city: pickValue(form, 'city'),
        damage_type: mapped(pickValue(form, 'damage_type'), DAMAGE_MAP),
        pay_type: mapped(pickValue(form, 'pay_type'), PAY_MAP),
        drivable: mapped(pickValue(form, 'drivable'), DRIVABLE_MAP),
        what_happened: pickValue(form, 'what_happened'),
        photo_paths: photoPaths,
        source_url: window.location.pathname,
        user_agent: navigator.userAgent.slice(0, 256),
      };

      // 3. Insert the lead
      var ins = await sb.from('leads').insert(row).select('id').single();
      if (ins.error) throw ins.error;

      // 4. Fire analytics + redirect
      if (typeof window.va === 'function') {
        window.va('track', 'quote_form_submitted', {
          damage_type: row.damage_type,
          city: row.city,
        });
      }
      window.location.href = '/thank-you';
    } catch (err) {
      console.error('Submission failed:', err);
      setStatus(
        form,
        'Something went wrong saving your request. Please call or text us at the contact page.',
        true
      );
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = submitBtn.dataset.originalText || 'Send Photos for Repair Direction';
      }
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('form.quote-form').forEach(function (form) {
      form.addEventListener('submit', handleSubmit);
    });
  });
})();
