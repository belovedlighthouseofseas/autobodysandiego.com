/*
 * AutoBody San Diego — shared admin helpers
 *
 * - Auth guard: if not signed in, redirect to /admin/login
 * - Toast notifications
 * - Date / status / damage-type formatters
 * - Sign out helper
 */
(function () {
  var sb = window.initSupabase();
  if (!sb) {
    console.error('Supabase client not available');
    return;
  }

  window.AdminAuth = {
    async require() {
      var r = await sb.auth.getSession();
      if (!r.data || !r.data.session) {
        window.location.href = '/admin/login';
        return null;
      }
      return r.data.session;
    },
    async signOut() {
      await sb.auth.signOut();
      window.location.href = '/admin/login';
    },
  };

  window.AdminFmt = {
    relativeDate: function (iso) {
      if (!iso) return '';
      var d = new Date(iso);
      var now = new Date();
      var diffMs = now - d;
      var mins = Math.round(diffMs / 60000);
      if (mins < 1) return 'just now';
      if (mins < 60) return mins + ' min ago';
      var hrs = Math.round(mins / 60);
      if (hrs < 24) return hrs + ' hr ago';
      var days = Math.round(hrs / 24);
      if (days < 7) return days + ' day' + (days === 1 ? '' : 's') + ' ago';
      return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    },
    absoluteDate: function (iso) {
      if (!iso) return '';
      return new Date(iso).toLocaleString(undefined, {
        month: 'short', day: 'numeric', year: 'numeric',
        hour: 'numeric', minute: '2-digit',
      });
    },
    statusLabel: function (status) {
      var labels = {
        new: 'New',
        contacted: 'Contacted',
        need_more_photos: 'Need More Photos',
        needs_inspection: 'Needs Inspection',
        quoted: 'Quoted',
        scheduled: 'Scheduled',
        won: 'Won',
        lost: 'Lost',
        bad_lead: 'Bad Lead',
        out_of_area: 'Out of Area',
      };
      return labels[status] || status;
    },
    statusBadge: function (status) {
      return '<span class="status-badge status-' + status + '">' +
        window.AdminFmt.statusLabel(status) + '</span>';
    },
    damageLabel: function (dmg) {
      var labels = {
        bumper: 'Bumper',
        paint: 'Paint',
        collision: 'Collision',
        insurance: 'Insurance',
        not_sure: 'Not Sure',
      };
      return labels[dmg] || dmg || '—';
    },
    contactLabel: function (c) {
      return { text: 'Text', call: 'Call', email: 'Email' }[c] || c || '—';
    },
    payLabel: function (p) {
      return { customer_pay: 'Customer-pay', insurance: 'Insurance claim', not_sure: 'Not sure yet' }[p] || p || '—';
    },
    drivableLabel: function (d) {
      return { yes: 'Yes', no: 'No', not_sure: 'Not sure' }[d] || d || '—';
    },
    vehicleString: function (lead) {
      var parts = [lead.vehicle_year, lead.vehicle_make, lead.vehicle_model].filter(Boolean);
      return parts.join(' ') || '—';
    },
  };

  window.AdminToast = function (msg, isError) {
    var t = document.querySelector('.toast') || (function () {
      var el = document.createElement('div');
      el.className = 'toast';
      document.body.appendChild(el);
      return el;
    })();
    t.textContent = msg;
    t.classList.toggle('error', !!isError);
    t.classList.add('show');
    clearTimeout(t._timer);
    t._timer = setTimeout(function () { t.classList.remove('show'); }, 3000);
  };
})();
