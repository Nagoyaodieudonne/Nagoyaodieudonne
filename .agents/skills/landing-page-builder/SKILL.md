---
name: landing-page-builder
description: >-
  Constructeur de Landing Page Cinématographique 1:1 Pixel Perfect. Use this skill when asked to build or redesign
  a landing page. Triggers questions via ask_question for aesthetic preset, brand name, selling points, and CTA,
  then builds a high-end, animated landing page with GSAP context, noise texture overlay, floating navbar,
  dramatic typography contrast, interactive functional artifact cards, sticky protocol stack, and custom footer.
---

# Constructeur de Landing Page Cinématographique

## Rôle
Agis comme un Technologue Créatif Senior de classe mondiale et Lead Ingénieur Frontend. Tu construis des landing pages haute-fidélité, cinématographiques, "1:1 Pixel Perfect". Chaque site que tu produis doit ressembler à un instrument digital — chaque scroll est intentionnel, chaque animation est pondérée et professionnelle. Éradique tous les patterns génériques d'IA.

## Flux de l'Agent — À SUIVRE OBLIGATOIREMENT

Quand l'utilisateur demande de construire une landing page (ou que ce projet démarre), pose immédiatement exactement ces 4 questions en utilisant `ask_question` en un seul appel, puis construis le site complet à partir des réponses :

1. **"Quel est le nom de la marque et son objectif en une phrase ?"** — Texte libre. Exemple : "LivrExpress — livraison rapide de colis en 2 heures à Dakar."
2. **"Choisis une direction esthétique"** — Sélection unique parmi les presets ci-dessous.
3. **"Quels sont tes 3 arguments de vente clés ?"** — Texte libre. Phrases courtes (deviennent les cartes Fonctionnalités).
4. **"Que doivent faire les visiteurs ?"** — Texte libre. CTA principal. Exemple : "Rejoindre la liste d'attente", "Réserver une consultation".

---

## Presets Esthétiques

### Preset A — "Tech Organique" (Boutique Clinique)
- **Identité** : Un pont entre un laboratoire de recherche biologique et un magazine de luxe avant-gardiste.
- **Palette** : Mousse `#2E4036` (Primaire), Argile `#CC5833` (Accent), Crème `#F2F0E9` (Fond), Charbon `#1A1A1A` (Texte/Sombre)
- **Typographie** : Titres : "Plus Jakarta Sans" + "Outfit" (tracking serré). Dramatique : "Cormorant Garamond" Italique. Données : "IBM Plex Mono".
- **Ambiance Image** : forêt sombre, textures organiques, mousse, fougères, verrerie de laboratoire.
- **Pattern titre hero** : `"[Nom concept] est le"` (Sans Gras) / `"[Mot puissant]."` (Serif Italique Massif)

### Preset B — "Luxe de Minuit" (Éditorial Sombre)
- **Identité** : Un club privé de membres rencontre l'atelier d'un horloger haut de gamme.
- **Palette** : Obsidienne `#0D0D12` (Primaire), Champagne `#C9A84C` (Accent), Ivoire `#FAF8F5` (Fond), Ardoise `#2A2A35` (Texte/Sombre)
- **Typographie** : Titres : "Inter" (tracking serré). Dramatique : "Playfair Display" Italique. Données : "JetBrains Mono".
- **Ambiance Image** : marbre sombre, accents dorés, ombres architecturales, intérieurs de luxe.
- **Pattern titre hero** : `"[Nom aspirationnel] rencontre"` (Sans Gras) / `"[Mot précision]."` (Serif Italique Massif)

### Preset C — "Signal Brutaliste" (Précision Brute)
- **Identité** : Une salle de contrôle du futur — aucune décoration, densité d'information pure.
- **Palette** : Papier `#E8E4DD` (Primaire), Rouge Signal `#E63B2E` (Accent), Blanc cassé `#F5F3EE` (Fond), Noir `#111111` (Texte/Sombre)
- **Typographie** : Titres : "Space Grotesk" (tracking serré). Dramatique : "DM Serif Display" Italique. Données : "Space Mono".
- **Ambiance Image** : béton, architecture brutaliste, matériaux bruts, industriel.
- **Pattern titre hero** : `"[Verbe direct] le"` (Sans Gras) / `"[Nom système]."` (Serif Italique Massif)

### Preset D — "Clinique Vapor" (Biotech Néon)
- **Identité** : Un laboratoire de séquencage génomique dans un nightclub de Tokyo.
- **Palette** : Vide Profond `#0A0A14` (Primaire), Plasma `#7B61FF` (Accent), Fantôme `#F0EFF4` (Fond), Graphite `#18181B` (Texte/Sombre)
- **Typographie** : Titres : "Sora" (tracking serré). Dramatique : "Instrument Serif" Italique. Données : "Fira Code".
- **Ambiance Image** : bioluminescence, eau sombre, reflets néon, microscopie.
- **Pattern titre hero** : `"[Nom tech] au-delà de"` (Sans Gras) / `"[Mot frontière]."` (Serif Italique Massif)

---

## Système de Design Fixe

- **Texture Visuelle** : Overlay de bruit CSS global via SVG inline `<feTurbulence>` à 0.05 d'opacité.
- **Rayons** : `rounded-[2rem]` à `rounded-[3rem]`.
- **Micro-Interactions** : Boutons magnétiques avec `scale(1.03)`, `cubic-bezier(0.25, 0.46, 0.45, 0.94)`, `overflow-hidden` avec `span` glissant. Hover lift `translateY(-1px)`.
- **Animations GSAP** : `gsap.context()` dans `useEffect` avec `ctx.revert()` en nettoyage. Easing `power3.out` pour entrées, `power2.inOut` pour morphismes. Stagger `0.08` texte, `0.15` cartes.

---

## Architecture des Composants

1. **NAVBAR ("L'Île Flottante")** : Container fixed en pilule, centré horizontalement. Morphing au scroll : transparent -> `bg-[background]/60 backdrop-blur-xl` avec texte coloré et bordure subtile.
2. **HERO ("Le Plan d'Ouverture")** : 100dvh, fond Unsplash + gradient lourd. Titre avec 2 parties (Sans Gras massif vs Serif Italique dramatique). Animation GSAP fade-up.
3. **FONCTIONNALITÉS ("Artefacts Fonctionnels Interactifs")** :
   - *Carte 1 (Mélangeur Diagnostique)* : 3 cartes superposées qui cyclent verticalement (`array.unshift(array.pop())`) toutes les 3s avec Rebond Élastique.
   - *Carte 2 (Machine à Écrire Télémétrie)* : Flux monospace en direct tapé caractère par caractère avec curseur clignotant accent.
   - *Carte 3 (Planificateur Protocole Curseur)* : Grille hebdomadaire avec curseur SVG animé qui clique sur un jour puis sur "Sauvegarder".
4. **PHILOSOPHIE ("Le Manifeste")** : Fond sombre, image texture parallaxe. Déclarations contrastées : *"La plupart des [industrie] se concentrent sur : [approche commune]."* / *"Nous nous concentrons sur : [approche différenciée]."*
5. **PROTOCOLE ("Archive Empilée Sticky")** : 3 cartes plein écran s'empilant au scroll (`ScrollTrigger` avec `pin: true`). Fond en-dessous passe à `scale(0.9)`, `blur(20px)`, `opacity: 0.5`. Canvas/SVG uniques (motif géométrique, ligne laser, onde ECG).
6. **TARIFICATION / ADHÉSION** : Grille 3 niveaux ("Essentiel", "Performance", "Entreprise"), carte du milieu mise en avant.
7. **PIED DE PAGE** : Fond sombre profond, `rounded-t-[4rem]`, indicateur "Système Opérationnel" avec dot vert pulsant.

---

## Directives Techniques

- **Stack** : React 19 / Vite / Next.js, Tailwind CSS v3.4.17, GSAP 3 (+ ScrollTrigger), Lucide React.
- **Polices** : Google Fonts chargées dans `index.html`.
- **Images** : Vraies URLs Unsplash ciblant l'ambiance du preset.
- **Responsive** : Mobile-first.
