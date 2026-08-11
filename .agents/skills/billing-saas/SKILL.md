---
name: billing-saas
description: >-
  Build and design full-stack SaaS Billing applications (e.g. iziFacture) for African entrepreneurs. Uses Next.js 14
  (App Router), Supabase (Auth + DB), Tailwind CSS, FCFA currency formatting, automatic 18% VAT calculation, status badges,
  dashboard stats, invoice creation/details/management, client management, and high-conversion landing page.
---

# SaaS de Facturation pour Entrepreneurs Africains (iziFacture)

## Rôle et Ambition
Tu es un architecte logiciel et designer senior de classe mondiale avec 15+ ans d'expérience dans la conception d'applications SaaS de haute qualité. Tu construis une plateforme full-stack de facturation (iziFacture) adaptée aux réalités et besoins des entrepreneurs africains (Sénégal, Côte d'Ivoire, Cameroun, etc.).

---

## Fonctionnalités Clés et Directives Métier

### 1. Formatage & Règles Métier
- **Devise** : Montants obligatoirement affichés en **FCFA** avec espaces séparateurs de milliers (ex: `250 000 FCFA`). Arrondis à l'entier.
- **TVA** : Calcul automatique de la TVA à **18%** sur les lignes de factures.
- **Dates** : Format jour/mois/année (`JJ/MM/AAAA`).
- **Statuts Factures & Badges Colorés** :
  - `Payée` : Vert (`bg-emerald-500/10 text-emerald-500 border-emerald-500/20`)
  - `Envoyée` : Orange (`bg-amber-500/10 text-amber-500 border-amber-500/20`)
  - `Brouillon` : Gris (`bg-slate-500/10 text-slate-400 border-slate-500/20`)
  - `En retard` : Rouge (`bg-rose-500/10 text-rose-500 border-rose-500/20`)

---

## Pages de l'Application SaaS

### A. Dashboard & Navigation
- **Sidebar** : Responsive (Desktop fixe, Mobile tiroir hamburger avec backdrop blur). Liens : Dashboard, Factures, Clients, Paramètres.
- **4 Cartes de Stats** :
  1. Nombre total de factures
  2. Montant total facturé (FCFA)
  3. Montant encaissé / payé (FCFA)
  4. Montant en attente (FCFA)
- **Tableau des dernières factures** : Client, Date, Échéance, Montant TTC, Statut (Badge), Actions.

### B. Créer une Facture
- Sélection du client (liste déroulante).
- Date d'émission (`aujourd'hui` par défaut) et date d'échéance.
- Section lignes de facture dynamiques : Description, Quantité, Prix unitaire. Total de la ligne calculé automatiquement.
- Boutons : Ajouter une ligne / Supprimer une ligne.
- Résumé financier en bas : Sous-total HT, TVA 18%, Total TTC en FCFA.
- Boutons d'action : "Sauvegarder comme brouillon" / "Valider & Envoyer".

### C. Liste & Détail des Factures
- Tableau filtrable par statut (Tous, Brouillon, Envoyée, Payée, En retard).
- Barre de recherche en temps réel par nom de client.
- **Page Détail Facture** : Affichage complet avec prévisualisation, modification de statut, édition pré-remplie, suppression avec confirmation.

### D. Gestion des Clients
- Liste des clients avec carte/tableau.
- Formulaire d'ajout/édition : Nom, Email, Téléphone, Adresse, Ville/Pays.

### E. Landing Page High-Conversion (iziFacture)
- **Hero Section** : Titre accrocheur ("Fini les factures sur Word et Excel"), sous-titre explicatif, CTA principal ("Commencer gratuitement"), CTA secondaire ("Voir la démo"), Mockup dashboard stylisé.
- **Section Problème** : 3 douleurs fréquentes (factures non professionnelles, calculs de TVA manuels, relances impossibles).
- **Section Fonctionnalités** : Factures en 2 clics, TVA 18% auto, Suivi temps réel, Gestion clients.
- **Section Comment ça marche** : 3 étapes (Inscription -> Création -> Envoi & Suivi).
- **Témoignages** : Entrepreneurs africains (prénoms sénégalais, ivoiriens, camerounais).
- **Tarification** : Plan Gratuit (5 factures/mois), Plan Pro (5 000 FCFA/mois - mis en avant), Plan Business (15 000 FCFA/mois).
- **Footer** : Branding, "Fait avec fierté en Afrique".

---

## Stack Technique
- **Framework** : Next.js 14+ (App Router)
- **Base de Données & Auth** : Supabase (Postgres RLS + Auth cookies httpOnly)
- **Styling** : Tailwind CSS + Lucide Icons
- **Déploiement** : Vercel
