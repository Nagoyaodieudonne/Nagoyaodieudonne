import React, { useEffect, useState, useRef } from 'react';
import {
  Sparkles,
  ShoppingBag,
  MapPin,
  Clock,
  Heart,
  CheckCircle2,
  MessageCircle,
  Video,
  ChevronRight,
  Gift,
  MousePointer,
  RotateCw,
  PhoneCall,
  BookOpen,
  PackageCheck,
  Star,
  Navigation,
  Image as ImageIcon,
  Layers,
  Flame,
  Truck,
  Eye,
  Sliders,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import Lenis from 'lenis';

import Canvas3D from './components/Canvas3D';
import Card3D from './components/Card3D';
import ShowcaseCarousel from './components/ShowcaseCarousel';
import ProductModal from './components/ProductModal';

gsap.registerPlugin(ScrollTrigger);

// ——— PRODUCTS DATA — minimi concept store kids (12 articles) ———
const PRODUCTS = [
  {
    id: 1,
    name: 'Coffret Cadeau Kawaii 5.000 FCFA',
    price: '5.000 FCFA',
    category: 'Coffrets',
    tag: '🔥 Best-Seller TikTok',
    image: '/p-giftbox.jpg',
    badge: 'Offre Spéciale',
  },
  {
    id: 2,
    name: 'Kit Papeterie Back to School',
    price: '7.500 FCFA',
    category: 'Papeterie',
    tag: '📚 Back to School',
    image: '/p-stationery.jpg',
    badge: 'Nouveauté',
  },
  {
    id: 3,
    name: 'Gourde Kawaii Thermos Kids',
    price: '8.000 FCFA',
    category: 'Lifestyle',
    tag: '🌸 Rentrée Douce',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
    badge: 'Populaire',
  },
  {
    id: 4,
    name: 'Trousse Multi-Compartiments + Cahier',
    price: '6.500 FCFA',
    category: 'Papeterie',
    tag: '✨ Organisation',
    image: 'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?auto=format&fit=crop&w=800&q=80',
    badge: 'Tendance',
  },
  {
    id: 5,
    name: 'Sac à Dos Kawaii Enfant',
    price: '18.500 FCFA',
    category: 'Sacs',
    tag: '🎒 Édition Limitée',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    badge: 'Édition limitée',
  },
  {
    id: 6,
    name: 'Peluche & Jouets Mignons',
    price: '9.000 FCFA',
    category: 'Jouets',
    tag: '🎁 Idée Cadeau',
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=800&q=80',
    badge: 'Coup de ❤️',
  },
  {
    id: 7,
    name: 'Set Crayons & Feutres Pastel Arc-en-ciel',
    price: '4.500 FCFA',
    category: 'Papeterie',
    tag: '🌈 Créativité',
    image: 'https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?auto=format&fit=crop&w=800&q=80',
    badge: 'Coup de ❤️',
  },
  {
    id: 8,
    name: 'Sac à Lunch Isotherme Kids',
    price: '10.500 FCFA',
    category: 'Lifestyle',
    tag: '🥡 Pratique & Cute',
    image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=800&q=80',
    badge: 'Populaire',
  },
  {
    id: 9,
    name: 'Coffret Vacances & Plage Kids',
    price: '15.000 FCFA',
    category: 'Coffrets',
    tag: '☀️ Articles Vacances',
    image: 'https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?auto=format&fit=crop&w=800&q=80',
    badge: 'Saisonnier',
  },
  {
    id: 10,
    name: 'Stickers & Washi Tape Kawaii Pack',
    price: '3.500 FCFA',
    category: 'Papeterie',
    tag: '✂️ DIY & Déco',
    image: 'https://images.unsplash.com/photo-1614849963640-9cc74b2a826f?auto=format&fit=crop&w=800&q=80',
    badge: 'Petit prix',
  },
  {
    id: 11,
    name: 'Mini Sac Bandoulière Ado',
    price: '12.000 FCFA',
    category: 'Sacs',
    tag: '👜 Ado Tendance',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    badge: 'Nouveau',
  },
  {
    id: 12,
    name: 'Kit Bricolage & Créativité Kids',
    price: '8.500 FCFA',
    category: 'Jouets',
    tag: '🎨 Atelier Créatif',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80',
    badge: 'Éducatif',
  },
];

// ——— GALLERY — photos d'ambiance boutique / articles ———
const GALLERY = [
  { id: 1, src: '/p-giftbox.jpg', alt: 'Coffret cadeau kawaii minimi 5000 FCFA', caption: 'Gift Box 5.000 FCFA ✨' },
  { id: 2, src: '/p-stationery.jpg', alt: 'Papeterie kawaii back to school minimi', caption: 'Rentrée Kawaii 📚' },
  { id: 3, src: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80', alt: 'Cahiers et organisation', caption: 'Organisation Cute 🗒️' },
  { id: 4, src: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80', alt: 'Sac à dos kawaii enfant', caption: 'Sacs Kawaii 🎒' },
  { id: 5, src: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=800&q=80', alt: 'Jouets et peluches mignons', caption: 'Jouets & Fun 🐻' },
  { id: 6, src: 'https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?auto=format&fit=crop&w=800&q=80', alt: 'Crayons pastel kawaii', caption: 'Couleurs Pastel 🌈' },
  { id: 7, src: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80', alt: 'Mini sac ado tendance', caption: 'Mode Ado 👜' },
  { id: 8, src: 'https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?auto=format&fit=crop&w=800&q=80', alt: 'Articles vacances enfants', caption: 'Vacances ☀️' },
];

// ——— minimi official logo component ———
function MinimiLogo({ className = '', imgClassName = 'w-9 h-9', showSub = true, dark = false }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img
        src="/logo-minimi.png"
        alt="Logo MiNiMi Concept Store"
        className={`rounded-full shadow-sm border ${
          dark ? 'border-white/20' : 'border-[#FF8BA7]/40'
        } object-contain bg-[#FAF6EE] shrink-0 transition-transform duration-300 group-hover:scale-105 ${imgClassName}`}
      />
      <div className="flex flex-col">
        <span
          className={`font-cute font-bold tracking-tight text-xl leading-tight ${
            dark ? 'text-white' : 'text-[#2D1F2D]'
          }`}
        >
          minimi<span className="text-[#C8963E] text-xs align-super ml-0.5">🪐</span>
        </span>
        {showSub && (
          <span
            className={`text-[10px] font-mono tracking-wider uppercase ${
              dark ? 'text-[#FF8BA7]' : 'text-[#6E5D6E]'
            }`}
          >
            Cotonou Concept Store
          </span>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Tout');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [mixerItems, setMixerItems] = useState([
    { title: 'Gift Box Kids 5.000 FCFA', subtitle: 'Cadeau N°1 TikTok • 38.1K J\'aime', color: 'from-[#FFC5D3]/60 to-[#FFE5EC]/80' },
    { title: 'Fournitures Scolaires & Rentrée', subtitle: 'Sacs, Gourdes & Papeterie tendance', color: 'from-[#C8E6C9]/60 to-[#E0F8E9]/80' },
    { title: 'Jouets & Articles de Vacances', subtitle: 'Saisonniers — Exclusivité minimi Cotonou', color: 'from-[#BDE0FE]/60 to-[#E8F4FD]/80' },
  ]);
  const [typingText, setTypingText] = useState('');
  const fullText = 'LIVE @MINIMISTORE0 — minimi concept store kids & ado • Nouveaux arrivages : Papeterie, Jouets, Sacs & Articles Vacances • Gift Box 5.000 FCFA dispo • WhatsApp +229 01 91 61 87 07 • Cotonou, Carrefour des Policiers !';
  const [selectedDay, setSelectedDay] = useState(4);
  const [cursorClicked, setCursorClicked] = useState(false);

  const heroRef = useRef(null);
  const manifestoRef = useRef(null);
  const protocolStackRef = useRef(null);
  const featuresRef = useRef(null);
  const catalogRef = useRef(null);

  // 1. Lenis Smooth Scroll with GSAP ScrollTrigger synchronization
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 2. Mixer card rotation every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setMixerItems((prev) => {
        const copy = [...prev];
        const last = copy.pop();
        copy.unshift(last);
        return copy;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // 3. Typewriter effect
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setTypingText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) index = 0;
    }, 45);
    return () => clearInterval(timer);
  }, []);

  // 4. Schedule cursor simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedDay((prev) => (prev % 7) + 1);
      setCursorClicked(true);
      setTimeout(() => setCursorClicked(false), 500);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  // 5. GSAP animations with context
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero stagger fade-up
      gsap.fromTo(
        '.hero-animate',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.12, ease: 'power3.out', delay: 0.15 }
      );

      // Features cards slide-in
      gsap.fromTo(
        '.feature-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: { trigger: featuresRef.current, start: 'top 80%' },
        }
      );

      // Manifesto reveal
      gsap.fromTo(
        '.manifesto-reveal',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: { trigger: manifestoRef.current, start: 'top 78%' },
        }
      );

      // Catalog cards stagger
      gsap.fromTo(
        '.catalog-card',
        { y: 30, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: { trigger: catalogRef.current, start: 'top 80%' },
        }
      );

      // Protocol sticky stack
      const cards = gsap.utils.toArray('.protocol-card');
      cards.forEach((card, index) => {
        if (index < cards.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: 'top top',
            endTrigger: cards[index + 1],
            end: 'top top',
            pin: true,
            pinSpacing: false,
            scrub: true,
            onUpdate: (self) => {
              gsap.to(card, {
                scale: 1 - self.progress * 0.07,
                filter: `blur(${self.progress * 8}px)`,
                opacity: 1 - self.progress * 0.35,
                duration: 0.05,
              });
            },
          });
        } else {
          ScrollTrigger.create({ trigger: card, start: 'top top', pin: true, pinSpacing: true });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#FF477E', '#FF8BA7', '#C8963E', '#95D5B2'],
    });
  };

  const filteredProducts =
    activeCategory === 'Tout'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  const categories = ['Tout', 'Coffrets', 'Papeterie', 'Lifestyle', 'Sacs', 'Jouets'];

  return (
    <div className="relative min-h-screen bg-[#FFFDF9] text-[#2D1F2D] overflow-x-hidden selection:bg-[#FF477E] selection:text-white">
      {/* 1. Global SVG Noise Texture */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* 2. Interactive Three.js 3D WebGL Ambient Engine */}
      <Canvas3D />

      {/* 3. Floating Pill Island Navbar */}
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 w-[92%] max-w-5xl ${
          scrolled
            ? 'bg-white/85 backdrop-blur-xl shadow-xl border border-[#FF8BA7]/30 py-2.5 px-6 rounded-full'
            : 'bg-white/60 backdrop-blur-md py-3 px-6 rounded-full border border-white/50 shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between">
          <a href="#" className="group flex items-center">
            <MinimiLogo imgClassName="w-10 h-10 border-[#FF8BA7]/40 shadow-sm" />
          </a>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#2D1F2D]">
            <a href="#3d-orbit" className="hover:text-[#FF477E] transition-colors flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#FF477E]" /> Vitrine Tendance
            </a>
            <a href="#catalogue" className="hover:text-[#FF477E] transition-colors">
              Catalogue
            </a>
            <a href="#artefacts" className="hover:text-[#FF477E] transition-colors">
              Expérience
            </a>
            <a href="#boutique" className="hover:text-[#FF477E] transition-colors">
              La Boutique
            </a>
          </nav>

          {/* Direct CTA */}
          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/2290191618707?text=Bonjour%20MiNiMi%20Store%20!%20Je%20veux%20découvrir%20vos%20articles%20💕"
              target="_blank"
              rel="noreferrer"
              onClick={triggerConfetti}
              className="btn-magnetic px-4 py-2 rounded-full bg-gradient-to-r from-[#FF477E] to-[#C8963E] text-white text-xs md:text-sm font-bold shadow-md shadow-pink-500/20 flex items-center gap-1.5"
            >
              <span className="btn-magnetic-fill" />
              <span className="btn-magnetic-content flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </span>
            </a>
          </div>
        </div>
      </header>

      {/* 4. HERO SECTION ("Le Plan d'Ouverture 3D") */}
      <section
        ref={heroRef}
        className="relative min-h-[92dvh] md:min-h-screen flex items-center justify-center pt-28 pb-16 px-4"
      >
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
          {/* Left Column : Massive Typography & Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="hero-animate inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#FF8BA7]/40 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#FF477E] animate-ping" />
              <span className="text-xs font-mono font-bold text-[#FF477E]">
                🔥 38.1K J'AIME SUR TIKTOK • @MINIMISTORE0
              </span>
            </div>

            <h1 className="hero-animate text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#2D1F2D] leading-[1.08]">
              Le Mini Monde le plus{' '}
              <span className="font-serif italic font-normal text-gradient-kawaii block sm:inline">
                mignon & magique
              </span>{' '}
              de Cotonou.
            </h1>

            <p className="hero-animate text-base sm:text-lg text-[#6E5D6E] max-w-xl font-normal leading-relaxed">
              Boutique physique & en ligne dédiée aux trésors d'organisation :{' '}
              <strong className="text-[#2D1F2D]">Gift Box à 5.000 FCFA</strong>, papeterie pastel, sacs tendance, jouets et gourdes kawaii pour enfants & ados.
            </p>

            {/* CTAs */}
            <div className="hero-animate flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#3d-orbit"
                onClick={triggerConfetti}
                className="btn-magnetic px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#FF477E] via-[#FF8BA7] to-[#C8963E] text-white font-bold text-sm sm:text-base shadow-lg shadow-pink-500/25 flex items-center gap-2"
              >
                <span className="btn-magnetic-fill" />
                <span className="btn-magnetic-content flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Explorer les Best-Sellers 3D</span>
                </span>
              </a>

              <a
                href="https://www.tiktok.com/@minimistore0"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3.5 rounded-2xl bg-white/90 backdrop-blur-md border border-[#FF8BA7]/30 text-[#2D1F2D] font-bold text-sm sm:text-base shadow-sm hover:border-[#FF477E] transition-all flex items-center gap-2"
              >
                <Video className="w-4 h-4 text-[#FF477E]" />
                <span>Voir sur TikTok</span>
              </a>
            </div>

            {/* Trust Monospace Indicators */}
            <div className="hero-animate pt-4 flex flex-wrap gap-4 text-xs font-mono text-[#6E5D6E]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#95D5B2]" />
                <span>Gift Box dès 5.000 FCFA</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#95D5B2]" />
                <span>Livraison express Cotonou</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#95D5B2]" />
                <span>Boutique Carrefour des Policiers</span>
              </div>
            </div>
          </div>

          {/* Right Column : 3D Interactive Hero Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="hero-animate w-full max-w-md">
              <Card3D depth={40} className="w-full">
                <div className="relative rounded-4xl p-5 glass-card-pink border-2 border-white shadow-2xl overflow-hidden">
                  {/* Top Badge */}
                  <div className="flex justify-between items-center mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FF477E] text-white shadow-sm flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5" /> Best-Seller N°1
                    </span>
                    <span className="text-xs font-mono font-bold text-[#C8963E] bg-white/90 px-2.5 py-1 rounded-full">
                      5.000 FCFA
                    </span>
                  </div>

                  {/* Main Product Image with 3D Depth */}
                  <div className="relative w-full h-[240px] sm:h-[280px] rounded-3xl overflow-hidden mb-4 bg-white/70 shadow-inner">
                    <img
                      src="/p-giftbox.jpg"
                      alt="Coffret Cadeau MiNiMi 5000 FCFA"
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 text-white">
                      <p className="text-xs font-mono opacity-90">Offre TikTok Spéciale</p>
                      <h4 className="font-cute font-bold text-lg">Coffret Cadeau Kawaii Complet</h4>
                    </div>
                  </div>

                  {/* Quick features in card */}
                  <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                    <div className="p-2.5 rounded-xl bg-white/90 border border-[#FF8BA7]/20 flex items-center gap-2">
                      <Gift className="w-4 h-4 text-[#FF477E]" />
                      <span className="font-medium text-[#2D1F2D]">Emballage inclus</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/90 border border-[#FF8BA7]/20 flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#C8963E]" />
                      <span className="font-medium text-[#2D1F2D]">Livraison du jour</span>
                    </div>
                  </div>

                  {/* 1-Click Order Button */}
                  <button
                    onClick={() => setSelectedProduct(PRODUCTS[0])}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#FF477E] to-[#C8963E] text-white font-bold text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Commander ce Coffret (5.000 FCFA)</span>
                  </button>
                </div>
              </Card3D>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SHOWCASE CAROUSEL SECTION ("La Vitrine Vedette 120 FPS") */}
      <section id="3d-orbit" className="relative py-16 px-4 bg-gradient-to-b from-transparent via-[#FFF0F3]/50 to-transparent">
        <div className="max-w-5xl mx-auto text-center mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#FF477E]/10 text-[#FF477E] mb-3">
            <Sparkles className="w-3.5 h-3.5" /> VITRINE TENDANCE • 100% FLUIDE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#2D1F2D] font-sans tracking-tight">
            Les Meilleurs Trésors{' '}
            <span className="font-serif italic text-gradient-kawaii font-normal">
              MiNiMi Cotonou
            </span>
          </h2>
          <p className="text-[#6E5D6E] text-sm sm:text-base mt-2 max-w-xl mx-auto">
            Défilement ultra-fluide au doigt sur mobile : inspectez chaque produit en 3D et commandez directement sur WhatsApp.
          </p>
        </div>

        {/* 120 FPS Apple-style Snap Carousel */}
        <ShowcaseCarousel items={PRODUCTS.slice(0, 8)} onSelectProduct={(p) => setSelectedProduct(p)} />
      </section>

      {/* 6. FONCTIONNALITÉS ("Artefacts Fonctionnels Interactifs") */}
      <section ref={featuresRef} id="artefacts" className="relative py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-mono font-bold text-[#FF477E] tracking-widest uppercase">
            Pourquoi tout le monde adore minimi
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D1F2D] mt-1 font-sans">
            3 Artefacts d'expérience{' '}
            <span className="font-serif italic font-normal text-gradient-kawaii">
              conçus pour vous
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 : Mélangeur Diagnostique */}
          <Card3D depth={30} className="h-full">
            <div className="feature-card h-full p-6 rounded-4xl glass-card-light border border-[#FF8BA7]/30 flex flex-col justify-between shadow-lg">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FFF0F3] border border-[#FF8BA7]/40 flex items-center justify-center text-[#FF477E] mb-4 shadow-sm">
                  <RotateCw className="w-6 h-6 animate-spin-slow" />
                </div>
                <h3 className="font-cute font-bold text-xl text-[#2D1F2D] mb-1">
                  Mélangeur de Packs Cadeaux
                </h3>
                <p className="text-xs text-[#6E5D6E] mb-5">
                  Composition dynamique mise à jour en temps réel selon les stocks disponibles.
                </p>

                {/* Vertical Cycling Stack */}
                <div className="relative h-[160px] w-full">
                  {mixerItems.map((item, idx) => (
                    <div
                      key={item.title}
                      className={`absolute w-full p-3.5 rounded-2xl bg-gradient-to-r ${item.color} border border-white/80 shadow-md transition-all duration-500`}
                      style={{
                        top: `${idx * 14}px`,
                        transform: `scale(${1 - idx * 0.05})`,
                        zIndex: 10 - idx,
                        opacity: 1 - idx * 0.2,
                      }}
                    >
                      <h4 className="font-bold text-xs text-[#2D1F2D]">{item.title}</h4>
                      <p className="text-[11px] text-[#6E5D6E] mt-0.5">{item.subtitle}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#FF8BA7]/20 flex items-center justify-between text-xs font-mono text-[#FF477E]">
                <span>Rotation auto : 3s</span>
                <span className="font-bold">✓ En stock</span>
              </div>
            </div>
          </Card3D>

          {/* Card 2 : Machine à Écrire Télémétrie */}
          <Card3D depth={30} className="h-full">
            <div className="feature-card h-full p-6 rounded-4xl glass-card-light border border-[#FF8BA7]/30 flex flex-col justify-between shadow-lg">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FFF5F7] border border-[#C8963E]/40 flex items-center justify-center text-[#C8963E] mb-4 shadow-sm">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="font-cute font-bold text-xl text-[#2D1F2D] mb-1">
                  Télémétrie Boutique en Direct
                </h3>
                <p className="text-xs text-[#6E5D6E] mb-4">
                  Flux continu d'informations et arrivages directement depuis le magasin à Cotonou.
                </p>

                {/* Monospace live terminal */}
                <div className="p-3.5 rounded-2xl bg-[#2D1F2D] text-[#95D5B2] font-mono text-xs leading-relaxed min-h-[140px] shadow-inner relative overflow-hidden">
                  <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-white/10 text-[10px] text-white/50">
                    <span className="w-2 h-2 rounded-full bg-[#FF477E] animate-pulse" />
                    <span>CANAL_DIRECT // COTONOU</span>
                  </div>
                  <span>{typingText}</span>
                  <span className="inline-block w-2 h-4 bg-[#FF477E] ml-1 animate-pulse align-middle" />
                </div>
              </div>

              <div className="pt-4 border-t border-[#FF8BA7]/20 flex items-center justify-between text-xs font-mono text-[#6E5D6E]">
                <span>Status : 100% Opérationnel</span>
                <span className="text-[#95D5B2] font-bold">● CONNECTÉ</span>
              </div>
            </div>
          </Card3D>

          {/* Card 3 : Planificateur Protocole Curseur */}
          <Card3D depth={30} className="h-full">
            <div className="feature-card h-full p-6 rounded-4xl glass-card-light border border-[#FF8BA7]/30 flex flex-col justify-between shadow-lg">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#E8F5E9] border border-[#95D5B2]/40 flex items-center justify-center text-[#95D5B2] mb-4 shadow-sm">
                  <MousePointer className="w-6 h-6 text-[#2D1F2D]" />
                </div>
                <h3 className="font-cute font-bold text-xl text-[#2D1F2D] mb-1">
                  Horaires & Retrait Magasin
                </h3>
                <p className="text-xs text-[#6E5D6E] mb-4">
                  Planning d'ouverture hebdomadaire de la boutique physique.
                </p>

                {/* Weekly Grid with Simulated Cursor Click */}
                <div className="grid grid-cols-7 gap-1.5 mb-3">
                  {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, idx) => (
                    <div
                      key={idx}
                      className={`p-2 rounded-xl text-center font-mono text-xs font-bold transition-all duration-300 ${
                        selectedDay === idx + 1
                          ? 'bg-[#FF477E] text-white scale-110 shadow-md'
                          : 'bg-white/80 text-[#6E5D6E] border border-gray-100'
                      }`}
                    >
                      {day}
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-xl bg-white/90 border border-[#FF8BA7]/20 text-xs">
                  <div className="flex justify-between items-center text-[#2D1F2D] font-bold">
                    <span>Lundi - Samedi :</span>
                    <span className="font-mono text-[#FF477E]">09h00 - 20h00</span>
                  </div>
                  <div className="flex justify-between items-center text-[#6E5D6E] mt-1 text-[11px]">
                    <span>Dimanche :</span>
                    <span className="font-mono">14h00 - 19h00</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#FF8BA7]/20 flex items-center justify-between text-xs font-mono text-[#C8963E]">
                <span>Carrefour des Policiers</span>
                <span className="font-bold">Ouvert aujourd'hui</span>
              </div>
            </div>
          </Card3D>
        </div>
      </section>

      {/* 7. PHILOSOPHIE ("Le Manifeste") */}
      <section ref={manifestoRef} className="relative py-24 px-4 bg-[#2D1F2D] text-white rounded-5xl my-12 mx-3 sm:mx-6 overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FF8BA7_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative max-w-4xl mx-auto text-center space-y-8 z-10">
          <span className="manifesto-reveal inline-block px-4 py-1.5 rounded-full text-xs font-mono font-bold bg-white/10 text-[#FF8BA7] border border-white/20">
            LE MANIFESTE MINIMI
          </span>

          <h2 className="manifesto-reveal text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            La plupart des boutiques vendent du matériel ordinaire.{' '}
            <span className="font-serif italic font-normal text-gradient-kawaii block mt-2">
              Nous créons des étincelles de bonheur quotidien.
            </span>
          </h2>

          <p className="manifesto-reveal text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Chaque enfant, ado et parent mérite un univers coloré et bienveillant. Des coffrets cadeaux à 5.000 FCFA jusqu’aux sacs à dos résistants, nous sélectionnons chaque pièce avec le cœur pour illuminer vos journées à Cotonou.
          </p>

          <div className="manifesto-reveal pt-4 flex justify-center gap-6 text-xs font-mono text-[#95D5B2]">
            <div>✨ +10.000 Commandes Traitées</div>
            <div>•</div>
            <div>📦 Produits 100% Vérifiés</div>
            <div>•</div>
            <div>💕 38.1K Communauté TikTok</div>
          </div>
        </div>
      </section>

      {/* 8. CATALOGUE COMPLET INTERACTIF */}
      <section ref={catalogRef} id="catalogue" className="relative py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-mono font-bold text-[#FF477E] tracking-widest uppercase">
            Collection Complète
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D1F2D] mt-1 font-sans">
            Tous les Trésors{' '}
            <span className="font-serif italic font-normal text-gradient-kawaii">
              MiNiMi Cotonou
            </span>
          </h2>
          <p className="text-sm text-[#6E5D6E] mt-2">
            Cliquez sur un article pour le voir en 3D et passer commande directement via WhatsApp.
          </p>

          {/* Categories pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-[#FF477E] text-white shadow-md shadow-pink-500/20 scale-105'
                    : 'bg-white text-[#6E5D6E] border border-gray-200 hover:border-[#FF477E]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid with 3D Tilt Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card3D key={product.id} depth={25} onClick={() => setSelectedProduct(product)}>
              <div className="catalog-card h-full p-4 rounded-3xl bg-white/95 backdrop-blur-md border border-[#FF8BA7]/25 shadow-lg hover:border-[#FF477E]/60 transition-all flex flex-col justify-between cursor-pointer group">
                <div>
                  <div className="relative w-full h-[200px] rounded-2xl overflow-hidden mb-3 bg-[#FFF5F7]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FF477E] text-white shadow-sm">
                      {product.badge}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono font-bold text-[#FF8BA7] uppercase tracking-wide">
                    {product.category}
                  </span>
                  <h4 className="font-cute font-bold text-base text-[#2D1F2D] line-clamp-2 mt-0.5">
                    {product.name}
                  </h4>
                </div>

                <div className="pt-3 mt-3 border-t border-[#FF8BA7]/20 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#6E5D6E] block font-mono">Prix MiNiMi</span>
                    <span className="font-mono font-bold text-base text-[#C8963E]">
                      {product.price}
                    </span>
                  </div>
                  <button className="w-9 h-9 rounded-full bg-[#FFF0F3] text-[#FF477E] flex items-center justify-center group-hover:bg-[#FF477E] group-hover:text-white transition-colors shadow-sm">
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card3D>
          ))}
        </div>
      </section>

      {/* 9. BOUTIQUE PHYSIQUE & LOCALISATION */}
      <section id="boutique" className="relative py-20 px-4 max-w-6xl mx-auto">
        <div className="rounded-5xl p-8 sm:p-12 bg-gradient-to-br from-white via-[#FFF5F7] to-[#FFF0F3] border-2 border-white shadow-2xl space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Col: Info & Actions */}
            <div className="lg:col-span-6 space-y-6">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-[#FF477E]/10 text-[#FF477E] border border-[#FF8BA7]/30 inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> BOUTIQUE PHYSIQUE & LOCALISATION
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D1F2D] leading-tight font-sans">
                Venez nous rendre visite au{' '}
                <span className="font-serif italic font-normal text-gradient-kawaii">
                  Carrefour des Policiers
                </span>
              </h2>

              <p className="text-sm sm:text-base text-[#6E5D6E] leading-relaxed">
                Notre boutique physique à Cotonou vous accueille chaque jour pour découvrir la papeterie pastel, tester les fournitures, composer vos Gift Boxes 5.000 FCFA sur-mesure ou récupérer vos commandes passées en ligne !
              </p>

              {/* Location Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-medium text-[#2D1F2D]">
                <div className="p-3.5 rounded-2xl bg-white/90 border border-[#FF8BA7]/25 shadow-sm space-y-1">
                  <div className="flex items-center gap-2 text-[#FF477E] font-bold">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span>Adresse Boutique</span>
                  </div>
                  <p className="text-[#6E5D6E]">
                    Carrefour des Policiers, Cotonou, Bénin
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/90 border border-[#FF8BA7]/25 shadow-sm space-y-1">
                  <div className="flex items-center gap-2 text-[#C8963E] font-bold">
                    <Clock className="w-4 h-4 shrink-0" />
                    <span>Horaires d'ouverture</span>
                  </div>
                  <p className="text-[#6E5D6E]">
                    Lun - Sam : 09h-20h | Dim : 14h-19h
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/90 border border-[#FF8BA7]/25 shadow-sm space-y-1">
                  <div className="flex items-center gap-2 text-[#95D5B2] font-bold">
                    <Truck className="w-4 h-4 shrink-0" />
                    <span>Livraison Express</span>
                  </div>
                  <p className="text-[#6E5D6E]">
                    Cotonou, Calavi, Akpakpa en moins de 2h
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/90 border border-[#FF8BA7]/25 shadow-sm space-y-1">
                  <div className="flex items-center gap-2 text-[#FF477E] font-bold">
                    <PhoneCall className="w-4 h-4 shrink-0" />
                    <span>Contact Direct</span>
                  </div>
                  <p className="font-mono text-[#2D1F2D] font-bold">
                    +229 01 91 61 87 07
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="https://maps.google.com/?q=Carrefour+des+Policiers+Cotonou+Benin"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-magnetic px-5 py-3 rounded-2xl bg-[#2D1F2D] text-white font-bold text-xs sm:text-sm shadow-md hover:bg-black transition-all flex items-center gap-2"
                >
                  <Navigation className="w-4 h-4 text-[#FF8BA7]" />
                  <span>Ouvrir sur Google Maps</span>
                </a>

                <a
                  href="https://wa.me/2290191618707?text=Bonjour%20!%20Je%20veux%20l'itinéraire%20vers%20la%20boutique%20MiNiMi%20📍"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-magnetic px-5 py-3 rounded-2xl bg-[#25D366] text-white font-bold text-xs sm:text-sm shadow-md shadow-green-600/20 flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Itinéraire WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Col: Interactive Map & Boutique Preview */}
            <div className="lg:col-span-6 space-y-4">
              <Card3D depth={30}>
                <div className="rounded-4xl overflow-hidden border-4 border-white shadow-2xl bg-white relative h-[300px] sm:h-[340px]">
                  {/* Google Maps Embed iframe */}
                  <iframe
                    title="Localisation MiNiMi Cotonou"
                    src="https://maps.google.com/maps?q=Carrefour%20des%20Policiers%2C%20Cotonou%2C%20Benin&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full object-cover"
                  />

                  {/* Floating Pin Card */}
                  <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-[#FF8BA7]/30 flex items-center gap-2.5">
                    <img
                      src="/logo-minimi.png"
                      alt="MiNiMi"
                      className="w-7 h-7 rounded-full object-contain bg-[#FAF6EE] border border-[#FF8BA7]/30"
                    />
                    <div>
                      <h4 className="font-cute font-bold text-xs text-[#2D1F2D] leading-tight">
                        Boutique MiNiMi 💕
                      </h4>
                      <p className="text-[10px] text-[#6E5D6E] font-mono">
                        Carrefour des Policiers, Cotonou
                      </p>
                    </div>
                  </div>
                </div>
              </Card3D>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FOOTER SOMBRE CINÉMATOGRAPHIQUE */}
      <footer className="relative bg-[#2D1F2D] text-white pt-16 pb-12 px-4 rounded-t-[3.5rem] mt-20 border-t border-white/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2 space-y-4">
            <MinimiLogo imgClassName="w-12 h-12 border-white/30" dark={true} showSub={true} />
            <p className="text-xs text-gray-300 max-w-md leading-relaxed">
              Le premier concept store kids, ados et papeterie mignonne à Cotonou. Des moments de joie à portée de main dès 5.000 FCFA.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-[#95D5B2]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#95D5B2] animate-pulse" />
              <span>Système Opérationnel • Boutique & Commandes Ouvertes</span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <h5 className="font-mono font-bold text-[#FF8BA7] uppercase tracking-wider mb-3">
              Navigation
            </h5>
            <p><a href="#3d-orbit" className="text-gray-300 hover:text-white transition-colors">Vitrine Tendance</a></p>
            <p><a href="#catalogue" className="text-gray-300 hover:text-white transition-colors">Catalogue des Produits</a></p>
            <p><a href="#artefacts" className="text-gray-300 hover:text-white transition-colors">Expérience Interactive</a></p>
            <p><a href="#boutique" className="text-gray-300 hover:text-white transition-colors">Localisation Magasin</a></p>
          </div>

          <div className="space-y-2 text-xs">
            <h5 className="font-mono font-bold text-[#FF8BA7] uppercase tracking-wider mb-3">
              Contact & Localisation
            </h5>
            <p className="text-gray-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#FF8BA7]" />
              <span>Cotonou, Carrefour des Policiers</span>
            </p>
            <p className="text-gray-300 flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5 text-[#95D5B2]" />
              <span>WhatsApp : +229 01 91 61 87 07</span>
            </p>
            <p className="text-gray-300">TikTok : @minimistore0</p>
            <p className="text-[#C8963E] font-bold mt-2">Bénin, Afrique de l'Ouest</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} MiNiMi Concept Store. Tous droits réservés.</p>
          <p className="font-mono text-gray-400">
            Conçu avec Three.js • GSAP • Lenis • 1:1 Pixel Perfect
          </p>
        </div>
      </footer>

      {/* 11. Interactive Product Quick-View Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
