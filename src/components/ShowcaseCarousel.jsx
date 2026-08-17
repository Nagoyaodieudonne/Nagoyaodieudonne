import React, { useRef, useState, useEffect } from 'react';
import { ShoppingBag, ChevronLeft, ChevronRight, Star, Flame, Sparkles } from 'lucide-react';
import Card3D from './Card3D';

export default function ShowcaseCarousel({ items, onSelectProduct }) {
  const scrollContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Update active index & navigation buttons on scroll
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const itemWidth = container.offsetWidth * 0.78; // width of a card on mobile

    const newIndex = Math.round(scrollLeft / itemWidth);
    setActiveIndex(Math.min(Math.max(newIndex, 0), items.length - 1));

    setCanScrollLeft(scrollLeft > 20);
    setCanScrollRight(scrollLeft < container.scrollWidth - container.clientWidth - 20);
  };

  const scrollTo = (direction) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const scrollToIndex = (index) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const children = container.children;
    if (children[index]) {
      children[index].scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  };

  return (
    <div className="relative w-full py-8 select-none">
      {/* Top Controls Header (Desktop & Tablet) */}
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FF477E]">
          <Sparkles className="w-4 h-4" />
          <span>SÉLECTION VEDETTE ({items.length} ARTICLES)</span>
        </div>

        {/* Arrow Navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollTo('left')}
            disabled={!canScrollLeft}
            className={`w-10 h-10 rounded-full border border-[#FF8BA7]/30 flex items-center justify-center transition-all ${
              canScrollLeft
                ? 'bg-white shadow-md text-[#FF477E] hover:scale-105 active:scale-95'
                : 'bg-white/40 text-gray-300 cursor-not-allowed'
            }`}
            aria-label="Précédent"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollTo('right')}
            disabled={!canScrollRight}
            className={`w-10 h-10 rounded-full border border-[#FF8BA7]/30 flex items-center justify-center transition-all ${
              canScrollRight
                ? 'bg-white shadow-md text-[#FF477E] hover:scale-105 active:scale-95'
                : 'bg-white/40 text-gray-300 cursor-not-allowed'
            }`}
            aria-label="Suivant"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 120 FPS Hardware-Accelerated Snap Scroll Container */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none px-4 sm:px-8 py-4 no-scrollbar"
        style={{
          WebkitOverflowScrolling: 'touch',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
        }}
      >
        {items.map((item, idx) => {
          const isActive = idx === activeIndex;

          return (
            <div
              key={item.id}
              className="snap-center shrink-0 w-[82vw] sm:w-[340px] md:w-[360px] transition-transform duration-300"
              style={{
                scrollSnapAlign: 'center',
              }}
            >
              <Card3D depth={25} onClick={() => onSelectProduct && onSelectProduct(item)}>
                <div
                  className={`h-full rounded-4xl p-5 border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-white/95 shadow-2xl border-[#FF477E]/50 ring-2 ring-[#FF477E]/20 scale-[1.02]'
                      : 'bg-white/85 shadow-lg border-white/70 hover:border-[#FF8BA7]/40 scale-100'
                  }`}
                  style={{
                    boxShadow: isActive
                      ? '0 20px 40px -10px rgba(255, 71, 126, 0.22)'
                      : '0 10px 25px rgba(0, 0, 0, 0.04)',
                  }}
                >
                  {/* Top Badges */}
                  <div className="flex justify-between items-center mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FFF0F3] text-[#FF477E] border border-[#FF8BA7]/30 flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-[#FF477E]" />
                      {item.badge}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#C8963E] bg-white px-2.5 py-0.5 rounded-full border border-gray-100 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-[#C8963E]" /> 4.9
                    </span>
                  </div>

                  {/* Product Image */}
                  <div className="relative w-full h-[230px] sm:h-[250px] rounded-3xl overflow-hidden mb-4 bg-[#FFF5F7]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 text-[11px] font-mono text-white px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>

                  {/* Title & Tag */}
                  <div className="mb-4">
                    <h4 className="font-cute font-bold text-lg text-[#2D1F2D] line-clamp-1 mb-1">
                      {item.name}
                    </h4>
                    <p className="text-xs text-[#6E5D6E] line-clamp-1">
                      {item.tag}
                    </p>
                  </div>

                  {/* Bottom Price & Action */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#FF8BA7]/20">
                    <div>
                      <span className="text-[10px] font-mono text-[#6E5D6E] block">Prix unitaire</span>
                      <span className="font-mono font-bold text-lg text-[#FF477E]">
                        {item.price}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct && onSelectProduct(item);
                      }}
                      className="px-4 py-2 rounded-2xl bg-gradient-to-r from-[#FF477E] to-[#C8963E] text-white text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-transform flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Commander</span>
                    </button>
                  </div>
                </div>
              </Card3D>
            </div>
          );
        })}
      </div>

      {/* Pagination Pills & Gesture hint */}
      <div className="flex flex-col items-center gap-3 mt-6">
        <div className="flex items-center gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'w-7 bg-[#FF477E]'
                  : 'w-2 bg-[#FF8BA7]/30 hover:bg-[#FF8BA7]'
              }`}
              aria-label={`Aller au produit ${i + 1}`}
            />
          ))}
        </div>

        <span className="text-[11px] font-mono text-[#6E5D6E] bg-white/70 px-3 py-1 rounded-full border border-[#FF8BA7]/20">
          👉 Glissez horizontalement sur mobile • 100% Fluide
        </span>
      </div>
    </div>
  );
}
