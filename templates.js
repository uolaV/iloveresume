/* ═══════════════════════════════════════════════════════════════
   iloveresume — templates.js
   4 CV templates: modern, classic, bold, compact
   Each template returns an HTML string injected into #cv-page
═══════════════════════════════════════════════════════════════ */

'use strict';

// ── Helpers ──────────────────────────────────────────────────

function esc(s) {
  if (!s) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Sanitizes a user-provided URL for use in href attributes.
 * Blocks javascript: and data: URIs which could execute scripts.
 * Prepends https:// when no scheme is present.
 */
function safeUrl(url) {
  if (!url) return '';
  const s = String(url).trim();
  // Block dangerous protocols
  if (/^(javascript|data|vbscript):/i.test(s)) return '#';
  // Pass through mailto: and tel: as-is
  if (/^(mailto:|tel:)/i.test(s)) return esc(s);
  // Pass through http(s):// as-is
  if (/^https?:\/\//i.test(s)) return esc(s);
  // No scheme: prepend https://
  return esc('https://' + s);
}

function linkify(url) {
  if (!url) return '';
  return url.replace(/^https?:\/\/(www\.)?/, '');
}

function bulletsHtml(text) {
  if (!text) return '';
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  if (!lines.length) return '';
  return '<ul style="margin:0.25rem 0 0 1rem;padding:0;">' +
    lines.map(l => `<li style="margin-bottom:0.2rem;">${esc(l)}</li>`).join('') +
    '</ul>';
}

function formatDate(d, langCode) {
  if (!d) return '';
  // Input: YYYY-MM → Month YYYY (locale-aware via Intl)
  const [y, m] = d.split('-');
  if (!y) return d;
  if (!m) return y;
  try {
    const locale = langCode || (typeof lang !== 'undefined' && lang) || 'fr';
    return new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'short' })
      .format(new Date(parseInt(y, 10), parseInt(m, 10) - 1, 1));
  } catch (_) {
    // Fallback: neutral short month
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${months[parseInt(m, 10) - 1] || m} ${y}`;
  }
}

function dateRange(start, end, current, t, langCode) {
  const s = formatDate(start, langCode);
  const e = current ? (t('present') || 'Présent') : formatDate(end, langCode);
  if (!s && !e) return '';
  if (!s) return e;
  if (!e) return s;
  return `${s} – ${e}`;
}

function contactLine(icon, value, href) {
  if (!value) return '';
  const link = href ? `<a href="${safeUrl(href)}" style="color:inherit;text-decoration:none;">${esc(value)}</a>` : esc(value);
  return `<div style="display:flex;align-items:center;gap:0.4rem;margin-bottom:0.3rem;font-size:0.78rem;">${icon} ${link}</div>`;
}

const ICONS = {
  email: '✉',
  phone: '☎',
  city: '📍',
  linkedin: '🔗',
  github: '🔗',
  website: '🌐',
};

// ── Template: MODERN (sidebar colorée) ───────────────────────

function tplModern(cv, accent, font, t) {
  const sidebarStyle = `background:${accent};color:#fff;padding:2rem 1.5rem;width:220px;flex-shrink:0;align-self:stretch;`;
  const mainStyle = `padding:2rem 1.75rem;flex:1;`;

  // Photo
  let photoHtml = '';
  if (cv.profile.photoB64 && cv.showPhoto) {
    photoHtml = `<div style="text-align:center;margin-bottom:1.5rem;">
      <img src="${cv.profile.photoB64}" style="width:90px;height:90px;border-radius:50%;object-fit:cover;border:3px solid rgba(255,255,255,0.5);" alt="Photo" />
    </div>`;
  }

  // Sidebar: contact + skills + langues
  const contactBlock = `
    <div style="margin-bottom:1.5rem;">
      <div style="font-size:0.65rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;opacity:.7;margin-bottom:0.6rem;">${t('contact') || 'Contact'}</div>
      ${contactLine(ICONS.email, cv.profile.email, `mailto:${cv.profile.email}`)}
      ${contactLine(ICONS.phone, cv.profile.phone, `tel:${cv.profile.phone}`)}
      ${contactLine(ICONS.city, cv.profile.city)}
      ${contactLine(ICONS.linkedin, linkify(cv.profile.linkedin), cv.profile.linkedin)}
      ${contactLine(ICONS.github, linkify(cv.profile.github), cv.profile.github)}
      ${contactLine(ICONS.website, linkify(cv.profile.website), cv.profile.website)}
    </div>`;

  const skillsBlock = cv.skills.length ? `
    <div data-section="skills" style="margin-bottom:1.5rem;">
      <div style="font-size:0.65rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;opacity:.7;margin-bottom:0.6rem;">${t('step_skills') || 'Compétences'}</div>
      ${cv.skills.map(g => `
        <div style="margin-bottom:0.75rem;">
          ${g.category ? `<div style="font-size:0.7rem;font-weight:600;opacity:.8;margin-bottom:0.3rem;">${esc(g.category)}</div>` : ''}
          <div style="display:flex;flex-wrap:wrap;gap:0.3rem;">
            ${g.items.map(s => `<span style="background:rgba(255,255,255,0.2);padding:0.15rem 0.5rem;border-radius:9999px;font-size:0.72rem;">${esc(s)}</span>`).join('')}
          </div>
        </div>`).join('')}
    </div>` : '';

  const langsBlock = cv.extras.languages.length ? `
    <div data-section="languages" style="margin-bottom:1.5rem;">
      <div style="font-size:0.65rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;opacity:.7;margin-bottom:0.6rem;">${t('languages') || 'Langues'}</div>
      ${cv.extras.languages.map(l => `<div style="font-size:0.78rem;margin-bottom:0.2rem;"><strong>${esc(l.name)}</strong>${l.level ? ` — ${esc(l.level)}` : ''}</div>`).join('')}
    </div>` : '';

  const interestsBlock = cv.extras.interests ? `
    <div data-section="interests">
      <div style="font-size:0.65rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;opacity:.7;margin-bottom:0.6rem;">${t('interests') || "Centres d'intérêt"}</div>
      <div style="font-size:0.78rem;line-height:1.6;">${esc(cv.extras.interests)}</div>
    </div>` : '';

  // Main: name + sections
  const headerBlock = `
    <div style="margin-bottom:1.75rem;border-bottom:2px solid ${accent};padding-bottom:1rem;">
      <h1 style="font-size:1.7rem;font-weight:700;margin:0 0 0.25rem;color:#111;">${esc(cv.profile.name) || 'Votre Nom'}</h1>
      <h2 style="font-size:1rem;font-weight:500;margin:0;color:${accent};">${esc(cv.profile.title) || ''}</h2>
      ${cv.profile.summary ? `<p style="margin-top:0.75rem;font-size:0.85rem;color:#444;line-height:1.6;">${esc(cv.profile.summary)}</p>` : ''}
    </div>`;

  const sectionTitle = (label) =>
    `<h3 style="font-size:0.7rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:${accent};border-bottom:1.5px solid ${accent};padding-bottom:0.3rem;margin:0 0 0.75rem;">${label}</h3>`;

  const expBlock = cv.experiences.length ? `
    <div data-section="experience" style="margin-bottom:1.5rem;">
      ${sectionTitle(t('step_exp') || 'Expériences')}
      ${cv.experiences.map(e => `
        <div class="cv-item" style="margin-bottom:1rem;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:0.5rem;flex-wrap:wrap;">
            <div>
              <div style="font-weight:600;font-size:0.9rem;">${esc(e.role)}</div>
              <div style="font-size:0.8rem;color:#555;">${esc(e.company)}</div>
            </div>
            <div style="font-size:0.75rem;color:#888;white-space:nowrap;">${dateRange(e.startDate, e.endDate, e.current, t, lang)}</div>
          </div>
          ${bulletsHtml(e.bullets)}
        </div>`).join('')}
    </div>` : '';

  const eduBlock = cv.education.length ? `
    <div data-section="education" style="margin-bottom:1.5rem;">
      ${sectionTitle(t('step_edu') || 'Formation')}
      ${cv.education.map(e => `
        <div class="cv-item" style="margin-bottom:0.875rem;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:0.5rem;flex-wrap:wrap;">
            <div>
              <div style="font-weight:600;font-size:0.9rem;">${esc(e.degree)}${e.field ? ` — ${esc(e.field)}` : ''}</div>
              <div style="font-size:0.8rem;color:#555;">${esc(e.school)}</div>
            </div>
            <div style="font-size:0.75rem;color:#888;white-space:nowrap;">${dateRange(e.startDate, e.endDate, false, t, lang)}</div>
          </div>
          ${e.grade ? `<div style="font-size:0.78rem;color:#666;margin-top:0.2rem;">${esc(e.grade)}</div>` : ''}
        </div>`).join('')}
    </div>` : '';

  const certBlock = cv.extras.certifications.length ? `
    <div data-section="certifications" style="margin-bottom:1.5rem;">
      ${sectionTitle(t('certifications') || 'Certifications')}
      ${cv.extras.certifications.map(c => `
        <div class="cv-item" style="display:flex;justify-content:space-between;font-size:0.82rem;margin-bottom:0.3rem;">
          <span>${esc(c.name)}${c.issuer ? ` <span style="color:#777;">· ${esc(c.issuer)}</span>` : ''}</span>
          ${c.date ? `<span style="color:#888;font-size:0.76rem;">${formatDate(c.date, lang)}</span>` : ''}
        </div>`).join('')}
    </div>` : '';

  const projectsBlock = (cv.projects && cv.projects.length) ? `
    <div data-section="projects" style="margin-bottom:1.5rem;">
      ${sectionTitle(t('projects') || 'Projets')}
      ${cv.projects.map(p => `
        <div class="cv-item" style="margin-bottom:0.875rem;">
          <div style="font-weight:600;font-size:0.9rem;">${esc(p.name)}${p.url ? ` <a href="${safeUrl(p.url)}" style="color:${accent};font-size:0.78rem;text-decoration:none;">↗ ${linkify(p.url)}</a>` : ''}</div>
          ${p.tech ? `<div style="font-size:0.75rem;color:#888;margin-top:0.15rem;">${esc(p.tech)}</div>` : ''}
          ${p.description ? `<p style="font-size:0.82rem;color:#444;margin:0.25rem 0 0;line-height:1.5;">${esc(p.description)}</p>` : ''}
        </div>`).join('')}
    </div>` : '';

  const volunteerBlock = (cv.volunteer && cv.volunteer.length) ? `
    <div data-section="volunteer" style="margin-bottom:1.5rem;">
      ${sectionTitle(t('volunteer') || 'Bénévolat')}
      ${cv.volunteer.map(v => `
        <div class="cv-item" style="margin-bottom:0.875rem;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:0.5rem;flex-wrap:wrap;">
            <div>
              <div style="font-weight:600;font-size:0.9rem;">${esc(v.role)}</div>
              <div style="font-size:0.8rem;color:#555;">${esc(v.org)}</div>
            </div>
            <div style="font-size:0.75rem;color:#888;white-space:nowrap;">${dateRange(v.startDate, v.endDate, false, t, lang)}</div>
          </div>
          ${bulletsHtml(v.description)}
        </div>`).join('')}
    </div>` : '';

  const customBlocks = (cv.customSections && cv.customSections.length) ? cv.customSections.map((sec, i) => `
    <div data-section="custom_${i}" style="margin-bottom:1.5rem;">
      ${sectionTitle(esc(sec.title) || t('custom_section'))}
      ${sec.entries.map(en => `
        <div class="cv-item" style="margin-bottom:0.75rem;">
          <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:0.5rem;">
            <div>
              <span style="font-weight:600;font-size:0.9rem;">${esc(en.title)}</span>
              ${en.subtitle ? `<span style="color:#777;font-size:0.82rem;"> · ${esc(en.subtitle)}</span>` : ''}
            </div>
            ${en.date ? `<span style="font-size:0.75rem;color:#888;">${esc(en.date)}</span>` : ''}
          </div>
          ${en.description ? `<p style="font-size:0.82rem;color:#444;margin:0.2rem 0 0;line-height:1.5;">${esc(en.description)}</p>` : ''}
        </div>`).join('')}
    </div>`).join('') : '';

  const pubsBlock = (cv.publications && cv.publications.length) ? `
    <div data-section="publications" style="margin-bottom:1.5rem;">
      ${sectionTitle(t('publications') || 'Publications')}
      ${cv.publications.map(p => `
        <div class="cv-item" style="margin-bottom:0.6rem;">
          <div style="font-weight:600;font-size:0.88rem;">${esc(p.title)}${p.url ? ` <a href="${safeUrl(p.url)}" style="color:${accent};font-size:0.75rem;text-decoration:none;">↗</a>` : ''}</div>
          ${p.authors ? `<div style="font-size:0.78rem;color:#555;">${esc(p.authors)}</div>` : ''}
          <div style="font-size:0.75rem;color:#888;">${p.venue ? esc(p.venue) : ''}${p.date ? ` · ${formatDate(p.date, lang)}` : ''}</div>
        </div>`).join('')}
    </div>` : '';

  const refsBlock = (cv.references && cv.references.length && !cv.showReferencesToggle) ? `
    <div data-section="references" style="margin-bottom:1.5rem;">
      ${sectionTitle(t('references') || 'Références')}
      ${cv.references.map(r => `
        <div class="cv-item" style="margin-bottom:0.5rem;">
          <div style="font-weight:600;font-size:0.88rem;">${esc(r.name)}</div>
          <div style="font-size:0.78rem;color:#555;">${esc(r.title)}${r.company ? ` · ${esc(r.company)}` : ''}</div>
          <div style="font-size:0.75rem;color:#888;">${r.email ? esc(r.email) : ''}${r.phone ? ` · ${esc(r.phone)}` : ''}</div>
        </div>`).join('')}
    </div>` : (cv.showReferencesToggle ? `
    <div data-section="references" style="margin-bottom:1.5rem;">
      ${sectionTitle(t('references') || 'Références')}
      <p style="font-size:0.82rem;color:#888;font-style:italic;">${t('references_available')}</p>
    </div>` : '');

  return `
<div style="display:flex;font-family:${font},sans-serif;min-height:1123px;background:#fff;">
  <div style="${sidebarStyle}">
    ${photoHtml}
    ${contactBlock}
    ${skillsBlock}
    ${langsBlock}
    ${interestsBlock}
  </div>
  <div style="${mainStyle}">
    ${headerBlock}
    ${expBlock}
    ${eduBlock}
    ${projectsBlock}
    ${volunteerBlock}
    ${pubsBlock}
    ${certBlock}
    ${refsBlock}
    ${customBlocks}
  </div>
</div>`;
}

// ── Template: CLASSIC (clean, one-column) ────────────────────

function tplClassic(cv, accent, font, t) {
  const sectionTitle = (label) =>
    `<h3 style="font-size:0.7rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#111;border-bottom:1px solid #ddd;padding-bottom:0.3rem;margin:1.25rem 0 0.75rem;">${label}</h3>`;

  let photoHtml = '';
  if (cv.profile.photoB64 && cv.showPhoto) {
    photoHtml = `<img src="${cv.profile.photoB64}" style="width:75px;height:75px;border-radius:50%;object-fit:cover;border:2px solid ${accent};" alt="Photo" />`;
  }

  const header = `
    <div style="display:flex;align-items:flex-start;gap:1.5rem;margin-bottom:1.5rem;border-bottom:2px solid ${accent};padding-bottom:1.25rem;">
      ${photoHtml}
      <div style="flex:1;">
        <h1 style="font-size:1.6rem;font-weight:700;margin:0 0 0.2rem;">${esc(cv.profile.name) || 'Votre Nom'}</h1>
        <h2 style="font-size:1rem;font-weight:400;margin:0 0 0.5rem;color:${accent};">${esc(cv.profile.title) || ''}</h2>
        <div style="display:flex;flex-wrap:wrap;gap:0.75rem;font-size:0.78rem;color:#555;">
          ${cv.profile.email ? `<span>✉ ${esc(cv.profile.email)}</span>` : ''}
          ${cv.profile.phone ? `<span>☎ ${esc(cv.profile.phone)}</span>` : ''}
          ${cv.profile.city ? `<span>📍 ${esc(cv.profile.city)}</span>` : ''}
          ${cv.profile.linkedin ? `<span>🔗 ${linkify(cv.profile.linkedin)}</span>` : ''}
          ${cv.profile.github ? `<span>🔗 ${linkify(cv.profile.github)}</span>` : ''}
        </div>
      </div>
    </div>`;

  const summary = cv.profile.summary ? `
    <p style="font-size:0.875rem;color:#444;line-height:1.65;margin-bottom:0;">${esc(cv.profile.summary)}</p>` : '';

  const expBlock = cv.experiences.length ? `
    <div data-section="experience">
    ${sectionTitle(t('step_exp') || 'Expériences')}
    ${cv.experiences.map(e => `
      <div class="cv-item" style="margin-bottom:1rem;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:0.5rem;">
          <div>
            <span style="font-weight:600;font-size:0.9rem;">${esc(e.role)}</span>
            <span style="color:#777;font-size:0.82rem;"> · ${esc(e.company)}</span>
          </div>
          <span style="font-size:0.75rem;color:#999;">${dateRange(e.startDate, e.endDate, e.current, t, lang)}</span>
        </div>
        ${bulletsHtml(e.bullets)}
      </div>`).join('')}
    </div>` : '';

  const eduBlock = cv.education.length ? `
    <div data-section="education">
    ${sectionTitle(t('step_edu') || 'Formation')}
    ${cv.education.map(e => `
      <div class="cv-item" style="margin-bottom:0.75rem;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:0.5rem;">
          <div>
            <span style="font-weight:600;font-size:0.9rem;">${esc(e.degree)}${e.field ? ` — ${esc(e.field)}` : ''}</span>
            <span style="color:#777;font-size:0.82rem;"> · ${esc(e.school)}</span>
          </div>
          <span style="font-size:0.75rem;color:#999;">${dateRange(e.startDate, e.endDate, false, t, lang)}</span>
        </div>
        ${e.grade ? `<div style="font-size:0.78rem;color:#666;">${esc(e.grade)}</div>` : ''}
      </div>`).join('')}
    </div>` : '';

  const skillsBlock = cv.skills.length ? `
    <div data-section="skills">
    ${sectionTitle(t('step_skills') || 'Compétences')}
    ${cv.skills.map(g => `
      <div style="margin-bottom:0.5rem;">
        ${g.category ? `<span style="font-weight:600;font-size:0.82rem;color:#333;">${esc(g.category)}: </span>` : ''}
        <span style="font-size:0.82rem;color:#555;">${g.items.map(esc).join(', ')}</span>
      </div>`).join('')}
    </div>` : '';

  const langsBlock = cv.extras.languages.length ? `
    <div data-section="languages">
    ${sectionTitle(t('languages') || 'Langues')}
    <div style="display:flex;flex-wrap:wrap;gap:0.75rem;">
      ${cv.extras.languages.map(l => `<span style="font-size:0.82rem;"><strong>${esc(l.name)}</strong>${l.level ? ` — ${esc(l.level)}` : ''}</span>`).join('')}
    </div>` : '';

  const certBlock = cv.extras.certifications.length ? `
    <div data-section="certifications">
    ${sectionTitle(t('certifications') || 'Certifications')}
    ${cv.extras.certifications.map(c => `
      <div style="font-size:0.82rem;margin-bottom:0.3rem;">${esc(c.name)}${c.issuer ? ` · ${esc(c.issuer)}` : ''}${c.date ? ` <span style="color:#999;">(${formatDate(c.date, lang)})</span>` : ''}</div>`).join('')}
    </div>` : '';

  const interestsBlock = cv.extras.interests ? `
    <div data-section="interests">
    ${sectionTitle(t('interests') || "Centres d'intérêt")}
    <p style="font-size:0.82rem;color:#555;">${esc(cv.extras.interests)}</p>
    </div>` : '';

  const projectsBlock = (cv.projects && cv.projects.length) ? `
    <div data-section="projects">
    ${sectionTitle(t('projects') || 'Projets')}
    ${cv.projects.map(p => `
      <div class="cv-item" style="margin-bottom:0.75rem;">
        <div style="font-weight:600;font-size:0.9rem;">${esc(p.name)}${p.url ? ` <span style="color:${accent};font-size:0.78rem;">↗ ${linkify(p.url)}</span>` : ''}</div>
        ${p.tech ? `<div style="font-size:0.75rem;color:#888;">${esc(p.tech)}</div>` : ''}
        ${p.description ? `<p style="font-size:0.82rem;color:#555;margin:0.2rem 0 0;line-height:1.5;">${esc(p.description)}</p>` : ''}
      </div>`).join('')}
    </div>` : '';

  const volunteerBlock = (cv.volunteer && cv.volunteer.length) ? `
    <div data-section="volunteer">
    ${sectionTitle(t('volunteer') || 'Bénévolat')}
    ${cv.volunteer.map(v => `
      <div class="cv-item" style="margin-bottom:0.75rem;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:0.5rem;">
          <div>
            <span style="font-weight:600;font-size:0.9rem;">${esc(v.role)}</span>
            <span style="color:#777;font-size:0.82rem;"> · ${esc(v.org)}</span>
          </div>
          <span style="font-size:0.75rem;color:#999;">${dateRange(v.startDate, v.endDate, false, t, lang)}</span>
        </div>
        ${bulletsHtml(v.description)}
      </div>`).join('')}
    </div>` : '';

  const customBlocks = (cv.customSections && cv.customSections.length) ? cv.customSections.map((sec, i) => `
    <div data-section="custom_${i}">
    ${sectionTitle(esc(sec.title) || t('custom_section'))}
    ${sec.entries.map(en => `
      <div class="cv-item" style="margin-bottom:0.5rem;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:0.5rem;">
          <div>
            <span style="font-weight:600;font-size:0.9rem;">${esc(en.title)}</span>
            ${en.subtitle ? `<span style="color:#777;font-size:0.82rem;"> · ${esc(en.subtitle)}</span>` : ''}
          </div>
          ${en.date ? `<span style="font-size:0.75rem;color:#999;">${esc(en.date)}</span>` : ''}
        </div>
        ${en.description ? `<p style="font-size:0.82rem;color:#555;margin:0.15rem 0 0;">${esc(en.description)}</p>` : ''}
      </div>`).join('')}
    </div>`).join('') : '';

  const pubsBlock = (cv.publications && cv.publications.length) ? `
    <div data-section="publications">
    ${sectionTitle(t('publications') || 'Publications')}
    ${cv.publications.map(p => `
      <div class="cv-item" style="margin-bottom:0.6rem;">
        <div style="font-weight:600;font-size:0.88rem;">${esc(p.title)}${p.url ? ` <a href="${safeUrl(p.url)}" style="color:${accent};font-size:0.75rem;text-decoration:none;">↗</a>` : ''}</div>
        ${p.authors ? `<div style="font-size:0.78rem;color:#555;">${esc(p.authors)}</div>` : ''}
        <div style="font-size:0.75rem;color:#999;">${p.venue ? esc(p.venue) : ''}${p.date ? ` · ${formatDate(p.date, lang)}` : ''}</div>
      </div>`).join('')}
    </div>` : '';

  const refsBlock = (cv.references && cv.references.length && !cv.showReferencesToggle) ? `
    <div data-section="references">
    ${sectionTitle(t('references') || 'Références')}
    ${cv.references.map(r => `
      <div class="cv-item" style="margin-bottom:0.5rem;">
        <div style="font-weight:600;font-size:0.88rem;">${esc(r.name)}</div>
        <div style="font-size:0.78rem;color:#555;">${esc(r.title)}${r.company ? ` · ${esc(r.company)}` : ''}</div>
        <div style="font-size:0.75rem;color:#999;">${r.email ? esc(r.email) : ''}${r.phone ? ` · ${esc(r.phone)}` : ''}</div>
      </div>`).join('')}
    </div>` : (cv.showReferencesToggle ? `
    <div data-section="references">
    ${sectionTitle(t('references') || 'Références')}
    <p style="font-size:0.82rem;color:#999;font-style:italic;">${t('references_available')}</p>
    </div>` : '');

  return `
<div style="padding:2.5rem;font-family:${font},sans-serif;background:#fff;min-height:1123px;">
  ${header}
  ${summary}
  ${expBlock}
  ${eduBlock}
  ${projectsBlock}
  ${volunteerBlock}
  ${pubsBlock}
  ${skillsBlock}
  ${langsBlock}
  ${certBlock}
  ${interestsBlock}
  ${refsBlock}
  ${customBlocks}
</div>`;
}

// ── Template: BOLD (grand header pleine largeur) ─────────────

function tplBold(cv, accent, font, t) {
  const sectionTitle = (label) =>
    `<h3 style="font-size:0.8rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:${accent};margin:1.5rem 0 0.75rem;display:flex;align-items:center;gap:0.5rem;">
      <span style="flex:1;height:2px;background:${accent};display:block;"></span>
      ${label}
      <span style="flex:1;height:2px;background:${accent};display:block;"></span>
    </h3>`;

  let photoHtml = '';
  if (cv.profile.photoB64 && cv.showPhoto) {
    photoHtml = `<img src="${cv.profile.photoB64}" style="width:80px;height:80px;border-radius:50%;object-fit:cover;border:3px solid #fff;" alt="Photo" />`;
  }

  const header = `
    <div style="background:${accent};color:#fff;padding:2rem 2.5rem;display:flex;align-items:center;gap:2rem;">
      ${photoHtml}
      <div>
        <h1 style="font-size:2rem;font-weight:800;margin:0 0 0.25rem;">${esc(cv.profile.name) || 'Votre Nom'}</h1>
        <h2 style="font-size:1.05rem;font-weight:400;margin:0 0 0.75rem;opacity:.9;">${esc(cv.profile.title) || ''}</h2>
        <div style="display:flex;flex-wrap:wrap;gap:1rem;font-size:0.78rem;opacity:.85;">
          ${cv.profile.email ? `<span>✉ ${esc(cv.profile.email)}</span>` : ''}
          ${cv.profile.phone ? `<span>☎ ${esc(cv.profile.phone)}</span>` : ''}
          ${cv.profile.city ? `<span>📍 ${esc(cv.profile.city)}</span>` : ''}
          ${cv.profile.linkedin ? `<span>🔗 ${linkify(cv.profile.linkedin)}</span>` : ''}
        </div>
      </div>
    </div>`;

  const summary = cv.profile.summary ? `
    <div style="background:${accent}11;border-left:4px solid ${accent};padding:0.875rem 1.25rem;margin:1.25rem 0;border-radius:0 0.5rem 0.5rem 0;">
      <p style="margin:0;font-size:0.875rem;color:#333;line-height:1.65;">${esc(cv.profile.summary)}</p>
    </div>` : '';

  const expBlock = cv.experiences.length ? `
    <div data-section="experience">
    ${sectionTitle(t('step_exp') || 'Expériences')}
    ${cv.experiences.map(e => `
      <div class="cv-item" style="margin-bottom:1rem;padding-left:1rem;border-left:3px solid ${accent}33;">
        <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:0.5rem;">
          <div>
            <div style="font-weight:700;font-size:0.92rem;">${esc(e.role)}</div>
            <div style="font-size:0.82rem;color:#666;">${esc(e.company)}</div>
          </div>
          <div style="font-size:0.75rem;color:#999;background:#f3f4f6;padding:0.2rem 0.5rem;border-radius:9999px;">${dateRange(e.startDate, e.endDate, e.current, t, lang)}</div>
        </div>
        ${bulletsHtml(e.bullets)}
      </div>`).join('')}
    </div>` : '';

  const eduBlock = cv.education.length ? `
    <div data-section="education">
    ${sectionTitle(t('step_edu') || 'Formation')}
    ${cv.education.map(e => `
      <div class="cv-item" style="margin-bottom:0.875rem;padding-left:1rem;border-left:3px solid ${accent}33;">
        <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:0.5rem;">
          <div>
            <div style="font-weight:700;font-size:0.9rem;">${esc(e.degree)}${e.field ? ` — ${esc(e.field)}` : ''}</div>
            <div style="font-size:0.82rem;color:#666;">${esc(e.school)}</div>
          </div>
          <div style="font-size:0.75rem;color:#999;">${dateRange(e.startDate, e.endDate, false, t, lang)}</div>
        </div>
        ${e.grade ? `<div style="font-size:0.78rem;color:#666;">${esc(e.grade)}</div>` : ''}
      </div>`).join('')}
    </div>` : '';

  const skillsBlock = cv.skills.length ? `
    <div data-section="skills">
    ${sectionTitle(t('step_skills') || 'Compétences')}
    ${cv.skills.map(g => `
      <div style="margin-bottom:0.6rem;">
        ${g.category ? `<div style="font-size:0.78rem;font-weight:700;color:#555;margin-bottom:0.3rem;text-transform:uppercase;letter-spacing:.05em;">${esc(g.category)}</div>` : ''}
        <div style="display:flex;flex-wrap:wrap;gap:0.35rem;">
          ${g.items.map(s => `<span style="background:${accent}18;color:${accent};padding:0.2rem 0.6rem;border-radius:9999px;font-size:0.78rem;font-weight:500;">${esc(s)}</span>`).join('')}
        </div>
      </div>`).join('')}
    </div>` : '';

  const langsBlock = cv.extras.languages.length ? `
    <div data-section="languages">
    ${sectionTitle(t('languages') || 'Langues')}
    <div style="display:flex;flex-wrap:wrap;gap:0.75rem;">
      ${cv.extras.languages.map(l => `<span style="font-size:0.82rem;background:#f3f4f6;padding:0.25rem 0.75rem;border-radius:9999px;"><strong>${esc(l.name)}</strong>${l.level ? ` · ${esc(l.level)}` : ''}</span>`).join('')}
    </div>` : '';

  const certBlock = cv.extras.certifications.length ? `
    <div data-section="certifications">
    ${sectionTitle(t('certifications') || 'Certifications')}
    ${cv.extras.certifications.map(c => `
      <div class="cv-item" style="font-size:0.82rem;margin-bottom:0.3rem;">${esc(c.name)}${c.issuer ? ` · ${esc(c.issuer)}` : ''}${c.date ? ` <span style="color:#999;">(${formatDate(c.date, lang)})</span>` : ''}</div>`).join('')}
    </div>` : '';

  const projectsBlock = (cv.projects && cv.projects.length) ? `
    <div data-section="projects">
    ${sectionTitle(t('projects') || 'Projets')}
    ${cv.projects.map(p => `
      <div class="cv-item" style="margin-bottom:0.875rem;padding-left:1rem;border-left:3px solid ${accent}33;">
        <div style="font-weight:700;font-size:0.92rem;">${esc(p.name)}${p.url ? ` <a href="${safeUrl(p.url)}" style="color:${accent};font-size:0.78rem;text-decoration:none;">↗</a>` : ''}</div>
        ${p.tech ? `<div style="font-size:0.75rem;color:#999;background:#f3f4f6;padding:0.1rem 0.4rem;border-radius:9999px;display:inline-block;margin-top:0.2rem;">${esc(p.tech)}</div>` : ''}
        ${p.description ? `<p style="font-size:0.82rem;color:#444;margin:0.25rem 0 0;line-height:1.5;">${esc(p.description)}</p>` : ''}
      </div>`).join('')}
    </div>` : '';

  const volunteerBlock = (cv.volunteer && cv.volunteer.length) ? `
    <div data-section="volunteer">
    ${sectionTitle(t('volunteer') || 'Bénévolat')}
    ${cv.volunteer.map(v => `
      <div class="cv-item" style="margin-bottom:0.875rem;padding-left:1rem;border-left:3px solid ${accent}33;">
        <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:0.5rem;">
          <div>
            <div style="font-weight:700;font-size:0.92rem;">${esc(v.role)}</div>
            <div style="font-size:0.82rem;color:#666;">${esc(v.org)}</div>
          </div>
          <div style="font-size:0.75rem;color:#999;background:#f3f4f6;padding:0.2rem 0.5rem;border-radius:9999px;">${dateRange(v.startDate, v.endDate, false, t, lang)}</div>
        </div>
        ${bulletsHtml(v.description)}
      </div>`).join('')}
    </div>` : '';

  const customBlocks = (cv.customSections && cv.customSections.length) ? cv.customSections.map((sec, i) => `
    <div data-section="custom_${i}">
    ${sectionTitle(esc(sec.title) || t('custom_section'))}
    ${sec.entries.map(en => `
      <div class="cv-item" style="margin-bottom:0.75rem;padding-left:1rem;border-left:3px solid ${accent}33;">
        <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:0.5rem;">
          <div>
            <div style="font-weight:700;font-size:0.9rem;">${esc(en.title)}</div>
            ${en.subtitle ? `<div style="font-size:0.82rem;color:#666;">${esc(en.subtitle)}</div>` : ''}
          </div>
          ${en.date ? `<div style="font-size:0.75rem;color:#999;">${esc(en.date)}</div>` : ''}
        </div>
        ${en.description ? `<p style="font-size:0.82rem;color:#444;margin:0.2rem 0 0;line-height:1.5;">${esc(en.description)}</p>` : ''}
      </div>`).join('')}
    </div>`).join('') : '';

  const pubsBlock = (cv.publications && cv.publications.length) ? `
    <div data-section="publications">
    ${sectionTitle(t('publications') || 'Publications')}
    ${cv.publications.map(p => `
      <div class="cv-item" style="margin-bottom:0.75rem;padding-left:1rem;border-left:3px solid ${accent}33;">
        <div style="font-weight:700;font-size:0.92rem;">${esc(p.title)}${p.url ? ` <a href="${safeUrl(p.url)}" style="color:${accent};font-size:0.78rem;text-decoration:none;">↗</a>` : ''}</div>
        ${p.authors ? `<div style="font-size:0.82rem;color:#666;">${esc(p.authors)}</div>` : ''}
        <div style="font-size:0.75rem;color:#999;background:#f3f4f6;padding:0.1rem 0.4rem;border-radius:9999px;display:inline-block;">${p.venue ? esc(p.venue) : ''}${p.date ? ` · ${formatDate(p.date, lang)}` : ''}</div>
      </div>`).join('')}
    </div>` : '';

  const refsBlock = (cv.references && cv.references.length && !cv.showReferencesToggle) ? `
    <div data-section="references">
    ${sectionTitle(t('references') || 'Références')}
    ${cv.references.map(r => `
      <div class="cv-item" style="margin-bottom:0.5rem;padding-left:1rem;border-left:3px solid ${accent}33;">
        <div style="font-weight:700;font-size:0.92rem;">${esc(r.name)}</div>
        <div style="font-size:0.82rem;color:#666;">${esc(r.title)}${r.company ? ` · ${esc(r.company)}` : ''}</div>
        <div style="font-size:0.75rem;color:#999;">${r.email ? esc(r.email) : ''}${r.phone ? ` · ${esc(r.phone)}` : ''}</div>
      </div>`).join('')}
    </div>` : (cv.showReferencesToggle ? `
    <div data-section="references">
    ${sectionTitle(t('references') || 'Références')}
    <p style="font-size:0.82rem;color:#999;font-style:italic;">${t('references_available')}</p>
    </div>` : '');

  return `
<div style="font-family:${font},sans-serif;background:#fff;min-height:1123px;">
  ${header}
  <div style="padding:0 2.5rem 2rem;">
    ${summary}
    ${expBlock}
    ${eduBlock}
    ${projectsBlock}
    ${volunteerBlock}
    ${pubsBlock}
    ${skillsBlock}
    ${langsBlock}
    ${certBlock}
    ${refsBlock}
    ${customBlocks}
  </div>
</div>`;
}

// ── Template: COMPACT (dense, ATS-friendly) ──────────────────

function tplCompact(cv, accent, font, t) {
  const sep = `<span style="color:#ccc;margin:0 0.3rem;">|</span>`;

  const header = `
    <div style="border-bottom:1.5px solid ${accent};padding-bottom:0.6rem;margin-bottom:0.75rem;">
      <h1 style="font-size:1.4rem;font-weight:700;margin:0 0 0.15rem;">${esc(cv.profile.name) || 'Votre Nom'}</h1>
      ${cv.profile.title ? `<div style="font-size:0.9rem;color:${accent};font-weight:500;margin-bottom:0.3rem;">${esc(cv.profile.title)}</div>` : ''}
      <div style="font-size:0.75rem;color:#555;display:flex;flex-wrap:wrap;gap:0.15rem;">
        ${cv.profile.email ? `<span>${esc(cv.profile.email)}</span>` : ''}
        ${cv.profile.phone ? `${sep}<span>${esc(cv.profile.phone)}</span>` : ''}
        ${cv.profile.city ? `${sep}<span>${esc(cv.profile.city)}</span>` : ''}
        ${cv.profile.linkedin ? `${sep}<span>${linkify(cv.profile.linkedin)}</span>` : ''}
        ${cv.profile.github ? `${sep}<span>${linkify(cv.profile.github)}</span>` : ''}
      </div>
    </div>`;

  const st = (label) =>
    `<div style="font-size:0.65rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:${accent};margin:0.75rem 0 0.4rem;border-bottom:1px solid ${accent}44;padding-bottom:0.2rem;">${label}</div>`;

  const summary = cv.profile.summary ? `
    ${st(t('summary') || 'Profil')}
    <p style="font-size:0.8rem;color:#333;line-height:1.5;margin:0;">${esc(cv.profile.summary)}</p>` : '';

  const expBlock = cv.experiences.length ? `
    <div data-section="experience">
    ${st(t('step_exp') || 'Expériences')}
    ${cv.experiences.map(e => `
      <div class="cv-item" style="margin-bottom:0.6rem;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;">
          <div style="font-size:0.82rem;"><strong>${esc(e.role)}</strong><span style="color:#666;"> · ${esc(e.company)}</span></div>
          <div style="font-size:0.72rem;color:#888;">${dateRange(e.startDate, e.endDate, e.current, t, lang)}</div>
        </div>
        ${e.bullets ? `<div style="font-size:0.78rem;color:#444;margin-top:0.2rem;">${bulletsHtml(e.bullets)}</div>` : ''}
      </div>`).join('')}
    </div>` : '';

  const eduBlock = cv.education.length ? `
    <div data-section="education">
    ${st(t('step_edu') || 'Formation')}
    ${cv.education.map(e => `
      <div class="cv-item" style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;margin-bottom:0.35rem;">
        <div style="font-size:0.82rem;"><strong>${esc(e.degree)}${e.field ? ` — ${esc(e.field)}` : ''}</strong><span style="color:#666;"> · ${esc(e.school)}</span></div>
        <div style="font-size:0.72rem;color:#888;">${dateRange(e.startDate, e.endDate, false, t, lang)}</div>
      </div>`).join('')}
    </div>` : '';

  const skillsBlock = cv.skills.length ? `
    <div data-section="skills">
    ${st(t('step_skills') || 'Compétences')}
    ${cv.skills.map(g => `
      <div style="font-size:0.8rem;margin-bottom:0.25rem;">
        ${g.category ? `<strong>${esc(g.category)}: </strong>` : ''}${g.items.map(esc).join(', ')}
      </div>`).join('')}
    </div>` : '';

  const langsBlock = cv.extras.languages.length ? `
    <div data-section="languages">
    ${st(t('languages') || 'Langues')}
    <div style="font-size:0.8rem;">${cv.extras.languages.map(l => `${esc(l.name)}${l.level ? ` (${esc(l.level)})` : ''}`).join(' · ')}</div>` : '';

  const certBlock = cv.extras.certifications.length ? `
    <div data-section="certifications">
    ${st(t('certifications') || 'Certifications')}
    ${cv.extras.certifications.map(c => `<div style="font-size:0.8rem;">${esc(c.name)}${c.issuer ? ` · ${esc(c.issuer)}` : ''}${c.date ? ` (${formatDate(c.date, lang)})` : ''}</div>`).join('')}
    </div>` : '';

  const projectsBlock = (cv.projects && cv.projects.length) ? `
    <div data-section="projects">
    ${st(t('projects') || 'Projets')}
    ${cv.projects.map(p => `
      <div class="cv-item" style="margin-bottom:0.4rem;">
        <div style="font-size:0.82rem;"><strong>${esc(p.name)}</strong>${p.url ? ` <span style="color:${accent};font-size:0.72rem;">↗ ${linkify(p.url)}</span>` : ''}${p.tech ? `<span style="color:#666;"> · ${esc(p.tech)}</span>` : ''}</div>
        ${p.description ? `<div style="font-size:0.78rem;color:#444;margin-top:0.1rem;">${esc(p.description)}</div>` : ''}
      </div>`).join('')}
    </div>` : '';

  const volunteerBlock = (cv.volunteer && cv.volunteer.length) ? `
    <div data-section="volunteer">
    ${st(t('volunteer') || 'Bénévolat')}
    ${cv.volunteer.map(v => `
      <div class="cv-item" style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;margin-bottom:0.35rem;">
        <div style="font-size:0.82rem;"><strong>${esc(v.role)}</strong><span style="color:#666;"> · ${esc(v.org)}</span></div>
        <div style="font-size:0.72rem;color:#888;">${dateRange(v.startDate, v.endDate, false, t, lang)}</div>
      </div>`).join('')}
    </div>` : '';

  const customBlocks = (cv.customSections && cv.customSections.length) ? cv.customSections.map((sec, i) => `
    <div data-section="custom_${i}">
    ${st(esc(sec.title) || t('custom_section'))}
    ${sec.entries.map(en => `
      <div class="cv-item" style="margin-bottom:0.3rem;">
        <div style="font-size:0.82rem;"><strong>${esc(en.title)}</strong>${en.subtitle ? `<span style="color:#666;"> · ${esc(en.subtitle)}</span>` : ''}${en.date ? ` <span style="color:#888;font-size:0.72rem;">(${esc(en.date)})</span>` : ''}</div>
        ${en.description ? `<div style="font-size:0.78rem;color:#444;">${esc(en.description)}</div>` : ''}
      </div>`).join('')}
    </div>`).join('') : '';

  const pubsBlock = (cv.publications && cv.publications.length) ? `
    <div data-section="publications">
    ${st(t('publications') || 'Publications')}
    ${cv.publications.map(p => `
      <div class="cv-item" style="margin-bottom:0.3rem;">
        <div style="font-size:0.82rem;"><strong>${esc(p.title)}</strong>${p.url ? ` <span style="color:${accent};font-size:0.72rem;">↗</span>` : ''}${p.venue ? `<span style="color:#666;"> · ${esc(p.venue)}</span>` : ''}${p.date ? ` <span style="color:#888;font-size:0.72rem;">(${formatDate(p.date, lang)})</span>` : ''}</div>
        ${p.authors ? `<div style="font-size:0.78rem;color:#666;">${esc(p.authors)}</div>` : ''}
      </div>`).join('')}
    </div>` : '';

  const refsBlock = (cv.references && cv.references.length && !cv.showReferencesToggle) ? `
    <div data-section="references">
    ${st(t('references') || 'Références')}
    ${cv.references.map(r => `<div style="font-size:0.8rem;margin-bottom:0.2rem;"><strong>${esc(r.name)}</strong> · ${esc(r.title)}${r.company ? ` · ${esc(r.company)}` : ''}${r.email ? ` · ${esc(r.email)}` : ''}</div>`).join('')}
    </div>` : (cv.showReferencesToggle ? `
    <div data-section="references">
    ${st(t('references') || 'Références')}
    <div style="font-size:0.8rem;color:#888;font-style:italic;">${t('references_available')}</div>
    </div>` : '');

  return `
<div style="padding:1.25rem 1.75rem;font-family:${font},sans-serif;background:#fff;min-height:1123px;font-size:0.82rem;">
  ${header}
  ${summary}
  ${expBlock}
  ${eduBlock}
  ${projectsBlock}
  ${volunteerBlock}
  ${pubsBlock}
  ${skillsBlock}
  ${langsBlock}
  ${certBlock}
  ${refsBlock}
  ${customBlocks}
</div>`;
}

// ── Template: EXECUTIVE (two-column conservative) ─────────────

function tplExecutive(cv, accent, font, t) {
  const sidebarW = '235px';
  const sidebarStyle = `width:${sidebarW};flex-shrink:0;padding:2rem 1.5rem;background:#f8f7f5;border-right:1px solid #e8e6e2;align-self:stretch;`;
  const mainStyle = `flex:1;padding:2.25rem 2rem;`;

  let photoHtml = '';
  if (cv.profile.photoB64 && cv.showPhoto) {
    photoHtml = `<div style="text-align:center;margin-bottom:1.5rem;">
      <img src="${cv.profile.photoB64}" style="width:95px;height:95px;border-radius:50%;object-fit:cover;border:3px solid ${accent};" alt="Photo" />
    </div>`;
  }

  const sideSection = (label) =>
    `<div style="font-size:0.6rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:${accent};margin-bottom:0.6rem;padding-bottom:0.3rem;border-bottom:1px solid ${accent}44;">${label}</div>`;

  const contactBlock = `
    <div style="margin-bottom:1.75rem;">
      ${sideSection(t('contact') || 'Contact')}
      ${contactLine(ICONS.email, cv.profile.email, `mailto:${cv.profile.email}`)}
      ${contactLine(ICONS.phone, cv.profile.phone, `tel:${cv.profile.phone}`)}
      ${contactLine(ICONS.city, cv.profile.city)}
      ${contactLine(ICONS.linkedin, linkify(cv.profile.linkedin), cv.profile.linkedin)}
      ${contactLine(ICONS.github, linkify(cv.profile.github), cv.profile.github)}
      ${contactLine(ICONS.website, linkify(cv.profile.website), cv.profile.website)}
    </div>`;

  const skillsBlock = cv.skills.length ? `
    <div data-section="skills" style="margin-bottom:1.75rem;">
      ${sideSection(t('step_skills') || 'Compétences')}
      ${cv.skills.map(g => `
        <div style="margin-bottom:0.7rem;">
          ${g.category ? `<div style="font-size:0.72rem;font-weight:600;color:#444;margin-bottom:0.25rem;">${esc(g.category)}</div>` : ''}
          <div style="font-size:0.76rem;color:#555;line-height:1.6;">${g.items.map(esc).join(', ')}</div>
        </div>`).join('')}
    </div>` : '';

  const langsBlock = cv.extras.languages.length ? `
    <div data-section="languages" style="margin-bottom:1.75rem;">
      ${sideSection(t('languages') || 'Langues')}
      ${cv.extras.languages.map(l => `<div style="font-size:0.78rem;margin-bottom:0.25rem;"><strong>${esc(l.name)}</strong>${l.level ? ` — ${esc(l.level)}` : ''}</div>`).join('')}
    </div>` : '';

  const certBlock = cv.extras.certifications.length ? `
    <div data-section="certifications" style="margin-bottom:1.75rem;">
      ${sideSection(t('certifications') || 'Certifications')}
      ${cv.extras.certifications.map(c => `
        <div style="font-size:0.76rem;margin-bottom:0.35rem;">
          <div style="font-weight:600;">${esc(c.name)}</div>
          ${c.issuer ? `<div style="color:#777;font-size:0.72rem;">${esc(c.issuer)}</div>` : ''}
          ${c.date ? `<div style="color:#999;font-size:0.7rem;">${formatDate(c.date, lang)}</div>` : ''}
        </div>`).join('')}
    </div>` : '';

  const interestsBlock = cv.extras.interests ? `
    <div data-section="interests" style="margin-bottom:1.75rem;">
      ${sideSection(t('interests') || "Centres d'intérêt")}
      <div style="font-size:0.78rem;color:#555;line-height:1.6;">${esc(cv.extras.interests)}</div>
    </div>` : '';

  // Main content
  const mainSection = (label) =>
    `<h3 style="font-size:0.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:${accent};margin:0 0 0.75rem;padding-bottom:0.35rem;border-bottom:2px solid ${accent};">${label}</h3>`;

  const headerBlock = `
    <div style="margin-bottom:2rem;padding-bottom:1.25rem;border-bottom:1px solid #ddd;">
      <h1 style="font-size:1.9rem;font-weight:700;margin:0 0 0.3rem;color:#1a1a1a;letter-spacing:0.02em;">${esc(cv.profile.name) || 'Votre Nom'}</h1>
      <h2 style="font-size:1.05rem;font-weight:400;margin:0;color:${accent};font-style:italic;">${esc(cv.profile.title) || ''}</h2>
      ${cv.profile.summary ? `<p style="margin-top:0.9rem;font-size:0.85rem;color:#444;line-height:1.7;">${esc(cv.profile.summary)}</p>` : ''}
    </div>`;

  const expBlock = cv.experiences.length ? `
    <div data-section="experience" style="margin-bottom:1.75rem;">
      ${mainSection(t('step_exp') || 'Expériences')}
      ${cv.experiences.map(e => `
        <div class="cv-item" style="margin-bottom:1.1rem;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:0.5rem;">
            <div>
              <div style="font-weight:700;font-size:0.92rem;color:#1a1a1a;">${esc(e.role)}</div>
              <div style="font-size:0.82rem;color:#666;font-style:italic;">${esc(e.company)}</div>
            </div>
            <div style="font-size:0.75rem;color:#888;">${dateRange(e.startDate, e.endDate, e.current, t, lang)}</div>
          </div>
          ${bulletsHtml(e.bullets)}
        </div>`).join('')}
    </div>` : '';

  const eduBlock = cv.education.length ? `
    <div data-section="education" style="margin-bottom:1.75rem;">
      ${mainSection(t('step_edu') || 'Formation')}
      ${cv.education.map(e => `
        <div class="cv-item" style="margin-bottom:0.9rem;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:0.5rem;">
            <div>
              <div style="font-weight:700;font-size:0.9rem;">${esc(e.degree)}${e.field ? ` — ${esc(e.field)}` : ''}</div>
              <div style="font-size:0.82rem;color:#666;font-style:italic;">${esc(e.school)}</div>
            </div>
            <div style="font-size:0.75rem;color:#888;">${dateRange(e.startDate, e.endDate, false, t, lang)}</div>
          </div>
          ${e.grade ? `<div style="font-size:0.78rem;color:#666;margin-top:0.15rem;">${esc(e.grade)}</div>` : ''}
        </div>`).join('')}
    </div>` : '';

  const projectsBlock = (cv.projects && cv.projects.length) ? `
    <div data-section="projects" style="margin-bottom:1.75rem;">
      ${mainSection(t('projects') || 'Projets')}
      ${cv.projects.map(p => `
        <div class="cv-item" style="margin-bottom:0.9rem;">
          <div style="font-weight:700;font-size:0.9rem;">${esc(p.name)}${p.url ? ` <a href="${safeUrl(p.url)}" style="color:${accent};font-size:0.78rem;text-decoration:none;">↗ ${linkify(p.url)}</a>` : ''}</div>
          ${p.tech ? `<div style="font-size:0.75rem;color:#888;margin-top:0.1rem;">${esc(p.tech)}</div>` : ''}
          ${p.description ? `<p style="font-size:0.82rem;color:#444;margin:0.2rem 0 0;line-height:1.55;">${esc(p.description)}</p>` : ''}
        </div>`).join('')}
    </div>` : '';

  const volunteerBlock = (cv.volunteer && cv.volunteer.length) ? `
    <div data-section="volunteer" style="margin-bottom:1.75rem;">
      ${mainSection(t('volunteer') || 'Bénévolat')}
      ${cv.volunteer.map(v => `
        <div class="cv-item" style="margin-bottom:0.9rem;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:0.5rem;">
            <div>
              <div style="font-weight:700;font-size:0.9rem;">${esc(v.role)}</div>
              <div style="font-size:0.82rem;color:#666;font-style:italic;">${esc(v.org)}</div>
            </div>
            <div style="font-size:0.75rem;color:#888;">${dateRange(v.startDate, v.endDate, false, t, lang)}</div>
          </div>
          ${bulletsHtml(v.description)}
        </div>`).join('')}
    </div>` : '';

  const pubsBlock = (cv.publications && cv.publications.length) ? `
    <div data-section="publications" style="margin-bottom:1.75rem;">
      ${mainSection(t('publications') || 'Publications')}
      ${cv.publications.map(p => `
        <div class="cv-item" style="margin-bottom:0.7rem;">
          <div style="font-weight:600;font-size:0.85rem;">${p.url ? `<a href="${safeUrl(p.url)}" style="color:${accent};text-decoration:none;">${esc(p.title)}</a>` : esc(p.title)}</div>
          ${p.authors ? `<div style="font-size:0.78rem;color:#555;">${esc(p.authors)}</div>` : ''}
          <div style="font-size:0.75rem;color:#888;">${p.venue ? esc(p.venue) : ''}${p.date ? ` · ${formatDate(p.date, lang)}` : ''}</div>
        </div>`).join('')}
    </div>` : '';

  const refsBlock = (cv.references && cv.references.length) ? `
    <div data-section="references" style="margin-bottom:1.75rem;">
      ${mainSection(t('references') || 'Références')}
      ${cv.references.map(r => `
        <div class="cv-item" style="margin-bottom:0.7rem;">
          <div style="font-weight:600;font-size:0.85rem;">${esc(r.name)}</div>
          <div style="font-size:0.78rem;color:#555;">${esc(r.title)}${r.company ? ` — ${esc(r.company)}` : ''}</div>
          <div style="font-size:0.75rem;color:#888;">${r.email ? esc(r.email) : ''}${r.phone ? ` · ${esc(r.phone)}` : ''}</div>
        </div>`).join('')}
    </div>` : (cv.showReferencesToggle ? `
    <div data-section="references" style="margin-bottom:1.75rem;">
      ${mainSection(t('references') || 'Références')}
      <p style="font-size:0.82rem;color:#888;font-style:italic;">${t('references_available') || 'Disponibles sur demande'}</p>
    </div>` : '');

  const customBlocks = (cv.customSections && cv.customSections.length) ? cv.customSections.map((sec, i) => `
    <div data-section="custom_${i}" style="margin-bottom:1.75rem;">
      ${mainSection(esc(sec.title) || t('custom_section'))}
      ${sec.entries.map(en => `
        <div class="cv-item" style="margin-bottom:0.7rem;">
          <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:0.5rem;">
            <div>
              <span style="font-weight:600;font-size:0.9rem;">${esc(en.title)}</span>
              ${en.subtitle ? `<span style="color:#777;font-size:0.82rem;"> · ${esc(en.subtitle)}</span>` : ''}
            </div>
            ${en.date ? `<span style="font-size:0.75rem;color:#888;">${esc(en.date)}</span>` : ''}
          </div>
          ${en.description ? `<p style="font-size:0.82rem;color:#444;margin:0.2rem 0 0;line-height:1.55;">${esc(en.description)}</p>` : ''}
        </div>`).join('')}
    </div>`).join('') : '';

  return `
<div style="display:flex;font-family:${font},Georgia,serif;min-height:1123px;background:#fff;">
  <div style="${sidebarStyle}">
    ${photoHtml}
    ${contactBlock}
    ${skillsBlock}
    ${langsBlock}
    ${certBlock}
    ${interestsBlock}
  </div>
  <div style="${mainStyle}">
    ${headerBlock}
    ${expBlock}
    ${eduBlock}
    ${projectsBlock}
    ${volunteerBlock}
    ${pubsBlock}
    ${refsBlock}
    ${customBlocks}
  </div>
</div>`;
}

// ── Template: CREATIVE (asymmetric, colorful) ─────────────────

function tplCreative(cv, accent, font, t) {
  let photoHtml = '';
  if (cv.profile.photoB64 && cv.showPhoto) {
    photoHtml = `<img src="${cv.profile.photoB64}" style="width:100px;height:100px;border-radius:20px;object-fit:cover;border:4px solid rgba(255,255,255,0.6);box-shadow:0 4px 15px rgba(0,0,0,0.2);" alt="Photo" />`;
  }

  const header = `
    <div style="background:linear-gradient(135deg, ${accent}, ${accent}cc);color:#fff;padding:2.5rem 2.5rem 2rem;border-radius:0 0 30px 0;position:relative;">
      <div style="display:flex;align-items:center;gap:1.5rem;">
        ${photoHtml}
        <div>
          <h1 style="font-size:2.2rem;font-weight:800;margin:0 0 0.2rem;letter-spacing:-0.02em;">${esc(cv.profile.name) || 'Votre Nom'}</h1>
          <h2 style="font-size:1.1rem;font-weight:300;margin:0;opacity:.9;">${esc(cv.profile.title) || ''}</h2>
        </div>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:0.75rem;margin-top:1.25rem;font-size:0.78rem;opacity:.85;">
        ${cv.profile.email ? `<span style="background:rgba(255,255,255,0.2);padding:0.2rem 0.6rem;border-radius:20px;">✉ ${esc(cv.profile.email)}</span>` : ''}
        ${cv.profile.phone ? `<span style="background:rgba(255,255,255,0.2);padding:0.2rem 0.6rem;border-radius:20px;">☎ ${esc(cv.profile.phone)}</span>` : ''}
        ${cv.profile.city ? `<span style="background:rgba(255,255,255,0.2);padding:0.2rem 0.6rem;border-radius:20px;">📍 ${esc(cv.profile.city)}</span>` : ''}
        ${cv.profile.linkedin ? `<span style="background:rgba(255,255,255,0.2);padding:0.2rem 0.6rem;border-radius:20px;">🔗 ${linkify(cv.profile.linkedin)}</span>` : ''}
        ${cv.profile.github ? `<span style="background:rgba(255,255,255,0.2);padding:0.2rem 0.6rem;border-radius:20px;">🔗 ${linkify(cv.profile.github)}</span>` : ''}
        ${cv.profile.website ? `<span style="background:rgba(255,255,255,0.2);padding:0.2rem 0.6rem;border-radius:20px;">🌐 ${linkify(cv.profile.website)}</span>` : ''}
      </div>
    </div>`;

  const sectionTitle = (label) =>
    `<h3 style="font-size:0.82rem;font-weight:700;color:${accent};margin:1.5rem 0 0.75rem;padding-left:0.75rem;border-left:4px solid ${accent};letter-spacing:0.03em;">${label}</h3>`;

  const summary = cv.profile.summary ? `
    <div style="background:${accent}0a;border-radius:12px;padding:1rem 1.25rem;margin-top:1.5rem;">
      <p style="margin:0;font-size:0.85rem;color:#444;line-height:1.7;">${esc(cv.profile.summary)}</p>
    </div>` : '';

  const expBlock = cv.experiences.length ? `
    <div data-section="experience">
    ${sectionTitle(t('step_exp') || 'Expériences')}
    ${cv.experiences.map(e => `
      <div class="cv-item" style="margin-bottom:1.1rem;padding:0.75rem;background:#fafafa;border-radius:10px;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:0.5rem;">
          <div>
            <div style="font-weight:700;font-size:0.92rem;color:#222;">${esc(e.role)}</div>
            <div style="font-size:0.82rem;color:${accent};">${esc(e.company)}</div>
          </div>
          <div style="font-size:0.72rem;color:#fff;background:${accent};padding:0.15rem 0.6rem;border-radius:20px;">${dateRange(e.startDate, e.endDate, e.current, t, lang)}</div>
        </div>
        ${bulletsHtml(e.bullets)}
      </div>`).join('')}
    </div>` : '';

  const eduBlock = cv.education.length ? `
    <div data-section="education">
    ${sectionTitle(t('step_edu') || 'Formation')}
    ${cv.education.map(e => `
      <div class="cv-item" style="margin-bottom:0.9rem;padding:0.75rem;background:#fafafa;border-radius:10px;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:0.5rem;">
          <div>
            <div style="font-weight:700;font-size:0.9rem;">${esc(e.degree)}${e.field ? ` — ${esc(e.field)}` : ''}</div>
            <div style="font-size:0.82rem;color:${accent};">${esc(e.school)}</div>
          </div>
          <div style="font-size:0.72rem;color:#fff;background:${accent};padding:0.15rem 0.6rem;border-radius:20px;">${dateRange(e.startDate, e.endDate, false, t, lang)}</div>
        </div>
        ${e.grade ? `<div style="font-size:0.78rem;color:#666;margin-top:0.2rem;">${esc(e.grade)}</div>` : ''}
      </div>`).join('')}
    </div>` : '';

  const skillsBlock = cv.skills.length ? `
    <div data-section="skills">
    ${sectionTitle(t('step_skills') || 'Compétences')}
    ${cv.skills.map(g => `
      <div style="margin-bottom:0.7rem;">
        ${g.category ? `<div style="font-size:0.72rem;font-weight:700;color:#555;margin-bottom:0.3rem;">${esc(g.category)}</div>` : ''}
        <div style="display:flex;flex-wrap:wrap;gap:0.3rem;">
          ${g.items.map(s => `<span style="background:linear-gradient(135deg,${accent}22,${accent}11);color:${accent};padding:0.2rem 0.65rem;border-radius:20px;font-size:0.78rem;font-weight:600;border:1px solid ${accent}33;">${esc(s)}</span>`).join('')}
        </div>
      </div>`).join('')}
    </div>` : '';

  const langsBlock = cv.extras.languages.length ? `
    <div data-section="languages">
    ${sectionTitle(t('languages') || 'Langues')}
    <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
      ${cv.extras.languages.map(l => `<span style="background:${accent}15;color:${accent};padding:0.3rem 0.75rem;border-radius:20px;font-size:0.82rem;font-weight:500;">${esc(l.name)}${l.level ? ` · ${esc(l.level)}` : ''}</span>`).join('')}
    </div>` : '';

  const certBlock = cv.extras.certifications.length ? `
    <div data-section="certifications">
    ${sectionTitle(t('certifications') || 'Certifications')}
    ${cv.extras.certifications.map(c => `
      <div class="cv-item" style="font-size:0.82rem;margin-bottom:0.4rem;padding-left:0.75rem;border-left:2px solid ${accent}44;">
        ${esc(c.name)}${c.issuer ? ` <span style="color:#777;">· ${esc(c.issuer)}</span>` : ''}${c.date ? ` <span style="color:#999;">(${formatDate(c.date, lang)})</span>` : ''}
      </div>`).join('')}
    </div>` : '';

  const interestsBlock = cv.extras.interests ? `
    <div data-section="interests">
    ${sectionTitle(t('interests') || "Centres d'intérêt")}
    <p style="font-size:0.82rem;color:#555;line-height:1.6;">${esc(cv.extras.interests)}</p>
    </div>` : '';

  const projectsBlock = (cv.projects && cv.projects.length) ? `
    <div data-section="projects">
    ${sectionTitle(t('projects') || 'Projets')}
    ${cv.projects.map(p => `
      <div class="cv-item" style="margin-bottom:0.9rem;padding:0.75rem;background:#fafafa;border-radius:10px;">
        <div style="font-weight:700;font-size:0.92rem;color:#222;">${esc(p.name)}${p.url ? ` <a href="${safeUrl(p.url)}" style="color:${accent};font-size:0.78rem;text-decoration:none;">↗ ${linkify(p.url)}</a>` : ''}</div>
        ${p.tech ? `<div style="font-size:0.72rem;color:${accent};margin-top:0.15rem;">${esc(p.tech)}</div>` : ''}
        ${p.description ? `<p style="font-size:0.82rem;color:#444;margin:0.25rem 0 0;line-height:1.55;">${esc(p.description)}</p>` : ''}
      </div>`).join('')}
    </div>` : '';

  const volunteerBlock = (cv.volunteer && cv.volunteer.length) ? `
    <div data-section="volunteer">
    ${sectionTitle(t('volunteer') || 'Bénévolat')}
    ${cv.volunteer.map(v => `
      <div class="cv-item" style="margin-bottom:0.9rem;padding:0.75rem;background:#fafafa;border-radius:10px;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:0.5rem;">
          <div>
            <div style="font-weight:700;font-size:0.9rem;">${esc(v.role)}</div>
            <div style="font-size:0.82rem;color:${accent};">${esc(v.org)}</div>
          </div>
          <div style="font-size:0.72rem;color:#fff;background:${accent};padding:0.15rem 0.6rem;border-radius:20px;">${dateRange(v.startDate, v.endDate, false, t, lang)}</div>
        </div>
        ${bulletsHtml(v.description)}
      </div>`).join('')}
    </div>` : '';

  const pubsBlock = (cv.publications && cv.publications.length) ? `
    <div data-section="publications">
    ${sectionTitle(t('publications') || 'Publications')}
    ${cv.publications.map(p => `
      <div class="cv-item" style="margin-bottom:0.7rem;padding-left:0.75rem;border-left:2px solid ${accent}44;">
        <div style="font-weight:600;font-size:0.85rem;">${p.url ? `<a href="${safeUrl(p.url)}" style="color:${accent};text-decoration:none;">${esc(p.title)}</a>` : esc(p.title)}</div>
        ${p.authors ? `<div style="font-size:0.78rem;color:#555;">${esc(p.authors)}</div>` : ''}
        <div style="font-size:0.75rem;color:#888;">${p.venue ? esc(p.venue) : ''}${p.date ? ` · ${formatDate(p.date, lang)}` : ''}</div>
      </div>`).join('')}
    </div>` : '';

  const refsBlock = (cv.references && cv.references.length) ? `
    <div data-section="references">
    ${sectionTitle(t('references') || 'Références')}
    ${cv.references.map(r => `
      <div class="cv-item" style="margin-bottom:0.7rem;padding:0.6rem;background:#fafafa;border-radius:8px;">
        <div style="font-weight:600;font-size:0.85rem;">${esc(r.name)}</div>
        <div style="font-size:0.78rem;color:#555;">${esc(r.title)}${r.company ? ` — ${esc(r.company)}` : ''}</div>
        <div style="font-size:0.75rem;color:#888;">${r.email ? esc(r.email) : ''}${r.phone ? ` · ${esc(r.phone)}` : ''}</div>
      </div>`).join('')}
    </div>` : (cv.showReferencesToggle ? `
    <div data-section="references">
    ${sectionTitle(t('references') || 'Références')}
    <p style="font-size:0.82rem;color:#888;font-style:italic;">${t('references_available') || 'Disponibles sur demande'}</p>
    </div>` : '');

  const customBlocks = (cv.customSections && cv.customSections.length) ? cv.customSections.map((sec, i) => `
    <div data-section="custom_${i}">
    ${sectionTitle(esc(sec.title) || t('custom_section'))}
    ${sec.entries.map(en => `
      <div class="cv-item" style="margin-bottom:0.7rem;padding:0.6rem;background:#fafafa;border-radius:8px;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:0.5rem;">
          <div>
            <span style="font-weight:700;font-size:0.9rem;">${esc(en.title)}</span>
            ${en.subtitle ? `<span style="color:${accent};font-size:0.82rem;"> · ${esc(en.subtitle)}</span>` : ''}
          </div>
          ${en.date ? `<span style="font-size:0.72rem;color:#fff;background:${accent};padding:0.1rem 0.5rem;border-radius:20px;">${esc(en.date)}</span>` : ''}
        </div>
        ${en.description ? `<p style="font-size:0.82rem;color:#444;margin:0.2rem 0 0;line-height:1.55;">${esc(en.description)}</p>` : ''}
      </div>`).join('')}
    </div>`).join('') : '';

  return `
<div style="font-family:${font},sans-serif;background:#fff;min-height:1123px;">
  ${header}
  <div style="padding:0 2.5rem 2rem;">
    ${summary}
    ${expBlock}
    ${eduBlock}
    ${projectsBlock}
    ${volunteerBlock}
    ${skillsBlock}
    ${langsBlock}
    ${certBlock}
    ${interestsBlock}
    ${pubsBlock}
    ${refsBlock}
    ${customBlocks}
  </div>
</div>`;
}

// ── Template: TECHNICAL (monospace, terminal-inspired) ─────────

function tplTechnical(cv, accent, font, t) {
  const monoFont = `'Courier New',Consolas,monospace`;

  let photoHtml = '';
  if (cv.profile.photoB64 && cv.showPhoto) {
    photoHtml = `<img src="${cv.profile.photoB64}" style="width:70px;height:70px;border-radius:8px;object-fit:cover;border:2px solid ${accent};" alt="Photo" />`;
  }

  const header = `
    <div style="background:#1e1e1e;color:#d4d4d4;padding:1.5rem 2rem;font-family:${monoFont};border-bottom:3px solid ${accent};">
      <div style="display:flex;align-items:center;gap:1.5rem;">
        ${photoHtml}
        <div>
          <div style="color:#569cd6;font-size:0.72rem;margin-bottom:0.2rem;">// developer profile</div>
          <h1 style="font-size:1.6rem;font-weight:700;margin:0 0 0.15rem;color:#4ec9b0;">${esc(cv.profile.name) || 'Votre Nom'}</h1>
          <h2 style="font-size:0.9rem;font-weight:400;margin:0;color:#ce9178;">${esc(cv.profile.title) || ''}</h2>
        </div>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:0.75rem;margin-top:1rem;font-size:0.72rem;color:#9cdcfe;">
        ${cv.profile.email ? `<span><span style="color:#569cd6;">email:</span> ${esc(cv.profile.email)}</span>` : ''}
        ${cv.profile.phone ? `<span><span style="color:#569cd6;">tel:</span> ${esc(cv.profile.phone)}</span>` : ''}
        ${cv.profile.city ? `<span><span style="color:#569cd6;">loc:</span> ${esc(cv.profile.city)}</span>` : ''}
        ${cv.profile.linkedin ? `<span><span style="color:#569cd6;">in:</span> ${linkify(cv.profile.linkedin)}</span>` : ''}
        ${cv.profile.github ? `<span><span style="color:#569cd6;">gh:</span> ${linkify(cv.profile.github)}</span>` : ''}
        ${cv.profile.website ? `<span><span style="color:#569cd6;">web:</span> ${linkify(cv.profile.website)}</span>` : ''}
      </div>
    </div>`;

  const sectionTitle = (label) =>
    `<h3 style="font-family:${monoFont};font-size:0.75rem;font-weight:700;color:${accent};margin:1.5rem 0 0.75rem;padding:0.3rem 0.6rem;background:${accent}12;border-left:3px solid ${accent};letter-spacing:0.05em;">$ ${label}</h3>`;

  const summary = cv.profile.summary ? `
    <div style="background:#f5f5f5;border:1px solid #e0e0e0;border-radius:4px;padding:0.75rem 1rem;margin-top:1.25rem;font-family:${monoFont};">
      <div style="font-size:0.68rem;color:#888;margin-bottom:0.3rem;">/* summary */</div>
      <p style="margin:0;font-size:0.82rem;color:#333;line-height:1.6;">${esc(cv.profile.summary)}</p>
    </div>` : '';

  const expBlock = cv.experiences.length ? `
    <div data-section="experience">
    ${sectionTitle(t('step_exp') || 'Expériences')}
    ${cv.experiences.map(e => `
      <div class="cv-item" style="margin-bottom:1rem;padding-left:1rem;border-left:2px dashed ${accent}55;">
        <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:0.5rem;">
          <div>
            <div style="font-weight:700;font-size:0.9rem;font-family:${monoFont};color:#333;">${esc(e.role)}</div>
            <div style="font-size:0.8rem;color:${accent};font-family:${monoFont};">${esc(e.company)}</div>
          </div>
          <div style="font-size:0.72rem;color:#888;font-family:${monoFont};background:#f0f0f0;padding:0.15rem 0.5rem;border-radius:3px;">${dateRange(e.startDate, e.endDate, e.current, t, lang)}</div>
        </div>
        ${bulletsHtml(e.bullets)}
      </div>`).join('')}
    </div>` : '';

  const eduBlock = cv.education.length ? `
    <div data-section="education">
    ${sectionTitle(t('step_edu') || 'Formation')}
    ${cv.education.map(e => `
      <div class="cv-item" style="margin-bottom:0.875rem;padding-left:1rem;border-left:2px dashed ${accent}55;">
        <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:0.5rem;">
          <div>
            <div style="font-weight:700;font-size:0.88rem;font-family:${monoFont};">${esc(e.degree)}${e.field ? ` — ${esc(e.field)}` : ''}</div>
            <div style="font-size:0.8rem;color:${accent};font-family:${monoFont};">${esc(e.school)}</div>
          </div>
          <div style="font-size:0.72rem;color:#888;font-family:${monoFont};">${dateRange(e.startDate, e.endDate, false, t, lang)}</div>
        </div>
        ${e.grade ? `<div style="font-size:0.78rem;color:#666;font-family:${monoFont};">${esc(e.grade)}</div>` : ''}
      </div>`).join('')}
    </div>` : '';

  const skillsBlock = cv.skills.length ? `
    <div data-section="skills">
    ${sectionTitle(t('step_skills') || 'Compétences')}
    ${cv.skills.map(g => `
      <div style="margin-bottom:0.6rem;">
        ${g.category ? `<div style="font-size:0.72rem;font-weight:700;color:#555;font-family:${monoFont};margin-bottom:0.25rem;">${esc(g.category)}/</div>` : ''}
        <div style="display:flex;flex-wrap:wrap;gap:0.3rem;">
          ${g.items.map(s => `<span style="background:#1e1e1e;color:#4ec9b0;padding:0.15rem 0.5rem;border-radius:3px;font-size:0.75rem;font-family:${monoFont};">${esc(s)}</span>`).join('')}
        </div>
      </div>`).join('')}
    </div>` : '';

  const projectsBlock = (cv.projects && cv.projects.length) ? `
    <div data-section="projects">
    ${sectionTitle(t('projects') || 'Projets')}
    ${cv.projects.map(p => `
      <div class="cv-item" style="margin-bottom:1rem;padding:0.75rem;background:#f8f8f8;border:1px solid #e8e8e8;border-radius:6px;">
        <div style="font-weight:700;font-size:0.9rem;font-family:${monoFont};color:#333;">${esc(p.name)}${p.url ? ` <a href="${safeUrl(p.url)}" style="color:${accent};font-size:0.75rem;text-decoration:none;font-family:${monoFont};">↗ ${linkify(p.url)}</a>` : ''}</div>
        ${p.tech ? `<div style="display:flex;flex-wrap:wrap;gap:0.25rem;margin-top:0.3rem;">${p.tech.split(',').map(tt => `<span style="background:#1e1e1e;color:#ce9178;padding:0.1rem 0.4rem;border-radius:3px;font-size:0.7rem;font-family:${monoFont};">${esc(tt.trim())}</span>`).join('')}</div>` : ''}
        ${p.description ? `<p style="font-size:0.82rem;color:#444;margin:0.3rem 0 0;line-height:1.5;">${esc(p.description)}</p>` : ''}
      </div>`).join('')}
    </div>` : '';

  const langsBlock = cv.extras.languages.length ? `
    <div data-section="languages">
    ${sectionTitle(t('languages') || 'Langues')}
    <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
      ${cv.extras.languages.map(l => `<span style="font-family:${monoFont};font-size:0.8rem;background:#f0f0f0;padding:0.2rem 0.6rem;border-radius:3px;"><strong>${esc(l.name)}</strong>${l.level ? ` (${esc(l.level)})` : ''}</span>`).join('')}
    </div>` : '';

  const certBlock = cv.extras.certifications.length ? `
    <div data-section="certifications">
    ${sectionTitle(t('certifications') || 'Certifications')}
    ${cv.extras.certifications.map(c => `
      <div class="cv-item" style="font-size:0.82rem;margin-bottom:0.35rem;font-family:${monoFont};">✓ ${esc(c.name)}${c.issuer ? ` <span style="color:#777;">· ${esc(c.issuer)}</span>` : ''}${c.date ? ` <span style="color:#999;">(${formatDate(c.date, lang)})</span>` : ''}</div>`).join('')}
    </div>` : '';

  const interestsBlock = cv.extras.interests ? `
    <div data-section="interests">
    ${sectionTitle(t('interests') || "Centres d'intérêt")}
    <p style="font-size:0.82rem;color:#555;line-height:1.6;">${esc(cv.extras.interests)}</p>
    </div>` : '';

  const volunteerBlock = (cv.volunteer && cv.volunteer.length) ? `
    <div data-section="volunteer">
    ${sectionTitle(t('volunteer') || 'Bénévolat')}
    ${cv.volunteer.map(v => `
      <div class="cv-item" style="margin-bottom:0.875rem;padding-left:1rem;border-left:2px dashed ${accent}55;">
        <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:0.5rem;">
          <div>
            <div style="font-weight:700;font-size:0.88rem;font-family:${monoFont};">${esc(v.role)}</div>
            <div style="font-size:0.8rem;color:${accent};font-family:${monoFont};">${esc(v.org)}</div>
          </div>
          <div style="font-size:0.72rem;color:#888;font-family:${monoFont};">${dateRange(v.startDate, v.endDate, false, t, lang)}</div>
        </div>
        ${bulletsHtml(v.description)}
      </div>`).join('')}
    </div>` : '';

  const pubsBlock = (cv.publications && cv.publications.length) ? `
    <div data-section="publications">
    ${sectionTitle(t('publications') || 'Publications')}
    ${cv.publications.map(p => `
      <div class="cv-item" style="margin-bottom:0.7rem;font-family:${monoFont};">
        <div style="font-weight:600;font-size:0.82rem;">${p.url ? `<a href="${safeUrl(p.url)}" style="color:${accent};text-decoration:none;">${esc(p.title)}</a>` : esc(p.title)}</div>
        ${p.authors ? `<div style="font-size:0.75rem;color:#555;">${esc(p.authors)}</div>` : ''}
        <div style="font-size:0.72rem;color:#888;">${p.venue ? esc(p.venue) : ''}${p.date ? ` · ${formatDate(p.date, lang)}` : ''}</div>
      </div>`).join('')}
    </div>` : '';

  const refsBlock = (cv.references && cv.references.length) ? `
    <div data-section="references">
    ${sectionTitle(t('references') || 'Références')}
    ${cv.references.map(r => `
      <div class="cv-item" style="margin-bottom:0.6rem;font-family:${monoFont};">
        <div style="font-weight:600;font-size:0.82rem;">${esc(r.name)}</div>
        <div style="font-size:0.75rem;color:#555;">${esc(r.title)}${r.company ? ` @ ${esc(r.company)}` : ''}</div>
        <div style="font-size:0.72rem;color:#888;">${r.email ? esc(r.email) : ''}${r.phone ? ` · ${esc(r.phone)}` : ''}</div>
      </div>`).join('')}
    </div>` : (cv.showReferencesToggle ? `
    <div data-section="references">
    ${sectionTitle(t('references') || 'Références')}
    <p style="font-size:0.82rem;color:#888;font-family:${monoFont};font-style:italic;">${t('references_available') || 'Disponibles sur demande'}</p>
    </div>` : '');

  const customBlocks = (cv.customSections && cv.customSections.length) ? cv.customSections.map((sec, i) => `
    <div data-section="custom_${i}">
    ${sectionTitle(esc(sec.title) || t('custom_section'))}
    ${sec.entries.map(en => `
      <div class="cv-item" style="margin-bottom:0.7rem;padding-left:1rem;border-left:2px dashed ${accent}55;">
        <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:0.5rem;">
          <div>
            <span style="font-weight:700;font-size:0.88rem;font-family:${monoFont};">${esc(en.title)}</span>
            ${en.subtitle ? `<span style="color:#777;font-size:0.8rem;font-family:${monoFont};"> · ${esc(en.subtitle)}</span>` : ''}
          </div>
          ${en.date ? `<span style="font-size:0.72rem;color:#888;font-family:${monoFont};">${esc(en.date)}</span>` : ''}
        </div>
        ${en.description ? `<p style="font-size:0.82rem;color:#444;margin:0.2rem 0 0;line-height:1.5;">${esc(en.description)}</p>` : ''}
      </div>`).join('')}
    </div>`).join('') : '';

  return `
<div style="font-family:${font},sans-serif;background:#fff;min-height:1123px;">
  ${header}
  <div style="padding:1rem 2rem 2rem;">
    ${summary}
    ${projectsBlock}
    ${expBlock}
    ${eduBlock}
    ${skillsBlock}
    ${volunteerBlock}
    ${langsBlock}
    ${certBlock}
    ${interestsBlock}
    ${pubsBlock}
    ${refsBlock}
    ${customBlocks}
  </div>
</div>`;
}

// ── Template: MINIMAL (extreme whitespace, zero color) ────────

function tplMinimal(cv, accent, font, t) {
  let photoHtml = '';
  if (cv.profile.photoB64 && cv.showPhoto) {
    photoHtml = `<img src="${cv.profile.photoB64}" style="width:65px;height:65px;border-radius:50%;object-fit:cover;border:1px solid #ddd;margin-right:1.5rem;" alt="Photo" />`;
  }

  const header = `
    <div style="display:flex;align-items:center;margin-bottom:2.5rem;">
      ${photoHtml}
      <div>
        <h1 style="font-size:1.8rem;font-weight:300;margin:0 0 0.2rem;color:#111;letter-spacing:0.05em;">${esc(cv.profile.name) || 'Votre Nom'}</h1>
        ${cv.profile.title ? `<div style="font-size:0.95rem;color:#666;font-weight:300;margin-bottom:0.5rem;">${esc(cv.profile.title)}</div>` : ''}
        <div style="font-size:0.78rem;color:#999;display:flex;flex-wrap:wrap;gap:0.75rem;">
          ${cv.profile.email ? `<span>${esc(cv.profile.email)}</span>` : ''}
          ${cv.profile.phone ? `<span>${esc(cv.profile.phone)}</span>` : ''}
          ${cv.profile.city ? `<span>${esc(cv.profile.city)}</span>` : ''}
          ${cv.profile.linkedin ? `<span>${linkify(cv.profile.linkedin)}</span>` : ''}
          ${cv.profile.github ? `<span>${linkify(cv.profile.github)}</span>` : ''}
          ${cv.profile.website ? `<span>${linkify(cv.profile.website)}</span>` : ''}
        </div>
      </div>
    </div>`;

  const sectionTitle = (label) =>
    `<h3 style="font-size:0.7rem;font-weight:400;letter-spacing:.15em;text-transform:uppercase;color:#999;margin:2rem 0 0.75rem;">${label}</h3>`;

  const summary = cv.profile.summary ? `
    <p style="font-size:0.88rem;color:#555;line-height:1.8;margin:0 0 1rem;font-weight:300;">${esc(cv.profile.summary)}</p>` : '';

  const expBlock = cv.experiences.length ? `
    <div data-section="experience">
    ${sectionTitle(t('step_exp') || 'Expériences')}
    ${cv.experiences.map(e => `
      <div class="cv-item" style="margin-bottom:1.25rem;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;">
          <div>
            <span style="font-weight:500;font-size:0.9rem;color:#222;">${esc(e.role)}</span>
            <span style="color:#999;font-size:0.85rem;font-weight:300;"> — ${esc(e.company)}</span>
          </div>
          <span style="font-size:0.75rem;color:#bbb;font-weight:300;">${dateRange(e.startDate, e.endDate, e.current, t, lang)}</span>
        </div>
        ${bulletsHtml(e.bullets)}
      </div>`).join('')}
    </div>` : '';

  const eduBlock = cv.education.length ? `
    <div data-section="education">
    ${sectionTitle(t('step_edu') || 'Formation')}
    ${cv.education.map(e => `
      <div class="cv-item" style="margin-bottom:1rem;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;">
          <div>
            <span style="font-weight:500;font-size:0.9rem;color:#222;">${esc(e.degree)}${e.field ? ` — ${esc(e.field)}` : ''}</span>
            <span style="color:#999;font-size:0.85rem;font-weight:300;"> — ${esc(e.school)}</span>
          </div>
          <span style="font-size:0.75rem;color:#bbb;font-weight:300;">${dateRange(e.startDate, e.endDate, false, t, lang)}</span>
        </div>
        ${e.grade ? `<div style="font-size:0.8rem;color:#888;font-weight:300;margin-top:0.15rem;">${esc(e.grade)}</div>` : ''}
      </div>`).join('')}
    </div>` : '';

  const skillsBlock = cv.skills.length ? `
    <div data-section="skills">
    ${sectionTitle(t('step_skills') || 'Compétences')}
    ${cv.skills.map(g => `
      <div style="margin-bottom:0.5rem;font-size:0.85rem;color:#444;font-weight:300;">
        ${g.category ? `<span style="font-weight:500;color:#333;">${esc(g.category)}: </span>` : ''}${g.items.map(esc).join(', ')}
      </div>`).join('')}
    </div>` : '';

  const langsBlock = cv.extras.languages.length ? `
    <div data-section="languages">
    ${sectionTitle(t('languages') || 'Langues')}
    <div style="font-size:0.85rem;color:#444;font-weight:300;">${cv.extras.languages.map(l => `${esc(l.name)}${l.level ? ` (${esc(l.level)})` : ''}`).join(' · ')}</div>` : '';

  const certBlock = cv.extras.certifications.length ? `
    <div data-section="certifications">
    ${sectionTitle(t('certifications') || 'Certifications')}
    ${cv.extras.certifications.map(c => `<div style="font-size:0.85rem;color:#444;font-weight:300;margin-bottom:0.3rem;">${esc(c.name)}${c.issuer ? ` · ${esc(c.issuer)}` : ''}${c.date ? ` (${formatDate(c.date, lang)})` : ''}</div>`).join('')}
    </div>` : '';

  const interestsBlock = cv.extras.interests ? `
    <div data-section="interests">
    ${sectionTitle(t('interests') || "Centres d'intérêt")}
    <p style="font-size:0.85rem;color:#444;font-weight:300;">${esc(cv.extras.interests)}</p>
    </div>` : '';

  const projectsBlock = (cv.projects && cv.projects.length) ? `
    <div data-section="projects">
    ${sectionTitle(t('projects') || 'Projets')}
    ${cv.projects.map(p => `
      <div class="cv-item" style="margin-bottom:1rem;">
        <div style="font-weight:500;font-size:0.9rem;color:#222;">${esc(p.name)}${p.url ? ` <a href="${safeUrl(p.url)}" style="color:#999;font-size:0.78rem;text-decoration:none;font-weight:300;">↗ ${linkify(p.url)}</a>` : ''}</div>
        ${p.tech ? `<div style="font-size:0.78rem;color:#bbb;font-weight:300;margin-top:0.1rem;">${esc(p.tech)}</div>` : ''}
        ${p.description ? `<p style="font-size:0.85rem;color:#555;font-weight:300;margin:0.2rem 0 0;line-height:1.6;">${esc(p.description)}</p>` : ''}
      </div>`).join('')}
    </div>` : '';

  const volunteerBlock = (cv.volunteer && cv.volunteer.length) ? `
    <div data-section="volunteer">
    ${sectionTitle(t('volunteer') || 'Bénévolat')}
    ${cv.volunteer.map(v => `
      <div class="cv-item" style="margin-bottom:1rem;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;">
          <div>
            <span style="font-weight:500;font-size:0.9rem;color:#222;">${esc(v.role)}</span>
            <span style="color:#999;font-size:0.85rem;font-weight:300;"> — ${esc(v.org)}</span>
          </div>
          <span style="font-size:0.75rem;color:#bbb;font-weight:300;">${dateRange(v.startDate, v.endDate, false, t, lang)}</span>
        </div>
        ${bulletsHtml(v.description)}
      </div>`).join('')}
    </div>` : '';

  const pubsBlock = (cv.publications && cv.publications.length) ? `
    <div data-section="publications">
    ${sectionTitle(t('publications') || 'Publications')}
    ${cv.publications.map(p => `
      <div class="cv-item" style="margin-bottom:0.75rem;">
        <div style="font-weight:500;font-size:0.85rem;color:#222;">${p.url ? `<a href="${safeUrl(p.url)}" style="color:#222;text-decoration:none;border-bottom:1px solid #ddd;">${esc(p.title)}</a>` : esc(p.title)}</div>
        ${p.authors ? `<div style="font-size:0.8rem;color:#888;font-weight:300;">${esc(p.authors)}</div>` : ''}
        <div style="font-size:0.75rem;color:#bbb;font-weight:300;">${p.venue ? esc(p.venue) : ''}${p.date ? ` · ${formatDate(p.date, lang)}` : ''}</div>
      </div>`).join('')}
    </div>` : '';

  const refsBlock = (cv.references && cv.references.length) ? `
    <div data-section="references">
    ${sectionTitle(t('references') || 'Références')}
    ${cv.references.map(r => `
      <div class="cv-item" style="margin-bottom:0.7rem;">
        <div style="font-weight:500;font-size:0.85rem;color:#222;">${esc(r.name)}</div>
        <div style="font-size:0.8rem;color:#888;font-weight:300;">${esc(r.title)}${r.company ? ` — ${esc(r.company)}` : ''}</div>
        <div style="font-size:0.75rem;color:#bbb;font-weight:300;">${r.email ? esc(r.email) : ''}${r.phone ? ` · ${esc(r.phone)}` : ''}</div>
      </div>`).join('')}
    </div>` : (cv.showReferencesToggle ? `
    <div data-section="references">
    ${sectionTitle(t('references') || 'Références')}
    <p style="font-size:0.85rem;color:#bbb;font-weight:300;font-style:italic;">${t('references_available') || 'Disponibles sur demande'}</p>
    </div>` : '');

  const customBlocks = (cv.customSections && cv.customSections.length) ? cv.customSections.map((sec, i) => `
    <div data-section="custom_${i}">
    ${sectionTitle(esc(sec.title) || t('custom_section'))}
    ${sec.entries.map(en => `
      <div class="cv-item" style="margin-bottom:0.75rem;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;">
          <div>
            <span style="font-weight:500;font-size:0.9rem;color:#222;">${esc(en.title)}</span>
            ${en.subtitle ? `<span style="color:#999;font-size:0.85rem;font-weight:300;"> — ${esc(en.subtitle)}</span>` : ''}
          </div>
          ${en.date ? `<span style="font-size:0.75rem;color:#bbb;font-weight:300;">${esc(en.date)}</span>` : ''}
        </div>
        ${en.description ? `<p style="font-size:0.85rem;color:#555;font-weight:300;margin:0.15rem 0 0;line-height:1.6;">${esc(en.description)}</p>` : ''}
      </div>`).join('')}
    </div>`).join('') : '';

  return `
<div style="padding:3rem;font-family:${font},sans-serif;background:#fff;min-height:1123px;">
  ${header}
  ${summary}
  ${expBlock}
  ${eduBlock}
  ${projectsBlock}
  ${volunteerBlock}
  ${skillsBlock}
  ${langsBlock}
  ${certBlock}
  ${interestsBlock}
  ${pubsBlock}
  ${refsBlock}
  ${customBlocks}
</div>`;
}

// ── Template: ACADEMIC (formal, serif, publications) ──────────

function tplAcademic(cv, accent, font, t) {
  const serifFont = `${font},Georgia,'Times New Roman',serif`;

  const header = `
    <div style="text-align:center;margin-bottom:1.5rem;padding-bottom:1rem;border-bottom:2px solid #333;">
      ${cv.profile.photoB64 && cv.showPhoto ? `<div style="margin-bottom:0.75rem;"><img src="${cv.profile.photoB64}" style="width:85px;height:85px;border-radius:4px;object-fit:cover;border:1px solid #bbb;" alt="Photo" /></div>` : ''}
      <h1 style="font-size:1.7rem;font-weight:400;margin:0 0 0.2rem;color:#111;font-family:${serifFont};letter-spacing:0.08em;text-transform:uppercase;">${esc(cv.profile.name) || 'Votre Nom'}</h1>
      ${cv.profile.title ? `<div style="font-size:0.95rem;color:#555;font-family:${serifFont};font-style:italic;margin-bottom:0.5rem;">${esc(cv.profile.title)}</div>` : ''}
      <div style="font-size:0.78rem;color:#666;display:flex;flex-wrap:wrap;justify-content:center;gap:0.5rem;">
        ${cv.profile.email ? `<span>${esc(cv.profile.email)}</span>` : ''}
        ${cv.profile.phone ? `<span>· ${esc(cv.profile.phone)}</span>` : ''}
        ${cv.profile.city ? `<span>· ${esc(cv.profile.city)}</span>` : ''}
        ${cv.profile.linkedin ? `<span>· ${linkify(cv.profile.linkedin)}</span>` : ''}
        ${cv.profile.github ? `<span>· ${linkify(cv.profile.github)}</span>` : ''}
        ${cv.profile.website ? `<span>· ${linkify(cv.profile.website)}</span>` : ''}
      </div>
    </div>`;

  const sectionTitle = (label) =>
    `<h3 style="font-family:${serifFont};font-size:0.85rem;font-weight:400;letter-spacing:.12em;text-transform:uppercase;color:#111;margin:1.5rem 0 0.6rem;padding-bottom:0.3rem;border-bottom:1px solid #999;">${label}</h3>`;

  const summary = cv.profile.summary ? `
    <div style="margin-bottom:0.5rem;">
      <p style="font-size:0.88rem;color:#333;line-height:1.75;margin:0;font-family:${serifFont};text-align:justify;">${esc(cv.profile.summary)}</p>
    </div>` : '';

  const expBlock = cv.experiences.length ? `
    <div data-section="experience">
    ${sectionTitle(t('step_exp') || 'Expériences Professionnelles')}
    ${cv.experiences.map(e => `
      <div class="cv-item" style="margin-bottom:1rem;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;">
          <div style="font-family:${serifFont};">
            <span style="font-weight:700;font-size:0.9rem;">${esc(e.role)}</span>,
            <span style="font-style:italic;font-size:0.88rem;">${esc(e.company)}</span>
          </div>
          <span style="font-size:0.78rem;color:#777;font-family:${serifFont};">${dateRange(e.startDate, e.endDate, e.current, t, lang)}</span>
        </div>
        ${bulletsHtml(e.bullets)}
      </div>`).join('')}
    </div>` : '';

  const eduBlock = cv.education.length ? `
    <div data-section="education">
    ${sectionTitle(t('step_edu') || 'Formation')}
    ${cv.education.map(e => `
      <div class="cv-item" style="margin-bottom:0.9rem;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;">
          <div style="font-family:${serifFont};">
            <span style="font-weight:700;font-size:0.9rem;">${esc(e.degree)}${e.field ? `, ${esc(e.field)}` : ''}</span>
            <span style="font-style:italic;font-size:0.88rem;"> — ${esc(e.school)}</span>
          </div>
          <span style="font-size:0.78rem;color:#777;font-family:${serifFont};">${dateRange(e.startDate, e.endDate, false, t, lang)}</span>
        </div>
        ${e.grade ? `<div style="font-size:0.82rem;color:#555;font-family:${serifFont};font-style:italic;margin-top:0.15rem;">${esc(e.grade)}</div>` : ''}
      </div>`).join('')}
    </div>` : '';

  const pubsBlock = (cv.publications && cv.publications.length) ? `
    <div data-section="publications">
    ${sectionTitle(t('publications') || 'Publications')}
    <ol style="margin:0;padding-left:1.25rem;font-family:${serifFont};">
      ${cv.publications.map(p => `
        <li style="margin-bottom:0.6rem;font-size:0.85rem;line-height:1.6;">
          ${p.authors ? `${esc(p.authors)}. ` : ''}<span style="font-style:italic;">${p.url ? `<a href="${safeUrl(p.url)}" style="color:${accent};text-decoration:none;">${esc(p.title)}</a>` : esc(p.title)}</span>.${p.venue ? ` ${esc(p.venue)}.` : ''}${p.date ? ` ${formatDate(p.date, lang)}.` : ''}
        </li>`).join('')}
    </ol>
    </div>` : '';

  const skillsBlock = cv.skills.length ? `
    <div data-section="skills">
    ${sectionTitle(t('step_skills') || 'Compétences')}
    ${cv.skills.map(g => `
      <div style="margin-bottom:0.4rem;font-family:${serifFont};font-size:0.85rem;">
        ${g.category ? `<strong>${esc(g.category)}: </strong>` : ''}${g.items.map(esc).join(', ')}
      </div>`).join('')}
    </div>` : '';

  const langsBlock = cv.extras.languages.length ? `
    <div data-section="languages">
    ${sectionTitle(t('languages') || 'Langues')}
    <div style="font-family:${serifFont};font-size:0.85rem;">${cv.extras.languages.map(l => `${esc(l.name)}${l.level ? ` (${esc(l.level)})` : ''}`).join('; ')}</div>` : '';

  const certBlock = cv.extras.certifications.length ? `
    <div data-section="certifications">
    ${sectionTitle(t('certifications') || 'Certifications')}
    ${cv.extras.certifications.map(c => `<div style="font-family:${serifFont};font-size:0.85rem;margin-bottom:0.3rem;">${esc(c.name)}${c.issuer ? `, ${esc(c.issuer)}` : ''}${c.date ? ` (${formatDate(c.date, lang)})` : ''}</div>`).join('')}
    </div>` : '';

  const interestsBlock = cv.extras.interests ? `
    <div data-section="interests">
    ${sectionTitle(t('interests') || "Centres d'intérêt")}
    <p style="font-family:${serifFont};font-size:0.85rem;color:#444;">${esc(cv.extras.interests)}</p>
    </div>` : '';

  const projectsBlock = (cv.projects && cv.projects.length) ? `
    <div data-section="projects">
    ${sectionTitle(t('projects') || 'Projets de Recherche')}
    ${cv.projects.map(p => `
      <div class="cv-item" style="margin-bottom:0.9rem;">
        <div style="font-family:${serifFont};font-weight:700;font-size:0.9rem;">${esc(p.name)}${p.url ? ` <a href="${safeUrl(p.url)}" style="color:${accent};font-size:0.78rem;text-decoration:none;">↗</a>` : ''}</div>
        ${p.tech ? `<div style="font-family:${serifFont};font-size:0.78rem;color:#888;">${esc(p.tech)}</div>` : ''}
        ${p.description ? `<p style="font-family:${serifFont};font-size:0.85rem;color:#444;margin:0.2rem 0 0;line-height:1.6;text-align:justify;">${esc(p.description)}</p>` : ''}
      </div>`).join('')}
    </div>` : '';

  const volunteerBlock = (cv.volunteer && cv.volunteer.length) ? `
    <div data-section="volunteer">
    ${sectionTitle(t('volunteer') || 'Service & Bénévolat')}
    ${cv.volunteer.map(v => `
      <div class="cv-item" style="margin-bottom:0.9rem;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;font-family:${serifFont};">
          <div>
            <span style="font-weight:700;font-size:0.9rem;">${esc(v.role)}</span>,
            <span style="font-style:italic;">${esc(v.org)}</span>
          </div>
          <span style="font-size:0.78rem;color:#777;">${dateRange(v.startDate, v.endDate, false, t, lang)}</span>
        </div>
        ${bulletsHtml(v.description)}
      </div>`).join('')}
    </div>` : '';

  const refsBlock = (cv.references && cv.references.length) ? `
    <div data-section="references">
    ${sectionTitle(t('references') || 'Références')}
    <div style="display:flex;flex-wrap:wrap;gap:1.5rem;">
      ${cv.references.map(r => `
        <div class="cv-item" style="font-family:${serifFont};min-width:200px;">
          <div style="font-weight:700;font-size:0.85rem;">${esc(r.name)}</div>
          <div style="font-size:0.82rem;color:#555;font-style:italic;">${esc(r.title)}${r.company ? `, ${esc(r.company)}` : ''}</div>
          <div style="font-size:0.78rem;color:#888;">${r.email ? esc(r.email) : ''}${r.phone ? ` · ${esc(r.phone)}` : ''}</div>
        </div>`).join('')}
    </div>` : (cv.showReferencesToggle ? `
    <div data-section="references">
    ${sectionTitle(t('references') || 'Références')}
    <p style="font-family:${serifFont};font-size:0.85rem;color:#888;font-style:italic;">${t('references_available') || 'Disponibles sur demande'}</p>
    </div>` : '');

  const customBlocks = (cv.customSections && cv.customSections.length) ? cv.customSections.map((sec, i) => `
    <div data-section="custom_${i}">
    ${sectionTitle(esc(sec.title) || t('custom_section'))}
    ${sec.entries.map(en => `
      <div class="cv-item" style="margin-bottom:0.7rem;font-family:${serifFont};">
        <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;">
          <div>
            <span style="font-weight:700;font-size:0.9rem;">${esc(en.title)}</span>
            ${en.subtitle ? `<span style="font-style:italic;font-size:0.85rem;color:#555;"> — ${esc(en.subtitle)}</span>` : ''}
          </div>
          ${en.date ? `<span style="font-size:0.78rem;color:#777;">${esc(en.date)}</span>` : ''}
        </div>
        ${en.description ? `<p style="font-size:0.85rem;color:#444;margin:0.15rem 0 0;line-height:1.6;text-align:justify;">${esc(en.description)}</p>` : ''}
      </div>`).join('')}
    </div>`).join('') : '';

  return `
<div style="padding:2.5rem 3rem;font-family:${serifFont};background:#fff;min-height:1123px;">
  ${header}
  ${summary}
  ${eduBlock}
  ${pubsBlock}
  ${expBlock}
  ${projectsBlock}
  ${volunteerBlock}
  ${skillsBlock}
  ${langsBlock}
  ${certBlock}
  ${interestsBlock}
  ${refsBlock}
  ${customBlocks}
</div>`;
}

// ── Template: INFOGRAPHIC (skill bars, timeline, visual) ──────

function tplInfographic(cv, accent, font, t) {
  let photoHtml = '';
  if (cv.profile.photoB64 && cv.showPhoto) {
    photoHtml = `<div style="text-align:center;margin-bottom:1.5rem;">
      <img src="${cv.profile.photoB64}" style="width:100px;height:100px;border-radius:50%;object-fit:cover;border:4px solid ${accent};" alt="Photo" />
    </div>`;
  }

  const header = `
    <div style="text-align:center;padding:2rem 2rem 1.5rem;border-bottom:3px solid ${accent};">
      ${photoHtml}
      <h1 style="font-size:1.8rem;font-weight:800;margin:0 0 0.25rem;color:#111;">${esc(cv.profile.name) || 'Votre Nom'}</h1>
      <h2 style="font-size:1rem;font-weight:400;margin:0 0 0.75rem;color:${accent};">${esc(cv.profile.title) || ''}</h2>
      <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;font-size:0.78rem;color:#555;">
        ${cv.profile.email ? `<span>✉ ${esc(cv.profile.email)}</span>` : ''}
        ${cv.profile.phone ? `<span>☎ ${esc(cv.profile.phone)}</span>` : ''}
        ${cv.profile.city ? `<span>📍 ${esc(cv.profile.city)}</span>` : ''}
        ${cv.profile.linkedin ? `<span>🔗 ${linkify(cv.profile.linkedin)}</span>` : ''}
        ${cv.profile.github ? `<span>🔗 ${linkify(cv.profile.github)}</span>` : ''}
        ${cv.profile.website ? `<span>🌐 ${linkify(cv.profile.website)}</span>` : ''}
      </div>
    </div>`;

  const sectionTitle = (label, icon) =>
    `<h3 style="font-size:0.75rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:${accent};margin:1.5rem 0 0.75rem;display:flex;align-items:center;gap:0.4rem;">${icon ? `<span style="font-size:1rem;">${icon}</span>` : ''} ${label}</h3>`;

  const summary = cv.profile.summary ? `
    <div style="padding:1rem 2rem;">
      <p style="font-size:0.85rem;color:#444;line-height:1.7;margin:0;text-align:center;">${esc(cv.profile.summary)}</p>
    </div>` : '';

  // Timeline-style experience
  const expBlock = cv.experiences.length ? `
    <div data-section="experience">
    ${sectionTitle(t('step_exp') || 'Expériences', '💼')}
    ${cv.experiences.map(e => `
      <div class="cv-item" style="display:flex;gap:1rem;margin-bottom:1rem;">
        <div style="display:flex;flex-direction:column;align-items:center;width:12px;flex-shrink:0;">
          <div style="width:12px;height:12px;border-radius:50%;background:${accent};flex-shrink:0;"></div>
          <div style="width:2px;flex:1;background:${accent}33;"></div>
        </div>
        <div style="flex:1;padding-bottom:0.5rem;">
          <div style="font-size:0.72rem;color:#fff;background:${accent};padding:0.1rem 0.5rem;border-radius:10px;display:inline-block;margin-bottom:0.3rem;">${dateRange(e.startDate, e.endDate, e.current, t, lang)}</div>
          <div style="font-weight:700;font-size:0.9rem;color:#222;">${esc(e.role)}</div>
          <div style="font-size:0.82rem;color:#666;">${esc(e.company)}</div>
          ${bulletsHtml(e.bullets)}
        </div>
      </div>`).join('')}
    </div>` : '';

  const eduBlock = cv.education.length ? `
    <div data-section="education">
    ${sectionTitle(t('step_edu') || 'Formation', '🎓')}
    ${cv.education.map(e => `
      <div class="cv-item" style="display:flex;gap:1rem;margin-bottom:0.9rem;">
        <div style="display:flex;flex-direction:column;align-items:center;width:12px;flex-shrink:0;">
          <div style="width:12px;height:12px;border-radius:50%;background:${accent};flex-shrink:0;"></div>
          <div style="width:2px;flex:1;background:${accent}33;"></div>
        </div>
        <div style="flex:1;">
          <div style="font-size:0.72rem;color:#fff;background:${accent};padding:0.1rem 0.5rem;border-radius:10px;display:inline-block;margin-bottom:0.3rem;">${dateRange(e.startDate, e.endDate, false, t, lang)}</div>
          <div style="font-weight:700;font-size:0.9rem;">${esc(e.degree)}${e.field ? ` — ${esc(e.field)}` : ''}</div>
          <div style="font-size:0.82rem;color:#666;">${esc(e.school)}</div>
          ${e.grade ? `<div style="font-size:0.78rem;color:#888;">${esc(e.grade)}</div>` : ''}
        </div>
      </div>`).join('')}
    </div>` : '';

  // Skill bars with percentage
  const skillsBlock = cv.skills.length ? `
    <div data-section="skills">
    ${sectionTitle(t('step_skills') || 'Compétences', '⚡')}
    ${cv.skills.map(g => `
      <div style="margin-bottom:0.75rem;">
        ${g.category ? `<div style="font-size:0.72rem;font-weight:700;color:#555;margin-bottom:0.4rem;text-transform:uppercase;letter-spacing:.05em;">${esc(g.category)}</div>` : ''}
        ${g.items.map((s, i) => {
          const pct = Math.max(60, 100 - i * 8);
          return `<div style="margin-bottom:0.35rem;">
            <div style="display:flex;justify-content:space-between;font-size:0.78rem;color:#444;margin-bottom:0.15rem;">
              <span>${esc(s)}</span>
              <span style="color:#999;">${pct}%</span>
            </div>
            <div style="height:6px;background:#e5e7eb;border-radius:3px;overflow:hidden;">
              <div style="height:100%;width:${pct}%;background:linear-gradient(90deg,${accent},${accent}aa);border-radius:3px;"></div>
            </div>
          </div>`;
        }).join('')}
      </div>`).join('')}
    </div>` : '';

  const langsBlock = cv.extras.languages.length ? `
    <div data-section="languages">
    ${sectionTitle(t('languages') || 'Langues', '🌍')}
    ${cv.extras.languages.map((l, i) => {
      const levels = {'Natif':100,'Native':100,'Bilingue':95,'Bilingual':95,'Courant':85,'Fluent':85,'Avancé':75,'Advanced':75,'Intermédiaire':60,'Intermediate':60,'Débutant':35,'Beginner':35};
      const pct = levels[l.level] || (90 - i * 15);
      return `<div style="margin-bottom:0.4rem;">
        <div style="display:flex;justify-content:space-between;font-size:0.82rem;color:#444;margin-bottom:0.15rem;">
          <strong>${esc(l.name)}</strong>
          <span style="color:#999;">${l.level ? esc(l.level) : ''}</span>
        </div>
        <div style="height:6px;background:#e5e7eb;border-radius:3px;overflow:hidden;">
          <div style="height:100%;width:${pct}%;background:${accent};border-radius:3px;"></div>
        </div>
      </div>`;
    }).join('')}
    </div>` : '';

  const certBlock = cv.extras.certifications.length ? `
    <div data-section="certifications">
    ${sectionTitle(t('certifications') || 'Certifications', '📜')}
    ${cv.extras.certifications.map(c => `
      <div class="cv-item" style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.4rem;">
        <div style="width:8px;height:8px;background:${accent};border-radius:50%;flex-shrink:0;"></div>
        <span style="font-size:0.82rem;">${esc(c.name)}${c.issuer ? ` <span style="color:#777;">· ${esc(c.issuer)}</span>` : ''}${c.date ? ` <span style="color:#999;">(${formatDate(c.date, lang)})</span>` : ''}</span>
      </div>`).join('')}
    </div>` : '';

  const interestsBlock = cv.extras.interests ? `
    <div data-section="interests">
    ${sectionTitle(t('interests') || "Centres d'intérêt", '❤')}
    <p style="font-size:0.82rem;color:#555;">${esc(cv.extras.interests)}</p>
    </div>` : '';

  const projectsBlock = (cv.projects && cv.projects.length) ? `
    <div data-section="projects">
    ${sectionTitle(t('projects') || 'Projets', '🚀')}
    ${cv.projects.map(p => `
      <div class="cv-item" style="margin-bottom:0.9rem;padding:0.6rem;background:${accent}08;border-radius:8px;border-left:3px solid ${accent};">
        <div style="font-weight:700;font-size:0.9rem;">${esc(p.name)}${p.url ? ` <a href="${safeUrl(p.url)}" style="color:${accent};font-size:0.78rem;text-decoration:none;">↗</a>` : ''}</div>
        ${p.tech ? `<div style="font-size:0.72rem;color:#888;margin-top:0.15rem;">${esc(p.tech)}</div>` : ''}
        ${p.description ? `<p style="font-size:0.82rem;color:#444;margin:0.2rem 0 0;line-height:1.5;">${esc(p.description)}</p>` : ''}
      </div>`).join('')}
    </div>` : '';

  const volunteerBlock = (cv.volunteer && cv.volunteer.length) ? `
    <div data-section="volunteer">
    ${sectionTitle(t('volunteer') || 'Bénévolat', '🤝')}
    ${cv.volunteer.map(v => `
      <div class="cv-item" style="display:flex;gap:1rem;margin-bottom:0.9rem;">
        <div style="display:flex;flex-direction:column;align-items:center;width:12px;flex-shrink:0;">
          <div style="width:12px;height:12px;border-radius:50%;background:${accent};flex-shrink:0;"></div>
          <div style="width:2px;flex:1;background:${accent}33;"></div>
        </div>
        <div style="flex:1;">
          <div style="font-weight:700;font-size:0.9rem;">${esc(v.role)}</div>
          <div style="font-size:0.82rem;color:#666;">${esc(v.org)}</div>
          <div style="font-size:0.72rem;color:#999;">${dateRange(v.startDate, v.endDate, false, t, lang)}</div>
          ${bulletsHtml(v.description)}
        </div>
      </div>`).join('')}
    </div>` : '';

  const pubsBlock = (cv.publications && cv.publications.length) ? `
    <div data-section="publications">
    ${sectionTitle(t('publications') || 'Publications', '📄')}
    ${cv.publications.map(p => `
      <div class="cv-item" style="margin-bottom:0.7rem;display:flex;align-items:flex-start;gap:0.5rem;">
        <div style="width:8px;height:8px;background:${accent};border-radius:50%;flex-shrink:0;margin-top:0.35rem;"></div>
        <div>
          <div style="font-weight:600;font-size:0.85rem;">${p.url ? `<a href="${safeUrl(p.url)}" style="color:${accent};text-decoration:none;">${esc(p.title)}</a>` : esc(p.title)}</div>
          ${p.authors ? `<div style="font-size:0.78rem;color:#555;">${esc(p.authors)}</div>` : ''}
          <div style="font-size:0.75rem;color:#888;">${p.venue ? esc(p.venue) : ''}${p.date ? ` · ${formatDate(p.date, lang)}` : ''}</div>
        </div>
      </div>`).join('')}
    </div>` : '';

  const refsBlock = (cv.references && cv.references.length) ? `
    <div data-section="references">
    ${sectionTitle(t('references') || 'Références', '👥')}
    ${cv.references.map(r => `
      <div class="cv-item" style="margin-bottom:0.7rem;">
        <div style="font-weight:600;font-size:0.85rem;">${esc(r.name)}</div>
        <div style="font-size:0.78rem;color:#555;">${esc(r.title)}${r.company ? ` — ${esc(r.company)}` : ''}</div>
        <div style="font-size:0.75rem;color:#888;">${r.email ? esc(r.email) : ''}${r.phone ? ` · ${esc(r.phone)}` : ''}</div>
      </div>`).join('')}
    </div>` : (cv.showReferencesToggle ? `
    <div data-section="references">
    ${sectionTitle(t('references') || 'Références', '👥')}
    <p style="font-size:0.82rem;color:#888;font-style:italic;">${t('references_available') || 'Disponibles sur demande'}</p>
    </div>` : '');

  const customBlocks = (cv.customSections && cv.customSections.length) ? cv.customSections.map((sec, i) => `
    <div data-section="custom_${i}">
    ${sectionTitle(esc(sec.title) || t('custom_section'), '📌')}
    ${sec.entries.map(en => `
      <div class="cv-item" style="margin-bottom:0.7rem;display:flex;align-items:flex-start;gap:0.5rem;">
        <div style="width:8px;height:8px;background:${accent};border-radius:50%;flex-shrink:0;margin-top:0.35rem;"></div>
        <div>
          <div style="font-weight:700;font-size:0.9rem;">${esc(en.title)}${en.subtitle ? ` <span style="color:#777;font-size:0.82rem;font-weight:400;">· ${esc(en.subtitle)}</span>` : ''}</div>
          ${en.date ? `<div style="font-size:0.72rem;color:#999;">${esc(en.date)}</div>` : ''}
          ${en.description ? `<p style="font-size:0.82rem;color:#444;margin:0.15rem 0 0;line-height:1.5;">${esc(en.description)}</p>` : ''}
        </div>
      </div>`).join('')}
    </div>`).join('') : '';

  return `
<div style="font-family:${font},sans-serif;background:#fff;min-height:1123px;">
  ${header}
  ${summary}
  <div style="padding:0 2rem 2rem;">
    ${expBlock}
    ${eduBlock}
    ${skillsBlock}
    ${projectsBlock}
    ${volunteerBlock}
    ${langsBlock}
    ${certBlock}
    ${interestsBlock}
    ${pubsBlock}
    ${refsBlock}
    ${customBlocks}
  </div>
</div>`;
}

// ── Template: ELEGANT (Playfair Display, thin lines, refined) ─

function tplElegant(cv, accent, font, t) {
  const elegantFont = `'Playfair Display',${font},Georgia,serif`;

  let photoHtml = '';
  if (cv.profile.photoB64 && cv.showPhoto) {
    photoHtml = `<img src="${cv.profile.photoB64}" style="width:85px;height:85px;border-radius:50%;object-fit:cover;border:2px solid ${accent}55;" alt="Photo" />`;
  }

  const header = `
    <div style="padding:2.5rem 2.5rem 1.75rem;text-align:center;position:relative;">
      <div style="position:absolute;top:0;left:50%;transform:translateX(-50%);width:60px;height:3px;background:${accent};"></div>
      ${cv.profile.photoB64 && cv.showPhoto ? `<div style="margin-bottom:1rem;">${photoHtml}</div>` : ''}
      <h1 style="font-family:${elegantFont};font-size:2rem;font-weight:700;margin:0.5rem 0 0.3rem;color:#1a1a1a;letter-spacing:0.04em;">${esc(cv.profile.name) || 'Votre Nom'}</h1>
      <div style="width:40px;height:1px;background:${accent};margin:0.5rem auto;"></div>
      ${cv.profile.title ? `<div style="color:${accent};font-weight:400;margin-bottom:0.75rem;letter-spacing:0.1em;text-transform:uppercase;font-size:0.78rem;">${esc(cv.profile.title)}</div>` : ''}
      <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:0.6rem;font-size:0.76rem;color:#888;">
        ${cv.profile.email ? `<span>${esc(cv.profile.email)}</span>` : ''}
        ${cv.profile.phone ? `<span>· ${esc(cv.profile.phone)}</span>` : ''}
        ${cv.profile.city ? `<span>· ${esc(cv.profile.city)}</span>` : ''}
        ${cv.profile.linkedin ? `<span>· ${linkify(cv.profile.linkedin)}</span>` : ''}
        ${cv.profile.github ? `<span>· ${linkify(cv.profile.github)}</span>` : ''}
        ${cv.profile.website ? `<span>· ${linkify(cv.profile.website)}</span>` : ''}
      </div>
    </div>`;

  const sectionTitle = (label) =>
    `<div style="display:flex;align-items:center;gap:0.75rem;margin:1.75rem 0 0.85rem;">
      <div style="flex:1;height:0.5px;background:#ccc;"></div>
      <h3 style="font-family:${elegantFont};font-size:0.82rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#555;margin:0;white-space:nowrap;">${label}</h3>
      <div style="flex:1;height:0.5px;background:#ccc;"></div>
    </div>`;

  const summary = cv.profile.summary ? `
    <div style="padding:0 2.5rem;">
      <p style="font-size:0.88rem;color:#555;line-height:1.8;margin:0;text-align:center;font-style:italic;">${esc(cv.profile.summary)}</p>
    </div>` : '';

  const expBlock = cv.experiences.length ? `
    <div data-section="experience">
    ${sectionTitle(t('step_exp') || 'Expériences')}
    ${cv.experiences.map(e => `
      <div class="cv-item" style="margin-bottom:1.15rem;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:0.5rem;">
          <div>
            <span style="font-family:${elegantFont};font-weight:700;font-size:0.92rem;color:#1a1a1a;">${esc(e.role)}</span>
            <span style="color:#999;font-size:0.82rem;font-weight:300;"> — ${esc(e.company)}</span>
          </div>
          <span style="font-size:0.75rem;color:#aaa;font-style:italic;">${dateRange(e.startDate, e.endDate, e.current, t, lang)}</span>
        </div>
        ${bulletsHtml(e.bullets)}
      </div>`).join('')}
    </div>` : '';

  const eduBlock = cv.education.length ? `
    <div data-section="education">
    ${sectionTitle(t('step_edu') || 'Formation')}
    ${cv.education.map(e => `
      <div class="cv-item" style="margin-bottom:1rem;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:0.5rem;">
          <div>
            <span style="font-family:${elegantFont};font-weight:700;font-size:0.9rem;color:#1a1a1a;">${esc(e.degree)}${e.field ? ` — ${esc(e.field)}` : ''}</span>
            <span style="color:#999;font-size:0.82rem;font-weight:300;"> — ${esc(e.school)}</span>
          </div>
          <span style="font-size:0.75rem;color:#aaa;font-style:italic;">${dateRange(e.startDate, e.endDate, false, t, lang)}</span>
        </div>
        ${e.grade ? `<div style="font-size:0.8rem;color:#777;font-style:italic;margin-top:0.15rem;">${esc(e.grade)}</div>` : ''}
      </div>`).join('')}
    </div>` : '';

  const skillsBlock = cv.skills.length ? `
    <div data-section="skills">
    ${sectionTitle(t('step_skills') || 'Compétences')}
    ${cv.skills.map(g => `
      <div style="margin-bottom:0.55rem;">
        ${g.category ? `<span style="font-family:${elegantFont};font-weight:600;font-size:0.82rem;color:#444;">${esc(g.category)}: </span>` : ''}
        <span style="font-size:0.82rem;color:#666;font-weight:300;">${g.items.map(esc).join(' · ')}</span>
      </div>`).join('')}
    </div>` : '';

  const langsBlock = cv.extras.languages.length ? `
    <div data-section="languages">
    ${sectionTitle(t('languages') || 'Langues')}
    <div style="display:flex;flex-wrap:wrap;gap:1rem;justify-content:center;">
      ${cv.extras.languages.map(l => `<span style="font-size:0.82rem;color:#555;"><span style="font-family:${elegantFont};font-weight:600;">${esc(l.name)}</span>${l.level ? ` — ${esc(l.level)}` : ''}</span>`).join('')}
    </div>` : '';

  const certBlock = cv.extras.certifications.length ? `
    <div data-section="certifications">
    ${sectionTitle(t('certifications') || 'Certifications')}
    ${cv.extras.certifications.map(c => `
      <div class="cv-item" style="font-size:0.82rem;margin-bottom:0.35rem;text-align:center;">
        <span style="font-family:${elegantFont};font-weight:600;">${esc(c.name)}</span>${c.issuer ? ` <span style="color:#999;">· ${esc(c.issuer)}</span>` : ''}${c.date ? ` <span style="color:#aaa;font-style:italic;">(${formatDate(c.date, lang)})</span>` : ''}
      </div>`).join('')}
    </div>` : '';

  const interestsBlock = cv.extras.interests ? `
    <div data-section="interests">
    ${sectionTitle(t('interests') || "Centres d'intérêt")}
    <p style="font-size:0.82rem;color:#666;text-align:center;font-weight:300;">${esc(cv.extras.interests)}</p>
    </div>` : '';

  const projectsBlock = (cv.projects && cv.projects.length) ? `
    <div data-section="projects">
    ${sectionTitle(t('projects') || 'Projets')}
    ${cv.projects.map(p => `
      <div class="cv-item" style="margin-bottom:1rem;">
        <div style="font-family:${elegantFont};font-weight:700;font-size:0.9rem;color:#1a1a1a;">${esc(p.name)}${p.url ? ` <a href="${safeUrl(p.url)}" style="color:${accent};font-size:0.78rem;text-decoration:none;font-weight:300;">↗ ${linkify(p.url)}</a>` : ''}</div>
        ${p.tech ? `<div style="font-size:0.75rem;color:#aaa;font-style:italic;margin-top:0.1rem;">${esc(p.tech)}</div>` : ''}
        ${p.description ? `<p style="font-size:0.82rem;color:#555;font-weight:300;margin:0.2rem 0 0;line-height:1.6;">${esc(p.description)}</p>` : ''}
      </div>`).join('')}
    </div>` : '';

  const volunteerBlock = (cv.volunteer && cv.volunteer.length) ? `
    <div data-section="volunteer">
    ${sectionTitle(t('volunteer') || 'Bénévolat')}
    ${cv.volunteer.map(v => `
      <div class="cv-item" style="margin-bottom:1rem;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:0.5rem;">
          <div>
            <span style="font-family:${elegantFont};font-weight:700;font-size:0.9rem;color:#1a1a1a;">${esc(v.role)}</span>
            <span style="color:#999;font-size:0.82rem;font-weight:300;"> — ${esc(v.org)}</span>
          </div>
          <span style="font-size:0.75rem;color:#aaa;font-style:italic;">${dateRange(v.startDate, v.endDate, false, t, lang)}</span>
        </div>
        ${bulletsHtml(v.description)}
      </div>`).join('')}
    </div>` : '';

  const pubsBlock = (cv.publications && cv.publications.length) ? `
    <div data-section="publications">
    ${sectionTitle(t('publications') || 'Publications')}
    ${cv.publications.map(p => `
      <div class="cv-item" style="margin-bottom:0.75rem;">
        <div style="font-family:${elegantFont};font-weight:600;font-size:0.85rem;">${p.url ? `<a href="${safeUrl(p.url)}" style="color:${accent};text-decoration:none;">${esc(p.title)}</a>` : esc(p.title)}</div>
        ${p.authors ? `<div style="font-size:0.78rem;color:#777;font-style:italic;">${esc(p.authors)}</div>` : ''}
        <div style="font-size:0.75rem;color:#aaa;">${p.venue ? esc(p.venue) : ''}${p.date ? ` · ${formatDate(p.date, lang)}` : ''}</div>
      </div>`).join('')}
    </div>` : '';

  const refsBlock = (cv.references && cv.references.length) ? `
    <div data-section="references">
    ${sectionTitle(t('references') || 'Références')}
    <div style="display:flex;flex-wrap:wrap;gap:2rem;justify-content:center;">
      ${cv.references.map(r => `
        <div class="cv-item" style="text-align:center;">
          <div style="font-family:${elegantFont};font-weight:600;font-size:0.85rem;">${esc(r.name)}</div>
          <div style="font-size:0.78rem;color:#777;font-style:italic;">${esc(r.title)}${r.company ? ` — ${esc(r.company)}` : ''}</div>
          <div style="font-size:0.75rem;color:#aaa;">${r.email ? esc(r.email) : ''}${r.phone ? ` · ${esc(r.phone)}` : ''}</div>
        </div>`).join('')}
    </div>` : (cv.showReferencesToggle ? `
    <div data-section="references">
    ${sectionTitle(t('references') || 'Références')}
    <p style="font-size:0.82rem;color:#aaa;font-style:italic;text-align:center;">${t('references_available') || 'Disponibles sur demande'}</p>
    </div>` : '');

  const customBlocks = (cv.customSections && cv.customSections.length) ? cv.customSections.map((sec, i) => `
    <div data-section="custom_${i}">
    ${sectionTitle(esc(sec.title) || t('custom_section'))}
    ${sec.entries.map(en => `
      <div class="cv-item" style="margin-bottom:0.85rem;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:0.5rem;">
          <div>
            <span style="font-family:${elegantFont};font-weight:700;font-size:0.9rem;">${esc(en.title)}</span>
            ${en.subtitle ? `<span style="color:#999;font-size:0.82rem;font-weight:300;"> — ${esc(en.subtitle)}</span>` : ''}
          </div>
          ${en.date ? `<span style="font-size:0.75rem;color:#aaa;font-style:italic;">${esc(en.date)}</span>` : ''}
        </div>
        ${en.description ? `<p style="font-size:0.82rem;color:#555;font-weight:300;margin:0.15rem 0 0;line-height:1.65;">${esc(en.description)}</p>` : ''}
      </div>`).join('')}
    </div>`).join('') : '';

  return `
<div style="padding:2rem 2.5rem;font-family:${font},sans-serif;background:#fff;min-height:1123px;">
  ${header}
  ${summary}
  <div style="padding:0 0.5rem;">
    ${expBlock}
    ${eduBlock}
    ${projectsBlock}
    ${volunteerBlock}
    ${skillsBlock}
    ${langsBlock}
    ${certBlock}
    ${interestsBlock}
    ${pubsBlock}
    ${refsBlock}
    ${customBlocks}
  </div>
</div>`;
}

// ── Template: TWO-PAGE (generous spacing, multi-page) ─────────

function tplTwoPage(cv, accent, font, t) {
  let photoHtml = '';
  if (cv.profile.photoB64 && cv.showPhoto) {
    photoHtml = `<img src="${cv.profile.photoB64}" style="width:80px;height:80px;border-radius:50%;object-fit:cover;border:3px solid ${accent};" alt="Photo" />`;
  }

  const header = `
    <div style="display:flex;align-items:center;gap:1.75rem;padding-bottom:1.5rem;margin-bottom:1.5rem;border-bottom:3px solid ${accent};">
      ${photoHtml}
      <div style="flex:1;">
        <h1 style="font-size:1.9rem;font-weight:700;margin:0 0 0.3rem;color:#111;">${esc(cv.profile.name) || 'Votre Nom'}</h1>
        <h2 style="font-size:1.05rem;font-weight:400;margin:0 0 0.6rem;color:${accent};">${esc(cv.profile.title) || ''}</h2>
        <div style="display:flex;flex-wrap:wrap;gap:0.75rem;font-size:0.78rem;color:#555;">
          ${cv.profile.email ? `<span>✉ ${esc(cv.profile.email)}</span>` : ''}
          ${cv.profile.phone ? `<span>☎ ${esc(cv.profile.phone)}</span>` : ''}
          ${cv.profile.city ? `<span>📍 ${esc(cv.profile.city)}</span>` : ''}
          ${cv.profile.linkedin ? `<span>🔗 ${linkify(cv.profile.linkedin)}</span>` : ''}
          ${cv.profile.github ? `<span>🔗 ${linkify(cv.profile.github)}</span>` : ''}
          ${cv.profile.website ? `<span>🌐 ${linkify(cv.profile.website)}</span>` : ''}
        </div>
      </div>
    </div>`;

  const sectionTitle = (label) =>
    `<h3 style="font-size:0.8rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#fff;background:${accent};padding:0.4rem 0.75rem;margin:2rem 0 1rem;border-radius:3px;">${label}</h3>`;

  const summary = cv.profile.summary ? `
    <p style="font-size:0.9rem;color:#444;line-height:1.8;margin:0 0 0.5rem;">${esc(cv.profile.summary)}</p>` : '';

  const expBlock = cv.experiences.length ? `
    <div data-section="experience">
    ${sectionTitle(t('step_exp') || 'Expériences Professionnelles')}
    ${cv.experiences.map(e => `
      <div class="cv-item" style="margin-bottom:1.5rem;padding-bottom:1.25rem;border-bottom:1px solid #eee;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:0.5rem;margin-bottom:0.4rem;">
          <div>
            <div style="font-weight:700;font-size:0.95rem;color:#111;">${esc(e.role)}</div>
            <div style="font-size:0.85rem;color:${accent};font-weight:500;">${esc(e.company)}</div>
          </div>
          <div style="font-size:0.78rem;color:#888;background:#f5f5f5;padding:0.2rem 0.6rem;border-radius:3px;">${dateRange(e.startDate, e.endDate, e.current, t, lang)}</div>
        </div>
        ${bulletsHtml(e.bullets)}
      </div>`).join('')}
    </div>` : '';

  const eduBlock = cv.education.length ? `
    <div data-section="education">
    ${sectionTitle(t('step_edu') || 'Formation')}
    ${cv.education.map(e => `
      <div class="cv-item" style="margin-bottom:1.25rem;padding-bottom:1rem;border-bottom:1px solid #eee;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:0.5rem;">
          <div>
            <div style="font-weight:700;font-size:0.95rem;color:#111;">${esc(e.degree)}${e.field ? ` — ${esc(e.field)}` : ''}</div>
            <div style="font-size:0.85rem;color:${accent};font-weight:500;">${esc(e.school)}</div>
          </div>
          <div style="font-size:0.78rem;color:#888;background:#f5f5f5;padding:0.2rem 0.6rem;border-radius:3px;">${dateRange(e.startDate, e.endDate, false, t, lang)}</div>
        </div>
        ${e.grade ? `<div style="font-size:0.82rem;color:#666;margin-top:0.25rem;">${esc(e.grade)}</div>` : ''}
      </div>`).join('')}
    </div>` : '';

  const skillsBlock = cv.skills.length ? `
    <div data-section="skills">
    ${sectionTitle(t('step_skills') || 'Compétences')}
    ${cv.skills.map(g => `
      <div style="margin-bottom:0.75rem;">
        ${g.category ? `<div style="font-weight:700;font-size:0.85rem;color:#333;margin-bottom:0.35rem;">${esc(g.category)}</div>` : ''}
        <div style="display:flex;flex-wrap:wrap;gap:0.35rem;">
          ${g.items.map(s => `<span style="background:${accent}12;color:${accent};padding:0.2rem 0.65rem;border-radius:3px;font-size:0.82rem;font-weight:500;">${esc(s)}</span>`).join('')}
        </div>
      </div>`).join('')}
    </div>` : '';

  const langsBlock = cv.extras.languages.length ? `
    <div data-section="languages">
    ${sectionTitle(t('languages') || 'Langues')}
    <div style="display:flex;flex-wrap:wrap;gap:1rem;">
      ${cv.extras.languages.map(l => `<div style="font-size:0.88rem;"><strong>${esc(l.name)}</strong>${l.level ? ` — ${esc(l.level)}` : ''}</div>`).join('')}
    </div>` : '';

  const certBlock = cv.extras.certifications.length ? `
    <div data-section="certifications">
    ${sectionTitle(t('certifications') || 'Certifications')}
    ${cv.extras.certifications.map(c => `
      <div class="cv-item" style="margin-bottom:0.6rem;padding-bottom:0.5rem;border-bottom:1px solid #f0f0f0;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;">
          <span style="font-size:0.88rem;font-weight:500;">${esc(c.name)}${c.issuer ? ` <span style="color:#777;font-weight:400;">· ${esc(c.issuer)}</span>` : ''}</span>
          ${c.date ? `<span style="font-size:0.78rem;color:#999;">${formatDate(c.date, lang)}</span>` : ''}
        </div>
      </div>`).join('')}
    </div>` : '';

  const interestsBlock = cv.extras.interests ? `
    <div data-section="interests">
    ${sectionTitle(t('interests') || "Centres d'intérêt")}
    <p style="font-size:0.88rem;color:#555;line-height:1.7;">${esc(cv.extras.interests)}</p>
    </div>` : '';

  const projectsBlock = (cv.projects && cv.projects.length) ? `
    <div data-section="projects">
    ${sectionTitle(t('projects') || 'Projets')}
    ${cv.projects.map(p => `
      <div class="cv-item" style="margin-bottom:1.25rem;padding-bottom:1rem;border-bottom:1px solid #eee;">
        <div style="font-weight:700;font-size:0.95rem;color:#111;">${esc(p.name)}${p.url ? ` <a href="${safeUrl(p.url)}" style="color:${accent};font-size:0.82rem;text-decoration:none;">↗ ${linkify(p.url)}</a>` : ''}</div>
        ${p.tech ? `<div style="font-size:0.78rem;color:#888;margin-top:0.2rem;">${esc(p.tech)}</div>` : ''}
        ${p.description ? `<p style="font-size:0.88rem;color:#444;margin:0.3rem 0 0;line-height:1.6;">${esc(p.description)}</p>` : ''}
      </div>`).join('')}
    </div>` : '';

  const volunteerBlock = (cv.volunteer && cv.volunteer.length) ? `
    <div data-section="volunteer">
    ${sectionTitle(t('volunteer') || 'Bénévolat')}
    ${cv.volunteer.map(v => `
      <div class="cv-item" style="margin-bottom:1.25rem;padding-bottom:1rem;border-bottom:1px solid #eee;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:0.5rem;">
          <div>
            <div style="font-weight:700;font-size:0.95rem;color:#111;">${esc(v.role)}</div>
            <div style="font-size:0.85rem;color:${accent};font-weight:500;">${esc(v.org)}</div>
          </div>
          <div style="font-size:0.78rem;color:#888;background:#f5f5f5;padding:0.2rem 0.6rem;border-radius:3px;">${dateRange(v.startDate, v.endDate, false, t, lang)}</div>
        </div>
        ${bulletsHtml(v.description)}
      </div>`).join('')}
    </div>` : '';

  const pubsBlock = (cv.publications && cv.publications.length) ? `
    <div data-section="publications">
    ${sectionTitle(t('publications') || 'Publications')}
    ${cv.publications.map(p => `
      <div class="cv-item" style="margin-bottom:0.9rem;padding-bottom:0.75rem;border-bottom:1px solid #f0f0f0;">
        <div style="font-weight:600;font-size:0.88rem;">${p.url ? `<a href="${safeUrl(p.url)}" style="color:${accent};text-decoration:none;">${esc(p.title)}</a>` : esc(p.title)}</div>
        ${p.authors ? `<div style="font-size:0.82rem;color:#555;margin-top:0.15rem;">${esc(p.authors)}</div>` : ''}
        <div style="font-size:0.78rem;color:#888;margin-top:0.1rem;">${p.venue ? esc(p.venue) : ''}${p.date ? ` · ${formatDate(p.date, lang)}` : ''}</div>
      </div>`).join('')}
    </div>` : '';

  const refsBlock = (cv.references && cv.references.length) ? `
    <div data-section="references">
    ${sectionTitle(t('references') || 'Références')}
    <div style="display:flex;flex-wrap:wrap;gap:2rem;">
      ${cv.references.map(r => `
        <div class="cv-item" style="min-width:220px;">
          <div style="font-weight:600;font-size:0.88rem;">${esc(r.name)}</div>
          <div style="font-size:0.82rem;color:#555;">${esc(r.title)}${r.company ? ` — ${esc(r.company)}` : ''}</div>
          <div style="font-size:0.78rem;color:#888;">${r.email ? esc(r.email) : ''}${r.phone ? ` · ${esc(r.phone)}` : ''}</div>
        </div>`).join('')}
    </div>` : (cv.showReferencesToggle ? `
    <div data-section="references">
    ${sectionTitle(t('references') || 'Références')}
    <p style="font-size:0.88rem;color:#888;font-style:italic;">${t('references_available') || 'Disponibles sur demande'}</p>
    </div>` : '');

  const customBlocks = (cv.customSections && cv.customSections.length) ? cv.customSections.map((sec, i) => `
    <div data-section="custom_${i}">
    ${sectionTitle(esc(sec.title) || t('custom_section'))}
    ${sec.entries.map(en => `
      <div class="cv-item" style="margin-bottom:1rem;padding-bottom:0.75rem;border-bottom:1px solid #f0f0f0;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:0.5rem;">
          <div>
            <span style="font-weight:700;font-size:0.95rem;">${esc(en.title)}</span>
            ${en.subtitle ? `<span style="color:#777;font-size:0.85rem;"> · ${esc(en.subtitle)}</span>` : ''}
          </div>
          ${en.date ? `<span style="font-size:0.78rem;color:#999;">${esc(en.date)}</span>` : ''}
        </div>
        ${en.description ? `<p style="font-size:0.88rem;color:#444;margin:0.25rem 0 0;line-height:1.65;">${esc(en.description)}</p>` : ''}
      </div>`).join('')}
    </div>`).join('') : '';

  return `
<div style="padding:2.5rem 2.5rem;font-family:${font},sans-serif;background:#fff;min-height:1123px;">
  ${header}
  ${summary}
  ${expBlock}
  ${eduBlock}
  ${projectsBlock}
  ${volunteerBlock}
  ${skillsBlock}
  ${langsBlock}
  ${certBlock}
  ${interestsBlock}
  ${pubsBlock}
  ${refsBlock}
  ${customBlocks}
</div>`;
}

// ── Main render function ──────────────────────────────────────

function renderTemplate(cv, template, accent, font, t) {
  switch (template) {
    case 'modern':      return tplModern(cv, accent, font, t);
    case 'classic':     return tplClassic(cv, accent, font, t);
    case 'bold':        return tplBold(cv, accent, font, t);
    case 'compact':     return tplCompact(cv, accent, font, t);
    case 'executive':   return tplExecutive(cv, accent, font, t);
    case 'creative':    return tplCreative(cv, accent, font, t);
    case 'technical':   return tplTechnical(cv, accent, font, t);
    case 'minimal':     return tplMinimal(cv, accent, font, t);
    case 'academic':    return tplAcademic(cv, accent, font, t);
    case 'infographic': return tplInfographic(cv, accent, font, t);
    case 'elegant':     return tplElegant(cv, accent, font, t);
    case 'twopage':     return tplTwoPage(cv, accent, font, t);
    default:            return tplModern(cv, accent, font, t);
  }
}
