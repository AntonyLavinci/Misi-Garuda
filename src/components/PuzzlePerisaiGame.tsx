import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { RotateCcw, HelpCircle, Check, Award } from 'lucide-react';
import { soundController } from '../utils/audioSynthesizer';

interface PuzzleSlot {
  id: string;
  expectedSila: number;
  label: string;
  positionDesc: string;
  placedSila: number | null;
}

const INITIAL_SLOTS: Record<string, PuzzleSlot> = {
  center: { id: 'center', expectedSila: 1, label: 'Pusat (Tengah)', positionDesc: 'Latar Hitam - Bintang Emas', placedSila: null },
  bottomLeft: { id: 'bottomLeft', expectedSila: 2, label: 'Kiri Bawah', positionDesc: 'Latar Merah - Rantai Emas', placedSila: null },
  topRight: { id: 'topRight', expectedSila: 3, label: 'Kanan Atas', positionDesc: 'Latar Putih - Pohon Beringin', placedSila: null },
  topLeft: { id: 'topLeft', expectedSila: 4, label: 'Kiri Atas', positionDesc: 'Latar Merah - Kepala Banteng', placedSila: null },
  bottomRight: { id: 'bottomRight', expectedSila: 5, label: 'Kanan Bawah', positionDesc: 'Latar Putih - Padi dan Kapas', placedSila: null },
};

const PIECES = [
  { sila: 1, name: 'Bintang Emas', desc: 'Ketuhanan Yang Maha Esa' },
  { sila: 2, name: 'Rantai Emas', desc: 'Kemanusiaan yang Adil dan Beradab' },
  { sila: 3, name: 'Pohon Beringin', desc: 'Persatuan Indonesia' },
  { sila: 4, name: 'Kepala Banteng', desc: 'Kerakyatan yang Dipimpin oleh Hikmat...' },
  { sila: 5, name: 'Padi dan Kapas', desc: 'Keadilan Sosial bagi Seluruh Rakyat...' },
];

export const PuzzlePerisaiGame: React.FC = () => {
  const [slots, setSlots] = useState<Record<string, PuzzleSlot>>(INITIAL_SLOTS);
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);
  const [showHints, setShowHints] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);

  // Filter unplaced pieces
  const placedSilaNumbers = Object.values(slots).map((s) => s.placedSila).filter(Boolean) as number[];
  const remainingPieces = PIECES.filter((p) => !placedSilaNumbers.includes(p.sila));

  const handleSelectPiece = (silaNum: number) => {
    soundController.playClick();
    setSelectedPiece(selectedPiece === silaNum ? null : silaNum);
  };

  const handleSlotClick = (slotKey: string) => {
    const slot = slots[slotKey];
    if (slot.placedSila !== null) {
      // Remove piece back to pool
      soundController.playClick();
      setSlots((prev) => ({
        ...prev,
        [slotKey]: { ...prev[slotKey], placedSila: null },
      }));
      setIsCompleted(false);
      return;
    }

    if (selectedPiece === null) return;

    setAttempts((prev) => prev + 1);

    if (selectedPiece === slot.expectedSila) {
      soundController.playCorrect();
      const updatedSlots = {
        ...slots,
        [slotKey]: { ...slot, placedSila: selectedPiece },
      };
      setSlots(updatedSlots);
      setSelectedPiece(null);

      // Check if all placed
      const allDone = Object.values(updatedSlots).every((s) => s.placedSila === s.expectedSila);
      if (allDone) {
        setIsCompleted(true);
        soundController.playFanfare();
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    } else {
      soundController.playIncorrect();
    }
  };

  const handleReset = () => {
    soundController.playClick();
    setSlots(INITIAL_SLOTS);
    setSelectedPiece(null);
    setIsCompleted(false);
    setAttempts(0);
  };

  const renderMiniEmblem = (silaNum: number) => {
    if (silaNum === 1) {
      return (
        <svg viewBox="0 0 40 40" className="w-12 h-12">
          <polygon points="20,4 25,15 37,15 27,22 31,33 20,27 9,33 13,22 3,15 15,15" fill="#FBBF24" stroke="#B45309" strokeWidth="1" />
        </svg>
      );
    }
    if (silaNum === 2) {
      return (
        <svg viewBox="0 0 40 40" className="w-12 h-12">
          <circle cx="14" cy="14" r="6" fill="none" stroke="#FBBF24" strokeWidth="2.5" />
          <rect x="18" y="10" width="10" height="8" rx="1.5" fill="none" stroke="#F59E0B" strokeWidth="2.5" />
          <circle cx="28" cy="26" r="6" fill="none" stroke="#FBBF24" strokeWidth="2.5" />
          <rect x="10" y="22" width="8" height="10" rx="1.5" fill="none" stroke="#F59E0B" strokeWidth="2.5" />
        </svg>
      );
    }
    if (silaNum === 3) {
      return (
        <svg viewBox="0 0 40 40" className="w-12 h-12">
          <path d="M 18 36 L 18 24 L 22 24 L 22 36 Z" fill="#78350F" />
          <path d="M 8 22 C 2 16 6 6 14 7 C 18 2 26 2 29 7 C 36 6 40 16 34 24 C 32 28 24 29 20 28 C 16 29 10 27 8 22 Z" fill="#15803D" stroke="#14532D" strokeWidth="1" />
        </svg>
      );
    }
    if (silaNum === 4) {
      return (
        <svg viewBox="0 0 40 40" className="w-12 h-12">
          <path d="M 10 18 C 6 12 4 8 8 5 C 12 2 18 4 20 8 C 22 4 28 2 32 5 C 36 8 34 12 30 18 C 32 24 28 34 20 36 C 12 34 8 24 10 18 Z" fill="#18181B" stroke="#A1A1AA" strokeWidth="0.8" />
          <path d="M 8 6 C 0 -2 -2 -8 4 -12 C 8 -7 6 0 11 3 Z" fill="#E4E4E7" />
          <path d="M 32 6 C 40 -2 42 -8 36 -12 C 32 -7 34 0 29 3 Z" fill="#E4E4E7" />
          <circle cx="15" cy="18" r="1.5" fill="#EF4444" />
          <circle cx="25" cy="18" r="1.5" fill="#EF4444" />
        </svg>
      );
    }
    if (silaNum === 5) {
      return (
        <svg viewBox="0 0 40 40" className="w-12 h-12">
          <path d="M 10 34 C 10 20 12 10 18 6" fill="none" stroke="#CA8A04" strokeWidth="1.5" />
          <path d="M 30 34 C 30 20 28 10 22 6" fill="none" stroke="#15803D" strokeWidth="1.5" />
          <circle cx="14" cy="14" r="2.5" fill="#EAB308" />
          <circle cx="26" cy="14" r="3" fill="#FFFFFF" stroke="#15803D" strokeWidth="0.8" />
        </svg>
      );
    }
    return null;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <div className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
            Modul Permainan Interaktif
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight font-serif-patriotic">
            Tantangan Susun Perisai Garuda
          </h1>
          <p className="text-stone-600 text-sm mt-1 max-w-xl">
            Pilih lambang sila di bawah, lalu klik ruang perisai yang tepat sesuai aturan tata letak resmi lambang negara.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHints(!showHints)}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 flex items-center gap-1.5 cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>{showHints ? 'Tutup Petunjuk' : 'Bantuan Letak'}</span>
          </button>
          <button
            onClick={handleReset}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
            <span>Mulai Ulang</span>
          </button>
        </div>
      </div>

      {/* Completion Banner */}
      {isCompleted && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center justify-between gap-4 text-emerald-900 animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold">Hebat! Kamu Berhasil Menyusun Perisai Garuda!</div>
              <p className="text-xs text-emerald-800">
                Kelima lambang sila Pancasila telah berada di posisinya yang sah dan benar. Total percobaan: {attempts} kali.
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-emerald-700 text-white font-semibold text-xs rounded-lg hover:bg-emerald-800 transition-colors cursor-pointer shrink-0"
          >
            Main Lagi
          </button>
        </div>
      )}

      {/* Main Puzzle Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Shield Drop Board (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 flex flex-col items-center shadow-xs">
          <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-4">
            Bagan Perisai Jantung Garuda
          </div>

          {/* SVG Frame Representing the Shield */}
          <div className="relative w-full max-w-[380px] aspect-[4/5] bg-amber-50/40 rounded-[40px] border-4 border-amber-600/40 p-4 shadow-inner flex flex-col justify-between">
            {/* Top Row: Banteng (left) & Beringin (right) */}
            <div className="grid grid-cols-2 gap-3 h-[42%]">
              {/* Top Left Slot: Banteng (Sila 4) */}
              <button
                onClick={() => handleSlotClick('topLeft')}
                className={`rounded-xl border-2 transition-all flex flex-col items-center justify-center p-2 relative cursor-pointer ${
                  slots.topLeft.placedSila
                    ? 'bg-red-700 text-white border-red-800'
                    : 'bg-red-100/70 border-dashed border-red-400 hover:bg-red-200/60'
                }`}
              >
                {slots.topLeft.placedSila ? (
                  <>
                    {renderMiniEmblem(slots.topLeft.placedSila)}
                    <span className="text-[11px] font-bold mt-1 text-white">Kepala Banteng</span>
                    <span className="text-[9px] text-red-200">Sila 4</span>
                  </>
                ) : (
                  <div className="text-center">
                    <span className="text-xs font-semibold text-red-800">Ruang Kiri Atas</span>
                    {showHints && <div className="text-[10px] text-red-600 mt-1">Sila 4 (Banteng)</div>}
                  </div>
                )}
              </button>

              {/* Top Right Slot: Beringin (Sila 3) */}
              <button
                onClick={() => handleSlotClick('topRight')}
                className={`rounded-xl border-2 transition-all flex flex-col items-center justify-center p-2 relative cursor-pointer ${
                  slots.topRight.placedSila
                    ? 'bg-white text-stone-900 border-stone-300 shadow-xs'
                    : 'bg-stone-100/70 border-dashed border-stone-400 hover:bg-stone-200/60'
                }`}
              >
                {slots.topRight.placedSila ? (
                  <>
                    {renderMiniEmblem(slots.topRight.placedSila)}
                    <span className="text-[11px] font-bold mt-1 text-stone-900">Pohon Beringin</span>
                    <span className="text-[9px] text-stone-500">Sila 3</span>
                  </>
                ) : (
                  <div className="text-center">
                    <span className="text-xs font-semibold text-stone-700">Ruang Kanan Atas</span>
                    {showHints && <div className="text-[10px] text-emerald-700 mt-1">Sila 3 (Beringin)</div>}
                  </div>
                )}
              </button>
            </div>

            {/* Middle: Black Equator Line & Center Slot (Sila 1 Bintang) */}
            <div className="relative my-2 flex items-center justify-center">
              {/* Equator bar */}
              <div className="absolute inset-x-0 h-2 bg-stone-900 rounded-full" />

              {/* Center slot */}
              <button
                onClick={() => handleSlotClick('center')}
                className={`w-28 h-28 rounded-2xl border-2 transition-all flex flex-col items-center justify-center z-10 p-2 cursor-pointer shadow-md ${
                  slots.center.placedSila
                    ? 'bg-stone-900 text-white border-amber-500 ring-2 ring-amber-500/50'
                    : 'bg-stone-800 border-dashed border-amber-400 hover:bg-stone-700'
                }`}
              >
                {slots.center.placedSila ? (
                  <>
                    {renderMiniEmblem(slots.center.placedSila)}
                    <span className="text-[11px] font-bold mt-0.5 text-amber-300">Bintang Emas</span>
                    <span className="text-[9px] text-stone-400">Sila 1</span>
                  </>
                ) : (
                  <div className="text-center">
                    <span className="text-xs font-bold text-amber-400">Pusat Tameng</span>
                    {showHints && <div className="text-[10px] text-amber-300 mt-0.5">Sila 1 (Bintang)</div>}
                  </div>
                )}
              </button>
            </div>

            {/* Bottom Row: Rantai (left) & Padi-Kapas (right) */}
            <div className="grid grid-cols-2 gap-3 h-[42%]">
              {/* Bottom Left Slot: Rantai (Sila 2) */}
              <button
                onClick={() => handleSlotClick('bottomLeft')}
                className={`rounded-xl border-2 transition-all flex flex-col items-center justify-center p-2 relative cursor-pointer ${
                  slots.bottomLeft.placedSila
                    ? 'bg-red-700 text-white border-red-800'
                    : 'bg-red-100/70 border-dashed border-red-400 hover:bg-red-200/60'
                }`}
              >
                {slots.bottomLeft.placedSila ? (
                  <>
                    {renderMiniEmblem(slots.bottomLeft.placedSila)}
                    <span className="text-[11px] font-bold mt-1 text-white">Rantai Emas</span>
                    <span className="text-[9px] text-red-200">Sila 2</span>
                  </>
                ) : (
                  <div className="text-center">
                    <span className="text-xs font-semibold text-red-800">Ruang Kiri Bawah</span>
                    {showHints && <div className="text-[10px] text-red-600 mt-1">Sila 2 (Rantai)</div>}
                  </div>
                )}
              </button>

              {/* Bottom Right Slot: Padi & Kapas (Sila 5) */}
              <button
                onClick={() => handleSlotClick('bottomRight')}
                className={`rounded-xl border-2 transition-all flex flex-col items-center justify-center p-2 relative cursor-pointer ${
                  slots.bottomRight.placedSila
                    ? 'bg-white text-stone-900 border-stone-300 shadow-xs'
                    : 'bg-stone-100/70 border-dashed border-stone-400 hover:bg-stone-200/60'
                }`}
              >
                {slots.bottomRight.placedSila ? (
                  <>
                    {renderMiniEmblem(slots.bottomRight.placedSila)}
                    <span className="text-[11px] font-bold mt-1 text-stone-900">Padi & Kapas</span>
                    <span className="text-[9px] text-stone-500">Sila 5</span>
                  </>
                ) : (
                  <div className="text-center">
                    <span className="text-xs font-semibold text-stone-700">Ruang Kanan Bawah</span>
                    {showHints && <div className="text-[10px] text-amber-700 mt-1">Sila 5 (Padi Kapas)</div>}
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right: Available Emblem Pieces Deck (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <span className="text-xs font-bold text-stone-800 uppercase tracking-wide">
                Kotak Lambang Tersedia ({remainingPieces.length} belum terpasang)
              </span>
              {selectedPiece && (
                <span className="text-xs text-amber-700 font-semibold animate-pulse">
                  Pilih ruang di perisai!
                </span>
              )}
            </div>

            {remainingPieces.length === 0 ? (
              <div className="py-8 text-center text-stone-500 text-xs">
                Semua lambang telah dipasang ke perisai! Klik tombol &quot;Main Lagi&quot; jika ingin mengulang latihan.
              </div>
            ) : (
              <div className="space-y-2 mt-4">
                {remainingPieces.map((piece) => {
                  const isSelected = selectedPiece === piece.sila;
                  return (
                    <button
                      key={`piece-${piece.sila}`}
                      onClick={() => handleSelectPiece(piece.sila)}
                      className={`w-full p-3 rounded-xl border flex items-center justify-between gap-3 transition-all cursor-pointer text-left ${
                        isSelected
                          ? 'bg-amber-50 border-amber-600 ring-2 ring-amber-500/50 shadow-xs'
                          : 'bg-stone-50 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-stone-900 flex items-center justify-center shrink-0">
                          {renderMiniEmblem(piece.sila)}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-stone-900">{piece.name}</div>
                          <div className="text-[11px] text-stone-500 truncate max-w-[200px]">{piece.desc}</div>
                        </div>
                      </div>

                      <div className="shrink-0 text-xs font-semibold text-amber-800">
                        {isSelected ? 'Klik Slot Target' : 'Pilih'}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Educational Note */}
          <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-2">
            <div className="font-bold flex items-center gap-1.5">
              <Check className="w-4 h-4 text-amber-700" />
              <span>Tahukah Kamu?</span>
            </div>
            <p className="leading-relaxed">
              Warna latar perisai dibagi menjadi merah dan putih menyerupai bendera Sang Saka Merah Putih. Ruang tengah berlatar hitam pekat melambangkan keabadian dan warna alam semesta ciptaan Tuhan Yang Maha Esa.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
