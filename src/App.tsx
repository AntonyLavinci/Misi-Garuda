/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { GarudaAnatomyExplorer } from './components/GarudaAnatomyExplorer';
import { SilaPerisaiDeepDive } from './components/SilaPerisaiDeepDive';
import { PuzzlePerisaiGame } from './components/PuzzlePerisaiGame';
import { SejarahGarudaTimeline } from './components/SejarahGarudaTimeline';
import { LaguNasionalKaraoke } from './components/LaguNasionalKaraoke';
import { QuizPancasila } from './components/QuizPancasila';
import { soundController } from './utils/audioSynthesizer';
import { Compass, BookCheck, Puzzle, Music, Award, ArrowUpRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('anatomi');

  const handleTabChange = (tab: string) => {
    soundController.playClick();
    setActiveTab(tab);
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans">
      {/* Universal Top Bar Contract Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onStartQuiz={() => {
          soundController.playClick();
          setActiveTab('kuis');
          window.scrollTo({ top: 380, behavior: 'smooth' });
        }}
      />

      {/* Hero Showcase Section with Generated Art */}
      <section className="relative bg-stone-950 text-white overflow-hidden border-b border-stone-800">
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity">
          <img
            src="/src/assets/images/garuda_hero_educational_banner_1791950458252.jpg"
            alt="Ilustrasi Lambang Kebangsaan Garuda Pancasila"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-transparent z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest bg-amber-950/70 px-3 py-1 rounded-full border border-amber-600/40">
              Media Pembelajaran Interaktif Nasional
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-serif-patriotic leading-tight text-balance">
              Jelajah Garuda Pancasila: Simbol Kedaulatan & Jiwa Bangsa
            </h1>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Platform edukasi interaktif untuk mempelajari anatomi Burung Garuda, makna filosofis 5 sila di dalam perisai jantung, sejarah perumusan 1950, hingga simulasi susun perisai dan uji kompetensi kuis berhadiah sertifikat.
            </p>

            {/* Quick Action Hub */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleTabChange('anatomi')}
                className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>Eksplorasi Anatomi</span>
              </button>
              <button
                onClick={() => handleTabChange('puzzle')}
                className="px-5 py-2.5 bg-stone-800 hover:bg-stone-700 text-white font-semibold text-xs rounded-xl border border-stone-700 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Puzzle className="w-4 h-4 text-amber-400" />
                <span>Susun Perisai</span>
              </button>
              <button
                onClick={() => handleTabChange('kuis')}
                className="px-5 py-2.5 bg-red-900/80 hover:bg-red-800 text-white font-semibold text-xs rounded-xl border border-red-700 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Award className="w-4 h-4 text-amber-300" />
                <span>Kuis & Sertifikat</span>
              </button>
            </div>
          </div>

          {/* 4-Item Metric Strip (Single line unboxed metadata) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 pt-6 border-t border-stone-800 text-stone-300 text-xs">
            <div>
              <div className="font-mono text-xl sm:text-2xl font-bold text-amber-400">17-8-1945</div>
              <div className="text-stone-400 text-[11px] mt-0.5">Rumus Bulu Kemerdekaan</div>
            </div>
            <div>
              <div className="font-mono text-xl sm:text-2xl font-bold text-amber-400">5 Sila</div>
              <div className="text-stone-400 text-[11px] mt-0.5">Ruang Perisai Jantung</div>
            </div>
            <div>
              <div className="font-mono text-xl sm:text-2xl font-bold text-amber-400">1 Semboyan</div>
              <div className="text-stone-400 text-[11px] mt-0.5">Bhinneka Tunggal Ika</div>
            </div>
            <div>
              <div className="font-mono text-xl sm:text-2xl font-bold text-amber-400">11 Feb 1950</div>
              <div className="text-stone-400 text-[11px] mt-0.5">Diresmikan di Kabinet RIS</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Stage Switcher */}
      <main className="flex-1 py-4">
        {/* Module Sub-Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="flex items-center gap-2 p-1.5 bg-stone-200/70 rounded-xl border border-stone-300/80 overflow-x-auto scrollbar-none">
            <button
              onClick={() => handleTabChange('anatomi')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'anatomi'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-amber-700" />
              <span>1. Anatomi Lambang</span>
            </button>
            <button
              onClick={() => handleTabChange('sila')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'sila'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <BookCheck className="w-3.5 h-3.5 text-amber-700" />
              <span>2. Lima Sila & Skenario</span>
            </button>
            <button
              onClick={() => handleTabChange('puzzle')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'puzzle'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Puzzle className="w-3.5 h-3.5 text-amber-700" />
              <span>3. Susun Perisai</span>
            </button>
            <button
              onClick={() => handleTabChange('sejarah')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'sejarah'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>4. Sejarah Perumusan</span>
            </button>
            <button
              onClick={() => handleTabChange('lagu')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'lagu'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Music className="w-3.5 h-3.5 text-amber-700" />
              <span>5. Lagu Mars Nasional</span>
            </button>
            <button
              onClick={() => handleTabChange('kuis')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'kuis'
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>6. Kuis & Sertifikat</span>
            </button>
          </div>
        </div>

        {/* Dynamic Module Content View */}
        <div className="mt-2">
          {activeTab === 'anatomi' && <GarudaAnatomyExplorer />}
          {activeTab === 'sila' && <SilaPerisaiDeepDive />}
          {activeTab === 'puzzle' && <PuzzlePerisaiGame />}
          {activeTab === 'sejarah' && <SejarahGarudaTimeline />}
          {activeTab === 'lagu' && <LaguNasionalKaraoke />}
          {activeTab === 'kuis' && <QuizPancasila />}
        </div>
      </main>

      {/* Quiet, Human Editorial Footer */}
      <footer className="border-t border-stone-200 bg-white py-8 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-semibold text-stone-800">Jelajah Garuda Pancasila</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>Media Edukasi Interaktif Pendidikan Karakter & Kebangsaan</span>
          </div>

          <div className="flex items-center gap-4">
            <span>PP No. 66 Tahun 1951</span>
            <span aria-hidden="true">·</span>
            <span>UU No. 24 Tahun 2009</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-stone-700 hover:text-amber-800 font-medium flex items-center gap-0.5 cursor-pointer"
            >
              <span>Kembali ke Atas</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
