/* ═══════════════════════════════════════════════════════════════
   iloveresume — ats.js
   ATS Score Checker — client-side keyword & quality analysis
═══════════════════════════════════════════════════════════════ */

'use strict';

// ── Stop words (EN + FR + DE + ES) ───────────────────────────
const ATS_STOP_WORDS = new Set([
  // English
  'a','an','the','and','or','but','in','on','at','to','for','of','with','by',
  'from','is','are','was','were','be','been','being','have','has','had','do',
  'does','did','will','would','shall','should','may','might','can','could',
  'this','that','these','those','it','its','i','me','my','we','our','you',
  'your','he','she','they','them','their','who','which','what','where','when',
  'how','not','no','nor','so','if','then','than','too','very','just','about',
  'above','after','again','all','also','am','any','as','because','before',
  'between','both','during','each','few','further','get','got','here','into',
  'more','most','must','once','only','other','out','over','own','same','some',
  'such','through','under','until','up','us','while','per','via',
  // French
  'le','la','les','un','une','des','du','de','et','ou','mais','en','au','aux',
  'ce','cette','ces','il','elle','ils','elles','je','tu','nous','vous','on',
  'son','sa','ses','mon','ma','mes','ton','ta','tes','leur','leurs','qui',
  'que','quoi','dont','avec','pour','par','sur','dans','est','sont','a','ont',
  'été','être','avoir','faire','plus','ne','pas','se','si','tout','tous',
  'très','aussi','bien','comme',
  // German
  'der','die','das','ein','eine','einer','eines','einem','einen','und','oder',
  'aber','in','im','an','am','auf','aus','bei','bis','durch','für','gegen',
  'mit','nach','ohne','um','von','vor','zu','zum','zur','ist','sind','war',
  'waren','hat','haben','wird','werden','kann','können','muss','müssen',
  'ich','du','er','sie','es','wir','ihr','sich','mein','dein','sein','ihr',
  'nicht','auch','noch','schon','nur','sehr','wie','was','wer','wenn','dann',
  'als','so','noch','über','unter','zwischen','hier','dort','dieser','diese',
  // Spanish
  'el','la','los','las','un','una','unos','unas','y','o','pero','en','de',
  'del','al','con','sin','por','para','sobre','entre','desde','hasta','como',
  'más','muy','que','qué','quien','cual','donde','cuando','es','son','fue',
  'era','está','están','hay','ser','estar','tener','hacer','yo','tú','él',
  'ella','nosotros','ellos','ellas','su','sus','mi','mis','tu','tus','no',
  'si','ya','bien','también','otro','otra','otros','otras','todo','toda','todos'
]);

// ── Keyword extraction ───────────────────────────────────────
function _extractKeywords(text) {
  if (!text) return [];
  const words = text.toLowerCase()
    .replace(/[^a-zà-ÿ0-9\s\-\+\#\.]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2 && !ATS_STOP_WORDS.has(w));

  // Frequency map
  const freq = {};
  words.forEach(w => { freq[w] = (freq[w] || 0) + 1; });

  // Also extract 2-word phrases
  const tokens = text.toLowerCase().replace(/[^a-zà-ÿ0-9\s\-]/g, ' ').split(/\s+/).filter(Boolean);
  for (let i = 0; i < tokens.length - 1; i++) {
    const bigram = tokens[i] + ' ' + tokens[i + 1];
    if (!ATS_STOP_WORDS.has(tokens[i]) && !ATS_STOP_WORDS.has(tokens[i + 1]) && tokens[i].length > 2 && tokens[i + 1].length > 2) {
      freq[bigram] = (freq[bigram] || 0) + 1;
    }
  }

  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 50)
    .map(e => e[0]);
}

// ── Flatten CV to searchable text ────────────────────────────
function _cvToText(cv) {
  const parts = [];
  if (cv.fullName) parts.push(cv.fullName);
  if (cv.jobTitle) parts.push(cv.jobTitle);
  if (cv.summary) parts.push(cv.summary);

  (cv.experiences || []).forEach(e => {
    if (e.role) parts.push(e.role);
    if (e.company) parts.push(e.company);
    if (e.description) parts.push(e.description);
  });
  (cv.education || []).forEach(e => {
    if (e.degree) parts.push(e.degree);
    if (e.field) parts.push(e.field);
    if (e.school) parts.push(e.school);
  });
  (cv.skillGroups || []).forEach(g => {
    if (g.category) parts.push(g.category);
    if (g.items) parts.push(g.items);
  });
  (cv.projects || []).forEach(p => {
    if (p.name) parts.push(p.name);
    if (p.description) parts.push(p.description);
    if (p.tech) parts.push(p.tech);
  });
  (cv.volunteer || []).forEach(v => {
    if (v.role) parts.push(v.role);
    if (v.org) parts.push(v.org);
    if (v.description) parts.push(v.description);
  });
  (cv.certifications || []).forEach(c => {
    if (c.name) parts.push(c.name);
    if (c.issuer) parts.push(c.issuer);
  });
  (cv.customSections || []).forEach(s => {
    if (s.title) parts.push(s.title);
    if (s.content) parts.push(s.content);
  });
  if (cv.interests) parts.push(cv.interests);

  return parts.join(' ').toLowerCase();
}

// ── Section completeness check ───────────────────────────────
function _checkSections(cv) {
  const issues = [];
  let score = 0;
  const total = 5;

  if (cv.summary && cv.summary.trim().length > 20) score++;
  else issues.push('summary');

  if (cv.experiences && cv.experiences.length > 0 && cv.experiences.some(e => e.role)) score++;
  else issues.push('experience');

  if (cv.skillGroups && cv.skillGroups.length > 0 && cv.skillGroups.some(g => g.items)) score++;
  else issues.push('skills');

  if (cv.education && cv.education.length > 0 && cv.education.some(e => e.degree || e.school)) score++;
  else issues.push('education');

  if (cv.fullName && cv.jobTitle) score++;
  else issues.push('header');

  return { score, total, missing: issues };
}

// ── Format quality ───────────────────────────────────────────
function _checkFormatting(cv) {
  const issues = [];
  const cvText = _cvToText(cv);

  // Special characters that ATS can't parse
  const badChars = /[│║═╔╗╚╝★☆●◆▪►◄←→↑↓✓✗✦⬤♦♣♠♥]/g;
  if (badChars.test(cvText)) issues.push('special_chars');

  // Date format check
  (cv.experiences || []).forEach(e => {
    if (e.startDate && !/^\d{4}-\d{2}$/.test(e.startDate) && !/^\d{2}\/\d{4}$/.test(e.startDate)) {
      if (!issues.includes('date_format')) issues.push('date_format');
    }
  });

  // Summary length
  if (cv.summary && cv.summary.length > 500) issues.push('summary_long');
  if (cv.summary && cv.summary.length < 30 && cv.summary.length > 0) issues.push('summary_short');

  // Experience bullet length
  (cv.experiences || []).forEach(e => {
    if (e.description) {
      const lines = e.description.split('\n').filter(l => l.trim());
      lines.forEach(l => {
        if (l.length > 200) { if (!issues.includes('bullet_long')) issues.push('bullet_long'); }
      });
      if (lines.length < 2) { if (!issues.includes('few_bullets')) issues.push('few_bullets'); }
    }
  });

  // No email or phone
  if (!cv.email && !cv.phone) issues.push('no_contact');

  return issues;
}

// ── Main scoring function ────────────────────────────────────
function calculateATSScore(cv, jobDescription, t) {
  if (!jobDescription || !jobDescription.trim()) {
    return { score: 0, suggestions: [], matchedKeywords: [], missingKeywords: [] };
  }

  const jdKeywords = _extractKeywords(jobDescription);
  const cvText = _cvToText(cv);

  // Keyword matching
  const matched = [];
  const missing = [];
  jdKeywords.forEach(kw => {
    if (cvText.includes(kw)) matched.push(kw);
    else missing.push(kw);
  });

  const keywordScore = jdKeywords.length > 0
    ? Math.round((matched.length / jdKeywords.length) * 100)
    : 0;

  // Section completeness
  const sections = _checkSections(cv);
  const sectionScore = Math.round((sections.score / sections.total) * 100);

  // Formatting
  const formatIssues = _checkFormatting(cv);
  const formatScore = Math.max(0, 100 - formatIssues.length * 15);

  // Weighted total
  const score = Math.round(keywordScore * 0.55 + sectionScore * 0.25 + formatScore * 0.20);

  // Build suggestions
  const suggestions = [];

  if (missing.length > 0) {
    suggestions.push({
      type: 'keywords',
      priority: 'high',
      keywords: missing.slice(0, 10)
    });
  }

  sections.missing.forEach(s => {
    suggestions.push({ type: 'section', priority: 'high', section: s });
  });

  formatIssues.forEach(issue => {
    suggestions.push({ type: 'format', priority: issue === 'no_contact' ? 'high' : 'medium', issue });
  });

  return {
    score: Math.min(100, Math.max(0, score)),
    suggestions,
    matchedKeywords: matched,
    missingKeywords: missing.slice(0, 20)
  };
}

// ── Modal renderer ───────────────────────────────────────────
function renderATSModal(score, suggestions, matched, missing, t) {
  const tr = (key, fallback) => (typeof t === 'function' ? t(key) : fallback);

  const color = score >= 75 ? '#22c55e' : score >= 50 ? '#eab308' : '#ef4444';
  const label = score >= 75 ? tr('ats_good', 'Good') : score >= 50 ? tr('ats_average', 'Needs work') : tr('ats_poor', 'Poor');

  let html = `
    <div style="text-align:center;margin-bottom:1.5rem">
      <div style="position:relative;display:inline-block;width:120px;height:120px">
        <svg viewBox="0 0 36 36" style="width:120px;height:120px;transform:rotate(-90deg)">
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e7eb" stroke-width="3"/>
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="${color}" stroke-width="3"
            stroke-dasharray="${score} ${100 - score}" stroke-linecap="round"/>
        </svg>
        <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center">
          <span style="font-size:1.75rem;font-weight:700;color:${color}">${score}</span>
          <span style="font-size:.75rem;color:#6b7280">${label}</span>
        </div>
      </div>
    </div>`;

  // Matched keywords
  if (matched.length > 0) {
    html += `<div style="margin-bottom:1rem"><h4 style="font-size:.875rem;font-weight:600;color:#16a34a;margin-bottom:.5rem">${tr('ats_matched', 'Matched keywords')} (${matched.length})</h4>
      <div style="display:flex;flex-wrap:wrap;gap:4px">${matched.map(k => `<span style="background:#dcfce7;color:#166534;padding:2px 8px;border-radius:9999px;font-size:.75rem">${k}</span>`).join('')}</div></div>`;
  }

  // Missing keywords
  if (missing.length > 0) {
    html += `<div style="margin-bottom:1rem"><h4 style="font-size:.875rem;font-weight:600;color:#dc2626;margin-bottom:.5rem">${tr('ats_missing', 'Missing keywords')} (${missing.length})</h4>
      <div style="display:flex;flex-wrap:wrap;gap:4px">${missing.map(k => `<span style="background:#fef2f2;color:#991b1b;padding:2px 8px;border-radius:9999px;font-size:.75rem">${k}</span>`).join('')}</div></div>`;
  }

  // Suggestions
  if (suggestions.length > 0) {
    html += `<div><h4 style="font-size:.875rem;font-weight:600;margin-bottom:.5rem">${tr('ats_suggestions', 'Suggestions')}</h4><ul style="list-style:none;padding:0;margin:0">`;

    suggestions.forEach(s => {
      const icon = s.priority === 'high' ? '🔴' : '🟡';
      let text = '';

      if (s.type === 'keywords') {
        text = tr('ats_add_keywords', 'Add these keywords to your CV') + ': ' + s.keywords.join(', ');
      } else if (s.type === 'section') {
        const sectionNames = {
          summary: tr('ats_sec_summary', 'Professional summary'),
          experience: tr('ats_sec_experience', 'Work experience'),
          skills: tr('ats_sec_skills', 'Skills'),
          education: tr('ats_sec_education', 'Education'),
          header: tr('ats_sec_header', 'Name & job title')
        };
        text = tr('ats_add_section', 'Add or complete section') + ': ' + (sectionNames[s.section] || s.section);
      } else if (s.type === 'format') {
        const formatMessages = {
          special_chars: tr('ats_fmt_chars', 'Remove special characters — ATS may not parse them'),
          date_format: tr('ats_fmt_date', 'Use consistent date format (YYYY-MM)'),
          summary_long: tr('ats_fmt_summary_long', 'Shorten your summary (max 500 characters)'),
          summary_short: tr('ats_fmt_summary_short', 'Expand your summary (at least 30 characters)'),
          bullet_long: tr('ats_fmt_bullet', 'Shorten bullet points (max 200 characters)'),
          few_bullets: tr('ats_fmt_few', 'Add more bullet points to your experience'),
          no_contact: tr('ats_fmt_contact', 'Add email or phone number')
        };
        text = formatMessages[s.issue] || s.issue;
      }

      html += `<li style="padding:6px 0;border-bottom:1px solid #f3f4f6;font-size:.85rem">${icon} ${text}</li>`;
    });

    html += '</ul></div>';
  }

  return html;
}
