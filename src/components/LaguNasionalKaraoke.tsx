import React, { useState, useEffect } from 'react';
import { Play, Square, Music, Disc, Sparkles } from 'lucide-react';
import { LAGU_GARUDA } from '../data/garudaData';
import { soundController } from '../utils/audioSynthesizer';

export const LaguNasionalKaraoke: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activePhraseIndex, setActivePhraseIndex] = useState<number>(-1);

  useEffect(() => {
    return () => {
      soundController.stopGarudaMelody();
    };
  }, []);

  const handleTogglePlay = () => {
    if (isPlaying) {
      soundController.stopGarudaMelody();
      setIsPlaying(false);
      setActivePhraseIndex(-1);
    } else {
      setIsPlaying(true);
      setActivePhraseIndex(0);
      soundController.playGarudaMelody(
        (phraseIdx) => {
          setActivePhraseIndex(phraseIdx);
        },
        () => {
          setIsPlaying(false);
          setActivePhraseIndex(-1);
        }
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="border-b border-stone-200 pb-4">
        <div className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
          Modul Seni & Lagu Kebangsaan
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight font-serif-patriotic">
          Lagu Wajib Nasional: Garuda Pancasila
        </h1>
        <p className="text-stone-600 text-sm mt-1">
          Dengarkan instrumen melodi terpadu menggunakan synthesizer audio peramban dan ikuti lirik mars kebangsaan ciptaan Sudharnoto.
        </p>
      </div>

      {/* Main Music Studio Player Card */}
      <div className="bg-stone-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-stone-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-stone-800">
          <div className="flex items-center gap-4">
            <div
              className={`w-14 h-14 rounded-2xl bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-400 ${
                isPlaying ? 'animate-spin' : ''
              }`}
              style={{ animationDuration: '4s' }}
            >
              <Disc className="w-8 h-8" />
            </div>

            <div>
              <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                Lagu Mars Wajib Nasional
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-serif-patriotic">
                {LAGU_GARUDA.title}
              </h2>
              <div className="text-xs text-stone-400 mt-0.5">
                Ciptaan: {LAGU_GARUDA.creator} · Tempo: {LAGU_GARUDA.tempo}
              </div>
            </div>
          </div>

          {/* Audio Play/Stop Button */}
          <button
            onClick={handleTogglePlay}
            className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer self-start sm:self-auto shadow-md ${
              isPlaying
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-amber-500 hover:bg-amber-400 text-stone-900'
            }`}
          >
            {isPlaying ? (
              <>
                <Square className="w-4 h-4 fill-current" />
                <span>Hentikan Melodi</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Putar Instrumen Musik</span>
              </>
            )}
          </button>
        </div>

        {/* Real-time Lyrics Karaoke Display */}
        <div className="py-6 space-y-3">
          <div className="text-xs text-stone-400 font-semibold flex items-center gap-2 uppercase tracking-wider">
            <Music className="w-3.5 h-3.5 text-amber-400" />
            <span>Lirik & Nada Melodi:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {LAGU_GARUDA.lyrics.map((line, idx) => {
              const isActive = activePhraseIndex === idx;
              return (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isActive
                      ? 'bg-amber-500/20 border-amber-400 ring-2 ring-amber-400/30 scale-[1.02]'
                      : 'bg-stone-800/60 border-stone-800 text-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-sm sm:text-base font-bold tracking-wide ${
                        isActive ? 'text-amber-300' : 'text-stone-100'
                      }`}
                    >
                      {line.text}
                    </span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                    )}
                  </div>
                  <div className="text-[11px] text-stone-400 font-mono mt-1">
                    Notasi: {line.note}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Context Meaning */}
        <div className="p-4 bg-stone-800/80 rounded-xl border border-stone-700/80 text-xs text-stone-300 flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-amber-300">Makna Perjuangan: </strong>
            {LAGU_GARUDA.meaning}
          </p>
        </div>
      </div>
    </div>
  );
};
