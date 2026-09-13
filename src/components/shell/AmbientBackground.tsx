import React from 'react';

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#030708]">
      {/* Real Xbox 360 Luminous Green Energy Ribbons Background Image */}
      <img
        src="/background.jpg"
        alt="Xbox Energy Ribbons"
        className="absolute inset-0 w-full h-full object-cover object-center select-none opacity-95"
        referrerPolicy="no-referrer"
      />

      {/* Lightweight subtle atmospheric blending - keeping sidebar, topbar, and main fully see-through */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020506]/70 via-transparent to-black/20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/40 pointer-events-none" />

      {/* Ambient glowing ground reflection for authentic Xbox 360 stage depth */}
      <div 
        className="absolute bottom-[-10%] left-[10%] w-[80%] h-[350px] rounded-full opacity-50 blur-[120px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.45) 0%, rgba(6,78,59,0.2) 50%, transparent 80%)'
        }}
      />
    </div>
  );
}
