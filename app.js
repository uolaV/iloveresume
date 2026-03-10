/* ═══════════════════════════════════════════════════════════════
   iloveresume — app.js
   State, form handlers, live preview, PDF export, share, history
   Inspiré de iloveinvoice · Vanilla JavaScript pur
═══════════════════════════════════════════════════════════════ */

'use strict';

// ── Translations ──────────────────────────────────────────────
const T = {
  fr: {
    step_profile: 'Profil', step_exp: 'Expériences', step_edu: 'Formation',
    step_skills: 'Compétences', step_extras: 'Extras',
    full_name: 'Nom complet *', job_title: 'Titre / Poste visé *',
    summary: 'Résumé / Accroche', phone: 'Téléphone', email: 'Email', linkedin: 'LinkedIn', github: 'GitHub / Portfolio', city: 'Ville / Pays',
    website: 'Site web', add_photo: 'Ajouter une photo', remove_photo: 'Supprimer la photo',
    add_experience: 'Ajouter une expérience', add_education: 'Ajouter une formation',
    add_skill_group: 'Ajouter une catégorie', add_certification: 'Ajouter',
    add_language: 'Ajouter une langue', certifications: 'Certifications',
    languages: 'Langues', interests: "Centres d'intérêt",
    interests_placeholder: "Voyage, Photo, Sport… (séparés par virgule)",
    design_options: 'Design & Options', template: 'Template',
    tpl_modern: 'Modern', tpl_classic: 'Classic', tpl_bold: 'Bold', tpl_compact: 'Compact',
    accent_color: "Couleur d'accent", font: 'Police',
    show_photo: 'Afficher la photo dans le CV',
    previous: '← Précédent', next: 'Suivant →',
    history: 'Historique', share: 'Partager', download: 'Télécharger PDF',
    save_json: 'Sauvegarder', import_json: 'Importer', saved_json: 'CV sauvegardé ✓', imported_json: 'CV importé ✓', import_error: 'Fichier invalide',
    persist_tip: 'Sauvegardez votre CV en JSON pour le retrouver et le modifier plus tard, même des mois après.',
    history_empty: "Aucun CV dans l'historique", share_title: 'Partager votre CV',
    share_desc: 'Ce lien contient toutes les données de votre CV. Aucune donnée n\'est envoyée sur un serveur.',
    copy_link: 'Copier', link_copied: '✓ Lien copié !',
    preview_placeholder: 'Remplissez le formulaire pour voir votre CV',
    select_language: 'Choisir la langue', contact: 'Contact',
    company: 'Entreprise', role: 'Poste', start_date: 'Date de début', end_date: 'Date de fin',
    current_position: 'Poste actuel', description: 'Description / Points clés (un par ligne)',
    school: 'École / Université', degree: 'Diplôme', field: 'Domaine', grade: 'Mention / Note',
    skill_category: 'Catégorie (ex: Langages, Outils…)',
    skill_items: 'Compétences (séparées par virgule)',
    cert_name: 'Nom de la certification', cert_issuer: 'Organisme', cert_date: 'Date',
    lang_name: 'Langue', lang_level: 'Niveau (ex: Natif, B2, Intermédiaire)',
    load: 'Charger', duplicate: 'Dupliquer', delete: 'Supprimer',
    pdf_generating: 'Génération du PDF…', pdf_done: 'PDF téléchargé !',
    present: 'Présent', unnamed: 'Sans titre',
    demo_title: 'Données d\'exemple', demo_desc: 'remplacez-les par les vôtres', demo_clear: 'Tout effacer',
    // New sections
    projects: 'Projets', add_project: 'Ajouter un projet', project_name: 'Nom du projet',
    project_description: 'Description', project_url: 'URL du projet', project_tech: 'Technologies utilisées',
    volunteer: 'Bénévolat', add_volunteer: 'Ajouter une expérience bénévole',
    volunteer_org: 'Organisation', volunteer_role: 'Rôle',
    custom_section: 'Section personnalisée', add_custom_section: 'Ajouter une section personnalisée',
    custom_section_title: 'Titre de la section', custom_entry_title: 'Titre', custom_entry_subtitle: 'Sous-titre',
    custom_entry_date: 'Date', custom_entry_desc: 'Description', add_custom_entry: 'Ajouter une entrée',
    saved_indicator: 'Sauvegardé', preview_cv: 'Voir mon CV',
    // New templates
    tpl_executive: 'Exécutif', tpl_creative: 'Créatif', tpl_technical: 'Technique',
    tpl_minimal: 'Minimal', tpl_academic: 'Académique', tpl_infographic: 'Infographie',
    tpl_elegant: 'Élégant', tpl_twopage: 'Deux pages',
    // Publications & References
    publications: 'Publications', add_publication: 'Ajouter une publication',
    pub_title: 'Titre', pub_authors: 'Auteurs', pub_venue: 'Revue / Conférence', pub_date: 'Date', pub_url: 'URL',
    references: 'Références', add_reference: 'Ajouter une référence',
    ref_name: 'Nom', ref_title: 'Titre / Poste', ref_company: 'Entreprise', ref_email: 'Email', ref_phone: 'Téléphone',
    references_available: 'Références disponibles sur demande',
    // ATS
    ats_checker: 'Score ATS', ats_paste_job: 'Collez l\'offre d\'emploi ici', ats_analyze: 'Analyser',
    ats_score: 'Score', ats_suggestions: 'Suggestions', ats_matched: 'Mots-clés trouvés', ats_missing: 'Mots-clés manquants',
    ats_add_keywords: 'Ajoutez ces mots-clés à votre CV', ats_add_section: 'Ajoutez ou complétez la section',
    ats_sec_summary: 'Résumé professionnel', ats_sec_experience: 'Expérience professionnelle', ats_sec_skills: 'Compétences', ats_sec_education: 'Formation', ats_sec_header: 'Nom et titre',
    ats_fmt_chars: 'Supprimez les caractères spéciaux — les ATS peuvent ne pas les lire', ats_fmt_date: 'Utilisez un format de date cohérent (AAAA-MM)', ats_fmt_summary_long: 'Raccourcissez votre résumé (max 500 caractères)', ats_fmt_summary_short: 'Développez votre résumé (min 30 caractères)', ats_fmt_bullet: 'Raccourcissez vos bullet points (max 200 caractères)', ats_fmt_few: 'Ajoutez plus de bullet points à vos expériences', ats_fmt_contact: 'Ajoutez un email ou numéro de téléphone',
    // Content helpers
    content_helpers: 'Aide à la rédaction', action_verbs: 'Verbes d\'action', bullet_templates: 'Modèles de bullet points',
    weak_words_detected: 'Mots faibles détectés',
    // Export
    download_docx: 'Télécharger DOCX',
    // Drag
    drag_hint: 'Glissez pour réordonner',
    font_size: 'Taille de police', spacing: 'Espacement', sidebar_width: 'Largeur sidebar',
    section_visibility: 'Sections visibles',
  },
  en: {
    step_profile: 'Profile', step_exp: 'Experience', step_edu: 'Education',
    step_skills: 'Skills', step_extras: 'Extras',
    full_name: 'Full name *', job_title: 'Job title *',
    summary: 'Summary / Headline', phone: 'Phone', email: 'Email', linkedin: 'LinkedIn', github: 'GitHub / Portfolio', city: 'City / Country',
    website: 'Website', add_photo: 'Add photo', remove_photo: 'Remove photo',
    add_experience: 'Add experience', add_education: 'Add education',
    add_skill_group: 'Add skill group', add_certification: 'Add',
    add_language: 'Add language', certifications: 'Certifications',
    languages: 'Languages', interests: 'Interests',
    interests_placeholder: 'Travel, Photography, Sport… (comma separated)',
    design_options: 'Design & Options', template: 'Template',
    tpl_modern: 'Modern', tpl_classic: 'Classic', tpl_bold: 'Bold', tpl_compact: 'Compact',
    accent_color: 'Accent color', font: 'Font',
    show_photo: 'Show photo in CV',
    previous: '← Previous', next: 'Next →',
    history: 'History', share: 'Share', download: 'Download PDF',
    save_json: 'Save', import_json: 'Import', saved_json: 'CV saved ✓', imported_json: 'CV imported ✓', import_error: 'Invalid file',
    persist_tip: 'Save your CV as JSON to retrieve and update it later — even months from now.',
    history_empty: 'No CV in history', share_title: 'Share your CV',
    share_desc: 'This link contains all your CV data. No data is sent to any server.',
    copy_link: 'Copy', link_copied: '✓ Link copied!',
    preview_placeholder: 'Fill in the form to see your CV',
    select_language: 'Select language', contact: 'Contact',
    company: 'Company', role: 'Position', start_date: 'Start date', end_date: 'End date',
    current_position: 'Current position', description: 'Description / Key points (one per line)',
    school: 'School / University', degree: 'Degree', field: 'Field of study', grade: 'Grade / Honours',
    skill_category: 'Category (e.g. Languages, Tools…)',
    skill_items: 'Skills (comma separated)',
    cert_name: 'Certification name', cert_issuer: 'Issuer', cert_date: 'Date',
    lang_name: 'Language', lang_level: 'Level (e.g. Native, B2, Intermediate)',
    load: 'Load', duplicate: 'Duplicate', delete: 'Delete',
    pdf_generating: 'Generating PDF…', pdf_done: 'PDF downloaded!',
    present: 'Present', unnamed: 'Untitled',
    demo_title: 'Sample data', demo_desc: 'replace it with yours', demo_clear: 'Clear all',
    projects: 'Projects', add_project: 'Add a project', project_name: 'Project name',
    project_description: 'Description', project_url: 'Project URL', project_tech: 'Technologies used',
    volunteer: 'Volunteering', add_volunteer: 'Add volunteer experience',
    volunteer_org: 'Organization', volunteer_role: 'Role',
    custom_section: 'Custom section', add_custom_section: 'Add custom section',
    custom_section_title: 'Section title', custom_entry_title: 'Title', custom_entry_subtitle: 'Subtitle',
    custom_entry_date: 'Date', custom_entry_desc: 'Description', add_custom_entry: 'Add entry',
    saved_indicator: 'Saved', preview_cv: 'Preview CV',
    tpl_executive: 'Executive', tpl_creative: 'Creative', tpl_technical: 'Technical',
    tpl_minimal: 'Minimal', tpl_academic: 'Academic', tpl_infographic: 'Infographic',
    tpl_elegant: 'Elegant', tpl_twopage: 'Two Page',
    publications: 'Publications', add_publication: 'Add publication',
    pub_title: 'Title', pub_authors: 'Authors', pub_venue: 'Journal / Conference', pub_date: 'Date', pub_url: 'URL',
    references: 'References', add_reference: 'Add reference',
    ref_name: 'Name', ref_title: 'Title / Position', ref_company: 'Company', ref_email: 'Email', ref_phone: 'Phone',
    references_available: 'References available upon request',
    ats_checker: 'ATS Score', ats_paste_job: 'Paste job description here', ats_analyze: 'Analyze',
    ats_score: 'Score', ats_suggestions: 'Suggestions', ats_matched: 'Matched keywords', ats_missing: 'Missing keywords',
    ats_add_keywords: 'Add these keywords to your CV', ats_add_section: 'Add or complete section',
    ats_sec_summary: 'Professional summary', ats_sec_experience: 'Work experience', ats_sec_skills: 'Skills', ats_sec_education: 'Education', ats_sec_header: 'Name & job title',
    ats_fmt_chars: 'Remove special characters — ATS may not parse them', ats_fmt_date: 'Use consistent date format (YYYY-MM)', ats_fmt_summary_long: 'Shorten your summary (max 500 characters)', ats_fmt_summary_short: 'Expand your summary (at least 30 characters)', ats_fmt_bullet: 'Shorten bullet points (max 200 characters)', ats_fmt_few: 'Add more bullet points to your experience', ats_fmt_contact: 'Add email or phone number',
    content_helpers: 'Writing Help', action_verbs: 'Action verbs', bullet_templates: 'Bullet templates',
    weak_words_detected: 'Weak words detected',
    download_docx: 'Download DOCX',
    drag_hint: 'Drag to reorder',
    font_size: 'Font size', spacing: 'Spacing', sidebar_width: 'Sidebar width',
    section_visibility: 'Visible sections',
  },
  de: {
    step_profile: 'Profil', step_exp: 'Erfahrung', step_edu: 'Ausbildung',
    step_skills: 'Fähigkeiten', step_extras: 'Extras',
    full_name: 'Vollständiger Name *', job_title: 'Berufsbezeichnung *',
    summary: 'Zusammenfassung', phone: 'Telefon', email: 'E-Mail', linkedin: 'LinkedIn', github: 'GitHub / Portfolio', city: 'Stadt / Land',
    website: 'Webseite', add_photo: 'Foto hinzufügen', remove_photo: 'Foto entfernen',
    add_experience: 'Erfahrung hinzufügen', add_education: 'Ausbildung hinzufügen',
    add_skill_group: 'Kategorie hinzufügen', add_certification: 'Hinzufügen',
    add_language: 'Sprache hinzufügen', certifications: 'Zertifikate',
    languages: 'Sprachen', interests: 'Interessen',
    interests_placeholder: 'Reisen, Fotografie, Sport… (kommagetrennt)',
    design_options: 'Design & Optionen', template: 'Vorlage',
    tpl_modern: 'Modern', tpl_classic: 'Klassisch', tpl_bold: 'Fett', tpl_compact: 'Kompakt',
    accent_color: 'Akzentfarbe', font: 'Schriftart',
    show_photo: 'Foto im Lebenslauf anzeigen',
    previous: '← Zurück', next: 'Weiter →',
    history: 'Verlauf', share: 'Teilen', download: 'PDF herunterladen',
    save_json: 'Speichern', import_json: 'Importieren', saved_json: 'CV gespeichert ✓', imported_json: 'CV importiert ✓', import_error: 'Ungültige Datei',
    persist_tip: 'Speichern Sie Ihren Lebenslauf als JSON, um ihn später – auch Monate danach – wiederzufinden und zu bearbeiten.',
    history_empty: 'Keine Lebensläufe im Verlauf', share_title: 'Lebenslauf teilen',
    share_desc: 'Dieser Link enthält alle Ihre Daten. Es werden keine Daten an einen Server gesendet.',
    copy_link: 'Kopieren', link_copied: '✓ Link kopiert!',
    preview_placeholder: 'Füllen Sie das Formular aus, um Ihren Lebenslauf zu sehen',
    select_language: 'Sprache auswählen', contact: 'Kontakt',
    company: 'Unternehmen', role: 'Position', start_date: 'Startdatum', end_date: 'Enddatum',
    current_position: 'Aktuelle Stelle', description: 'Beschreibung / Stichpunkte (einer pro Zeile)',
    school: 'Schule / Universität', degree: 'Abschluss', field: 'Fachrichtung', grade: 'Note',
    skill_category: 'Kategorie (z.B. Sprachen, Tools…)',
    skill_items: 'Fähigkeiten (kommagetrennt)',
    cert_name: 'Zertifikatname', cert_issuer: 'Aussteller', cert_date: 'Datum',
    lang_name: 'Sprache', lang_level: 'Niveau (z.B. Muttersprache, B2)',
    load: 'Laden', duplicate: 'Duplizieren', delete: 'Löschen',
    pdf_generating: 'PDF wird erstellt…', pdf_done: 'PDF heruntergeladen!',
    present: 'Aktuell', unnamed: 'Unbenannt',
    demo_title: 'Beispieldaten', demo_desc: 'ersetzen Sie sie durch Ihre', demo_clear: 'Alles löschen',
    projects: 'Projekte', add_project: 'Projekt hinzufügen', project_name: 'Projektname',
    project_description: 'Beschreibung', project_url: 'Projekt-URL', project_tech: 'Verwendete Technologien',
    volunteer: 'Ehrenamt', add_volunteer: 'Ehrenamtliche Tätigkeit hinzufügen',
    volunteer_org: 'Organisation', volunteer_role: 'Rolle',
    custom_section: 'Benutzerdefinierter Abschnitt', add_custom_section: 'Abschnitt hinzufügen',
    custom_section_title: 'Abschnittstitel', custom_entry_title: 'Titel', custom_entry_subtitle: 'Untertitel',
    custom_entry_date: 'Datum', custom_entry_desc: 'Beschreibung', add_custom_entry: 'Eintrag hinzufügen',
    saved_indicator: 'Gespeichert', preview_cv: 'Lebenslauf ansehen',
    tpl_executive: 'Executive', tpl_creative: 'Kreativ', tpl_technical: 'Technisch',
    tpl_minimal: 'Minimal', tpl_academic: 'Akademisch', tpl_infographic: 'Infografik',
    tpl_elegant: 'Elegant', tpl_twopage: 'Zwei Seiten',
    publications: 'Publikationen', add_publication: 'Publikation hinzufügen',
    pub_title: 'Titel', pub_authors: 'Autoren', pub_venue: 'Zeitschrift / Konferenz', pub_date: 'Datum', pub_url: 'URL',
    references: 'Referenzen', add_reference: 'Referenz hinzufügen',
    ref_name: 'Name', ref_title: 'Titel / Position', ref_company: 'Unternehmen', ref_email: 'E-Mail', ref_phone: 'Telefon',
    references_available: 'Referenzen auf Anfrage verfügbar',
    ats_checker: 'ATS-Score', ats_paste_job: 'Stellenbeschreibung hier einfügen', ats_analyze: 'Analysieren',
    ats_score: 'Score', ats_suggestions: 'Vorschläge', ats_matched: 'Gefundene Schlüsselwörter', ats_missing: 'Fehlende Schlüsselwörter',
    ats_add_keywords: 'Fügen Sie diese Schlüsselwörter Ihrem Lebenslauf hinzu', ats_add_section: 'Abschnitt hinzufügen oder vervollständigen',
    ats_sec_summary: 'Berufliche Zusammenfassung', ats_sec_experience: 'Berufserfahrung', ats_sec_skills: 'Fähigkeiten', ats_sec_education: 'Ausbildung', ats_sec_header: 'Name und Berufsbezeichnung',
    ats_fmt_chars: 'Sonderzeichen entfernen — ATS kann sie möglicherweise nicht lesen', ats_fmt_date: 'Einheitliches Datumsformat verwenden (JJJJ-MM)', ats_fmt_summary_long: 'Zusammenfassung kürzen (max. 500 Zeichen)', ats_fmt_summary_short: 'Zusammenfassung erweitern (mind. 30 Zeichen)', ats_fmt_bullet: 'Aufzählungspunkte kürzen (max. 200 Zeichen)', ats_fmt_few: 'Mehr Aufzählungspunkte hinzufügen', ats_fmt_contact: 'E-Mail oder Telefonnummer hinzufügen',
    content_helpers: 'Schreibhilfe', action_verbs: 'Aktionsverben', bullet_templates: 'Aufzählungsvorlagen',
    weak_words_detected: 'Schwache Wörter erkannt',
    download_docx: 'DOCX herunterladen',
    drag_hint: 'Zum Neuordnen ziehen',
    font_size: 'Schriftgröße', spacing: 'Abstand', sidebar_width: 'Seitenleistenbreite',
    section_visibility: 'Sichtbare Abschnitte',
  },
  es: {
    step_profile: 'Perfil', step_exp: 'Experiencia', step_edu: 'Formación',
    step_skills: 'Habilidades', step_extras: 'Extras',
    full_name: 'Nombre completo *', job_title: 'Título / Puesto *',
    summary: 'Resumen / Titular', phone: 'Teléfono', email: 'Email', linkedin: 'LinkedIn', github: 'GitHub / Portfolio', city: 'Ciudad / País',
    website: 'Sitio web', add_photo: 'Añadir foto', remove_photo: 'Eliminar foto',
    add_experience: 'Añadir experiencia', add_education: 'Añadir formación',
    add_skill_group: 'Añadir categoría', add_certification: 'Añadir',
    add_language: 'Añadir idioma', certifications: 'Certificaciones',
    languages: 'Idiomas', interests: 'Intereses',
    interests_placeholder: 'Viajes, Fotografía, Deporte… (separados por coma)',
    design_options: 'Diseño & Opciones', template: 'Plantilla',
    tpl_modern: 'Moderno', tpl_classic: 'Clásico', tpl_bold: 'Negrita', tpl_compact: 'Compacto',
    accent_color: 'Color de acento', font: 'Fuente',
    show_photo: 'Mostrar foto en el CV',
    previous: '← Anterior', next: 'Siguiente →',
    history: 'Historial', share: 'Compartir', download: 'Descargar PDF',
    save_json: 'Guardar', import_json: 'Importar', saved_json: 'CV guardado ✓', imported_json: 'CV importado ✓', import_error: 'Archivo inválido',
    persist_tip: 'Guarda tu CV en JSON para recuperarlo y actualizarlo más tarde, incluso meses después.',
    history_empty: 'Sin currículums en el historial', share_title: 'Compartir tu CV',
    share_desc: 'Este enlace contiene todos los datos de tu CV. No se envían datos a ningún servidor.',
    copy_link: 'Copiar', link_copied: '✓ ¡Enlace copiado!',
    preview_placeholder: 'Rellena el formulario para ver tu CV',
    select_language: 'Seleccionar idioma', contact: 'Contacto',
    company: 'Empresa', role: 'Puesto', start_date: 'Fecha inicio', end_date: 'Fecha fin',
    current_position: 'Puesto actual', description: 'Descripción / Puntos clave (uno por línea)',
    school: 'Centro / Universidad', degree: 'Título', field: 'Área de estudio', grade: 'Nota',
    skill_category: 'Categoría (ej: Lenguajes, Herramientas…)',
    skill_items: 'Habilidades (separadas por coma)',
    cert_name: 'Nombre de certificación', cert_issuer: 'Entidad', cert_date: 'Fecha',
    lang_name: 'Idioma', lang_level: 'Nivel (ej: Nativo, B2)',
    load: 'Cargar', duplicate: 'Duplicar', delete: 'Eliminar',
    pdf_generating: 'Generando PDF…', pdf_done: '¡PDF descargado!',
    present: 'Actualidad', unnamed: 'Sin título',
    demo_title: 'Datos de ejemplo', demo_desc: 'reemplácelos con los suyos', demo_clear: 'Borrar todo',
    projects: 'Proyectos', add_project: 'Añadir proyecto', project_name: 'Nombre del proyecto',
    project_description: 'Descripción', project_url: 'URL del proyecto', project_tech: 'Tecnologías utilizadas',
    volunteer: 'Voluntariado', add_volunteer: 'Añadir experiencia voluntaria',
    volunteer_org: 'Organización', volunteer_role: 'Rol',
    custom_section: 'Sección personalizada', add_custom_section: 'Añadir sección personalizada',
    custom_section_title: 'Título de la sección', custom_entry_title: 'Título', custom_entry_subtitle: 'Subtítulo',
    custom_entry_date: 'Fecha', custom_entry_desc: 'Descripción', add_custom_entry: 'Añadir entrada',
    saved_indicator: 'Guardado', preview_cv: 'Ver mi CV',
    tpl_executive: 'Ejecutivo', tpl_creative: 'Creativo', tpl_technical: 'Técnico',
    tpl_minimal: 'Mínimal', tpl_academic: 'Académico', tpl_infographic: 'Infografía',
    tpl_elegant: 'Elegante', tpl_twopage: 'Dos páginas',
    publications: 'Publicaciones', add_publication: 'Añadir publicación',
    pub_title: 'Título', pub_authors: 'Autores', pub_venue: 'Revista / Conferencia', pub_date: 'Fecha', pub_url: 'URL',
    references: 'Referencias', add_reference: 'Añadir referencia',
    ref_name: 'Nombre', ref_title: 'Título / Puesto', ref_company: 'Empresa', ref_email: 'Email', ref_phone: 'Teléfono',
    references_available: 'Referencias disponibles a pedido',
    ats_checker: 'Puntuación ATS', ats_paste_job: 'Pegue la descripción del puesto aquí', ats_analyze: 'Analizar',
    ats_score: 'Puntuación', ats_suggestions: 'Sugerencias', ats_matched: 'Palabras clave encontradas', ats_missing: 'Palabras clave faltantes',
    ats_add_keywords: 'Añada estas palabras clave a su CV', ats_add_section: 'Añada o complete la sección',
    ats_sec_summary: 'Resumen profesional', ats_sec_experience: 'Experiencia laboral', ats_sec_skills: 'Habilidades', ats_sec_education: 'Formación', ats_sec_header: 'Nombre y cargo',
    ats_fmt_chars: 'Elimine caracteres especiales — los ATS pueden no leerlos', ats_fmt_date: 'Use un formato de fecha consistente (AAAA-MM)', ats_fmt_summary_long: 'Acorte su resumen (máx. 500 caracteres)', ats_fmt_summary_short: 'Amplíe su resumen (mín. 30 caracteres)', ats_fmt_bullet: 'Acorte las viñetas (máx. 200 caracteres)', ats_fmt_few: 'Añada más viñetas a su experiencia', ats_fmt_contact: 'Añada email o número de teléfono',
    content_helpers: 'Ayuda para redactar', action_verbs: 'Verbos de acción', bullet_templates: 'Plantillas de viñetas',
    weak_words_detected: 'Palabras débiles detectadas',
    download_docx: 'Descargar DOCX',
    drag_hint: 'Arrastrar para reordenar',
    font_size: 'Tamaño de fuente', spacing: 'Espaciado', sidebar_width: 'Ancho de barra lateral',
    section_visibility: 'Secciones visibles',
  },
  // ── New languages ──
  pt: {
    step_profile: 'Perfil', step_exp: 'Experiência', step_edu: 'Formação',
    step_skills: 'Competências', step_extras: 'Extras',
    full_name: 'Nome completo *', job_title: 'Cargo *',
    summary: 'Resumo', phone: 'Telefone', email: 'Email', linkedin: 'LinkedIn', github: 'GitHub / Portfolio', city: 'Cidade / País',
    website: 'Website', add_photo: 'Adicionar foto', remove_photo: 'Remover foto',
    add_experience: 'Adicionar experiência', add_education: 'Adicionar formação',
    add_skill_group: 'Adicionar categoria', add_certification: 'Adicionar',
    add_language: 'Adicionar idioma', certifications: 'Certificações',
    languages: 'Idiomas', interests: 'Interesses',
    interests_placeholder: 'Viagens, Fotografia, Esporte… (separados por vírgula)',
    design_options: 'Design & Opções', template: 'Modelo',
    tpl_modern: 'Moderno', tpl_classic: 'Clássico', tpl_bold: 'Negrito', tpl_compact: 'Compacto',
    tpl_executive: 'Executivo', tpl_creative: 'Criativo', tpl_technical: 'Técnico',
    tpl_minimal: 'Mínimal', tpl_academic: 'Acadêmico', tpl_infographic: 'Infográfico',
    tpl_elegant: 'Elegante', tpl_twopage: 'Duas páginas',
    accent_color: 'Cor de destaque', font: 'Fonte',
    show_photo: 'Mostrar foto no CV',
    previous: '← Anterior', next: 'Próximo →',
    history: 'Histórico', share: 'Compartilhar', download: 'Baixar PDF',
    save_json: 'Salvar', import_json: 'Importar', saved_json: 'CV salvo ✓', imported_json: 'CV importado ✓', import_error: 'Arquivo inválido',
    persist_tip: 'Salve seu CV em JSON para recuperá-lo e editá-lo mais tarde.',
    history_empty: 'Nenhum CV no histórico', share_title: 'Compartilhar seu CV',
    share_desc: 'Este link contém todos os dados do seu CV. Nenhum dado é enviado a servidores.',
    copy_link: 'Copiar', link_copied: '✓ Link copiado!',
    preview_placeholder: 'Preencha o formulário para ver seu CV',
    select_language: 'Selecionar idioma', contact: 'Contato',
    company: 'Empresa', role: 'Cargo', start_date: 'Data de início', end_date: 'Data de término',
    current_position: 'Cargo atual', description: 'Descrição / Pontos-chave (um por linha)',
    school: 'Escola / Universidade', degree: 'Diploma', field: 'Área', grade: 'Nota',
    skill_category: 'Categoria', skill_items: 'Competências (separadas por vírgula)',
    cert_name: 'Nome da certificação', cert_issuer: 'Emissor', cert_date: 'Data',
    lang_name: 'Idioma', lang_level: 'Nível (ex: Nativo, B2)',
    load: 'Carregar', duplicate: 'Duplicar', delete: 'Excluir',
    pdf_generating: 'Gerando PDF…', pdf_done: 'PDF baixado!',
    present: 'Atual', unnamed: 'Sem título',
    projects: 'Projetos', add_project: 'Adicionar projeto', project_name: 'Nome do projeto',
    project_description: 'Descrição', project_url: 'URL do projeto', project_tech: 'Tecnologias utilizadas',
    volunteer: 'Voluntariado', add_volunteer: 'Adicionar experiência voluntária',
    volunteer_org: 'Organização', volunteer_role: 'Função',
    custom_section: 'Seção personalizada', add_custom_section: 'Adicionar seção personalizada',
    custom_section_title: 'Título da seção', custom_entry_title: 'Título', custom_entry_subtitle: 'Subtítulo',
    custom_entry_date: 'Data', custom_entry_desc: 'Descrição', add_custom_entry: 'Adicionar entrada',
    saved_indicator: 'Salvo', preview_cv: 'Ver meu CV',
    publications: 'Publicações', add_publication: 'Adicionar publicação',
    pub_title: 'Título', pub_authors: 'Autores', pub_venue: 'Revista / Conferência', pub_date: 'Data', pub_url: 'URL',
    references: 'Referências', add_reference: 'Adicionar referência',
    ref_name: 'Nome', ref_title: 'Cargo', ref_company: 'Empresa', ref_email: 'Email', ref_phone: 'Telefone',
    references_available: 'Referências disponíveis mediante solicitação',
    ats_checker: 'Pontuação ATS', ats_paste_job: 'Cole a descrição da vaga aqui', ats_analyze: 'Analisar',
    ats_score: 'Pontuação', ats_suggestions: 'Sugestões', ats_matched: 'Palavras-chave encontradas', ats_missing: 'Palavras-chave faltando',
    ats_add_keywords: 'Adicione estas palavras-chave ao seu CV', ats_add_section: 'Adicione ou complete a secção',
    ats_sec_summary: 'Resumo profissional', ats_sec_experience: 'Experiência profissional', ats_sec_skills: 'Competências', ats_sec_education: 'Formação', ats_sec_header: 'Nome e cargo',
    ats_fmt_chars: 'Remova caracteres especiais — os ATS podem não os ler', ats_fmt_date: 'Use um formato de data consistente (AAAA-MM)', ats_fmt_summary_long: 'Encurte o seu resumo (máx. 500 caracteres)', ats_fmt_summary_short: 'Expanda o seu resumo (mín. 30 caracteres)', ats_fmt_bullet: 'Encurte os tópicos (máx. 200 caracteres)', ats_fmt_few: 'Adicione mais tópicos à sua experiência', ats_fmt_contact: 'Adicione email ou número de telefone',
    content_helpers: 'Ajuda na redação', action_verbs: 'Verbos de ação', bullet_templates: 'Modelos de tópicos',
    weak_words_detected: 'Palavras fracas detectadas',
    download_docx: 'Baixar DOCX', drag_hint: 'Arraste para reordenar',
    font_size: 'Tamanho da fonte', spacing: 'Espaçamento', sidebar_width: 'Largura da barra lateral',
    section_visibility: 'Secções visíveis',
    demo_title: 'Dados de exemplo', demo_desc: 'substitua pelos seus', demo_clear: 'Limpar tudo',
  },
  it: {
    step_profile: 'Profilo', step_exp: 'Esperienze', step_edu: 'Formazione',
    step_skills: 'Competenze', step_extras: 'Extra',
    full_name: 'Nome completo *', job_title: 'Posizione *',
    summary: 'Riepilogo', phone: 'Telefono', email: 'Email', linkedin: 'LinkedIn', github: 'GitHub / Portfolio', city: 'Città / Paese',
    website: 'Sito web', add_photo: 'Aggiungi foto', remove_photo: 'Rimuovi foto',
    add_experience: 'Aggiungi esperienza', add_education: 'Aggiungi formazione',
    add_skill_group: 'Aggiungi categoria', add_certification: 'Aggiungi',
    add_language: 'Aggiungi lingua', certifications: 'Certificazioni',
    languages: 'Lingue', interests: 'Interessi',
    interests_placeholder: 'Viaggi, Fotografia, Sport… (separati da virgola)',
    design_options: 'Design & Opzioni', template: 'Modello',
    tpl_modern: 'Moderno', tpl_classic: 'Classico', tpl_bold: 'Grassetto', tpl_compact: 'Compatto',
    tpl_executive: 'Executive', tpl_creative: 'Creativo', tpl_technical: 'Tecnico',
    tpl_minimal: 'Minimale', tpl_academic: 'Accademico', tpl_infographic: 'Infografica',
    tpl_elegant: 'Elegante', tpl_twopage: 'Due pagine',
    accent_color: 'Colore accento', font: 'Font',
    show_photo: 'Mostra foto nel CV',
    previous: '← Precedente', next: 'Successivo →',
    history: 'Cronologia', share: 'Condividi', download: 'Scarica PDF',
    save_json: 'Salva', import_json: 'Importa', saved_json: 'CV salvato ✓', imported_json: 'CV importato ✓', import_error: 'File non valido',
    persist_tip: 'Salva il tuo CV in JSON per recuperarlo e modificarlo più tardi.',
    history_empty: 'Nessun CV nella cronologia', share_title: 'Condividi il tuo CV',
    share_desc: 'Questo link contiene tutti i dati del tuo CV. Nessun dato viene inviato a server.',
    copy_link: 'Copia', link_copied: '✓ Link copiato!',
    preview_placeholder: 'Compila il modulo per vedere il tuo CV',
    select_language: 'Seleziona lingua', contact: 'Contatto',
    company: 'Azienda', role: 'Posizione', start_date: 'Data inizio', end_date: 'Data fine',
    current_position: 'Posizione attuale', description: 'Descrizione / Punti chiave (uno per riga)',
    school: 'Scuola / Università', degree: 'Titolo', field: 'Campo', grade: 'Voto',
    skill_category: 'Categoria', skill_items: 'Competenze (separate da virgola)',
    cert_name: 'Nome certificazione', cert_issuer: 'Ente', cert_date: 'Data',
    lang_name: 'Lingua', lang_level: 'Livello (es: Madrelingua, B2)',
    load: 'Carica', duplicate: 'Duplica', delete: 'Elimina',
    pdf_generating: 'Generazione PDF…', pdf_done: 'PDF scaricato!',
    present: 'Attuale', unnamed: 'Senza titolo',
    projects: 'Progetti', add_project: 'Aggiungi progetto', project_name: 'Nome progetto',
    project_description: 'Descrizione', project_url: 'URL progetto', project_tech: 'Tecnologie utilizzate',
    volunteer: 'Volontariato', add_volunteer: 'Aggiungi esperienza di volontariato',
    volunteer_org: 'Organizzazione', volunteer_role: 'Ruolo',
    custom_section: 'Sezione personalizzata', add_custom_section: 'Aggiungi sezione personalizzata',
    custom_section_title: 'Titolo sezione', custom_entry_title: 'Titolo', custom_entry_subtitle: 'Sottotitolo',
    custom_entry_date: 'Data', custom_entry_desc: 'Descrizione', add_custom_entry: 'Aggiungi voce',
    saved_indicator: 'Salvato', preview_cv: 'Vedi CV',
    publications: 'Pubblicazioni', add_publication: 'Aggiungi pubblicazione',
    pub_title: 'Titolo', pub_authors: 'Autori', pub_venue: 'Rivista / Conferenza', pub_date: 'Data', pub_url: 'URL',
    references: 'Referenze', add_reference: 'Aggiungi referenza',
    ref_name: 'Nome', ref_title: 'Titolo / Posizione', ref_company: 'Azienda', ref_email: 'Email', ref_phone: 'Telefono',
    references_available: 'Referenze disponibili su richiesta',
    ats_checker: 'Punteggio ATS', ats_paste_job: 'Incolla la descrizione del lavoro qui', ats_analyze: 'Analizza',
    ats_score: 'Punteggio', ats_suggestions: 'Suggerimenti', ats_matched: 'Parole chiave trovate', ats_missing: 'Parole chiave mancanti',
    ats_add_keywords: 'Aggiungi queste parole chiave al tuo CV', ats_add_section: 'Aggiungi o completa la sezione',
    ats_sec_summary: 'Riepilogo professionale', ats_sec_experience: 'Esperienza lavorativa', ats_sec_skills: 'Competenze', ats_sec_education: 'Formazione', ats_sec_header: 'Nome e qualifica',
    ats_fmt_chars: 'Rimuovi i caratteri speciali — gli ATS potrebbero non leggerli', ats_fmt_date: 'Usa un formato data coerente (AAAA-MM)', ats_fmt_summary_long: 'Accorcia il riepilogo (max 500 caratteri)', ats_fmt_summary_short: 'Espandi il riepilogo (min 30 caratteri)', ats_fmt_bullet: 'Accorcia i punti elenco (max 200 caratteri)', ats_fmt_few: 'Aggiungi più punti elenco alle esperienze', ats_fmt_contact: 'Aggiungi email o numero di telefono',
    content_helpers: 'Aiuto scrittura', action_verbs: 'Verbi d\'azione', bullet_templates: 'Modelli di elenchi',
    weak_words_detected: 'Parole deboli rilevate',
    download_docx: 'Scarica DOCX', drag_hint: 'Trascina per riordinare',
    font_size: 'Dimensione carattere', spacing: 'Spaziatura', sidebar_width: 'Larghezza barra laterale',
    section_visibility: 'Sezioni visibili',
    demo_title: 'Dati di esempio', demo_desc: 'sostituiscili con i tuoi', demo_clear: 'Cancella tutto',
  },
  nl: {
    step_profile: 'Profiel', step_exp: 'Ervaring', step_edu: 'Opleiding',
    step_skills: 'Vaardigheden', step_extras: 'Extra',
    full_name: 'Volledige naam *', job_title: 'Functietitel *',
    summary: 'Samenvatting', phone: 'Telefoon', email: 'E-mail', linkedin: 'LinkedIn', github: 'GitHub / Portfolio', email: 'E-post', linkedin: 'LinkedIn', github: 'GitHub / Portfolio', city: 'Stad / Land',
    website: 'Website', add_photo: 'Foto toevoegen', remove_photo: 'Foto verwijderen',
    add_experience: 'Ervaring toevoegen', add_education: 'Opleiding toevoegen',
    add_skill_group: 'Categorie toevoegen', add_certification: 'Toevoegen',
    add_language: 'Taal toevoegen', certifications: 'Certificaten',
    languages: 'Talen', interests: 'Interesses',
    interests_placeholder: 'Reizen, Fotografie, Sport… (gescheiden door komma)',
    design_options: 'Ontwerp & Opties', template: 'Sjabloon',
    tpl_modern: 'Modern', tpl_classic: 'Klassiek', tpl_bold: 'Vet', tpl_compact: 'Compact',
    tpl_executive: 'Executive', tpl_creative: 'Creatief', tpl_technical: 'Technisch',
    tpl_minimal: 'Minimaal', tpl_academic: 'Academisch', tpl_infographic: 'Infographic',
    tpl_elegant: 'Elegant', tpl_twopage: 'Twee pagina\'s',
    accent_color: 'Accentkleur', font: 'Lettertype',
    show_photo: 'Foto tonen in CV',
    previous: '← Vorige', next: 'Volgende →',
    history: 'Geschiedenis', share: 'Delen', download: 'PDF downloaden',
    save_json: 'Opslaan', import_json: 'Importeren', saved_json: 'CV opgeslagen ✓', imported_json: 'CV geïmporteerd ✓', import_error: 'Ongeldig bestand',
    persist_tip: 'Sla je CV op als JSON om het later terug te vinden en te bewerken.',
    history_empty: 'Geen CV in geschiedenis', share_title: 'Deel je CV',
    share_desc: 'Deze link bevat al je CV-gegevens. Er worden geen gegevens naar een server gestuurd.',
    copy_link: 'Kopiëren', link_copied: '✓ Link gekopieerd!',
    preview_placeholder: 'Vul het formulier in om je CV te zien',
    select_language: 'Taal selecteren', contact: 'Contact',
    company: 'Bedrijf', role: 'Functie', start_date: 'Startdatum', end_date: 'Einddatum',
    current_position: 'Huidige functie', description: 'Beschrijving / Kernpunten (één per regel)',
    school: 'School / Universiteit', degree: 'Diploma', field: 'Richting', grade: 'Cijfer',
    skill_category: 'Categorie', skill_items: 'Vaardigheden (gescheiden door komma)',
    cert_name: 'Certificaatnaam', cert_issuer: 'Uitgever', cert_date: 'Datum',
    lang_name: 'Taal', lang_level: 'Niveau (bijv. Moedertaal, B2)',
    load: 'Laden', duplicate: 'Dupliceren', delete: 'Verwijderen',
    pdf_generating: 'PDF wordt aangemaakt…', pdf_done: 'PDF gedownload!',
    present: 'Heden', unnamed: 'Naamloos',
    projects: 'Projecten', add_project: 'Project toevoegen', project_name: 'Projectnaam',
    project_description: 'Beschrijving', project_url: 'Project-URL', project_tech: 'Gebruikte technologieën',
    volunteer: 'Vrijwilligerswerk', add_volunteer: 'Vrijwilligerswerk toevoegen',
    volunteer_org: 'Organisatie', volunteer_role: 'Rol',
    custom_section: 'Aangepaste sectie', add_custom_section: 'Sectie toevoegen',
    custom_section_title: 'Sectietitel', custom_entry_title: 'Titel', custom_entry_subtitle: 'Ondertitel',
    custom_entry_date: 'Datum', custom_entry_desc: 'Beschrijving', add_custom_entry: 'Item toevoegen',
    saved_indicator: 'Opgeslagen', preview_cv: 'CV bekijken',
    publications: 'Publicaties', add_publication: 'Publicatie toevoegen',
    pub_title: 'Titel', pub_authors: 'Auteurs', pub_venue: 'Tijdschrift / Conferentie', pub_date: 'Datum', pub_url: 'URL',
    references: 'Referenties', add_reference: 'Referentie toevoegen',
    ref_name: 'Naam', ref_title: 'Functie', ref_company: 'Bedrijf', ref_email: 'E-mail', ref_phone: 'Telefoon',
    references_available: 'Referenties beschikbaar op aanvraag',
    ats_checker: 'ATS-score', ats_paste_job: 'Plak hier de vacaturetekst', ats_analyze: 'Analyseren',
    ats_score: 'Score', ats_suggestions: 'Suggesties', ats_matched: 'Gevonden trefwoorden', ats_missing: 'Ontbrekende trefwoorden',
    ats_add_keywords: 'Voeg deze trefwoorden toe aan uw CV', ats_add_section: 'Voeg sectie toe of vul aan',
    ats_sec_summary: 'Professionele samenvatting', ats_sec_experience: 'Werkervaring', ats_sec_skills: 'Vaardigheden', ats_sec_education: 'Opleiding', ats_sec_header: 'Naam en functietitel',
    ats_fmt_chars: 'Verwijder speciale tekens — ATS kan ze mogelijk niet lezen', ats_fmt_date: 'Gebruik een consistent datumformaat (JJJJ-MM)', ats_fmt_summary_long: 'Verkort uw samenvatting (max 500 tekens)', ats_fmt_summary_short: 'Breid uw samenvatting uit (min 30 tekens)', ats_fmt_bullet: 'Verkort opsommingspunten (max 200 tekens)', ats_fmt_few: 'Voeg meer opsommingspunten toe', ats_fmt_contact: 'Voeg e-mail of telefoonnummer toe',
    download_docx: 'DOCX downloaden', drag_hint: 'Sleep om te herschikken',
    font_size: 'Lettergrootte', spacing: 'Afstand', sidebar_width: 'Zijbalkbreedte',
    section_visibility: 'Zichtbare secties',
    demo_title: 'Voorbeeldgegevens', demo_desc: 'vervang ze door die van jou', demo_clear: 'Alles wissen',
    content_helpers: 'Schrijfhulp', action_verbs: 'Actiewerkwoorden', bullet_templates: 'Opsommingssjablonen',
    weak_words_detected: 'Zwakke woorden gedetecteerd',
  },
  pl: {
    step_profile: 'Profil', step_exp: 'Doświadczenie', step_edu: 'Wykształcenie',
    step_skills: 'Umiejętności', step_extras: 'Dodatkowe',
    full_name: 'Imię i nazwisko *', job_title: 'Stanowisko *',
    summary: 'Podsumowanie', phone: 'Telefon', email: 'Email', linkedin: 'LinkedIn', github: 'GitHub / Portfolio', city: 'Miasto / Kraj',
    website: 'Strona www', add_photo: 'Dodaj zdjęcie', remove_photo: 'Usuń zdjęcie',
    add_experience: 'Dodaj doświadczenie', add_education: 'Dodaj wykształcenie',
    add_skill_group: 'Dodaj kategorię', add_certification: 'Dodaj',
    add_language: 'Dodaj język', certifications: 'Certyfikaty',
    languages: 'Języki', interests: 'Zainteresowania',
    interests_placeholder: 'Podróże, Fotografia, Sport… (oddzielone przecinkiem)',
    design_options: 'Wygląd & Opcje', template: 'Szablon',
    tpl_modern: 'Nowoczesny', tpl_classic: 'Klasyczny', tpl_bold: 'Pogrubiony', tpl_compact: 'Kompaktowy',
    tpl_executive: 'Executive', tpl_creative: 'Kreatywny', tpl_technical: 'Techniczny',
    tpl_minimal: 'Minimalny', tpl_academic: 'Akademicki', tpl_infographic: 'Infografika',
    tpl_elegant: 'Elegancki', tpl_twopage: 'Dwie strony',
    accent_color: 'Kolor akcentu', font: 'Czcionka',
    show_photo: 'Pokaż zdjęcie w CV',
    previous: '← Poprzedni', next: 'Dalej →',
    history: 'Historia', share: 'Udostępnij', download: 'Pobierz PDF',
    save_json: 'Zapisz', import_json: 'Importuj', saved_json: 'CV zapisane ✓', imported_json: 'CV zaimportowane ✓', import_error: 'Nieprawidłowy plik',
    persist_tip: 'Zapisz CV jako JSON, aby je później odzyskać i edytować.',
    history_empty: 'Brak CV w historii', share_title: 'Udostępnij CV',
    share_desc: 'Ten link zawiera wszystkie dane Twojego CV. Żadne dane nie są wysyłane na serwer.',
    copy_link: 'Kopiuj', link_copied: '✓ Link skopiowany!',
    preview_placeholder: 'Wypełnij formularz, aby zobaczyć CV',
    select_language: 'Wybierz język', contact: 'Kontakt',
    company: 'Firma', role: 'Stanowisko', start_date: 'Data rozpoczęcia', end_date: 'Data zakończenia',
    current_position: 'Obecne stanowisko', description: 'Opis / Kluczowe punkty (jeden na linię)',
    school: 'Szkoła / Uczelnia', degree: 'Stopień', field: 'Kierunek', grade: 'Ocena',
    skill_category: 'Kategoria', skill_items: 'Umiejętności (oddzielone przecinkiem)',
    cert_name: 'Nazwa certyfikatu', cert_issuer: 'Wydawca', cert_date: 'Data',
    lang_name: 'Język', lang_level: 'Poziom (np. Ojczysty, B2)',
    load: 'Załaduj', duplicate: 'Duplikuj', delete: 'Usuń',
    pdf_generating: 'Generowanie PDF…', pdf_done: 'PDF pobrany!',
    present: 'Obecnie', unnamed: 'Bez tytułu',
    projects: 'Projekty', add_project: 'Dodaj projekt', project_name: 'Nazwa projektu',
    project_description: 'Opis', project_url: 'URL projektu', project_tech: 'Użyte technologie',
    volunteer: 'Wolontariat', add_volunteer: 'Dodaj wolontariat',
    volunteer_org: 'Organizacja', volunteer_role: 'Rola',
    custom_section: 'Sekcja niestandardowa', add_custom_section: 'Dodaj sekcję',
    custom_section_title: 'Tytuł sekcji', custom_entry_title: 'Tytuł', custom_entry_subtitle: 'Podtytuł',
    custom_entry_date: 'Data', custom_entry_desc: 'Opis', add_custom_entry: 'Dodaj wpis',
    saved_indicator: 'Zapisano', preview_cv: 'Podgląd CV',
    publications: 'Publikacje', add_publication: 'Dodaj publikację',
    pub_title: 'Tytuł', pub_authors: 'Autorzy', pub_venue: 'Czasopismo / Konferencja', pub_date: 'Data', pub_url: 'URL',
    references: 'Referencje', add_reference: 'Dodaj referencję',
    ref_name: 'Imię', ref_title: 'Stanowisko', ref_company: 'Firma', ref_email: 'Email', ref_phone: 'Telefon',
    references_available: 'Referencje dostępne na żądanie',
    ats_checker: 'Wynik ATS', ats_paste_job: 'Wklej opis stanowiska tutaj', ats_analyze: 'Analizuj',
    ats_score: 'Wynik', ats_suggestions: 'Sugestie', ats_matched: 'Znalezione słowa kluczowe', ats_missing: 'Brakujące słowa kluczowe',
    ats_add_keywords: 'Dodaj te słowa kluczowe do swojego CV', ats_add_section: 'Dodaj lub uzupełnij sekcję',
    ats_sec_summary: 'Podsumowanie zawodowe', ats_sec_experience: 'Doświadczenie zawodowe', ats_sec_skills: 'Umiejętności', ats_sec_education: 'Wykształcenie', ats_sec_header: 'Imię i stanowisko',
    ats_fmt_chars: 'Usuń znaki specjalne — ATS może ich nie odczytać', ats_fmt_date: 'Używaj spójnego formatu daty (RRRR-MM)', ats_fmt_summary_long: 'Skróć podsumowanie (maks. 500 znaków)', ats_fmt_summary_short: 'Rozwiń podsumowanie (min. 30 znaków)', ats_fmt_bullet: 'Skróć punkty (maks. 200 znaków)', ats_fmt_few: 'Dodaj więcej punktów do doświadczenia', ats_fmt_contact: 'Dodaj email lub numer telefonu',
    download_docx: 'Pobierz DOCX', drag_hint: 'Przeciągnij, aby zmienić kolejność',
    font_size: 'Rozmiar czcionki', spacing: 'Odstępy', sidebar_width: 'Szerokość paska bocznego',
    section_visibility: 'Widoczne sekcje',
    demo_title: 'Przykładowe dane', demo_desc: 'zastąp swoimi', demo_clear: 'Wyczyść wszystko',
    content_helpers: 'Pomoc w pisaniu', action_verbs: 'Czasowniki akcji', bullet_templates: 'Szablony punktów',
    weak_words_detected: 'Wykryto słabe słowa',
  },
  tr: {
    step_profile: 'Profil', step_exp: 'Deneyim', step_edu: 'Eğitim',
    step_skills: 'Beceriler', step_extras: 'Ekstra',
    full_name: 'Ad Soyad *', job_title: 'Unvan *',
    summary: 'Özet', phone: 'Telefon', email: 'E-posta', linkedin: 'LinkedIn', github: 'GitHub / Portföy', city: 'Şehir / Ülke',
    website: 'Web sitesi', add_photo: 'Fotoğraf ekle', remove_photo: 'Fotoğrafı kaldır',
    add_experience: 'Deneyim ekle', add_education: 'Eğitim ekle',
    add_skill_group: 'Kategori ekle', add_certification: 'Ekle',
    add_language: 'Dil ekle', certifications: 'Sertifikalar',
    languages: 'Diller', interests: 'İlgi Alanları',
    interests_placeholder: 'Seyahat, Fotoğrafçılık, Spor… (virgülle ayırın)',
    design_options: 'Tasarım & Seçenekler', template: 'Şablon',
    tpl_modern: 'Modern', tpl_classic: 'Klasik', tpl_bold: 'Kalın', tpl_compact: 'Kompakt',
    tpl_executive: 'Yönetici', tpl_creative: 'Yaratıcı', tpl_technical: 'Teknik',
    tpl_minimal: 'Minimal', tpl_academic: 'Akademik', tpl_infographic: 'İnfografik',
    tpl_elegant: 'Zarif', tpl_twopage: 'İki sayfa',
    accent_color: 'Vurgu rengi', font: 'Yazı tipi',
    show_photo: 'CV\'de fotoğraf göster',
    previous: '← Önceki', next: 'Sonraki →',
    history: 'Geçmiş', share: 'Paylaş', download: 'PDF İndir',
    save_json: 'Kaydet', import_json: 'İçe aktar', saved_json: 'CV kaydedildi ✓', imported_json: 'CV içe aktarıldı ✓', import_error: 'Geçersiz dosya',
    persist_tip: 'CV\'nizi JSON olarak kaydederek daha sonra geri alın ve düzenleyin.',
    history_empty: 'Geçmişte CV yok', share_title: 'CV\'nizi paylaşın',
    share_desc: 'Bu bağlantı tüm CV verilerinizi içerir. Hiçbir veri sunucuya gönderilmez.',
    copy_link: 'Kopyala', link_copied: '✓ Bağlantı kopyalandı!',
    preview_placeholder: 'CV\'nizi görmek için formu doldurun',
    select_language: 'Dil seçin', contact: 'İletişim',
    company: 'Şirket', role: 'Pozisyon', start_date: 'Başlangıç tarihi', end_date: 'Bitiş tarihi',
    current_position: 'Mevcut pozisyon', description: 'Açıklama / Ana noktalar (satır başına bir)',
    school: 'Okul / Üniversite', degree: 'Derece', field: 'Alan', grade: 'Not',
    skill_category: 'Kategori', skill_items: 'Beceriler (virgülle ayırın)',
    cert_name: 'Sertifika adı', cert_issuer: 'Veren kurum', cert_date: 'Tarih',
    lang_name: 'Dil', lang_level: 'Seviye (ör: Anadil, B2)',
    load: 'Yükle', duplicate: 'Çoğalt', delete: 'Sil',
    pdf_generating: 'PDF oluşturuluyor…', pdf_done: 'PDF indirildi!',
    present: 'Devam ediyor', unnamed: 'Adsız',
    projects: 'Projeler', add_project: 'Proje ekle', project_name: 'Proje adı',
    project_description: 'Açıklama', project_url: 'Proje URL', project_tech: 'Kullanılan teknolojiler',
    volunteer: 'Gönüllülük', add_volunteer: 'Gönüllü deneyim ekle',
    volunteer_org: 'Organizasyon', volunteer_role: 'Rol',
    custom_section: 'Özel bölüm', add_custom_section: 'Bölüm ekle',
    custom_section_title: 'Bölüm başlığı', custom_entry_title: 'Başlık', custom_entry_subtitle: 'Alt başlık',
    custom_entry_date: 'Tarih', custom_entry_desc: 'Açıklama', add_custom_entry: 'Giriş ekle',
    saved_indicator: 'Kaydedildi', preview_cv: 'CV\'yi görüntüle',
    publications: 'Yayınlar', add_publication: 'Yayın ekle',
    pub_title: 'Başlık', pub_authors: 'Yazarlar', pub_venue: 'Dergi / Konferans', pub_date: 'Tarih', pub_url: 'URL',
    references: 'Referanslar', add_reference: 'Referans ekle',
    ref_name: 'Ad', ref_title: 'Unvan', ref_company: 'Şirket', ref_email: 'E-posta', ref_phone: 'Telefon',
    references_available: 'Referanslar talep üzerine sunulabilir',
    ats_checker: 'ATS Puanı', ats_paste_job: 'İş tanımını buraya yapıştırın', ats_analyze: 'Analiz et',
    ats_score: 'Puan', ats_suggestions: 'Öneriler', ats_matched: 'Bulunan anahtar kelimeler', ats_missing: 'Eksik anahtar kelimeler',
    ats_add_keywords: 'Bu anahtar kelimeleri CV\'nize ekleyin', ats_add_section: 'Bölüm ekleyin veya tamamlayın',
    ats_sec_summary: 'Profesyonel özet', ats_sec_experience: 'İş deneyimi', ats_sec_skills: 'Beceriler', ats_sec_education: 'Eğitim', ats_sec_header: 'Ad ve unvan',
    ats_fmt_chars: 'Özel karakterleri kaldırın — ATS bunları okuyamayabilir', ats_fmt_date: 'Tutarlı tarih formatı kullanın (YYYY-AA)', ats_fmt_summary_long: 'Özetinizi kısaltın (maks. 500 karakter)', ats_fmt_summary_short: 'Özetinizi genişletin (min. 30 karakter)', ats_fmt_bullet: 'Madde işaretlerini kısaltın (maks. 200 karakter)', ats_fmt_few: 'Deneyiminize daha fazla madde ekleyin', ats_fmt_contact: 'E-posta veya telefon numarası ekleyin',
    download_docx: 'DOCX İndir', drag_hint: 'Yeniden sıralamak için sürükleyin',
    font_size: 'Yazı boyutu', spacing: 'Aralık', sidebar_width: 'Kenar çubuğu genişliği',
    section_visibility: 'Görünür bölümler',
    demo_title: 'Örnek veriler', demo_desc: 'kendi verilerinizle değiştirin', demo_clear: 'Tümünü temizle',
    content_helpers: 'Yazma yardımı', action_verbs: 'Eylem fiilleri', bullet_templates: 'Madde şablonları',
    weak_words_detected: 'Zayıf kelimeler tespit edildi',
  },
  zh: {
    step_profile: '个人资料', step_exp: '工作经历', step_edu: '教育背景',
    step_skills: '技能', step_extras: '其他',
    full_name: '姓名 *', job_title: '职位 *',
    summary: '个人简介', phone: '电话', email: '电子邮件', linkedin: 'LinkedIn', github: 'GitHub / 作品集', city: '城市 / 国家',
    website: '网站', add_photo: '添加照片', remove_photo: '删除照片',
    add_experience: '添加工作经历', add_education: '添加教育背景',
    add_skill_group: '添加分类', add_certification: '添加',
    add_language: '添加语言', certifications: '证书',
    languages: '语言', interests: '兴趣爱好',
    interests_placeholder: '旅行、摄影、运动…（逗号分隔）',
    design_options: '设计与选项', template: '模板',
    tpl_modern: '现代', tpl_classic: '经典', tpl_bold: '醒目', tpl_compact: '紧凑',
    tpl_executive: '高管', tpl_creative: '创意', tpl_technical: '技术',
    tpl_minimal: '极简', tpl_academic: '学术', tpl_infographic: '信息图',
    tpl_elegant: '优雅', tpl_twopage: '双页',
    accent_color: '主题色', font: '字体',
    show_photo: '在简历中显示照片',
    previous: '← 上一步', next: '下一步 →',
    history: '历史记录', share: '分享', download: '下载PDF',
    save_json: '保存', import_json: '导入', saved_json: '简历已保存 ✓', imported_json: '简历已导入 ✓', import_error: '文件无效',
    persist_tip: '将简历保存为JSON格式，以便日后恢复和编辑。',
    history_empty: '暂无历史记录', share_title: '分享您的简历',
    share_desc: '此链接包含您的所有简历数据。不会将任何数据发送到服务器。',
    copy_link: '复制', link_copied: '✓ 链接已复制！',
    preview_placeholder: '填写表单以预览您的简历',
    select_language: '选择语言', contact: '联系方式',
    company: '公司', role: '职位', start_date: '开始日期', end_date: '结束日期',
    current_position: '在职', description: '描述 / 要点（每行一条）',
    school: '学校 / 大学', degree: '学位', field: '专业', grade: '成绩',
    skill_category: '分类', skill_items: '技能（逗号分隔）',
    cert_name: '证书名称', cert_issuer: '颁发机构', cert_date: '日期',
    lang_name: '语言', lang_level: '水平（如：母语、B2）',
    load: '加载', duplicate: '复制', delete: '删除',
    pdf_generating: '正在生成PDF…', pdf_done: 'PDF已下载！',
    present: '至今', unnamed: '未命名',
    projects: '项目', add_project: '添加项目', project_name: '项目名称',
    project_description: '描述', project_url: '项目链接', project_tech: '使用技术',
    volunteer: '志愿服务', add_volunteer: '添加志愿经历',
    volunteer_org: '组织', volunteer_role: '角色',
    custom_section: '自定义栏目', add_custom_section: '添加自定义栏目',
    custom_section_title: '栏目标题', custom_entry_title: '标题', custom_entry_subtitle: '副标题',
    custom_entry_date: '日期', custom_entry_desc: '描述', add_custom_entry: '添加条目',
    saved_indicator: '已保存', preview_cv: '预览简历',
    publications: '发表论文', add_publication: '添加论文',
    pub_title: '标题', pub_authors: '作者', pub_venue: '期刊 / 会议', pub_date: '日期', pub_url: '链接',
    references: '推荐人', add_reference: '添加推荐人',
    ref_name: '姓名', ref_title: '职位', ref_company: '公司', ref_email: '邮箱', ref_phone: '电话',
    references_available: '推荐人信息可应要求提供',
    ats_checker: 'ATS评分', ats_paste_job: '在此粘贴职位描述', ats_analyze: '分析',
    ats_score: '评分', ats_suggestions: '建议', ats_matched: '匹配的关键词', ats_missing: '缺少的关键词',
    ats_add_keywords: '将这些关键词添加到您的简历中', ats_add_section: '添加或完善此部分',
    ats_sec_summary: '职业摘要', ats_sec_experience: '工作经历', ats_sec_skills: '技能', ats_sec_education: '教育背景', ats_sec_header: '姓名和职位',
    ats_fmt_chars: '删除特殊字符——ATS可能无法识别', ats_fmt_date: '使用一致的日期格式（YYYY-MM）', ats_fmt_summary_long: '缩短摘要（最多500字符）', ats_fmt_summary_short: '扩展摘要（至少30字符）', ats_fmt_bullet: '缩短要点（最多200字符）', ats_fmt_few: '为您的经历添加更多要点', ats_fmt_contact: '添加邮箱或电话号码',
    download_docx: '下载DOCX', drag_hint: '拖动排序',
    font_size: '字体大小', spacing: '间距', sidebar_width: '侧栏宽度',
    section_visibility: '可见部分',
    demo_title: '示例数据', demo_desc: '请替换为您的数据', demo_clear: '清除全部',
    content_helpers: '写作助手', action_verbs: '动作动词', bullet_templates: '要点模板',
    weak_words_detected: '检测到弱词',
  },
  ja: {
    step_profile: 'プロフィール', step_exp: '職歴', step_edu: '学歴',
    step_skills: 'スキル', step_extras: 'その他',
    full_name: '氏名 *', job_title: '職種 *',
    summary: '概要', phone: '電話番号', city: '都市 / 国',
    website: 'ウェブサイト', add_photo: '写真を追加', remove_photo: '写真を削除',
    add_experience: '職歴を追加', add_education: '学歴を追加',
    add_skill_group: 'カテゴリを追加', add_certification: '追加',
    add_language: '言語を追加', certifications: '資格',
    languages: '言語', interests: '趣味',
    interests_placeholder: '旅行、写真、スポーツ…（カンマ区切り）',
    design_options: 'デザイン＆オプション', template: 'テンプレート',
    tpl_modern: 'モダン', tpl_classic: 'クラシック', tpl_bold: 'ボールド', tpl_compact: 'コンパクト',
    tpl_executive: 'エグゼクティブ', tpl_creative: 'クリエイティブ', tpl_technical: 'テクニカル',
    tpl_minimal: 'ミニマル', tpl_academic: 'アカデミック', tpl_infographic: 'インフォグラフィック',
    tpl_elegant: 'エレガント', tpl_twopage: '2ページ',
    accent_color: 'アクセントカラー', font: 'フォント',
    show_photo: '履歴書に写真を表示',
    previous: '← 前へ', next: '次へ →',
    history: '履歴', share: '共有', download: 'PDFダウンロード',
    save_json: '保存', import_json: 'インポート', saved_json: 'CV保存完了 ✓', imported_json: 'CVインポート完了 ✓', import_error: '無効なファイル',
    persist_tip: 'CVをJSON形式で保存して、後で復元・編集できます。',
    history_empty: '履歴にCVがありません', share_title: 'CVを共有',
    share_desc: 'このリンクにはすべてのCVデータが含まれています。サーバーにデータは送信されません。',
    copy_link: 'コピー', link_copied: '✓ リンクをコピーしました！',
    preview_placeholder: 'フォームに入力してCVをプレビュー',
    select_language: '言語を選択', contact: '連絡先',
    company: '会社名', role: '役職', start_date: '開始日', end_date: '終了日',
    current_position: '現職', description: '説明 / ポイント（1行に1つ）',
    school: '学校 / 大学', degree: '学位', field: '専攻', grade: '成績',
    skill_category: 'カテゴリ', skill_items: 'スキル（カンマ区切り）',
    cert_name: '資格名', cert_issuer: '発行機関', cert_date: '日付',
    lang_name: '言語', lang_level: 'レベル（例：ネイティブ、B2）',
    load: '読込', duplicate: '複製', delete: '削除',
    pdf_generating: 'PDF生成中…', pdf_done: 'PDFダウンロード完了！',
    present: '現在', unnamed: '無題',
    projects: 'プロジェクト', add_project: 'プロジェクトを追加', project_name: 'プロジェクト名',
    project_description: '説明', project_url: 'プロジェクトURL', project_tech: '使用技術',
    volunteer: 'ボランティア', add_volunteer: 'ボランティア経験を追加',
    volunteer_org: '団体名', volunteer_role: '役割',
    custom_section: 'カスタムセクション', add_custom_section: 'セクションを追加',
    custom_section_title: 'セクション名', custom_entry_title: 'タイトル', custom_entry_subtitle: 'サブタイトル',
    custom_entry_date: '日付', custom_entry_desc: '説明', add_custom_entry: '項目を追加',
    saved_indicator: '保存済み', preview_cv: 'CVを表示',
    publications: '出版物', add_publication: '出版物を追加',
    pub_title: 'タイトル', pub_authors: '著者', pub_venue: '学会 / 雑誌', pub_date: '日付', pub_url: 'URL',
    references: '推薦者', add_reference: '推薦者を追加',
    ref_name: '氏名', ref_title: '役職', ref_company: '会社名', ref_email: 'メール', ref_phone: '電話',
    references_available: '推薦者情報はご要望に応じて提供いたします',
    ats_checker: 'ATSスコア', ats_paste_job: '求人情報をここに貼り付け', ats_analyze: '分析',
    ats_score: 'スコア', ats_suggestions: '提案', ats_matched: '一致したキーワード', ats_missing: '不足キーワード',
    ats_add_keywords: 'これらのキーワードを履歴書に追加してください', ats_add_section: 'セクションを追加または完成させてください',
    ats_sec_summary: '職務要約', ats_sec_experience: '職務経歴', ats_sec_skills: 'スキル', ats_sec_education: '学歴', ats_sec_header: '氏名と職種',
    ats_fmt_chars: '特殊文字を削除してください — ATSが読み取れない場合があります', ats_fmt_date: '一貫した日付形式を使用してください（YYYY-MM）', ats_fmt_summary_long: '要約を短くしてください（最大500文字）', ats_fmt_summary_short: '要約を拡充してください（最低30文字）', ats_fmt_bullet: '箇条書きを短くしてください（最大200文字）', ats_fmt_few: '経歴にもっと箇条書きを追加してください', ats_fmt_contact: 'メールアドレスまたは電話番号を追加してください',
    download_docx: 'DOCXダウンロード', drag_hint: 'ドラッグして並べ替え',
    font_size: 'フォントサイズ', spacing: '間隔', sidebar_width: 'サイドバー幅',
    section_visibility: '表示セクション',
    demo_title: 'サンプルデータ', demo_desc: 'ご自身のデータに置き換えてください', demo_clear: 'すべてクリア',
    content_helpers: '文章作成支援', action_verbs: 'アクション動詞', bullet_templates: '箇条書きテンプレート',
    weak_words_detected: '弱い表現が検出されました',
  },
  ko: {
    step_profile: '프로필', step_exp: '경력', step_edu: '학력',
    step_skills: '기술', step_extras: '기타',
    full_name: '이름 *', job_title: '직함 *',
    summary: '요약', phone: '전화번호', email: '이메일', linkedin: 'LinkedIn', github: 'GitHub / 포트폴리오', city: '도시 / 국가',
    website: '웹사이트', add_photo: '사진 추가', remove_photo: '사진 삭제',
    add_experience: '경력 추가', add_education: '학력 추가',
    add_skill_group: '카테고리 추가', add_certification: '추가',
    add_language: '언어 추가', certifications: '자격증',
    languages: '언어', interests: '관심사',
    interests_placeholder: '여행, 사진, 스포츠… (쉼표로 구분)',
    design_options: '디자인 & 옵션', template: '템플릿',
    tpl_modern: '모던', tpl_classic: '클래식', tpl_bold: '볼드', tpl_compact: '컴팩트',
    tpl_executive: '이그제큐티브', tpl_creative: '크리에이티브', tpl_technical: '테크니컬',
    tpl_minimal: '미니멀', tpl_academic: '아카데믹', tpl_infographic: '인포그래픽',
    tpl_elegant: '엘레강트', tpl_twopage: '2페이지',
    accent_color: '강조 색상', font: '글꼴',
    show_photo: '이력서에 사진 표시',
    previous: '← 이전', next: '다음 →',
    history: '기록', share: '공유', download: 'PDF 다운로드',
    save_json: '저장', import_json: '가져오기', saved_json: 'CV 저장됨 ✓', imported_json: 'CV 가져옴 ✓', import_error: '잘못된 파일',
    persist_tip: 'CV를 JSON으로 저장하여 나중에 복원하고 편집하세요.',
    history_empty: '기록에 CV 없음', share_title: 'CV 공유',
    share_desc: '이 링크에는 모든 CV 데이터가 포함됩니다. 서버로 전송되는 데이터는 없습니다.',
    copy_link: '복사', link_copied: '✓ 링크 복사됨!',
    preview_placeholder: 'CV를 보려면 양식을 작성하세요',
    select_language: '언어 선택', contact: '연락처',
    company: '회사', role: '직위', start_date: '시작일', end_date: '종료일',
    current_position: '현재 직위', description: '설명 / 핵심 사항 (줄당 하나)',
    school: '학교 / 대학', degree: '학위', field: '전공', grade: '성적',
    skill_category: '카테고리', skill_items: '기술 (쉼표로 구분)',
    cert_name: '자격증명', cert_issuer: '발급기관', cert_date: '날짜',
    lang_name: '언어', lang_level: '수준 (예: 원어민, B2)',
    load: '불러오기', duplicate: '복제', delete: '삭제',
    pdf_generating: 'PDF 생성 중…', pdf_done: 'PDF 다운로드 완료!',
    present: '현재', unnamed: '제목 없음',
    projects: '프로젝트', add_project: '프로젝트 추가', project_name: '프로젝트명',
    project_description: '설명', project_url: '프로젝트 URL', project_tech: '사용 기술',
    volunteer: '봉사활동', add_volunteer: '봉사활동 추가',
    volunteer_org: '단체명', volunteer_role: '역할',
    custom_section: '사용자 정의 섹션', add_custom_section: '섹션 추가',
    custom_section_title: '섹션 제목', custom_entry_title: '제목', custom_entry_subtitle: '부제',
    custom_entry_date: '날짜', custom_entry_desc: '설명', add_custom_entry: '항목 추가',
    saved_indicator: '저장됨', preview_cv: 'CV 미리보기',
    publications: '출판물', add_publication: '출판물 추가',
    pub_title: '제목', pub_authors: '저자', pub_venue: '학술지 / 학회', pub_date: '날짜', pub_url: 'URL',
    references: '추천인', add_reference: '추천인 추가',
    ref_name: '이름', ref_title: '직함', ref_company: '회사', ref_email: '이메일', ref_phone: '전화',
    references_available: '추천인 정보는 요청 시 제공 가능합니다',
    ats_checker: 'ATS 점수', ats_paste_job: '채용 공고를 여기에 붙여넣기', ats_analyze: '분석',
    ats_score: '점수', ats_suggestions: '제안', ats_matched: '일치 키워드', ats_missing: '누락 키워드',
    ats_add_keywords: '이력서에 이 키워드를 추가하세요', ats_add_section: '섹션을 추가하거나 완성하세요',
    ats_sec_summary: '직무 요약', ats_sec_experience: '경력', ats_sec_skills: '기술', ats_sec_education: '학력', ats_sec_header: '이름 및 직함',
    ats_fmt_chars: '특수 문자를 제거하세요 — ATS가 읽지 못할 수 있습니다', ats_fmt_date: '일관된 날짜 형식을 사용하세요 (YYYY-MM)', ats_fmt_summary_long: '요약을 줄이세요 (최대 500자)', ats_fmt_summary_short: '요약을 확장하세요 (최소 30자)', ats_fmt_bullet: '항목을 줄이세요 (최대 200자)', ats_fmt_few: '경력에 항목을 더 추가하세요', ats_fmt_contact: '이메일 또는 전화번호를 추가하세요',
    download_docx: 'DOCX 다운로드', drag_hint: '드래그하여 재정렬',
    font_size: '글꼴 크기', spacing: '간격', sidebar_width: '사이드바 너비',
    section_visibility: '표시할 섹션',
    demo_title: '샘플 데이터', demo_desc: '본인 데이터로 교체하세요', demo_clear: '모두 지우기',
    content_helpers: '작성 도움', action_verbs: '행동 동사', bullet_templates: '항목 템플릿',
    weak_words_detected: '약한 표현 감지됨',
  },
  hi: {
    step_profile: 'प्रोफ़ाइल', step_exp: 'अनुभव', step_edu: 'शिक्षा',
    step_skills: 'कौशल', step_extras: 'अतिरिक्त',
    full_name: 'पूरा नाम *', job_title: 'पद *',
    summary: 'सारांश', phone: 'फ़ोन', email: 'ईमेल', linkedin: 'LinkedIn', github: 'GitHub / पोर्टफोलियो', city: 'शहर / देश',
    website: 'वेबसाइट', add_photo: 'फ़ोटो जोड़ें', remove_photo: 'फ़ोटो हटाएं',
    add_experience: 'अनुभव जोड़ें', add_education: 'शिक्षा जोड़ें',
    add_skill_group: 'श्रेणी जोड़ें', add_certification: 'जोड़ें',
    add_language: 'भाषा जोड़ें', certifications: 'प्रमाणपत्र',
    languages: 'भाषाएं', interests: 'रुचियां',
    interests_placeholder: 'यात्रा, फ़ोटोग्राफ़ी, खेल… (अल्पविराम से अलग)',
    design_options: 'डिज़ाइन और विकल्प', template: 'टेम्पलेट',
    tpl_modern: 'मॉडर्न', tpl_classic: 'क्लासिक', tpl_bold: 'बोल्ड', tpl_compact: 'कॉम्पैक्ट',
    tpl_executive: 'एग्ज़ीक्यूटिव', tpl_creative: 'क्रिएटिव', tpl_technical: 'टेक्निकल',
    tpl_minimal: 'मिनिमल', tpl_academic: 'अकादमिक', tpl_infographic: 'इन्फ़ोग्राफ़िक',
    tpl_elegant: 'एलिगेंट', tpl_twopage: 'दो पृष्ठ',
    accent_color: 'एक्सेंट रंग', font: 'फ़ॉन्ट',
    show_photo: 'CV में फ़ोटो दिखाएं',
    previous: '← पिछला', next: 'अगला →',
    history: 'इतिहास', share: 'साझा करें', download: 'PDF डाउनलोड',
    save_json: 'सहेजें', import_json: 'आयात', saved_json: 'CV सहेजा गया ✓', imported_json: 'CV आयात किया गया ✓', import_error: 'अमान्य फ़ाइल',
    persist_tip: 'अपना CV JSON में सहेजें ताकि बाद में पुनर्प्राप्त और संपादित कर सकें।',
    history_empty: 'इतिहास में कोई CV नहीं', share_title: 'अपना CV साझा करें',
    share_desc: 'इस लिंक में आपके सभी CV डेटा हैं। कोई डेटा सर्वर पर नहीं भेजा जाता।',
    copy_link: 'कॉपी', link_copied: '✓ लिंक कॉपी हो गया!',
    preview_placeholder: 'अपना CV देखने के लिए फ़ॉर्म भरें',
    select_language: 'भाषा चुनें', contact: 'संपर्क',
    company: 'कंपनी', role: 'पद', start_date: 'प्रारंभ तिथि', end_date: 'समाप्ति तिथि',
    current_position: 'वर्तमान पद', description: 'विवरण / मुख्य बिंदु (प्रति पंक्ति एक)',
    school: 'स्कूल / विश्वविद्यालय', degree: 'डिग्री', field: 'क्षेत्र', grade: 'ग्रेड',
    skill_category: 'श्रेणी', skill_items: 'कौशल (अल्पविराम से अलग)',
    cert_name: 'प्रमाणपत्र नाम', cert_issuer: 'जारीकर्ता', cert_date: 'तिथि',
    lang_name: 'भाषा', lang_level: 'स्तर (जैसे: मातृभाषा, B2)',
    load: 'लोड', duplicate: 'डुप्लिकेट', delete: 'हटाएं',
    pdf_generating: 'PDF बन रहा है…', pdf_done: 'PDF डाउनलोड हो गया!',
    present: 'वर्तमान', unnamed: 'शीर्षकहीन',
    projects: 'प्रोजेक्ट', add_project: 'प्रोजेक्ट जोड़ें', project_name: 'प्रोजेक्ट नाम',
    project_description: 'विवरण', project_url: 'प्रोजेक्ट URL', project_tech: 'प्रयुक्त तकनीकें',
    volunteer: 'स्वयंसेवा', add_volunteer: 'स्वयंसेवा अनुभव जोड़ें',
    volunteer_org: 'संगठन', volunteer_role: 'भूमिका',
    custom_section: 'कस्टम अनुभाग', add_custom_section: 'अनुभाग जोड़ें',
    custom_section_title: 'अनुभाग शीर्षक', custom_entry_title: 'शीर्षक', custom_entry_subtitle: 'उपशीर्षक',
    custom_entry_date: 'तिथि', custom_entry_desc: 'विवरण', add_custom_entry: 'प्रविष्टि जोड़ें',
    saved_indicator: 'सहेजा गया', preview_cv: 'CV देखें',
    publications: 'प्रकाशन', add_publication: 'प्रकाशन जोड़ें',
    pub_title: 'शीर्षक', pub_authors: 'लेखक', pub_venue: 'पत्रिका / सम्मेलन', pub_date: 'तिथि', pub_url: 'URL',
    references: 'संदर्भ', add_reference: 'संदर्भ जोड़ें',
    ref_name: 'नाम', ref_title: 'पद', ref_company: 'कंपनी', ref_email: 'ईमेल', ref_phone: 'फ़ोन',
    references_available: 'संदर्भ अनुरोध पर उपलब्ध',
    ats_checker: 'ATS स्कोर', ats_paste_job: 'नौकरी विवरण यहां चिपकाएं', ats_analyze: 'विश्लेषण',
    ats_score: 'स्कोर', ats_suggestions: 'सुझाव', ats_matched: 'मिले कीवर्ड', ats_missing: 'गायब कीवर्ड',
    ats_add_keywords: 'इन कीवर्ड को अपने CV में जोड़ें', ats_add_section: 'अनुभाग जोड़ें या पूरा करें',
    ats_sec_summary: 'पेशेवर सारांश', ats_sec_experience: 'कार्य अनुभव', ats_sec_skills: 'कौशल', ats_sec_education: 'शिक्षा', ats_sec_header: 'नाम और पद',
    ats_fmt_chars: 'विशेष वर्ण हटाएं — ATS उन्हें पढ़ नहीं सकता', ats_fmt_date: 'एक सुसंगत तिथि प्रारूप का उपयोग करें (YYYY-MM)', ats_fmt_summary_long: 'अपना सारांश छोटा करें (अधिकतम 500 वर्ण)', ats_fmt_summary_short: 'अपना सारांश विस्तृत करें (न्यूनतम 30 वर्ण)', ats_fmt_bullet: 'बुलेट पॉइंट छोटे करें (अधिकतम 200 वर्ण)', ats_fmt_few: 'अपने अनुभव में और बुलेट पॉइंट जोड़ें', ats_fmt_contact: 'ईमेल या फोन नंबर जोड़ें',
    download_docx: 'DOCX डाउनलोड', drag_hint: 'क्रम बदलने के लिए खींचें',
    font_size: 'फ़ॉन्ट आकार', spacing: 'अंतराल', sidebar_width: 'साइडबार चौड़ाई',
    section_visibility: 'दृश्य अनुभाग',
    demo_title: 'नमूना डेटा', demo_desc: 'अपने डेटा से बदलें', demo_clear: 'सब मिटाएं',
    content_helpers: 'लेखन सहायता', action_verbs: 'क्रिया शब्द', bullet_templates: 'बुलेट टेम्पलेट',
    weak_words_detected: 'कमज़ोर शब्द पाए गए',
  },
  ar: {
    step_profile: 'الملف الشخصي', step_exp: 'الخبرات', step_edu: 'التعليم',
    step_skills: 'المهارات', step_extras: 'إضافات',
    full_name: 'الاسم الكامل *', job_title: 'المسمى الوظيفي *',
    summary: 'الملخص', phone: 'الهاتف', email: 'البريد الإلكتروني', linkedin: 'LinkedIn', github: 'GitHub / معرض الأعمال', city: 'المدينة / البلد',
    website: 'الموقع الإلكتروني', add_photo: 'إضافة صورة', remove_photo: 'إزالة الصورة',
    add_experience: 'إضافة خبرة', add_education: 'إضافة تعليم',
    add_skill_group: 'إضافة فئة', add_certification: 'إضافة',
    add_language: 'إضافة لغة', certifications: 'الشهادات',
    languages: 'اللغات', interests: 'الاهتمامات',
    interests_placeholder: 'السفر، التصوير، الرياضة… (مفصولة بفواصل)',
    design_options: 'التصميم والخيارات', template: 'القالب',
    tpl_modern: 'عصري', tpl_classic: 'كلاسيكي', tpl_bold: 'عريض', tpl_compact: 'مضغوط',
    tpl_executive: 'تنفيذي', tpl_creative: 'إبداعي', tpl_technical: 'تقني',
    tpl_minimal: 'بسيط', tpl_academic: 'أكاديمي', tpl_infographic: 'إنفوغرافيك',
    tpl_elegant: 'أنيق', tpl_twopage: 'صفحتان',
    accent_color: 'لون التمييز', font: 'الخط',
    show_photo: 'إظهار الصورة في السيرة الذاتية',
    previous: '← السابق', next: 'التالي →',
    history: 'السجل', share: 'مشاركة', download: 'تحميل PDF',
    save_json: 'حفظ', import_json: 'استيراد', saved_json: 'تم حفظ السيرة ✓', imported_json: 'تم استيراد السيرة ✓', import_error: 'ملف غير صالح',
    persist_tip: 'احفظ سيرتك الذاتية بصيغة JSON لاسترجاعها وتعديلها لاحقاً.',
    history_empty: 'لا توجد سير ذاتية في السجل', share_title: 'مشاركة سيرتك الذاتية',
    share_desc: 'يحتوي هذا الرابط على جميع بيانات سيرتك الذاتية. لا يتم إرسال أي بيانات إلى خادم.',
    copy_link: 'نسخ', link_copied: '✓ تم نسخ الرابط!',
    preview_placeholder: 'املأ النموذج لعرض سيرتك الذاتية',
    select_language: 'اختر اللغة', contact: 'التواصل',
    company: 'الشركة', role: 'المنصب', start_date: 'تاريخ البدء', end_date: 'تاريخ الانتهاء',
    current_position: 'المنصب الحالي', description: 'الوصف / النقاط الرئيسية (واحدة لكل سطر)',
    school: 'المدرسة / الجامعة', degree: 'الدرجة', field: 'التخصص', grade: 'التقدير',
    skill_category: 'الفئة', skill_items: 'المهارات (مفصولة بفواصل)',
    cert_name: 'اسم الشهادة', cert_issuer: 'الجهة المانحة', cert_date: 'التاريخ',
    lang_name: 'اللغة', lang_level: 'المستوى (مثل: لغة أم، B2)',
    load: 'تحميل', duplicate: 'تكرار', delete: 'حذف',
    pdf_generating: 'جارٍ إنشاء PDF…', pdf_done: 'تم تحميل PDF!',
    present: 'حتى الآن', unnamed: 'بدون عنوان',
    projects: 'المشاريع', add_project: 'إضافة مشروع', project_name: 'اسم المشروع',
    project_description: 'الوصف', project_url: 'رابط المشروع', project_tech: 'التقنيات المستخدمة',
    volunteer: 'التطوع', add_volunteer: 'إضافة تجربة تطوعية',
    volunteer_org: 'المنظمة', volunteer_role: 'الدور',
    custom_section: 'قسم مخصص', add_custom_section: 'إضافة قسم مخصص',
    custom_section_title: 'عنوان القسم', custom_entry_title: 'العنوان', custom_entry_subtitle: 'العنوان الفرعي',
    custom_entry_date: 'التاريخ', custom_entry_desc: 'الوصف', add_custom_entry: 'إضافة إدخال',
    saved_indicator: 'تم الحفظ', preview_cv: 'عرض السيرة الذاتية',
    publications: 'المنشورات', add_publication: 'إضافة منشور',
    pub_title: 'العنوان', pub_authors: 'المؤلفون', pub_venue: 'المجلة / المؤتمر', pub_date: 'التاريخ', pub_url: 'الرابط',
    references: 'المراجع', add_reference: 'إضافة مرجع',
    ref_name: 'الاسم', ref_title: 'المنصب', ref_company: 'الشركة', ref_email: 'البريد الإلكتروني', ref_phone: 'الهاتف',
    references_available: 'المراجع متاحة عند الطلب',
    ats_checker: 'نتيجة ATS', ats_paste_job: 'الصق وصف الوظيفة هنا', ats_analyze: 'تحليل',
    ats_score: 'النتيجة', ats_suggestions: 'اقتراحات', ats_matched: 'كلمات مفتاحية موجودة', ats_missing: 'كلمات مفتاحية مفقودة',
    ats_add_keywords: 'أضف هذه الكلمات المفتاحية إلى سيرتك الذاتية', ats_add_section: 'أضف أو أكمل القسم',
    ats_sec_summary: 'الملخص المهني', ats_sec_experience: 'الخبرة العملية', ats_sec_skills: 'المهارات', ats_sec_education: 'التعليم', ats_sec_header: 'الاسم والمسمى الوظيفي',
    ats_fmt_chars: 'أزل الأحرف الخاصة — قد لا يتمكن ATS من قراءتها', ats_fmt_date: 'استخدم تنسيق تاريخ موحد (YYYY-MM)', ats_fmt_summary_long: 'اختصر الملخص (حد أقصى 500 حرف)', ats_fmt_summary_short: 'وسّع الملخص (حد أدنى 30 حرف)', ats_fmt_bullet: 'اختصر النقاط (حد أقصى 200 حرف)', ats_fmt_few: 'أضف المزيد من النقاط لخبراتك', ats_fmt_contact: 'أضف البريد الإلكتروني أو رقم الهاتف',
    download_docx: 'تحميل DOCX', drag_hint: 'اسحب لإعادة الترتيب',
    font_size: 'حجم الخط', spacing: 'التباعد', sidebar_width: 'عرض الشريط الجانبي',
    section_visibility: 'الأقسام المرئية',
    demo_title: 'بيانات تجريبية', demo_desc: 'استبدلها ببياناتك', demo_clear: 'مسح الكل',
    content_helpers: 'مساعدة الكتابة', action_verbs: 'أفعال العمل', bullet_templates: 'قوالب النقاط',
    weak_words_detected: 'تم اكتشاف كلمات ضعيفة',
  },
  ru: {
    step_profile: 'Профиль', step_exp: 'Опыт работы', step_edu: 'Образование',
    step_skills: 'Навыки', step_extras: 'Дополнительно',
    full_name: 'Полное имя *', job_title: 'Должность *',
    summary: 'О себе', phone: 'Телефон', email: 'Email', linkedin: 'LinkedIn', github: 'GitHub / Портфолио', city: 'Город / Страна',
    website: 'Веб-сайт', add_photo: 'Добавить фото', remove_photo: 'Удалить фото',
    add_experience: 'Добавить опыт', add_education: 'Добавить образование',
    add_skill_group: 'Добавить категорию', add_certification: 'Добавить',
    add_language: 'Добавить язык', certifications: 'Сертификаты',
    languages: 'Языки', interests: 'Интересы',
    interests_placeholder: 'Путешествия, фото, спорт… (через запятую)',
    design_options: 'Дизайн и опции', template: 'Шаблон',
    tpl_modern: 'Современный', tpl_classic: 'Классический', tpl_bold: 'Жирный', tpl_compact: 'Компактный',
    tpl_executive: 'Исполнительный', tpl_creative: 'Креативный', tpl_technical: 'Технический',
    tpl_minimal: 'Минималистичный', tpl_academic: 'Академический', tpl_infographic: 'Инфографика',
    tpl_elegant: 'Элегантный', tpl_twopage: 'Две страницы',
    accent_color: 'Цвет акцента', font: 'Шрифт',
    show_photo: 'Показать фото в резюме',
    previous: '← Назад', next: 'Далее →',
    history: 'История', share: 'Поделиться', download: 'Скачать PDF',
    save_json: 'Сохранить', import_json: 'Импортировать', saved_json: 'Резюме сохранено ✓', imported_json: 'Резюме импортировано ✓', import_error: 'Неверный файл',
    persist_tip: 'Сохраните резюме в JSON, чтобы вернуться к нему позже.',
    history_empty: 'Нет резюме в истории', share_title: 'Поделиться резюме',
    share_desc: 'Эта ссылка содержит все данные вашего резюме. Данные не отправляются на сервер.',
    copy_link: 'Копировать', link_copied: '✓ Ссылка скопирована!',
    preview_placeholder: 'Заполните форму, чтобы увидеть резюме',
    select_language: 'Выбрать язык', contact: 'Контакты',
    company: 'Компания', role: 'Должность', start_date: 'Дата начала', end_date: 'Дата окончания',
    current_position: 'Текущая должность', description: 'Описание / Ключевые пункты (по одному на строку)',
    school: 'Школа / Университет', degree: 'Степень', field: 'Специальность', grade: 'Оценка',
    skill_category: 'Категория', skill_items: 'Навыки (через запятую)',
    cert_name: 'Название сертификата', cert_issuer: 'Организация', cert_date: 'Дата',
    lang_name: 'Язык', lang_level: 'Уровень (например: родной, B2)',
    load: 'Загрузить', duplicate: 'Дублировать', delete: 'Удалить',
    pdf_generating: 'Генерация PDF…', pdf_done: 'PDF загружен!',
    present: 'Настоящее время', unnamed: 'Без названия',
    projects: 'Проекты', add_project: 'Добавить проект', project_name: 'Название проекта',
    project_description: 'Описание', project_url: 'URL проекта', project_tech: 'Использованные технологии',
    volunteer: 'Волонтёрство', add_volunteer: 'Добавить волонтёрский опыт',
    volunteer_org: 'Организация', volunteer_role: 'Роль',
    custom_section: 'Пользовательский раздел', add_custom_section: 'Добавить раздел',
    custom_section_title: 'Название раздела', custom_entry_title: 'Заголовок', custom_entry_subtitle: 'Подзаголовок',
    custom_entry_date: 'Дата', custom_entry_desc: 'Описание', add_custom_entry: 'Добавить запись',
    saved_indicator: 'Сохранено', preview_cv: 'Просмотр резюме',
    publications: 'Публикации', add_publication: 'Добавить публикацию',
    pub_title: 'Название', pub_authors: 'Авторы', pub_venue: 'Журнал / Конференция', pub_date: 'Дата', pub_url: 'URL',
    references: 'Рекомендации', add_reference: 'Добавить рекомендацию',
    ref_name: 'Имя', ref_title: 'Должность', ref_company: 'Компания', ref_email: 'Email', ref_phone: 'Телефон',
    references_available: 'Рекомендации предоставляются по запросу',
    ats_checker: 'ATS Оценка', ats_paste_job: 'Вставьте описание вакансии', ats_analyze: 'Анализировать',
    ats_score: 'Оценка', ats_suggestions: 'Предложения', ats_matched: 'Найденные ключевые слова', ats_missing: 'Отсутствующие ключевые слова',
    ats_add_keywords: 'Добавьте эти ключевые слова в резюме', ats_add_section: 'Добавьте или дополните раздел',
    ats_sec_summary: 'Профессиональное резюме', ats_sec_experience: 'Опыт работы', ats_sec_skills: 'Навыки', ats_sec_education: 'Образование', ats_sec_header: 'Имя и должность',
    ats_fmt_chars: 'Удалите специальные символы — ATS может их не прочитать', ats_fmt_date: 'Используйте единый формат даты (YYYY-MM)', ats_fmt_summary_long: 'Сократите резюме (макс. 500 символов)', ats_fmt_summary_short: 'Расширьте резюме (мин. 30 символов)', ats_fmt_bullet: 'Сократите пункты (макс. 200 символов)', ats_fmt_few: 'Добавьте больше пунктов к опыту', ats_fmt_contact: 'Добавьте email или номер телефона',
    download_docx: 'Скачать DOCX', drag_hint: 'Перетащите для изменения порядка',
    font_size: 'Размер шрифта', spacing: 'Интервал', sidebar_width: 'Ширина боковой панели',
    section_visibility: 'Видимые разделы',
    demo_title: 'Демо данные', demo_desc: 'замените их своими', demo_clear: 'Очистить всё',
    content_helpers: 'Помощь в написании', action_verbs: 'Глаголы действия', bullet_templates: 'Шаблоны пунктов',
    weak_words_detected: 'Обнаружены слабые слова',
  },
  he: {
    step_profile: 'פרופיל', step_exp: 'ניסיון', step_edu: 'השכלה',
    step_skills: 'כישורים', step_extras: 'נוספים',
    full_name: 'שם מלא *', job_title: 'תפקיד *',
    summary: 'תקציר', phone: 'טלפון', email: 'אימייל', linkedin: 'LinkedIn', github: 'GitHub / תיק עבודות', city: 'עיר / מדינה',
    website: 'אתר', add_photo: 'הוסף תמונה', remove_photo: 'הסר תמונה',
    add_experience: 'הוסף ניסיון', add_education: 'הוסף השכלה',
    add_skill_group: 'הוסף קטגוריה', add_certification: 'הוסף',
    add_language: 'הוסף שפה', certifications: 'תעודות',
    languages: 'שפות', interests: 'תחומי עניין',
    interests_placeholder: 'טיולים, צילום, ספורט... (מופרדים בפסיקים)',
    design_options: 'עיצוב ואפשרויות', template: 'תבנית',
    tpl_modern: 'מודרני', tpl_classic: 'קלאסי', tpl_bold: 'מודגש', tpl_compact: 'קומפקטי',
    tpl_executive: 'ניהולי', tpl_creative: 'יצירתי', tpl_technical: 'טכני',
    tpl_minimal: 'מינימליסטי', tpl_academic: 'אקדמי', tpl_infographic: 'אינפוגרפי',
    tpl_elegant: 'אלגנטי', tpl_twopage: 'שני עמודים',
    accent_color: 'צבע מבטא', font: 'גופן',
    show_photo: 'הצג תמונה בקורות חיים',
    previous: '← הקודם', next: 'הבא →',
    history: 'היסטוריה', share: 'שיתוף', download: 'הורד PDF',
    save_json: 'שמור', import_json: 'ייבא', saved_json: 'קורות חיים נשמרו ✓', imported_json: 'קורות חיים יובאו ✓', import_error: 'קובץ לא תקין',
    persist_tip: 'שמור את קורות החיים שלך בפורמט JSON כדי לשחזר ולערוך מאוחר יותר.',
    history_empty: 'אין קורות חיים בהיסטוריה', share_title: 'שתף את קורות החיים',
    share_desc: 'קישור זה מכיל את כל הנתונים של קורות החיים שלך. אין נתונים נשלחים לשרת.',
    copy_link: 'העתק', link_copied: '✓ הקישור הועתק!',
    preview_placeholder: 'מלא את הטופס כדי לראות את קורות החיים',
    select_language: 'בחר שפה', contact: 'יצירת קשר',
    company: 'חברה', role: 'תפקיד', start_date: 'תאריך התחלה', end_date: 'תאריך סיום',
    current_position: 'תפקיד נוכחי', description: 'תיאור / נקודות מפתח (אחת בכל שורה)',
    school: 'בית ספר / אוניברסיטה', degree: 'תואר', field: 'תחום', grade: 'ציון',
    skill_category: 'קטגוריה', skill_items: 'כישורים (מופרדים בפסיקים)',
    cert_name: 'שם התעודה', cert_issuer: 'ארגון', cert_date: 'תאריך',
    lang_name: 'שפה', lang_level: 'רמה (למשל: שפת אם, B2)',
    load: 'טען', duplicate: 'שכפל', delete: 'מחק',
    pdf_generating: 'מייצר PDF…', pdf_done: 'PDF הורד!',
    present: 'היום', unnamed: 'ללא שם',
    projects: 'פרויקטים', add_project: 'הוסף פרויקט', project_name: 'שם הפרויקט',
    project_description: 'תיאור', project_url: 'כתובת URL', project_tech: 'טכנולוגיות בשימוש',
    volunteer: 'התנדבות', add_volunteer: 'הוסף ניסיון התנדבותי',
    volunteer_org: 'ארגון', volunteer_role: 'תפקיד',
    custom_section: 'סעיף מותאם', add_custom_section: 'הוסף סעיף מותאם',
    custom_section_title: 'כותרת הסעיף', custom_entry_title: 'כותרת', custom_entry_subtitle: 'כותרת משנה',
    custom_entry_date: 'תאריך', custom_entry_desc: 'תיאור', add_custom_entry: 'הוסף רשומה',
    saved_indicator: 'נשמר', preview_cv: 'הצג קורות חיים',
    publications: 'פרסומים', add_publication: 'הוסף פרסום',
    pub_title: 'כותרת', pub_authors: 'מחברים', pub_venue: 'כתב עת / כנס', pub_date: 'תאריך', pub_url: 'URL',
    references: 'המלצות', add_reference: 'הוסף המלצה',
    ref_name: 'שם', ref_title: 'תפקיד', ref_company: 'חברה', ref_email: 'אימייל', ref_phone: 'טלפון',
    references_available: 'המלצות זמינות על פי בקשה',
    ats_checker: 'ציון ATS', ats_paste_job: 'הדבק את תיאור המשרה', ats_analyze: 'נתח',
    ats_score: 'ציון', ats_suggestions: 'הצעות', ats_matched: 'מילות מפתח שנמצאו', ats_missing: 'מילות מפתח חסרות',
    ats_add_keywords: 'הוסף מילות מפתח אלו לקורות החיים', ats_add_section: 'הוסף או השלם את הסעיף',
    ats_sec_summary: 'תקציר מקצועי', ats_sec_experience: 'ניסיון תעסוקתי', ats_sec_skills: 'כישורים', ats_sec_education: 'השכלה', ats_sec_header: 'שם ותפקיד',
    ats_fmt_chars: 'הסר תווים מיוחדים — ATS עלול לא לקרוא אותם', ats_fmt_date: 'השתמש בפורמט תאריך אחיד (YYYY-MM)', ats_fmt_summary_long: 'קצר את התקציר (מקס׳ 500 תווים)', ats_fmt_summary_short: 'הרחב את התקציר (מינ׳ 30 תווים)', ats_fmt_bullet: 'קצר את הנקודות (מקס׳ 200 תווים)', ats_fmt_few: 'הוסף יותר נקודות לניסיון שלך', ats_fmt_contact: 'הוסף אימייל או מספר טלפון',
    download_docx: 'הורד DOCX', drag_hint: 'גרור כדי לשנות סדר',
    font_size: 'גודל גופן', spacing: 'ריווח', sidebar_width: 'רוחב סרגל צדדי',
    section_visibility: 'סעיפים גלויים',
    demo_title: 'נתונים לדוגמה', demo_desc: 'החלף אותם בשלך', demo_clear: 'נקה הכל',
    content_helpers: 'עזרה בכתיבה', action_verbs: 'פעלי פעולה', bullet_templates: 'תבניות נקודות',
    weak_words_detected: 'זוהו מילים חלשות',
  },
  sv: {
    step_profile: 'Profil', step_exp: 'Erfarenhet', step_edu: 'Utbildning',
    step_skills: 'Färdigheter', step_extras: 'Övrigt',
    full_name: 'Fullständigt namn *', job_title: 'Jobbtitel *',
    summary: 'Sammanfattning', phone: 'Telefon', email: 'E-mail', linkedin: 'LinkedIn', github: 'GitHub / Portfolio', email: 'E-post', linkedin: 'LinkedIn', github: 'GitHub / Portfolio', city: 'Stad / Land',
    website: 'Webbplats', add_photo: 'Lägg till foto', remove_photo: 'Ta bort foto',
    add_experience: 'Lägg till erfarenhet', add_education: 'Lägg till utbildning',
    add_skill_group: 'Lägg till kategori', add_certification: 'Lägg till',
    add_language: 'Lägg till språk', certifications: 'Certifieringar',
    languages: 'Språk', interests: 'Intressen',
    interests_placeholder: 'Resor, foto, sport… (kommaseparerade)',
    design_options: 'Design & Inställningar', template: 'Mall',
    tpl_modern: 'Modern', tpl_classic: 'Klassisk', tpl_bold: 'Fet', tpl_compact: 'Kompakt',
    tpl_executive: 'Exekutiv', tpl_creative: 'Kreativ', tpl_technical: 'Teknisk',
    tpl_minimal: 'Minimalistisk', tpl_academic: 'Akademisk', tpl_infographic: 'Infografisk',
    tpl_elegant: 'Elegant', tpl_twopage: 'Två sidor',
    accent_color: 'Accentfärg', font: 'Typsnitt',
    show_photo: 'Visa foto i CV',
    previous: '← Föregående', next: 'Nästa →',
    history: 'Historik', share: 'Dela', download: 'Ladda ner PDF',
    save_json: 'Spara', import_json: 'Importera', saved_json: 'CV sparat ✓', imported_json: 'CV importerat ✓', import_error: 'Ogiltig fil',
    persist_tip: 'Spara ditt CV som JSON för att hämta och uppdatera det senare.',
    history_empty: 'Inga CV i historiken', share_title: 'Dela ditt CV',
    share_desc: 'Denna länk innehåller alla dina CV-uppgifter. Ingen data skickas till en server.',
    copy_link: 'Kopiera', link_copied: '✓ Länk kopierad!',
    preview_placeholder: 'Fyll i formuläret för att se ditt CV',
    select_language: 'Välj språk', contact: 'Kontakt',
    company: 'Företag', role: 'Roll', start_date: 'Startdatum', end_date: 'Slutdatum',
    current_position: 'Nuvarande position', description: 'Beskrivning / Viktiga punkter (en per rad)',
    school: 'Skola / Universitet', degree: 'Examen', field: 'Område', grade: 'Betyg',
    skill_category: 'Kategori', skill_items: 'Färdigheter (kommaseparerade)',
    cert_name: 'Certifieringsnamn', cert_issuer: 'Utfärdare', cert_date: 'Datum',
    lang_name: 'Språk', lang_level: 'Nivå (t.ex. modersmål, B2)',
    load: 'Ladda', duplicate: 'Duplicera', delete: 'Ta bort',
    pdf_generating: 'Skapar PDF…', pdf_done: 'PDF nedladdad!',
    present: 'Nutid', unnamed: 'Utan titel',
    projects: 'Projekt', add_project: 'Lägg till projekt', project_name: 'Projektnamn',
    project_description: 'Beskrivning', project_url: 'Projekt-URL', project_tech: 'Använda teknologier',
    volunteer: 'Volontärarbete', add_volunteer: 'Lägg till volontärarbete',
    volunteer_org: 'Organisation', volunteer_role: 'Roll',
    custom_section: 'Anpassad sektion', add_custom_section: 'Lägg till anpassad sektion',
    custom_section_title: 'Sektionens titel', custom_entry_title: 'Titel', custom_entry_subtitle: 'Undertitel',
    custom_entry_date: 'Datum', custom_entry_desc: 'Beskrivning', add_custom_entry: 'Lägg till post',
    saved_indicator: 'Sparat', preview_cv: 'Visa mitt CV',
    publications: 'Publikationer', add_publication: 'Lägg till publikation',
    pub_title: 'Titel', pub_authors: 'Författare', pub_venue: 'Tidskrift / Konferens', pub_date: 'Datum', pub_url: 'URL',
    references: 'Referenser', add_reference: 'Lägg till referens',
    ref_name: 'Namn', ref_title: 'Titel', ref_company: 'Företag', ref_email: 'E-post', ref_phone: 'Telefon',
    references_available: 'Referenser tillgängliga på begäran',
    ats_checker: 'ATS-poäng', ats_paste_job: 'Klistra in jobbannonsen här', ats_analyze: 'Analysera',
    ats_score: 'Poäng', ats_suggestions: 'Förslag', ats_matched: 'Matchade nyckelord', ats_missing: 'Saknade nyckelord',
    ats_add_keywords: 'Lägg till dessa nyckelord i ditt CV', ats_add_section: 'Lägg till eller komplettera sektionen',
    ats_sec_summary: 'Professionell sammanfattning', ats_sec_experience: 'Arbetslivserfarenhet', ats_sec_skills: 'Färdigheter', ats_sec_education: 'Utbildning', ats_sec_header: 'Namn och titel',
    ats_fmt_chars: 'Ta bort specialtecken — ATS kanske inte läser dem', ats_fmt_date: 'Använd enhetligt datumformat (YYYY-MM)', ats_fmt_summary_long: 'Förkorta sammanfattningen (max 500 tecken)', ats_fmt_summary_short: 'Utöka sammanfattningen (min 30 tecken)', ats_fmt_bullet: 'Förkorta punkterna (max 200 tecken)', ats_fmt_few: 'Lägg till fler punkter till dina erfarenheter', ats_fmt_contact: 'Lägg till e-post eller telefonnummer',
    download_docx: 'Ladda ner DOCX', drag_hint: 'Dra för att ändra ordning',
    font_size: 'Teckenstorlek', spacing: 'Avstånd', sidebar_width: 'Sidofältets bredd',
    section_visibility: 'Synliga sektioner',
    demo_title: 'Exempeldata', demo_desc: 'ersätt med din egen', demo_clear: 'Rensa allt',
    content_helpers: 'Skrivhjälp', action_verbs: 'Aktionsverb', bullet_templates: 'Punktmallar',
    weak_words_detected: 'Svaga ord upptäckta',
  },
  id: {
    step_profile: 'Profil', step_exp: 'Pengalaman', step_edu: 'Pendidikan',
    step_skills: 'Keterampilan', step_extras: 'Tambahan',
    full_name: 'Nama lengkap *', job_title: 'Jabatan *',
    summary: 'Ringkasan', phone: 'Telepon', email: 'Email', linkedin: 'LinkedIn', github: 'GitHub / Portofolio', city: 'Kota / Negara',
    website: 'Website', add_photo: 'Tambah foto', remove_photo: 'Hapus foto',
    add_experience: 'Tambah pengalaman', add_education: 'Tambah pendidikan',
    add_skill_group: 'Tambah kategori', add_certification: 'Tambah',
    add_language: 'Tambah bahasa', certifications: 'Sertifikasi',
    languages: 'Bahasa', interests: 'Minat',
    interests_placeholder: 'Traveling, fotografi, olahraga… (pisahkan dengan koma)',
    design_options: 'Desain & Opsi', template: 'Template',
    tpl_modern: 'Modern', tpl_classic: 'Klasik', tpl_bold: 'Tebal', tpl_compact: 'Kompak',
    tpl_executive: 'Eksekutif', tpl_creative: 'Kreatif', tpl_technical: 'Teknis',
    tpl_minimal: 'Minimalis', tpl_academic: 'Akademis', tpl_infographic: 'Infografis',
    tpl_elegant: 'Elegan', tpl_twopage: 'Dua halaman',
    accent_color: 'Warna aksen', font: 'Font',
    show_photo: 'Tampilkan foto di CV',
    previous: '← Sebelumnya', next: 'Selanjutnya →',
    history: 'Riwayat', share: 'Bagikan', download: 'Unduh PDF',
    save_json: 'Simpan', import_json: 'Impor', saved_json: 'CV tersimpan ✓', imported_json: 'CV diimpor ✓', import_error: 'File tidak valid',
    persist_tip: 'Simpan CV Anda sebagai JSON untuk mengambil dan memperbarui nanti.',
    history_empty: 'Tidak ada CV dalam riwayat', share_title: 'Bagikan CV Anda',
    share_desc: 'Link ini berisi semua data CV Anda. Tidak ada data yang dikirim ke server.',
    copy_link: 'Salin', link_copied: '✓ Link disalin!',
    preview_placeholder: 'Isi formulir untuk melihat CV Anda',
    select_language: 'Pilih bahasa', contact: 'Kontak',
    company: 'Perusahaan', role: 'Jabatan', start_date: 'Tanggal mulai', end_date: 'Tanggal selesai',
    current_position: 'Posisi saat ini', description: 'Deskripsi / Poin kunci (satu per baris)',
    school: 'Sekolah / Universitas', degree: 'Gelar', field: 'Bidang', grade: 'Nilai',
    skill_category: 'Kategori', skill_items: 'Keterampilan (pisahkan dengan koma)',
    cert_name: 'Nama sertifikasi', cert_issuer: 'Penerbit', cert_date: 'Tanggal',
    lang_name: 'Bahasa', lang_level: 'Tingkat (misal: asli, B2)',
    load: 'Muat', duplicate: 'Duplikat', delete: 'Hapus',
    pdf_generating: 'Membuat PDF…', pdf_done: 'PDF terunduh!',
    present: 'Sekarang', unnamed: 'Tanpa judul',
    projects: 'Proyek', add_project: 'Tambah proyek', project_name: 'Nama proyek',
    project_description: 'Deskripsi', project_url: 'URL proyek', project_tech: 'Teknologi yang digunakan',
    volunteer: 'Sukarelawan', add_volunteer: 'Tambah pengalaman sukarelawan',
    volunteer_org: 'Organisasi', volunteer_role: 'Peran',
    custom_section: 'Bagian kustom', add_custom_section: 'Tambah bagian kustom',
    custom_section_title: 'Judul bagian', custom_entry_title: 'Judul', custom_entry_subtitle: 'Subjudul',
    custom_entry_date: 'Tanggal', custom_entry_desc: 'Deskripsi', add_custom_entry: 'Tambah entri',
    saved_indicator: 'Tersimpan', preview_cv: 'Lihat CV saya',
    publications: 'Publikasi', add_publication: 'Tambah publikasi',
    pub_title: 'Judul', pub_authors: 'Penulis', pub_venue: 'Jurnal / Konferensi', pub_date: 'Tanggal', pub_url: 'URL',
    references: 'Referensi', add_reference: 'Tambah referensi',
    ref_name: 'Nama', ref_title: 'Jabatan', ref_company: 'Perusahaan', ref_email: 'Email', ref_phone: 'Telepon',
    references_available: 'Referensi tersedia berdasarkan permintaan',
    ats_checker: 'Skor ATS', ats_paste_job: 'Tempel deskripsi pekerjaan di sini', ats_analyze: 'Analisis',
    ats_score: 'Skor', ats_suggestions: 'Saran', ats_matched: 'Kata kunci cocok', ats_missing: 'Kata kunci kurang',
    ats_add_keywords: 'Tambahkan kata kunci ini ke CV Anda', ats_add_section: 'Tambahkan atau lengkapi bagian',
    ats_sec_summary: 'Ringkasan profesional', ats_sec_experience: 'Pengalaman kerja', ats_sec_skills: 'Keterampilan', ats_sec_education: 'Pendidikan', ats_sec_header: 'Nama dan jabatan',
    ats_fmt_chars: 'Hapus karakter khusus — ATS mungkin tidak membacanya', ats_fmt_date: 'Gunakan format tanggal konsisten (YYYY-MM)', ats_fmt_summary_long: 'Persingkat ringkasan (maks 500 karakter)', ats_fmt_summary_short: 'Perluas ringkasan (min 30 karakter)', ats_fmt_bullet: 'Persingkat poin (maks 200 karakter)', ats_fmt_few: 'Tambahkan lebih banyak poin pada pengalaman Anda', ats_fmt_contact: 'Tambahkan email atau nomor telepon',
    download_docx: 'Unduh DOCX', drag_hint: 'Seret untuk mengatur ulang',
    font_size: 'Ukuran font', spacing: 'Jarak', sidebar_width: 'Lebar sidebar',
    section_visibility: 'Bagian terlihat',
    demo_title: 'Data contoh', demo_desc: 'ganti dengan milik Anda', demo_clear: 'Hapus semua',
    content_helpers: 'Bantuan penulisan', action_verbs: 'Kata kerja aksi', bullet_templates: 'Template poin',
    weak_words_detected: 'Kata lemah terdeteksi',
  },
  ro: {
    step_profile: 'Profil', step_exp: 'Experiență', step_edu: 'Educație',
    step_skills: 'Competențe', step_extras: 'Extra',
    full_name: 'Nume complet *', job_title: 'Titlu post *',
    summary: 'Rezumat', phone: 'Telefon', email: 'Email', linkedin: 'LinkedIn', github: 'GitHub / Portofoliu', city: 'Oraș / Țară',
    website: 'Website', add_photo: 'Adaugă fotografie', remove_photo: 'Elimină fotografia',
    add_experience: 'Adaugă experiență', add_education: 'Adaugă educație',
    add_skill_group: 'Adaugă categorie', add_certification: 'Adaugă',
    add_language: 'Adaugă limbă', certifications: 'Certificări',
    languages: 'Limbi', interests: 'Interese',
    interests_placeholder: 'Călătorii, fotografie, sport… (separate prin virgulă)',
    design_options: 'Design & Opțiuni', template: 'Șablon',
    tpl_modern: 'Modern', tpl_classic: 'Classic', tpl_bold: 'Îngroșat', tpl_compact: 'Compact',
    tpl_executive: 'Executiv', tpl_creative: 'Creativ', tpl_technical: 'Tehnic',
    tpl_minimal: 'Minimalist', tpl_academic: 'Academic', tpl_infographic: 'Infografic',
    tpl_elegant: 'Elegant', tpl_twopage: 'Două pagini',
    accent_color: 'Culoare accent', font: 'Font',
    show_photo: 'Afișează fotografia în CV',
    previous: '← Anterior', next: 'Următorul →',
    history: 'Istoric', share: 'Partajează', download: 'Descarcă PDF',
    save_json: 'Salvează', import_json: 'Importă', saved_json: 'CV salvat ✓', imported_json: 'CV importat ✓', import_error: 'Fișier invalid',
    persist_tip: 'Salvează CV-ul ca JSON pentru a-l recupera și actualiza mai târziu.',
    history_empty: 'Niciun CV în istoric', share_title: 'Partajează CV-ul',
    share_desc: 'Acest link conține toate datele CV-ului tău. Nicio dată nu este trimisă pe server.',
    copy_link: 'Copiază', link_copied: '✓ Link copiat!',
    preview_placeholder: 'Completează formularul pentru a vedea CV-ul',
    select_language: 'Selectează limba', contact: 'Contact',
    company: 'Companie', role: 'Rol', start_date: 'Data începerii', end_date: 'Data încheierii',
    current_position: 'Poziție curentă', description: 'Descriere / Puncte cheie (unul pe linie)',
    school: 'Școală / Universitate', degree: 'Diplomă', field: 'Domeniu', grade: 'Notă',
    skill_category: 'Categorie', skill_items: 'Competențe (separate prin virgulă)',
    cert_name: 'Nume certificare', cert_issuer: 'Emitent', cert_date: 'Data',
    lang_name: 'Limbă', lang_level: 'Nivel (ex: nativ, B2)',
    load: 'Încarcă', duplicate: 'Duplică', delete: 'Șterge',
    pdf_generating: 'Generare PDF…', pdf_done: 'PDF descărcat!',
    present: 'Prezent', unnamed: 'Fără titlu',
    projects: 'Proiecte', add_project: 'Adaugă proiect', project_name: 'Nume proiect',
    project_description: 'Descriere', project_url: 'URL proiect', project_tech: 'Tehnologii utilizate',
    volunteer: 'Voluntariat', add_volunteer: 'Adaugă experiență voluntariat',
    volunteer_org: 'Organizație', volunteer_role: 'Rol',
    custom_section: 'Secțiune personalizată', add_custom_section: 'Adaugă secțiune personalizată',
    custom_section_title: 'Titlu secțiune', custom_entry_title: 'Titlu', custom_entry_subtitle: 'Subtitlu',
    custom_entry_date: 'Data', custom_entry_desc: 'Descriere', add_custom_entry: 'Adaugă intrare',
    saved_indicator: 'Salvat', preview_cv: 'Vizualizează CV-ul',
    publications: 'Publicații', add_publication: 'Adaugă publicație',
    pub_title: 'Titlu', pub_authors: 'Autori', pub_venue: 'Revistă / Conferință', pub_date: 'Data', pub_url: 'URL',
    references: 'Referințe', add_reference: 'Adaugă referință',
    ref_name: 'Nume', ref_title: 'Titlu', ref_company: 'Companie', ref_email: 'Email', ref_phone: 'Telefon',
    references_available: 'Referințe disponibile la cerere',
    ats_checker: 'Scor ATS', ats_paste_job: 'Lipește descrierea postului aici', ats_analyze: 'Analizează',
    ats_score: 'Scor', ats_suggestions: 'Sugestii', ats_matched: 'Cuvinte cheie găsite', ats_missing: 'Cuvinte cheie lipsă',
    ats_add_keywords: 'Adaugă aceste cuvinte cheie în CV', ats_add_section: 'Adaugă sau completează secțiunea',
    ats_sec_summary: 'Rezumat profesional', ats_sec_experience: 'Experiență profesională', ats_sec_skills: 'Competențe', ats_sec_education: 'Educație', ats_sec_header: 'Nume și titlu',
    ats_fmt_chars: 'Elimină caracterele speciale — ATS s-ar putea să nu le citească', ats_fmt_date: 'Folosește un format de dată consistent (YYYY-MM)', ats_fmt_summary_long: 'Scurtează rezumatul (max 500 caractere)', ats_fmt_summary_short: 'Extinde rezumatul (min 30 caractere)', ats_fmt_bullet: 'Scurtează punctele (max 200 caractere)', ats_fmt_few: 'Adaugă mai multe puncte la experiențele tale', ats_fmt_contact: 'Adaugă email sau număr de telefon',
    download_docx: 'Descarcă DOCX', drag_hint: 'Trage pentru a reordona',
    font_size: 'Dimensiune font', spacing: 'Spațiere', sidebar_width: 'Lățime sidebar',
    section_visibility: 'Secțiuni vizibile',
    demo_title: 'Date demo', demo_desc: 'înlocuiește-le cu ale tale', demo_clear: 'Șterge tot',
    content_helpers: 'Ajutor redactare', action_verbs: 'Verbe de acțiune', bullet_templates: 'Șabloane puncte',
    weak_words_detected: 'Cuvinte slabe detectate',
  },
  cs: {
    step_profile: 'Profil', step_exp: 'Zkušenosti', step_edu: 'Vzdělání',
    step_skills: 'Dovednosti', step_extras: 'Extra',
    full_name: 'Celé jméno *', job_title: 'Pracovní pozice *',
    summary: 'Shrnutí', phone: 'Telefon', email: 'Email', linkedin: 'LinkedIn', github: 'GitHub / Portfolio', city: 'Město / Země',
    website: 'Webová stránka', add_photo: 'Přidat fotografii', remove_photo: 'Odebrat fotografii',
    add_experience: 'Přidat zkušenost', add_education: 'Přidat vzdělání',
    add_skill_group: 'Přidat kategorii', add_certification: 'Přidat',
    add_language: 'Přidat jazyk', certifications: 'Certifikace',
    languages: 'Jazyky', interests: 'Zájmy',
    interests_placeholder: 'Cestování, fotografie, sport… (oddělené čárkami)',
    design_options: 'Design a možnosti', template: 'Šablona',
    tpl_modern: 'Moderní', tpl_classic: 'Klasická', tpl_bold: 'Tučná', tpl_compact: 'Kompaktní',
    tpl_executive: 'Výkonná', tpl_creative: 'Kreativní', tpl_technical: 'Technická',
    tpl_minimal: 'Minimalistická', tpl_academic: 'Akademická', tpl_infographic: 'Infografická',
    tpl_elegant: 'Elegantní', tpl_twopage: 'Dvoustránková',
    accent_color: 'Barva zvýraznění', font: 'Písmo',
    show_photo: 'Zobrazit fotografii v životopise',
    previous: '← Předchozí', next: 'Další →',
    history: 'Historie', share: 'Sdílet', download: 'Stáhnout PDF',
    save_json: 'Uložit', import_json: 'Importovat', saved_json: 'Životopis uložen ✓', imported_json: 'Životopis importován ✓', import_error: 'Neplatný soubor',
    persist_tip: 'Uložte životopis jako JSON pro pozdější načtení a aktualizaci.',
    history_empty: 'Žádný životopis v historii', share_title: 'Sdílet životopis',
    share_desc: 'Tento odkaz obsahuje všechna data životopisu. Žádná data nejsou odesílána na server.',
    copy_link: 'Kopírovat', link_copied: '✓ Odkaz zkopírován!',
    preview_placeholder: 'Vyplňte formulář pro zobrazení životopisu',
    select_language: 'Vybrat jazyk', contact: 'Kontakt',
    company: 'Společnost', role: 'Pozice', start_date: 'Datum začátku', end_date: 'Datum konce',
    current_position: 'Současná pozice', description: 'Popis / Klíčové body (jeden na řádek)',
    school: 'Škola / Univerzita', degree: 'Titul', field: 'Obor', grade: 'Známka',
    skill_category: 'Kategorie', skill_items: 'Dovednosti (oddělené čárkami)',
    cert_name: 'Název certifikace', cert_issuer: 'Vydavatel', cert_date: 'Datum',
    lang_name: 'Jazyk', lang_level: 'Úroveň (např. rodilý mluvčí, B2)',
    load: 'Načíst', duplicate: 'Duplikovat', delete: 'Smazat',
    pdf_generating: 'Generování PDF…', pdf_done: 'PDF staženo!',
    present: 'Současnost', unnamed: 'Bez názvu',
    projects: 'Projekty', add_project: 'Přidat projekt', project_name: 'Název projektu',
    project_description: 'Popis', project_url: 'URL projektu', project_tech: 'Použité technologie',
    volunteer: 'Dobrovolnictví', add_volunteer: 'Přidat dobrovolnickou zkušenost',
    volunteer_org: 'Organizace', volunteer_role: 'Role',
    custom_section: 'Vlastní sekce', add_custom_section: 'Přidat vlastní sekci',
    custom_section_title: 'Název sekce', custom_entry_title: 'Název', custom_entry_subtitle: 'Podnázev',
    custom_entry_date: 'Datum', custom_entry_desc: 'Popis', add_custom_entry: 'Přidat záznam',
    saved_indicator: 'Uloženo', preview_cv: 'Zobrazit životopis',
    publications: 'Publikace', add_publication: 'Přidat publikaci',
    pub_title: 'Název', pub_authors: 'Autoři', pub_venue: 'Časopis / Konference', pub_date: 'Datum', pub_url: 'URL',
    references: 'Reference', add_reference: 'Přidat referenci',
    ref_name: 'Jméno', ref_title: 'Pozice', ref_company: 'Společnost', ref_email: 'Email', ref_phone: 'Telefon',
    references_available: 'Reference dostupné na vyžádání',
    ats_checker: 'ATS skóre', ats_paste_job: 'Vložte popis pracovní pozice zde', ats_analyze: 'Analyzovat',
    ats_score: 'Skóre', ats_suggestions: 'Doporučení', ats_matched: 'Nalezená klíčová slova', ats_missing: 'Chybějící klíčová slova',
    ats_add_keywords: 'Přidejte tato klíčová slova do životopisu', ats_add_section: 'Přidejte nebo doplňte sekci',
    ats_sec_summary: 'Profesní shrnutí', ats_sec_experience: 'Pracovní zkušenosti', ats_sec_skills: 'Dovednosti', ats_sec_education: 'Vzdělání', ats_sec_header: 'Jméno a pozice',
    ats_fmt_chars: 'Odstraňte speciální znaky — ATS je nemusí přečíst', ats_fmt_date: 'Použijte jednotný formát data (YYYY-MM)', ats_fmt_summary_long: 'Zkraťte shrnutí (max 500 znaků)', ats_fmt_summary_short: 'Rozšiřte shrnutí (min 30 znaků)', ats_fmt_bullet: 'Zkraťte body (max 200 znaků)', ats_fmt_few: 'Přidejte více bodů k vašim zkušenostem', ats_fmt_contact: 'Přidejte email nebo telefonní číslo',
    download_docx: 'Stáhnout DOCX', drag_hint: 'Přetáhněte pro změnu pořadí',
    font_size: 'Velikost písma', spacing: 'Mezery', sidebar_width: 'Šířka postranního panelu',
    section_visibility: 'Viditelné sekce',
    demo_title: 'Demo data', demo_desc: 'nahraďte svými', demo_clear: 'Vymazat vše',
    content_helpers: 'Pomoc s psaním', action_verbs: 'Akční slovesa', bullet_templates: 'Šablony bodů',
    weak_words_detected: 'Detekována slabá slova',
  },
  uk: {
    step_profile: 'Профіль', step_exp: 'Досвід', step_edu: 'Освіта',
    step_skills: 'Навички', step_extras: 'Додатково',
    full_name: 'Повне ім\'я *', job_title: 'Посада *',
    summary: 'Резюме', phone: 'Телефон', email: 'Email', linkedin: 'LinkedIn', github: 'GitHub / Портфоліо', city: 'Місто / Країна',
    website: 'Веб-сайт', add_photo: 'Додати фото', remove_photo: 'Видалити фото',
    add_experience: 'Додати досвід', add_education: 'Додати освіту',
    add_skill_group: 'Додати категорію', add_certification: 'Додати',
    add_language: 'Додати мову', certifications: 'Сертифікати',
    languages: 'Мови', interests: 'Інтереси',
    interests_placeholder: 'Подорожі, фото, спорт… (через кому)',
    design_options: 'Дизайн та опції', template: 'Шаблон',
    tpl_modern: 'Сучасний', tpl_classic: 'Класичний', tpl_bold: 'Жирний', tpl_compact: 'Компактний',
    tpl_executive: 'Виконавчий', tpl_creative: 'Креативний', tpl_technical: 'Технічний',
    tpl_minimal: 'Мінімалістичний', tpl_academic: 'Академічний', tpl_infographic: 'Інфографіка',
    tpl_elegant: 'Елегантний', tpl_twopage: 'Дві сторінки',
    accent_color: 'Колір акценту', font: 'Шрифт',
    show_photo: 'Показати фото в резюме',
    previous: '← Назад', next: 'Далі →',
    history: 'Історія', share: 'Поділитися', download: 'Завантажити PDF',
    save_json: 'Зберегти', import_json: 'Імпортувати', saved_json: 'Резюме збережено ✓', imported_json: 'Резюме імпортовано ✓', import_error: 'Невірний файл',
    persist_tip: 'Збережіть резюме в JSON, щоб повернутися до нього пізніше.',
    history_empty: 'Немає резюме в історії', share_title: 'Поділитися резюме',
    share_desc: 'Це посилання містить всі дані вашого резюме. Дані не надсилаються на сервер.',
    copy_link: 'Копіювати', link_copied: '✓ Посилання скопійовано!',
    preview_placeholder: 'Заповніть форму, щоб побачити резюме',
    select_language: 'Вибрати мову', contact: 'Контакти',
    company: 'Компанія', role: 'Посада', start_date: 'Дата початку', end_date: 'Дата закінчення',
    current_position: 'Поточна посада', description: 'Опис / Ключові пункти (по одному на рядок)',
    school: 'Школа / Університет', degree: 'Ступінь', field: 'Спеціальність', grade: 'Оцінка',
    skill_category: 'Категорія', skill_items: 'Навички (через кому)',
    cert_name: 'Назва сертифіката', cert_issuer: 'Організація', cert_date: 'Дата',
    lang_name: 'Мова', lang_level: 'Рівень (наприклад: рідна, B2)',
    load: 'Завантажити', duplicate: 'Дублювати', delete: 'Видалити',
    pdf_generating: 'Генерація PDF…', pdf_done: 'PDF завантажено!',
    present: 'Теперішній час', unnamed: 'Без назви',
    projects: 'Проекти', add_project: 'Додати проект', project_name: 'Назва проекту',
    project_description: 'Опис', project_url: 'URL проекту', project_tech: 'Використані технології',
    volunteer: 'Волонтерство', add_volunteer: 'Додати волонтерський досвід',
    volunteer_org: 'Організація', volunteer_role: 'Роль',
    custom_section: 'Користувацький розділ', add_custom_section: 'Додати розділ',
    custom_section_title: 'Назва розділу', custom_entry_title: 'Заголовок', custom_entry_subtitle: 'Підзаголовок',
    custom_entry_date: 'Дата', custom_entry_desc: 'Опис', add_custom_entry: 'Додати запис',
    saved_indicator: 'Збережено', preview_cv: 'Переглянути резюме',
    publications: 'Публікації', add_publication: 'Додати публікацію',
    pub_title: 'Назва', pub_authors: 'Автори', pub_venue: 'Журнал / Конференція', pub_date: 'Дата', pub_url: 'URL',
    references: 'Рекомендації', add_reference: 'Додати рекомендацію',
    ref_name: 'Ім\'я', ref_title: 'Посада', ref_company: 'Компанія', ref_email: 'Email', ref_phone: 'Телефон',
    references_available: 'Рекомендації надаються на запит',
    ats_checker: 'ATS оцінка', ats_paste_job: 'Вставте опис вакансії', ats_analyze: 'Аналізувати',
    ats_score: 'Оцінка', ats_suggestions: 'Пропозиції', ats_matched: 'Знайдені ключові слова', ats_missing: 'Відсутні ключові слова',
    ats_add_keywords: 'Додайте ці ключові слова в резюме', ats_add_section: 'Додайте або доповніть розділ',
    ats_sec_summary: 'Професійне резюме', ats_sec_experience: 'Досвід роботи', ats_sec_skills: 'Навички', ats_sec_education: 'Освіта', ats_sec_header: 'Ім\'я та посада',
    ats_fmt_chars: 'Видаліть спеціальні символи — ATS може їх не прочитати', ats_fmt_date: 'Використовуйте єдиний формат дати (YYYY-MM)', ats_fmt_summary_long: 'Скоротіть резюме (макс. 500 символів)', ats_fmt_summary_short: 'Розширте резюме (мін. 30 символів)', ats_fmt_bullet: 'Скоротіть пункти (макс. 200 символів)', ats_fmt_few: 'Додайте більше пунктів до досвіду', ats_fmt_contact: 'Додайте email або номер телефону',
    download_docx: 'Завантажити DOCX', drag_hint: 'Перетягніть для зміни порядку',
    font_size: 'Розмір шрифту', spacing: 'Інтервал', sidebar_width: 'Ширина бічної панелі',
    section_visibility: 'Видимі розділи',
    demo_title: 'Демо дані', demo_desc: 'замініть їх своїми', demo_clear: 'Очистити все',
    content_helpers: 'Допомога в написанні', action_verbs: 'Дієслова дії', bullet_templates: 'Шаблони пунктів',
    weak_words_detected: 'Виявлено слабкі слова',
  },
  el: {
    step_profile: 'Προφίλ', step_exp: 'Εμπειρία', step_edu: 'Εκπαίδευση',
    step_skills: 'Δεξιότητες', step_extras: 'Επιπλέον',
    full_name: 'Πλήρες όνομα *', job_title: 'Τίτλος θέσης *',
    summary: 'Περίληψη', phone: 'Τηλέφωνο', email: 'Email', linkedin: 'LinkedIn', github: 'GitHub / Portfolio', city: 'Πόλη / Χώρα',
    website: 'Ιστοσελίδα', add_photo: 'Προσθήκη φωτογραφίας', remove_photo: 'Αφαίρεση φωτογραφίας',
    add_experience: 'Προσθήκη εμπειρίας', add_education: 'Προσθήκη εκπαίδευσης',
    add_skill_group: 'Προσθήκη κατηγορίας', add_certification: 'Προσθήκη',
    add_language: 'Προσθήκη γλώσσας', certifications: 'Πιστοποιητικά',
    languages: 'Γλώσσες', interests: 'Ενδιαφέροντα',
    interests_placeholder: 'Ταξίδια, φωτογραφία, αθλητισμός… (διαχωρισμένα με κόμμα)',
    design_options: 'Σχεδιασμός & Επιλογές', template: 'Πρότυπο',
    tpl_modern: 'Μοντέρνο', tpl_classic: 'Κλασικό', tpl_bold: 'Έντονο', tpl_compact: 'Συμπαγές',
    tpl_executive: 'Εκτελεστικό', tpl_creative: 'Δημιουργικό', tpl_technical: 'Τεχνικό',
    tpl_minimal: 'Μινιμαλιστικό', tpl_academic: 'Ακαδημαϊκό', tpl_infographic: 'Infographic',
    tpl_elegant: 'Κομψό', tpl_twopage: 'Δύο σελίδες',
    accent_color: 'Χρώμα έμφασης', font: 'Γραμματοσειρά',
    show_photo: 'Εμφάνιση φωτογραφίας στο βιογραφικό',
    previous: '← Προηγούμενο', next: 'Επόμενο →',
    history: 'Ιστορικό', share: 'Κοινοποίηση', download: 'Λήψη PDF',
    save_json: 'Αποθήκευση', import_json: 'Εισαγωγή', saved_json: 'Βιογραφικό αποθηκεύτηκε ✓', imported_json: 'Βιογραφικό εισήχθη ✓', import_error: 'Μη έγκυρο αρχείο',
    persist_tip: 'Αποθηκεύστε το βιογραφικό σας ως JSON για να το ανακτήσετε αργότερα.',
    history_empty: 'Κανένα βιογραφικό στο ιστορικό', share_title: 'Κοινοποίηση βιογραφικού',
    share_desc: 'Αυτός ο σύνδεσμος περιέχει όλα τα δεδομένα του βιογραφικού σας. Δεν αποστέλλονται δεδομένα σε διακομιστή.',
    copy_link: 'Αντιγραφή', link_copied: '✓ Σύνδεσμος αντιγράφηκε!',
    preview_placeholder: 'Συμπληρώστε τη φόρμα για να δείτε το βιογραφικό',
    select_language: 'Επιλογή γλώσσας', contact: 'Επικοινωνία',
    company: 'Εταιρεία', role: 'Ρόλος', start_date: 'Ημερομηνία έναρξης', end_date: 'Ημερομηνία λήξης',
    current_position: 'Τρέχουσα θέση', description: 'Περιγραφή / Βασικά σημεία (ένα ανά γραμμή)',
    school: 'Σχολείο / Πανεπιστήμιο', degree: 'Πτυχίο', field: 'Τομέας', grade: 'Βαθμός',
    skill_category: 'Κατηγορία', skill_items: 'Δεξιότητες (διαχωρισμένες με κόμμα)',
    cert_name: 'Όνομα πιστοποιητικού', cert_issuer: 'Εκδότης', cert_date: 'Ημερομηνία',
    lang_name: 'Γλώσσα', lang_level: 'Επίπεδο (π.χ. μητρική, B2)',
    load: 'Φόρτωση', duplicate: 'Αντιγραφή', delete: 'Διαγραφή',
    pdf_generating: 'Δημιουργία PDF…', pdf_done: 'PDF λήφθηκε!',
    present: 'Σήμερα', unnamed: 'Χωρίς τίτλο',
    projects: 'Έργα', add_project: 'Προσθήκη έργου', project_name: 'Όνομα έργου',
    project_description: 'Περιγραφή', project_url: 'URL έργου', project_tech: 'Τεχνολογίες που χρησιμοποιήθηκαν',
    volunteer: 'Εθελοντισμός', add_volunteer: 'Προσθήκη εθελοντικής εμπειρίας',
    volunteer_org: 'Οργανισμός', volunteer_role: 'Ρόλος',
    custom_section: 'Προσαρμοσμένη ενότητα', add_custom_section: 'Προσθήκη προσαρμοσμένης ενότητας',
    custom_section_title: 'Τίτλος ενότητας', custom_entry_title: 'Τίτλος', custom_entry_subtitle: 'Υπότιτλος',
    custom_entry_date: 'Ημερομηνία', custom_entry_desc: 'Περιγραφή', add_custom_entry: 'Προσθήκη καταχώρισης',
    saved_indicator: 'Αποθηκεύτηκε', preview_cv: 'Προβολή βιογραφικού',
    publications: 'Δημοσιεύσεις', add_publication: 'Προσθήκη δημοσίευσης',
    pub_title: 'Τίτλος', pub_authors: 'Συγγραφείς', pub_venue: 'Περιοδικό / Συνέδριο', pub_date: 'Ημερομηνία', pub_url: 'URL',
    references: 'Συστάσεις', add_reference: 'Προσθήκη σύστασης',
    ref_name: 'Όνομα', ref_title: 'Τίτλος', ref_company: 'Εταιρεία', ref_email: 'Email', ref_phone: 'Τηλέφωνο',
    references_available: 'Συστάσεις διαθέσιμες κατόπιν αιτήματος',
    ats_checker: 'Βαθμολογία ATS', ats_paste_job: 'Επικολλήστε την περιγραφή θέσης εδώ', ats_analyze: 'Ανάλυση',
    ats_score: 'Βαθμολογία', ats_suggestions: 'Προτάσεις', ats_matched: 'Λέξεις-κλειδιά που βρέθηκαν', ats_missing: 'Λέξεις-κλειδιά που λείπουν',
    ats_add_keywords: 'Προσθέστε αυτές τις λέξεις-κλειδιά στο βιογραφικό', ats_add_section: 'Προσθέστε ή συμπληρώστε την ενότητα',
    ats_sec_summary: 'Επαγγελματική περίληψη', ats_sec_experience: 'Επαγγελματική εμπειρία', ats_sec_skills: 'Δεξιότητες', ats_sec_education: 'Εκπαίδευση', ats_sec_header: 'Όνομα και τίτλος',
    ats_fmt_chars: 'Αφαιρέστε ειδικούς χαρακτήρες — το ATS μπορεί να μην τους διαβάσει', ats_fmt_date: 'Χρησιμοποιήστε συνεπή μορφή ημερομηνίας (YYYY-MM)', ats_fmt_summary_long: 'Συντομεύστε την περίληψη (μέγ. 500 χαρακτήρες)', ats_fmt_summary_short: 'Επεκτείνετε την περίληψη (ελάχ. 30 χαρακτήρες)', ats_fmt_bullet: 'Συντομεύστε τα σημεία (μέγ. 200 χαρακτήρες)', ats_fmt_few: 'Προσθέστε περισσότερα σημεία στις εμπειρίες σας', ats_fmt_contact: 'Προσθέστε email ή αριθμό τηλεφώνου',
    download_docx: 'Λήψη DOCX', drag_hint: 'Σύρετε για αναδιάταξη',
    font_size: 'Μέγεθος γραμματοσειράς', spacing: 'Απόσταση', sidebar_width: 'Πλάτος πλαϊνής μπάρας',
    section_visibility: 'Ορατές ενότητες',
    demo_title: 'Δεδομένα επίδειξης', demo_desc: 'αντικαταστήστε τα με δικά σας', demo_clear: 'Διαγραφή όλων',
    content_helpers: 'Βοήθεια συγγραφής', action_verbs: 'Ρήματα δράσης', bullet_templates: 'Πρότυπα σημείων',
    weak_words_detected: 'Εντοπίστηκαν αδύναμες λέξεις',
  },
  hu: {
    step_profile: 'Profil', step_exp: 'Tapasztalat', step_edu: 'Végzettség',
    step_skills: 'Készségek', step_extras: 'Extra',
    full_name: 'Teljes név *', job_title: 'Pozíció *',
    summary: 'Összefoglaló', phone: 'Telefon', email: 'Email', linkedin: 'LinkedIn', github: 'GitHub / Portfólió', city: 'Város / Ország',
    website: 'Weboldal', add_photo: 'Fénykép hozzáadása', remove_photo: 'Fénykép eltávolítása',
    add_experience: 'Tapasztalat hozzáadása', add_education: 'Végzettség hozzáadása',
    add_skill_group: 'Kategória hozzáadása', add_certification: 'Hozzáadás',
    add_language: 'Nyelv hozzáadása', certifications: 'Tanúsítványok',
    languages: 'Nyelvek', interests: 'Érdeklődési körök',
    interests_placeholder: 'Utazás, fényképezés, sport… (vesszővel elválasztva)',
    design_options: 'Design és beállítások', template: 'Sablon',
    tpl_modern: 'Modern', tpl_classic: 'Klasszikus', tpl_bold: 'Vastag', tpl_compact: 'Kompakt',
    tpl_executive: 'Vezető', tpl_creative: 'Kreatív', tpl_technical: 'Technikai',
    tpl_minimal: 'Minimalista', tpl_academic: 'Akadémiai', tpl_infographic: 'Infografikus',
    tpl_elegant: 'Elegáns', tpl_twopage: 'Két oldal',
    accent_color: 'Kiemelő szín', font: 'Betűtípus',
    show_photo: 'Fénykép megjelenítése az önéletrajzban',
    previous: '← Előző', next: 'Következő →',
    history: 'Előzmények', share: 'Megosztás', download: 'PDF letöltése',
    save_json: 'Mentés', import_json: 'Importálás', saved_json: 'Önéletrajz mentve ✓', imported_json: 'Önéletrajz importálva ✓', import_error: 'Érvénytelen fájl',
    persist_tip: 'Mentse az önéletrajzát JSON formátumban a későbbi visszatöltéshez.',
    history_empty: 'Nincs önéletrajz az előzményekben', share_title: 'Önéletrajz megosztása',
    share_desc: 'Ez a link az önéletrajz összes adatát tartalmazza. Nem küldenek adatot a szerverre.',
    copy_link: 'Másolás', link_copied: '✓ Link másolva!',
    preview_placeholder: 'Töltse ki az űrlapot az önéletrajz megtekintéséhez',
    select_language: 'Nyelv kiválasztása', contact: 'Kapcsolat',
    company: 'Cég', role: 'Pozíció', start_date: 'Kezdő dátum', end_date: 'Befejező dátum',
    current_position: 'Jelenlegi pozíció', description: 'Leírás / Főbb pontok (soronként egy)',
    school: 'Iskola / Egyetem', degree: 'Végzettség', field: 'Szakterület', grade: 'Osztályzat',
    skill_category: 'Kategória', skill_items: 'Készségek (vesszővel elválasztva)',
    cert_name: 'Tanúsítvány neve', cert_issuer: 'Kibocsátó', cert_date: 'Dátum',
    lang_name: 'Nyelv', lang_level: 'Szint (pl. anyanyelv, B2)',
    load: 'Betöltés', duplicate: 'Másolat', delete: 'Törlés',
    pdf_generating: 'PDF generálása…', pdf_done: 'PDF letöltve!',
    present: 'Jelen', unnamed: 'Névtelen',
    projects: 'Projektek', add_project: 'Projekt hozzáadása', project_name: 'Projekt neve',
    project_description: 'Leírás', project_url: 'Projekt URL', project_tech: 'Használt technológiák',
    volunteer: 'Önkéntes munka', add_volunteer: 'Önkéntes tapasztalat hozzáadása',
    volunteer_org: 'Szervezet', volunteer_role: 'Szerep',
    custom_section: 'Egyéni szekció', add_custom_section: 'Egyéni szekció hozzáadása',
    custom_section_title: 'Szekció címe', custom_entry_title: 'Cím', custom_entry_subtitle: 'Alcím',
    custom_entry_date: 'Dátum', custom_entry_desc: 'Leírás', add_custom_entry: 'Bejegyzés hozzáadása',
    saved_indicator: 'Mentve', preview_cv: 'Önéletrajz megtekintése',
    publications: 'Publikációk', add_publication: 'Publikáció hozzáadása',
    pub_title: 'Cím', pub_authors: 'Szerzők', pub_venue: 'Folyóirat / Konferencia', pub_date: 'Dátum', pub_url: 'URL',
    references: 'Referenciák', add_reference: 'Referencia hozzáadása',
    ref_name: 'Név', ref_title: 'Pozíció', ref_company: 'Cég', ref_email: 'Email', ref_phone: 'Telefon',
    references_available: 'Referenciák kérésre rendelkezésre állnak',
    ats_checker: 'ATS pontszám', ats_paste_job: 'Illessze be az álláshirdetést ide', ats_analyze: 'Elemzés',
    ats_score: 'Pontszám', ats_suggestions: 'Javaslatok', ats_matched: 'Talált kulcsszavak', ats_missing: 'Hiányzó kulcsszavak',
    ats_add_keywords: 'Adja hozzá ezeket a kulcsszavakat az önéletrajzhoz', ats_add_section: 'Adja hozzá vagy egészítse ki a szekciót',
    ats_sec_summary: 'Szakmai összefoglaló', ats_sec_experience: 'Munkatapasztalat', ats_sec_skills: 'Készségek', ats_sec_education: 'Végzettség', ats_sec_header: 'Név és pozíció',
    ats_fmt_chars: 'Távolítsa el a speciális karaktereket — az ATS nem biztos, hogy olvassa őket', ats_fmt_date: 'Használjon egységes dátumformátumot (YYYY-MM)', ats_fmt_summary_long: 'Rövidítse az összefoglalót (max 500 karakter)', ats_fmt_summary_short: 'Bővítse az összefoglalót (min 30 karakter)', ats_fmt_bullet: 'Rövidítse a pontokat (max 200 karakter)', ats_fmt_few: 'Adjon hozzá több pontot a tapasztalatokhoz', ats_fmt_contact: 'Adjon hozzá e-mailt vagy telefonszámot',
    download_docx: 'DOCX letöltése', drag_hint: 'Húzza az átrendezéshez',
    font_size: 'Betűméret', spacing: 'Térköz', sidebar_width: 'Oldalsáv szélesség',
    section_visibility: 'Látható szekciók',
    demo_title: 'Demo adatok', demo_desc: 'cserélje ki a sajátjára', demo_clear: 'Összes törlése',
    content_helpers: 'Írássegítség', action_verbs: 'Cselekvési igék', bullet_templates: 'Pont sablonok',
    weak_words_detected: 'Gyenge szavak észlelve',
  },
  nb: {
    step_profile: 'Profil', step_exp: 'Erfaring', step_edu: 'Utdanning',
    step_skills: 'Ferdigheter', step_extras: 'Ekstra',
    full_name: 'Fullt navn *', job_title: 'Jobbtittel *',
    summary: 'Sammendrag', phone: 'Telefon', email: 'E-post', linkedin: 'LinkedIn', github: 'GitHub / Portfolio', city: 'By / Land',
    website: 'Nettside', add_photo: 'Legg til bilde', remove_photo: 'Fjern bilde',
    add_experience: 'Legg til erfaring', add_education: 'Legg til utdanning',
    add_skill_group: 'Legg til kategori', add_certification: 'Legg til',
    add_language: 'Legg til språk', certifications: 'Sertifiseringer',
    languages: 'Språk', interests: 'Interesser',
    interests_placeholder: 'Reise, fotografi, sport… (kommaseparert)',
    design_options: 'Design og innstillinger', template: 'Mal',
    tpl_modern: 'Moderne', tpl_classic: 'Klassisk', tpl_bold: 'Fet', tpl_compact: 'Kompakt',
    tpl_executive: 'Utøvende', tpl_creative: 'Kreativ', tpl_technical: 'Teknisk',
    tpl_minimal: 'Minimalistisk', tpl_academic: 'Akademisk', tpl_infographic: 'Infografisk',
    tpl_elegant: 'Elegant', tpl_twopage: 'To sider',
    accent_color: 'Aksentfarge', font: 'Skrift',
    show_photo: 'Vis bilde i CV',
    previous: '← Forrige', next: 'Neste →',
    history: 'Historikk', share: 'Del', download: 'Last ned PDF',
    save_json: 'Lagre', import_json: 'Importer', saved_json: 'CV lagret ✓', imported_json: 'CV importert ✓', import_error: 'Ugyldig fil',
    persist_tip: 'Lagre CV-en din som JSON for å hente og oppdatere den senere.',
    history_empty: 'Ingen CV i historikken', share_title: 'Del CV-en din',
    share_desc: 'Denne lenken inneholder alle CV-dataene dine. Ingen data sendes til en server.',
    copy_link: 'Kopier', link_copied: '✓ Lenke kopiert!',
    preview_placeholder: 'Fyll ut skjemaet for å se CV-en',
    select_language: 'Velg språk', contact: 'Kontakt',
    company: 'Selskap', role: 'Rolle', start_date: 'Startdato', end_date: 'Sluttdato',
    current_position: 'Nåværende stilling', description: 'Beskrivelse / Nøkkelpunkter (ett per linje)',
    school: 'Skole / Universitet', degree: 'Grad', field: 'Fagfelt', grade: 'Karakter',
    skill_category: 'Kategori', skill_items: 'Ferdigheter (kommaseparert)',
    cert_name: 'Sertifiseringsnavn', cert_issuer: 'Utsteder', cert_date: 'Dato',
    lang_name: 'Språk', lang_level: 'Nivå (f.eks. morsmål, B2)',
    load: 'Last inn', duplicate: 'Dupliser', delete: 'Slett',
    pdf_generating: 'Genererer PDF…', pdf_done: 'PDF lastet ned!',
    present: 'Nåværende', unnamed: 'Uten tittel',
    projects: 'Prosjekter', add_project: 'Legg til prosjekt', project_name: 'Prosjektnavn',
    project_description: 'Beskrivelse', project_url: 'Prosjekt-URL', project_tech: 'Brukte teknologier',
    volunteer: 'Frivillig arbeid', add_volunteer: 'Legg til frivillig erfaring',
    volunteer_org: 'Organisasjon', volunteer_role: 'Rolle',
    custom_section: 'Egendefinert seksjon', add_custom_section: 'Legg til egendefinert seksjon',
    custom_section_title: 'Seksjonstittel', custom_entry_title: 'Tittel', custom_entry_subtitle: 'Undertittel',
    custom_entry_date: 'Dato', custom_entry_desc: 'Beskrivelse', add_custom_entry: 'Legg til oppføring',
    saved_indicator: 'Lagret', preview_cv: 'Vis CV',
    publications: 'Publikasjoner', add_publication: 'Legg til publikasjon',
    pub_title: 'Tittel', pub_authors: 'Forfattere', pub_venue: 'Tidsskrift / Konferanse', pub_date: 'Dato', pub_url: 'URL',
    references: 'Referanser', add_reference: 'Legg til referanse',
    ref_name: 'Navn', ref_title: 'Tittel', ref_company: 'Selskap', ref_email: 'E-post', ref_phone: 'Telefon',
    references_available: 'Referanser tilgjengelig på forespørsel',
    ats_checker: 'ATS-score', ats_paste_job: 'Lim inn stillingsannonsen her', ats_analyze: 'Analyser',
    ats_score: 'Score', ats_suggestions: 'Forslag', ats_matched: 'Matchede nøkkelord', ats_missing: 'Manglende nøkkelord',
    ats_add_keywords: 'Legg til disse nøkkelordene i CV-en', ats_add_section: 'Legg til eller fullfør seksjonen',
    ats_sec_summary: 'Profesjonelt sammendrag', ats_sec_experience: 'Arbeidserfaring', ats_sec_skills: 'Ferdigheter', ats_sec_education: 'Utdanning', ats_sec_header: 'Navn og tittel',
    ats_fmt_chars: 'Fjern spesialtegn — ATS leser dem kanskje ikke', ats_fmt_date: 'Bruk et konsistent datoformat (YYYY-MM)', ats_fmt_summary_long: 'Forkort sammendraget (maks 500 tegn)', ats_fmt_summary_short: 'Utvid sammendraget (min 30 tegn)', ats_fmt_bullet: 'Forkort punktene (maks 200 tegn)', ats_fmt_few: 'Legg til flere punkter i erfaringene dine', ats_fmt_contact: 'Legg til e-post eller telefonnummer',
    download_docx: 'Last ned DOCX', drag_hint: 'Dra for å endre rekkefølge',
    font_size: 'Skriftstørrelse', spacing: 'Avstand', sidebar_width: 'Sidefeltsbredde',
    section_visibility: 'Synlige seksjoner',
    demo_title: 'Demodata', demo_desc: 'erstatt med dine egne', demo_clear: 'Slett alt',
    content_helpers: 'Skrivehjelp', action_verbs: 'Handlingsverb', bullet_templates: 'Punktmaler',
    weak_words_detected: 'Svake ord oppdaget',
  },
  da: {
    step_profile: 'Profil', step_exp: 'Erfaring', step_edu: 'Uddannelse',
    step_skills: 'Færdigheder', step_extras: 'Ekstra',
    full_name: 'Fulde navn *', job_title: 'Jobtitel *',
    summary: 'Sammendrag', phone: 'Telefon', email: 'E-post', linkedin: 'LinkedIn', github: 'GitHub / Portfolio', city: 'By / Land',
    website: 'Hjemmeside', add_photo: 'Tilføj foto', remove_photo: 'Fjern foto',
    add_experience: 'Tilføj erfaring', add_education: 'Tilføj uddannelse',
    add_skill_group: 'Tilføj kategori', add_certification: 'Tilføj',
    add_language: 'Tilføj sprog', certifications: 'Certificeringer',
    languages: 'Sprog', interests: 'Interesser',
    interests_placeholder: 'Rejser, fotografi, sport… (kommasepareret)',
    design_options: 'Design og indstillinger', template: 'Skabelon',
    tpl_modern: 'Moderne', tpl_classic: 'Klassisk', tpl_bold: 'Fed', tpl_compact: 'Kompakt',
    tpl_executive: 'Direktør', tpl_creative: 'Kreativ', tpl_technical: 'Teknisk',
    tpl_minimal: 'Minimalistisk', tpl_academic: 'Akademisk', tpl_infographic: 'Infografisk',
    tpl_elegant: 'Elegant', tpl_twopage: 'To sider',
    accent_color: 'Accentfarve', font: 'Skrifttype',
    show_photo: 'Vis foto i CV',
    previous: '← Forrige', next: 'Næste →',
    history: 'Historik', share: 'Del', download: 'Download PDF',
    save_json: 'Gem', import_json: 'Importer', saved_json: 'CV gemt ✓', imported_json: 'CV importeret ✓', import_error: 'Ugyldig fil',
    persist_tip: 'Gem dit CV som JSON for at hente og opdatere det senere.',
    history_empty: 'Ingen CV i historikken', share_title: 'Del dit CV',
    share_desc: 'Dette link indeholder alle dine CV-data. Ingen data sendes til en server.',
    copy_link: 'Kopier', link_copied: '✓ Link kopieret!',
    preview_placeholder: 'Udfyld formularen for at se CV\'et',
    select_language: 'Vælg sprog', contact: 'Kontakt',
    company: 'Virksomhed', role: 'Rolle', start_date: 'Startdato', end_date: 'Slutdato',
    current_position: 'Nuværende stilling', description: 'Beskrivelse / Nøglepunkter (ét per linje)',
    school: 'Skole / Universitet', degree: 'Grad', field: 'Område', grade: 'Karakter',
    skill_category: 'Kategori', skill_items: 'Færdigheder (kommasepareret)',
    cert_name: 'Certificeringsnavn', cert_issuer: 'Udsteder', cert_date: 'Dato',
    lang_name: 'Sprog', lang_level: 'Niveau (f.eks. modersmål, B2)',
    load: 'Indlæs', duplicate: 'Duplikér', delete: 'Slet',
    pdf_generating: 'Genererer PDF…', pdf_done: 'PDF downloadet!',
    present: 'Nuværende', unnamed: 'Uden titel',
    projects: 'Projekter', add_project: 'Tilføj projekt', project_name: 'Projektnavn',
    project_description: 'Beskrivelse', project_url: 'Projekt-URL', project_tech: 'Anvendte teknologier',
    volunteer: 'Frivilligt arbejde', add_volunteer: 'Tilføj frivillig erfaring',
    volunteer_org: 'Organisation', volunteer_role: 'Rolle',
    custom_section: 'Brugerdefineret sektion', add_custom_section: 'Tilføj brugerdefineret sektion',
    custom_section_title: 'Sektionstitel', custom_entry_title: 'Titel', custom_entry_subtitle: 'Undertitel',
    custom_entry_date: 'Dato', custom_entry_desc: 'Beskrivelse', add_custom_entry: 'Tilføj post',
    saved_indicator: 'Gemt', preview_cv: 'Vis CV',
    publications: 'Publikationer', add_publication: 'Tilføj publikation',
    pub_title: 'Titel', pub_authors: 'Forfattere', pub_venue: 'Tidsskrift / Konference', pub_date: 'Dato', pub_url: 'URL',
    references: 'Referencer', add_reference: 'Tilføj reference',
    ref_name: 'Navn', ref_title: 'Titel', ref_company: 'Virksomhed', ref_email: 'E-mail', ref_phone: 'Telefon',
    references_available: 'Referencer tilgængelige på forespørgsel',
    ats_checker: 'ATS-score', ats_paste_job: 'Indsæt jobopslaget her', ats_analyze: 'Analyser',
    ats_score: 'Score', ats_suggestions: 'Forslag', ats_matched: 'Matchede søgeord', ats_missing: 'Manglende søgeord',
    ats_add_keywords: 'Tilføj disse søgeord til dit CV', ats_add_section: 'Tilføj eller udfyld sektionen',
    ats_sec_summary: 'Professionelt sammendrag', ats_sec_experience: 'Erhvervserfaring', ats_sec_skills: 'Færdigheder', ats_sec_education: 'Uddannelse', ats_sec_header: 'Navn og titel',
    ats_fmt_chars: 'Fjern specialtegn — ATS læser dem måske ikke', ats_fmt_date: 'Brug et ensartet datoformat (YYYY-MM)', ats_fmt_summary_long: 'Forkort sammendraget (maks 500 tegn)', ats_fmt_summary_short: 'Udvid sammendraget (min 30 tegn)', ats_fmt_bullet: 'Forkort punkterne (maks 200 tegn)', ats_fmt_few: 'Tilføj flere punkter til dine erfaringer', ats_fmt_contact: 'Tilføj e-mail eller telefonnummer',
    download_docx: 'Download DOCX', drag_hint: 'Træk for at ændre rækkefølge',
    font_size: 'Skriftstørrelse', spacing: 'Afstand', sidebar_width: 'Sidepanelets bredde',
    section_visibility: 'Synlige sektioner',
    demo_title: 'Demodata', demo_desc: 'erstat med dine egne', demo_clear: 'Slet alt',
    content_helpers: 'Skrivehjælp', action_verbs: 'Handlingsverber', bullet_templates: 'Punktskabeloner',
    weak_words_detected: 'Svage ord opdaget',
  },
  fi: {
    step_profile: 'Profiili', step_exp: 'Kokemus', step_edu: 'Koulutus',
    step_skills: 'Taidot', step_extras: 'Lisätiedot',
    full_name: 'Koko nimi *', job_title: 'Ammattinimike *',
    summary: 'Yhteenveto', phone: 'Puhelin', email: 'Sähköposti', linkedin: 'LinkedIn', github: 'GitHub / Portfolio', city: 'Kaupunki / Maa',
    website: 'Verkkosivusto', add_photo: 'Lisää kuva', remove_photo: 'Poista kuva',
    add_experience: 'Lisää kokemus', add_education: 'Lisää koulutus',
    add_skill_group: 'Lisää kategoria', add_certification: 'Lisää',
    add_language: 'Lisää kieli', certifications: 'Sertifikaatit',
    languages: 'Kielet', interests: 'Kiinnostuksen kohteet',
    interests_placeholder: 'Matkailu, valokuvaus, urheilu… (pilkulla erotettu)',
    design_options: 'Ulkoasu ja asetukset', template: 'Malli',
    tpl_modern: 'Moderni', tpl_classic: 'Klassinen', tpl_bold: 'Lihavoitu', tpl_compact: 'Kompakti',
    tpl_executive: 'Johtava', tpl_creative: 'Luova', tpl_technical: 'Tekninen',
    tpl_minimal: 'Minimalistinen', tpl_academic: 'Akateeminen', tpl_infographic: 'Infograafinen',
    tpl_elegant: 'Tyylikäs', tpl_twopage: 'Kaksi sivua',
    accent_color: 'Korostusväri', font: 'Fontti',
    show_photo: 'Näytä kuva CV:ssä',
    previous: '← Edellinen', next: 'Seuraava →',
    history: 'Historia', share: 'Jaa', download: 'Lataa PDF',
    save_json: 'Tallenna', import_json: 'Tuo', saved_json: 'CV tallennettu ✓', imported_json: 'CV tuotu ✓', import_error: 'Virheellinen tiedosto',
    persist_tip: 'Tallenna CV JSON-muodossa hakemista ja päivittämistä varten myöhemmin.',
    history_empty: 'Ei CV:tä historiassa', share_title: 'Jaa CV',
    share_desc: 'Tämä linkki sisältää kaikki CV:n tiedot. Tietoja ei lähetetä palvelimelle.',
    copy_link: 'Kopioi', link_copied: '✓ Linkki kopioitu!',
    preview_placeholder: 'Täytä lomake nähdäksesi CV:n',
    select_language: 'Valitse kieli', contact: 'Yhteystiedot',
    company: 'Yritys', role: 'Rooli', start_date: 'Aloituspäivä', end_date: 'Lopetuspäivä',
    current_position: 'Nykyinen asema', description: 'Kuvaus / Keskeiset kohdat (yksi per rivi)',
    school: 'Koulu / Yliopisto', degree: 'Tutkinto', field: 'Ala', grade: 'Arvosana',
    skill_category: 'Kategoria', skill_items: 'Taidot (pilkulla erotettu)',
    cert_name: 'Sertifikaatin nimi', cert_issuer: 'Myöntäjä', cert_date: 'Päivämäärä',
    lang_name: 'Kieli', lang_level: 'Taso (esim. äidinkieli, B2)',
    load: 'Lataa', duplicate: 'Monista', delete: 'Poista',
    pdf_generating: 'Luodaan PDF:ää…', pdf_done: 'PDF ladattu!',
    present: 'Nykyinen', unnamed: 'Ei otsikkoa',
    projects: 'Projektit', add_project: 'Lisää projekti', project_name: 'Projektin nimi',
    project_description: 'Kuvaus', project_url: 'Projektin URL', project_tech: 'Käytetyt teknologiat',
    volunteer: 'Vapaaehtoistoiminta', add_volunteer: 'Lisää vapaaehtoiskokemus',
    volunteer_org: 'Organisaatio', volunteer_role: 'Rooli',
    custom_section: 'Mukautettu osio', add_custom_section: 'Lisää mukautettu osio',
    custom_section_title: 'Osion otsikko', custom_entry_title: 'Otsikko', custom_entry_subtitle: 'Alaotsikko',
    custom_entry_date: 'Päivämäärä', custom_entry_desc: 'Kuvaus', add_custom_entry: 'Lisää merkintä',
    saved_indicator: 'Tallennettu', preview_cv: 'Näytä CV',
    publications: 'Julkaisut', add_publication: 'Lisää julkaisu',
    pub_title: 'Otsikko', pub_authors: 'Kirjoittajat', pub_venue: 'Lehti / Konferenssi', pub_date: 'Päivämäärä', pub_url: 'URL',
    references: 'Suosittelijat', add_reference: 'Lisää suosittelija',
    ref_name: 'Nimi', ref_title: 'Nimike', ref_company: 'Yritys', ref_email: 'Sähköposti', ref_phone: 'Puhelin',
    references_available: 'Suosittelijat saatavilla pyynnöstä',
    ats_checker: 'ATS-pisteet', ats_paste_job: 'Liitä työpaikkailmoitus tähän', ats_analyze: 'Analysoi',
    ats_score: 'Pisteet', ats_suggestions: 'Ehdotukset', ats_matched: 'Löydetyt avainsanat', ats_missing: 'Puuttuvat avainsanat',
    ats_add_keywords: 'Lisää nämä avainsanat CV:hen', ats_add_section: 'Lisää tai täydennä osio',
    ats_sec_summary: 'Ammatillinen yhteenveto', ats_sec_experience: 'Työkokemus', ats_sec_skills: 'Taidot', ats_sec_education: 'Koulutus', ats_sec_header: 'Nimi ja nimike',
    ats_fmt_chars: 'Poista erikoismerkit — ATS ei ehkä lue niitä', ats_fmt_date: 'Käytä yhtenäistä päivämäärämuotoa (YYYY-MM)', ats_fmt_summary_long: 'Lyhennä yhteenvetoa (enintään 500 merkkiä)', ats_fmt_summary_short: 'Laajenna yhteenvetoa (vähintään 30 merkkiä)', ats_fmt_bullet: 'Lyhennä kohdat (enintään 200 merkkiä)', ats_fmt_few: 'Lisää enemmän kohtia kokemuksiisi', ats_fmt_contact: 'Lisää sähköposti tai puhelinnumero',
    download_docx: 'Lataa DOCX', drag_hint: 'Vedä järjestyksen muuttamiseksi',
    font_size: 'Fonttikoko', spacing: 'Välistys', sidebar_width: 'Sivupalkin leveys',
    section_visibility: 'Näkyvät osiot',
    demo_title: 'Demodata', demo_desc: 'korvaa omillasi', demo_clear: 'Tyhjennä kaikki',
    content_helpers: 'Kirjoitusapu', action_verbs: 'Toimintaverbit', bullet_templates: 'Kohdemallit',
    weak_words_detected: 'Heikkoja sanoja havaittu',
  },
  vi: {
    step_profile: 'Hồ sơ', step_exp: 'Kinh nghiệm', step_edu: 'Học vấn',
    step_skills: 'Kỹ năng', step_extras: 'Bổ sung',
    full_name: 'Họ và tên *', job_title: 'Chức danh *',
    summary: 'Tóm tắt', phone: 'Điện thoại', email: 'Email', linkedin: 'LinkedIn', github: 'GitHub / Portfolio', city: 'Thành phố / Quốc gia',
    website: 'Website', add_photo: 'Thêm ảnh', remove_photo: 'Xóa ảnh',
    add_experience: 'Thêm kinh nghiệm', add_education: 'Thêm học vấn',
    add_skill_group: 'Thêm danh mục', add_certification: 'Thêm',
    add_language: 'Thêm ngôn ngữ', certifications: 'Chứng chỉ',
    languages: 'Ngôn ngữ', interests: 'Sở thích',
    interests_placeholder: 'Du lịch, nhiếp ảnh, thể thao… (phân tách bằng dấu phẩy)',
    design_options: 'Thiết kế & Tùy chọn', template: 'Mẫu',
    tpl_modern: 'Hiện đại', tpl_classic: 'Cổ điển', tpl_bold: 'Đậm', tpl_compact: 'Gọn',
    tpl_executive: 'Điều hành', tpl_creative: 'Sáng tạo', tpl_technical: 'Kỹ thuật',
    tpl_minimal: 'Tối giản', tpl_academic: 'Học thuật', tpl_infographic: 'Infographic',
    tpl_elegant: 'Thanh lịch', tpl_twopage: 'Hai trang',
    accent_color: 'Màu nhấn', font: 'Phông chữ',
    show_photo: 'Hiển thị ảnh trong CV',
    previous: '← Trước', next: 'Tiếp →',
    history: 'Lịch sử', share: 'Chia sẻ', download: 'Tải PDF',
    save_json: 'Lưu', import_json: 'Nhập', saved_json: 'CV đã lưu ✓', imported_json: 'CV đã nhập ✓', import_error: 'File không hợp lệ',
    persist_tip: 'Lưu CV dưới dạng JSON để truy xuất và cập nhật sau.',
    history_empty: 'Không có CV trong lịch sử', share_title: 'Chia sẻ CV',
    share_desc: 'Liên kết này chứa tất cả dữ liệu CV của bạn. Không có dữ liệu nào được gửi đến máy chủ.',
    copy_link: 'Sao chép', link_copied: '✓ Đã sao chép liên kết!',
    preview_placeholder: 'Điền vào biểu mẫu để xem CV',
    select_language: 'Chọn ngôn ngữ', contact: 'Liên hệ',
    company: 'Công ty', role: 'Vai trò', start_date: 'Ngày bắt đầu', end_date: 'Ngày kết thúc',
    current_position: 'Vị trí hiện tại', description: 'Mô tả / Điểm chính (một dòng một mục)',
    school: 'Trường / Đại học', degree: 'Bằng cấp', field: 'Lĩnh vực', grade: 'Điểm',
    skill_category: 'Danh mục', skill_items: 'Kỹ năng (phân tách bằng dấu phẩy)',
    cert_name: 'Tên chứng chỉ', cert_issuer: 'Tổ chức cấp', cert_date: 'Ngày',
    lang_name: 'Ngôn ngữ', lang_level: 'Trình độ (ví dụ: bản ngữ, B2)',
    load: 'Tải', duplicate: 'Nhân bản', delete: 'Xóa',
    pdf_generating: 'Đang tạo PDF…', pdf_done: 'Đã tải PDF!',
    present: 'Hiện tại', unnamed: 'Không có tiêu đề',
    projects: 'Dự án', add_project: 'Thêm dự án', project_name: 'Tên dự án',
    project_description: 'Mô tả', project_url: 'URL dự án', project_tech: 'Công nghệ sử dụng',
    volunteer: 'Tình nguyện', add_volunteer: 'Thêm kinh nghiệm tình nguyện',
    volunteer_org: 'Tổ chức', volunteer_role: 'Vai trò',
    custom_section: 'Mục tùy chỉnh', add_custom_section: 'Thêm mục tùy chỉnh',
    custom_section_title: 'Tiêu đề mục', custom_entry_title: 'Tiêu đề', custom_entry_subtitle: 'Phụ đề',
    custom_entry_date: 'Ngày', custom_entry_desc: 'Mô tả', add_custom_entry: 'Thêm mục nhập',
    saved_indicator: 'Đã lưu', preview_cv: 'Xem CV',
    publications: 'Xuất bản', add_publication: 'Thêm xuất bản',
    pub_title: 'Tiêu đề', pub_authors: 'Tác giả', pub_venue: 'Tạp chí / Hội nghị', pub_date: 'Ngày', pub_url: 'URL',
    references: 'Người tham chiếu', add_reference: 'Thêm người tham chiếu',
    ref_name: 'Tên', ref_title: 'Chức danh', ref_company: 'Công ty', ref_email: 'Email', ref_phone: 'Điện thoại',
    references_available: 'Người tham chiếu sẵn sàng theo yêu cầu',
    ats_checker: 'Điểm ATS', ats_paste_job: 'Dán mô tả công việc vào đây', ats_analyze: 'Phân tích',
    ats_score: 'Điểm', ats_suggestions: 'Đề xuất', ats_matched: 'Từ khóa tìm thấy', ats_missing: 'Từ khóa thiếu',
    ats_add_keywords: 'Thêm các từ khóa này vào CV', ats_add_section: 'Thêm hoặc hoàn thành mục',
    ats_sec_summary: 'Tóm tắt chuyên nghiệp', ats_sec_experience: 'Kinh nghiệm làm việc', ats_sec_skills: 'Kỹ năng', ats_sec_education: 'Học vấn', ats_sec_header: 'Tên và chức danh',
    ats_fmt_chars: 'Xóa ký tự đặc biệt — ATS có thể không đọc được', ats_fmt_date: 'Sử dụng định dạng ngày nhất quán (YYYY-MM)', ats_fmt_summary_long: 'Rút ngắn tóm tắt (tối đa 500 ký tự)', ats_fmt_summary_short: 'Mở rộng tóm tắt (tối thiểu 30 ký tự)', ats_fmt_bullet: 'Rút ngắn các điểm (tối đa 200 ký tự)', ats_fmt_few: 'Thêm nhiều điểm vào kinh nghiệm của bạn', ats_fmt_contact: 'Thêm email hoặc số điện thoại',
    download_docx: 'Tải DOCX', drag_hint: 'Kéo để sắp xếp lại',
    font_size: 'Cỡ chữ', spacing: 'Khoảng cách', sidebar_width: 'Độ rộng thanh bên',
    section_visibility: 'Mục hiển thị',
    demo_title: 'Dữ liệu mẫu', demo_desc: 'thay thế bằng của bạn', demo_clear: 'Xóa tất cả',
    content_helpers: 'Trợ giúp viết', action_verbs: 'Động từ hành động', bullet_templates: 'Mẫu điểm',
    weak_words_detected: 'Phát hiện từ yếu',
  },
  th: {
    step_profile: 'โปรไฟล์', step_exp: 'ประสบการณ์', step_edu: 'การศึกษา',
    step_skills: 'ทักษะ', step_extras: 'เพิ่มเติม',
    full_name: 'ชื่อเต็ม *', job_title: 'ตำแหน่งงาน *',
    summary: 'สรุป', phone: 'โทรศัพท์', email: 'อีเมล', linkedin: 'LinkedIn', github: 'GitHub / พอร์ตโฟลิโอ', city: 'เมือง / ประเทศ',
    website: 'เว็บไซต์', add_photo: 'เพิ่มรูปภาพ', remove_photo: 'ลบรูปภาพ',
    add_experience: 'เพิ่มประสบการณ์', add_education: 'เพิ่มการศึกษา',
    add_skill_group: 'เพิ่มหมวดหมู่', add_certification: 'เพิ่ม',
    add_language: 'เพิ่มภาษา', certifications: 'ใบรับรอง',
    languages: 'ภาษา', interests: 'ความสนใจ',
    interests_placeholder: 'การเดินทาง, การถ่ายภาพ, กีฬา... (คั่นด้วยเครื่องหมายจุลภาค)',
    design_options: 'การออกแบบและตัวเลือก', template: 'เทมเพลต',
    tpl_modern: 'ทันสมัย', tpl_classic: 'คลาสสิก', tpl_bold: 'ตัวหนา', tpl_compact: 'กะทัดรัด',
    tpl_executive: 'ผู้บริหาร', tpl_creative: 'สร้างสรรค์', tpl_technical: 'เทคนิค',
    tpl_minimal: 'มินิมอล', tpl_academic: 'วิชาการ', tpl_infographic: 'อินโฟกราฟิก',
    tpl_elegant: 'หรูหรา', tpl_twopage: 'สองหน้า',
    accent_color: 'สีเน้น', font: 'แบบอักษร',
    show_photo: 'แสดงรูปภาพในประวัติ',
    previous: '← ก่อนหน้า', next: 'ถัดไป →',
    history: 'ประวัติ', share: 'แชร์', download: 'ดาวน์โหลด PDF',
    save_json: 'บันทึก', import_json: 'นำเข้า', saved_json: 'ประวัติถูกบันทึก ✓', imported_json: 'ประวัติถูกนำเข้า ✓', import_error: 'ไฟล์ไม่ถูกต้อง',
    persist_tip: 'บันทึกประวัติของคุณเป็น JSON เพื่อเรียกคืนและอัปเดตในภายหลัง',
    history_empty: 'ไม่มีประวัติในรายการ', share_title: 'แชร์ประวัติของคุณ',
    share_desc: 'ลิงก์นี้มีข้อมูลประวัติทั้งหมดของคุณ ไม่มีข้อมูลถูกส่งไปยังเซิร์ฟเวอร์',
    copy_link: 'คัดลอก', link_copied: '✓ คัดลอกลิงก์แล้ว!',
    preview_placeholder: 'กรอกแบบฟอร์มเพื่อดูประวัติ',
    select_language: 'เลือกภาษา', contact: 'ติดต่อ',
    company: 'บริษัท', role: 'บทบาท', start_date: 'วันที่เริ่ม', end_date: 'วันที่สิ้นสุด',
    current_position: 'ตำแหน่งปัจจุบัน', description: 'รายละเอียด / ประเด็นสำคัญ (หนึ่งบรรทัดต่อหนึ่งรายการ)',
    school: 'โรงเรียน / มหาวิทยาลัย', degree: 'ปริญญา', field: 'สาขา', grade: 'เกรด',
    skill_category: 'หมวดหมู่', skill_items: 'ทักษะ (คั่นด้วยเครื่องหมายจุลภาค)',
    cert_name: 'ชื่อใบรับรอง', cert_issuer: 'ผู้ออก', cert_date: 'วันที่',
    lang_name: 'ภาษา', lang_level: 'ระดับ (เช่น เจ้าของภาษา, B2)',
    load: 'โหลด', duplicate: 'ทำซ้ำ', delete: 'ลบ',
    pdf_generating: 'กำลังสร้าง PDF…', pdf_done: 'ดาวน์โหลด PDF แล้ว!',
    present: 'ปัจจุบัน', unnamed: 'ไม่มีชื่อ',
    projects: 'โครงการ', add_project: 'เพิ่มโครงการ', project_name: 'ชื่อโครงการ',
    project_description: 'รายละเอียด', project_url: 'URL โครงการ', project_tech: 'เทคโนโลยีที่ใช้',
    volunteer: 'อาสาสมัคร', add_volunteer: 'เพิ่มประสบการณ์อาสาสมัคร',
    volunteer_org: 'องค์กร', volunteer_role: 'บทบาท',
    custom_section: 'ส่วนกำหนดเอง', add_custom_section: 'เพิ่มส่วนกำหนดเอง',
    custom_section_title: 'ชื่อส่วน', custom_entry_title: 'หัวข้อ', custom_entry_subtitle: 'หัวข้อย่อย',
    custom_entry_date: 'วันที่', custom_entry_desc: 'รายละเอียด', add_custom_entry: 'เพิ่มรายการ',
    saved_indicator: 'บันทึกแล้ว', preview_cv: 'ดูประวัติ',
    publications: 'ผลงานตีพิมพ์', add_publication: 'เพิ่มผลงานตีพิมพ์',
    pub_title: 'หัวข้อ', pub_authors: 'ผู้เขียน', pub_venue: 'วารสาร / การประชุม', pub_date: 'วันที่', pub_url: 'URL',
    references: 'ผู้อ้างอิง', add_reference: 'เพิ่มผู้อ้างอิง',
    ref_name: 'ชื่อ', ref_title: 'ตำแหน่ง', ref_company: 'บริษัท', ref_email: 'อีเมล', ref_phone: 'โทรศัพท์',
    references_available: 'ผู้อ้างอิงพร้อมให้ตามคำขอ',
    ats_checker: 'คะแนน ATS', ats_paste_job: 'วางรายละเอียดงานที่นี่', ats_analyze: 'วิเคราะห์',
    ats_score: 'คะแนน', ats_suggestions: 'ข้อเสนอแนะ', ats_matched: 'คำสำคัญที่ตรงกัน', ats_missing: 'คำสำคัญที่ขาดหาย',
    ats_add_keywords: 'เพิ่มคำสำคัญเหล่านี้ในประวัติ', ats_add_section: 'เพิ่มหรือเติมเต็มส่วน',
    ats_sec_summary: 'สรุปมืออาชีพ', ats_sec_experience: 'ประสบการณ์ทำงาน', ats_sec_skills: 'ทักษะ', ats_sec_education: 'การศึกษา', ats_sec_header: 'ชื่อและตำแหน่ง',
    ats_fmt_chars: 'ลบอักขระพิเศษ — ATS อาจอ่านไม่ได้', ats_fmt_date: 'ใช้รูปแบบวันที่ที่สอดคล้องกัน (YYYY-MM)', ats_fmt_summary_long: 'ย่อสรุป (สูงสุด 500 ตัวอักษร)', ats_fmt_summary_short: 'ขยายสรุป (อย่างน้อย 30 ตัวอักษร)', ats_fmt_bullet: 'ย่อจุด (สูงสุด 200 ตัวอักษร)', ats_fmt_few: 'เพิ่มจุดเพิ่มเติมในประสบการณ์ของคุณ', ats_fmt_contact: 'เพิ่มอีเมลหรือหมายเลขโทรศัพท์',
    download_docx: 'ดาวน์โหลด DOCX', drag_hint: 'ลากเพื่อจัดเรียงใหม่',
    font_size: 'ขนาดแบบอักษร', spacing: 'ระยะห่าง', sidebar_width: 'ความกว้างแถบด้านข้าง',
    section_visibility: 'ส่วนที่มองเห็น',
    demo_title: 'ข้อมูลตัวอย่าง', demo_desc: 'แทนที่ด้วยของคุณ', demo_clear: 'ลบทั้งหมด',
    content_helpers: 'ช่วยเหลือการเขียน', action_verbs: 'คำกริยาการกระทำ', bullet_templates: 'เทมเพลตจุด',
    weak_words_detected: 'ตรวจพบคำที่อ่อนแอ',
  },
};

// Emoji flags: fully offline, no external dependency.
// Uses Unicode Regional Indicator Symbols (supported on all modern OS).
function flagEmoji(iso2) {
  return iso2.toUpperCase().replace(/./g,
    c => String.fromCodePoint(0x1F1E6 - 65 + c.charCodeAt(0))
  );
}

const LANGS = [
  { code: 'fr', label: 'Français',          flag: flagEmoji('fr') },
  { code: 'en', label: 'English',            flag: flagEmoji('gb') },
  { code: 'de', label: 'Deutsch',            flag: flagEmoji('de') },
  { code: 'es', label: 'Español',            flag: flagEmoji('es') },
  { code: 'pt', label: 'Português',          flag: flagEmoji('pt') },
  { code: 'it', label: 'Italiano',           flag: flagEmoji('it') },
  { code: 'nl', label: 'Nederlands',         flag: flagEmoji('nl') },
  { code: 'pl', label: 'Polski',             flag: flagEmoji('pl') },
  { code: 'tr', label: 'Türkçe',             flag: flagEmoji('tr') },
  { code: 'zh', label: '中文',               flag: flagEmoji('cn') },
  { code: 'ja', label: '日本語',             flag: flagEmoji('jp') },
  { code: 'ko', label: '한국어',             flag: flagEmoji('kr') },
  { code: 'hi', label: 'हिन्दी',            flag: flagEmoji('in') },
  { code: 'ar', label: 'العربية',            flag: flagEmoji('sa') },
  { code: 'ru', label: 'Русский',            flag: flagEmoji('ru') },
  { code: 'he', label: 'עברית',              flag: flagEmoji('il') },
  { code: 'sv', label: 'Svenska',            flag: flagEmoji('se') },
  { code: 'id', label: 'Bahasa Indonesia',   flag: flagEmoji('id') },
  { code: 'ro', label: 'Română',             flag: flagEmoji('ro') },
  { code: 'cs', label: 'Čeština',            flag: flagEmoji('cz') },
  { code: 'uk', label: 'Українська',         flag: flagEmoji('ua') },
  { code: 'el', label: 'Ελληνικά',           flag: flagEmoji('gr') },
  { code: 'hu', label: 'Magyar',             flag: flagEmoji('hu') },
  { code: 'nb', label: 'Norsk',              flag: flagEmoji('no') },
  { code: 'da', label: 'Dansk',              flag: flagEmoji('dk') },
  { code: 'fi', label: 'Suomi',              flag: flagEmoji('fi') },
  { code: 'vi', label: 'Tiếng Việt',         flag: flagEmoji('vn') },
  { code: 'th', label: 'ไทย',               flag: flagEmoji('th') },
];

// ── Lazy script loader ────────────────────────────────────────

const _loadedScripts = {};
function loadScript(src) {
  if (_loadedScripts[src]) return _loadedScripts[src];
  _loadedScripts[src] = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
  return _loadedScripts[src];
}

const LIBS = {
  html2pdf: 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js',
  pako: 'https://cdnjs.cloudflare.com/ajax/libs/pako/2.1.0/pako.min.js',
  sortable: 'https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.15.3/Sortable.min.js',
};

// ── State ─────────────────────────────────────────────────────

let lang = 'fr';
let template = 'modern';
let accentColor = '#4f6ef7';
let cvFont = 'Inter';
let showPhoto = true;
let cvFontSize = 1;      // scale factor 0.8–1.3
let cvSpacing = 1;        // scale factor 0.7–1.5
let cvSidebarWidth = 220; // px 160–280
let hiddenSections = {};  // { experience: true, ... }
let currentStep = 0;

let profile = { name:'', title:'', summary:'', email:'', phone:'', city:'', linkedin:'', github:'', website:'', photoB64:'' };
let experiences = [];
let education = [];
let skills = [];
let projects = [];
let volunteer = [];
let customSections = [];
let publications = [];
let references = [];
let showReferencesToggle = true;
let extras = { certifications: [], languages: [], interests: '' };

// ── Utilities ─────────────────────────────────────────────────

/**
 * Generates a collision-safe integer ID for CV section entries.
 * Replaces the scattered `genId()` pattern.
 */
function genId() {
  return Date.now() * 1000 + Math.floor(Math.random() * 1000);
}

/**
 * Commits a state change: persists to localStorage and re-renders the preview.
 * Use instead of the `commitChange();` pair everywhere.
 */
function commitChange() {
  commitChange();
}

/**
 * Updates the visible header label of the nearest `.entry-item` ancestor.
 * @param {Element} el   - any element inside an .entry-item
 * @param {string}  text - the new label text
 */
function refreshHeader(el, text) {
  const header = el.closest('.entry-item')
    ?.querySelector('.entry-header > span:not(.drag-handle)');
  if (header) header.textContent = text;
}

/**
 * Attaches a single delegated input+change listener to a list container.
 * Any input/textarea/select with [data-field] and [data-id] inside the container
 * will automatically update the matching entry in `arr` and call commitChange().
 *
 * @param {HTMLElement} listEl     - the container element
 * @param {Array}       arr        - array of objects with numeric `.id` property
 * @param {Function}    [onUpdate] - optional callback(entry, field, el) for side-effects
 */
function bindDelegated(listEl, arr, onUpdate) {
  // Cancel any previous delegated listeners on this container.
  // Without this, every renderXxx() call would stack a new listener
  // on the same persistent DOM node → n renders = n commitChange() calls per keystroke.
  if (listEl._delegatedAbort) listEl._delegatedAbort.abort();
  const controller = new AbortController();
  listEl._delegatedAbort = controller;

  function handler(e) {
    const field = e.target.dataset.field;
    if (!field) return;
    const id = parseFloat(e.target.dataset.id);
    const entry = arr.find(x => x.id === id);
    if (!entry) return;
    entry[field] = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    onUpdate?.(entry, field, e.target);
    commitChange();
  }
  listEl.addEventListener('input',  handler, { signal: controller.signal });
  listEl.addEventListener('change', handler, { signal: controller.signal });
}

const $ = id => document.getElementById(id);
const val = id => { const el = $(id); return el ? el.value.trim() : ''; };
const t = (k, fallback) => (T[lang] && T[lang][k]) ? T[lang][k] : (T.fr[k] || fallback || k);

function showToast(msg, duration = 2500) {
  const el = $('toast');
  el.textContent = msg;
  el.style.opacity = '1';
  setTimeout(() => { el.style.opacity = '0'; }, duration);
}

function setAccent(color) {
  accentColor = color;
  document.documentElement.style.setProperty('--accent', color);
  // Update accent-light approximation
  document.documentElement.style.setProperty('--accent-dark', color);
}

// ── Dark Mode ─────────────────────────────────────────────────

function initDark() {
  const isDark = localStorage.getItem('iloveresume_dark') === '1';
  if (isDark) document.documentElement.classList.add('dark');
  updateDarkIcon(isDark);
}

function toggleDark() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('iloveresume_dark', isDark ? '1' : '0');
  updateDarkIcon(isDark);
}

function updateDarkIcon(isDark) {
  $('icon-moon').classList.toggle('hidden', isDark);
  $('icon-sun').classList.toggle('hidden', !isDark);
}

// ── Language ──────────────────────────────────────────────────

function initLang() {
  const saved = localStorage.getItem('iloveresume_lang');
  if (saved && T[saved]) lang = saved;
  updateLangUI();
}

// RTL languages that need a specific font loaded automatically
const LANG_FONT_MAP = {
  ar: 'Noto Sans Arabic',
  he: 'Noto Sans Arabic', // Hebrew also benefits from Noto Sans
};

function setLang(code) {
  if (!T[code]) return;
  lang = code;
  localStorage.setItem('iloveresume_lang', code);
  // Auto-load the font required for this language (e.g. Noto Arabic for ar/he)
  if (LANG_FONT_MAP[code]) ensureFontLoaded(LANG_FONT_MAP[code]);
  updateLangUI();
  renderAllTranslations();
  renderPreview();
  closeModal('modal-lang');
}

const RTL_LANGS = ['ar', 'he'];

function updateLangUI() {
  const l = LANGS.find(x => x.code === lang) || LANGS[0];
  $('lang-flag').innerHTML = l.flag;
  $('lang-label').textContent = l.code.toUpperCase();
  document.documentElement.dir = RTL_LANGS.includes(lang) ? 'rtl' : 'ltr';
}

function renderLangModal() {
  const list = $('lang-list');
  list.innerHTML = LANGS.map(l => `
    <button class="lang-item ${l.code === lang ? 'active' : ''}" onclick="setLang('${l.code}')">
      <span>${l.flag}</span>
      <span>${l.label}</span>
    </button>`).join('');
}

// ── Translations: update [data-t] elements ────────────────────

function renderAllTranslations() {
  document.querySelectorAll('[data-t]').forEach(el => {
    const key = el.getAttribute('data-t');
    const val = t(key);
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = val;
    } else {
      el.textContent = val;
    }
  });
}

// ── Stepper ───────────────────────────────────────────────────

function goToStep(step) {
  const panels = document.querySelectorAll('.step-panel');
  const items = document.querySelectorAll('.step-item');
  const lines = document.querySelectorAll('.step-line');

  panels.forEach((p, i) => p.classList.toggle('hidden', i !== step));
  items.forEach((item, i) => {
    item.classList.toggle('active', i === step);
    item.classList.toggle('done', i < step);
  });
  lines.forEach((line, i) => line.classList.toggle('done', i < step));

  currentStep = step;
  $('btn-prev').disabled = step === 0;
  const isLast = step === panels.length - 1;
  $('btn-next').textContent = isLast ? t('download') : t('next');
  $('btn-next').classList.toggle('primary', true);

  if (isLast) {
    $('btn-next').onclick = downloadPDF;
  } else {
    $('btn-next').onclick = nextStep;
  }
}

function nextStep() {
  collectProfile();
  const total = document.querySelectorAll('.step-panel').length;
  if (currentStep < total - 1) goToStep(currentStep + 1);
}

function prevStep() {
  if (currentStep > 0) goToStep(currentStep - 1);
}

document.querySelectorAll('.step-item').forEach(item => {
  item.addEventListener('click', () => goToStep(parseInt(item.dataset.step)));
});

// ── Accordion sections ────────────────────────────────────────

function toggleSection(header) {
  const body = header.nextElementSibling;
  header.classList.toggle('collapsed');
  body.classList.toggle('hidden-acc');
}

// ── Profile form ──────────────────────────────────────────────

function collectProfile() {
  profile = {
    name:     val('p-name'),
    title:    val('p-title'),
    summary:  val('p-summary'),
    email:    val('p-email'),
    phone:    val('p-phone'),
    city:     val('p-city'),
    linkedin: val('p-linkedin'),
    github:   val('p-github'),
    website:  val('p-website'),
    photoB64: profile.photoB64,
  };
  commitChange();
}

function populateProfile() {
  const fields = ['name','title','summary','email','phone','city','linkedin','github','website'];
  fields.forEach(f => {
    const el = $(`p-${f}`);
    if (el) el.value = profile[f] || '';
  });
  updatePhotoUI();
}

// ── Photo upload ──────────────────────────────────────────────

// ── Photo resize helper ───────────────────────────────────────
// Caps photo at MAX_PHOTO_PX on its longest side and re-encodes as JPEG
// to prevent localStorage quota exhaustion with large images.
const MAX_PHOTO_PX = 300;

function resizePhotoBase64(dataUrl, callback) {
  const img = new Image();
  img.onload = () => {
    const scale = Math.min(1, MAX_PHOTO_PX / Math.max(img.width, img.height));
    const w = Math.round(img.width * scale);
    const h = Math.round(img.height * scale);
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    canvas.getContext('2d').drawImage(img, 0, 0, w, h);
    callback(canvas.toDataURL('image/jpeg', 0.82));
  };
  img.onerror = () => callback(dataUrl); // fallback: keep original
  img.src = dataUrl;
}

$('photo-input').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    resizePhotoBase64(ev.target.result, resized => {
      profile.photoB64 = resized;
      updatePhotoUI();
      commitChange();
    });
  };
  reader.readAsDataURL(file);
});

$('btn-remove-photo').addEventListener('click', () => {
  profile.photoB64 = '';
  $('photo-input').value = '';
  updatePhotoUI();
  commitChange();
});

function updatePhotoUI() {
  if (profile.photoB64) {
    $('photo-img').src = profile.photoB64;
    $('photo-preview').classList.remove('hidden');
    $('photo-placeholder').classList.add('hidden');
  } else {
    $('photo-preview').classList.add('hidden');
    $('photo-placeholder').classList.remove('hidden');
  }
}

// ── Experiences ───────────────────────────────────────────────

function addExperience(data = {}) {
  const id = genId();
  experiences.push({ id, company: data.company||'', role: data.role||'', startDate: data.startDate||'', endDate: data.endDate||'', current: data.current||false, bullets: data.bullets||'' });
  renderExperiences();
  commitChange();
}

function removeExperience(id) {
  experiences = experiences.filter(e => e.id !== id);
  renderExperiences();
  commitChange();
}

function renderExperiences() {
  const list = $('exp-list');
  if (!experiences.length) { list.innerHTML = ''; return; }
  list.innerHTML = experiences.map(e => `
    <div class="entry-item" data-id="${e.id}">
      <div class="entry-header">
        <span class="drag-handle" title="${t('drag_hint')}">⠿</span>
        <span style="flex:1">${esc2(e.role) || t('role')} ${e.company ? '@ ' + esc2(e.company) : ''}</span>
        <button class="btn-remove-entry" onclick="removeExperience(${e.id})" title="${t('delete')}">×</button>
      </div>
      <div class="fl-wrap">
        <input class="fl-input" data-field="role" data-id="${e.id}" value="${esc2(e.role)}" placeholder=" " />
        <label class="fl-label">${t('role')}</label>
      </div>
      <div class="fl-wrap">
        <input class="fl-input" data-field="company" data-id="${e.id}" value="${esc2(e.company)}" placeholder=" " />
        <label class="fl-label">${t('company')}</label>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div class="fl-wrap">
          <input type="month" class="fl-input" data-field="startDate" data-id="${e.id}" value="${e.startDate||''}" />
          <label class="fl-label">${t('start_date')}</label>
        </div>
        <div class="fl-wrap">
          <input type="month" class="fl-input" data-field="endDate" data-id="${e.id}" value="${e.endDate||''}" ${e.current ? 'disabled' : ''} />
          <label class="fl-label">${t('end_date')}</label>
        </div>
      </div>
      <label style="display:flex;align-items:center;gap:0.5rem;font-size:0.82rem;cursor:pointer;">
        <input type="checkbox" data-field="current" data-id="${e.id}" ${e.current ? 'checked' : ''} />
        ${t('current_position')}
      </label>
      <textarea class="bullets-input" data-field="bullets" data-id="${e.id}" placeholder="${t('description')}">${esc2(e.bullets)}</textarea>
    </div>`).join('');

  bindDelegated(list, experiences, (exp, field, el) => {
    if (field === 'role' || field === 'company') {
      refreshHeader(el, `${exp.role || t('role')} ${exp.company ? '@ ' + exp.company : ''}`);
    }
    if (field === 'current') {
      const endInput = el.closest('.entry-item')?.querySelector('[data-field="endDate"]');
      if (endInput) endInput.disabled = exp.current;
    }
  });
}

$('btn-add-exp').addEventListener('click', () => addExperience());

// ── Education ─────────────────────────────────────────────────

function addEducation(data = {}) {
  const id = genId();
  education.push({ id, school: data.school||'', degree: data.degree||'', field: data.field||'', startDate: data.startDate||'', endDate: data.endDate||'', grade: data.grade||'' });
  renderEducation();
  commitChange();
}

function removeEducation(id) {
  education = education.filter(e => e.id !== id);
  renderEducation();
  commitChange();
}

function renderEducation() {
  const list = $('edu-list');
  if (!education.length) { list.innerHTML = ''; return; }
  list.innerHTML = education.map(e => `
    <div class="entry-item" data-id="${e.id}">
      <div class="entry-header">
        <span class="drag-handle" title="${t('drag_hint')}">⠿</span>
        <span>${esc2(e.degree) || t('degree')} ${e.school ? '· ' + esc2(e.school) : ''}</span>
        <button class="btn-remove-entry" onclick="removeEducation(${e.id})" title="${t('delete')}">×</button>
      </div>
      <div class="fl-wrap">
        <input class="fl-input" data-field="degree" data-id="${e.id}" value="${esc2(e.degree)}" placeholder=" " />
        <label class="fl-label">${t('degree')}</label>
      </div>
      <div class="fl-wrap">
        <input class="fl-input" data-field="field" data-id="${e.id}" value="${esc2(e.field)}" placeholder=" " />
        <label class="fl-label">${t('field')}</label>
      </div>
      <div class="fl-wrap">
        <input class="fl-input" data-field="school" data-id="${e.id}" value="${esc2(e.school)}" placeholder=" " />
        <label class="fl-label">${t('school')}</label>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div class="fl-wrap">
          <input type="month" class="fl-input" data-field="startDate" data-id="${e.id}" value="${e.startDate||''}" />
          <label class="fl-label">${t('start_date')}</label>
        </div>
        <div class="fl-wrap">
          <input type="month" class="fl-input" data-field="endDate" data-id="${e.id}" value="${e.endDate||''}" />
          <label class="fl-label">${t('end_date')}</label>
        </div>
      </div>
      <div class="fl-wrap">
        <input class="fl-input" data-field="grade" data-id="${e.id}" value="${esc2(e.grade)}" placeholder=" " />
        <label class="fl-label">${t('grade')}</label>
      </div>
    </div>`).join('');

  bindDelegated(list, education, (edu, field, el) => {
    if (field === 'degree' || field === 'school') {
      refreshHeader(el, `${edu.degree || t('degree')} ${edu.school ? '· ' + edu.school : ''}`);
    }
  });
}

$('btn-add-edu').addEventListener('click', () => addEducation());

// ── Skills ────────────────────────────────────────────────────

function addSkillGroup(data = {}) {
  const id = genId();
  skills.push({ id, category: data.category||'', items: data.items||[] });
  renderSkills();
  commitChange();
}

function removeSkillGroup(id) {
  skills = skills.filter(s => s.id !== id);
  renderSkills();
  commitChange();
}

function addSkillTag(groupId, value) {
  const group = skills.find(s => s.id === groupId);
  if (!group || !value.trim()) return;
  const tags = value.split(',').map(v => v.trim()).filter(Boolean);
  tags.forEach(tag => { if (!group.items.includes(tag)) group.items.push(tag); });
  renderSkills();
  commitChange();
}

function removeSkillTag(groupId, tag) {
  const group = skills.find(s => s.id === groupId);
  if (!group) return;
  group.items = group.items.filter(i => i !== tag);
  renderSkills();
  commitChange();
}

function renderSkills() {
  const list = $('skills-list');
  if (!skills.length) { list.innerHTML = ''; return; }
  list.innerHTML = skills.map(g => `
    <div class="entry-item" data-id="${g.id}">
      <div class="entry-header">
        <span>${g.category || t('skill_category')}</span>
        <button class="btn-remove-entry" onclick="removeSkillGroup(${g.id})" title="${t('delete')}">×</button>
      </div>
      <div class="fl-wrap">
        <input type="text" class="fl-input skill-cat" data-field="category" value="${esc2(g.category)}" placeholder=" " data-id="${g.id}" />
        <label class="fl-label">${t('skill_category')}</label>
      </div>
      <div class="flex flex-wrap gap-1 min-h-[32px]">
        ${g.items.map(item => `
          <span class="skill-tag">${esc2(item)} <span class="rm-tag" onclick="removeSkillTag(${g.id},'${esc2(item)}')" title="${t('delete')}">×</span></span>`).join('')}
      </div>
      <div style="display:flex;gap:0.5rem;">
        <div class="fl-wrap" style="flex:1;">
          <input type="text" class="fl-input skill-input" placeholder=" " data-id="${g.id}" />
          <label class="fl-label">${t('skill_items')}</label>
        </div>
        <button class="nav-btn" style="padding:0 0.875rem;flex-shrink:0;" onclick="addSkillTagFromInput(${g.id})">+</button>
      </div>
    </div>`).join('');

  bindDelegated(list, skills, (group, field, el) => {
    if (field === 'category') {
      const header = el.closest('.entry-item')?.querySelector('.entry-header span:last-of-type');
      if (header) header.textContent = group.category || t('skill_category');
    }
  });

  list.querySelectorAll('.skill-input').forEach(el => el.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSkillTagFromInput(parseFloat(el.dataset.id));
    }
  }));
}

function addSkillTagFromInput(groupId) {
  const input = document.querySelector(`.skill-input[data-id="${groupId}"]`);
  if (!input || !input.value.trim()) return;
  addSkillTag(groupId, input.value);
  input.value = '';
}

$('btn-add-skill').addEventListener('click', () => addSkillGroup());

// ── Projects ─────────────────────────────────────────────────

function addProject(data = {}) {
  const id = genId();
  projects.push({ id, name: data.name||'', description: data.description||'', url: data.url||'', tech: data.tech||'' });
  renderProjects();
  commitChange();
}

function removeProject(id) {
  projects = projects.filter(p => p.id !== id);
  renderProjects();
  commitChange();
}

function renderProjects() {
  const list = $('project-list');
  if (!list) return;
  if (!projects.length) { list.innerHTML = ''; return; }
  list.innerHTML = projects.map(p => `
    <div class="entry-item" data-id="${p.id}">
      <div class="entry-header">
        <span class="drag-handle" title="${t('drag_hint')}">⠿</span>
        <span>${esc2(p.name) || t('project_name')}</span>
        <button class="btn-remove-entry" onclick="removeProject(${p.id})" title="${t('delete')}">×</button>
      </div>
      <div class="fl-wrap">
        <input class="fl-input" data-field="name" data-id="${p.id}" value="${esc2(p.name)}" placeholder=" " />
        <label class="fl-label">${t('project_name')}</label>
      </div>
      <div class="fl-wrap">
        <textarea class="bullets-input" data-field="description" data-id="${p.id}" placeholder="${t('project_description')}">${esc2(p.description)}</textarea>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div class="fl-wrap">
          <input type="url" class="fl-input" data-field="url" data-id="${p.id}" value="${esc2(p.url)}" placeholder=" " />
          <label class="fl-label">${t('project_url')}</label>
        </div>
        <div class="fl-wrap">
          <input class="fl-input" data-field="tech" data-id="${p.id}" value="${esc2(p.tech)}" placeholder=" " />
          <label class="fl-label">${t('project_tech')}</label>
        </div>
      </div>
    </div>`).join('');

  bindDelegated(list, projects, (proj, field, el) => {
    if (field === 'name') refreshHeader(el, proj.name || t('project_name'));
  });
}

$('btn-add-project')?.addEventListener('click', () => addProject());

// ── Volunteer ────────────────────────────────────────────────

function addVolunteer(data = {}) {
  const id = genId();
  volunteer.push({ id, org: data.org||'', role: data.role||'', startDate: data.startDate||'', endDate: data.endDate||'', description: data.description||'' });
  renderVolunteer();
  commitChange();
}

function removeVolunteer(id) {
  volunteer = volunteer.filter(v => v.id !== id);
  renderVolunteer();
  commitChange();
}

function renderVolunteer() {
  const list = $('volunteer-list');
  if (!list) return;
  if (!volunteer.length) { list.innerHTML = ''; return; }
  list.innerHTML = volunteer.map(v => `
    <div class="entry-item" data-id="${v.id}">
      <div class="entry-header">
        <span class="drag-handle" title="${t('drag_hint')}">⠿</span>
        <span>${esc2(v.role) || t('volunteer_role')} ${v.org ? '@ ' + esc2(v.org) : ''}</span>
        <button class="btn-remove-entry" onclick="removeVolunteer(${v.id})" title="${t('delete')}">×</button>
      </div>
      <div class="fl-wrap">
        <input class="fl-input" data-field="role" data-id="${v.id}" value="${esc2(v.role)}" placeholder=" " />
        <label class="fl-label">${t('volunteer_role')}</label>
      </div>
      <div class="fl-wrap">
        <input class="fl-input" data-field="org" data-id="${v.id}" value="${esc2(v.org)}" placeholder=" " />
        <label class="fl-label">${t('volunteer_org')}</label>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div class="fl-wrap">
          <input type="month" class="fl-input" data-field="startDate" data-id="${v.id}" value="${v.startDate||''}" />
          <label class="fl-label">${t('start_date')}</label>
        </div>
        <div class="fl-wrap">
          <input type="month" class="fl-input" data-field="endDate" data-id="${v.id}" value="${v.endDate||''}" />
          <label class="fl-label">${t('end_date')}</label>
        </div>
      </div>
      <textarea class="bullets-input" data-field="description" data-id="${v.id}" placeholder="${t('description')}">${esc2(v.description)}</textarea>
    </div>`).join('');

  bindDelegated(list, volunteer, (vol, field, el) => {
    if (field === 'role' || field === 'org') {
      refreshHeader(el, `${vol.role || t('volunteer_role')} ${vol.org ? '@ ' + vol.org : ''}`);
    }
  });
}

$('btn-add-volunteer')?.addEventListener('click', () => addVolunteer());

// ── Custom Sections ──────────────────────────────────────────

function addCustomSection(data = {}) {
  const id = genId();
  customSections.push({ id, title: data.title||'', entries: data.entries||[] });
  renderCustomSections();
  commitChange();
}

function removeCustomSection(id) {
  customSections = customSections.filter(s => s.id !== id);
  renderCustomSections();
  commitChange();
}

function addCustomEntry(sectionId, data = {}) {
  const section = customSections.find(s => s.id === sectionId);
  if (!section) return;
  const id = genId();
  section.entries.push({ id, title: data.title||'', subtitle: data.subtitle||'', date: data.date||'', description: data.description||'' });
  renderCustomSections();
  commitChange();
}

function removeCustomEntry(sectionId, entryId) {
  const section = customSections.find(s => s.id === sectionId);
  if (!section) return;
  section.entries = section.entries.filter(e => e.id !== entryId);
  renderCustomSections();
  commitChange();
}

function renderCustomSections() {
  const container = $('custom-sections-list');
  if (!container) return;
  if (!customSections.length) { container.innerHTML = ''; return; }

  container.innerHTML = customSections.map(sec => `
    <div class="entry-item" data-id="${sec.id}" style="border-color:var(--accent);border-style:solid;border-width:1.5px;">
      <div class="entry-header">
        <span>${sec.title || t('custom_section')}</span>
        <button class="btn-remove-entry" onclick="removeCustomSection(${sec.id})" title="${t('delete')}">×</button>
      </div>
      <div class="fl-wrap">
        <input type="text" class="fl-input cs-title" value="${esc2(sec.title)}" placeholder=" " data-id="${sec.id}" />
        <label class="fl-label">${t('custom_section_title')}</label>
      </div>
      <div class="cs-entries flex flex-col gap-2" data-section="${sec.id}">
        ${sec.entries.map(en => `
          <div class="entry-item" style="padding:0.625rem;border-style:dashed;" data-eid="${en.id}">
            <div style="display:flex;gap:0.5rem;align-items:flex-start;">
              <div style="flex:1;display:flex;flex-direction:column;gap:0.5rem;">
                <div class="grid grid-cols-2 gap-2">
                  <div class="fl-wrap">
                    <input type="text" class="fl-input ce-title" value="${esc2(en.title)}" placeholder=" " data-sid="${sec.id}" data-eid="${en.id}" />
                    <label class="fl-label" style="font-size:0.7rem;">${t('custom_entry_title')}</label>
                  </div>
                  <div class="fl-wrap">
                    <input type="text" class="fl-input ce-subtitle" value="${esc2(en.subtitle)}" placeholder=" " data-sid="${sec.id}" data-eid="${en.id}" />
                    <label class="fl-label" style="font-size:0.7rem;">${t('custom_entry_subtitle')}</label>
                  </div>
                </div>
                <div class="fl-wrap" style="max-width:140px;">
                  <input type="text" class="fl-input ce-date" value="${esc2(en.date)}" placeholder=" " data-sid="${sec.id}" data-eid="${en.id}" />
                  <label class="fl-label" style="font-size:0.7rem;">${t('custom_entry_date')}</label>
                </div>
                <textarea class="bullets-input ce-desc" placeholder="${t('custom_entry_desc')}" data-sid="${sec.id}" data-eid="${en.id}" style="min-height:50px;">${esc2(en.description)}</textarea>
              </div>
              <button class="btn-remove-entry" onclick="removeCustomEntry(${sec.id},${en.id})">×</button>
            </div>
          </div>`).join('')}
      </div>
      <button class="add-btn mt-2" onclick="addCustomEntry(${sec.id})">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
        ${t('add_custom_entry')}
      </button>
    </div>`).join('');

  // Section title change
  container.querySelectorAll('.cs-title').forEach(el => el.addEventListener('input', e => {
    const id = parseFloat(e.target.dataset.id);
    const sec = customSections.find(s => s.id === id);
    if (sec) {
      sec.title = e.target.value;
      const h = e.target.closest('.entry-item')?.querySelector('.entry-header span');
      if (h) h.textContent = sec.title || t('custom_section');
    }
    commitChange();
  }));

  // Entry field changes
  container.querySelectorAll('.ce-title,.ce-subtitle,.ce-date,.ce-desc').forEach(el => el.addEventListener('input', e => {
    const sid = parseFloat(e.target.dataset.sid);
    const eid = parseFloat(e.target.dataset.eid);
    const sec = customSections.find(s => s.id === sid);
    if (!sec) return;
    const en = sec.entries.find(x => x.id === eid);
    if (!en) return;
    const cls = e.target.classList;
    if (cls.contains('ce-title')) en.title = e.target.value;
    else if (cls.contains('ce-subtitle')) en.subtitle = e.target.value;
    else if (cls.contains('ce-date')) en.date = e.target.value;
    else if (cls.contains('ce-desc')) en.description = e.target.value;
    commitChange();
  }));
}

$('btn-add-custom-section')?.addEventListener('click', () => addCustomSection());

// ── Extras: Certifications ────────────────────────────────────

function addCertification(data = {}) {
  const id = genId();
  extras.certifications.push({ id, name: data.name||'', issuer: data.issuer||'', date: data.date||'' });
  renderCertifications();
  commitChange();
}

function removeCertification(id) {
  extras.certifications = extras.certifications.filter(c => c.id !== id);
  renderCertifications();
  commitChange();
}

function renderCertifications() {
  const list = $('cert-list');
  if (!extras.certifications.length) { list.innerHTML = ''; return; }
  list.innerHTML = extras.certifications.map(c => `
    <div class="entry-item" style="padding:0.625rem;" data-id="${c.id}">
      <div style="display:flex;gap:0.5rem;align-items:flex-start;">
        <div style="flex:1;display:grid;grid-template-columns:1fr 1fr auto;gap:0.5rem;">
          <div class="fl-wrap">
            <input class="fl-input" data-field="name" data-id="${c.id}" value="${esc2(c.name)}" placeholder=" " />
            <label class="fl-label" style="font-size:0.7rem;">${t('cert_name')}</label>
          </div>
          <div class="fl-wrap">
            <input class="fl-input" data-field="issuer" data-id="${c.id}" value="${esc2(c.issuer)}" placeholder=" " />
            <label class="fl-label" style="font-size:0.7rem;">${t('cert_issuer')}</label>
          </div>
          <div class="fl-wrap" style="width:110px;">
            <input type="month" class="fl-input" data-field="date" data-id="${c.id}" value="${c.date||''}" />
            <label class="fl-label" style="font-size:0.7rem;">${t('cert_date')}</label>
          </div>
        </div>
        <button class="btn-remove-entry" onclick="removeCertification(${c.id})">×</button>
      </div>
    </div>`).join('');

  bindDelegated(list, extras.certifications);
}

$('btn-add-cert').addEventListener('click', () => addCertification());

// ── Extras: Languages ─────────────────────────────────────────

function addLangItem(data = {}) {
  const id = genId();
  extras.languages.push({ id, name: data.name||'', level: data.level||'' });
  renderLangItems();
  commitChange();
}

function removeLangItem(id) {
  extras.languages = extras.languages.filter(l => l.id !== id);
  renderLangItems();
  commitChange();
}

function renderLangItems() {
  const list = $('langs-list');
  if (!extras.languages.length) { list.innerHTML = ''; return; }
  list.innerHTML = extras.languages.map(l => `
    <div class="entry-item" style="padding:0.625rem;" data-id="${l.id}">
      <div style="display:flex;gap:0.5rem;align-items:center;">
        <div class="fl-wrap" style="flex:1;">
          <input class="fl-input" data-field="name" data-id="${l.id}" value="${esc2(l.name)}" placeholder=" " />
          <label class="fl-label" style="font-size:0.7rem;">${t('lang_name')}</label>
        </div>
        <div class="fl-wrap" style="flex:1;">
          <input class="fl-input" data-field="level" data-id="${l.id}" value="${esc2(l.level)}" placeholder=" " />
          <label class="fl-label" style="font-size:0.7rem;">${t('lang_level')}</label>
        </div>
        <button class="btn-remove-entry" onclick="removeLangItem(${l.id})">×</button>
      </div>
    </div>`).join('');

  bindDelegated(list, extras.languages);
}

$('btn-add-lang-item').addEventListener('click', () => addLangItem());

// Interests
$('p-interests').addEventListener('input', () => {
  extras.interests = $('p-interests').value;
  commitChange();
});

// ── Publications ──────────────────────────────────────────────

function addPublication(data = {}) {
  const id = genId();
  publications.push({ id, title: data.title||'', authors: data.authors||'', venue: data.venue||'', date: data.date||'', url: data.url||'' });
  renderPublications();
  commitChange();
}

function removePublication(id) {
  publications = publications.filter(p => p.id !== id);
  renderPublications();
  commitChange();
}

function renderPublications() {
  const list = $('pub-list');
  if (!list) return;
  if (!publications.length) { list.innerHTML = ''; return; }
  list.innerHTML = publications.map(p => `
    <div class="entry-item" data-id="${p.id}">
      <div class="entry-header">
        <span class="drag-handle" title="${t('drag_hint')}">⠿</span>
        <span>${esc2(p.title) || t('pub_title')}</span>
        <button class="btn-remove-entry" onclick="removePublication(${p.id})">×</button>
      </div>
      <div class="grid grid-cols-1 gap-2">
        <div class="fl-wrap">
          <input class="fl-input" data-field="title" data-id="${p.id}" value="${esc2(p.title)}" placeholder=" " />
          <label class="fl-label">${t('pub_title')}</label>
        </div>
        <div class="fl-wrap">
          <input class="fl-input" data-field="authors" data-id="${p.id}" value="${esc2(p.authors)}" placeholder=" " />
          <label class="fl-label">${t('pub_authors')}</label>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div class="fl-wrap">
            <input class="fl-input" data-field="venue" data-id="${p.id}" value="${esc2(p.venue)}" placeholder=" " />
            <label class="fl-label">${t('pub_venue')}</label>
          </div>
          <div class="fl-wrap">
            <input type="month" class="fl-input" data-field="date" data-id="${p.id}" value="${p.date||''}" />
            <label class="fl-label">${t('pub_date')}</label>
          </div>
        </div>
        <div class="fl-wrap">
          <input type="url" class="fl-input" data-field="url" data-id="${p.id}" value="${esc2(p.url)}" placeholder=" " />
          <label class="fl-label">${t('pub_url')}</label>
        </div>
      </div>
    </div>`).join('');

  bindDelegated(list, publications, (pub, field, el) => {
    if (field === 'title') refreshHeader(el, pub.title || t('pub_title'));
  });
}

$('btn-add-pub').addEventListener('click', () => addPublication());

// ── References ────────────────────────────────────────────────

function addReference(data = {}) {
  const id = genId();
  references.push({ id, name: data.name||'', title: data.title||'', company: data.company||'', email: data.email||'', phone: data.phone||'' });
  renderReferences();
  commitChange();
}

function removeReference(id) {
  references = references.filter(r => r.id !== id);
  renderReferences();
  commitChange();
}

function renderReferences() {
  const list = $('ref-list');
  if (!list) return;
  if (!references.length) { list.innerHTML = ''; return; }
  list.innerHTML = references.map(r => `
    <div class="entry-item" data-id="${r.id}">
      <div class="entry-header">
        <span class="drag-handle" title="${t('drag_hint')}">⠿</span>
        <span>${esc2(r.name) || t('ref_name')}</span>
        <button class="btn-remove-entry" onclick="removeReference(${r.id})">×</button>
      </div>
      <div class="grid grid-cols-2 gap-2">
        <div class="fl-wrap">
          <input class="fl-input" data-field="name" data-id="${r.id}" value="${esc2(r.name)}" placeholder=" " />
          <label class="fl-label">${t('ref_name')}</label>
        </div>
        <div class="fl-wrap">
          <input class="fl-input" data-field="title" data-id="${r.id}" value="${esc2(r.title)}" placeholder=" " />
          <label class="fl-label">${t('ref_title')}</label>
        </div>
        <div class="fl-wrap">
          <input class="fl-input" data-field="company" data-id="${r.id}" value="${esc2(r.company)}" placeholder=" " />
          <label class="fl-label">${t('ref_company')}</label>
        </div>
        <div class="fl-wrap">
          <input type="email" class="fl-input" data-field="email" data-id="${r.id}" value="${esc2(r.email)}" placeholder=" " />
          <label class="fl-label">${t('ref_email')}</label>
        </div>
        <div class="fl-wrap">
          <input type="tel" class="fl-input" data-field="phone" data-id="${r.id}" value="${esc2(r.phone)}" placeholder=" " />
          <label class="fl-label">${t('ref_phone')}</label>
        </div>
      </div>
    </div>`).join('');

  bindDelegated(list, references, (ref, field, el) => {
    if (field === 'name') refreshHeader(el, ref.name || t('ref_name'));
  });
}

$('btn-add-ref').addEventListener('click', () => addReference());

$('tog-references').addEventListener('change', () => {
  showReferencesToggle = $('tog-references').checked;
  commitChange();
});

// ── Design options ────────────────────────────────────────────

document.querySelectorAll('.tpl-pill').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tpl-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    template = btn.dataset.tpl;
    commitChange();
  });
});

document.querySelectorAll('.color-dot').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.color-dot').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    $('custom-color').value = btn.dataset.color;
    setAccent(btn.dataset.color);
    commitChange();
  });
});

$('custom-color').addEventListener('input', e => {
  document.querySelectorAll('.color-dot').forEach(b => b.classList.remove('active'));
  setAccent(e.target.value);
  commitChange();
});

// ── Lazy font loader ──────────────────────────────────────────
// Only Inter is loaded at startup. Other fonts are injected on demand.
const FONT_URLS = {
  'Roboto':          'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap',
  'Lato':            'https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap',
  'Playfair Display':'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap',
  'Poppins':         'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
  'Noto Sans Arabic':'https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@300;400;500;600;700&display=swap',
};
const _loadedFonts = new Set(['Inter']);

function ensureFontLoaded(fontName) {
  if (_loadedFonts.has(fontName) || !FONT_URLS[fontName]) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = FONT_URLS[fontName];
  document.head.appendChild(link);
  _loadedFonts.add(fontName);
}

document.querySelectorAll('.font-pill').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.font-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    cvFont = btn.dataset.font;
    ensureFontLoaded(cvFont);
    commitChange();
  });
});

$('tog-photo').addEventListener('change', () => {
  showPhoto = $('tog-photo').checked;
  commitChange();
});

// ── Sliders ──────────────────────────────────────────────────
$('slider-font-size').addEventListener('input', e => {
  cvFontSize = parseInt(e.target.value, 10) / 100;
  $('val-font-size').textContent = e.target.value + '%';
  commitChange();
});
$('slider-spacing').addEventListener('input', e => {
  cvSpacing = parseInt(e.target.value, 10) / 100;
  $('val-spacing').textContent = e.target.value + '%';
  commitChange();
});
$('slider-sidebar-width').addEventListener('input', e => {
  cvSidebarWidth = parseInt(e.target.value, 10);
  $('val-sidebar-width').textContent = e.target.value + 'px';
  commitChange();
});

// ── Section toggles ──────────────────────────────────────────
const SECTION_KEYS = [
  { key: 'experience', labelKey: 'step_exp' },
  { key: 'education', labelKey: 'step_edu' },
  { key: 'skills', labelKey: 'step_skills' },
  { key: 'projects', labelKey: 'projects' },
  { key: 'volunteer', labelKey: 'volunteer' },
  { key: 'certifications', labelKey: 'certifications' },
  { key: 'languages', labelKey: 'languages' },
  { key: 'interests', labelKey: 'interests' },
  { key: 'publications', labelKey: 'publications' },
  { key: 'references', labelKey: 'references' },
];

function renderSectionToggles() {
  const container = $('section-toggles');
  if (!container) return;
  const items = [...SECTION_KEYS];
  // Add custom sections
  customSections.forEach((cs, i) => {
    items.push({ key: `custom_${i}`, label: cs.title || t('custom_section') + ' ' + (i + 1) });
  });
  container.innerHTML = items.map(s => {
    const checked = !hiddenSections[s.key] ? 'checked' : '';
    const label = s.label || t(s.labelKey);
    return `<label class="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 py-0.5 cursor-pointer">
      <span>${esc(label)}</span>
      <input type="checkbox" ${checked} data-section-key="${s.key}" class="section-toggle accent-[var(--accent)]" />
    </label>`;
  }).join('');
  container.querySelectorAll('.section-toggle').forEach(cb => {
    cb.addEventListener('change', () => {
      if (cb.checked) delete hiddenSections[cb.dataset.sectionKey];
      else hiddenSections[cb.dataset.sectionKey] = true;
      commitChange();
    });
  });
}

// ── Preview ───────────────────────────────────────────────────

let previewTimer = null;

function renderPreview() {
  clearTimeout(previewTimer);
  previewTimer = setTimeout(_doRenderPreview, 120);
}

// Post-process template HTML to apply customisation sliders
function postProcessTemplate(html) {
  // Fast path: nothing to transform when all sliders are at defaults
  const needsFontScale    = cvFontSize !== 1;
  const needsSpacingScale = cvSpacing !== 1;
  const needsSidebarScale = cvSidebarWidth !== 220;
  const needsRTL          = RTL_LANGS.includes(lang);
  if (!needsFontScale && !needsSpacingScale && !needsSidebarScale && !needsRTL) return html;

  let out = html;
  // Scale font sizes
  if (needsFontScale) {
    out = out.replace(/font-size:\s*([\d.]+)(rem|em|px)/g, (m, num, unit) => {
      return `font-size:${(parseFloat(num) * cvFontSize).toFixed(3)}${unit}`;
    });
  }
  // Scale spacing (margin, padding, gap)
  if (needsSpacingScale) {
    out = out.replace(/(margin(?:-top|-bottom|-left|-right)?|padding(?:-top|-bottom|-left|-right)?|gap|row-gap|column-gap):\s*([\d.]+)(rem|em|px)/g, (m, prop, num, unit) => {
      return `${prop}:${(parseFloat(num) * cvSpacing).toFixed(3)}${unit}`;
    });
  }
  // Sidebar width - replace common sidebar width patterns
  if (needsSidebarScale) {
    out = out.replace(/width:220px/g, `width:${cvSidebarWidth}px`);
    out = out.replace(/width:235px/g, `width:${cvSidebarWidth}px`);
  }
  // RTL: flip direction on the root flex container and text alignment
  if (needsRTL) {
    // Flip sidebar layout (flex-direction: row → row-reverse)
    out = out.replace(/display:\s*flex(?=[^"]*flex-shrink:0)/g, 'display:flex;flex-direction:row-reverse');
    // Add direction:rtl and text-align:right to the outermost container
    out = out.replace(/^(<div[^>]*style=")/, '$1direction:rtl;text-align:right;');
    // Flip bullet margins
    out = out.replace(/margin:0\.25rem 0 0 1rem/g, 'margin:0.25rem 1rem 0 0');
    out = out.replace(/margin-left:1rem/g, 'margin-right:1rem');
  }
  return out;
}

function _doRenderPreview() {
  collectProfile();
  const cv = buildCVState();
  cv.hiddenSections = hiddenSections;
  const page = $('cv-page');
  let html = renderTemplate(cv, template, accentColor, cvFont, t);
  html = postProcessTemplate(html);
  page.innerHTML = html;
  // Remove hidden sections from DOM
  const hidden = Object.keys(hiddenSections).filter(k => hiddenSections[k]);
  hidden.forEach(key => {
    page.querySelectorAll(`[data-section="${key}"]`).forEach(el => el.remove());
  });
  fixPageBreaks(page);
  injectContinuationHeaders(page, cv, accentColor);
  scalePreview();
}

// ── Page break fixer ─────────────────────────────────────────
// Inserts spacers before any cv-item that would be cut by a page boundary
// or fall under the continuation header zone (HEADER_H px after boundary).
// Uses offsetTop traversal (unaffected by CSS scale transform).
function fixPageBreaks(cvPageEl) {
  cvPageEl.querySelectorAll('.cv-page-spacer').forEach(el => el.remove());

  const A4H = 1123;
  const HEADER_H = 56;

  // Helper: get offsetTop relative to cvPageEl
  function relativeTop(el) {
    let top = 0;
    let node = el;
    while (node && node !== cvPageEl) {
      top += node.offsetTop;
      node = node.offsetParent;
      if (!node || !cvPageEl.contains(node)) return -1;
    }
    return top;
  }

  const candidates = Array.from(
    cvPageEl.querySelectorAll('.cv-item, li')
  ).filter(el => !el.closest('.cv-cont-header') && !el.closest('.cv-page-spacer'));

  // Snapshot all positions before any DOM mutation
  const snapshot = candidates.map(el => ({
    el,
    top: relativeTop(el),
    height: el.offsetHeight,
  })).filter(item => item.top >= 0 && item.height > 8);

  let extraAdded = 0;
  let nextBoundary = A4H;

  for (const item of snapshot) {
    const top = item.top + extraAdded;
    const bottom = top + item.height;

    // Advance to the relevant boundary
    while (top > nextBoundary + HEADER_H) {
      nextBoundary += A4H;
    }

    const zoneEnd = nextBoundary + HEADER_H;

    // Element crosses the boundary or starts inside the header zone
    if (top < zoneEnd && bottom > nextBoundary - 2) {
      const spacerH = Math.round(zoneEnd - top);
      if (spacerH > 0 && spacerH < A4H * 0.85) {
        const spacer = document.createElement('div');
        spacer.className = 'cv-page-spacer';
        spacer.style.cssText = `height:${spacerH}px;display:block;flex-shrink:0;`;
        item.el.parentNode.insertBefore(spacer, item.el);
        extraAdded += spacerH;
        nextBoundary += A4H;
      }
    }
  }
}

// ── Continuation page mini-header (à la MyInvoice) ───────────
// Injected at each A4 page boundary (1123px, 2246px, …) directly
// inside the cv-page element as position:absolute overlays.
function injectContinuationHeaders(cvPageEl, cv, accent) {
  cvPageEl.querySelectorAll('.cv-cont-header').forEach(el => el.remove());

  const A4H   = 1123;
  const actualH = cvPageEl.scrollHeight;
  const numPages = Math.ceil(actualH / A4H);
  if (numPages <= 1) return;

  const name  = cv.profile.name  || '';
  const title = cv.profile.title || '';
  const email = cv.profile.email || '';
  const phone = cv.profile.phone || '';

  // Photo thumbnail (if available)
  const photoHtml = (cv.profile.photoB64 && cv.showPhoto)
    ? `<img src="${cv.profile.photoB64}" style="width:28px;height:28px;border-radius:50%;object-fit:cover;flex-shrink:0;" alt="" />`
    : `<div style="width:28px;height:28px;border-radius:50%;background:${accent};
                  display:flex;align-items:center;justify-content:center;
                  font-size:11px;font-weight:700;color:#fff;flex-shrink:0;">
        ${name ? esc(name.charAt(0).toUpperCase()) : '✦'}
       </div>`;

  for (let i = 1; i < numPages; i++) {
    const el = document.createElement('div');
    el.className = 'cv-cont-header';
    el.style.cssText = `
      position:absolute;top:${i * A4H}px;left:0;right:0;
      height:56px;background:#ffffff;
      border-top:3px solid ${accent};
      border-bottom:1.5px solid ${accent}22;
      display:flex;align-items:center;justify-content:space-between;
      padding:0 28px;z-index:50;box-sizing:border-box;
    `;
    el.innerHTML = `
      <div style="display:flex;align-items:center;gap:14px;min-width:0;overflow:hidden;">
        ${photoHtml}
        <div style="min-width:0;overflow:hidden;">
          ${name ? `<div style="font-size:12px;font-weight:700;color:#111;white-space:nowrap;">${esc(name)}</div>` : ''}
          ${title ? `<div style="font-size:9.5px;color:#666;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${esc(title)}</div>` : ''}
        </div>
        ${email ? `<div style="font-size:8.5px;color:#888;white-space:nowrap;display:flex;align-items:center;gap:4px;">✉ ${esc(email)}</div>` : ''}
        ${phone ? `<div style="font-size:8.5px;color:#888;white-space:nowrap;display:flex;align-items:center;gap:4px;">✆ ${esc(phone)}</div>` : ''}
      </div>
      <div style="flex-shrink:0;font-size:10px;font-weight:600;color:${accent};margin-left:12px;">
        ${i + 1} / ${numPages}
      </div>
    `;
    cvPageEl.appendChild(el);
  }
}

function scalePreview() {
  const wrapper = document.querySelector('.preview-scale-container');
  if (!wrapper) return;
  const available = wrapper.clientWidth;
  const pageW = 794;
  const scale = Math.min(1, available / pageW);
  const page = $('cv-page');
  page.style.transform = `scale(${scale})`;
  page.style.transformOrigin = 'top center';
  page.style.marginLeft = 'auto';
  page.style.marginRight = 'auto';

  // Use actual rendered height (supports multi-page CVs)
  const actualH = page.scrollHeight;
  wrapper.style.height = (actualH * scale) + 'px';

  // Remove old page break lines
  wrapper.querySelectorAll('.cv-page-break-line').forEach(el => el.remove());

  // Inject visual page break lines between pages
  const A4H = 1123;
  const numPages = Math.ceil(actualH / A4H);
  for (let i = 1; i < numPages; i++) {
    const line = document.createElement('div');
    line.className = 'cv-page-break-line';
    line.style.top = (i * A4H * scale) + 'px';
    wrapper.appendChild(line);
  }

  // Update or create page counter badge
  let counter = wrapper.querySelector('.preview-page-counter');
  if (!counter) {
    counter = document.createElement('div');
    counter.className = 'preview-page-counter';
    wrapper.appendChild(counter);
  }
  counter.textContent = numPages > 1 ? `${numPages} pages` : '1 page';
}

window.addEventListener('resize', scalePreview);

function buildCVState() {
  return {
    profile: { ...profile },
    experiences: experiences.map(e => ({ ...e })),
    education: education.map(e => ({ ...e })),
    skills: skills.map(g => ({ ...g, items: [...g.items] })),
    projects: projects.map(p => ({ ...p })),
    volunteer: volunteer.map(v => ({ ...v })),
    customSections: customSections.map(s => ({ ...s, entries: s.entries.map(e => ({ ...e })) })),
    publications: publications.map(p => ({ ...p })),
    references: references.map(r => ({ ...r })),
    showReferencesToggle,
    extras: {
      certifications: extras.certifications.map(c => ({ ...c })),
      languages: extras.languages.map(l => ({ ...l })),
      interests: extras.interests,
    },
    showPhoto,
  };
}

// ── PDF Export ────────────────────────────────────────────────

async function downloadPDF() {
  collectProfile();
  showToast(t('pdf_generating'));
  await loadScript(LIBS.html2pdf);

  const name = (profile.name || 'cv').toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9\-]/g,'');
  const filename = `${name}-resume.pdf`;

  // Dark mode must be removed before capture (html2canvas won't apply dark CSS vars correctly)
  const wasDark = document.documentElement.classList.contains('dark');
  if (wasDark) document.documentElement.classList.remove('dark');

  // Off-screen container: position:fixed top:-9999px (proven approach, avoids scroll/transform issues)
  const renderWrapper = document.createElement('div');
  renderWrapper.style.cssText = 'position:fixed;top:-9999px;left:0;width:794px;z-index:-9999;pointer-events:none;';

  const clone = $('cv-page').cloneNode(true);
  clone.style.cssText = 'width:794px;transform:none;transform-origin:top left;background:#ffffff;';
  renderWrapper.appendChild(clone);
  document.body.appendChild(renderWrapper);

  // Fix page breaks and inject continuation headers into the clone
  fixPageBreaks(clone);
  injectContinuationHeaders(clone, buildCVState(), accentColor);

  try {
    await html2pdf().set({
      margin: [0, 0, 0, 0],
      filename,
      image: { type: 'jpeg', quality: 1.0 },
      html2canvas: {
        scale: 4.5,
        useCORS: true,
        letterRendering: true,
        logging: false,
        backgroundColor: '#ffffff',
        scrollX: 0,
        scrollY: 0,
        windowWidth: 794,
        x: 0,
        y: 0,
        width: 794,
        // No height — html2canvas auto-measures full content height for multi-page support
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['css', 'legacy'] },
    }).from(clone).output('blob').then(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    });

    showToast(t('pdf_done'));
    saveToHistory();
  } catch(err) {
    console.error(err);
    showToast('Erreur lors de la génération du PDF');
  } finally {
    document.body.removeChild(renderWrapper);
    if (wasDark) document.documentElement.classList.add('dark');
  }
}

// ── History ───────────────────────────────────────────────────

const HISTORY_KEY = 'iloveresume_history';

function exportStateForHistory() {
  // Strip photo from history entries — a photo can be 50-200KB,
  // and 20 entries × 150KB = 3MB which exhausts localStorage quota.
  // The photo remains in the active CV slot.
  const s = JSON.parse(exportState());
  if (s.profile) s.profile.photoB64 = '';
  return JSON.stringify(s);
}

function saveToHistory() {
  const history = getHistory();
  const list = getCVList();
  const activeCv = list.cvs.find(c => c.id === list.activeCvId);
  const entry = {
    id: Date.now(),
    date: new Date().toISOString(),
    name: profile.name || t('unnamed'),
    title: profile.title || '',
    template,
    cvId: list.activeCvId || null,
    cvName: activeCv?.name || null,
    state: exportStateForHistory(), // photo stripped
  };
  history.unshift(entry);
  const trimmed = history.slice(0, 20);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
}

function getHistory() {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'); } catch { return []; }
}

function renderHistoryModal() {
  const history = getHistory();
  const list = $('history-list');
  const empty = $('history-empty');
  if (!history.length) {
    list.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }
  empty.classList.add('hidden');
  list.innerHTML = history.map(item => {
    const cvBadge = item.cvName
      ? `<span class="history-cv-badge">${esc2(item.cvName)}</span>`
      : '';
    return `
    <div class="history-item">
      <div>
        <div class="font-semibold text-sm">${esc2(item.name)} ${cvBadge}</div>
        <div class="text-xs text-gray-500">${esc2(item.title)} · ${new Date(item.date).toLocaleDateString(lang)} · ${item.template}</div>
      </div>
      <div class="history-item-actions">
        <button onclick="loadFromHistory(${item.id})" title="${t('load')}">${t('load')}</button>
        <button class="btn-del" onclick="deleteFromHistory(${item.id})" title="${t('delete')}">${t('delete')}</button>
      </div>
    </div>`;
  }).join('');
}

function loadFromHistory(id) {
  const history = getHistory();
  const entry = history.find(h => h.id === id);
  if (!entry) return;

  // With multi-CV: always load into a NEW cv slot to avoid silently
  // overwriting the current CV. The old single-CV behavior was a data-loss risk.
  clearTimeout(_saveTimer);
  _doSaveState(); // flush current immediately

  const list = getCVList();
  const newId = genCvId();
  const baseName = (entry.cvName || entry.name || t('unnamed'));
  const date = new Date(entry.date).toLocaleDateString(lang);
  list.cvs.push({ id: newId, name: `${baseName} (${date})`, createdAt: Date.now(), updatedAt: Date.now() });
  list.activeCvId = newId;
  saveCVList(list);
  importState(entry.state);
  localStorage.setItem(CV_PREFIX + newId, entry.state);
  renderAll();
  syncDesignUI();
  renderAllTranslations();
  renderPreview();
  renderCVSelect();
  closeModal('modal-history');
  showToast(t('load') + ' ✓');
}

function duplicateFromHistory(id) {
  // Same as load — creates a new CV slot with the historical state
  loadFromHistory(id);
}

function deleteFromHistory(id) {
  let history = getHistory();
  history = history.filter(h => h.id !== id);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  renderHistoryModal();
}

// ── State persistence ─────────────────────────────────────────

const STATE_KEY    = 'iloveresume_state';   // legacy single-CV key (kept for migration)
const CVLIST_KEY   = 'iloveresume_cvlist';  // multi-CV index
const CV_PREFIX    = 'iloveresume_cv_';     // per-CV state key prefix

function exportState() {
  return JSON.stringify({ profile, experiences, education, skills, projects, volunteer, customSections, publications, references, showReferencesToggle, extras, template, accentColor, cvFont, showPhoto, cvFontSize, cvSpacing, cvSidebarWidth, hiddenSections, lang });
}

// ── saveState — debounced (400ms), writes to active CV slot ───

let _saveTimer = null;
let _saveIndicatorTimer = null;

function saveState() {
  // Show indicator immediately for snappy feel
  const el = $('save-indicator');
  if (el) el.classList.add('visible');
  // Debounce the actual write
  clearTimeout(_saveTimer);
  _saveTimer = setTimeout(_doSaveState, 400);
}

function _doSaveState() {
  const json = exportState();
  const list = getCVList();
  if (list.activeCvId) {
    localStorage.setItem(CV_PREFIX + list.activeCvId, json);
    // Update timestamp in index
    const cv = list.cvs.find(c => c.id === list.activeCvId);
    if (cv) { cv.updatedAt = Date.now(); saveCVList(list); }
  } else {
    localStorage.setItem(STATE_KEY, json); // fallback
  }
  clearTimeout(_saveIndicatorTimer);
  _saveIndicatorTimer = setTimeout(() => {
    const el = $('save-indicator');
    if (el) el.classList.remove('visible');
  }, 2000);
}

// ── Multi-CV management ───────────────────────────────────────

function genCvId() {
  return 'cv-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function getCVList() {
  try {
    const raw = localStorage.getItem(CVLIST_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return { activeCvId: null, cvs: [] };
}

function saveCVList(data) {
  localStorage.setItem(CVLIST_KEY, JSON.stringify(data));
}

function initMultiCV() {
  let list = getCVList();
  if (!list.cvs.length) {
    // First boot — migrate old single-CV if it exists
    const firstId = genCvId();
    const oldState = localStorage.getItem(STATE_KEY);
    list = {
      activeCvId: firstId,
      cvs: [{ id: firstId, name: 'Mon CV', createdAt: Date.now(), updatedAt: Date.now() }],
    };
    if (oldState) localStorage.setItem(CV_PREFIX + firstId, oldState);
    saveCVList(list);
  }
  // Load active CV state
  const saved = localStorage.getItem(CV_PREFIX + list.activeCvId);
  if (saved) importState(saved);
  renderCVSelect();
}

function renderCVSelect() {
  const list = getCVList();
  const sel = $('cv-select');
  if (!sel) return;
  sel.innerHTML = list.cvs.map(cv =>
    `<option value="${esc2(cv.id)}" ${cv.id === list.activeCvId ? 'selected' : ''}>${esc2(cv.name)}</option>`
  ).join('');
}

function switchCV(id) {
  clearTimeout(_saveTimer);
  _doSaveState(); // flush current immediately
  const list = getCVList();
  if (!list.cvs.find(c => c.id === id)) return;
  list.activeCvId = id;
  saveCVList(list);
  const saved = localStorage.getItem(CV_PREFIX + id);
  if (saved) {
    importState(saved);
  } else {
    resetState();
  }
  renderAll();
  syncDesignUI();
  renderAllTranslations();
  renderPreview();
  renderCVSelect();
}

function newCV() {
  clearTimeout(_saveTimer);
  _doSaveState();
  const list = getCVList();
  const id = genCvId();
  const name = `CV ${list.cvs.length + 1}`;
  list.cvs.push({ id, name, createdAt: Date.now(), updatedAt: Date.now() });
  list.activeCvId = id;
  saveCVList(list);
  resetState();
  renderAll();
  syncDesignUI();
  renderPreview();
  renderCVSelect();
  showToast('✓ Nouveau CV créé');
}

function duplicateCurrentCV() {
  clearTimeout(_saveTimer);
  _doSaveState();
  const list = getCVList();
  const src = list.cvs.find(c => c.id === list.activeCvId);
  const id = genCvId();
  const name = src ? src.name + ' (copie)' : `CV ${list.cvs.length + 1}`;
  const stateJson = exportState();
  list.cvs.push({ id, name, createdAt: Date.now(), updatedAt: Date.now() });
  list.activeCvId = id;
  localStorage.setItem(CV_PREFIX + id, stateJson);
  saveCVList(list);
  renderCVSelect();
  showToast('✓ CV dupliqué');
}

function deleteCurrentCV() {
  const list = getCVList();
  if (list.cvs.length <= 1) { showToast('Impossible de supprimer le seul CV'); return; }
  if (!confirm(`Supprimer "${list.cvs.find(c=>c.id===list.activeCvId)?.name || 'ce CV'}" ?`)) return;
  localStorage.removeItem(CV_PREFIX + list.activeCvId);
  list.cvs = list.cvs.filter(c => c.id !== list.activeCvId);
  list.activeCvId = list.cvs[0].id;
  saveCVList(list);
  const saved = localStorage.getItem(CV_PREFIX + list.activeCvId);
  if (saved) importState(saved); else resetState();
  renderAll();
  syncDesignUI();
  renderPreview();
  renderCVSelect();
  showToast('CV supprimé');
}

function renameCurrentCV(name) {
  const list = getCVList();
  const cv = list.cvs.find(c => c.id === list.activeCvId);
  if (cv && name.trim()) { cv.name = name.trim(); saveCVList(list); renderCVSelect(); }
}

// ── Reset state to blank CV defaults ─────────────────────────

function resetState() {
  profile = { name:'', title:'', summary:'', email:'', phone:'', city:'', linkedin:'', github:'', website:'', photoB64:'' };
  experiences = []; education = []; skills = []; projects = [];
  volunteer = []; customSections = []; publications = []; references = [];
  showReferencesToggle = true;
  extras = { certifications: [], languages: [], interests: '' };
  template = 'modern'; accentColor = '#4f6ef7'; cvFont = 'Inter';
  showPhoto = true; cvFontSize = 1; cvSpacing = 1; cvSidebarWidth = 220;
  hiddenSections = {};
  setAccent(accentColor);
  populateProfile();
}

function importState(json) {
  try {
    const s = typeof json === 'string' ? JSON.parse(json) : json;
    if (s.profile)        profile = s.profile;
    if (s.experiences)    experiences = s.experiences;
    if (s.education)      education = s.education;
    if (s.skills)         skills = s.skills;
    if (s.projects)       projects = s.projects;
    if (s.volunteer)      volunteer = s.volunteer;
    if (s.customSections) customSections = s.customSections;
    if (s.publications)   publications = s.publications;
    if (s.references)     references = s.references;
    if (typeof s.showReferencesToggle === 'boolean') showReferencesToggle = s.showReferencesToggle;
    if (s.extras)         extras = s.extras;
    if (s.template)     template = s.template;
    if (s.accentColor)  { accentColor = s.accentColor; setAccent(accentColor); }
    // Whitelist: only allow fonts that are actually loaded/loadable
    const ALLOWED_FONTS = ['Inter','Roboto','Lato','Playfair Display','Poppins','Noto Sans Arabic'];
    if (s.cvFont && ALLOWED_FONTS.includes(s.cvFont)) cvFont = s.cvFont;
    if (typeof s.showPhoto === 'boolean') showPhoto = s.showPhoto;
    if (typeof s.cvFontSize === 'number') cvFontSize = s.cvFontSize;
    if (typeof s.cvSpacing === 'number') cvSpacing = s.cvSpacing;
    if (typeof s.cvSidebarWidth === 'number') cvSidebarWidth = s.cvSidebarWidth;
    if (s.hiddenSections && typeof s.hiddenSections === 'object') hiddenSections = s.hiddenSections;
    if (s.lang && T[s.lang]) { lang = s.lang; }
    populateProfile();
    renderExperiences();
    renderEducation();
    renderSkills();
    renderProjects();
    renderVolunteer();
    renderCustomSections();
    renderPublications();
    renderReferences();
    renderCertifications();
    renderLangItems();
    $('p-interests').value = extras.interests || '';
    if ($('tog-references')) $('tog-references').checked = showReferencesToggle;
    syncDesignUI();
    renderAllTranslations();
    updateLangUI();
    renderPreview();
  } catch(e) {
    console.error('Import state error', e);
  }
}

function loadState() {
  const saved = localStorage.getItem(STATE_KEY);
  if (saved) importState(saved);
}

function syncDesignUI() {
  document.querySelectorAll('.tpl-pill').forEach(b => b.classList.toggle('active', b.dataset.tpl === template));
  document.querySelectorAll('.font-pill').forEach(b => b.classList.toggle('active', b.dataset.font === cvFont));
  $('tog-photo').checked = showPhoto;
  $('custom-color').value = accentColor;
  document.querySelectorAll('.color-dot').forEach(b => b.classList.toggle('active', b.dataset.color === accentColor));
  // Sliders
  const sliderFS = $('slider-font-size');
  if (sliderFS) { sliderFS.value = Math.round(cvFontSize * 100); $('val-font-size').textContent = Math.round(cvFontSize * 100) + '%'; }
  const sliderSp = $('slider-spacing');
  if (sliderSp) { sliderSp.value = Math.round(cvSpacing * 100); $('val-spacing').textContent = Math.round(cvSpacing * 100) + '%'; }
  const sliderSW = $('slider-sidebar-width');
  if (sliderSW) { sliderSW.value = cvSidebarWidth; $('val-sidebar-width').textContent = cvSidebarWidth + 'px'; }
  // Section toggles
  renderSectionToggles();
}

// ── Share by link ─────────────────────────────────────────────

async function buildShareUrl() {
  await loadScript(LIBS.pako);
  const json = exportState();
  const compressed = pako.deflate(new TextEncoder().encode(json));
  // Chunked encoding to avoid "Maximum call stack size exceeded" on large CVs
  let binary = '';
  for (let i = 0; i < compressed.length; i++) binary += String.fromCharCode(compressed[i]);
  const b64 = btoa(binary);
  const url = `${location.origin}${location.pathname}?cv=${encodeURIComponent(b64)}`;
  return url;
}

async function loadFromUrl() {
  const params = new URLSearchParams(location.search);
  const cv = params.get('cv');
  if (!cv) return false;
  try {
    await loadScript(LIBS.pako);
    const bytes = Uint8Array.from(atob(decodeURIComponent(cv)), c => c.charCodeAt(0));
    const json = new TextDecoder().decode(pako.inflate(bytes));
    importState(json);
    return true;
  } catch(e) {
    console.warn('Failed to load CV from URL', e);
    return false;
  }
}

async function renderShareModal() {
  const url = await buildShareUrl();
  $('share-url').value = url;
  $('share-copied').classList.add('hidden');
}

$('btn-copy-link').addEventListener('click', () => {
  const url = $('share-url').value;
  navigator.clipboard.writeText(url).then(() => {
    $('share-copied').classList.remove('hidden');
    showToast(t('link_copied'));
  }).catch(() => {
    $('share-url').select();
    document.execCommand('copy');
    $('share-copied').classList.remove('hidden');
  });
});

// ── Modals ────────────────────────────────────────────────────

function openModal(id) {
  $(id).classList.remove('hidden');
}

function closeModal(id) {
  $(id).classList.add('hidden');
}

// Close on overlay click
document.querySelectorAll('.modal-overlay').forEach(modal => {
  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal(modal.id);
  });
});

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay:not(.hidden)').forEach(m => closeModal(m.id));
  }
});

// ── Button bindings ───────────────────────────────────────────

// ── CV Switcher bindings ──────────────────────────────────────

$('cv-select').addEventListener('change', e => switchCV(e.target.value));

$('btn-new-cv').addEventListener('click', () => newCV());

$('btn-dup-cv').addEventListener('click', () => duplicateCurrentCV());

$('btn-rename-cv').addEventListener('click', () => {
  const list = getCVList();
  const current = list.cvs.find(c => c.id === list.activeCvId);
  const name = prompt('Nouveau nom du CV :', current?.name || '');
  if (name !== null) renameCurrentCV(name);
});

$('btn-delete-cv').addEventListener('click', () => deleteCurrentCV());

$('btn-lang').addEventListener('click', () => {
  renderLangModal();
  openModal('modal-lang');
});

$('btn-history').addEventListener('click', () => {
  renderHistoryModal();
  openModal('modal-history');
});

$('btn-share').addEventListener('click', () => {
  renderShareModal();
  openModal('modal-share');
});

$('btn-dark').addEventListener('click', toggleDark);

$('btn-pdf').addEventListener('click', downloadPDF);

// ── Save / Import JSON ────────────────────────────────────────

$('btn-save-json').addEventListener('click', () => {
  const json = exportState();
  const now = new Date();
  const ss = String(now.getSeconds()).padStart(2, '0');
  const aa = String(now.getMinutes()).padStart(2, '0');
  const hh = String(now.getHours()).padStart(2, '0');
  const jj = String(now.getDate()).padStart(2, '0');
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const yyyy = now.getFullYear();
  const stamp = `${ss}${aa}${hh}${mm}${jj}${yyyy}`;
  const blob = new Blob([json], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `iloveresume_cv_${stamp}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
  showToast(T[lang]?.saved_json || 'CV sauvegardé ✓');
});

$('json-file-input').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    try {
      importState(ev.target.result);
      renderCV();
      saveState();
      showToast(T[lang]?.imported_json || 'CV importé ✓');
    } catch {
      showToast(T[lang]?.import_error || 'Fichier invalide');
    }
  };
  reader.readAsText(file);
  e.target.value = '';
});


// ── Profile auto-save on input ────────────────────────────────

['p-name','p-title','p-summary','p-email','p-phone','p-city','p-linkedin','p-github','p-website'].forEach(id => {
  const el = $(id);
  if (el) el.addEventListener('input', () => { collectProfile(); });
});

// ── Keyboard shortcuts ────────────────────────────────────────

document.addEventListener('keydown', e => {
  if (e.ctrlKey || e.metaKey) {
    if (e.key === 'd') { e.preventDefault(); downloadPDF(); }
    if (e.key === 's') { e.preventDefault(); saveState(); showToast('✓ ' + t('saved_indicator')); }
  }
});

// ── Escape helper for HTML attributes ────────────────────────

function esc2(s) {
  if (!s) return '';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

// ── Render all dynamic lists ──────────────────────────────────

function renderAll() {
  renderExperiences();
  renderEducation();
  renderSkills();
  renderProjects();
  renderVolunteer();
  renderCustomSections();
  renderPublications();
  renderReferences();
  renderCertifications();
  renderLangItems();
}

function renderCV() {
  renderPreview();
}

// ── Mobile Preview ───────────────────────────────────────────

function openMobilePreview() {
  renderPreview();
  const container = $('mobile-cv-container');
  if (!container) return;
  const page = $('cv-page');
  const clone = page.cloneNode(true);
  clone.id = '';
  clone.style.transform = 'none';
  clone.style.transformOrigin = 'top left';

  container.innerHTML = '';
  container.appendChild(clone);

  // Scale to fit container width
  const cw = container.clientWidth || window.innerWidth - 32;
  const scale = Math.min(1, cw / 794);
  clone.style.transform = `scale(${scale})`;
  clone.style.transformOrigin = 'top left';
  container.style.height = (clone.scrollHeight * scale) + 'px';

  openModal('modal-mobile-preview');

  // Re-scale after modal is visible
  requestAnimationFrame(() => {
    const cw2 = container.clientWidth || window.innerWidth - 32;
    const scale2 = Math.min(1, cw2 / 794);
    clone.style.transform = `scale(${scale2})`;
    container.style.height = (clone.scrollHeight * scale2) + 'px';
  });
}

function closeMobilePreview() {
  closeModal('modal-mobile-preview');
}

// ── Init ──────────────────────────────────────────────────────

// ── Drag-and-drop (SortableJS) ────────────────────────────────

function initSortable() {
  if (typeof Sortable === 'undefined') return;

  // Experiences
  const expList = $('exp-list');
  if (expList) Sortable.create(expList, {
    handle: '.drag-handle', animation: 150, ghostClass: 'sortable-ghost',
    onEnd: () => { reorderFromDOM(expList, experiences, 'exp'); commitChange(); }
  });

  // Education
  const eduList = $('edu-list');
  if (eduList) Sortable.create(eduList, {
    handle: '.drag-handle', animation: 150, ghostClass: 'sortable-ghost',
    onEnd: () => { reorderFromDOM(eduList, education, 'edu'); commitChange(); }
  });

  // Skills
  const skillsList = $('skills-list');
  if (skillsList) Sortable.create(skillsList, {
    handle: '.drag-handle', animation: 150, ghostClass: 'sortable-ghost',
    onEnd: () => { reorderFromDOM(skillsList, skills, 'skill'); commitChange(); }
  });

  // Projects
  const projList = $('project-list');
  if (projList) Sortable.create(projList, {
    handle: '.drag-handle', animation: 150, ghostClass: 'sortable-ghost',
    onEnd: () => { reorderFromDOM(projList, projects, 'proj'); commitChange(); }
  });

  // Volunteer
  const volList = $('volunteer-list');
  if (volList) Sortable.create(volList, {
    handle: '.drag-handle', animation: 150, ghostClass: 'sortable-ghost',
    onEnd: () => { reorderFromDOM(volList, volunteer, 'vol'); commitChange(); }
  });

  // Publications
  const pubList = $('pub-list');
  if (pubList) Sortable.create(pubList, {
    handle: '.drag-handle', animation: 150, ghostClass: 'sortable-ghost',
    onEnd: () => { reorderFromDOM(pubList, publications, 'pub'); commitChange(); }
  });
}

function reorderFromDOM(listEl, arr) {
  const ids = Array.from(listEl.children).map(el => parseFloat(el.dataset.id)).filter(id => !isNaN(id));
  const reordered = [];
  ids.forEach(id => {
    const item = arr.find(x => x.id === id);
    if (item) reordered.push(item);
  });
  arr.length = 0;
  reordered.forEach(item => arr.push(item));
}

// ── ATS button binding ────────────────────────────────────────

$('btn-ats').addEventListener('click', () => {
  openModal('modal-ats');
});

$('btn-ats-analyze').addEventListener('click', () => {
  const jobDesc = $('ats-job-desc').value.trim();
  if (!jobDesc) return;
  collectProfile();
  const cv = buildCVState();
  if (typeof calculateATSScore === 'function') {
    const result = calculateATSScore(cv, jobDesc, t);
    $('ats-score-num').textContent = result.score;
    $('ats-score-num').style.color = result.score >= 70 ? '#10b981' : result.score >= 40 ? '#f59e0b' : '#ef4444';

    $('ats-suggestions-list').innerHTML = result.suggestions.map(s => {
      let text = '';
      if (s.type === 'keywords') {
        text = t('ats_add_keywords', 'Add these keywords to your CV') + ': ' + s.keywords.join(', ');
      } else if (s.type === 'section') {
        const sn = { summary: t('ats_sec_summary', 'Professional summary'), experience: t('ats_sec_experience', 'Work experience'), skills: t('ats_sec_skills', 'Skills'), education: t('ats_sec_education', 'Education'), header: t('ats_sec_header', 'Name & job title') };
        text = t('ats_add_section', 'Add or complete section') + ': ' + (sn[s.section] || s.section);
      } else if (s.type === 'format') {
        const fm = { special_chars: t('ats_fmt_chars', 'Remove special characters'), date_format: t('ats_fmt_date', 'Use consistent date format (YYYY-MM)'), summary_long: t('ats_fmt_summary_long', 'Shorten your summary'), summary_short: t('ats_fmt_summary_short', 'Expand your summary'), bullet_long: t('ats_fmt_bullet', 'Shorten bullet points'), few_bullets: t('ats_fmt_few', 'Add more bullet points'), no_contact: t('ats_fmt_contact', 'Add email or phone number') };
        text = fm[s.issue] || s.issue;
      }
      const icon = s.priority === 'high' ? '🔴' : '🟡';
      return `<div class="ats-suggestion"><span>${icon}</span><span>${text}</span></div>`;
    }).join('');

    $('ats-matched-list').innerHTML = result.matchedKeywords.map(k =>
      `<span class="ats-tag ats-tag-match">${k}</span>`
    ).join('');

    $('ats-missing-list').innerHTML = result.missingKeywords.map(k =>
      `<span class="ats-tag ats-tag-miss">${k}</span>`
    ).join('');

    $('ats-results').classList.remove('hidden');
  }
});

// ── Screen reader announcer ───────────────────────────────────

function announce(msg) {
  const el = $('sr-announcer');
  if (el) { el.textContent = ''; requestAnimationFrame(() => { el.textContent = msg; }); }
}

// ── Init ──────────────────────────────────────────────────────

async function init() {
  initDark();
  initLang();
  renderAllTranslations();

  const loadedFromUrl = await loadFromUrl();
  if (!loadedFromUrl) initMultiCV();
  else renderCVSelect(); // URL import: still render select with existing CVs

  // Ensure the saved font is loaded
  ensureFontLoaded(cvFont);

  populateProfile();
  renderAll();

  goToStep(0);
  renderPreview();

  // Lazy load SortableJS then init
  loadScript(LIBS.sortable).then(() => initSortable());

  // Lazy load feature modules
  loadScript('ats.js');
  loadScript('content-library.js');

  // Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
}

init();
