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
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';

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

// ——— minimi rainbow logo (each letter a pastel color) ———
function MinimiBrandText({ className = '' }) {
  const letters = [
    { char: 'm', color: '#FF8BA7' },
    { char: 'i', color: '#FFD166' },
    { char: 'n', color: '#95D5B2' },
    { char: 'i', color: '#B5A4D4' },
    { char: 'm', color: '#FFAB76' },
    { char: 'i', color: '#74C0FC' },
  ];
  return (
    <span className={`font-cute font-bold tracking-tight ${className}`}>
      {letters.map((l, i) => (
        <span key={i} style={{ color: l.color }}>{l.char}</span>
      ))}
      <span className="text-[#C8963E] text-sm align-super ml-0.5">🪐</span>
    </span>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Tout');
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

  // 1. Scroll listener
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Mixer card rotation every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setMixerItems(prev => {
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
    }, 50);
    return () => clearInterval(timer);
  }, []);

  // 4. Schedule cursor simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedDay(prev => (prev % 7) + 1);
      setCursorClicked(true);
      setTimeout(() => setCursorClicked(false), 500);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  // 5. GSAP animations — all inside context for proper cleanup
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero stagger fade-up
      gsap.fromTo(
        '.hero-animate',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.13, ease: 'power3.out', delay: 0.2 }
      );

      // Features cards slide-in
      gsap.fromTo(
        '.feature-card',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out',
          scrollTrigger: { trigger: featuresRef.current, start: 'top 80%' },
        }
      );

      // Manifesto reveal
      gsap.fromTo(
        '.manifesto-reveal',
        { y: 35, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power2.out',
          scrollTrigger: { trigger: manifestoRef.current, start: 'top 78%' },
        }
      );

      // Catalog cards stagger
      gsap.fromTo(
        '.catalog-card',
        { y: 30, opacity: 0, scale: 0.96 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.65, stagger: 0.1, ease: 'power2.out',
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
                filter: `blur(${self.progress * 10}px)`,
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

  const handleOrderWhatsApp = (productName = '') => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.65 },
      colors: ['#FF8BA7', '#FFD166', '#95D5B2', '#B5A4D4', '#74C0FC'],
    });
    const msg = productName
      ? `Bonjour minimi 💕 ! Je viens depuis votre site et souhaite commander : ${productName}. Est-ce disponible en boutique à Cotonou ?`
      : `Bonjour minimi 💕 ! Je souhaite découvrir vos articles ou passer une commande. Pouvez-vous m'aider ?`;
    window.open(`https://wa.me/2290191618707?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const filteredProducts = activeCategory === 'Tout'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="relative min-h-screen bg-[#FFFDF9] text-[#2D1F2D] overflow-hidden">
      {/* Global Noise Overlay */}
      <div className="noise-overlay" />

      {/* Soft Ambient Glows */}
      <div className="fixed top-[-8%] left-[-8%] w-[500px] h-[500px] bg-[#FFC5D3]/20 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-8%] right-[-8%] w-[500px] h-[500px] bg-[#BDE0FE]/20 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed top-[40%] right-[10%] w-[300px] h-[300px] bg-[#FFD166]/15 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* ===== A. NAVBAR "L'Île Flottante" ===== */}
      <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4">
        <nav className={`flex items-center justify-between gap-4 px-5 py-3 rounded-full transition-all duration-500 max-w-4xl w-full ${
          scrolled
            ? 'bg-[#FFFDF9]/96 backdrop-blur-2xl border border-[#FF8BA7]/35 shadow-lg'
            : 'bg-white/85 backdrop-blur-md border border-[#FF8BA7]/20 shadow-sm'
        }`}>
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group flex-shrink-0">
            <img
              src="/logo-minimi.jpg"
              alt="minimi logo"
              className="w-9 h-9 rounded-full object-cover shadow-md group-hover:scale-110 transition-transform duration-300"
            />
            <MinimiBrandText className="text-xl" />
          </a>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-[#5C4456]">
            {[['#features', 'Nos Univers'], ['#manifesto', 'Notre Mission'], ['#protocole', 'Commander'], ['#boutique', 'Boutique']].map(([href, label]) => (
              <a key={href} href={href} className="hover:text-[#FF477E] transition-colors hover:-translate-y-0.5 transform inline-block duration-200">
                {label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <button
            id="nav-whatsapp-cta"
            onClick={() => handleOrderWhatsApp()}
            className="btn-magnetic flex-shrink-0 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#FF477E] to-[#FFD166] text-white font-semibold text-xs tracking-wide uppercase shadow-pink-glow"
          >
            <div className="btn-magnetic-fill" />
            <span className="btn-magnetic-content flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </span>
          </button>
        </nav>
      </header>

      {/* ===== B. HERO — concept store kids ===== */}
      <section
        ref={heroRef}
        className="relative min-h-[100dvh] flex flex-col justify-end pt-28 pb-14 px-6 lg:px-16 overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #FFF5F7 0%, #FFFDF9 50%, #F0FAFF 100%)' }}
      >
        {/* Hero Background Image — VISIBLE */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-bg.jpg"
            alt="minimi concept store kids articles mignons Cotonou"
            className="w-full h-full object-cover object-center opacity-55"
            style={{ objectPosition: 'center 30%' }}
          />
          {/* Gradient overlay — lighter to keep image visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFFDF9]/95 via-[#FFFDF9]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FFFDF9] via-transparent to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          {/* Badge */}
          <div className="hero-animate inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border border-[#FF8BA7]/30 shadow-sm mb-5">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF477E] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF477E]" />
            </span>
            <span className="text-xs font-mono tracking-wider uppercase text-[#FF477E] font-bold">
              🌈 Concept Store Kids & Ado • Cotonou, Bénin • TikTok @minimistore0
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-5 max-w-3xl">
            <span className="hero-animate block text-[#2D1F2D] font-sans font-extrabold text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight leading-[1.05]">
              minimi
            </span>
            <span className="hero-animate block font-serif italic font-normal text-gradient-kawaii text-3xl sm:text-5xl lg:text-6xl mt-1 leading-tight">
              concept store kids & ado 🌈
            </span>
          </h1>

          {/* Description — brand mission */}
          <p className="hero-animate text-base sm:text-lg text-[#5C4456] max-w-xl font-light leading-relaxed mb-3">
            La boutique dédiée aux <strong className="text-[#FF477E]">enfants & adolescents</strong> de Cotonou. 
            Une sélection d'articles <strong className="text-[#C8963E]">tendances, pratiques & ludiques</strong> tout au long de l'année.
          </p>
          <p className="hero-animate text-sm text-[#7A6A7A] max-w-xl leading-relaxed mb-8">
            Fournitures scolaires, sacs, gourdes, jouets, accessoires, cadeaux, articles de vacances et bien plus encore — selon les saisons. (<a href="https://www.tiktok.com/@minimistore0" target="_blank" rel="noreferrer" className="text-[#FF477E] font-bold underline">@minimistore0</a>)
          </p>

          {/* CTA Buttons */}
          <div className="hero-animate flex flex-wrap items-center gap-4 mb-10">
            <button
              id="hero-whatsapp-btn"
              onClick={() => handleOrderWhatsApp()}
              className="btn-magnetic px-7 py-4 rounded-full bg-gradient-to-r from-[#FF477E] via-[#FF8BA7] to-[#FFD166] text-white font-bold text-sm tracking-wide uppercase shadow-pink-glow hover:shadow-xl transition-all"
            >
              <div className="btn-magnetic-fill" />
              <span className="btn-magnetic-content flex items-center gap-2.5">
                <MessageCircle className="w-5 h-5" />
                <span>Commander sur WhatsApp</span>
              </span>
            </button>
            <a
              href="https://www.tiktok.com/@minimistore0"
              target="_blank"
              rel="noreferrer"
              id="hero-tiktok-btn"
              className="px-7 py-4 rounded-full bg-white/90 hover:bg-[#FFF5F7] border border-[#FF8BA7]/40 text-[#2D1F2D] font-bold text-sm tracking-wide transition-all flex items-center gap-2 shadow-sm hover:-translate-y-0.5"
            >
              <Video className="w-4 h-4 text-[#FF477E]" />
              <span>Voir sur TikTok</span>
            </a>
          </div>

          {/* Stats Row */}
          <div className="hero-animate grid grid-cols-3 gap-4 pt-6 border-t border-[#FF8BA7]/20 max-w-xl">
            {[
              { icon: <Video className="w-4 h-4" />, value: '7.4K+', label: 'Followers TikTok', color: '#FF477E' },
              { icon: <Heart className="w-4 h-4 fill-current" />, value: '38.1K', label: 'J\'aime TikTok', color: '#FF8BA7' },
              { icon: <MapPin className="w-4 h-4" />, value: 'Cotonou', label: 'Boutique physique', color: '#C8963E' },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}15`, color: stat.color, border: `1px solid ${stat.color}30` }}>
                  {stat.icon}
                </div>
                <div>
                  <p className="font-mono text-base font-bold text-[#2D1F2D]">{stat.value}</p>
                  <p className="text-[10px] text-[#6E5D6E]">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== C. FEATURES — 3 Artefacts interactifs ===== */}
      <section id="features" ref={featuresRef} className="py-24 px-6 lg:px-16 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="font-mono text-xs text-[#FF477E] uppercase tracking-widest bg-[#FFF0F5] px-4 py-1.5 rounded-full border border-[#FF8BA7]/30 font-bold">
            3 Raisons de choisir minimi
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold mt-4 tracking-tight text-[#2D1F2D]">
            Un univers coloré pensé pour les jeunes ✨
          </h2>
          <p className="text-[#6E5D6E] mt-3 text-base max-w-xl mx-auto">
            Qualité, style & plaisir — des produits qui allient utilité et fun dans une boutique physique unique à Cotonou.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card 1 — Mixer */}
          <div className="feature-card glass-card-light p-7 rounded-3xl relative overflow-hidden border border-[#FF8BA7]/25 hover:border-[#FF477E]/50 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-5">
              <span className="font-mono text-xs text-[#FF477E] uppercase tracking-wider font-bold">
                01 • Articles Tendances
              </span>
              <RotateCw className="w-4 h-4 text-[#FF477E] animate-spin-slow" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-[#2D1F2D]">Sélections Saisonnières & Exclusives</h3>
            <p className="text-[#6E5D6E] text-sm mb-5">
              Nos collections se renouvellent chaque saison — toujours tendance, toujours fun :
            </p>

            <div className="relative h-52 w-full flex items-center justify-center">
              {mixerItems.map((item, idx) => (
                <div
                  key={idx}
                  className={`absolute w-full p-5 rounded-2xl border border-[#FF8BA7]/30 bg-gradient-to-br ${item.color} backdrop-blur-xl shadow-lg transition-all duration-700`}
                  style={{
                    transform: `translateY(${(idx - 1) * 18}px) scale(${1 - Math.abs(idx - 1) * 0.06})`,
                    zIndex: 3 - idx,
                    opacity: 1 - Math.abs(idx - 1) * 0.22,
                    transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-[#FF477E] font-bold">Pépite minimi #{idx + 1}</span>
                    <Heart className="w-4 h-4 text-[#FF477E] fill-current" />
                  </div>
                  <h4 className="font-bold text-sm text-[#2D1F2D]">{item.title}</h4>
                  <p className="text-xs text-[#5C4456] mt-1 font-mono">{item.subtitle}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-[#FF8BA7]/20 flex items-center justify-between text-xs text-[#6E5D6E] font-mono">
              <span>Mise à jour toutes les 3s</span>
              <span className="text-green-600 flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> En Stock Cotonou
              </span>
            </div>
          </div>

          {/* Card 2 — Typewriter / TikTok Live */}
          <div className="feature-card glass-card-light p-7 rounded-3xl relative overflow-hidden border border-[#95D5B2]/40 hover:border-[#95D5B2]/70 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-5">
              <span className="font-mono text-xs text-emerald-600 uppercase tracking-wider font-bold">
                02 • TikTok Live @minimistore0
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[10px] font-mono text-emerald-600 font-bold">DIRECT</span>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2 text-[#2D1F2D]">Vidéos & Lives TikTok Officiels</h3>
            <p className="text-[#6E5D6E] text-sm mb-5">
              Suivez nos vidéos de déballage, découvrez les nouveautés et réservez en direct :
            </p>
            <div className="bg-[#1E1E2E] p-4 rounded-2xl font-mono text-xs text-[#C5F0D4] h-44 flex flex-col justify-between overflow-hidden shadow-inner">
              <div>
                <span className="text-white/30 block mb-2">// LIVE_FEED @MINIMISTORE0</span>
                <p className="text-white/90 leading-relaxed">
                  {typingText}
                  <span className="inline-block w-2 h-[14px] bg-[#FFD166] ml-0.5 animate-pulse align-middle" />
                </p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[10px] text-white/40">
                <span>STATUS: 38.1K LIKES</span>
                <span>+229 01 91 61 87 07</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-[#FF8BA7]/20 flex items-center justify-between text-xs text-[#6E5D6E] font-mono">
              <span>TikTok @minimistore0</span>
              <a href="https://www.tiktok.com/@minimistore0" target="_blank" rel="noreferrer" className="text-[#FF477E] hover:underline font-bold">
                Rejoindre →
              </a>
            </div>
          </div>

          {/* Card 3 — Schedule Planner */}
          <div className="feature-card glass-card-light p-7 rounded-3xl relative overflow-hidden border border-[#C8963E]/30 hover:border-[#C8963E]/60 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-5">
              <span className="font-mono text-xs text-[#C8963E] uppercase tracking-wider font-bold">
                03 • Retrait Immédiat
              </span>
              <Clock className="w-4 h-4 text-[#C8963E]" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-[#2D1F2D]">Click & Collect en Boutique</h3>
            <p className="text-[#6E5D6E] text-sm mb-5">
              Choisissez votre jour de passage à la boutique minimi, Carrefour des Policiers :
            </p>
            <div className="bg-[#FFF8F0] p-4 rounded-2xl border border-[#C8963E]/20 relative">
              <div className="grid grid-cols-7 gap-1 text-center mb-3">
                {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, i) => (
                  <div
                    key={i}
                    className={`py-2 rounded-lg text-xs font-mono transition-all duration-300 ${
                      selectedDay === i + 1
                        ? 'bg-gradient-to-tr from-[#FF477E] to-[#FFD166] text-white font-bold shadow-md scale-105'
                        : 'bg-white text-[#6E5D6E] border border-[#FF8BA7]/20'
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="bg-white p-2.5 rounded-xl flex items-center justify-between text-xs border border-[#C8963E]/20">
                <span className="font-mono text-[#2D1F2D] font-bold">Boutique Policiers Cotonou</span>
                <span className="text-green-600 font-bold">Ouvert ✨</span>
              </div>
              <div
                className="absolute pointer-events-none transition-all duration-500"
                style={{ top: '28%', left: `${(selectedDay / 7) * 82}%`, transform: cursorClicked ? 'scale(0.8)' : 'scale(1)' }}
              >
                <MousePointer className="w-5 h-5 text-[#FF477E] fill-[#FF477E] drop-shadow-md animate-bounce" />
              </div>
            </div>
            <button
              id="schedule-reserve-btn"
              onClick={() => handleOrderWhatsApp('Réservation passage boutique')}
              className="mt-5 w-full py-3 rounded-xl bg-[#FFF5F7] hover:bg-[#FFE5EC] border border-[#FF8BA7]/30 font-mono text-xs text-[#2D1F2D] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <span>Réserver mon passage</span>
              <ChevronRight className="w-4 h-4 text-[#FF477E]" />
            </button>
          </div>
        </div>
      </section>

      {/* ===== D. MANIFESTO — Notre Mission ===== */}
      <section id="manifesto" ref={manifestoRef} className="py-28 px-6 lg:px-16 bg-gradient-to-b from-[#FFF0F5] via-[#FFF8FF]/60 to-[#F0FAFF] border-y border-[#FF8BA7]/15 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-8">
          <img
            src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=2000&q=60"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto">
          <span className="manifesto-reveal inline-block font-mono text-xs text-[#FF477E] font-bold uppercase tracking-widest bg-white px-4 py-1.5 rounded-full border border-[#FF8BA7]/30 shadow-sm">
            Notre Mission 💕
          </span>

          <div className="mt-10 space-y-6">
            <p className="manifesto-reveal text-lg sm:text-xl font-light text-[#6E5D6E] leading-relaxed max-w-3xl">
              La plupart des boutiques proposent des articles ordinaires, sans charme ni fun pour les enfants et adolescents.
            </p>
            <h2 className="manifesto-reveal text-3xl sm:text-5xl lg:text-6xl font-serif italic text-[#2D1F2D] leading-tight max-w-4xl">
              Notre mission : offrir aux familles{' '}
              <span className="text-gradient-kawaii not-italic font-bold">
                des produits de qualité qui allient utilité, style & plaisir
              </span>{' '}
              dans un univers coloré pensé pour les plus jeunes. 🌈
            </h2>
          </div>

          <div className="manifesto-reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14 pt-10 border-t border-[#FF8BA7]/20">
            {[
              { icon: <BookOpen className="w-5 h-5 text-[#FF477E]" />, title: 'Fournitures Scolaires', desc: 'Cahiers, stylos, trousses kawaii pour réussir avec style.' },
              { icon: <Gift className="w-5 h-5 text-[#C8963E]" />, title: 'Cadeaux & Coffrets', desc: 'Gift boxes parfaites à 5.000 FCFA pour toutes occasions.' },
              { icon: <Star className="w-5 h-5 text-[#FFD166]" />, title: 'Jouets & Accessoires', desc: 'Articles ludiques, articles de vacances & saison.' },
              { icon: <PackageCheck className="w-5 h-5 text-green-500" />, title: 'Retrait & Livraison', desc: 'Boutique physique + livraison partout au Bénin.' },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white border border-[#FF8BA7]/20 shadow-sm hover:-translate-y-1 transition-transform duration-200">
                <div className="mb-3">{item.icon}</div>
                <h4 className="font-bold text-[#2D1F2D] text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-[#6E5D6E]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== E. PROTOCOL — 3 étapes sticky ===== */}
      <section id="protocole" ref={protocolStackRef} className="py-20 px-6 lg:px-16 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-mono text-xs text-[#FF477E] font-bold uppercase tracking-widest bg-[#FFF0F5] px-4 py-1.5 rounded-full border border-[#FF8BA7]/30">
            Le Protocole minimi
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold mt-4 tracking-tight text-[#2D1F2D]">
            Commander en 3 étapes simples
          </h2>
        </div>

        <div className="space-y-10">
          {[
            {
              step: '01', label: 'STEP_TIKTOK', accent: '#FF477E', bg: 'from-[#FFF0F5] to-[#FFE5EC]',
              border: 'border-[#FF8BA7]/40', icon: <Video className="w-8 h-8 text-[#FF477E]" />,
              title: 'Découvrez nos vidéos sur @minimistore0',
              desc: 'Regardez nos TikToks quotidiens — déballages, nouveautés, articles tendances pour enfants & ados. Repérez vos coups de cœur.',
              canal: 'TIKTOK & CATALOGUE', etape: 'Étape 1 sur 3',
            },
            {
              step: '02', label: 'STEP_WHATSAPP', accent: '#2E7D32', bg: 'from-[#E8F5E9] to-[#F0FFF4]',
              border: 'border-[#95D5B2]/50', icon: <MessageCircle className="w-8 h-8 text-green-600" />,
              title: 'Écrivez-nous au +229 01 91 61 87 07',
              desc: 'Un message WhatsApp suffit ! L\'équipe minimi confirme vos articles, vous informe des disponibilités et organise votre livraison.',
              canal: 'WHATSAPP DIRECT (+229 01 91 61 87 07)', etape: 'Étape 2 sur 3',
            },
            {
              step: '03', label: 'STEP_RECEIVE', accent: '#C8963E', bg: 'from-[#FFF8E7] to-[#FFFDF9]',
              border: 'border-[#C8963E]/40', icon: <Gift className="w-8 h-8 text-[#C8963E]" />,
              title: 'Récupérez votre colis ou venez en boutique',
              desc: 'Passez au Carrefour des Policiers, Cotonou — ou recevez votre commande partout au Bénin par nos livreurs rapides.',
              canal: 'COTONOU & PARTOUT AU BÉNIN', etape: 'Étape 3 sur 3',
            },
          ].map((card) => (
            <div
              key={card.step}
              className={`protocol-card min-h-[60vh] rounded-4xl bg-gradient-to-br ${card.bg} border ${card.border} p-8 sm:p-14 flex flex-col justify-between relative overflow-hidden shadow-xl`}
            >
              <div className="flex items-center justify-between z-10">
                <span className="font-mono text-xl font-bold" style={{ color: card.accent }}>{card.step} // {card.label}</span>
                {card.icon}
              </div>
              <div className="my-auto z-10 max-w-xl pt-8">
                <h3 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-[#2D1F2D]">{card.title}</h3>
                <p className="text-[#5C4456] text-base leading-relaxed">{card.desc}</p>
              </div>
              <div className="pt-6 border-t flex items-center justify-between text-xs font-mono text-[#6E5D6E] z-10" style={{ borderColor: `${card.accent}25` }}>
                <span>CANAL : {card.canal}</span>
                <span className="font-bold" style={{ color: card.accent }}>{card.etape}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== F. CATALOGUE ===== */}
      <section id="catalogue" ref={catalogRef} className="py-24 px-6 lg:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="font-mono text-xs text-[#FF477E] font-bold uppercase tracking-widest bg-[#FFF0F5] px-4 py-1.5 rounded-full border border-[#FF8BA7]/30">
              Showroom minimi
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold mt-4 tracking-tight text-[#2D1F2D]">
              Les Pépites du Moment 🌈
            </h2>
          </div>
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
            {['Tout', 'Coffrets', 'Papeterie', 'Lifestyle', 'Sacs', 'Jouets'].map((cat) => (
              <button
                key={cat}
                id={`filter-${cat.toLowerCase()}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-mono tracking-wider transition-all ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-[#FF477E] to-[#FFD166] text-white font-bold shadow-pink-glow'
                    : 'bg-white text-[#5C4456] hover:bg-[#FFF5F7] border border-[#FF8BA7]/25 shadow-sm'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="catalog-card glass-card-light rounded-3xl overflow-hidden hover:border-[#FF477E]/50 transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-square overflow-hidden bg-black/5">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#FF8BA7]/30 font-mono text-[10px] text-[#FF477E] font-bold shadow-sm">
                  {product.tag}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-base text-[#2D1F2D] hover:text-[#FF477E] transition-colors">{product.name}</h3>
                  <p className="font-mono text-xl font-extrabold text-green-600 mt-1">{product.price}</p>
                </div>
                <button
                  id={`order-product-${product.id}`}
                  onClick={() => handleOrderWhatsApp(product.name)}
                  className="mt-5 w-full py-3 rounded-2xl bg-gradient-to-r from-[#FF477E] to-[#FFD166] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:shadow-pink-glow transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Commander via WhatsApp</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== G. BOUTIQUE + MAP ===== */}
      <section id="boutique" className="py-24 px-6 lg:px-16 max-w-7xl mx-auto">
        <div className="glass-card-pink rounded-5xl p-8 sm:p-14 border border-[#FF8BA7]/35 relative overflow-hidden shadow-soft-card">
          <div className="text-center mb-12">
            <span className="font-mono text-xs text-[#C8963E] font-bold uppercase tracking-widest bg-white px-4 py-1.5 rounded-full border border-[#C8963E]/30 shadow-sm">
              Nous Trouver 📍
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-4 mb-3 text-[#2D1F2D]">
              Venez nous voir en boutique ! 🤎
            </h2>
            <p className="text-[#6E5D6E] text-sm max-w-xl mx-auto">
              minimi est votre boutique physique au cœur de Cotonou, Bénin. Venez découvrir nos articles en vrai !
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left — Info + Itinerary */}
            <div className="space-y-6">
              {/* Itinerary */}
              <div className="p-5 rounded-2xl bg-white/90 border border-[#FF8BA7]/25 shadow-sm text-sm text-[#2D1F2D] leading-relaxed space-y-2">
                <p className="font-bold text-[#FF477E] text-base mb-3">📍 Itinéraire pas à pas depuis Ayélawadjè :</p>
                {[
                  'Partez du Carrefour Ayélawadjè (supermarché Le Gros).',
                  'Tournez avant Le Gros ➔ Continuez tout droit.',
                  'Dépassez Carrefour Sacré Cœur.',
                  'Continuez : Carrefour Pharmacie Sènadé ➔ Carrefour Station Octogone.',
                  <span key="5"><strong className="text-[#FF477E]">Carrefour des Policiers ➔ Boutique minimi 🤎</strong></span>,
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#FF477E]/10 text-[#FF477E] text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                    <p>{step}</p>
                  </div>
                ))}
              </div>

              {/* Contact Cards */}
              <div className="space-y-3">
                {[
                  { icon: <PhoneCall className="w-5 h-5 text-[#FF477E]" />, label: 'WhatsApp / Appel', value: '+229 01 91 61 87 07', color: '#FF477E' },
                  { icon: <MapPin className="w-5 h-5 text-green-600" />, label: 'Adresse', value: 'Carrefour des Policiers, Cotonou, Bénin', color: '#2E7D32' },
                  { icon: <Video className="w-5 h-5 text-[#C8963E]" />, label: 'TikTok Officiel', value: '@minimistore0 — 38.1K J\'aime • 7.4K Abonnés', color: '#C8963E', link: 'https://www.tiktok.com/@minimistore0' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-[#FF8BA7]/20 shadow-sm">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${item.color}12`, border: `1px solid ${item.color}25` }}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[#2D1F2D] font-bold text-sm">{item.label} :</p>
                      {item.link
                        ? <a href={item.link} target="_blank" rel="noreferrer" className="text-[#FF477E] font-mono text-sm hover:underline">{item.value}</a>
                        : <p className="text-[#6E5D6E] font-mono text-sm">{item.value}</p>}
                    </div>
                  </div>
                ))}
              </div>

              <button
                id="boutique-whatsapp-btn"
                onClick={() => handleOrderWhatsApp('Demande de localisation boutique Cotonou')}
                className="btn-magnetic w-full py-4 rounded-2xl bg-gradient-to-r from-[#FF477E] to-[#FFD166] text-white font-bold text-sm uppercase tracking-wider shadow-pink-glow"
              >
                <div className="btn-magnetic-fill" />
                <span className="btn-magnetic-content flex items-center justify-center gap-2">
                  <Navigation className="w-4 h-4" />
                  <span>Obtenir l'itinéraire exact sur WhatsApp</span>
                </span>
              </button>
            </div>

            {/* Right — MAP */}
            <div className="space-y-4">
              <div className="rounded-3xl overflow-hidden border border-[#FF8BA7]/30 shadow-xl" style={{ height: '400px' }}>
                <iframe
                  title="minimi boutique Cotonou localisation"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=2.3800%2C6.3400%2C2.4600%2C6.4100&layer=mapnik&marker=6.3716%2C2.4183"
                  width="100%"
                  height="100%"
                  style={{ border: 'none', borderRadius: '24px' }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-[#FF8BA7]/20 shadow-sm">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF477E] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF477E]" />
                </span>
                <div>
                  <p className="font-bold text-sm text-[#2D1F2D]">📍 minimi — Carrefour des Policiers</p>
                  <p className="text-xs text-[#6E5D6E]">Cotonou, Bénin • Boutique ouverte ✨</p>
                </div>
                <a
                  href="https://www.openstreetmap.org/?mlat=6.3716&mlon=2.4183#map=16/6.3716/2.4183"
                  target="_blank"
                  rel="noreferrer"
                  className="ml-auto text-xs font-mono text-[#FF477E] hover:underline font-bold flex-shrink-0"
                >
                  Ouvrir la carte →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== H. FOOTER ===== */}
      <footer className="bg-[#1E1829] text-white rounded-t-[3.5rem] border-t border-[#FF8BA7]/20 pt-16 pb-10 px-6 lg:px-16 mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo-minimi.jpg" alt="minimi logo" className="w-10 h-10 rounded-full object-cover" />
              <MinimiBrandText className="text-2xl" />
            </div>
            <p className="text-white/60 text-sm max-w-md leading-relaxed mb-2">
              <strong className="text-white/90">minimi concept store kids & ado</strong> — une boutique dédiée aux enfants & adolescents, proposant une sélection d'articles tendances, pratiques & ludiques tout au long de l'année selon les saisons.
            </p>
            <p className="text-white/50 text-xs mb-5">
              Fournitures scolaires, sacs, gourdes, jouets, accessoires, cadeaux, articles de vacances et bien plus. Notre mission : offrir aux familles des produits de qualité qui allient utilité, style et plaisir dans un univers coloré pensé pour les plus jeunes.
            </p>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/15 border border-emerald-500/25">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-mono text-xs text-emerald-300 font-bold">Système Opérationnel • Boutique Ouverte</span>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-xs text-[#FFC5D3] uppercase tracking-widest mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              {[['#features', 'Nos Univers'], ['#manifesto', 'Notre Mission'], ['#protocole', 'Commander'], ['#catalogue', 'Catalogue'], ['#boutique', 'Boutique & Map']].map(([href, label]) => (
                <li key={href}><a href={href} className="hover:text-[#FFC5D3] transition-colors">{label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs text-[#FFC5D3] uppercase tracking-widest mb-4">Contact</h4>
            <ul className="space-y-2.5 text-sm text-white/70 font-mono">
              <li>📍 Carrefour des Policiers, Cotonou</li>
              <li>📞 / 💬 +229 01 91 61 87 07</li>
              <li>🎥 TikTok : @minimistore0</li>
              <li>🌈 38.1K J'aime • 7.4K Followers</li>
              <li>💕 Fait avec amour au Bénin 🇧🇯</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 font-mono">
          <p>© {new Date().getFullYear()} minimi (@minimistore0). Tous droits réservés.</p>
          <p className="mt-2 sm:mt-0">Le mini monde le plus mignon de Cotonou 🌈</p>
        </div>
      </footer>

      {/* ===== I. FLOATING WHATSAPP WIDGET ===== */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-2">
        <div className="bg-white rounded-2xl px-3 py-1.5 text-xs font-mono text-[#FF477E] font-bold shadow-md border border-[#FF8BA7]/30 animate-bounce">
          Commander 💕
        </div>
        <button
          id="floating-whatsapp-btn"
          onClick={() => handleOrderWhatsApp()}
          className="btn-magnetic w-14 h-14 rounded-full bg-gradient-to-tr from-[#FF477E] via-[#FF8BA7] to-[#FFD166] text-white flex items-center justify-center shadow-pink-glow hover:scale-110 transition-transform"
        >
          <MessageCircle className="w-7 h-7 fill-current" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 border-2 border-white rounded-full animate-bounce" />
        </button>
      </div>
    </div>
  );
}
