import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Card3D from './Card3D';

export default function OrbitGallery3D({ items, onSelectProduct }) {
  const [rotation, setRotation] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentRot = useRef(0);

  const total = items.length;
  const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 260 : 380;
  const angleStep = 360 / total;

  // Auto-rotation
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setRotation((prev) => prev - 0.25);
    }, 30);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  // Mouse / Touch Drag handlers for 3D rotation
  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    currentRot.current = rotation;
    setIsAutoPlay(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const delta = clientX - startX.current;
    setRotation(currentRot.current + delta * 0.35);
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setTimeout(() => setIsAutoPlay(true), 2500);
  };

  const rotateTo = (index) => {
    setIsAutoPlay(false);
    const targetAngle = -index * angleStep;
    setRotation(targetAngle);
    setActiveIdx(index);
    setTimeout(() => setIsAutoPlay(true), 3500);
  };

  return (
    <div className="relative w-full py-16 overflow-hidden select-none">
      {/* 3D Orbit Stage */}
      <div
        className="relative w-full h-[480px] flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{ perspective: 1400 }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      >
        {/* 3D Carousel Cylinder */}
        <div
          className="relative w-[280px] h-[380px] transition-transform duration-100 ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateY(${rotation}deg)`,
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * angleStep;
            const normalizedRot = ((rotation % 360) + 360) % 360;
            const currentItemAngle = (itemAngle + normalizedRot) % 360;
            // Calculate distance to front
            const isFront = currentItemAngle > 330 || currentItemAngle < 30;

            return (
              <div
                key={item.id}
                className="absolute inset-0 transition-opacity duration-300"
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  transformStyle: 'preserve-3d',
                }}
              >
                <div
                  className={`w-full h-full rounded-3xl p-4 transition-all duration-300 ${
                    isFront
                      ? 'shadow-2xl scale-105 border-2 border-[#FF477E]/50 bg-white/95 backdrop-blur-xl'
                      : 'opacity-70 scale-95 border border-white/60 bg-white/85 backdrop-blur-md'
                  }`}
                  style={{
                    boxShadow: isFront
                      ? '0 20px 50px -10px rgba(255, 71, 126, 0.35)'
                      : '0 10px 25px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  {/* Badge */}
                  <div className="flex justify-between items-center mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FFF0F3] text-[#FF477E] border border-[#FF8BA7]/30">
                      {item.badge}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#C8963E] flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-[#C8963E]" /> 4.9
                    </span>
                  </div>

                  {/* Image with 3D Depth */}
                  <div className="relative w-full h-[180px] rounded-2xl overflow-hidden mb-3 bg-[#FFF5F7]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>

                  {/* Info */}
                  <h4 className="font-bold text-sm text-[#2D1F2D] line-clamp-1 mb-1 font-cute">
                    {item.name}
                  </h4>
                  <div className="text-xs text-[#6E5D6E] line-clamp-1 mb-3">
                    {item.tag}
                  </div>

                  {/* Bottom Action */}
                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-mono font-bold text-sm text-[#FF477E]">
                      {item.price}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct && onSelectProduct(item);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#FF477E] to-[#C8963E] text-white text-xs font-bold shadow-md hover:scale-105 transition-transform flex items-center gap-1"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Commander
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => {
            setIsAutoPlay(false);
            setRotation((prev) => prev + angleStep);
          }}
          className="w-11 h-11 rounded-full bg-white/90 shadow-lg border border-[#FF8BA7]/30 text-[#FF477E] flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
          aria-label="Article Précédent"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <span className="text-xs font-mono font-bold text-[#6E5D6E] px-4 py-1.5 rounded-full bg-white/80 border border-[#FF8BA7]/20">
          ✨ Glissez pour explorer en 3D
        </span>

        <button
          onClick={() => {
            setIsAutoPlay(false);
            setRotation((prev) => prev - angleStep);
          }}
          className="w-11 h-11 rounded-full bg-white/90 shadow-lg border border-[#FF8BA7]/30 text-[#FF477E] flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
          aria-label="Article Suivant"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
