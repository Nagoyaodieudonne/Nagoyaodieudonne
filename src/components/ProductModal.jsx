import React, { useState } from 'react';
import { X, ShoppingBag, MessageCircle, Heart, Star, Sparkles, Check, PhoneCall } from 'lucide-react';
import confetti from 'canvas-confetti';
import Card3D from './Card3D';

export default function ProductModal({ product, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const [isOrdered, setIsOrdered] = useState(false);

  if (!product) return null;

  // Extract numeric value from price string (e.g. "5.000 FCFA" -> 5000)
  const numericPrice = parseInt(product.price.replace(/[^0-9]/g, ''), 10) || 5000;
  const totalPrice = (numericPrice * quantity).toLocaleString('fr-FR') + ' FCFA';

  const handleWhatsAppOrder = () => {
    // Trigger festive celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF477E', '#FF8BA7', '#C8963E', '#95D5B2', '#FFD166'],
    });

    setIsOrdered(true);

    const message = encodeURIComponent(
      `Bonjour MiNiMi Store Cotonou ! 💕\n\nJe souhaite commander :\n🛍️ Produit : *${product.name}*\n📦 Quantité : *${quantity}*\n💰 Prix Total : *${totalPrice}*\n🏷️ Catégorie : ${product.category}\n\n📍 Livraison : Cotonou / Calavi\nPouvez-vous me confirmer la disponibilité ? Merci ! ✨`
    );

    setTimeout(() => {
      window.open(`https://wa.me/2290191618707?text=${message}`, '_blank');
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white/95 backdrop-blur-2xl rounded-4xl shadow-2xl border border-[#FF8BA7]/30 overflow-hidden text-[#2D1F2D] animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/80 border border-gray-200 flex items-center justify-center text-gray-600 hover:text-black hover:scale-110 active:scale-95 transition-all shadow-md"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: 3D Product Image with Tilt */}
          <div className="p-6 bg-gradient-to-br from-[#FFF0F3] to-[#FFFDF9] flex items-center justify-center">
            <Card3D depth={35} className="w-full h-[280px] md:h-[340px]">
              <div className="w-full h-full rounded-3xl overflow-hidden shadow-xl border border-white relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-[#FF477E] text-white shadow-md">
                  {product.badge}
                </span>
              </div>
            </Card3D>
          </div>

          {/* Right: Details & Order CTA */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FFC5D3]/50 text-[#FF477E]">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-xs font-mono font-bold text-[#C8963E]">
                  <Star className="w-3.5 h-3.5 fill-[#C8963E]" /> 4.9 (Avis vérifié)
                </div>
              </div>

              <h3 className="font-cute font-bold text-2xl text-[#2D1F2D] leading-tight mb-2">
                {product.name}
              </h3>

              <p className="text-sm text-[#6E5D6E] mb-4">
                Article exclusif MiNiMi Boutique Cotonou. Parfait pour cadeau, papeterie créative ou école.
              </p>

              {/* Price & Quantity Selector */}
              <div className="p-4 rounded-2xl bg-[#FFF5F7] border border-[#FF8BA7]/25 mb-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs text-[#6E5D6E] font-medium">Prix unitaire</span>
                  <span className="font-mono font-bold text-lg text-[#FF477E]">
                    {product.price}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-[#FF8BA7]/20">
                  <span className="text-xs text-[#6E5D6E] font-medium">Quantité</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-[#FF8BA7]/40 font-bold text-sm text-[#FF477E] flex items-center justify-center hover:bg-[#FFF0F3]"
                    >
                      -
                    </button>
                    <span className="font-mono font-bold text-base px-2">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-lg bg-white border border-[#FF8BA7]/40 font-bold text-sm text-[#FF477E] flex items-center justify-center hover:bg-[#FFF0F3]"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3 mt-2 border-t border-[#FF8BA7]/20">
                  <span className="text-sm font-bold text-[#2D1F2D]">Total à payer :</span>
                  <span className="font-mono font-bold text-xl text-[#C8963E]">
                    {totalPrice}
                  </span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Order CTA */}
            <div>
              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#25D366] via-[#1EBE5D] to-[#128C7E] text-white font-bold text-base shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                {isOrdered ? (
                  <>
                    <Check className="w-5 h-5 animate-bounce" /> Redirection WhatsApp...
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-5 h-5" /> Commander via WhatsApp
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 mt-3 text-xs text-[#6E5D6E]">
                <span>⚡ Réponse en 5 min</span>
                <span>•</span>
                <span>🛵 Livraison Cotonou & Calavi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
