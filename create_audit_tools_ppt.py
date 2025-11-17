#!/usr/bin/env python3
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor

def add_title_slide(prs, title, subtitle=""):
    """Add a title slide"""
    slide_layout = prs.slide_layouts[0]  # Title slide layout
    slide = prs.slides.add_slide(slide_layout)

    title_shape = slide.shapes.title
    subtitle_shape = slide.placeholders[1]

    title_shape.text = title
    if subtitle:
        subtitle_shape.text = subtitle

    return slide

def add_content_slide(prs, title, content_list):
    """Add a content slide with bullet points"""
    slide_layout = prs.slide_layouts[1]  # Title and Content layout
    slide = prs.slides.add_slide(slide_layout)

    title_shape = slide.shapes.title
    title_shape.text = title

    body_shape = slide.placeholders[1]
    text_frame = body_shape.text_frame
    text_frame.clear()

    for item in content_list:
        if isinstance(item, tuple):
            text, level = item
        else:
            text = item
            level = 0

        p = text_frame.add_paragraph()
        p.text = text
        p.level = level
        p.font.size = Pt(18 if level == 0 else 16)

    return slide

def add_section_slide(prs, section_number, section_title):
    """Add a section divider slide"""
    slide_layout = prs.slide_layouts[5]  # Blank layout
    slide = prs.slides.add_slide(slide_layout)

    # Add section number
    left = Inches(1)
    top = Inches(3)
    width = Inches(8)
    height = Inches(1)

    textbox = slide.shapes.add_textbox(left, top, width, height)
    text_frame = textbox.text_frame
    text_frame.text = section_number

    p = text_frame.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    p.font.size = Pt(60)
    p.font.bold = True
    p.font.color.rgb = RGBColor(0, 51, 102)

    # Add section title
    left = Inches(1)
    top = Inches(4.5)

    textbox2 = slide.shapes.add_textbox(left, top, width, height)
    text_frame2 = textbox2.text_frame
    text_frame2.text = section_title

    p2 = text_frame2.paragraphs[0]
    p2.alignment = PP_ALIGN.CENTER
    p2.font.size = Pt(32)
    p2.font.bold = True
    p2.font.color.rgb = RGBColor(0, 51, 102)

    return slide

# Create presentation
prs = Presentation()
prs.slide_width = Inches(10.833)  # 16:9 aspect ratio (similar to original)
prs.slide_height = Inches(6.094)

# Slide 1: Title Slide
slide = prs.slide_layouts[0]
slide = prs.slides.add_slide(slide)
title = slide.shapes.title
subtitle = slide.placeholders[1]
title.text = "Exposé sous le thème :\nLES OUTILS ET TECHNIQUES\nDE L'AUDIT INTERNE"
subtitle.text = "Réalisé par :\n[Votre Nom]\n\nEncadré par :\n[Nom de l'Encadrant]\n\nAnnée universitaire : 2025-2026"

# Slide 2: Table of Contents
content_slide = add_content_slide(prs, "PLAN", [
    "Introduction",
    "I. Les Outils d'Interrogation",
    "II. Les Outils de Description",
    "III. Les Outils d'Analyse et de Traitement",
    "IV. Les Techniques Modernes et Digitales",
    "V. Les Outils de Suivi et de Reporting",
    "Conclusion"
])

# Slide 3: Introduction
content = [
    "Dans un environnement économique complexe et en constante évolution, l'audit interne joue un rôle crucial dans la gouvernance et la maîtrise des risques des organisations.",
    "",
    ("L'efficacité d'une mission d'audit repose largement sur la qualité des outils et techniques utilisés par l'auditeur interne. Ces outils permettent de collecter, analyser et interpréter les informations nécessaires pour évaluer le dispositif de contrôle interne et formuler des recommandations pertinentes.", 0),
    "",
    ("Cette présentation explore les principaux outils et techniques de l'audit interne, depuis les méthodes traditionnelles d'interrogation et de description jusqu'aux approches modernes basées sur les technologies digitales et l'analyse de données.", 0)
]
add_content_slide(prs, "Introduction", content)

# Slide 4: Section I
add_section_slide(prs, "I", "Les Outils d'Interrogation")

# Slide 5: Les Entretiens
content = [
    "L'entretien d'audit : définition et objectifs",
    ("L'entretien est un outil fondamental qui permet à l'auditeur de recueillir des informations qualitatives directement auprès des acteurs concernés.", 1),
    ("Il permet de comprendre le fonctionnement réel des processus, d'identifier les dysfonctionnements et de valider les constats.", 1),
    "",
    "Types d'entretiens :",
    ("Entretien directif : questions précises et structurées", 1),
    ("Entretien semi-directif : questions ouvertes avec un guide", 1),
    ("Entretien non-directif : conversation libre", 1)
]
add_content_slide(prs, "I. Les Outils d'Interrogation", content)

# Slide 6: Techniques d'entretien
content = [
    "Bonnes pratiques de conduite d'entretien :",
    ("Préparation : élaborer un guide d'entretien adapté", 1),
    ("Écoute active : laisser l'audité s'exprimer librement", 1),
    ("Questions QQOQCCP : Qui ? Quoi ? Où ? Quand ? Comment ? Combien ? Pourquoi ?", 1),
    ("Prise de notes : documenter les éléments clés", 1),
    ("Validation : reformuler pour s'assurer de la compréhension", 1),
    "",
    "Points d'attention :",
    ("Éviter les questions orientées ou suggestives", 1),
    ("Respecter la confidentialité et la déontologie", 1),
    ("Triangulation : croiser avec d'autres sources", 1)
]
add_content_slide(prs, "I. Les Outils d'Interrogation", content)

# Slide 7: Les Questionnaires
content = [
    "Le Questionnaire de Contrôle Interne (QCI)",
    ("Outil structuré permettant d'évaluer systématiquement l'efficacité du contrôle interne", 1),
    ("Questions fermées (Oui/Non) facilitant l'analyse", 1),
    ("Chaque réponse négative révèle une faiblesse potentielle", 1),
    "",
    "Élaboration du QCI :",
    ("Basé sur les objectifs de contrôle interne", 1),
    ("Adapté à chaque mission et processus audité", 1),
    ("Structuré par cycle ou par processus", 1),
    "",
    "Exemple : QCI cycle achats",
    ("Existe-t-il une séparation des fonctions entre demande, approbation et réception ?", 1),
    ("Les bons de commande sont-ils systématiquement approuvés ?", 1)
]
add_content_slide(prs, "I. Les Outils d'Interrogation", content)

# Slide 8: Les Sondages et Observations
content = [
    "Les sondages statistiques",
    ("Technique d'échantillonnage pour tester un grand volume de transactions", 1),
    ("Permet d'extrapoler les résultats à l'ensemble de la population", 1),
    ("Méthodes : échantillonnage aléatoire, stratifié, systématique", 1),
    "",
    "L'observation physique",
    ("Technique consistant à observer directement les opérations", 1),
    ("Permet de vérifier l'application réelle des procédures", 1),
    ("Utile pour identifier les écarts entre procédures écrites et pratiques", 1),
    "",
    "Applications pratiques :",
    ("Observation d'un inventaire physique", 1),
    ("Visite des installations et des sites", 1),
    ("Contrôle de l'application des mesures de sécurité", 1)
]
add_content_slide(prs, "I. Les Outils d'Interrogation", content)

# Slide 9: Section II
add_section_slide(prs, "II", "Les Outils de Description")

# Slide 10: L'Organigramme Fonctionnel
content = [
    "Définition et utilité",
    ("Représentation graphique des relations entre fonctions, services et tâches", 1),
    ("Visualisation des flux d'information et des responsabilités", 1),
    ("Identification des points de contrôle et des zones à risque", 1),
    "",
    "Éléments à représenter :",
    ("Les acteurs (services, fonctions, personnes)", 1),
    ("Les tâches et opérations", 1),
    ("Les flux d'information et de documents", 1),
    ("Les points de décision et de validation", 1),
    "",
    "Avantages :",
    ("Vision claire et synthétique du processus", 1),
    ("Détection rapide des doublons ou absences de contrôle", 1),
    ("Support de communication efficace", 1)
]
add_content_slide(prs, "II. Les Outils de Description", content)

# Slide 11: Le Diagramme de Circulation (Flow Chart)
content = [
    "Qu'est-ce qu'un Flow Chart ?",
    ("Représentation graphique détaillée du cheminement des documents et informations", 1),
    ("Utilise des symboles normalisés pour représenter les opérations", 1),
    ("Permet de suivre le parcours complet d'une transaction", 1),
    "",
    "Symboles principaux :",
    ("Rectangle : opération ou traitement", 1),
    ("Losange : point de décision", 1),
    ("Flèche : sens de circulation", 1),
    ("Cercle : point de connexion", 1),
    ("Document : support papier ou électronique", 1),
    "",
    "Utilisation en audit :",
    ("Comprendre le processus audité", 1),
    ("Identifier les points de contrôle et les failles", 1),
    ("Évaluer la séparation des tâches", 1)
]
add_content_slide(prs, "II. Les Outils de Description", content)

# Slide 12: La Grille de Séparation des Tâches
content = [
    "Principe et objectif",
    ("Outil permettant de vérifier la répartition des tâches incompatibles", 1),
    ("Prévention du risque de fraude et d'erreur", 1),
    ("Respect du principe de séparation des fonctions", 1),
    "",
    "Construction de la grille :",
    ("En colonne : les différentes personnes ou fonctions", 1),
    ("En ligne : les différentes tâches du processus", 1),
    ("Matérialisation par une croix à l'intersection", 1),
    "",
    "Analyse :",
    ("Une même personne ne doit pas cumuler des tâches incompatibles", 1),
    ("Exemple : ne pas autoriser ET exécuter une transaction", 1),
    ("Fonctions incompatibles : engagement/paiement, garde/comptabilisation", 1)
]
add_content_slide(prs, "II. Les Outils de Description", content)

# Slide 13: La Piste d'Audit
content = [
    "Définition",
    ("Reconstitution chronologique d'une opération de bout en bout", 1),
    ("Permet de suivre une transaction depuis son origine jusqu'à son enregistrement final", 1),
    ("Vérification de la traçabilité et de l'intégrité des données", 1),
    "",
    "Démarche :",
    ("Approche descendante (Top-Down) : du document source à la comptabilité", 1),
    ("Approche ascendante (Bottom-Up) : de l'écriture comptable au justificatif", 1),
    "",
    "Objectifs :",
    ("Vérifier l'existence et la validité des transactions", 1),
    ("S'assurer de l'exhaustivité des enregistrements", 1),
    ("Contrôler la conformité aux procédures", 1),
    ("Évaluer la qualité du système d'information", 1)
]
add_content_slide(prs, "II. Les Outils de Description", content)

# Slide 14: Section III
add_section_slide(prs, "III", "Les Outils d'Analyse et de Traitement")

# Slide 15: La Feuille de Révélation et d'Analyse de Problèmes (FRAP)
content = [
    "Qu'est-ce que la FRAP ?",
    ("Outil méthodologique pour formaliser les constats d'audit", 1),
    ("Document structuré décrivant un dysfonctionnement", 1),
    ("Base pour l'élaboration des recommandations", 1),
    "",
    "Structure de la FRAP :",
    ("Problème : description du dysfonctionnement constaté", 1),
    ("Faits : preuves et éléments factuels observés", 1),
    ("Causes : origines du problème identifié", 1),
    ("Conséquences : impacts réels ou potentiels", 1),
    ("Recommandations : actions correctives proposées", 1),
    "",
    "Avantages :",
    ("Structuration de la pensée de l'auditeur", 1),
    ("Communication claire avec les audités", 1),
    ("Traçabilité de la démarche d'audit", 1)
]
add_content_slide(prs, "III. Les Outils d'Analyse et de Traitement", content)

# Slide 16: Le Tableau des Forces et Faiblesses
content = [
    "Objectif et utilisation",
    ("Synthèse de l'évaluation du contrôle interne", 1),
    ("Identification des points forts et des zones à risque", 1),
    ("Base pour la définition du programme de vérifications", 1),
    "",
    "Construction du tableau :",
    ("Colonne 1 : Forces (points de contrôle efficaces)", 1),
    ("Colonne 2 : Faiblesses (défaillances identifiées)", 1),
    ("Classification par processus ou par risque", 1),
    "",
    "Exploitation :",
    ("Les forces seront testées pour confirmer leur efficacité", 1),
    ("Les faiblesses feront l'objet de tests approfondis", 1),
    ("Priorisation des travaux d'audit selon la criticité", 1),
    ("Lien direct avec le plan d'audit", 1)
]
add_content_slide(prs, "III. Les Outils d'Analyse et de Traitement", content)

# Slide 17: Les Tests de Conformité et de Substance
content = [
    "Tests de conformité (Tests of Controls)",
    ("Vérification de l'existence et de l'application des contrôles", 1),
    ("Objectif : s'assurer que les procédures sont respectées", 1),
    ("Méthodes : observation, réinterrogation, ré-exécution", 1),
    "",
    "Tests de substance (Substantive Tests)",
    ("Vérification de l'exactitude et de la validité des données", 1),
    ("Objectif : détecter les erreurs ou anomalies significatives", 1),
    ("Méthodes : contrôle arithmétique, rapprochement, confirmation", 1),
    "",
    "Complémentarité des tests :",
    ("Tests de conformité → Efficacité du contrôle interne", 1),
    ("Tests de substance → Fiabilité des informations", 1),
    ("Approche combinée pour une assurance raisonnable", 1)
]
add_content_slide(prs, "III. Les Outils d'Analyse et de Traitement", content)

# Slide 18: L'Analyse de Risques et la Cartographie
content = [
    "Le tableau de risques",
    ("Identification systématique des risques par processus", 1),
    ("Évaluation de la probabilité et de l'impact", 1),
    ("Priorisation des zones à auditer", 1),
    "",
    "Critères d'évaluation :",
    ("Impact : faible, moyen, élevé, critique", 1),
    ("Probabilité : rare, possible, probable, quasi-certain", 1),
    ("Niveau de maîtrise : contrôles existants et efficaces", 1),
    "",
    "La cartographie des risques :",
    ("Représentation visuelle (matrice de risques)", 1),
    ("Axe horizontal : probabilité / Axe vertical : impact", 1),
    ("Identification des risques critiques (zone rouge)", 1),
    ("Outil de communication avec la direction", 1)
]
add_content_slide(prs, "III. Les Outils d'Analyse et de Traitement", content)

# Slide 19: Section IV
add_section_slide(prs, "IV", "Les Techniques Modernes et Digitales")

# Slide 20: L'Audit Assisté par Ordinateur (AAO)
content = [
    "Computer-Assisted Audit Techniques (CAATs)",
    ("Utilisation de logiciels pour analyser de grandes quantités de données", 1),
    ("Automatisation des tests et contrôles", 1),
    ("Augmentation de la couverture et de l'efficacité de l'audit", 1),
    "",
    "Techniques principales :",
    ("Extraction et analyse de fichiers de données", 1),
    ("Tests automatisés de conformité", 1),
    ("Détection d'anomalies et d'exceptions", 1),
    ("Échantillonnage statistique automatisé", 1),
    "",
    "Logiciels couramment utilisés :",
    ("ACL Analytics / Galvanize (maintenant Diligent)", 1),
    ("IDEA (Interactive Data Extraction and Analysis)", 1),
    ("Excel avancé avec macros et Power Query", 1),
    ("Scripts Python / R pour analyses complexes", 1)
]
add_content_slide(prs, "IV. Les Techniques Modernes et Digitales", content)

# Slide 21: Le Data Analytics en Audit
content = [
    "L'analyse de données massives (Big Data)",
    ("Analyse exhaustive vs échantillonnage traditionnel", 1),
    ("Détection de patterns et d'anomalies", 1),
    ("Audit en continu (Continuous Auditing)", 1),
    "",
    "Techniques d'analyse :",
    ("Analyse descriptive : statistiques et tendances", 1),
    ("Analyse diagnostique : identification des causes", 1),
    ("Analyse prédictive : modélisation des risques futurs", 1),
    ("Analyse prescriptive : recommandations automatisées", 1),
    "",
    "Applications pratiques :",
    ("Détection de fraudes (duplicate payments, benford's law)", 1),
    ("Analyse des cycles de facturation", 1),
    ("Contrôle des accès et des autorisations", 1),
    ("Conformité réglementaire automatisée", 1)
]
add_content_slide(prs, "IV. Les Techniques Modernes et Digitales", content)

# Slide 22: L'Intelligence Artificielle et Machine Learning
content = [
    "IA et Machine Learning en audit",
    ("Automatisation intelligente des tâches répétitives", 1),
    ("Détection avancée d'anomalies et de fraudes", 1),
    ("Analyse prédictive des risques", 1),
    "",
    "Applications concrètes :",
    ("Traitement automatique du langage naturel (NLP)", 1),
    ("  → Analyse de contrats, de clauses et de documents", 1),
    ("Reconnaissance de patterns de fraude", 1),
    ("  → Apprentissage à partir de cas historiques", 1),
    ("Classification automatique des transactions", 1),
    ("Scoring de risques en temps réel", 1),
    "",
    "Enjeux et limites :",
    ("Qualité et disponibilité des données", 1),
    ("Compétences techniques requises", 1),
    ("Questions éthiques et de confidentialité", 1),
    ("Nécessité d'un jugement humain", 1)
]
add_content_slide(prs, "IV. Les Techniques Modernes et Digitales", content)

# Slide 23: Les Outils de Process Mining
content = [
    "Le Process Mining : définition",
    ("Technique d'analyse des processus à partir des logs systèmes", 1),
    ("Reconstruction automatique des processus réels", 1),
    ("Comparaison entre processus théoriques et pratiques", 1),
    "",
    "Fonctionnalités :",
    ("Process Discovery : cartographie automatique des processus", 1),
    ("Conformance Checking : détection des écarts", 1),
    ("Performance Analysis : identification des goulots d'étranglement", 1),
    ("Root Cause Analysis : analyse des causes de non-conformité", 1),
    "",
    "Outils de Process Mining :",
    ("Celonis", 1),
    ("UiPath Process Mining", 1),
    ("Signavio Process Intelligence", 1),
    ("Microsoft Power BI avec Process Advisor", 1)
]
add_content_slide(prs, "IV. Les Techniques Modernes et Digitales", content)

# Slide 24: L'Audit en Continu (Continuous Auditing)
content = [
    "Concept de Continuous Auditing",
    ("Surveillance permanente des contrôles et des transactions", 1),
    ("Détection en temps réel des anomalies", 1),
    ("Passage d'un audit périodique à un audit permanent", 1),
    "",
    "Architecture technique :",
    ("Connecteurs aux systèmes d'information", 1),
    ("Règles de contrôle automatisées", 1),
    ("Tableaux de bord et alertes en temps réel", 1),
    ("Workflows de résolution des incidents", 1),
    "",
    "Bénéfices :",
    ("Réduction du délai de détection des anomalies", 1),
    ("Amélioration continue du contrôle interne", 1),
    ("Optimisation des ressources d'audit", 1),
    ("Augmentation de la valeur ajoutée de l'audit", 1)
]
add_content_slide(prs, "IV. Les Techniques Modernes et Digitales", content)

# Slide 25: Section V
add_section_slide(prs, "V", "Les Outils de Suivi et de Reporting")

# Slide 26: Le Rapport d'Audit
content = [
    "Structure du rapport d'audit",
    ("Page de garde : identification de la mission", 1),
    ("Synthèse managériale (Executive Summary)", 1),
    ("Rappel du contexte et des objectifs", 1),
    ("Constats, recommandations et plans d'action", 1),
    ("Annexes et pièces justificatives", 1),
    "",
    "Qualités d'un bon rapport :",
    ("Clarté : langage simple et compréhensible", 1),
    ("Concision : aller à l'essentiel", 1),
    ("Constructivité : recommandations opérationnelles", 1),
    ("Objectivité : fondé sur des faits et des preuves", 1),
    ("Hiérarchisation : priorisation des constats", 1)
]
add_content_slide(prs, "V. Les Outils de Suivi et de Reporting", content)

# Slide 27: La Classification des Recommandations
content = [
    "Niveaux de criticité",
    ("Critique : risque majeur, action immédiate requise", 1),
    ("Important : risque significatif, action à court terme", 1),
    ("Modéré : amélioration souhaitable, action à moyen terme", 1),
    ("Mineur : observation, amélioration continue", 1),
    "",
    "Éléments de la recommandation :",
    ("Description du problème", 1),
    ("Risque associé", 1),
    ("Action corrective proposée", 1),
    ("Responsable de la mise en œuvre", 1),
    ("Délai de mise en œuvre", 1),
    "",
    "Bonnes pratiques :",
    ("Recommandations SMART (Spécifiques, Mesurables, Atteignables)", 1),
    ("Co-construction avec les audités", 1)
]
add_content_slide(prs, "V. Les Outils de Suivi et de Reporting", content)

# Slide 28: Le Tableau de Suivi des Recommandations
content = [
    "Objectif du suivi",
    ("S'assurer de la mise en œuvre effective des recommandations", 1),
    ("Mesurer l'amélioration du contrôle interne", 1),
    ("Valoriser le travail de l'audit interne", 1),
    "",
    "Informations suivies :",
    ("Référence de la recommandation", 1),
    ("Date d'émission et délai de mise en œuvre", 1),
    ("Responsable de l'action", 1),
    ("Statut : non démarrée / en cours / réalisée / abandonnée", 1),
    ("Date effective de réalisation", 1),
    ("Commentaires et justifications", 1),
    "",
    "Fréquence du suivi :",
    ("Revue trimestrielle avec le management", 1),
    ("Reporting au comité d'audit", 1),
    ("Relances régulières des responsables", 1)
]
add_content_slide(prs, "V. Les Outils de Suivi et de Reporting", content)

# Slide 29: Les Indicateurs de Performance de l'Audit (KPIs)
content = [
    "Indicateurs d'activité :",
    ("Nombre de missions réalisées vs planifiées", 1),
    ("Taux de couverture du plan d'audit", 1),
    ("Heures consommées par mission", 1),
    ("Respect des délais de réalisation", 1),
    "",
    "Indicateurs de qualité :",
    ("Taux d'acceptation des recommandations", 1),
    ("Taux de mise en œuvre des recommandations", 1),
    ("Satisfaction des audités (enquêtes post-mission)", 1),
    ("Qualité des dossiers d'audit (revues internes)", 1),
    "",
    "Indicateurs d'impact :",
    ("Économies réalisées grâce aux recommandations", 1),
    ("Réduction des risques identifiés", 1),
    ("Contribution à la gouvernance et à la conformité", 1)
]
add_content_slide(prs, "V. Les Outils de Suivi et de Reporting", content)

# Slide 30: Le Tableau de Bord de l'Audit Interne
content = [
    "Objectif du tableau de bord",
    ("Outil de pilotage de l'activité d'audit", 1),
    ("Vision synthétique de la performance", 1),
    ("Support de communication avec la direction", 1),
    "",
    "Dimensions suivies :",
    ("Avancement du plan d'audit annuel", 1),
    ("État du portefeuille de recommandations", 1),
    ("Cartographie actualisée des risques", 1),
    ("Ressources consommées et disponibles", 1),
    ("Indicateurs de qualité et de satisfaction", 1),
    "",
    "Formats de présentation :",
    ("Tableaux de bord Excel / Power BI", 1),
    ("Rapports périodiques au comité d'audit", 1),
    ("Visualisations graphiques (diagrammes, heat maps)", 1),
    ("Reporting automatisé via outils GRC", 1)
]
add_content_slide(prs, "V. Les Outils de Suivi et de Reporting", content)

# Slide 31: Synthèse - Vue d'ensemble des outils
content = [
    "Classification des outils par phase d'audit :",
    "",
    "Phase de préparation :",
    ("Entretiens de prise de connaissance", 1),
    ("Cartographie des risques", 1),
    ("Définition du plan d'audit", 1),
    "",
    "Phase de réalisation :",
    ("QCI, tests, observations, FRAP", 1),
    ("Data analytics et process mining", 1),
    ("Flow charts et grilles de séparation", 1),
    "",
    "Phase de conclusion :",
    ("Rapport d'audit", 1),
    ("Tableaux de bord et KPIs", 1),
    ("Suivi des recommandations", 1)
]
add_content_slide(prs, "Synthèse des Outils", content)

# Slide 32: Conclusion
content = [
    "Les outils et techniques de l'audit interne ont considérablement évolué avec la transformation digitale. Aujourd'hui, l'auditeur moderne doit maîtriser à la fois les méthodes traditionnelles et les technologies avancées.",
    "",
    "Points clés à retenir :",
    ("La diversité des outils répond à la complexité des missions", 1),
    ("Le digital transforme l'audit : du périodique au continu", 1),
    ("L'IA et le data analytics augmentent la valeur ajoutée", 1),
    ("Le jugement professionnel reste essentiel", 1),
    ("La formation continue est indispensable", 1),
    "",
    "L'efficacité de l'audit interne repose sur la capacité de l'auditeur à sélectionner et combiner judicieusement les outils adaptés à chaque contexte, tout en maintenant les principes fondamentaux d'indépendance, d'objectivité et de rigueur méthodologique."
]
add_content_slide(prs, "Conclusion", content)

# Slide 33: Références - Ouvrages et Normes
content = [
    "Ouvrages et normes :",
    "",
    ("Cadre de Référence International des Pratiques Professionnelles (CRIPP)", 1),
    ("Normes Internationales pour la Pratique Professionnelle de l'Audit Interne - IIA 2024", 1),
    ("Guide d'Audit des Systèmes d'Information - ISACA", 1),
    ("IFACI - Les outils de l'audit interne : 40 fiches pratiques", 1),
    ("J. Renard - Théorie et pratique de l'audit interne", 1),
    ("O. Lemant - La conduite d'une mission d'audit interne", 1),
    ("COSO - Internal Control Framework", 1),
    ("ISO 31000 - Management du risque", 1)
]
add_content_slide(prs, "Références", content)

# Slide 34: Références - Sites web
content = [
    "Sites web et ressources :",
    "",
    ("The Institute of Internal Auditors (IIA) : www.theiia.org", 1),
    ("IIA Maroc : www.iiamaroc.org", 1),
    ("IFACI (France) : www.ifaci.com", 1),
    ("ISACA (Audit SI) : www.isaca.org", 1),
    ("ACL / Diligent : www.diligent.com", 1),
    ("Celonis (Process Mining) : www.celonis.com", 1),
    ("MIT Sloan - Audit Analytics Research", 1),
    ("Journal of Emerging Technologies in Accounting", 1)
]
add_content_slide(prs, "Références", content)

# Slide 35: Merci
slide_layout = prs.slide_layouts[5]  # Blank layout
slide = prs.slides.add_slide(slide_layout)

left = Inches(2)
top = Inches(2.5)
width = Inches(6.833)
height = Inches(1.5)

textbox = slide.shapes.add_textbox(left, top, width, height)
text_frame = textbox.text_frame
text_frame.text = "Merci de votre attention"

p = text_frame.paragraphs[0]
p.alignment = PP_ALIGN.CENTER
p.font.size = Pt(48)
p.font.bold = True
p.font.color.rgb = RGBColor(0, 51, 102)

# Save presentation
output_file = "/vercel/sandbox/Outils_Audit_Interne.pptx"
prs.save(output_file)
print(f"\nPresentation created successfully: {output_file}")
print(f"Total slides: {len(prs.slides)}")
