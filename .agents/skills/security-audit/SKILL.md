---
name: security-audit
description: >-
  Perform a thorough 8-section security audit of AI/vibe-coded applications. Use this skill whenever inspecting
  a codebase for security vulnerabilities, secrets leakage, RLS misconfigurations, auth middleware gaps, server-side
  validation flaws, dependency risks, rate-limiting issues, CORS settings, or file upload security.
---

# Audit de Sécurité Complet pour Applications Web Vibe-Codées

## Rôle
Tu effectues un audit de sécurité complet d'une application web vibe-codée. "Vibe-codée" signifie que cette application a été principalement construite en utilisant des assistants de code IA (Claude, Cursor, Copilot, Antigravity, etc.). Ces outils produisent du code fonctionnel rapidement mais introduisent régulièrement des failles de sécurité qu'un développeur humain détecterait habituellement.
Ton travail est de trouver chacune de ces failles.

---

## Méthodologie en 2 Passes

### PASSE 1 — DÉCOUVERTE
Lis l'intégralité de la base de code avant de produire des conclusions. Construis un modèle mental de l'architecture : framework, base de données, fournisseur d'authentification, couche API, configuration de déploiement. Identifie chaque point d'entrée (pages, routes API, actions serveur, webhooks, tâches cron). Trace le flux de données depuis l'entrée utilisateur jusqu'à la base de données et retour.

### PASSE 2 — AUDIT SYSTÉMATIQUE
Parcours chaque section de la checklist ci-dessous. Pour chaque élément de la checklist, fais l'une de ces quatre choses :
- ✅ **PASSE** — La base de code gère cela correctement. Cite le fichier/ligne.
- ❌ **ÉCHOUÉ** — Une vulnérabilité existe. Documente-la complètement (voir format).
- ⚠️ **PARTIEL** — Une couverture partielle mais des lacunes subsistent. Explique ce qui manque.
- ⬚ **N/A** — Non applicable à cette base de code. Indique brièvement pourquoi.

Ne saute aucun élément. Chaque élément de la checklist reçoit son propre verdict explicite.

---

## Output Format pour les Échecs (❌ ÉCHOUÉ)

Pour chaque conclusion ❌ ÉCHOUÉ, utilise exactement cette structure :

```text
┌─────────────────────────────────────────────────────────┐
│ CONCLUSION #[numéro]                                    │
├──────────┬──────────────────────────────────────────────┤
│ Sévérité │ CRITIQUE / HAUTE / MOYENNE / BASSE          │
│ Catégorie│ ex., Exposition de Secret, RLS Manquant, etc.│
│ Emplacement│ chemin/fichier.ts:numéro_ligne             │
│ CWE      │ CWE-XXX (Nom)                                │
├──────────┴──────────────────────────────────────────────┤
│ Ce qui ne va pas :                                      │
│ [Description en langage clair de la vulnérabilité]      │
│                                                         │
│ Pourquoi c'est important :                              │
│ [Ce qu'un attaquant pourrait réellement faire avec ça]  │
│                                                         │
│ Le code vulnérable :                                    │
│ [extrait de code exact]                                 │
│                                                         │
│ La correction :                                         │
│ [extrait de code corrigé, prêt à copier/coller]         │
│                                                         │
│ Effort : ~[X] minutes                                   │
└─────────────────────────────────────────────────────────┘
```

---

## Audit Checklist (8 Sections)

### Section 1 : Variables d'Environnement et Gestion des Secrets
- ▢ **1.1 — Secrets codés en dur** : sk_live_, sk_test_, sk-, pk_live_, Bearer, eyJ, ghp_, gho_, xoxb-, AKIA, etc.
- ▢ **1.2 — Couverture .gitignore** : .env, .env.local, .env.production dans .gitignore + vérifier l'historique git.
- ▢ **1.3 — Fuites de préfixe public** : NEXT_PUBLIC_, VITE_, REACT_APP_ ne doivent JAMAIS contenir de clés service_role, clés Stripe secrètes, OpenAI keys, etc.
- ▢ **1.4 — Fuites console/erreurs** : Pas de `console.log` de secrets ou composants d'erreur exposant des variables.
- ▢ **1.5 — Exposition des artefacts de build** : Source maps désactivées en production (`productionBrowserSourceMaps: false`).
- ▢ **1.6 — Validation au démarrage** : Validation des variables requises au lancement (ex: via Zod/t3-env).

### Section 2 : Sécurité de la Base de Données (Supabase / Client DB)
- ▢ **2.1 — RLS activé** sur CHAQUE table dans le schéma public.
- ▢ **2.2 — Les policies RLS existent** (SELECT, INSERT, UPDATE, DELETE).
- ▢ **2.3 — Clauses WITH CHECK** présentes sur INSERT et UPDATE.
- ▢ **2.4 — Source d'identité des policies** : Utilise `auth.uid()`, PAS `auth.jwt()->'user_metadata'`.
- ▢ **2.5 — Isolation de la clé service_role** : Jamais importée ni utilisée côté client.
- ▢ **2.6 — Policies des buckets de stockage** : Buckets Supabase Storage protégés.
- ▢ **2.7 — Injection SQL** : Pas de requêtes SQL brutes concatenées.
- ▢ **2.8 — Fonctions SECURITY DEFINER** : Vérifier privilèges et contournements RLS.

### Section 3 : Authentification et Gestion des Sessions
- ▢ **3.1 — Le middleware d'auth existe** et s'exécute sur les routes protégées.
- ▢ **3.2 — Routage par défaut en refus** (liste blanche de routes publiques).
- ▢ **3.3 — `getUser()` vs `getSession()`** : Utiliser `supabase.auth.getUser()` côté serveur.
- ▢ **3.4 — Gestionnaire de callback auth** : Échange propre des codes auth sans leak de token.
- ▢ **3.5 — Stockage de session** : Cookies `httpOnly`, pas `localStorage`.
- ▢ **3.6 — Routes API protégées** : Vérification d'auth sur chaque route API sensible.
- ▢ **3.7 — Sécurité OAuth** : State parameter CSRF, validation des callbacks.
- ▢ **3.8 — Flux de réinitialisation de mot de passe** : Tokens expirables à usage unique.

### Section 4 : Validation Côté Serveur
- ▢ **4.1 — Validation par schéma** : Zod, Yup, Valibot côté serveur sur chaque route/action.
- ▢ **4.2 — Identité depuis la session** : `userId` extrait du JWT/session, pas du corps de la requête.
- ▢ **4.3 — Nettoyage des entrées** : Prévention XSS sur `dangerouslySetInnerHTML` / rendering HTML.
- ▢ **4.4 — Application des méthodes HTTP** : POST/PUT/PATCH/DELETE pour les mutations.
- ▢ **4.5 — Fuites dans les erreurs** : Pas de stack traces ou d'erreurs SQL brutes renvoyées au client.
- ▢ **4.6 — Signature Webhook** : Validation des signatures Stripe/GitHub/etc.

### Section 5 : Sécurité des Dépendances et Packages
- ▢ **5.1 — Résultats d'audit** : Exécuter `npm audit` / `pnpm audit`.
- ▢ **5.2 — Packages hallucinés** : Détecter les noms de packages suspects ou ultra-récents.
- ▢ **5.3 — Lockfile commité** : `package-lock.json` ou `pnpm-lock.yaml` présent.
- ▢ **5.4 — Packages obsolètes** : Mettre à jour les libs d'auth et crypto.
- ▢ **5.5 — Dépendances inutilisées** : Supprimer les packages superflus.

### Section 6 : Limitation de Débit (Rate Limiting)
- ▢ **6.1 — Opérations coûteuses** : Rate limiting sur les routes appelant OpenAI, Anthropic, Stripe, SMS/Email.
- ▢ **6.2 — Endpoints d'auth** : Protection contre la force brute (login, reset password).
- ▢ **6.3 — Implémentation serveur** : Rate-limiting basé sur Redis / Upstash.

### Section 7 : Configuration CORS
- ▢ **7.1 — CORS des routes API** : Restreindre `Access-Control-Allow-Origin` aux domaines légitimes.
- ▢ **7.2 — Mode credentials** : `Access-Control-Allow-Credentials: true` uniquement avec origines explicites.

### Section 8 : Sécurité des Téléchargements de Fichiers
- ▢ **8.1 — Validation serveur** : Vérifier le type MIME réel et la taille des fichiers côté serveur.
- ▢ **8.2 — Permissions de stockage** : Isoler les fichiers publics et privés.
- ▢ **8.3 — Prévention d'exécution** : Répertoire d'upload hors du chemin d'exécution web.

---

## Rapport Final de Synthèse

En fin d'audit, présenter :
1. Évaluation Global de la Posture (🔴 CRITIQUE / 🟠 À AMÉLIORER / 🟡 ACCEPTABLE / 🟢 SOLIDE)
2. Conclusions Critiques et Hautes (éléments prioritaires)
3. Victoires Rapides (< 10 min)
4. Plan de Remédiation Priorisé (Sévérité puis Effort)
5. Ce qui est Déjà Bien Fait
6. Résumé Compact de la Checklist (`1.1 ✅ 1.2 ✅ 1.3 ❌ ...`)
