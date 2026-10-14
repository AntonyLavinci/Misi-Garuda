import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundController } from '../utils/audioSynthesizer';

interface GarudaInteractiveSvgProps {
  selectedPartId: string;
  onSelectPart: (partId: string) => void;
  showFeatherCounts?: boolean;
}

export const GarudaInteractiveSvg: React.FC<GarudaInteractiveSvgProps> = ({
  selectedPartId,
  onSelectPart,
  showFeatherCounts = true,
}) => {
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);

  const handlePartClick = (partId: string) => {
    soundController.playClick();
    onSelectPart(partId);
  };

  const isHighlighted = (partId: string) => selectedPartId === partId || hoveredPart === partId;

  return (
    <div className="relative w-full max-w-[620px] mx-auto select-none p-2">
      <svg
        viewBox="0 0 600 580"
        className="w-full h-auto drop-shadow-md overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gold gradients */}
          <linearGradient id="goldFeatherGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>

          <linearGradient id="goldHeadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="50%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          <linearGradient id="shieldRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="70%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>

          {/* Glow filter for active selection */}
          <filter id="activeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#F59E0B" floodOpacity="0.8" />
          </filter>

          <filter id="partHover" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#FBBF24" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* 1. TAIL FEATHERS (8 Feathers) */}
        <g
          id="garuda-ekor"
          className="cursor-pointer transition-transform duration-200"
          onClick={() => handlePartClick('ekor')}
          onMouseEnter={() => setHoveredPart('ekor')}
          onMouseLeave={() => setHoveredPart(null)}
          filter={isHighlighted('ekor') ? 'url(#activeGlow)' : undefined}
        >
          {/* 8 distinct tail feathers radiating down */}
          {[
            { d: 'M 255 420 C 240 450, 230 490, 240 520 C 248 522, 258 495, 268 440 Z', idx: 1 },
            { d: 'M 268 430 C 260 465, 255 510, 265 535 C 275 537, 280 500, 285 445 Z', idx: 2 },
            { d: 'M 283 440 C 280 475, 278 525, 288 545 C 295 545, 300 515, 300 450 Z', idx: 3 },
            { d: 'M 298 440 C 300 480, 298 535, 305 550 C 312 550, 316 510, 314 445 Z', idx: 4 },
            { d: 'M 314 440 C 318 475, 320 525, 312 545 C 305 545, 300 515, 300 450 Z', idx: 5 },
            { d: 'M 317 430 C 325 465, 330 510, 320 535 C 310 537, 305 500, 300 445 Z', idx: 6 },
            { d: 'M 330 420 C 345 450, 355 490, 345 520 C 337 522, 327 495, 317 440 Z', idx: 7 },
            { d: 'M 342 410 C 362 440, 375 475, 365 505 C 356 507, 345 480, 335 430 Z', idx: 8 },
          ].map((feather, i) => (
            <path
              key={i}
              d={feather.d}
              fill="url(#goldFeatherGrad)"
              stroke={isHighlighted('ekor') ? '#92400E' : '#78350F'}
              strokeWidth={isHighlighted('ekor') ? 2 : 1.2}
              className="transition-colors duration-200"
            />
          ))}
          {/* Decorative tail bar */}
          <path d="M 260 430 Q 300 445 340 430 Q 300 415 260 430 Z" fill="#D97706" stroke="#92400E" strokeWidth="1" />
        </g>

        {/* 2. BASE OF TAIL (19 Feathers beneath the shield) */}
        <g
          id="garuda-pangkal-ekor"
          className="cursor-pointer"
          onClick={() => handlePartClick('pangkalEkor')}
          onMouseEnter={() => setHoveredPart('pangkalEkor')}
          onMouseLeave={() => setHoveredPart(null)}
          filter={isHighlighted('pangkalEkor') ? 'url(#activeGlow)' : undefined}
        >
          {/* Fan of 19 small feathers */}
          <path
            d="M 265 385 C 265 405, 275 418, 300 422 C 325 418, 335 405, 335 385 Z"
            fill="#B45309"
            stroke="#78350F"
            strokeWidth="1"
          />
          {[-45, -40, -35, -30, -25, -20, -15, -10, -5, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45].map((angle, idx) => (
            <line
              key={idx}
              x1={300 + Math.sin((angle * Math.PI) / 180) * 8}
              y1={390 + Math.cos((angle * Math.PI) / 180) * 5}
              x2={300 + Math.sin((angle * Math.PI) / 180) * 32}
              y2={390 + Math.cos((angle * Math.PI) / 180) * 30}
              stroke={isHighlighted('pangkalEkor') ? '#FEF08A' : '#FDE68A'}
              strokeWidth={isHighlighted('pangkalEkor') ? 2.5 : 1.8}
              strokeLinecap="round"
            />
          ))}
        </g>

        {/* 3. WINGS (17 Feathers on each wing) */}
        {/* Left Wing (from viewer perspective, bird's right side) */}
        <g
          id="garuda-sayap-kiri"
          className="cursor-pointer"
          onClick={() => handlePartClick('sayap')}
          onMouseEnter={() => setHoveredPart('sayap')}
          onMouseLeave={() => setHoveredPart(null)}
          filter={isHighlighted('sayap') ? 'url(#activeGlow)' : undefined}
        >
          {/* Main wing bone / muscle base */}
          <path
            d="M 230 260 C 180 200, 140 140, 90 70 C 120 120, 150 180, 180 240 C 190 280, 210 320, 235 350 Z"
            fill="url(#goldFeatherGrad)"
            stroke="#92400E"
            strokeWidth="1.5"
          />
          {/* 17 Feathers stylized sweeping out */}
          {[
            'M 90 70 C 70 85, 55 105, 40 130 C 70 125, 105 130, 140 160 Z',
            'M 60 110 C 40 130, 30 155, 25 180 C 55 165, 90 170, 130 195 Z',
            'M 40 155 C 25 180, 20 205, 18 230 C 45 205, 80 210, 120 225 Z',
            'M 25 205 C 15 230, 15 255, 20 275 C 45 245, 80 245, 120 255 Z',
            'M 20 255 C 18 280, 25 305, 35 325 C 55 285, 90 275, 130 280 Z',
            'M 30 300 C 32 325, 42 345, 55 360 C 72 325, 105 310, 145 305 Z',
            'M 48 340 C 55 365, 70 380, 85 395 C 98 355, 125 335, 160 325 Z',
            'M 75 375 C 85 395, 105 410, 125 420 C 130 380, 150 355, 180 340 Z',
            // Inner secondary tier feathers
            'M 100 120 C 130 160, 150 190, 180 220 Z',
            'M 80 150 C 110 185, 140 210, 170 235 Z',
            'M 65 185 C 95 215, 130 235, 165 250 Z',
            'M 55 225 C 85 245, 120 255, 160 265 Z',
            'M 55 265 C 85 275, 120 280, 155 285 Z',
            'M 70 300 C 95 305, 125 305, 160 300 Z',
            'M 90 330 C 115 330, 145 320, 175 310 Z',
            'M 120 355 C 140 345, 165 335, 190 320 Z',
            'M 150 370 C 165 355, 185 340, 205 325 Z',
          ].map((pathD, idx) => (
            <path
              key={`w-left-${idx}`}
              d={pathD}
              fill="url(#goldFeatherGrad)"
              stroke={isHighlighted('sayap') ? '#FEF08A' : '#78350F'}
              strokeWidth={isHighlighted('sayap') ? 1.8 : 1}
              className="transition-all duration-200"
            />
          ))}
        </g>

        {/* Right Wing (from viewer perspective, bird's left side) */}
        <g
          id="garuda-sayap-kanan"
          className="cursor-pointer"
          onClick={() => handlePartClick('sayap')}
          onMouseEnter={() => setHoveredPart('sayap')}
          onMouseLeave={() => setHoveredPart(null)}
          filter={isHighlighted('sayap') ? 'url(#activeGlow)' : undefined}
        >
          {/* Main wing bone / muscle base */}
          <path
            d="M 370 260 C 420 200, 460 140, 510 70 C 480 120, 450 180, 420 240 C 410 280, 390 320, 365 350 Z"
            fill="url(#goldFeatherGrad)"
            stroke="#92400E"
            strokeWidth="1.5"
          />
          {/* 17 Feathers sweeping out mirror */}
          {[
            'M 510 70 C 530 85, 545 105, 560 130 C 530 125, 495 130, 460 160 Z',
            'M 540 110 C 560 130, 570 155, 575 180 C 545 165, 510 170, 470 195 Z',
            'M 560 155 C 575 180, 580 205, 582 230 C 555 205, 520 210, 480 225 Z',
            'M 575 205 C 585 230, 585 255, 580 275 C 555 245, 520 245, 480 255 Z',
            'M 580 255 C 582 280, 575 305, 565 325 C 545 285, 510 275, 470 280 Z',
            'M 570 300 C 568 325, 558 345, 545 360 C 528 325, 495 310, 455 305 Z',
            'M 552 340 C 545 365, 530 380, 515 395 C 502 355, 475 335, 440 325 Z',
            'M 525 375 C 515 395, 495 410, 475 420 C 470 380, 450 355, 420 340 Z',
            // Inner secondary tier feathers
            'M 500 120 C 470 160, 450 190, 420 220 Z',
            'M 520 150 C 490 185, 460 210, 430 235 Z',
            'M 535 185 C 505 215, 470 235, 435 250 Z',
            'M 545 225 C 515 245, 480 255, 440 265 Z',
            'M 545 265 C 515 275, 480 280, 445 285 Z',
            'M 530 300 C 505 305, 475 305, 440 300 Z',
            'M 510 330 C 485 330, 455 320, 425 310 Z',
            'M 480 355 C 460 345, 435 335, 410 320 Z',
            'M 450 370 C 435 355, 415 340, 395 325 Z',
          ].map((pathD, idx) => (
            <path
              key={`w-right-${idx}`}
              d={pathD}
              fill="url(#goldFeatherGrad)"
              stroke={isHighlighted('sayap') ? '#FEF08A' : '#78350F'}
              strokeWidth={isHighlighted('sayap') ? 1.8 : 1}
              className="transition-all duration-200"
            />
          ))}
        </g>

        {/* 4. NECK (45 Feathers) */}
        <g
          id="garuda-leher"
          className="cursor-pointer"
          onClick={() => handlePartClick('leher')}
          onMouseEnter={() => setHoveredPart('leher')}
          onMouseLeave={() => setHoveredPart(null)}
          filter={isHighlighted('leher') ? 'url(#activeGlow)' : undefined}
        >
          {/* Neck base outline */}
          <path
            d="M 270 150 Q 260 200 245 225 L 355 225 Q 340 200 330 150 Z"
            fill="url(#goldHeadGrad)"
            stroke="#92400E"
            strokeWidth="1.5"
          />
          {/* 5 tiers of 9 scale-like feathers (45 total) */}
          {[165, 178, 191, 204, 217].map((y, rowIdx) => (
            <g key={`neck-row-${rowIdx}`}>
              {[-36, -27, -18, -9, 0, 9, 18, 27, 36].map((xOffset, colIdx) => {
                const spread = 1 + rowIdx * 0.15;
                const cx = 300 + xOffset * spread;
                return (
                  <path
                    key={`neck-f-${rowIdx}-${colIdx}`}
                    d={`M ${cx - 5} ${y - 4} Q ${cx} ${y + 6} ${cx + 5} ${y - 4} Z`}
                    fill={isHighlighted('leher') ? '#FEF08A' : '#F59E0B'}
                    stroke={isHighlighted('leher') ? '#B45309' : '#92400E'}
                    strokeWidth={isHighlighted('leher') ? 1.4 : 0.8}
                  />
                );
              })}
            </g>
          ))}
        </g>

        {/* 5. HEAD & CREST / JAMBUL (Menoleh ke Kanan) */}
        <g
          id="garuda-kepala"
          className="cursor-pointer"
          onClick={() => handlePartClick('kepala')}
          onMouseEnter={() => setHoveredPart('kepala')}
          onMouseLeave={() => setHoveredPart(null)}
          filter={isHighlighted('kepala') ? 'url(#activeGlow)' : undefined}
        >
          {/* Head body */}
          <path
            d="M 275 145 C 270 100, 290 65, 335 65 C 365 65, 385 85, 395 110 C 375 115, 360 125, 340 145 Z"
            fill="url(#goldHeadGrad)"
            stroke="#78350F"
            strokeWidth="1.5"
          />
          {/* Jambul / Mahkota (Crest added by Sukarno) */}
          <path
            d="M 315 65 C 310 40, 330 25, 350 30 C 342 45, 345 55, 355 60 C 365 45, 380 40, 390 50 C 375 65, 370 75, 378 85 Z"
            fill="url(#goldFeatherGrad)"
            stroke="#92400E"
            strokeWidth="1.2"
          />
          {/* Beak / Paruh gagah melengkung ke kanan */}
          <path
            d="M 370 95 C 415 102, 435 118, 415 130 C 385 125, 365 125, 355 120 Z"
            fill="#EA580C"
            stroke="#9A3412"
            strokeWidth="1.5"
          />
          {/* Mata Garuda */}
          <circle cx="345" cy="100" r="7" fill="#FEF08A" stroke="#78350F" strokeWidth="1.2" />
          <circle cx="347" cy="100" r="3.5" fill="#18181B" />
          <circle cx="346" cy="98" r="1.2" fill="#FFFFFF" />
          {/* Telinga / Hiasan samping */}
          <path d="M 285 110 C 270 115, 265 130, 275 135 Z" fill="#D97706" stroke="#78350F" strokeWidth="1" />
        </g>

        {/* 6. CENTRAL SHIELD / PERISAI JANTUNG */}
        <g
          id="garuda-perisai"
          className="cursor-pointer"
          onClick={() => handlePartClick('perisai')}
          onMouseEnter={() => setHoveredPart('perisai')}
          onMouseLeave={() => setHoveredPart(null)}
          filter={isHighlighted('perisai') ? 'url(#activeGlow)' : undefined}
        >
          {/* Golden Chain holding shield to neck */}
          <path
            d="M 255 210 Q 300 245 345 210"
            fill="none"
            stroke="#FBBF24"
            strokeWidth="5"
            strokeDasharray="6,4"
          />
          <path
            d="M 255 210 Q 300 245 345 210"
            fill="none"
            stroke="#78350F"
            strokeWidth="1.5"
          />

          {/* Outer Shield Frame (Perisai Emas) */}
          <path
            d="M 220 220 C 220 220, 300 215, 380 220 C 385 285, 380 345, 300 395 C 220 345, 215 285, 220 220 Z"
            fill="url(#shieldRimGrad)"
            stroke="#78350F"
            strokeWidth="3"
          />

          {/* Inner Shield Boundary */}
          <path
            d="M 228 228 C 228 228, 300 224, 372 228 C 376 283, 372 338, 300 384 C 228 338, 224 283, 228 228 Z"
            fill="#18181B"
          />

          {/* Quadrant 1: Top Right (Viewer Left: Red Background for Banteng) */}
          {/* Heraldry: Dexter chief is viewer top-left; in Garuda: Banteng is top-left of viewer (red), Beringin top-right of viewer (white) */}
          {/* Let's follow official coat of arms:
              - Sila 1 (Bintang): Pusat / Tengah (Latar Hitam)
              - Sila 2 (Rantai): Kanan Bawah burung = Kiri Bawah pelihat (Latar Merah)
              - Sila 3 (Pohon Beringin): Kiri Atas burung = Kanan Atas pelihat (Latar Putih)
              - Sila 4 (Kepala Banteng): Kanan Atas burung = Kiri Atas pelihat (Latar Merah)
              - Sila 5 (Padi & Kapas): Kiri Bawah burung = Kanan Bawah pelihat (Latar Putih)
          */}
          {/* Top-Left Quadrant (Viewer perspective: Red background for Banteng) */}
          <path
            d="M 230 230 L 300 230 L 300 295 L 230 295 Z"
            fill="#DC2626"
            stroke="#78350F"
            strokeWidth="1"
          />
          {/* Top-Right Quadrant (Viewer perspective: White background for Beringin) */}
          <path
            d="M 300 230 L 370 230 L 370 295 L 300 295 Z"
            fill="#F8FAFC"
            stroke="#78350F"
            strokeWidth="1"
          />
          {/* Bottom-Left Quadrant (Viewer perspective: Red background for Rantai) */}
          <path
            d="M 230 305 L 300 305 L 300 380 C 265 355, 235 330, 230 305 Z"
            fill="#DC2626"
            stroke="#78350F"
            strokeWidth="1"
          />
          {/* Bottom-Right Quadrant (Viewer perspective: White background for Padi-Kapas) */}
          <path
            d="M 300 305 L 370 305 C 365 330, 335 355, 300 380 Z"
            fill="#F8FAFC"
            stroke="#78350F"
            strokeWidth="1"
          />

          {/* 7. GARIS TEBAL KHATULISTIWA (Thick Black Equator Line) */}
          <rect
            id="garuda-khatulistiwa"
            x="226"
            y="295"
            width="148"
            height="10"
            fill="#09090B"
            stroke={isHighlighted('khatulistiwa') ? '#FEF08A' : '#27272A'}
            strokeWidth={isHighlighted('khatulistiwa') ? 2 : 0.8}
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handlePartClick('khatulistiwa');
            }}
            onMouseEnter={() => setHoveredPart('khatulistiwa')}
            onMouseLeave={() => setHoveredPart(null)}
          />

          {/* MINI SYMBOL 4: Kepala Banteng (Top-Left Quadrant) */}
          <g id="symbol-banteng" transform="translate(250, 245)">
            <path
              d="M 8 18 C 3 12, 0 8, 4 4 C 8 0, 16 2, 20 8 C 24 2, 32 0, 36 4 C 40 8, 37 12, 32 18 C 35 25, 30 36, 20 38 C 10 36, 5 25, 8 18 Z"
              fill="#18181B"
              stroke="#D4D4D8"
              strokeWidth="0.8"
            />
            {/* Tanduk Banteng */}
            <path d="M 6 6 C -4 -4, -6 -12, 2 -18 C 6 -12, 4 -4, 10 2 Z" fill="#E4E4E7" stroke="#18181B" strokeWidth="0.5" />
            <path d="M 34 6 C 44 -4, 46 -12, 38 -18 C 34 -12, 36 -4, 30 2 Z" fill="#E4E4E7" stroke="#18181B" strokeWidth="0.5" />
            {/* Mata Banteng */}
            <circle cx="14" cy="18" r="1.5" fill="#EF4444" />
            <circle cx="26" cy="18" r="1.5" fill="#EF4444" />
          </g>

          {/* MINI SYMBOL 3: Pohon Beringin (Top-Right Quadrant) */}
          <g id="symbol-beringin" transform="translate(320, 245)">
            {/* Trunk & Roots */}
            <path d="M 17 38 L 17 24 L 14 20 L 16 16 L 24 16 L 26 20 L 23 24 L 23 38 Z" fill="#78350F" />
            <path d="M 12 38 L 15 28 M 28 38 L 25 28 M 20 38 L 20 28" stroke="#78350F" strokeWidth="1" />
            {/* Canopy */}
            <path
              d="M 5 20 C -2 12, 4 2, 14 3 C 18 -4, 28 -4, 32 4 C 40 2, 46 12, 40 22 C 38 28, 28 30, 20 28 C 12 30, 4 26, 5 20 Z"
              fill="#15803D"
              stroke="#14532D"
              strokeWidth="1"
            />
            {/* Drooping vines */}
            <line x1="8" y1="20" x2="8" y2="28" stroke="#166534" strokeWidth="1" />
            <line x1="12" y1="22" x2="12" y2="30" stroke="#166534" strokeWidth="1" />
            <line x1="28" y1="22" x2="28" y2="30" stroke="#166534" strokeWidth="1" />
            <line x1="32" y1="20" x2="32" y2="28" stroke="#166534" strokeWidth="1" />
          </g>

          {/* MINI SYMBOL 2: Rantai Emas (Bottom-Left Quadrant) */}
          <g id="symbol-rantai" transform="translate(245, 318)">
            {/* Ring chain loop */}
            <circle cx="12" cy="12" r="7" fill="none" stroke="#FBBF24" strokeWidth="2.5" />
            <rect x="20" y="8" width="10" height="8" rx="2" fill="none" stroke="#F59E0B" strokeWidth="2.5" />
            <circle cx="37" cy="12" r="7" fill="none" stroke="#FBBF24" strokeWidth="2.5" />
            <rect x="30" y="24" width="8" height="10" rx="2" fill="none" stroke="#F59E0B" strokeWidth="2.5" />
            <circle cx="18" cy="30" r="7" fill="none" stroke="#FBBF24" strokeWidth="2.5" />
          </g>

          {/* MINI SYMBOL 5: Padi dan Kapas (Bottom-Right Quadrant) */}
          <g id="symbol-padi-kapas" transform="translate(320, 318)">
            {/* Padi (Left curve golden grains) */}
            <path d="M 8 36 C 8 20, 10 10, 18 4" fill="none" stroke="#CA8A04" strokeWidth="1.5" />
            {[8, 14, 20, 26, 32].map((yVal, gIdx) => (
              <ellipse key={gIdx} cx={7 + (gIdx % 2 ? 3 : -2)} cy={yVal} rx="3" ry="1.8" fill="#EAB308" stroke="#A16207" strokeWidth="0.5" />
            ))}
            {/* Kapas (Right curve white blooms) */}
            <path d="M 28 36 C 28 20, 26 10, 20 4" fill="none" stroke="#15803D" strokeWidth="1.5" />
            {[10, 18, 26, 34].map((yVal, kIdx) => (
              <g key={kIdx} transform={`translate(28, ${yVal})`}>
                <circle cx="0" cy="0" r="3.2" fill="#FFFFFF" stroke="#15803D" strokeWidth="0.8" />
                <path d="M -2 2 L 0 4 L 2 2" fill="none" stroke="#15803D" strokeWidth="0.8" />
              </g>
            ))}
          </g>

          {/* MINI SYMBOL 1: Bintang Emas Pusat (Center on Black Shield) */}
          <g id="symbol-bintang-center" transform="translate(300, 300)">
            {/* Black shield center */}
            <path
              d="M -30 -30 L 30 -30 L 30 15 L 0 35 L -30 15 Z"
              fill="#09090B"
              stroke="#F59E0B"
              strokeWidth="1.8"
            />
            {/* Golden 5-pointed star */}
            <polygon
              points="0,-22 6,-6 23,-5 10,6 14,23 0,13 -14,23 -10,6 -23,-5 -6,-6"
              fill="#FBBF24"
              stroke="#D97706"
              strokeWidth="1"
            />
          </g>
        </g>

        {/* 8. CLAWS & RIBBON (PITA BHINNEKA TUNGGAL IKA) */}
        <g
          id="garuda-pita"
          className="cursor-pointer"
          onClick={() => handlePartClick('pita')}
          onMouseEnter={() => setHoveredPart('pita')}
          onMouseLeave={() => setHoveredPart(null)}
          filter={isHighlighted('pita') ? 'url(#activeGlow)' : undefined}
        >
          {/* Claws gripping from behind forward onto ribbon */}
          {/* Left talon (viewer left) */}
          <g id="cakar-kiri" transform="translate(245, 410)">
            <path d="M -15 -10 C -12 10, -5 22, 5 22 C 2 12, 0 0, -5 -10 Z" fill="#F59E0B" stroke="#92400E" strokeWidth="1.2" />
            <path d="M 0 -8 C 5 12, 10 24, 18 20 C 14 10, 10 -2, 5 -8 Z" fill="#FBBF24" stroke="#92400E" strokeWidth="1.2" />
            <path d="M 12 -5 C 18 10, 22 22, 28 16 C 24 8, 20 -2, 16 -5 Z" fill="#F59E0B" stroke="#92400E" strokeWidth="1.2" />
            {/* Sharp claws tips */}
            <path d="M 3 22 L 6 28 L 0 24 Z" fill="#18181B" />
            <path d="M 17 21 L 20 27 L 13 23 Z" fill="#18181B" />
            <path d="M 27 17 L 30 23 L 23 19 Z" fill="#18181B" />
          </g>

          {/* Right talon (viewer right) */}
          <g id="cakar-kanan" transform="translate(325, 410)">
            <path d="M 15 -10 C 12 10, 5 22, -5 22 C -2 12, 0 0, 5 -10 Z" fill="#F59E0B" stroke="#92400E" strokeWidth="1.2" />
            <path d="M 0 -8 C -5 12, -10 24, -18 20 C -14 10, -10 -2, -5 -8 Z" fill="#FBBF24" stroke="#92400E" strokeWidth="1.2" />
            <path d="M -12 -5 C -18 10, -22 22, -28 16 C -24 8, -20 -2, -16 -5 Z" fill="#F59E0B" stroke="#92400E" strokeWidth="1.2" />
            {/* Sharp claws tips */}
            <path d="M -3 22 L -6 28 L 0 24 Z" fill="#18181B" />
            <path d="M -17 21 L -20 27 L -13 23 Z" fill="#18181B" />
            <path d="M -27 17 L -30 23 L -23 19 Z" fill="#18181B" />
          </g>

          {/* Ribbon Tails / Ends with decorative swallowtail fold */}
          <path
            d="M 130 450 L 175 425 L 195 440 L 155 465 L 140 455 L 115 470 Z"
            fill="#F8FAFC"
            stroke="#94A3B8"
            strokeWidth="1.5"
          />
          <path
            d="M 470 450 L 425 425 L 405 440 L 445 465 L 460 455 L 485 470 Z"
            fill="#F8FAFC"
            stroke="#94A3B8"
            strokeWidth="1.5"
          />

          {/* Main White Ribbon body curving horizontally */}
          <path
            d="M 165 430 Q 300 460 435 430 L 440 455 Q 300 485 160 455 Z"
            fill="#FFFFFF"
            stroke="#64748B"
            strokeWidth="2"
          />

          {/* Red edge trim on ribbon */}
          <path d="M 165 430 Q 300 460 435 430" fill="none" stroke="#DC2626" strokeWidth="1" />
          <path d="M 160 455 Q 300 485 440 455" fill="none" stroke="#DC2626" strokeWidth="1" />

          {/* Semboyan Text "BHINNEKA TUNGGAL IKA" */}
          <text
            x="300"
            y="452"
            textAnchor="middle"
            fill="#0F172A"
            fontWeight="bold"
            fontSize="15"
            letterSpacing="3"
            fontFamily="Plus Jakarta Sans, sans-serif"
          >
            BHINNEKA TUNGGAL IKA
          </text>
        </g>

        {/* 9. FEATHER COUNT INDICATORS & BADGES (INTERACTIVE OVERLAY) */}
        <AnimatePresence>
          {showFeatherCounts && (
            <g id="feather-badges" className="pointer-events-none">
              {/* Sayap Kiri: 17 */}
              <g transform="translate(130, 210)">
                <circle cx="0" cy="0" r="17" fill="#B45309" stroke="#FEF3C7" strokeWidth="2.5" />
                <text x="0" y="5" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="bold">17</text>
              </g>

              {/* Sayap Kanan: 17 */}
              <g transform="translate(470, 210)">
                <circle cx="0" cy="0" r="17" fill="#B45309" stroke="#FEF3C7" strokeWidth="2.5" />
                <text x="0" y="5" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="bold">17</text>
              </g>

              {/* Leher: 45 */}
              <g transform="translate(300, 185)">
                <circle cx="0" cy="0" r="17" fill="#B45309" stroke="#FEF3C7" strokeWidth="2.5" />
                <text x="0" y="5" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="bold">45</text>
              </g>

              {/* Pangkal Ekor: 19 */}
              <g transform="translate(300, 400)">
                <circle cx="0" cy="0" r="17" fill="#B45309" stroke="#FEF3C7" strokeWidth="2.5" />
                <text x="0" y="5" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="bold">19</text>
              </g>

              {/* Ekor: 8 */}
              <g transform="translate(300, 520)">
                <circle cx="0" cy="0" r="17" fill="#B45309" stroke="#FEF3C7" strokeWidth="2.5" />
                <text x="0" y="5" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="bold">8</text>
              </g>
            </g>
          )}
        </AnimatePresence>
      </svg>

      {/* Floating Interactive Guide Pill */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-stone-900/90 text-stone-100 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-medium border border-amber-500/30 flex items-center gap-2 pointer-events-none shadow-lg">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
        <span>Sentuh atau klik bagian tubuh Garuda untuk menjelajahi makna</span>
      </div>
    </div>
  );
};
