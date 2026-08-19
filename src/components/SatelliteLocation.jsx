import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  Compass,
  Clock,
  Truck,
  PhoneCall,
  MessageCircle,
  Layers,
  Sparkles,
  Zap,
  CheckCircle2,
  Route,
} from 'lucide-react';
import Card3D from './Card3D';

export default function SatelliteLocation() {
  const [mapMode, setMapMode] = useState('satellite'); // 'satellite' | 'roadmap'
  const [selectedOrigin, setSelectedOrigin] = useState(0);

  const origins = [
    {
      name: 'Étoile Rouge',
      distance: '3.2 km',
      timeMoto: '7 min',
      timeCar: '11 min',
      hint: 'Axe principal direct',
    },
    {
      name: 'Aéroport / Cadjehoun',
      distance: '5.8 km',
      timeMoto: '12 min',
      timeCar: '18 min',
      hint: 'Via Boulevard de la Marina',
    },
    {
      name: 'Calavi / Kpota',
      distance: '9.4 km',
      timeMoto: '18 min',
      timeCar: '25 min',
      hint: 'Livraison express disponible',
    },
    {
      name: 'Akpakpa / Dantokpa',
      distance: '4.9 km',
      timeMoto: '10 min',
      timeCar: '15 min',
      hint: 'Via 3ème Pont',
    },
  ];

  const currentRoute = origins[selectedOrigin];

  return (
    <div className="w-full space-y-8">
      {/* Top Header & Satellite Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-[#FF477E]/10 text-[#FF477E] border border-[#FF8BA7]/30 mb-2">
            <Compass className="w-3.5 h-3.5 animate-spin-slow" />
            <span>RADAR & NAVIGATION SATELLITE</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#2D1F2D] font-sans">
            Itinéraire & Vue Satellite en Direct
          </h3>
          <p className="text-xs sm:text-sm text-[#6E5D6E] mt-1">
            Boutique physique MiNiMi • Carrefour des Policiers, Cotonou, Bénin
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/90 border border-[#FF8BA7]/30 shadow-sm self-start md:self-auto">
          <button
            onClick={() => setMapMode('satellite')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              mapMode === 'satellite'
                ? 'bg-[#2D1F2D] text-white shadow-md'
                : 'text-[#6E5D6E] hover:text-[#2D1F2D]'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#FF8BA7]" />
            <span>Vue Satellite 🛰️</span>
          </button>
          <button
            onClick={() => setMapMode('roadmap')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              mapMode === 'roadmap'
                ? 'bg-[#FF477E] text-white shadow-md'
                : 'text-[#6E5D6E] hover:text-[#2D1F2D]'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Vue Plan 🗺️</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive Map HUD + Smart Route Planner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col: High-Tech Map Frame with HUD Overlay */}
        <div className="lg:col-span-7">
          <Card3D depth={25}>
            <div className="relative rounded-4xl overflow-hidden border-4 border-white shadow-2xl bg-[#1A1528] h-[380px] sm:h-[430px] group">
              {/* Google Maps Iframe (Satellite &t=k or Roadmap) */}
              <iframe
                title="Google Maps MiNiMi Cotonou"
                src={`https://maps.google.com/maps?q=Carrefour%20des%20Policiers%2C%20Cotonou%2C%20Benin&t=${
                  mapMode === 'satellite' ? 'k' : ''
                }&z=16&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full object-cover filter contrast-105"
              />

              {/* Satellite HUD Top Bar */}
              <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center pointer-events-none">
                {/* Pin Badge */}
                <div className="bg-[#2D1F2D]/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/20 text-white shadow-xl flex items-center gap-2.5 pointer-events-auto">
                  <img
                    src="/logo-minimi.png"
                    alt="Logo MiNiMi"
                    className="w-8 h-8 rounded-full object-contain bg-[#FAF6EE] border border-[#FF8BA7]/40 shadow-sm"
                  />
                  <div>
                    <h4 className="font-cute font-bold text-xs text-white leading-tight">
                      Boutique MiNiMi Store 💕
                    </h4>
                    <p className="text-[10px] text-[#FF8BA7] font-mono">
                      Carrefour des Policiers, Cotonou
                    </p>
                  </div>
                </div>

                {/* Satellite Telemetry Tag */}
                <div className="hidden sm:flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[10px] font-mono text-[#95D5B2]">
                  <span className="w-2 h-2 rounded-full bg-[#95D5B2] animate-ping" />
                  <span>GPS: 6.3703° N, 2.4185° E</span>
                </div>
              </div>

              {/* Central Pulsing Radar Beacon */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
                <span className="absolute w-20 h-20 rounded-full bg-[#FF477E]/20 animate-ping" />
                <span className="absolute w-12 h-12 rounded-full bg-[#FF477E]/35 animate-pulse" />
                <div className="w-5 h-5 rounded-full bg-[#FF477E] border-2 border-white shadow-lg shadow-pink-500 flex items-center justify-center text-white text-[9px] font-bold">
                  📍
                </div>
              </div>

              {/* Bottom Quick-Launch Bar */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-2xl bg-black/80 backdrop-blur-md border border-white/15 text-white">
                <div className="text-xs font-mono flex items-center gap-2 pl-2">
                  <span className="text-[#FF8BA7]">📍 Destination :</span>
                  <span className="font-bold">Carrefour des Policiers</span>
                </div>

                <a
                  href="https://maps.google.com/?q=Carrefour+des+Policiers+Cotonou+Benin"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF477E] to-[#C8963E] text-white text-xs font-bold shadow-md hover:scale-105 transition-transform flex items-center gap-1.5"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Ouvrir dans Google Maps</span>
                </a>
              </div>
            </div>
          </Card3D>
        </div>

        {/* Right Col: Interactive Itinerary Simulator */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-4xl bg-white/95 backdrop-blur-xl border border-[#FF8BA7]/30 shadow-xl space-y-5">
            {/* Title */}
            <div className="flex items-center justify-between pb-3 border-b border-[#FF8BA7]/20">
              <div className="flex items-center gap-2">
                <Route className="w-4 h-4 text-[#FF477E]" />
                <h4 className="font-bold text-sm text-[#2D1F2D] font-cute">
                  Calculateur d'Itinéraire Cotonou
                </h4>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#95D5B2] bg-[#E8F5E9] px-2.5 py-0.5 rounded-full">
                ⚡ TEMPS RÉEL
              </span>
            </div>

            {/* Departure Selector Pills */}
            <div>
              <label className="text-xs font-mono font-bold text-[#6E5D6E] block mb-2">
                1. Choisissez votre point de départ :
              </label>
              <div className="grid grid-cols-2 gap-2">
                {origins.map((orig, i) => (
                  <button
                    key={orig.name}
                    onClick={() => setSelectedOrigin(i)}
                    className={`p-2.5 rounded-2xl text-left transition-all border text-xs ${
                      selectedOrigin === i
                        ? 'bg-[#FFF0F3] border-[#FF477E] text-[#FF477E] font-bold shadow-sm ring-1 ring-[#FF477E]'
                        : 'bg-white border-gray-200 text-[#2D1F2D] hover:border-[#FF8BA7]/50'
                    }`}
                  >
                    <span className="block line-clamp-1">{orig.name}</span>
                    <span className="text-[10px] font-mono text-[#6E5D6E] block mt-0.5">
                      ~ {orig.distance}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Estimated Travel Time Cards */}
            <div className="p-4 rounded-3xl bg-gradient-to-br from-[#FFF5F7] to-[#FFF0F3] border border-[#FF8BA7]/25 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#6E5D6E] font-medium">Itinéraire calculé depuis :</span>
                <strong className="text-[#2D1F2D]">{currentRoute.name}</strong>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                {/* Moto-taxi / Zem */}
                <div className="p-3 rounded-2xl bg-white border border-[#FF8BA7]/20 shadow-sm">
                  <div className="flex items-center gap-1.5 text-xs text-[#FF477E] font-bold mb-1">
                    <span>🛵 En Moto / Zem</span>
                  </div>
                  <div className="text-xl font-mono font-bold text-[#2D1F2D]">
                    {currentRoute.timeMoto}
                  </div>
                  <div className="text-[10px] text-[#6E5D6E] mt-0.5">
                    {currentRoute.distance} • Le plus rapide
                  </div>
                </div>

                {/* Voiture / Taxi */}
                <div className="p-3 rounded-2xl bg-white border border-[#FF8BA7]/20 shadow-sm">
                  <div className="flex items-center gap-1.5 text-xs text-[#C8963E] font-bold mb-1">
                    <span>🚗 En Voiture</span>
                  </div>
                  <div className="text-xl font-mono font-bold text-[#2D1F2D]">
                    {currentRoute.timeCar}
                  </div>
                  <div className="text-[10px] text-[#6E5D6E] mt-0.5">
                    Parking disponible
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-[#6E5D6E] italic pt-1">
                💡 Conseil : {currentRoute.hint}
              </p>
            </div>

            {/* CTAs */}
            <div className="space-y-2 pt-1">
              <a
                href={`https://wa.me/2290191618707?text=Bonjour%20MiNiMi%20!%20Je%20souhaite%20l'itinéraire%20vers%20votre%20boutique%20depuis%20${encodeURIComponent(
                  currentRoute.name
                )}%20📍`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 rounded-2xl bg-[#25D366] text-white font-bold text-xs sm:text-sm shadow-md hover:bg-[#1EBE5D] transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Demander le trajet précis sur WhatsApp</span>
              </a>

              <div className="flex items-center justify-between text-xs text-[#6E5D6E] pt-2 px-1">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#FF477E]" /> Lun-Sam 09h-20h
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#95D5B2]" /> Livraison express &lt;2h
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
