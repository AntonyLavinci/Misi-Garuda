import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Calendar, BookOpen, Layers } from 'lucide-react';
import { GarudaInteractiveSvg } from './GarudaInteractiveSvg';
import { ANATOMY_PARTS, AnatomyPart } from '../data/garudaData';
import { speakIndonesian, stopSpeaking, soundController } from '../utils/audioSynthesizer';

export const GarudaAnatomyExplorer: React.FC = () => {
  const [selectedPartId, setSelectedPartId] = useState<string>('sayap');
  const [showFeatherCounts, setShowFeatherCounts] = useState<boolean>(true);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [activeTabSub, setActiveTabSub] = useState<'makna' | 'filosofi' | 'matematika'>('makna');

  const selectedPart: AnatomyPart = ANATOMY_PARTS[selectedPartId] || ANATOMY_PARTS['sayap'];

  useEffect(() => {
    // When part changes, stop current narration if active
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    }
  }, [selectedPartId]);

  const handleToggleVoice = () => {
    soundController.playClick();
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      const narrationText = `${selectedPart.name}. ${selectedPart.significance}. ${selectedPart.detail} ${selectedPart.philosophicalMeaning}`;
      const started = speakIndonesian(narrationText, () => setIsSpeaking(false));
      if (started) {
        setIsSpeaking(true);
      }
    }
  };

  const handleSelectPart = (id: string) => {
    setSelectedPartId(id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Editorial Chapter Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <div className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
            Modul Pembelajaran 01
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight font-serif-patriotic">
            Anatomi & Makna Lambang Garuda Pancasila
          </h1>
          <p className="text-stone-600 text-sm mt-1 max-w-2xl">
            Sentuh bagian tubuh Garuda untuk memahami simbolisme kemerdekaan 17-8-1945, perisai kebangsaan, dan semboyan pemersatu bangsa.
          </p>
        </div>

        {/* Interactive Viewport Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              soundController.playClick();
              setShowFeatherCounts(!showFeatherCounts);
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1.5 cursor-pointer ${
              showFeatherCounts
                ? 'bg-amber-50 text-amber-900 border-amber-300'
                : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-amber-600" />
            <span>{showFeatherCounts ? 'Sembunyikan Angka Bulu' : 'Tampilkan Angka Bulu'}</span>
          </button>
        </div>
      </div>

      {/* Two-Zone Educational Sandbox Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Interactive Stage (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-4 sm:p-6 shadow-xs relative">
          {/* Quick part selector bar */}
          <div className="flex items-center gap-1 overflow-x-auto pb-3 mb-2 border-b border-stone-100 scrollbar-none">
            {Object.values(ANATOMY_PARTS).map((part) => (
              <button
                key={part.id}
                onClick={() => handleSelectPart(part.id)}
                className={`px-2.5 py-1 text-xs rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                  selectedPartId === part.id
                    ? 'bg-amber-700 text-white font-medium shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                {part.name.split(' ')[0]} {part.count ? `(${part.count})` : ''}
              </button>
            ))}
          </div>

          {/* Interactive SVG Stage */}
          <div className="bg-stone-50/70 rounded-xl border border-stone-100 p-2 sm:p-4 relative flex items-center justify-center min-h-[460px]">
            <GarudaInteractiveSvg
              selectedPartId={selectedPartId}
              onSelectPart={handleSelectPart}
              showFeatherCounts={showFeatherCounts}
            />
          </div>

          {/* 17-8-1945 Independence Math Summary Strip */}
          <div className="mt-4 p-3 bg-amber-50/60 rounded-xl border border-amber-200/70 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-stone-700 font-medium">
              <Calendar className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Kode Tanggal Kemerdekaan RI:</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-stone-800">
              <span className={`px-2 py-0.5 rounded ${selectedPartId === 'sayap' ? 'bg-amber-600 text-white' : 'bg-white border border-stone-200'}`}>
                17 Sayap
              </span>
              <span>-</span>
              <span className={`px-2 py-0.5 rounded ${selectedPartId === 'ekor' ? 'bg-amber-600 text-white' : 'bg-white border border-stone-200'}`}>
                8 Ekor
              </span>
              <span>-</span>
              <span className={`px-2 py-0.5 rounded ${selectedPartId === 'pangkalEkor' ? 'bg-amber-600 text-white' : 'bg-white border border-stone-200'}`}>
                19 Pangkal
              </span>
              <span>-</span>
              <span className={`px-2 py-0.5 rounded ${selectedPartId === 'leher' ? 'bg-amber-600 text-white' : 'bg-white border border-stone-200'}`}>
                45 Leher
              </span>
              <span>=</span>
              <span className="bg-red-700 text-white px-2 py-0.5 rounded font-bold">
                17 AGUSTUS 1945
              </span>
            </div>
          </div>
        </div>

        {/* Right Concept & Control Deck (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Main Selected Part Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-stone-100">
              <div>
                <span className="text-xs font-semibold text-amber-800 tracking-wide uppercase">
                  Bagian Terpilih
                </span>
                <h2 className="text-xl font-bold text-stone-900 mt-0.5 font-serif-patriotic">
                  {selectedPart.name}
                </h2>
              </div>

              {/* Text-to-speech button */}
              <button
                onClick={handleToggleVoice}
                title={isSpeaking ? 'Hentikan Suara' : 'Dengarkan Penjelasan'}
                className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-medium ${
                  isSpeaking
                    ? 'bg-amber-700 text-white border-amber-800 shadow-sm animate-pulse'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-4 h-4" />
                    <span>Heningkan</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-amber-700" />
                    <span>Dengarkan</span>
                  </>
                )}
              </button>
            </div>

            {/* Significance Highlight */}
            <div className="mt-4 p-3 bg-stone-50 rounded-xl border border-stone-100 flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-semibold text-stone-900">Makna Simbolik:</div>
                <div className="text-xs text-stone-600 mt-0.5 font-medium">{selectedPart.significance}</div>
              </div>
            </div>

            {/* Sub Tabs */}
            <div className="mt-4 flex border-b border-stone-200 gap-4 text-xs font-medium">
              <button
                onClick={() => setActiveTabSub('makna')}
                className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                  activeTabSub === 'makna'
                    ? 'text-amber-800 border-amber-700 font-bold'
                    : 'text-stone-500 border-transparent hover:text-stone-800'
                }`}
              >
                Penjelasan Ciri
              </button>
              <button
                onClick={() => setActiveTabSub('filosofi')}
                className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                  activeTabSub === 'filosofi'
                    ? 'text-amber-800 border-amber-700 font-bold'
                    : 'text-stone-500 border-transparent hover:text-stone-800'
                }`}
              >
                Makna Filosofis
              </button>
              <button
                onClick={() => setActiveTabSub('matematika')}
                className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                  activeTabSub === 'matematika'
                    ? 'text-amber-800 border-amber-700 font-bold'
                    : 'text-stone-500 border-transparent hover:text-stone-800'
                }`}
              >
                Fakta Angka
              </button>
            </div>

            {/* Sub Tab Content */}
            <div className="mt-4 text-sm text-stone-700 leading-relaxed min-h-[140px]">
              {activeTabSub === 'makna' && (
                <div className="space-y-3">
                  <p>{selectedPart.detail}</p>
                  <div className="p-3 bg-amber-50/50 rounded-lg border border-amber-100 text-xs text-amber-900">
                    <span className="font-semibold">Petunjuk Belajar: </span>
                    {selectedPart.interactiveHint}
                  </div>
                </div>
              )}

              {activeTabSub === 'filosofi' && (
                <div className="space-y-3">
                  <p>{selectedPart.philosophicalMeaning}</p>
                  <p className="text-xs text-stone-500 italic">
                    Sumber: Penjelasan Resmi Lampang Negara RI & Kitab Sutasoma Mpu Tantular.
                  </p>
                </div>
              )}

              {activeTabSub === 'matematika' && (
                <div className="space-y-3">
                  {selectedPart.count ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-stone-50 rounded-lg border border-stone-200">
                        <span className="text-xs text-stone-600">Jumlah Helai Bulu:</span>
                        <span className="text-base font-bold text-amber-700 font-mono">
                          {selectedPart.count} Helai
                        </span>
                      </div>
                      <p className="text-xs text-stone-600">
                        Setiap helai bulu dihitung secara cermat oleh para pendiri bangsa agar membentuk angka 17-8-1945 sebagai monumen abadi kemerdekaan Indonesia.
                      </p>
                    </div>
                  ) : (
                    <p className="text-xs text-stone-600">
                      Bagian ini tidak menggunakan hitungan angka bulu kemerdekaan, melainkan lambang heraldik pelindung peradaban bangsa.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Quick Learning Prompts for Students / Guru */}
          <div className="bg-stone-50 rounded-xl border border-stone-200 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-800 mb-2">
              <BookOpen className="w-4 h-4 text-amber-700" />
              <span>Pertanyaan Diskusi Cepat di Kelas:</span>
            </div>
            <ul className="text-xs text-stone-600 space-y-1.5 list-disc pl-4">
              <li>Mengapa kepala Garuda menoleh ke kanan, bukan ke kiri?</li>
              <li>Dari mana kalimat semboyan "Bhinneka Tunggal Ika" berasal?</li>
              <li>Berapakah total penjumlahan 17 + 8 + 19 + 45? (Hasil: 89 helai bulu pembentuk tanggal kemerdekaan).</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
