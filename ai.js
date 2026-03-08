/* ═══════════════════════════════════════════════════════════════
   iloveresume — ai.js
   AI Integration (BYOK) — OpenAI & Anthropic support
═══════════════════════════════════════════════════════════════ */

'use strict';

// ── Constants ────────────────────────────────────────────────
const AI_STORAGE_KEY = 'iloveresume_ai_key';
const AI_PROVIDER_KEY = 'iloveresume_ai_provider';

const AI_ENDPOINTS = {
  openai: 'https://api.openai.com/v1/chat/completions',
  anthropic: 'https://api.anthropic.com/v1/messages'
};

const AI_MODELS = {
  openai: 'gpt-4o-mini',
  anthropic: 'claude-sonnet-4-20250514'
};

// ── Init ─────────────────────────────────────────────────────
function initAI() {
  const key = localStorage.getItem(AI_STORAGE_KEY);
  const provider = localStorage.getItem(AI_PROVIDER_KEY) || 'openai';
  return { configured: !!key, provider };
}

// ── Store API key ────────────────────────────────────────────
function setAPIKey(key, provider) {
  if (!key || !key.trim()) {
    localStorage.removeItem(AI_STORAGE_KEY);
    localStorage.removeItem(AI_PROVIDER_KEY);
    return;
  }
  provider = provider === 'anthropic' ? 'anthropic' : 'openai';
  localStorage.setItem(AI_STORAGE_KEY, key.trim());
  localStorage.setItem(AI_PROVIDER_KEY, provider);
}

// ── Internal: call AI API ────────────────────────────────────
async function _callAI(systemPrompt, userPrompt) {
  const key = localStorage.getItem(AI_STORAGE_KEY);
  const provider = localStorage.getItem(AI_PROVIDER_KEY) || 'openai';

  if (!key) throw new Error('No API key configured');

  if (provider === 'anthropic') {
    const res = await fetch(AI_ENDPOINTS.anthropic, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: AI_MODELS.anthropic,
        max_tokens: 1024,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }]
      })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `API error ${res.status}`);
    }

    const data = await res.json();
    return data.content?.[0]?.text || '';
  }

  // OpenAI
  const res = await fetch(AI_ENDPOINTS.openai, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`
    },
    body: JSON.stringify({
      model: AI_MODELS.openai,
      max_tokens: 1024,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ]
    })
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `API error ${res.status}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || '';
}

// ── Generate professional summary ────────────────────────────
async function generateSummary(profile, experiences, lang) {
  const langLabel = lang === 'fr' ? 'French' : 'English';

  const systemPrompt = `You are an expert resume writer. Write a 2-3 sentence professional summary for a resume. Be concise, impactful, and use strong action-oriented language. Do not use first person pronouns. Write in ${langLabel}. Return ONLY the summary text, no quotes or labels.`;

  const expSummary = (experiences || [])
    .filter(e => e.role)
    .map(e => `${e.role} at ${e.company || 'Company'}`)
    .join(', ');

  const userPrompt = `Name: ${profile.fullName || 'Professional'}
Target role: ${profile.jobTitle || 'Professional'}
Experience: ${expSummary || 'Not specified'}
Location: ${profile.city || 'Not specified'}`;

  return _callAI(systemPrompt, userPrompt);
}

// ── Improve a bullet point ───────────────────────────────────
async function improveBullet(bullet, role, company, lang) {
  const langLabel = lang === 'fr' ? 'French' : 'English';

  const systemPrompt = `You are an expert resume writer. Rewrite the given bullet point using the STAR method (Situation, Task, Action, Result). Make it concise (one sentence, max 150 characters), start with a strong action verb, include a quantified metric if possible. Write in ${langLabel}. Return ONLY the improved bullet point, no quotes or labels.`;

  const userPrompt = `Role: ${role || 'Professional'}
Company: ${company || 'Company'}
Original bullet: ${bullet}`;

  return _callAI(systemPrompt, userPrompt);
}

// ── Settings UI ──────────────────────────────────────────────
function renderAISettings() {
  const { configured, provider } = initAI();
  const maskedKey = configured ? '••••••••••••' : '';

  return `
    <div class="ai-settings" style="padding:1rem">
      <h3 style="font-size:1rem;font-weight:600;margin-bottom:1rem">AI Configuration</h3>
      <p style="font-size:.8rem;color:#6b7280;margin-bottom:1rem">
        Your API key is stored locally in your browser. It is never sent to any server other than the AI provider you select.
      </p>

      <div style="margin-bottom:1rem">
        <label style="display:block;font-size:.85rem;font-weight:500;margin-bottom:.25rem">Provider</label>
        <select id="ai-provider" style="width:100%;padding:.5rem;border:1px solid #d1d5db;border-radius:.375rem;font-size:.85rem">
          <option value="openai" ${provider === 'openai' ? 'selected' : ''}>OpenAI</option>
          <option value="anthropic" ${provider === 'anthropic' ? 'selected' : ''}>Anthropic</option>
        </select>
      </div>

      <div style="margin-bottom:1rem">
        <label style="display:block;font-size:.85rem;font-weight:500;margin-bottom:.25rem">API Key</label>
        <input type="password" id="ai-key" placeholder="${configured ? 'Key configured — enter new to replace' : 'Enter your API key'}"
          style="width:100%;padding:.5rem;border:1px solid #d1d5db;border-radius:.375rem;font-size:.85rem" />
      </div>

      <div style="display:flex;gap:.5rem">
        <button onclick="
          var k = document.getElementById('ai-key').value;
          var p = document.getElementById('ai-provider').value;
          if(k.trim()) {
            setAPIKey(k, p);
            document.getElementById('ai-status').textContent = 'Key saved!';
            document.getElementById('ai-status').style.color = '#16a34a';
          }
        " style="padding:.5rem 1rem;background:#2563eb;color:#fff;border:none;border-radius:.375rem;cursor:pointer;font-size:.85rem">
          Save
        </button>
        <button onclick="
          setAPIKey(null);
          document.getElementById('ai-key').value = '';
          document.getElementById('ai-status').textContent = 'Key removed.';
          document.getElementById('ai-status').style.color = '#dc2626';
        " style="padding:.5rem 1rem;background:#f3f4f6;color:#374151;border:1px solid #d1d5db;border-radius:.375rem;cursor:pointer;font-size:.85rem">
          Remove
        </button>
      </div>

      <p id="ai-status" style="font-size:.8rem;margin-top:.5rem;min-height:1.2em">
        ${configured ? '<span style="color:#16a34a">Key configured (' + provider + ')</span>' : '<span style="color:#6b7280">No key configured</span>'}
      </p>
    </div>`;
}
