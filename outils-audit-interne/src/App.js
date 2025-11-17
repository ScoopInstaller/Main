import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const slides = [
    {
      id: 0,
      title: "Les Outils et Techniques de l'Audit Interne",
      subtitle: "Une Approche Méthodologique Complète",
      type: "cover"
    },
    {
      id: 1,
      title: "Plan de Présentation",
      type: "plan",
      content: [
        { number: "I", text: "Les Outils d'Interrogation" },
        { number: "II", text: "Les Outils de Description" },
        { number: "III", text: "Les Outils d'Analyse" },
        { number: "IV", text: "Les Outils de Vérification" },
        { number: "V", text: "Les Outils Informatiques" }
      ]
    },
    {
      id: 2,
      title: "I. Les Outils d'Interrogation",
      subtitle: "Collecter l'Information Directement",
      type: "section",
      content: [
        {
          tool: "L'Interview",
          description: "Technique fondamentale permettant de recueillir des informations qualitatives auprès des acteurs concernés.",
          points: [
            "Préparation minutieuse des questions",
            "Écoute active et reformulation",
            "Documentation immédiate des réponses",
            "Validation des informations collectées"
          ]
        },
        {
          tool: "Le Questionnaire",
          description: "Outil structuré pour obtenir des réponses standardisées sur un large échantillon.",
          points: [
            "Questions fermées et ouvertes",
            "Échelle de notation",
            "Analyse quantitative des résultats",
            "Identification des tendances"
          ]
        }
      ]
    },
    {
      id: 3,
      title: "Le Questionnaire de Contrôle Interne (QCI)",
      type: "detailed",
      content: {
        definition: "Document spécifique élaboré pour chaque mission d'audit, permettant d'évaluer le dispositif de contrôle interne.",
        methodology: "Les 5 Questions Fondamentales (QQOQCP)",
        questions: [
          { q: "Qui ?", desc: "Questions relatives à l'opérateur, aux responsabilités" },
          { q: "Quoi ?", desc: "L'objet, de quoi s'agit-il ? Nature de l'opération" },
          { q: "Où ?", desc: "Les endroits où l'opération se déroule, localisation" },
          { q: "Quand ?", desc: "Début, fin, durée, saisonnalité, planning temporel" },
          { q: "Comment ?", desc: "Mode opératoire, procédures, méthodes utilisées" }
        ],
        note: "Le QCI est nécessairement spécifique à chaque mission et stimule la découverte."
      }
    },
    {
      id: 4,
      title: "II. Les Outils de Description",
      subtitle: "Représenter et Analyser les Processus",
      type: "section",
      content: [
        {
          tool: "L'Organigramme Fonctionnel",
          description: "Représentation graphique des relations entre fonctions, services et tâches d'un processus.",
          points: [
            "Visualisation des flux d'information",
            "Identification des responsabilités",
            "Mise en évidence des points de contrôle",
            "Détection des redondances ou lacunes"
          ]
        },
        {
          tool: "Le Diagramme de Circulation (Flow Chart)",
          description: "Schématisation du cheminement des documents et informations dans l'organisation.",
          points: [
            "Traçabilité des opérations",
            "Identification des goulots d'étranglement",
            "Optimisation des circuits",
            "Clarification des interfaces"
          ]
        }
      ]
    },
    {
      id: 5,
      title: "La Grille d'Analyse des Tâches",
      type: "detailed",
      content: {
        definition: "Outil matriciel permettant d'analyser la répartition des tâches et la séparation des fonctions.",
        objectifs: [
          "Identifier les cumuls de fonctions incompatibles",
          "Vérifier la séparation des tâches",
          "Détecter les risques de fraude",
          "Optimiser la répartition des responsabilités"
        ],
        structure: "Matrice croisant les tâches (lignes) avec les acteurs (colonnes)",
        avantages: [
          "Vision synthétique de l'organisation",
          "Détection rapide des anomalies",
          "Support de discussion avec les audités",
          "Base pour les recommandations"
        ]
      }
    },
    {
      id: 6,
      title: "III. Les Outils d'Analyse",
      subtitle: "Évaluer et Identifier les Risques",
      type: "section",
      content: [
        {
          tool: "Le Tableau des Risques",
          description: "Outil permettant d'identifier, évaluer et hiérarchiser les risques par processus.",
          points: [
            "Découpage de l'activité en tâches",
            "Définition des objectifs par tâche",
            "Identification des risques potentiels",
            "Évaluation de la criticité (Important/Moyen/Faible)",
            "Vérification des dispositifs de contrôle"
          ]
        },
        {
          tool: "La Cartographie des Risques",
          description: "Représentation visuelle des risques selon leur probabilité et leur impact.",
          points: [
            "Priorisation des zones à auditer",
            "Communication visuelle efficace",
            "Suivi de l'évolution des risques",
            "Allocation optimale des ressources"
          ]
        }
      ]
    },
    {
      id: 7,
      title: "L'Analyse SWOT en Audit",
      type: "detailed",
      content: {
        definition: "Outil d'analyse stratégique adapté à l'audit interne pour évaluer un processus ou une fonction.",
        quadrants: [
          {
            name: "Forces (Strengths)",
            desc: "Points forts du dispositif de contrôle interne",
            examples: ["Procédures bien documentées", "Personnel compétent", "Systèmes informatiques performants"]
          },
          {
            name: "Faiblesses (Weaknesses)",
            desc: "Lacunes et vulnérabilités identifiées",
            examples: ["Absence de séparation des tâches", "Documentation obsolète", "Manque de formation"]
          },
          {
            name: "Opportunités (Opportunities)",
            desc: "Possibilités d'amélioration",
            examples: ["Digitalisation des processus", "Automatisation", "Nouvelles technologies"]
          },
          {
            name: "Menaces (Threats)",
            desc: "Risques externes et contraintes",
            examples: ["Évolution réglementaire", "Cybermenaces", "Pression concurrentielle"]
          }
        ]
      }
    },
    {
      id: 8,
      title: "IV. Les Outils de Vérification",
      subtitle: "Valider par les Tests et Preuves",
      type: "section",
      content: [
        {
          tool: "Les Tests de Conformité",
          description: "Vérification que les procédures sont appliquées conformément aux règles établies.",
          points: [
            "Sélection d'échantillons représentatifs",
            "Vérification documentaire",
            "Validation des autorisations",
            "Contrôle de la traçabilité"
          ]
        },
        {
          tool: "Les Tests de Substance",
          description: "Vérification de la réalité et de l'exactitude des opérations et des soldes.",
          points: [
            "Contrôle arithmétique",
            "Rapprochements et réconciliations",
            "Confirmations externes",
            "Inventaires physiques"
          ]
        }
      ]
    },
    {
      id: 9,
      title: "La Feuille de Révélation et d'Analyse de Problème (FRAP)",
      type: "detailed",
      content: {
        definition: "Document standardisé permettant de formaliser les constats d'audit de manière structurée.",
        structure: [
          { element: "Problème", desc: "Description claire et factuelle de l'anomalie constatée" },
          { element: "Faits", desc: "Preuves tangibles et vérifiables du problème" },
          { element: "Causes", desc: "Analyse des origines du dysfonctionnement" },
          { element: "Conséquences", desc: "Impact réel ou potentiel sur l'organisation" },
          { element: "Recommandations", desc: "Solutions proposées pour corriger le problème" }
        ],
        avantages: [
          "Standardisation de la documentation",
          "Traçabilité des constats",
          "Base pour le rapport d'audit",
          "Facilite le suivi des recommandations"
        ]
      }
    },
    {
      id: 10,
      title: "V. Les Outils Informatiques",
      subtitle: "Digitalisation et Automatisation de l'Audit",
      type: "section",
      content: [
        {
          tool: "Logiciels d'Audit Assisté par Ordinateur (CAATT)",
          description: "Outils permettant d'analyser de grands volumes de données de manière automatisée.",
          points: [
            "Extraction et analyse de données",
            "Détection d'anomalies",
            "Tests automatisés",
            "Échantillonnage statistique"
          ]
        },
        {
          tool: "Outils de Data Analytics",
          description: "Technologies avancées pour l'analyse prédictive et la détection de fraudes.",
          points: [
            "Intelligence artificielle",
            "Machine Learning",
            "Visualisation de données",
            "Audit continu (Continuous Auditing)"
          ]
        }
      ]
    },
    {
      id: 11,
      title: "Les Outils de Gestion de Mission",
      type: "detailed",
      content: {
        definition: "Plateformes intégrées pour planifier, exécuter et documenter les missions d'audit.",
        fonctionnalites: [
          "Planification annuelle des audits",
          "Gestion des programmes d'audit",
          "Documentation électronique des travaux",
          "Suivi des recommandations",
          "Reporting automatisé",
          "Collaboration en équipe"
        ],
        exemples: [
          "TeamMate (Wolters Kluwer)",
          "AuditBoard",
          "Galvanize (Diligent)",
          "SAP Audit Management",
          "ACL Analytics"
        ],
        benefices: [
          "Gain de temps et d'efficacité",
          "Standardisation des pratiques",
          "Amélioration de la traçabilité",
          "Facilitation du reporting"
        ]
      }
    },
    {
      id: 12,
      title: "Synthèse : Sélection des Outils",
      type: "synthesis",
      content: {
        principe: "Le choix des outils dépend de plusieurs facteurs",
        facteurs: [
          {
            titre: "Nature de la Mission",
            desc: "Audit de conformité, opérationnel, informatique, ou stratégique"
          },
          {
            titre: "Complexité du Processus",
            desc: "Processus simple vs. processus complexe multi-sites"
          },
          {
            titre: "Ressources Disponibles",
            desc: "Temps, budget, compétences de l'équipe d'audit"
          },
          {
            titre: "Maturité de l'Organisation",
            desc: "Niveau de formalisation et de digitalisation"
          }
        ],
        recommandation: "L'auditeur doit combiner plusieurs outils de manière complémentaire pour obtenir une assurance raisonnable sur l'efficacité du contrôle interne."
      }
    },
    {
      id: 13,
      title: "Conclusion",
      type: "conclusion",
      content: {
        message: "Les outils et techniques de l'audit interne constituent un arsenal méthodologique indispensable pour mener des missions efficaces et rigoureuses.",
        points: [
          "La maîtrise de ces outils garantit la qualité et la crédibilité des travaux d'audit",
          "L'évolution technologique enrichit continuellement la boîte à outils de l'auditeur",
          "L'adaptation des outils au contexte spécifique de chaque mission est essentielle",
          "La formation continue des auditeurs aux nouveaux outils est un impératif"
        ],
        citation: "« Un bon auditeur n'est pas celui qui connaît tous les outils, mais celui qui sait choisir et combiner les bons outils au bon moment. »"
      }
    },
    {
      id: 14,
      title: "Références",
      type: "references",
      content: [
        "Cadre de référence internationale des pratiques professionnelles - IIA Edition 2024",
        "Normes Internationales d'Audit Interne - IIA",
        "IFACI - Institut Français de l'Audit et du Contrôle Internes",
        "Jacques Renard - Théorie et pratique de l'audit interne",
        "Olivier Lemant - La conduite d'une mission d'audit interne",
        "COSO - Internal Control Framework",
        "ISO 19011 - Lignes directrices pour l'audit des systèmes de management"
      ]
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const renderSlide = (slide) => {
    switch (slide.type) {
      case 'cover':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center px-8">
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center transform rotate-12 shadow-2xl">
                <svg className="w-12 h-12 text-white transform -rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {slide.title}
            </h1>
            <p className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 font-light">
              {slide.subtitle}
            </p>
            <div className="mt-12 flex items-center gap-4 text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm">Présentation Interactive</span>
              </div>
            </div>
          </div>
        );

      case 'plan':
        return (
          <div className="h-full flex flex-col px-12 py-8">
            <h2 className="text-4xl font-bold mb-12 text-gray-800 dark:text-white">{slide.title}</h2>
            <div className="grid grid-cols-1 gap-6 flex-1">
              {slide.content.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-6 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-blue-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {item.number}
                  </div>
                  <p className="text-xl font-medium text-gray-700 dark:text-gray-200">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'section':
        return (
          <div className="h-full flex flex-col px-12 py-8">
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">{slide.title}</h2>
              {slide.subtitle && (
                <p className="text-xl text-gray-600 dark:text-gray-300">{slide.subtitle}</p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
              {slide.content.map((item, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{item.tool}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{item.description}</p>
                  <ul className="space-y-3">
                    {item.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );

      case 'detailed':
        return (
          <div className="h-full flex flex-col px-12 py-8 overflow-y-auto">
            <h2 className="text-4xl font-bold mb-8 text-gray-800 dark:text-white">{slide.title}</h2>
            <div className="space-y-6">
              {slide.content.definition && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border-l-4 border-blue-500">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Définition</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{slide.content.definition}</p>
                </div>
              )}

              {slide.content.methodology && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">{slide.content.methodology}</h3>
                  {slide.content.questions && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {slide.content.questions.map((q, idx) => (
                        <div key={idx} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{q.q}</span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 text-sm">{q.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {slide.content.objectifs && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Objectifs</h3>
                  <ul className="space-y-3">
                    {slide.content.objectifs.map((obj, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {slide.content.structure && (
                <div className="bg-blue-50 dark:bg-gray-700 rounded-xl p-4">
                  <p className="text-gray-700 dark:text-gray-300"><strong>Structure:</strong> {slide.content.structure}</p>
                </div>
              )}

              {slide.content.avantages && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Avantages</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {slide.content.avantages.map((av, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300 text-sm">{av}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {slide.content.quadrants && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {slide.content.quadrants.map((quad, idx) => (
                    <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                      <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{quad.name}</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{quad.desc}</p>
                      <ul className="space-y-2">
                        {quad.examples.map((ex, i) => (
                          <li key={i} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                            <span className="text-blue-500">•</span>
                            <span>{ex}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {slide.content.fonctionnalites && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Fonctionnalités</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {slide.content.fonctionnalites.map((func, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300 text-sm">{func}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {slide.content.exemples && (
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">Exemples de Solutions</h3>
                  <div className="flex flex-wrap gap-2">
                    {slide.content.exemples.map((ex, idx) => (
                      <span key={idx} className="bg-purple-200 dark:bg-purple-700 text-purple-800 dark:text-purple-200 px-4 py-2 rounded-full text-sm font-medium">
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {slide.content.benefices && (
                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">Bénéfices</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {slide.content.benefices.map((ben, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300 text-sm">{ben}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {slide.content.structure && slide.content.structure.length && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Structure</h3>
                  <div className="space-y-4">
                    {slide.content.structure.map((item, idx) => (
                      <div key={idx} className="border-l-4 border-blue-500 pl-4 py-2">
                        <h4 className="font-bold text-gray-800 dark:text-white mb-1">{item.element}</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {slide.content.note && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded-r-xl p-4">
                  <p className="text-gray-700 dark:text-gray-300 text-sm italic">{slide.content.note}</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'synthesis':
        return (
          <div className="h-full flex flex-col px-12 py-8">
            <h2 className="text-4xl font-bold mb-8 text-gray-800 dark:text-white">{slide.title}</h2>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
                <h3 className="text-2xl font-bold mb-3">Principe Fondamental</h3>
                <p className="text-lg">{slide.content.principe}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {slide.content.facteurs.map((facteur, idx) => (
                  <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 dark:text-blue-400 font-bold">{idx + 1}</span>
                      </div>
                      <h4 className="text-lg font-bold text-gray-800 dark:text-white">{facteur.titre}</h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{facteur.desc}</p>
                  </div>
                ))}
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded-r-2xl p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Recommandation</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{slide.content.recommandation}</p>
              </div>
            </div>
          </div>
        );

      case 'conclusion':
        return (
          <div className="h-full flex flex-col items-center justify-center px-12 py-8 text-center">
            <div className="max-w-4xl">
              <h2 className="text-5xl font-bold mb-8 text-gray-800 dark:text-white">{slide.title}</h2>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 mb-8 shadow-xl">
                <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  {slide.content.message}
                </p>
              </div>

              <div className="space-y-4 mb-8">
                {slide.content.points.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md text-left">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-gray-700 dark:text-gray-300">{point}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-2xl">
                <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p className="text-lg italic leading-relaxed">{slide.content.citation}</p>
              </div>
            </div>
          </div>
        );

      case 'references':
        return (
          <div className="h-full flex flex-col px-12 py-8">
            <h2 className="text-4xl font-bold mb-8 text-gray-800 dark:text-white">{slide.title}</h2>
            <div className="grid grid-cols-1 gap-4">
              {slide.content.map((ref, idx) => (
                <div key={idx} className="flex items-start gap-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">{idx + 1}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 pt-1">{ref}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 rounded-full px-8 py-3 text-white font-bold text-xl shadow-lg">
                Merci de votre attention
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-md z-50">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">Outils d'Audit Interne</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {currentSlide + 1} / {slides.length}
              </span>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                {darkMode ? (
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="pt-20 pb-24 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
              {renderSlide(slides[currentSlide])}
            </div>
          </div>
        </main>

        {/* Navigation */}
        <footer className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Précédent
              </button>

              <div className="flex gap-2 overflow-x-auto max-w-md">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentSlide
                        ? 'bg-blue-600 w-8'
                        : 'bg-gray-300 dark:bg-gray-600 hover:bg-blue-400'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                disabled={currentSlide === slides.length - 1}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Suivant
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </footer>

        {/* Keyboard Navigation Hint */}
        <div className="fixed bottom-28 right-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 text-xs text-gray-600 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">←</kbd>
            <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">→</kbd>
            <span>pour naviguer</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
