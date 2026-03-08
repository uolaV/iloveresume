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
    summary: 'Résumé / Accroche', phone: 'Téléphone', city: 'Ville / Pays',
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
    // Content helpers
    content_helpers: 'Aide à la rédaction', action_verbs: 'Verbes d\'action', bullet_templates: 'Modèles de bullet points',
    weak_words_detected: 'Mots faibles détectés',
    // AI
    ai_generate: 'Générer avec IA', ai_improve: 'Améliorer avec IA', ai_settings: 'Paramètres IA',
    ai_api_key: 'Clé API', ai_provider: 'Fournisseur', ai_generating: 'Génération en cours…',
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
    summary: 'Summary / Headline', phone: 'Phone', city: 'City / Country',
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
    content_helpers: 'Writing Help', action_verbs: 'Action verbs', bullet_templates: 'Bullet templates',
    weak_words_detected: 'Weak words detected',
    ai_generate: 'Generate with AI', ai_improve: 'Improve with AI', ai_settings: 'AI Settings',
    ai_api_key: 'API Key', ai_provider: 'Provider', ai_generating: 'Generating…',
    download_docx: 'Download DOCX',
    drag_hint: 'Drag to reorder',
    font_size: 'Font size', spacing: 'Spacing', sidebar_width: 'Sidebar width',
    section_visibility: 'Visible sections',
  },
  de: {
    step_profile: 'Profil', step_exp: 'Erfahrung', step_edu: 'Ausbildung',
    step_skills: 'Fähigkeiten', step_extras: 'Extras',
    full_name: 'Vollständiger Name *', job_title: 'Berufsbezeichnung *',
    summary: 'Zusammenfassung', phone: 'Telefon', city: 'Stadt / Land',
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
    content_helpers: 'Schreibhilfe', action_verbs: 'Aktionsverben', bullet_templates: 'Aufzählungsvorlagen',
    weak_words_detected: 'Schwache Wörter erkannt',
    ai_generate: 'Mit KI generieren', ai_improve: 'Mit KI verbessern', ai_settings: 'KI-Einstellungen',
    ai_api_key: 'API-Schlüssel', ai_provider: 'Anbieter', ai_generating: 'Wird generiert…',
    download_docx: 'DOCX herunterladen',
    drag_hint: 'Zum Neuordnen ziehen',
    font_size: 'Schriftgröße', spacing: 'Abstand', sidebar_width: 'Seitenleistenbreite',
    section_visibility: 'Sichtbare Abschnitte',
  },
  es: {
    step_profile: 'Perfil', step_exp: 'Experiencia', step_edu: 'Formación',
    step_skills: 'Habilidades', step_extras: 'Extras',
    full_name: 'Nombre completo *', job_title: 'Título / Puesto *',
    summary: 'Resumen / Titular', phone: 'Teléfono', city: 'Ciudad / País',
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
    content_helpers: 'Ayuda para redactar', action_verbs: 'Verbos de acción', bullet_templates: 'Plantillas de viñetas',
    weak_words_detected: 'Palabras débiles detectadas',
    ai_generate: 'Generar con IA', ai_improve: 'Mejorar con IA', ai_settings: 'Configuración IA',
    ai_api_key: 'Clave API', ai_provider: 'Proveedor', ai_generating: 'Generando…',
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
    summary: 'Resumo', phone: 'Telefone', city: 'Cidade / País',
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
    content_helpers: 'Ajuda na redação', action_verbs: 'Verbos de ação', bullet_templates: 'Modelos de tópicos',
    weak_words_detected: 'Palavras fracas detectadas',
    ai_generate: 'Gerar com IA', ai_improve: 'Melhorar com IA', ai_settings: 'Configurações de IA',
    ai_api_key: 'Chave API', ai_provider: 'Provedor', ai_generating: 'Gerando…',
    download_docx: 'Baixar DOCX', drag_hint: 'Arraste para reordenar',
    font_size: 'Tamanho da fonte', spacing: 'Espaçamento', sidebar_width: 'Largura da barra lateral',
    section_visibility: 'Secções visíveis',
    demo_title: 'Dados de exemplo', demo_desc: 'substitua pelos seus', demo_clear: 'Limpar tudo',
  },
  it: {
    step_profile: 'Profilo', step_exp: 'Esperienze', step_edu: 'Formazione',
    step_skills: 'Competenze', step_extras: 'Extra',
    full_name: 'Nome completo *', job_title: 'Posizione *',
    summary: 'Riepilogo', phone: 'Telefono', city: 'Città / Paese',
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
    content_helpers: 'Aiuto scrittura', action_verbs: 'Verbi d\'azione', bullet_templates: 'Modelli di elenchi',
    weak_words_detected: 'Parole deboli rilevate',
    ai_generate: 'Genera con IA', ai_improve: 'Migliora con IA', ai_settings: 'Impostazioni IA',
    ai_api_key: 'Chiave API', ai_provider: 'Fornitore', ai_generating: 'Generazione…',
    download_docx: 'Scarica DOCX', drag_hint: 'Trascina per riordinare',
    font_size: 'Dimensione carattere', spacing: 'Spaziatura', sidebar_width: 'Larghezza barra laterale',
    section_visibility: 'Sezioni visibili',
    demo_title: 'Dati di esempio', demo_desc: 'sostituiscili con i tuoi', demo_clear: 'Cancella tutto',
  },
  nl: {
    step_profile: 'Profiel', step_exp: 'Ervaring', step_edu: 'Opleiding',
    step_skills: 'Vaardigheden', step_extras: 'Extra',
    full_name: 'Volledige naam *', job_title: 'Functietitel *',
    summary: 'Samenvatting', phone: 'Telefoon', city: 'Stad / Land',
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
    ai_generate: 'Genereer met AI', ai_improve: 'Verbeter met AI', ai_settings: 'AI-instellingen',
    ai_api_key: 'API-sleutel', ai_provider: 'Aanbieder', ai_generating: 'Bezig met genereren…',
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
    summary: 'Podsumowanie', phone: 'Telefon', city: 'Miasto / Kraj',
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
    ai_generate: 'Generuj z AI', ai_improve: 'Popraw z AI', ai_settings: 'Ustawienia AI',
    ai_api_key: 'Klucz API', ai_provider: 'Dostawca', ai_generating: 'Generowanie…',
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
    summary: 'Özet', phone: 'Telefon', city: 'Şehir / Ülke',
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
    ai_generate: 'AI ile oluştur', ai_improve: 'AI ile geliştir', ai_settings: 'AI Ayarları',
    ai_api_key: 'API Anahtarı', ai_provider: 'Sağlayıcı', ai_generating: 'Oluşturuluyor…',
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
    summary: '个人简介', phone: '电话', city: '城市 / 国家',
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
    ai_generate: 'AI生成', ai_improve: 'AI优化', ai_settings: 'AI设置',
    ai_api_key: 'API密钥', ai_provider: '服务商', ai_generating: '正在生成…',
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
    ai_generate: 'AIで生成', ai_improve: 'AIで改善', ai_settings: 'AI設定',
    ai_api_key: 'APIキー', ai_provider: 'プロバイダー', ai_generating: '生成中…',
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
    summary: '요약', phone: '전화번호', city: '도시 / 국가',
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
    ai_generate: 'AI로 생성', ai_improve: 'AI로 개선', ai_settings: 'AI 설정',
    ai_api_key: 'API 키', ai_provider: '제공업체', ai_generating: '생성 중…',
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
    summary: 'सारांश', phone: 'फ़ोन', city: 'शहर / देश',
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
    ai_generate: 'AI से बनाएं', ai_improve: 'AI से सुधारें', ai_settings: 'AI सेटिंग्स',
    ai_api_key: 'API कुंजी', ai_provider: 'प्रदाता', ai_generating: 'बना रहा है…',
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
    summary: 'الملخص', phone: 'الهاتف', city: 'المدينة / البلد',
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
    ai_generate: 'إنشاء بالذكاء الاصطناعي', ai_improve: 'تحسين بالذكاء الاصطناعي', ai_settings: 'إعدادات الذكاء الاصطناعي',
    ai_api_key: 'مفتاح API', ai_provider: 'المزود', ai_generating: 'جارٍ الإنشاء…',
    download_docx: 'تحميل DOCX', drag_hint: 'اسحب لإعادة الترتيب',
    font_size: 'حجم الخط', spacing: 'التباعد', sidebar_width: 'عرض الشريط الجانبي',
    section_visibility: 'الأقسام المرئية',
    demo_title: 'بيانات تجريبية', demo_desc: 'استبدلها ببياناتك', demo_clear: 'مسح الكل',
    content_helpers: 'مساعدة الكتابة', action_verbs: 'أفعال العمل', bullet_templates: 'قوالب النقاط',
    weak_words_detected: 'تم اكتشاف كلمات ضعيفة',
  },
};

function flagImg(country, alt) {
  return `<img src="https://flagcdn.com/w40/${country}.png" alt="${alt}" style="width:20px;height:14px;object-fit:cover;border-radius:2px;display:inline-block;vertical-align:middle;">`;
}

const LANGS = [
  { code: 'fr', label: 'Français', flag: flagImg('fr','FR') },
  { code: 'en', label: 'English',  flag: flagImg('gb','GB') },
  { code: 'de', label: 'Deutsch',  flag: flagImg('de','DE') },
  { code: 'es', label: 'Español',  flag: flagImg('es','ES') },
  { code: 'pt', label: 'Português', flag: flagImg('br','BR') },
  { code: 'it', label: 'Italiano', flag: flagImg('it','IT') },
  { code: 'nl', label: 'Nederlands', flag: flagImg('nl','NL') },
  { code: 'pl', label: 'Polski', flag: flagImg('pl','PL') },
  { code: 'tr', label: 'Türkçe', flag: flagImg('tr','TR') },
  { code: 'zh', label: '中文', flag: flagImg('cn','CN') },
  { code: 'ja', label: '日本語', flag: flagImg('jp','JP') },
  { code: 'ko', label: '한국어', flag: flagImg('kr','KR') },
  { code: 'hi', label: 'हिन्दी', flag: flagImg('in','IN') },
  { code: 'ar', label: 'العربية', flag: flagImg('sa','SA') },
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

const $ = id => document.getElementById(id);
const val = id => { const el = $(id); return el ? el.value.trim() : ''; };
const t = k => (T[lang] && T[lang][k]) ? T[lang][k] : (T.fr[k] || k);

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

function setLang(code) {
  if (!T[code]) return;
  lang = code;
  localStorage.setItem('iloveresume_lang', code);
  updateLangUI();
  renderAllTranslations();
  renderPreview();
  closeModal('modal-lang');
}

const RTL_LANGS = ['ar'];

function updateLangUI() {
  const l = LANGS.find(x => x.code === lang) || LANGS[0];
  $('lang-flag').innerHTML = l.flag;
  $('lang-label').textContent = l.label;
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
  saveState();
  renderPreview();
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

$('photo-input').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    profile.photoB64 = ev.target.result;
    updatePhotoUI();
    saveState();
    renderPreview();
  };
  reader.readAsDataURL(file);
});

$('btn-remove-photo').addEventListener('click', () => {
  profile.photoB64 = '';
  $('photo-input').value = '';
  updatePhotoUI();
  saveState();
  renderPreview();
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
  const id = Date.now() + Math.random();
  experiences.push({ id, company: data.company||'', role: data.role||'', startDate: data.startDate||'', endDate: data.endDate||'', current: data.current||false, bullets: data.bullets||'' });
  renderExperiences();
}

function removeExperience(id) {
  experiences = experiences.filter(e => e.id !== id);
  renderExperiences();
  saveState();
  renderPreview();
}

function renderExperiences() {
  const list = $('exp-list');
  if (!experiences.length) { list.innerHTML = ''; return; }
  list.innerHTML = experiences.map(e => `
    <div class="entry-item" data-id="${e.id}">
      <div class="entry-header">
        <span class="drag-handle" title="${t('drag_hint')}">⠿</span>
        <span style="flex:1">${e.role || t('role')} ${e.company ? '@ '+e.company : ''}</span>
        <button class="btn-remove-entry" onclick="removeExperience(${e.id})" title="${t('delete')}">×</button>
      </div>
      <div class="fl-wrap">
        <input type="text" class="fl-input exp-role" value="${esc2(e.role)}" placeholder=" " data-id="${e.id}" />
        <label class="fl-label">${t('role')}</label>
      </div>
      <div class="fl-wrap">
        <input type="text" class="fl-input exp-company" value="${esc2(e.company)}" placeholder=" " data-id="${e.id}" />
        <label class="fl-label">${t('company')}</label>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div class="fl-wrap">
          <input type="month" class="fl-input exp-start" value="${e.startDate||''}" data-id="${e.id}" />
          <label class="fl-label">${t('start_date')}</label>
        </div>
        <div class="fl-wrap">
          <input type="month" class="fl-input exp-end" value="${e.endDate||''}" data-id="${e.id}" ${e.current ? 'disabled' : ''} />
          <label class="fl-label">${t('end_date')}</label>
        </div>
      </div>
      <label style="display:flex;align-items:center;gap:0.5rem;font-size:0.82rem;cursor:pointer;">
        <input type="checkbox" class="exp-current" data-id="${e.id}" ${e.current ? 'checked' : ''} />
        ${t('current_position')}
      </label>
      <textarea class="bullets-input exp-bullets" placeholder="${t('description')}" data-id="${e.id}">${esc2(e.bullets)}</textarea>
    </div>`).join('');

  // Events
  list.querySelectorAll('.exp-role').forEach(el => el.addEventListener('input', onExpChange));
  list.querySelectorAll('.exp-company').forEach(el => el.addEventListener('input', onExpChange));
  list.querySelectorAll('.exp-start').forEach(el => el.addEventListener('change', onExpChange));
  list.querySelectorAll('.exp-end').forEach(el => el.addEventListener('change', onExpChange));
  list.querySelectorAll('.exp-current').forEach(el => el.addEventListener('change', onExpCurrentChange));
  list.querySelectorAll('.exp-bullets').forEach(el => el.addEventListener('input', onExpChange));
}

function onExpChange(e) {
  const id = parseFloat(e.target.dataset.id);
  const exp = experiences.find(x => x.id === id);
  if (!exp) return;
  const cls = e.target.classList;
  if (cls.contains('exp-role')) exp.role = e.target.value;
  else if (cls.contains('exp-company')) exp.company = e.target.value;
  else if (cls.contains('exp-start')) exp.startDate = e.target.value;
  else if (cls.contains('exp-end')) exp.endDate = e.target.value;
  else if (cls.contains('exp-bullets')) exp.bullets = e.target.value;

  // Update header label
  const item = e.target.closest('.entry-item');
  if (item) {
    const header = item.querySelector('.entry-header span');
    if (header) header.textContent = `${exp.role || t('role')} ${exp.company ? '@ '+exp.company : ''}`;
  }
  saveState();
  renderPreview();
}

function onExpCurrentChange(e) {
  const id = parseFloat(e.target.dataset.id);
  const exp = experiences.find(x => x.id === id);
  if (!exp) return;
  exp.current = e.target.checked;
  const item = e.target.closest('.entry-item');
  if (item) {
    const endInput = item.querySelector('.exp-end');
    if (endInput) endInput.disabled = exp.current;
  }
  saveState();
  renderPreview();
}

$('btn-add-exp').addEventListener('click', () => {
  addExperience();
});

// ── Education ─────────────────────────────────────────────────

function addEducation(data = {}) {
  const id = Date.now() + Math.random();
  education.push({ id, school: data.school||'', degree: data.degree||'', field: data.field||'', startDate: data.startDate||'', endDate: data.endDate||'', grade: data.grade||'' });
  renderEducation();
}

function removeEducation(id) {
  education = education.filter(e => e.id !== id);
  renderEducation();
  saveState();
  renderPreview();
}

function renderEducation() {
  const list = $('edu-list');
  if (!education.length) { list.innerHTML = ''; return; }
  list.innerHTML = education.map(e => `
    <div class="entry-item" data-id="${e.id}">
      <div class="entry-header">
        <span>${e.degree || t('degree')} ${e.school ? '· '+e.school : ''}</span>
        <button class="btn-remove-entry" onclick="removeEducation(${e.id})" title="${t('delete')}">×</button>
      </div>
      <div class="fl-wrap">
        <input type="text" class="fl-input edu-degree" value="${esc2(e.degree)}" placeholder=" " data-id="${e.id}" />
        <label class="fl-label">${t('degree')}</label>
      </div>
      <div class="fl-wrap">
        <input type="text" class="fl-input edu-field" value="${esc2(e.field)}" placeholder=" " data-id="${e.id}" />
        <label class="fl-label">${t('field')}</label>
      </div>
      <div class="fl-wrap">
        <input type="text" class="fl-input edu-school" value="${esc2(e.school)}" placeholder=" " data-id="${e.id}" />
        <label class="fl-label">${t('school')}</label>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div class="fl-wrap">
          <input type="month" class="fl-input edu-start" value="${e.startDate||''}" data-id="${e.id}" />
          <label class="fl-label">${t('start_date')}</label>
        </div>
        <div class="fl-wrap">
          <input type="month" class="fl-input edu-end" value="${e.endDate||''}" data-id="${e.id}" />
          <label class="fl-label">${t('end_date')}</label>
        </div>
      </div>
      <div class="fl-wrap">
        <input type="text" class="fl-input edu-grade" value="${esc2(e.grade)}" placeholder=" " data-id="${e.id}" />
        <label class="fl-label">${t('grade')}</label>
      </div>
    </div>`).join('');

  list.querySelectorAll('.edu-degree,.edu-field,.edu-school,.edu-start,.edu-end,.edu-grade')
    .forEach(el => el.addEventListener('input', onEduChange));
  list.querySelectorAll('.edu-start,.edu-end')
    .forEach(el => el.addEventListener('change', onEduChange));
}

function onEduChange(e) {
  const id = parseFloat(e.target.dataset.id);
  const edu = education.find(x => x.id === id);
  if (!edu) return;
  const cls = e.target.classList;
  if (cls.contains('edu-degree')) edu.degree = e.target.value;
  else if (cls.contains('edu-field')) edu.field = e.target.value;
  else if (cls.contains('edu-school')) edu.school = e.target.value;
  else if (cls.contains('edu-start')) edu.startDate = e.target.value;
  else if (cls.contains('edu-end')) edu.endDate = e.target.value;
  else if (cls.contains('edu-grade')) edu.grade = e.target.value;

  const item = e.target.closest('.entry-item');
  if (item) {
    const header = item.querySelector('.entry-header span');
    if (header) header.textContent = `${edu.degree || t('degree')} ${edu.school ? '· '+edu.school : ''}`;
  }
  saveState();
  renderPreview();
}

$('btn-add-edu').addEventListener('click', () => addEducation());

// ── Skills ────────────────────────────────────────────────────

function addSkillGroup(data = {}) {
  const id = Date.now() + Math.random();
  skills.push({ id, category: data.category||'', items: data.items||[] });
  renderSkills();
}

function removeSkillGroup(id) {
  skills = skills.filter(s => s.id !== id);
  renderSkills();
  saveState();
  renderPreview();
}

function addSkillTag(groupId, value) {
  const group = skills.find(s => s.id === groupId);
  if (!group || !value.trim()) return;
  const tags = value.split(',').map(v => v.trim()).filter(Boolean);
  tags.forEach(tag => { if (!group.items.includes(tag)) group.items.push(tag); });
  renderSkills();
  saveState();
  renderPreview();
}

function removeSkillTag(groupId, tag) {
  const group = skills.find(s => s.id === groupId);
  if (!group) return;
  group.items = group.items.filter(i => i !== tag);
  renderSkills();
  saveState();
  renderPreview();
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
        <input type="text" class="fl-input skill-cat" value="${esc2(g.category)}" placeholder=" " data-id="${g.id}" />
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

  list.querySelectorAll('.skill-cat').forEach(el => el.addEventListener('input', e => {
    const id = parseFloat(e.target.dataset.id);
    const group = skills.find(s => s.id === id);
    if (group) {
      group.category = e.target.value;
      const header = e.target.closest('.entry-item').querySelector('.entry-header span');
      if (header) header.textContent = e.target.value || t('skill_category');
    }
    saveState(); renderPreview();
  }));

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
  const id = Date.now() + Math.random();
  projects.push({ id, name: data.name||'', description: data.description||'', url: data.url||'', tech: data.tech||'' });
  renderProjects();
}

function removeProject(id) {
  projects = projects.filter(p => p.id !== id);
  renderProjects();
  saveState(); renderPreview();
}

function renderProjects() {
  const list = $('project-list');
  if (!list) return;
  if (!projects.length) { list.innerHTML = ''; return; }
  list.innerHTML = projects.map(p => `
    <div class="entry-item" data-id="${p.id}">
      <div class="entry-header">
        <span>${p.name || t('project_name')}</span>
        <button class="btn-remove-entry" onclick="removeProject(${p.id})" title="${t('delete')}">×</button>
      </div>
      <div class="fl-wrap">
        <input type="text" class="fl-input proj-name" value="${esc2(p.name)}" placeholder=" " data-id="${p.id}" />
        <label class="fl-label">${t('project_name')}</label>
      </div>
      <div class="fl-wrap">
        <textarea class="bullets-input proj-desc" placeholder="${t('project_description')}" data-id="${p.id}">${esc2(p.description)}</textarea>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div class="fl-wrap">
          <input type="url" class="fl-input proj-url" value="${esc2(p.url)}" placeholder=" " data-id="${p.id}" />
          <label class="fl-label">${t('project_url')}</label>
        </div>
        <div class="fl-wrap">
          <input type="text" class="fl-input proj-tech" value="${esc2(p.tech)}" placeholder=" " data-id="${p.id}" />
          <label class="fl-label">${t('project_tech')}</label>
        </div>
      </div>
    </div>`).join('');

  list.querySelectorAll('.proj-name,.proj-desc,.proj-url,.proj-tech').forEach(el => el.addEventListener('input', e => {
    const id = parseFloat(e.target.dataset.id);
    const proj = projects.find(x => x.id === id);
    if (!proj) return;
    const cls = e.target.classList;
    if (cls.contains('proj-name')) { proj.name = e.target.value; const h = e.target.closest('.entry-item')?.querySelector('.entry-header span'); if(h) h.textContent = proj.name || t('project_name'); }
    else if (cls.contains('proj-desc')) proj.description = e.target.value;
    else if (cls.contains('proj-url')) proj.url = e.target.value;
    else if (cls.contains('proj-tech')) proj.tech = e.target.value;
    saveState(); renderPreview();
  }));
}

$('btn-add-project')?.addEventListener('click', () => addProject());

// ── Volunteer ────────────────────────────────────────────────

function addVolunteer(data = {}) {
  const id = Date.now() + Math.random();
  volunteer.push({ id, org: data.org||'', role: data.role||'', startDate: data.startDate||'', endDate: data.endDate||'', description: data.description||'' });
  renderVolunteer();
}

function removeVolunteer(id) {
  volunteer = volunteer.filter(v => v.id !== id);
  renderVolunteer();
  saveState(); renderPreview();
}

function renderVolunteer() {
  const list = $('volunteer-list');
  if (!list) return;
  if (!volunteer.length) { list.innerHTML = ''; return; }
  list.innerHTML = volunteer.map(v => `
    <div class="entry-item" data-id="${v.id}">
      <div class="entry-header">
        <span>${v.role || t('volunteer_role')} ${v.org ? '@ '+v.org : ''}</span>
        <button class="btn-remove-entry" onclick="removeVolunteer(${v.id})" title="${t('delete')}">×</button>
      </div>
      <div class="fl-wrap">
        <input type="text" class="fl-input vol-role" value="${esc2(v.role)}" placeholder=" " data-id="${v.id}" />
        <label class="fl-label">${t('volunteer_role')}</label>
      </div>
      <div class="fl-wrap">
        <input type="text" class="fl-input vol-org" value="${esc2(v.org)}" placeholder=" " data-id="${v.id}" />
        <label class="fl-label">${t('volunteer_org')}</label>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div class="fl-wrap">
          <input type="month" class="fl-input vol-start" value="${v.startDate||''}" data-id="${v.id}" />
          <label class="fl-label">${t('start_date')}</label>
        </div>
        <div class="fl-wrap">
          <input type="month" class="fl-input vol-end" value="${v.endDate||''}" data-id="${v.id}" />
          <label class="fl-label">${t('end_date')}</label>
        </div>
      </div>
      <textarea class="bullets-input vol-desc" placeholder="${t('description')}" data-id="${v.id}">${esc2(v.description)}</textarea>
    </div>`).join('');

  list.querySelectorAll('.vol-role,.vol-org,.vol-start,.vol-end,.vol-desc').forEach(el => el.addEventListener('input', e => {
    const id = parseFloat(e.target.dataset.id);
    const vol = volunteer.find(x => x.id === id);
    if (!vol) return;
    const cls = e.target.classList;
    if (cls.contains('vol-role')) { vol.role = e.target.value; const h = e.target.closest('.entry-item')?.querySelector('.entry-header span'); if(h) h.textContent = `${vol.role || t('volunteer_role')} ${vol.org ? '@ '+vol.org : ''}`; }
    else if (cls.contains('vol-org')) { vol.org = e.target.value; const h = e.target.closest('.entry-item')?.querySelector('.entry-header span'); if(h) h.textContent = `${vol.role || t('volunteer_role')} ${vol.org ? '@ '+vol.org : ''}`; }
    else if (cls.contains('vol-start')) vol.startDate = e.target.value;
    else if (cls.contains('vol-end')) vol.endDate = e.target.value;
    else if (cls.contains('vol-desc')) vol.description = e.target.value;
    saveState(); renderPreview();
  }));
  list.querySelectorAll('.vol-start,.vol-end').forEach(el => el.addEventListener('change', el.dispatchEvent.bind(el, new Event('input'))));
}

$('btn-add-volunteer')?.addEventListener('click', () => addVolunteer());

// ── Custom Sections ──────────────────────────────────────────

function addCustomSection(data = {}) {
  const id = Date.now() + Math.random();
  customSections.push({ id, title: data.title||'', entries: data.entries||[] });
  renderCustomSections();
}

function removeCustomSection(id) {
  customSections = customSections.filter(s => s.id !== id);
  renderCustomSections();
  saveState(); renderPreview();
}

function addCustomEntry(sectionId, data = {}) {
  const section = customSections.find(s => s.id === sectionId);
  if (!section) return;
  const id = Date.now() + Math.random();
  section.entries.push({ id, title: data.title||'', subtitle: data.subtitle||'', date: data.date||'', description: data.description||'' });
  renderCustomSections();
  saveState(); renderPreview();
}

function removeCustomEntry(sectionId, entryId) {
  const section = customSections.find(s => s.id === sectionId);
  if (!section) return;
  section.entries = section.entries.filter(e => e.id !== entryId);
  renderCustomSections();
  saveState(); renderPreview();
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
    saveState(); renderPreview();
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
    saveState(); renderPreview();
  }));
}

$('btn-add-custom-section')?.addEventListener('click', () => addCustomSection());

// ── Extras: Certifications ────────────────────────────────────

function addCertification(data = {}) {
  const id = Date.now() + Math.random();
  extras.certifications.push({ id, name: data.name||'', issuer: data.issuer||'', date: data.date||'' });
  renderCertifications();
}

function removeCertification(id) {
  extras.certifications = extras.certifications.filter(c => c.id !== id);
  renderCertifications();
  saveState(); renderPreview();
}

function renderCertifications() {
  const list = $('cert-list');
  if (!extras.certifications.length) { list.innerHTML = ''; return; }
  list.innerHTML = extras.certifications.map(c => `
    <div class="entry-item" style="padding:0.625rem;" data-id="${c.id}">
      <div style="display:flex;gap:0.5rem;align-items:flex-start;">
        <div style="flex:1;display:grid;grid-template-columns:1fr 1fr auto;gap:0.5rem;">
          <div class="fl-wrap">
            <input type="text" class="fl-input cert-name" value="${esc2(c.name)}" placeholder=" " data-id="${c.id}" />
            <label class="fl-label" style="font-size:0.7rem;">${t('cert_name')}</label>
          </div>
          <div class="fl-wrap">
            <input type="text" class="fl-input cert-issuer" value="${esc2(c.issuer)}" placeholder=" " data-id="${c.id}" />
            <label class="fl-label" style="font-size:0.7rem;">${t('cert_issuer')}</label>
          </div>
          <div class="fl-wrap" style="width:110px;">
            <input type="month" class="fl-input cert-date" value="${c.date||''}" data-id="${c.id}" />
            <label class="fl-label" style="font-size:0.7rem;">${t('cert_date')}</label>
          </div>
        </div>
        <button class="btn-remove-entry" onclick="removeCertification(${c.id})">×</button>
      </div>
    </div>`).join('');

  list.querySelectorAll('.cert-name,.cert-issuer,.cert-date').forEach(el => el.addEventListener('input', e => {
    const id = parseFloat(e.target.dataset.id);
    const cert = extras.certifications.find(c => c.id === id);
    if (!cert) return;
    const cls = e.target.classList;
    if (cls.contains('cert-name')) cert.name = e.target.value;
    else if (cls.contains('cert-issuer')) cert.issuer = e.target.value;
    else if (cls.contains('cert-date')) cert.date = e.target.value;
    saveState(); renderPreview();
  }));
  list.querySelectorAll('.cert-date').forEach(el => el.addEventListener('change', e => {
    const id = parseFloat(e.target.dataset.id);
    const cert = extras.certifications.find(c => c.id === id);
    if (cert) { cert.date = e.target.value; saveState(); renderPreview(); }
  }));
}

$('btn-add-cert').addEventListener('click', () => addCertification());

// ── Extras: Languages ─────────────────────────────────────────

function addLangItem(data = {}) {
  const id = Date.now() + Math.random();
  extras.languages.push({ id, name: data.name||'', level: data.level||'' });
  renderLangItems();
}

function removeLangItem(id) {
  extras.languages = extras.languages.filter(l => l.id !== id);
  renderLangItems();
  saveState(); renderPreview();
}

function renderLangItems() {
  const list = $('langs-list');
  if (!extras.languages.length) { list.innerHTML = ''; return; }
  list.innerHTML = extras.languages.map(l => `
    <div class="entry-item" style="padding:0.625rem;" data-id="${l.id}">
      <div style="display:flex;gap:0.5rem;align-items:center;">
        <div class="fl-wrap" style="flex:1;">
          <input type="text" class="fl-input lang-name" value="${esc2(l.name)}" placeholder=" " data-id="${l.id}" />
          <label class="fl-label" style="font-size:0.7rem;">${t('lang_name')}</label>
        </div>
        <div class="fl-wrap" style="flex:1;">
          <input type="text" class="fl-input lang-level" value="${esc2(l.level)}" placeholder=" " data-id="${l.id}" />
          <label class="fl-label" style="font-size:0.7rem;">${t('lang_level')}</label>
        </div>
        <button class="btn-remove-entry" onclick="removeLangItem(${l.id})">×</button>
      </div>
    </div>`).join('');

  list.querySelectorAll('.lang-name,.lang-level').forEach(el => el.addEventListener('input', e => {
    const id = parseFloat(e.target.dataset.id);
    const item = extras.languages.find(x => x.id === id);
    if (!item) return;
    if (e.target.classList.contains('lang-name')) item.name = e.target.value;
    else item.level = e.target.value;
    saveState(); renderPreview();
  }));
}

$('btn-add-lang-item').addEventListener('click', () => addLangItem());

// Interests
$('p-interests').addEventListener('input', () => {
  extras.interests = $('p-interests').value;
  saveState(); renderPreview();
});

// ── Publications ──────────────────────────────────────────────

function addPublication(data = {}) {
  const id = Date.now() + Math.random();
  publications.push({ id, title: data.title||'', authors: data.authors||'', venue: data.venue||'', date: data.date||'', url: data.url||'' });
  renderPublications();
}

function removePublication(id) {
  publications = publications.filter(p => p.id !== id);
  renderPublications();
  saveState(); renderPreview();
}

function renderPublications() {
  const list = $('pub-list');
  if (!list) return;
  if (!publications.length) { list.innerHTML = ''; return; }
  list.innerHTML = publications.map(p => `
    <div class="entry-item" data-id="${p.id}">
      <div class="entry-header">
        <span>${esc2(p.title) || t('pub_title')}</span>
        <button class="btn-remove-entry" onclick="removePublication(${p.id})">×</button>
      </div>
      <div class="grid grid-cols-1 gap-2">
        <div class="fl-wrap">
          <input type="text" class="fl-input pub-title" value="${esc2(p.title)}" placeholder=" " data-id="${p.id}" />
          <label class="fl-label">${t('pub_title')}</label>
        </div>
        <div class="fl-wrap">
          <input type="text" class="fl-input pub-authors" value="${esc2(p.authors)}" placeholder=" " data-id="${p.id}" />
          <label class="fl-label">${t('pub_authors')}</label>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div class="fl-wrap">
            <input type="text" class="fl-input pub-venue" value="${esc2(p.venue)}" placeholder=" " data-id="${p.id}" />
            <label class="fl-label">${t('pub_venue')}</label>
          </div>
          <div class="fl-wrap">
            <input type="month" class="fl-input pub-date" value="${p.date||''}" data-id="${p.id}" />
            <label class="fl-label">${t('pub_date')}</label>
          </div>
        </div>
        <div class="fl-wrap">
          <input type="url" class="fl-input pub-url" value="${esc2(p.url)}" placeholder=" " data-id="${p.id}" />
          <label class="fl-label">${t('pub_url')}</label>
        </div>
      </div>
    </div>`).join('');

  list.querySelectorAll('.pub-title,.pub-authors,.pub-venue,.pub-date,.pub-url').forEach(el => el.addEventListener('input', e => {
    const id = parseFloat(e.target.dataset.id);
    const pub = publications.find(p => p.id === id);
    if (!pub) return;
    const cls = e.target.classList;
    if (cls.contains('pub-title')) pub.title = e.target.value;
    else if (cls.contains('pub-authors')) pub.authors = e.target.value;
    else if (cls.contains('pub-venue')) pub.venue = e.target.value;
    else if (cls.contains('pub-date')) pub.date = e.target.value;
    else if (cls.contains('pub-url')) pub.url = e.target.value;
    saveState(); renderPreview();
  }));
}

$('btn-add-pub').addEventListener('click', () => addPublication());

// ── References ────────────────────────────────────────────────

function addReference(data = {}) {
  const id = Date.now() + Math.random();
  references.push({ id, name: data.name||'', title: data.title||'', company: data.company||'', email: data.email||'', phone: data.phone||'' });
  renderReferences();
}

function removeReference(id) {
  references = references.filter(r => r.id !== id);
  renderReferences();
  saveState(); renderPreview();
}

function renderReferences() {
  const list = $('ref-list');
  if (!list) return;
  if (!references.length) { list.innerHTML = ''; return; }
  list.innerHTML = references.map(r => `
    <div class="entry-item" data-id="${r.id}">
      <div class="entry-header">
        <span>${esc2(r.name) || t('ref_name')}</span>
        <button class="btn-remove-entry" onclick="removeReference(${r.id})">×</button>
      </div>
      <div class="grid grid-cols-2 gap-2">
        <div class="fl-wrap">
          <input type="text" class="fl-input ref-name" value="${esc2(r.name)}" placeholder=" " data-id="${r.id}" />
          <label class="fl-label">${t('ref_name')}</label>
        </div>
        <div class="fl-wrap">
          <input type="text" class="fl-input ref-title-input" value="${esc2(r.title)}" placeholder=" " data-id="${r.id}" />
          <label class="fl-label">${t('ref_title')}</label>
        </div>
        <div class="fl-wrap">
          <input type="text" class="fl-input ref-company" value="${esc2(r.company)}" placeholder=" " data-id="${r.id}" />
          <label class="fl-label">${t('ref_company')}</label>
        </div>
        <div class="fl-wrap">
          <input type="email" class="fl-input ref-email" value="${esc2(r.email)}" placeholder=" " data-id="${r.id}" />
          <label class="fl-label">${t('ref_email')}</label>
        </div>
        <div class="fl-wrap">
          <input type="tel" class="fl-input ref-phone" value="${esc2(r.phone)}" placeholder=" " data-id="${r.id}" />
          <label class="fl-label">${t('ref_phone')}</label>
        </div>
      </div>
    </div>`).join('');

  list.querySelectorAll('.ref-name,.ref-title-input,.ref-company,.ref-email,.ref-phone').forEach(el => el.addEventListener('input', e => {
    const id = parseFloat(e.target.dataset.id);
    const ref = references.find(r => r.id === id);
    if (!ref) return;
    const cls = e.target.classList;
    if (cls.contains('ref-name')) ref.name = e.target.value;
    else if (cls.contains('ref-title-input')) ref.title = e.target.value;
    else if (cls.contains('ref-company')) ref.company = e.target.value;
    else if (cls.contains('ref-email')) ref.email = e.target.value;
    else if (cls.contains('ref-phone')) ref.phone = e.target.value;
    saveState(); renderPreview();
  }));
}

$('btn-add-ref').addEventListener('click', () => addReference());

$('tog-references').addEventListener('change', () => {
  showReferencesToggle = $('tog-references').checked;
  saveState(); renderPreview();
});

// ── Design options ────────────────────────────────────────────

document.querySelectorAll('.tpl-pill').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tpl-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    template = btn.dataset.tpl;
    saveState(); renderPreview();
  });
});

document.querySelectorAll('.color-dot').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.color-dot').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    $('custom-color').value = btn.dataset.color;
    setAccent(btn.dataset.color);
    saveState(); renderPreview();
  });
});

$('custom-color').addEventListener('input', e => {
  document.querySelectorAll('.color-dot').forEach(b => b.classList.remove('active'));
  setAccent(e.target.value);
  saveState(); renderPreview();
});

document.querySelectorAll('.font-pill').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.font-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    cvFont = btn.dataset.font;
    saveState(); renderPreview();
  });
});

$('tog-photo').addEventListener('change', () => {
  showPhoto = $('tog-photo').checked;
  saveState(); renderPreview();
});

// ── Sliders ──────────────────────────────────────────────────
$('slider-font-size').addEventListener('input', e => {
  cvFontSize = parseInt(e.target.value, 10) / 100;
  $('val-font-size').textContent = e.target.value + '%';
  saveState(); renderPreview();
});
$('slider-spacing').addEventListener('input', e => {
  cvSpacing = parseInt(e.target.value, 10) / 100;
  $('val-spacing').textContent = e.target.value + '%';
  saveState(); renderPreview();
});
$('slider-sidebar-width').addEventListener('input', e => {
  cvSidebarWidth = parseInt(e.target.value, 10);
  $('val-sidebar-width').textContent = e.target.value + 'px';
  saveState(); renderPreview();
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
      saveState(); renderPreview();
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
  let out = html;
  // Scale font sizes
  if (cvFontSize !== 1) {
    out = out.replace(/font-size:\s*([\d.]+)(rem|em|px)/g, (m, num, unit) => {
      return `font-size:${(parseFloat(num) * cvFontSize).toFixed(3)}${unit}`;
    });
  }
  // Scale spacing (margin, padding, gap)
  if (cvSpacing !== 1) {
    out = out.replace(/(margin(?:-top|-bottom|-left|-right)?|padding(?:-top|-bottom|-left|-right)?|gap|row-gap|column-gap):\s*([\d.]+)(rem|em|px)/g, (m, prop, num, unit) => {
      return `${prop}:${(parseFloat(num) * cvSpacing).toFixed(3)}${unit}`;
    });
  }
  // Sidebar width - replace common sidebar width patterns
  if (cvSidebarWidth !== 220) {
    out = out.replace(/width:220px/g, `width:${cvSidebarWidth}px`);
    out = out.replace(/width:235px/g, `width:${cvSidebarWidth}px`);
  }
  // RTL: flip direction on the root flex container and text alignment
  if (RTL_LANGS.includes(lang)) {
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

function saveToHistory() {
  const history = getHistory();
  const entry = {
    id: Date.now(),
    date: new Date().toISOString(),
    name: profile.name || t('unnamed'),
    title: profile.title || '',
    template,
    state: exportState(),
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
  list.innerHTML = history.map(item => `
    <div class="history-item">
      <div>
        <div class="font-semibold text-sm">${esc2(item.name)}</div>
        <div class="text-xs text-gray-500">${esc2(item.title)} · ${new Date(item.date).toLocaleDateString(lang)} · ${item.template}</div>
      </div>
      <div class="history-item-actions">
        <button onclick="loadFromHistory(${item.id})" title="${t('load')}">${t('load')}</button>
        <button onclick="duplicateFromHistory(${item.id})" title="${t('duplicate')}">${t('duplicate')}</button>
        <button class="btn-del" onclick="deleteFromHistory(${item.id})" title="${t('delete')}">${t('delete')}</button>
      </div>
    </div>`).join('');
}

function loadFromHistory(id) {
  const history = getHistory();
  const entry = history.find(h => h.id === id);
  if (!entry) return;
  importState(entry.state);
  closeModal('modal-history');
  showToast(t('load') + ' ✓');
}

function duplicateFromHistory(id) {
  const history = getHistory();
  const entry = history.find(h => h.id === id);
  if (!entry) return;
  importState(entry.state);
  closeModal('modal-history');
}

function deleteFromHistory(id) {
  let history = getHistory();
  history = history.filter(h => h.id !== id);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  renderHistoryModal();
}

// ── State persistence ─────────────────────────────────────────

const STATE_KEY = 'iloveresume_state';

function exportState() {
  return JSON.stringify({ profile, experiences, education, skills, projects, volunteer, customSections, publications, references, showReferencesToggle, extras, template, accentColor, cvFont, showPhoto, cvFontSize, cvSpacing, cvSidebarWidth, hiddenSections, lang });
}

let _saveIndicatorTimer = null;
function saveState() {
  localStorage.setItem(STATE_KEY, exportState());
  // Show autosave indicator
  const el = $('save-indicator');
  if (el) {
    el.classList.add('visible');
    clearTimeout(_saveIndicatorTimer);
    _saveIndicatorTimer = setTimeout(() => el.classList.remove('visible'), 2000);
  }
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
    if (s.cvFont)       cvFont = s.cvFont;
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
  const b64 = btoa(String.fromCharCode(...compressed));
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
    if (e.key === 's') { e.preventDefault(); saveState(); showToast('✓ Sauvegardé'); }
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
    onEnd: () => { reorderFromDOM(expList, experiences, 'exp'); saveState(); renderPreview(); }
  });

  // Education
  const eduList = $('edu-list');
  if (eduList) Sortable.create(eduList, {
    handle: '.drag-handle', animation: 150, ghostClass: 'sortable-ghost',
    onEnd: () => { reorderFromDOM(eduList, education, 'edu'); saveState(); renderPreview(); }
  });

  // Skills
  const skillsList = $('skills-list');
  if (skillsList) Sortable.create(skillsList, {
    handle: '.drag-handle', animation: 150, ghostClass: 'sortable-ghost',
    onEnd: () => { reorderFromDOM(skillsList, skills, 'skill'); saveState(); renderPreview(); }
  });

  // Projects
  const projList = $('project-list');
  if (projList) Sortable.create(projList, {
    handle: '.drag-handle', animation: 150, ghostClass: 'sortable-ghost',
    onEnd: () => { reorderFromDOM(projList, projects, 'proj'); saveState(); renderPreview(); }
  });

  // Volunteer
  const volList = $('volunteer-list');
  if (volList) Sortable.create(volList, {
    handle: '.drag-handle', animation: 150, ghostClass: 'sortable-ghost',
    onEnd: () => { reorderFromDOM(volList, volunteer, 'vol'); saveState(); renderPreview(); }
  });

  // Publications
  const pubList = $('pub-list');
  if (pubList) Sortable.create(pubList, {
    handle: '.drag-handle', animation: 150, ghostClass: 'sortable-ghost',
    onEnd: () => { reorderFromDOM(pubList, publications, 'pub'); saveState(); renderPreview(); }
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

    $('ats-suggestions-list').innerHTML = result.suggestions.map(s =>
      `<div class="ats-suggestion"><span>💡</span><span>${s}</span></div>`
    ).join('');

    $('ats-matched-list').innerHTML = result.matchedKeywords.map(k =>
      `<span class="ats-tag ats-tag-match">${k}</span>`
    ).join('');

    $('ats-missing-list').innerHTML = result.missingKeywords.map(k =>
      `<span class="ats-tag ats-tag-miss">${k}</span>`
    ).join('');

    $('ats-results').classList.remove('hidden');
  }
});

// ── AI Settings binding ───────────────────────────────────────

$('btn-ai-save').addEventListener('click', () => {
  const key = $('ai-api-key').value.trim();
  const provBtn = document.querySelector('[data-ai-provider].active');
  const provider = provBtn ? provBtn.dataset.aiProvider : 'openai';
  if (typeof setAPIKey === 'function') setAPIKey(key, provider);
  closeModal('modal-ai');
  showToast('✓ API key saved');
});

document.querySelectorAll('[data-ai-provider]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-ai-provider]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
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
  if (!loadedFromUrl) loadState();

  populateProfile();
  renderAll();

  goToStep(0);
  renderPreview();

  // Lazy load SortableJS then init
  loadScript(LIBS.sortable).then(() => initSortable());

  // Lazy load feature modules
  loadScript('ats.js');
  loadScript('content-library.js');
  loadScript('ai.js').then(() => { if (typeof initAI === 'function') initAI(); });

  // Load stored AI key
  const storedKey = localStorage.getItem('iloveresume_ai_key');
  const storedProvider = localStorage.getItem('iloveresume_ai_provider') || 'openai';
  if (storedKey && $('ai-api-key')) $('ai-api-key').value = storedKey;
  document.querySelectorAll('[data-ai-provider]').forEach(b => b.classList.toggle('active', b.dataset.aiProvider === storedProvider));

  // Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
}

init();
