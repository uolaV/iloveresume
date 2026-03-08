/* ═══════════════════════════════════════════════════════════════
   iloveresume — content-library.js
   Action verbs, bullet templates, weak word detection
═══════════════════════════════════════════════════════════════ */

'use strict';

// ── Action verbs by category ─────────────────────────────────
const ACTION_VERBS = {
  leadership: [
    'Accelerated','Achieved','Aligned','Appointed','Authorized','Championed',
    'Coached','Consolidated','Coordinated','Cultivated','Delegated','Directed',
    'Drove','Empowered','Enabled','Established','Executed','Forged','Founded',
    'Guided','Headed','Hired','Influenced','Initiated','Inspired','Instituted',
    'Led','Managed','Mentored','Mobilized','Motivated','Orchestrated','Oversaw',
    'Pioneered','Recruited','Reformed','Spearheaded','Steered','Supervised',
    'Transformed','Unified'
  ],
  technical: [
    'Administered','Architected','Automated','Built','Coded','Configured',
    'Debugged','Deployed','Designed','Developed','Digitized','Engineered',
    'Enhanced','Fabricated','Implemented','Integrated','Launched','Maintained',
    'Migrated','Modeled','Modernized','Operated','Optimized','Overhauled',
    'Programmed','Prototyped','Refactored','Replatformed','Resolved','Scaled',
    'Scripted','Shipped','Standardized','Streamlined','Tested','Troubleshot',
    'Upgraded','Validated'
  ],
  communication: [
    'Addressed','Advocated','Articulated','Authored','Briefed','Campaigned',
    'Clarified','Collaborated','Communicated','Composed','Consulted','Conveyed',
    'Corresponded','Counseled','Defined','Demonstrated','Documented','Drafted',
    'Edited','Educated','Facilitated','Informed','Interpreted','Lectured',
    'Liaised','Marketed','Mediated','Moderated','Negotiated','Persuaded',
    'Presented','Promoted','Proposed','Published','Reconciled','Reported',
    'Summarized','Translated'
  ],
  analytical: [
    'Analyzed','Appraised','Assessed','Audited','Benchmarked','Calculated',
    'Classified','Compared','Compiled','Computed','Concluded','Correlated',
    'Deciphered','Detected','Determined','Diagnosed','Discovered','Dissected',
    'Evaluated','Examined','Experimented','Explored','Extracted','Forecasted',
    'Identified','Interpreted','Investigated','Mapped','Measured','Modeled',
    'Monitored','Projected','Quantified','Researched','Reviewed','Surveyed',
    'Synthesized','Tracked','Validated','Verified'
  ],
  creative: [
    'Adapted','Brainstormed','Composed','Conceived','Conceptualized','Crafted',
    'Created','Curated','Customized','Designed','Developed','Devised','Directed',
    'Envisioned','Fashioned','Formulated','Generated','Illustrated','Imagined',
    'Improvised','Innovated','Introduced','Invented','Launched','Originated',
    'Performed','Photographed','Planned','Produced','Redesigned','Reimagined',
    'Revamped','Revitalized','Shaped','Sketched','Styled','Visualized'
  ],
  sales: [
    'Acquired','Attained','Boosted','Captured','Closed','Converted','Delivered',
    'Earned','Exceeded','Expanded','Generated','Grew','Improved','Increased',
    'Landed','Leveraged','Maximized','Monetized','Negotiated','Netted',
    'Outperformed','Penetrated','Pitched','Produced','Profited','Prospected',
    'Recovered','Reduced','Renewed','Retained','Secured','Sold','Strengthened',
    'Surpassed','Upsold','Won','Yielded'
  ],
  operations: [
    'Allocated','Arranged','Centralized','Consolidated','Controlled','Converted',
    'Coordinated','Cut','Decreased','Dispatched','Distributed','Eliminated',
    'Ensured','Expedited','Facilitated','Fulfilled','Improved','Inspected',
    'Installed','Inventoried','Lessened','Maintained','Minimized','Organized',
    'Prepared','Processed','Procured','Reduced','Regulated','Reorganized',
    'Restructured','Routed','Scheduled','Simplified','Sourced','Standardized',
    'Streamlined','Systematized','Tightened','Trimmed'
  ]
};

// ── Bullet point templates by industry ───────────────────────
const BULLET_TEMPLATES = {
  engineering: [
    'Designed and implemented {feature} reducing {metric} by {metric}%',
    'Led migration of {system} to {technology}, improving performance by {metric}%',
    'Reduced system downtime by {metric}% through proactive monitoring and automation',
    'Built scalable {type} architecture handling {metric}+ requests per second',
    'Optimized database queries, reducing average response time from {metric}ms to {metric}ms',
    'Automated {process} pipeline, saving {metric} hours of manual work per week',
    'Mentored {metric} junior engineers through code reviews and pair programming',
    'Shipped {metric} features across {metric} sprints with zero critical bugs',
    'Increased test coverage from {metric}% to {metric}%, reducing production incidents by {metric}%',
    'Architected microservices platform serving {metric}+ daily active users',
    'Resolved {metric}+ production incidents with average resolution time under {metric} minutes',
    'Implemented CI/CD pipeline reducing deployment time from {metric} hours to {metric} minutes'
  ],
  marketing: [
    'Grew organic traffic by {metric}% through SEO strategy and content optimization',
    'Managed ${metric}K annual advertising budget across {metric} channels',
    'Increased email open rates by {metric}% through A/B testing and segmentation',
    'Launched {metric} campaigns generating {metric}+ qualified leads per quarter',
    'Boosted social media engagement by {metric}% across {metric} platforms',
    'Reduced customer acquisition cost by {metric}% through funnel optimization',
    'Produced {metric}+ pieces of content generating {metric}K monthly page views',
    'Grew newsletter subscriber base from {metric}K to {metric}K in {metric} months',
    'Increased conversion rate by {metric}% through landing page optimization',
    'Coordinated {metric} product launches reaching {metric}+ potential customers',
    'Developed brand guidelines adopted across {metric} departments and {metric} markets'
  ],
  sales: [
    'Exceeded annual quota by {metric}%, generating ${metric}M in revenue',
    'Closed {metric}+ deals with average contract value of ${metric}K',
    'Built and managed pipeline of ${metric}M+ across {metric} accounts',
    'Increased client retention rate from {metric}% to {metric}%',
    'Expanded existing accounts by {metric}%, adding ${metric}K in annual revenue',
    'Shortened average sales cycle by {metric}% through consultative selling',
    'Onboarded {metric} new enterprise clients in first {metric} months',
    'Ranked top {metric}% of sales team for {metric} consecutive quarters',
    'Negotiated {metric}-year contracts worth ${metric}M+ in total value',
    'Generated {metric}+ qualified leads per month through outbound prospecting',
    'Trained {metric} new sales representatives, accelerating ramp time by {metric}%'
  ],
  finance: [
    'Managed portfolio of ${metric}M+ in assets across {metric} investment classes',
    'Reduced operational costs by ${metric}K annually through process improvements',
    'Prepared financial models for {metric}+ M&A transactions totaling ${metric}M',
    'Streamlined month-end close process from {metric} days to {metric} days',
    'Identified ${metric}K in cost savings through variance analysis and budget review',
    'Processed {metric}+ transactions monthly with {metric}% accuracy rate',
    'Implemented controls reducing audit findings by {metric}%',
    'Forecasted revenue within {metric}% accuracy across {metric} business units',
    'Automated {metric} financial reports saving {metric} hours per month',
    'Managed accounts payable/receivable of ${metric}M+ annually',
    'Reduced DSO from {metric} days to {metric} days through collections optimization'
  ],
  healthcare: [
    'Provided care to {metric}+ patients daily maintaining {metric}% satisfaction rate',
    'Reduced patient wait times by {metric}% through workflow optimization',
    'Trained {metric} staff members on updated safety protocols and compliance',
    'Maintained {metric}% accuracy in medication administration across {metric}+ doses',
    'Implemented new intake process reducing paperwork by {metric}%',
    'Coordinated care plans for {metric}+ patients with multidisciplinary teams',
    'Achieved {metric}% compliance rate in regulatory audits',
    'Decreased readmission rates by {metric}% through improved discharge planning',
    'Managed inventory of {metric}+ medical supplies reducing waste by {metric}%',
    'Documented {metric}+ clinical encounters per week in EHR with {metric}% accuracy',
    'Led quality improvement initiative reducing infection rates by {metric}%'
  ],
  education: [
    'Taught {metric}+ students per semester with average evaluation score of {metric}/5',
    'Developed {metric} new course curricula aligned with industry standards',
    'Improved student pass rates by {metric}% through differentiated instruction',
    'Mentored {metric}+ students through academic advising and career guidance',
    'Secured ${metric}K in grants for classroom technology and materials',
    'Coordinated {metric} extracurricular programs serving {metric}+ participants',
    'Implemented assessment framework reducing grading time by {metric}%',
    'Led professional development workshops for {metric}+ faculty members',
    'Increased parent engagement by {metric}% through communication initiatives',
    'Designed {metric} inclusive lesson plans meeting diverse learning needs',
    'Piloted {metric} technology tools improving student engagement by {metric}%'
  ],
  design: [
    'Redesigned {product} interface increasing user satisfaction by {metric}%',
    'Created {metric}+ high-fidelity prototypes for user testing and validation',
    'Reduced user task completion time by {metric}% through UX improvements',
    'Designed visual assets for {metric}+ marketing campaigns across {metric} channels',
    'Established design system with {metric}+ reusable components and guidelines',
    'Conducted {metric}+ user research sessions informing {metric} product decisions',
    'Increased conversion rate by {metric}% through data-driven design iterations',
    'Delivered {metric}+ projects on time and within budget for {metric} clients',
    'Improved accessibility score from {metric} to {metric} meeting WCAG 2.1 AA standards',
    'Led design sprints with {metric}-person cross-functional teams',
    'Grew social media following by {metric}% through original visual content'
  ]
};

// ── Weak words & phrases ─────────────────────────────────────
const WEAK_WORDS = [
  // English
  { pattern: /\bresponsible for\b/gi, suggestion: 'Led / Managed / Directed' },
  { pattern: /\bhelped with\b/gi, suggestion: 'Contributed to / Supported / Facilitated' },
  { pattern: /\bassisted in\b/gi, suggestion: 'Collaborated on / Contributed to' },
  { pattern: /\bworked on\b/gi, suggestion: 'Developed / Delivered / Executed' },
  { pattern: /\bwas involved in\b/gi, suggestion: 'Participated in / Contributed to / Drove' },
  { pattern: /\bduties included\b/gi, suggestion: 'Start with an action verb instead' },
  { pattern: /\bin charge of\b/gi, suggestion: 'Managed / Oversaw / Directed' },
  { pattern: /\btasked with\b/gi, suggestion: 'Start with an action verb instead' },
  { pattern: /\bhandled\b/gi, suggestion: 'Managed / Processed / Coordinated' },
  { pattern: /\bdealt with\b/gi, suggestion: 'Resolved / Addressed / Managed' },
  { pattern: /\bteam player\b/gi, suggestion: 'Collaborated with cross-functional teams' },
  { pattern: /\bhard worker\b/gi, suggestion: 'Show results instead of traits' },
  { pattern: /\bgo-getter\b/gi, suggestion: 'Show initiative through achievements' },
  { pattern: /\bself-starter\b/gi, suggestion: 'Initiated / Launched / Pioneered' },
  { pattern: /\bdetail-oriented\b/gi, suggestion: 'Show precision through metrics' },
  { pattern: /\bresults-driven\b/gi, suggestion: 'Show actual results with numbers' },
  { pattern: /\bsuccessfully\b/gi, suggestion: 'Remove — show success through metrics' },
  { pattern: /\bvarious\b/gi, suggestion: 'Be specific — name the items' },
  { pattern: /\bnumerous\b/gi, suggestion: 'Use a specific number' },
  { pattern: /\betc\.?\b/gi, suggestion: 'Be specific or remove' },
  // Passive voice patterns
  { pattern: /\bwas (given|assigned|asked|told|made)\b/gi, suggestion: 'Rewrite in active voice with an action verb' },
  { pattern: /\bwere (given|assigned|asked|told|made)\b/gi, suggestion: 'Rewrite in active voice with an action verb' },
  // French
  { pattern: /\bresponsable de\b/gi, suggestion: 'Dirigé / Géré / Piloté' },
  { pattern: /\bchargé(e)? de\b/gi, suggestion: 'Piloté / Assuré / Conduit' },
  { pattern: /\ba aidé à\b/gi, suggestion: 'A contribué à / A soutenu' },
  { pattern: /\ba participé à\b/gi, suggestion: 'A contribué à / A collaboré sur' },
  { pattern: /\ba travaillé sur\b/gi, suggestion: 'A développé / A réalisé / A livré' },
  { pattern: /\bs'est occupé(e)? de\b/gi, suggestion: 'A géré / A coordonné / A piloté' },
  { pattern: /\bavait pour mission de\b/gi, suggestion: 'Commencez par un verbe d\'action' },
  { pattern: /\ben charge de\b/gi, suggestion: 'A dirigé / A supervisé / A piloté' },
  { pattern: /\ba fait\b/gi, suggestion: 'Utilisez un verbe plus précis' },
  { pattern: /\bdivers(es)?\b/gi, suggestion: 'Soyez précis — nommez les éléments' }
];

// ── Detect weak words in text ────────────────────────────────
function detectWeakWords(text) {
  if (!text) return [];
  const results = [];

  WEAK_WORDS.forEach(weak => {
    let match;
    const regex = new RegExp(weak.pattern.source, weak.pattern.flags);
    while ((match = regex.exec(text)) !== null) {
      results.push({
        word: match[0],
        index: match.index,
        suggestion: weak.suggestion
      });
    }
  });

  return results.sort((a, b) => a.index - b.index);
}

// ── Suggest verbs by category ────────────────────────────────
function suggestVerbs(category) {
  const cat = (category || '').toLowerCase();
  if (ACTION_VERBS[cat]) return [...ACTION_VERBS[cat]];
  // Return all verbs if category not found
  return Object.values(ACTION_VERBS).flat();
}

// ── Get industry bullet templates ────────────────────────────
function getIndustryBullets(industry) {
  const ind = (industry || '').toLowerCase();
  if (BULLET_TEMPLATES[ind]) return [...BULLET_TEMPLATES[ind]];
  return [];
}
